---
title: "How I work"
layout: "how-i-work"
lede: "I find the real problem, write down what not to build, and build the first version myself to learn fast. Then I test it against reality, not against my own spec."
description: "My product loop: discover, define with non-goals and safety rules, build with AI agents, test for judgment, and learn."
loop_note: "Step 5 feeds step 1. Building is one step in the loop, not the loop."
loop:
  - name: "Discover"
    text: "Find where people wait, and why. Interviews, funnels, support tickets."
  - name: "Define"
    text: "A short spec with the user, the decision, the non-goals and the safety rules."
  - name: "Build"
    text: "I build the first version with AI agents, in days, to test the idea."
  - name: "Test"
    text: "Evals, red teams and real users. Test judgment, not just compliance."
  - name: "Learn"
    text: "Change the problem statement, not just the code."
---

## 1. Find where people wait

Most of my products started from the same observation: someone is waiting on someone else.
An AI team waits for a GPU ticket.
An engineer waits 14 days for a database query.
A parent waits for family to remind them about medicines.

The wait is the problem.
The fix is rarely a faster queue.
It is a safe way for people to do the work themselves.

## 2. Write down what not to build

Every spec I write has a "Not built" section, and it is often the most important part.

- **Sakhi**, a health voice agent: no diagnosis, no dose changes, ever. No app to install.
- **Dhanvantari**, a clinical Q&A tool: no fine-tuned model, because the advantage is the sources, not the model.
- **Atlas** at Devtron: no automatic fixes in the first version. It explains, and a person decides.

A non-goal written on day one saves a month of debate later.
It also tells the team what "done" means.

## 3. Make the rules executable

A rule in a document gets broken.
A rule in code does not.

- In Sakhi, safety checks run before and after the model on every message. The model has no tool that can change a dose.
- In Dhanvantari, an evaluation gate blocks any release where answers make unsupported claims.
- At Devtron, approvals and quotas are enforced by the platform, so nobody has to approve each request by hand.

## 4. Build the first version myself

I build first versions with AI coding agents.
I split the work into parallel streams with clear ownership, and I review what comes back.

This is not about writing code instead of a PM's job.
It is about learning in days what used to take a quarter.
A working version answers questions that a spec cannot: does the user understand it, does the model behave, is the idea worth more time?

## 5. Test judgment, not compliance

The hardest lesson came from Sakhi.
Every automated test passed, and the agent still sounded like a phone menu.
The tests checked that it followed the script. They did not check that it understood the person.

Now I ask one question of every test suite: would it fail if the product felt wrong to a real user?
If not, the suite measures the wrong thing.
The full story is in [why our health agent sounded scripted](/notes/why-our-health-agent-sounded-scripted/).

## 6. Decide with evidence

I write each major decision as a one-page explainer: the conclusion first, the evidence after, and the open decisions at the end.
Engineers, designers and leaders read the same page and argue about the same facts.
