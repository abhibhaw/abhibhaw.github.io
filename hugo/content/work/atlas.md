---
title: "Atlas: from hours to a minute"
kicker: "Devtron · AI assistant"
weight: 20
summary: "When a deployment failed, users read raw logs for hours or opened a support ticket. I shipped Atlas, an AI assistant that finds the root cause and suggests a fix."
headline_metric: { before: "hours", value: "minutes", label: "to recover from a failed deploy" }
role: "Product Manager"
when: "2025"
metrics:
  - { before: "hours", value: "~1 min", label: "to find the root cause" }
  - { before: "hours", value: "minutes", label: "to recover" }
facts:
  - label: "User"
    text: "Developers and on-call engineers whose deployment just failed on Kubernetes."
  - label: "Problem"
    text: "A failed deployment showed a status, not a reason. Users read raw logs and events for hours, or opened a support ticket and waited."
  - label: "Decision"
    text: "An AI assistant inside the product. It reads the failure events, logs and service context, then explains the cause in plain words and suggests a fix."
  - label: "Not built"
    text: "Automatic fixes in the first version. Atlas explains and suggests; a person decides. Automated, human-approved runbooks came later. We also did not train our own model: teams bring the LLM they already use."
  - label: "Result"
    text: "Root-cause time fell from hours to about a minute. Time to recovery fell from hours to minutes."
links:
  - { label: "Devtron Atlas (AI SRE)", url: "https://devtron.ai/ai-operations/ai-sre" }
  - { label: "Docs: Devtron Intelligence", url: "https://docs.devtron.ai/docs/user-guide/devtron-intelligence" }
  - { label: "Video: AI auto-remediation and rollbacks", url: "https://www.youtube.com/watch?v=LeLAozqTdww" }
flows:
  debug:
    caption: "Atlas starts where the failure is shown, with the context already attached."
    lanes:
      - label: "Before"
        steps:
          - node: "Deploy fails"
          - edge: "user digs"
          - node: "Events, logs, configs"
            struck: true
            note: "read by hand, hours"
          - edge: "or gives up"
          - node: "Support ticket"
      - label: "After"
        steps:
          - node: "Deploy fails"
          - edge: "user clicks Explain"
          - node: "Atlas"
            note: "reads events, logs and service context"
          - edge: "about a minute"
          - node: "Cause and fix"
            note: "a person decides"
---

## How it works

Kubernetes says that something failed.
It rarely says why.

{{< flow "debug" >}}

{{< figure src="/images/work/atlas-explain-status.webp" alt="Application details page with a Degraded status, a failed deployment and an Explain button" caption="The entry point is the failure itself. Public image from Devtron docs." >}}

{{< figure src="/images/work/atlas-ai-analysis.webp" alt="AI Analysis panel explaining that a pod failed due to DeadlineExceeded, with container details and possible causes" caption="The answer names the cause and likely fixes. Users rate each answer. Public image from Devtron docs." >}}

## What I left out

- **Automatic fixes.** Version one explained and suggested. Approved runbooks with an audit log came later.
- **A model of our own.** Teams bring the LLM provider they already approved.

## What happened

- Root-cause time fell from hours to about a minute.
- Recovery time fell from hours to minutes.
