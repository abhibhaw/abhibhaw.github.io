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
---

## The problem

Companies bought GPUs for AI work and put them in Kubernetes clusters.
Then the GPUs became a queue.

An AI engineer who needed a GPU opened a ticket.
The infra team checked capacity, set up the workload and sent back access.
That took days.
Shipping a trained model to an endpoint took more tickets and weeks.

At the same time, the GPUs were not busy.
A team that got a GPU kept it, in case it needed it again.
Other teams waited while that GPU sat idle.

So there were two problems with one cause.
AI teams waited too long, and the GPUs were used too little.
Both came from one team doing every step by hand.

## What I decided

The goal was to remove the ticket, not to make the ticket faster.

**AI teams serve themselves.**
An engineer starts a GPU notebook, runs a training job or deploys a model from one interface.
Model serving uses the standard open-source servers (KServe, vLLM, Triton), so teams keep the tools they know.

**Infra teams set the rules once.**
Self-service without rules would make the idle-GPU problem worse.
So the infra team sets a quota for each team, usage policies, and how GPUs are shared.
GPU sharing (MIG and time-slicing) lets several small jobs use one large GPU.
The platform enforces the rules on every request, so nobody has to approve each one.

**One view of the fleet.**
Infra teams see every GPU: allocated, used and free, by team.
That turns a capacity argument into a number.

{{< figure src="/images/work/gpu-fleet.webp" alt="GPU fleet dashboard showing total, allocated, used and available GPUs, utilization charts and a GPU inventory by type" caption="The GPU fleet view: allocation and use by team, and the full GPU inventory. Public product image from devtron.ai, with sample data." >}}

## What I left out

I did not build a new GPU scheduler.
Open-source schedulers already solve placement well.
The platform builds on them, and the product effort went where teams actually waited: access, policy and deployment.

Multi-cluster support and finer access controls came after the first version.
The first version had to prove one thing: that teams could serve themselves inside rules the infra team trusted.

{{< figure src="/images/work/gpu-pipeline.webp" alt="ML pipeline graph with pre-process, train and evaluate steps, run history and input parameters" caption="Training pipelines run from the same interface, with run history. Public product image from devtron.ai, with sample data." >}}

## What happened

- GPU tickets fell by more than 80%.
- Developers got full self-service for notebooks, training and model deploys.
- GPU utilization and allocation improved by 23% on average, because quotas and sharing freed GPUs that sat idle.

## What I learned

Self-service is a policy problem first and a UI problem second.
AI teams wanted speed. Infra teams wanted control.
The product worked when one feature gave both: the infra team writes the rule once, and every request after that is instant.
