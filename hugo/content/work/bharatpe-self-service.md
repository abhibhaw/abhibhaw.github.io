---
title: "BharatPe: 14 days to 17 minutes"
kicker: "BharatPe · Internal developer platform"
weight: 50
summary: "Engineers waited 14 days for a small DevOps team to run database queries and server changes. I built a self-service portal with access rules and audit logs."
headline_metric: { value: "20,000+", label: "requests through the portal" }
role: "SDE Intern, during B.Tech"
when: "2022 - 2023"
metrics:
  - { before: "14 days", value: "17 min", label: "average wait for a request" }
  - { value: "20,000+", label: "requests served" }
facts:
  - label: "User"
    text: "Engineers who needed a database query run, data access, or a server change."
  - label: "Problem"
    text: "A small DevOps team did every request by hand. Engineers waited 14 days on average, and nobody could audit who got access to what."
  - label: "Decision"
    text: "A self-service portal. Engineers request what they need, the right approver accepts it, and the portal runs it with access rules and an audit log."
  - label: "Not built"
    text: "Open access for everyone, or a bigger ticket queue. The portal runs approved actions under rules, so the DevOps team reviews rules, not every request."
  - label: "Result"
    text: "20,000+ requests through the portal. The wait fell from 14 days to 17 minutes."
links:
  - { label: "Note: automating Redash permissions", url: "/notes/automating-redash-permissions/" }
---

## The problem

BharatPe's engineers needed the DevOps team for routine work: running a query on a production database, getting access to a data tool, or changing a server.
A small team handled all of it by hand, through tickets.

The average wait was 14 days.
Engineers either stopped asking or found unsafe shortcuts.
And when an auditor asked who had access to what, and who approved it, the answer was a search through chat history.

## What I decided

I built an internal self-service portal.

- **Request.** An engineer picks what they need from a list of supported actions and gives a reason.
- **Approve.** The right approver, usually the engineer's manager or the data owner, accepts or rejects it in one place.
- **Run.** The portal runs the action itself, with access rules for each action and each team.
- **Record.** Every request, approval and action goes into an audit log.

The DevOps team's work moved from doing each request to setting the rules once.

## What I left out

Two easy answers were on the table.
Give everyone direct access, which is fast but unsafe.
Or hire more people for the queue, which is safe but still slow.
The portal took a third path: approved actions under rules, so it is both fast and safe.

## What happened

- More than 20,000 requests went through the portal.
- The average wait fell from 14 days to 17 minutes.
- Access became auditable: every grant has a requester, an approver and a time.

One piece of the portal is written up in detail: [automating Redash permissions with the Redash API](/notes/automating-redash-permissions/).

## What I learned

This was my first product, before I had the title.
The lesson stayed with me: when people wait on a team, the fix is usually not a faster team.
It is a safe way for people to do the work themselves.
