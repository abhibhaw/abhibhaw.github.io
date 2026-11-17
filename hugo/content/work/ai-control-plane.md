---
title: "AI Control Plane: agents you can trust in production"
kicker: "Devtron · AI agents"
weight: 30
summary: "Companies had no safe way to release AI agents, control what they do, or change their model. I defined one control plane to build, ship and govern agents."
headline_metric: { value: "3", label: "design partners in private beta" }
role: "Product Manager"
when: "2026 - now"
status: "private beta"
metrics:
  - { value: "Private beta", label: "current stage" }
  - { value: "3", label: "design partners shaping the product" }
facts:
  - label: "User"
    text: "Companies that want AI agents in production, and the platform teams that must keep them safe."
  - label: "Problem"
    text: "Teams could build an agent quickly. They had no safe way to release it, limit what it can do, or change its model without breaking it."
  - label: "Decision"
    text: "One control plane for the whole agent lifecycle: build, release, govern, and replay-test a change against real past conversations before it goes live."
  - label: "Not built"
    text: "Another agent framework. Teams keep the framework they already use. The control plane governs how agents ship and run, not how they are written."
  - label: "Status"
    text: "In private beta with 3 design partners, not public yet. They shape what we build next. This page covers the problem and the product decisions only."
---

## The problem

Building an AI agent got easy. Running one in production did not.
Teams that shipped agents hit three questions:

1. **How do we release a change safely?** A new prompt or tool can break an agent in ways a unit test misses.
2. **What is the agent allowed to do?** It calls real tools with real data.
3. **Can we change the model?** A new model can be cheaper and better, or quietly worse on your tasks.

Scripts and manual checks work for one agent. They fail at ten.

## The decisions

- **One control plane** for build, release, access and testing, so someone sees the whole agent.
- **Replay before release.** A change is tested against real past conversations, so a model swap is decided with evidence.
- **Governance by default.** A platform team sets the rules once. Agent teams ship inside them.

## What I left out

Another agent framework.
Teams keep the framework they already chose.
