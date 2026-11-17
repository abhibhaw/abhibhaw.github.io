---
title: "Devtron Platform: a trial that converts, and approvals enterprises need"
kicker: "Devtron · Growth and enterprise"
weight: 40
summary: "Trial users left before they saw value, and regulated enterprises could not adopt us without sign-off before production changes. I fixed both."
headline_metric: { value: "4x", label: "inbound leads" }
role: "Product Manager"
when: "2024 - 2025"
metrics:
  - { value: "4x", label: "inbound leads" }
  - { value: "33%", label: "faster conversion to paid" }
  - { value: "3x", label: "more likely to stay, for users who deployed in 20 minutes" }
facts:
  - label: "User"
    text: "Teams evaluating Devtron in a trial, and platform teams at regulated enterprises such as banks."
  - label: "Problem"
    text: "Trial users left before their first deploy. Enterprises could not adopt Devtron without sign-off before changes reached production."
  - label: "Decision"
    text: "Rebuild the trial around one guided first deploy. Add multi-level approvals and deployment windows that plug into the existing release flow."
  - label: "Not built"
    text: "More features in the trial. The data showed that setup friction, not missing features, stopped conversion. For approvals, no separate workflow engine: rules attach to the deploy flow teams already use."
  - label: "Result"
    text: "4x inbound leads and 33% faster conversion to paid. Approvals became a key reason enterprises chose Devtron."
links:
  - { label: "Docs: Approval Policy", url: "https://docs.devtron.ai/docs/user-guide/app-management/policies/approval-policy" }
  - { label: "Docs: Deployment Window", url: "https://docs.devtron.ai/docs/user-guide/app-management/policies/deployment-window" }
  - { label: "Blog: approval-based deployments", url: "https://devtron.ai/blog/approval-based-deployments-on-kubernetes/" }
  - { label: "Docs: Devtron Freemium", url: "https://docs.devtron.ai/docs/setup/install/devtron-freemium" }
---

Devtron is an open-source platform that companies use to deploy and run software on Kubernetes.
This case covers two problems in the core product: one in growth, one in enterprise adoption.

## Part 1: The trial

### The problem

Many people started a trial. Few reached the moment where Devtron was useful: their own app, deployed.

The data showed a clear split.
Users who deployed an app within about 20 minutes stayed 3 times more than users who did not.
Most users never got there.
They stopped at setup: connecting a cluster, configuring a pipeline, finding the next step.

### What I decided

The trial had one job: get the user to a first deploy, fast.
I rebuilt it around a guided path to that deploy.
Every step that did not lead there moved out of the way.

{{< figure src="/images/work/freemium-welcome.webp" alt="Devtron welcome screen with three starting paths: deploy a Helm chart, connect a cluster, create an app" caption="Today's onboarding starts from three direct paths to a first deploy. Public image from Devtron docs." >}}

### What I left out

The easy answer was to add more features to the trial.
I did not, because the data said users left before they saw the features we already had.

### What happened

- Inbound leads grew 4x.
- Users converted to paid 33% faster.

## Part 2: Approvals for regulated enterprises

### The problem

In more than 15 interviews with banks and other regulated companies, one blocker came up again and again.
Their rules required sign-off before any change reached production.
Without that, their compliance teams could not approve Devtron.

### What I decided

I shipped multi-level approvals and deployment policies.

- **Approval policies.** A team requires one or more approvals, from specific people or groups, before a deploy or a config change reaches production.
- **Deployment windows.** Teams block deploys during risky periods, or allow them only in a maintenance window.
- **Exceptions.** Named people can act in an emergency, and the system records it.

{{< figure src="/images/work/approval-profile.webp" alt="Create approval profile screen requiring approvals from specific users before deploying to banking-prod" caption="An approval profile: changes to production need sign-off from specific approvers. Public image from Devtron docs." >}}

{{< figure src="/images/work/deploy-window-blocked.webp" alt="Dialog saying deployment is blocked, with time until the restriction ends and the users allowed to act" caption="A deployment window blocks deploys and says exactly who may still act, and for how long. Public image from Devtron docs." >}}

### What I left out

I did not build a separate workflow engine.
Approvals attach to the release flow teams already use, so adopting them changed nothing else.

### What happened

Approvals became a key reason regulated enterprises chose Devtron.

## What I learned

Both problems looked like missing features. Neither was.
The trial needed fewer steps, not more features.
Enterprises needed control, which let them say yes.
