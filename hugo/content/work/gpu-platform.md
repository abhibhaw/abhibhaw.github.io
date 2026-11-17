---
title: "GPU Platform: GPUs without tickets"
kicker: "Devtron · AI infrastructure"
weight: 10
summary: "AI teams waited days for a GPU and weeks to ship a model. I defined a self-service GPU platform where infra teams set the rules once and AI teams move on their own."
headline_metric: { value: "80%+", label: "fewer GPU tickets" }
role: "Product Manager"
when: "2026"
metrics:
  - { before: "days", value: "self-serve", label: "to get a GPU" }
  - { value: "80%+", label: "fewer GPU tickets" }
  - { value: "23%", label: "better GPU utilization and allocation, on average" }
facts:
  - label: "User"
    text: "Enterprise AI teams that train and serve models, and the infra teams that run their GPU clusters."
  - label: "Problem"
    text: "Every GPU went through an infra ticket. Teams waited days to get one and weeks to ship a model. Costly GPUs sat idle or stayed locked to one team."
  - label: "Decision"
    text: "Self-service GPU workspaces, training jobs and one-click model deploys. Infra teams set quotas, usage policies and GPU sharing once, and the platform enforces them."
  - label: "Not built"
    text: "A custom GPU scheduler. The platform builds on proven open-source schedulers (Kubeflow and Kueue), and the work went into self-service and policy. Multi-cluster support came later."
  - label: "Result"
    text: "GPU tickets fell by 80%+. Developers got full self-service. GPU utilization and allocation improved by 23% on average."
links:
  - { label: "GPU Orchestration on devtron.ai", url: "https://devtron.ai/platform/gpu-orchestration" }
  - { label: "Blog: GPU platform problems on Kubernetes", url: "https://devtron.ai/blog/kubernetes-gpu-management-problems/" }
flows:
  access:
    caption: "The ticket left the path. Infra teams set the rules once, before any request."
    lanes:
      - label: "Before"
        steps:
          - node: "AI engineer"
          - edge: "opens a ticket"
          - node: "Infra team"
            struck: true
            note: "checks capacity by hand, days"
          - edge: "sets it up"
          - node: "GPU"
            note: "kept by one team, often idle"
      - label: "After"
        steps:
          - node: "Infra team"
            note: "sets quotas, policies, sharing once"
          - edge: "rules apply to every request"
          - node: "Platform"
          - edge: "AI engineer self-serves"
          - node: "GPU"
            note: "notebook, training job or model deploy"
---

## How it works

Teams waited too long, and the GPUs were used too little.
Both came from one team doing every step by hand.

{{< flow "access" >}}

{{< figure src="/images/work/gpu-fleet.webp" alt="GPU fleet dashboard showing total, allocated, used and available GPUs, utilization charts and a GPU inventory by type" caption="The fleet view turns a capacity argument into a number. Public product image from devtron.ai, with sample data." >}}

## What I left out

A new GPU scheduler.
Open-source schedulers already place work well, so the effort went where teams waited: access, policy and deployment.

{{< figure src="/images/work/gpu-pipeline.webp" alt="ML pipeline graph with pre-process, train and evaluate steps, run history and input parameters" caption="Training pipelines run from the same interface. Public product image from devtron.ai, with sample data." >}}

## What happened

- GPU tickets fell by more than 80%.
- Developers got full self-service for notebooks, training and model deploys.
- GPU utilization and allocation improved by 23% on average.
