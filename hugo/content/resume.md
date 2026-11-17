---
# Single source for the resume.
# The /resume/ page and static/resume.pdf are both built from this file.
# After an edit, run scripts/resume-pdf.sh to update the PDF.
title: "Resume"
layout: "resume"
url: "/resume/"
description: "Resume of Abhibhaw Asthana, Product Manager for AI-native products."
searchHidden: true

name: "Abhibhaw Asthana"
headline: "Product Manager · AI-native products"
contact:
  - label: "hi@abhibhaw.com"
    url: "mailto:hi@abhibhaw.com"
  - label: "abhibhaw.com"
    url: "https://abhibhaw.com"
  - label: "linkedin.com/in/abhibhaw"
    url: "https://www.linkedin.com/in/abhibhaw/"
  - label: "github.com/abhibhaw"
    url: "https://github.com/abhibhaw"

summary: >-
  Product manager who builds.
  I find where people wait, decide what to build and what to leave out, and ship the first version with AI agents.
  Currently leading product at Devtron.
  Products in enterprise B2B, AI agents, health and education.

experience:
  - company: "Devtron"
    role: "Product Manager"
    dates: "May 2023 - Present"
    about: "Open-source platform that companies use to deploy and run software on Kubernetes. I lead product here, across 3 products."
    products:
      - name: "AI Control Plane"
        about: "build, ship and govern AI agents securely"
        bullets:
          - title: "Agents in production"
            text: "Companies had no safe way to release AI agents, control what they do, or change their model. I defined one control plane to build, release, govern and replay-test agents before changes go live. In private beta with 3 design partners."
      - name: "GPU Platform"
        about: "self-service GPUs for AI teams"
        bullets:
          - title: "Faster GPU access"
            text: "AI teams waited days for GPUs and weeks to ship a model, through infra tickets. I defined self-service GPU workspaces, training jobs and one-click model deploys, cutting GPU tickets by 80%+ and giving developers full self-service."
          - title: "Better GPU use"
            text: "Costly GPUs sat idle or stayed locked to one team. I added team quotas, usage policies and GPU sharing (MIG, time-slicing), improving GPU utilization and allocation by 23% on average."
      - name: "Devtron Platform"
        about: "the core Kubernetes deployment product"
        bullets:
          - title: "Trial conversion"
            text: "Trial users left before they saw value; users who deployed in 20 minutes stayed 3x more. I rebuilt the trial around a guided first deploy: 4x inbound leads, 33% faster paid conversion."
          - title: "Enterprise approvals"
            text: "15+ interviews showed regulated enterprises could not adopt us without sign-off before production changes. I shipped multi-level approvals and deploy policies, which became a key reason they chose Devtron."
          - title: "Atlas, AI debugging assistant"
            text: "Users with failed deployments had to read raw logs and often opened support tickets. I shipped Atlas, which finds the root cause and suggests a fix: root-cause time fell from hours to about a minute, and time to recovery from hours to minutes."

  - company: "BharatPe"
    role: "Software Engineer, internal tools"
    dates: "Mar 2022 - May 2023"
    bullets:
      - title: "Self-service ops portal"
        text: "Engineers waited 14 days for a small DevOps team to run database queries and server changes. I built a self-service portal with access rules and audit logs: 20,000+ requests, wait cut to 17 minutes."

  - company: "Gepton"
    role: "Co-founder and CTO"
    note: "during B.Tech"
    dates: "Aug 2020 - Mar 2022"
    bullets:
      - title: "Software for small businesses"
        text: "Small business owners needed software but had no tech team. I turned their needs into scoped products like payment dashboards and online stores, and shipped 37 apps in 18 months with a team of 5."

projects_note: "Independent, in development"
projects:
  - title: "Sakhi"
    text: "Older Indians with diabetes, BP and thyroid miss medicines unless family reminds them. I am building an AI nurse that calls them on WhatsApp in Hindi and briefs family and doctors. Its safety checks pass all 52 red-team cases."
  - title: "Dhanvantari"
    text: "Indian doctors lack a trusted clinical Q&A tool that covers Indian guidelines and medicines. I am building one where every claim links to a source, and a release is blocked if citation accuracy drops."
  - title: "Ejento Shimyureta"
    text: "Teams cannot safely re-run an agent's production conversations to test a change. I am building a tool that rebuilds the apps an agent used from its traces, then replays each conversation with a live model."
  - title: "Peira"
    text: "Teams testing AI agents lack realistic behavior data. I ran 100 open-source agents on 10,000 tasks and collected 9,902 usable recordings for $261."

education:
  - school: "National Institute of Technology, Rourkela"
    degree: "B.Tech"
    dates: "2019 - 2023"

skills:
  - label: "Product"
    text: "customer discovery and interviews, specs and PRDs, prioritization, funnel and activation metrics (PostHog), enterprise governance (RBAC, approvals, audit)"
  - label: "AI"
    text: "GPU platforms (quotas, MIG, time-slicing), model serving (KServe, vLLM, Triton), AI agents and their governance, evals and replay testing, RAG with citations, voice AI, LLM safety and red teaming"
  - label: "Technical"
    text: "Kubernetes, Docker, Go, Python, TypeScript, React, PostgreSQL; building prototypes with AI coding agents"
---
