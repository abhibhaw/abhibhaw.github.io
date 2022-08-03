---
title: "Online schema migration with GH-OST"
date: 2022-08-01T11:30:03+05:30
# weight: 1
# aliases: ["/first"]
tags: ["devops", "tech"]
author: "Abhibhaw"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "GitHub's online schema migration for MySQL."
canonicalURL: "https://github.com/github/gh-ost"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "https://github.com/github/gh-ost/raw/v1.1.5/doc/images/gh-ost-logo-light-160.png" # image path/url
    alt: "GitHub's GH-OST" # alt text
    caption: "Online schema migration tool" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: false # only hide on current single page
editPost:
    URL: "https://github.com/abhibhaw/abhibhaw.github.io/tree/main/hugo/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---

# TODO

## Install and setup `gh-ost` on AWS linux jumphost.

- As this is an AMD machine, we will download the latest build of the same.

`wget <latest_release_tar>`

[GH-OST Release](https://github.com/github/gh-ost/releases/)

- Time to extract the tar, for linux machine use:
  `tar -xvf <file_name.tar>`

## run a sample alter migration.

Let's first start by testing your migration. Notice we aren't using **--execute** flag which is actually responsible for executing the alter request.

Complete information can be found in the official [cheatsheet](https://github.com/github/gh-ost/blob/master/doc/cheatsheet.md)

### Parameters required:

1. Host Name
2. user
3. password
4. DB Name
5. Table to Alter
6. Alter command

`./gh-ost --host=<host> --user=<user> --password=<password> --database=<db> --table=<table_name> --alter="ADD COLUMN jira_id varchar(30) NOT NULL" --chunk-size=2000 --max-load=Threads_connected=20`

Chunk-size and max load can control when to fire up the process.

## Test migration on replica

Notice as we added `--execute` flag to execute the query, for testing.

`./gh-ost --host=<host> --user=<user> --password=<password> --database=<db> --table=<table_name> --alter="ADD COLUMN jira_id varchar(30) NOT NULL" --chunk-size=2000 --max-load=Threads_connected=20 --test-on-replica --execute `

- you can run `show tables` command to check if the ghost table has been created or not.
- table name of type \_<table_name>\_gho will be created representing new changes in the table.
- CHECKSUM TABLE <original_table>, <ghost_table> EXTENDED;
- If checksum matches, then the migration is complete and both the tables are identical.

## Actual migration

`./gh-ost --host=<host> --user=<user> --password=<password> --database=<db> --table=<table_name> --alter="ADD COLUMN jira_id varchar(30) NOT NULL" --chunk-size=2000 --max-load=Threads_connected=20 --execute`

Actual migration has been started and you can see printed logs for progress.

## Automating the journey.

To be continued...
