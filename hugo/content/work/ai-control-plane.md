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

Building an AI agent got easy.
Running one in production did not.

Teams that shipped agents hit the same three questions:

1. **How do we release a change safely?** A new prompt or tool can break an agent in ways a unit test does not catch.
2. **What is the agent allowed to do?** An agent calls real tools with real data. Someone must set and enforce limits.
3. **Can we change the model?** Models change every few months. A new model can be cheaper and better, or quietly worse on your tasks.

Each team answered these with scripts and manual checks.
That works for one agent. It fails at ten.

## What I decided

**One control plane, not five tools.**
Build, release, access control and testing are steps of one lifecycle.
Splitting them across tools means nobody sees the whole agent.
So the product covers the lifecycle in one place.

**Replay before release.**
The best test for an agent is its own past.
Before a change goes live, the control plane replays real past conversations against the new version and shows what changed.
A model swap becomes a decision with evidence, not a guess.

**Governance by default.**
Every agent gets an owner, limits on what it can access, and an audit trail.
A platform team sets the rules once. Agent teams ship inside them.

This is the same pattern as the [GPU Platform](/work/gpu-platform/) and [BharatPe](/work/bharatpe-self-service/): remove the wait, and keep it safe.

## What I left out

We did not build another agent framework.
Teams already chose one, and switching frameworks is a cost they will not pay for governance.
The control plane works with the agents teams already have.

## Where it is now

The product is in private beta.
Three design partners run it with their own agents.
Their feedback decides what we build next.
