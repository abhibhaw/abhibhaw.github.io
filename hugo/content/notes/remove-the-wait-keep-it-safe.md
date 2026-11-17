---
title: "Remove the wait, keep it safe: one idea in five products"
date: 2026-11-16
description: "A GPU platform, a debugging assistant, an ops portal, an AI agent control plane and a health agent look unrelated. They solve the same problem."
kind: "product"
---

I have worked on products in very different domains.
A GPU platform for AI teams.
An AI assistant that debugs failed deployments.
An internal ops portal at a fintech company.
A control plane for AI agents.
A voice AI nurse for older parents.

Looking back, they solve one problem.
**Someone is waiting on someone else, and the wait is unsafe to remove.**

## The pattern

| Product | Who waits | On whom | What made it unsafe to remove |
|---|---|---|---|
| [GPU Platform](/work/gpu-platform/) | An AI team | The infra team, for a GPU | Self-service could waste costly GPUs |
| [BharatPe portal](/work/bharatpe-self-service/) | An engineer | DevOps, for a query or access | Open access to production data |
| [Atlas](/work/atlas/) | A developer with a failed deploy | An expert who can read the logs | A wrong fix on production |
| [AI Control Plane](/work/ai-control-plane/) | An agent team | Manual checks before a release | An agent acting without limits |
| [Sakhi](/projects/sakhi/) | A parent with diabetes | Family, for a reminder | Health advice from a model |

In every case, the person in the middle exists for a reason.
The infra team protects the GPUs. DevOps protects production data. The family protects the parent.
Removing them without replacing what they protect is reckless.

## The move

The fix has the same shape each time:

1. **Find what the person in the middle actually protects.**
   The DevOps team did not want to approve each query. They wanted nobody to drop a production table.
2. **Turn that protection into a rule the system enforces.**
   Quotas for GPUs. Access rules and an audit log for the portal. Safety checks that run before the model, in code.
3. **Let people serve themselves inside the rule.**
   The rule is set once. Every request after that is instant.
4. **Keep a person for the decisions that need one.**
   Atlas explains and suggests; a person applies the fix. Peira proposes a change; a person approves it.

The results follow the same shape.
GPU tickets fell by more than 80%.
A 14-day wait became 17 minutes.
Root-cause time went from hours to about a minute.

## Why this matters for AI products

AI makes this pattern more common and more urgent.
An AI agent can now do work that used to need a person.
That removes a wait, and it removes the person who kept things safe.

So the product question for most AI features is not "can the model do it?"
It is: **what was the person in the middle protecting, and how does the product protect it now?**

If you can answer that, you can usually ship.
If you cannot, the model is the least of your problems.
