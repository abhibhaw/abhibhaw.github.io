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
flows:
  trial:
    caption: "The trial now leads to one goal: the user's own app, deployed."
    lanes:
      - label: "Before"
        steps:
          - node: "Sign up"
          - edge: "then"
          - node: "Connect cluster, set up pipeline, find next step"
            struck: true
            note: "most users stopped here"
          - edge: "few reach"
          - node: "First deploy"
      - label: "After"
        steps:
          - node: "Sign up"
          - edge: "guided path"
          - node: "First deploy"
            note: "users who got here in 20 min stayed 3x more"
          - edge: "then"
          - node: "Paid"
            note: "33% faster"
  approvals:
    caption: "Approvals attach to the release path teams already use."
    lanes:
      - label: "Production release"
        steps:
          - node: "Deploy or config change"
          - edge: "needs"
          - node: "Approval policy"
            note: "1 to 6 approvers, people or groups"
          - edge: "then checks"
          - node: "Deployment window"
            note: "blocked or maintenance period"
          - edge: "releases to"
          - node: "Production"
      - label: "Emergency"
        steps:
          - node: "Named person"
          - edge: "acts, and it is recorded"
          - node: "Production"
---

Devtron is an open-source platform that companies use to deploy and run software on Kubernetes.
This case covers one growth problem and one enterprise problem.

## Part 1: The trial

Users who deployed their own app within about 20 minutes stayed 3 times more.
Most never got there.

{{< flow "trial" >}}

I left out new trial features.
Users left before they saw the features we already had.

{{< figure src="/images/work/freemium-welcome.webp" alt="Devtron welcome screen with three starting paths: deploy a Helm chart, connect a cluster, create an app" caption="Onboarding today starts from direct paths to a first deploy. Public image from Devtron docs." >}}

Result: 4x inbound leads, and 33% faster conversion to paid.

## Part 2: Approvals

In more than 15 interviews, regulated companies said the same thing.
Their rules required sign-off before any change reached production.

{{< flow "approvals" >}}

{{< figure src="/images/work/approval-profile.webp" alt="Create approval profile screen requiring approvals from specific users before deploying to banking-prod" caption="An approval profile for production. Public image from Devtron docs." >}}

{{< figure src="/images/work/deploy-window-blocked.webp" alt="Dialog saying deployment is blocked, with time until the restriction ends and the users allowed to act" caption="A deployment window says who may still act, and for how long. Public image from Devtron docs." >}}

Result: approvals became a key reason regulated enterprises chose Devtron.
