---
title: "How I work"
layout: "how-i-work"
lede: "I find the real problem, write down what not to build, and build the first version myself to learn fast. Then I test it with real users and real data."
description: "My product loop: discover, define with non-goals and safety rules, build with AI agents, test for judgment, and learn."
loop_note: "What I learn in step 5 changes the problem I study in step 1."
loop:
  - name: "Discover"
    text: "Find where people wait, and why. Interviews, funnels, support tickets."
  - name: "Define"
    text: "A short spec with the user, the decision, the non-goals and the safety rules."
  - name: "Build"
    text: "I build the first version with AI agents, in days, to test the idea."
  - name: "Test"
    text: "Evals, red teams and real users. Check that the product makes good calls."
  - name: "Learn"
    text: "Update the problem statement first, then the code."
---

## 1. Find where people wait

Most of my products started when I saw someone waiting on someone else.
At BharatPe, engineers waited [14 days for a database query](/work/bharatpe-self-service/).

## 2. Write down what not to build

Every spec I write has a "Not built" section.
For [Atlas](/work/atlas/), version one had no automatic fixes: it explains, and a person decides.
A non-goal written on day one prevents a month of debate.

## 3. Put the rules in code

A rule in a document gets broken.
In [Sakhi](/projects/sakhi/), safety checks run before and after the model on every message.

## 4. Build the first version myself

I build first versions with AI coding agents, in parallel streams, and I review what comes back.
A working version answers what a spec cannot: does the user understand it, and does the model behave?

## 5. Test whether it feels right

In Sakhi, every automated test passed, and the agent still sounded like a phone menu.
Now I ask of every test suite: would it fail if a real user found the product wrong?
The full story: [why our health agent sounded scripted](/notes/why-our-health-agent-sounded-scripted/).

## 6. Decide with evidence

I write each major decision as a one-page explainer: conclusion first, evidence next, open questions last.
Everyone argues about the same facts.
