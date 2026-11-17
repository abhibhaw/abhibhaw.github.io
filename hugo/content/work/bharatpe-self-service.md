---
title: "BharatPe: 14 days to 17 minutes"
org: "bharatpe"
tools: [{ icon: "mysql-icon", name: "MySQL" }, { icon: "kafka-icon", name: "Kafka" }, { icon: "github-icon", name: "GitHub" }, { icon: "redash", name: "Redash" }, { icon: "jira", name: "Jira" }]
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
flows:
  portal:
    caption: "The queue left the path. Approval, access rules and an audit trail replaced it."
    lanes:
      - label: "Before"
        steps:
          - node: "Engineer"
          - edge: "raises a ticket"
          - node: "DevOps queue"
            struck: true
            note: "14 days on average"
          - edge: "done by hand"
          - node: "Database or server"
      - label: "After"
        steps:
          - node: "Engineer"
          - edge: "requests, with a reason"
          - node: "Approver"
            note: "manager or data owner"
          - edge: "accepts"
          - node: "Portal"
            note: "runs it under access rules"
          - edge: "logs it"
          - node: "Audit trail"
            note: "in Jira"
links:
  - { label: "Note: automating Redash permissions", url: "/notes/automating-redash-permissions/" }
---

## How it works

{{< flow "portal" >}}

Engineers choose from supported actions: database queries, Kafka, GitHub, Redash and API gateway requests.
Risky actions, like changing a live MySQL table, need a second sign-off from DevOps.

## What I left out

Direct access for everyone was fast but unsafe.
A bigger queue was safe but slow.
The portal runs approved actions under rules instead.

## What happened

- 20,000+ requests went through the portal.
- The average wait fell from 14 days to 17 minutes.
- Every grant has a requester, an approver and a time.

One part is written up in detail: [automating Redash permissions](/notes/automating-redash-permissions/).
