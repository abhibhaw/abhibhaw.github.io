---
title: "Sakhi: an AI nurse that calls first"
kicker: "Consumer health · Voice AI"
weight: 10
status: "in development"
status_note: "Doctor and legal review are open."
summary: "Older Indians with diabetes, BP and thyroid miss medicines and readings unless family reminds them. Sakhi is a voice-first AI nurse that calls them on WhatsApp in Hindi."
role: "Founder, product and build"
when: "2026 - now"
facts:
  - label: "User"
    text: "\"Kamla ji\": 45 to 72, Hindi first, reads a little and prefers speaking. Two to four chronic conditions, 3 to 8 tablets a day. Uses WhatsApp. A son or daughter is the caregiver."
  - label: "Problem"
    text: "Readings and medicines get logged only when family nudges. Apps and forms do not work for her."
  - label: "Decision"
    text: "Proactive voice calls on WhatsApp. One care plan across all her conditions. Deterministic safety checks run before and after the model on every message."
  - label: "Not built"
    text: "Diagnosis, prescribing or dose changes, ever. No app to install, no public signup, no clinician dashboard yet."
  - label: "Status"
    text: "In development. Not live with members. Doctor and legal review are open."
flows:
  safety:
    caption: "Safety runs as code around the model. A red flag never reaches the model."
    lanes:
      - label: "Every message, call turn and reading"
        steps:
          - node: "Message"
          - edge: "checked first"
          - node: "Red-flag rules"
            note: "fixed, not a model"
          - edge: "no flag"
          - node: "Model"
            note: "no tool can change a dose"
          - edge: "drafts"
          - node: "Output guard"
            note: "blocks unsafe drafts"
          - edge: "safe"
          - node: "Reply"
      - label: "When a rule fires"
        steps:
          - node: "Red-flag rules"
          - edge: "flag"
          - node: "Fixed protocol"
            note: "approved text, no model"
          - edge: "sent at once"
          - node: "Reply"
---

## Who it is for

Kamla ji is in her sixties and takes six tablets a day.
When her son forgets to remind her, she forgets, and her doctor sees a gap.

## The decisions

| Decision | Because |
|---|---|
| Voice first, on WhatsApp | She uses WhatsApp daily and prefers to speak. No app, no forms. |
| Sakhi calls first | She will not open an app. Sakhi reaches out on its own schedule. |
| One care plan | Diet advice must work for all her conditions at once. |
| A contact budget | At most 3 messages and 1 call a day, with quiet hours. |

## Safety is code

In health, one unsafe reply ends trust.
So safety does not depend on the model behaving well.

{{< flow "safety" >}}

If a check fails, Sakhi does the safe thing.
Every clinical text needs a doctor's approval, tied to the exact text.

In the first runs with a real model, the checks passed all 52 red-team cases with no guardrail violations.
The same tests passed while Sakhi still sounded scripted, so I am [changing how it is tested](/notes/why-our-health-agent-sounded-scripted/).

## What is left

- Doctor review of every clinical text.
- Legal review.
- A dry run with real members.
- Tests that measure judgment.
