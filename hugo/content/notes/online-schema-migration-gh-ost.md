---
title: "Changing a large MySQL table without downtime, with gh-ost"
date: 2022-08-01T11:30:03+05:30
lastmod: 2026-11-17
description: "A plain ALTER TABLE on a large, busy MySQL table can block writes for minutes. This is how to run the change with gh-ost: test it on a replica, verify the data, then cut over safely."
kind: "technical"
toc: true
---

Adding a column to a small table is instant.
On a table with tens of millions of rows and constant writes, a plain `ALTER TABLE` can lock the table or add large replication lag.
Some changes in MySQL 8 run as `INSTANT` or `INPLACE`, but many do not, and you find out in production.

[gh-ost](https://github.com/github/gh-ost) is GitHub's online schema migration tool for MySQL.
This note is the runbook I used: install it, run a dry run, test on a replica, verify the data, then run the real migration.

## How gh-ost works

gh-ost does not change your table in place.

1. It creates a **ghost table** with the same schema, for example `_orders_gho`.
2. It applies your `ALTER` to the empty ghost table.
3. It copies rows from the original table to the ghost table in small chunks.
4. At the same time, it reads the **binary log** and applies ongoing writes to the ghost table.
5. When the ghost table has caught up, it swaps the two tables in a short, atomic **cut-over**.

Other tools use triggers to capture ongoing writes.
gh-ost reads the binary log instead, so it adds no trigger load to the production table.
You can also pause it, throttle it, or stop it at any time.

## Before you start

- **Row-based binary logs.** gh-ost needs `binlog_format=ROW` and `binlog_row_image=FULL` on the server it reads from.
- **A primary key or unique key** on the table. gh-ost uses it to copy rows in chunks.
- **Privileges.** The gh-ost user needs `ALTER, CREATE, DELETE, DROP, INDEX, INSERT, LOCK TABLES, SELECT, TRIGGER, UPDATE` on the schema, and `SUPER` or `REPLICATION CLIENT, REPLICATION SLAVE` globally.
- **No foreign keys** on the table. gh-ost does not support them.
- **Disk space** for a full copy of the table.

### On Amazon RDS or Aurora

You cannot change `binlog_format` with a SQL command on RDS.
Set it in the DB parameter group, then tell gh-ost not to try:

- Add `--assume-rbr`.
- Keep binary logs long enough for the migration: `CALL mysql.rds_set_configuration('binlog retention hours', 24);`
- If gh-ost connects to the writer, add `--allow-on-master`.

## Install on a Linux jump host

Run gh-ost from a host close to the database, not from your laptop.
A migration can run for hours, so start it inside `tmux` or `screen`.

```bash
# Pick the latest release from https://github.com/github/gh-ost/releases
VERSION=v1.1.11
curl -fsSLO "https://github.com/github/gh-ost/releases/download/${VERSION}/gh-ost-linux-amd64.tar.gz"
curl -fsSLO "https://github.com/github/gh-ost/releases/download/${VERSION}/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
tar -xzf gh-ost-linux-amd64.tar.gz
./gh-ost --version
```

Use `gh-ost-linux-arm64.tar.gz` on a Graviton host.

## Step 1: Dry run

Without `--execute`, gh-ost connects, checks the setup and validates the `ALTER`.
It does not copy data.

```bash
./gh-ost \
  --host=db-replica.internal --user=ghost --password="$GHOST_PASSWORD" \
  --database=shop --table=orders \
  --alter="ADD COLUMN jira_id VARCHAR(30) NULL" \
  --chunk-size=2000 \
  --max-load=Threads_running=25 \
  --critical-load=Threads_running=100 \
  --max-lag-millis=1500 \
  --verbose
```

Read the output.
It tells you if the binary log format, the keys or the privileges are wrong.

A note on `NOT NULL`: adding a `NOT NULL` column without a default fails while gh-ost copies existing rows.
Add the column as `NULL` or give it a `DEFAULT`.

## Step 2: Test on a replica

Add `--test-on-replica` and `--execute`.
gh-ost runs the full migration on a replica only.
At the end, it stops replication on that replica and keeps both tables, so you can compare them.

```bash
./gh-ost <same flags as above> --test-on-replica --execute
```

### Verify the data

`CHECKSUM TABLE` compares whole rows.
Your `ALTER` changed the schema, so the checksums of the two tables never match.
Compare the columns the two tables share instead:

```sql
SELECT COUNT(*), SUM(CRC32(CONCAT_WS('#', id, customer_id, amount, status, created_at)))
FROM orders;

SELECT COUNT(*), SUM(CRC32(CONCAT_WS('#', id, customer_id, amount, status, created_at)))
FROM _orders_gho;
```

If the counts and sums match, the copy is correct.
Then start replication on the replica again with `START REPLICA;` (`START SLAVE;` before MySQL 8.0.22) and drop the test tables.

## Step 3: Run the migration

Run the same command without `--test-on-replica`.
By default, gh-ost connects to a replica, finds the primary from it, and writes to the primary.
It reads the binary log from the replica, which keeps load off the primary.

```bash
./gh-ost <same flags as above> \
  --postpone-cut-over-flag-file=/tmp/ghost.postpone \
  --serve-socket-file=/tmp/gh-ost.orders.sock \
  --execute
```

Two flags make this safe to run during the day:

- `--postpone-cut-over-flag-file`: gh-ost copies everything, then waits while this file exists. You choose when the cut-over happens. Delete the file at a quiet time.
- `--serve-socket-file`: you can talk to the running migration.

```bash
echo status | nc -U /tmp/gh-ost.orders.sock      # progress and ETA
echo throttle | nc -U /tmp/gh-ost.orders.sock    # pause row copy
echo no-throttle | nc -U /tmp/gh-ost.orders.sock # resume
echo "chunk-size=1000" | nc -U /tmp/gh-ost.orders.sock
```

### Throttling

gh-ost slows down by itself in three cases:

- `--max-load`: a server metric is above the limit, for example `Threads_running=25`.
- `--max-lag-millis`: replication lag on the replicas is too high.
- `--critical-load`: a metric reaches a danger level. gh-ost stops the migration.

Start with conservative values. You can loosen them through the socket while the migration runs.

## Step 4: Clean up

After the cut-over, gh-ost keeps the old table as `_orders_del`.
Keep it until you are sure the new schema works, then drop it.
On a large table, dropping it can also cause a stall, so do it at a quiet time.

## Checklist

1. Check the binary log format, keys, foreign keys, privileges and disk space.
2. Run a dry run and read every warning.
3. Test on a replica. Compare counts and checksums over the shared columns.
4. Run the migration with a postponed cut-over and a socket.
5. Cut over at a quiet time.
6. Drop the old table later.

gh-ost turns a risky, all-or-nothing `ALTER` into a process you can test, watch, pause and time.
That is the part that matters: the change becomes routine instead of an event.
