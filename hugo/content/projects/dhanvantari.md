---
title: "Dhanvantari: answers a doctor can check"
kicker: "Clinical AI · Retrieval"
weight: 20
status: "in development"
status_note: "The eval gate has not run on real answers yet."
summary: "Indian doctors lack a trusted clinical Q&A tool that covers Indian guidelines and medicines. Dhanvantari answers clinical questions, and every claim links to its source."
role: "Founder, product and build"
when: "2026 - now"
facts:
  - label: "User"
    text: "A verified doctor in India with a clinical question during the working day."
  - label: "Problem"
    text: "Global tools do not cover Indian guidelines, Indian brands of medicines or Indian practice. General chatbots answer confidently without sources."
  - label: "Decision"
    text: "No uncited claims. Refuse rather than guess. Answers use only retrieved sources, India context first. An evaluation gate blocks a release that falls below its thresholds."
  - label: "Not built"
    text: "A custom or fine-tuned model. The advantage is the corpus and citation quality, not the model. No patient data, no diagnosis, no mobile app in the first version."
  - label: "Status"
    text: "In development. The evaluation sets and gate are designed. The gate has not yet run on real answers."
gate:
  caption: "Release targets. A change ships only if every row clears its mark. Targets, not results."
  rows:
    - { name: "Faithfulness", note: "answers with zero unsupported claims", target: 95 }
    - { name: "Refusal", note: "unanswerable questions refused, 0% confident fabrication", target: 90 }
    - { name: "Retrieval", note: "right source in the top 20", target: 85 }
    - { name: "India context", note: "correct on India-specific questions", target: 80 }
---

## The problem

Global clinical tools answer from US and UK guidelines.
General chatbots answer confidently, often without a source.
A doctor cannot use an answer they cannot check.

## The rules, written before any code

1. **No uncited claims.** Every statement links to its source.
2. **Refuse rather than guess.**
3. **Use only retrieved sources**, Indian guidelines and medicines first.
4. **A reference tool, not a diagnostic device.** No patient data.

## The release gate

{{< gate >}}

Nobody edits a reference answer to make a test pass.
When a doctor flags a wrong answer, it becomes a new test case.

## What I left out

A custom or fine-tuned model.
The lasting advantage is the Indian clinical corpus and citation accuracy.

## Where it is

The evaluation sets and most of the pipeline are built.
The gate has not yet run end to end on real answers.
