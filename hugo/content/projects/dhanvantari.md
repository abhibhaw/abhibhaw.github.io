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
---

## The problem

A doctor in India asks: what is the first-line treatment for this condition under the Indian guideline, with medicines available here?
Global clinical tools answer from US and UK guidelines.
General chatbots answer quickly and confidently, often without a source.

A doctor cannot use an answer they cannot check.

## The rules I set first

I wrote these before any code. They decide every trade-off later.

1. **No uncited claims.** Every statement in an answer links to the source it came from.
2. **Refusal over hallucination.** If the sources do not answer the question, say so.
3. **Grounded only in retrieved sources.** The model does not add what it "knows".
4. **India context first.** Indian guidelines and medicines rank ahead of global ones.
5. **A reference tool, not a diagnostic device.** It informs a doctor. It does not decide for one.
6. **No patient data.**

## The release gate

Rules mean nothing unless something enforces them.
So every change must pass an evaluation gate before it ships:

| Test set | What it measures | Target |
|---|---|---|
| Faithfulness | Answers with zero unsupported claims | 95% or more |
| Refusal | Unanswerable questions correctly refused | 90% or more, with 0% confident fabrication |
| India context | Correct answers on India-specific questions | 80% or more |
| Retrieval | The right source found in the top 20 | 85% or more |

Two rules keep the gate honest.
Nobody edits a reference answer to make a test pass.
And when a doctor flags a wrong answer, it becomes a new test case.

## What I left out

I chose not to train or fine-tune a model.
Models improve every few months, and anyone can use the best one.
What others cannot copy quickly is the Indian clinical corpus, the retrieval quality and the citation accuracy.
That is where the effort goes.

## Where it is

The evaluation sets and most of the pipeline are built.
The gate has not yet run end to end on real answers.
That is the next milestone, before any doctor sees an answer.
