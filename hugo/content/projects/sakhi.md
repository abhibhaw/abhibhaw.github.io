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
---

## Who it is for

Picture Kamla ji.
She is in her sixties, lives in a North Indian city, and manages diabetes, blood pressure and thyroid.
She takes six tablets a day.
She reads a little Hindi and prefers to speak.
Her son lives in another city and reminds her on the phone.

When he forgets, she forgets.
Her readings go unrecorded, and her doctor sees a gap.

## The decisions

**Voice first, on WhatsApp.**
She already uses WhatsApp every day.
So Sakhi needs no app and no forms.
It speaks Hindi, keeps text short, and uses buttons for yes and no.

**Sakhi calls first.**
Most health apps wait for the user to open them.
Kamla ji will not.
Sakhi runs on its own schedule and reaches out, so she engages without her family pushing her.

**One plan, not one app per disease.**
Diet advice must work for diabetes, blood pressure and thyroid at the same time.
So Sakhi keeps one care plan across all her conditions.

**A contact budget.**
Too many messages feel like nagging.
By default Sakhi sends at most 3 messages and 1 call a day, with quiet hours.

**Careful words.**
Sakhi calls itself a "health saathi", not an "advisor", because "advisor" can suggest a medical licence.
It never claims to be human.

## Safety is code, not a prompt

In health, one unsafe reply ends trust.
So safety does not depend on the model behaving well.

- **Before the model:** fixed red-flag rules check every message, every call turn and every reading. A dangerous reading triggers a fixed protocol, with no model involved.
- **After the model:** an output check blocks unsafe drafts and sends an approved message instead.
- **No dangerous tools:** the model cannot change thresholds or doses. It has no tool that can.
- **Fail closed:** if a check fails, Sakhi does the safe thing.
- **Doctor sign-off:** every clinical text needs a doctor's approval, tied to the exact text.

In the first runs with a real model, the safety checks passed all 52 red-team cases with no guardrail violations.
That is a safety result, not a quality result.
The same tests passed while the product still sounded scripted.
I wrote about that gap: [why our health agent sounded scripted](/notes/why-our-health-agent-sounded-scripted/).

## What is left

- Doctor review of every clinical text.
- Legal review.
- A dry run with real members.
- Tests that measure judgment, not script compliance.
