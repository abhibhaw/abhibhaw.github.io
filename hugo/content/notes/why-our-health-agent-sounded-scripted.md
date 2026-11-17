---
title: "Why our health agent sounded scripted, and the tests that hid it"
date: 2026-11-17
description: "Every test passed, and the agent still sounded like a phone menu. The tests checked that it followed the script, not that it understood the person."
kind: "product"
---

Sakhi is a voice AI nurse I am building for older Indians with diabetes, blood pressure and thyroid.
It calls them on WhatsApp in Hindi.

In October, the test results looked excellent.
The simulator ran 22 synthetic personas, and all 22 passed.
The red team ran 52 attack prompts, and all 52 passed.

Then I read the transcripts.
Sakhi sounded like a phone menu.

## What the transcripts showed

A caregiver wrote in, worried, in the middle of an emergency.
Sakhi replied with its command menu.
The simulator marked it PASS.

A member had already followed a safety instruction.
Sakhi sent the same instruction again, word for word.
PASS.

The tests were green, and the product was wrong.

## Why the tests passed

I asked for a full audit of the agent and its tests.
The answer was uncomfortable.

**The tests measured compliance, not judgment.**
The 22 personas were the scenarios from my own spec.
The checks were mostly pattern matches and counts: did the reply contain the right phrase, did it stay under the limit.
A reply could pass every check and still ignore what the person said.

**The simulator had no memory.**
A bug meant every simulated turn ran with an empty history.
So the tests never saw the agent repeat itself.

**The architecture kept the model out of the conversation.**
This was the real cause.
Only one of seven paths through the agent reached the language model.
The other six sent fixed text.
Caregiver messages never reached the model at all.

The audit put it in one line: "The model can reason. The architecture keeps it out of the turn, or starves it of context."

**The prompt taught the model to copy.**
Where the model did run, the prompt was mostly rules plus example phrases.
The model copied the examples as a template.

## How it happened

Every one of these was a safety decision I made on purpose.
Fixed text for alerts, because a model should not improvise in an emergency.
Strict rules in the prompt, because health is high stakes.
Tests that check the script, because the script was safe.

Each decision was right on its own.
Together they built a safe agent that did not listen.

## What I am changing

The fix keeps safety where it belongs and gives judgment back to the model.

1. **Keep fixed rules for detection and alerts.** A dangerous reading still triggers a fixed protocol, with no model involved.
2. **Let the model write every other reply.** It gets the person's history, trends and approved health content, and room to think.
3. **Fix the tests first.** Every other change is measured with them:
   - A simulator with real conversation history.
   - A held-out set of personas that are not in my spec, so the agent cannot be tuned to the test.
   - A model-based judge that scores relevance and memory, not phrases.
   - A check that fails on repeated replies.

The new tests come first for a simple reason.
If I change the agent with the old tests, they will pass again, and I will learn nothing.

## The lesson for any AI product

A test suite encodes what you think "good" means.
If your idea of good is "followed the rules", the suite will reward an agent that follows rules and understands nothing.

So I now ask one question of every test suite: **would it fail if the product felt wrong to a real user?**
If the answer is no, it is measuring the wrong thing, however green it is.
