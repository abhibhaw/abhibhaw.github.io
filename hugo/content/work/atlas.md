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
---

## The problem

Kubernetes tells you that something failed.
It rarely tells you why.

A user who saw "Degraded" or "Deployment failed" had to dig.
They opened pod events, read container logs and compared configs.
Experienced engineers knew where to look. Most users did not.
Many opened a support ticket and waited for someone who did.

The time cost was hours per incident.
The hidden cost was trust: a platform that fails without a reason feels unsafe to deploy on.

## What I decided

**Explain the failure where it happens.**
Atlas sits on the failure itself.
On a degraded app or a failing pod, the user clicks "Explain".
They do not copy logs into a chat window.

{{< figure src="/images/work/atlas-explain-status.webp" alt="Application details page with a Degraded status, a failed deployment and an Explain button" caption="The entry point is the failure: a degraded app with a failed deployment, and an Explain button. Public image from Devtron docs." >}}

**Give the cause, not a log summary.**
Atlas reads the events, the logs and the service context together.
It answers in plain words: what failed, the likely cause, and what to try.
Users rate each answer, so we could see where it was wrong.

{{< figure src="/images/work/atlas-ai-analysis.webp" alt="AI Analysis panel explaining that a pod failed due to DeadlineExceeded, with container details and possible causes" caption="The analysis names the cause and the likely fixes, with feedback buttons. Public image from Devtron docs." >}}

## What I left out

**No automatic fixes in the first version.**
An assistant that changes production on its own needs trust it has not earned yet.
So version one explained and suggested, and a person decided.
Automated fixes came later, as runbooks that a person approves, with an audit log.

**No model of our own.**
Enterprises already had approved LLM providers.
Atlas lets them bring their own model, which removed a security review from every sale.

## What happened

- Time to find the root cause fell from hours to about a minute.
- Time to recover fell from hours to minutes.
- Atlas became the base for Devtron's later AI operations work, including approved runbooks and an AI SRE agent.

## What I learned

The value was not the model.
It was the placement: the answer appears at the moment of failure, with the context already attached.
The same model in a separate chat window would have saved far less time.
