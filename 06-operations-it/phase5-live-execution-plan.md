---
title: Phase 5 — Live Execution & Team Scaling
section: 06-operations-it
doc_type: plan
status: active
owner: Founder / Operations
last_updated: 2026-08-26
lang: en
---

# Phase 5: Live Execution & Team Scaling

**Version:** 1.0 | **Effective:** 2026-08-26 | **Duration:** Weeks 1–12 (ongoing)

> **Purpose.** Phase 5 transitions the agent infrastructure from "ready" to "operational" — teams execute live workflows, agents handle real work, and the family infrastructure proves itself under load. This is the first operational cycle: monitor health, iterate on agent effectiveness, scale to full team, and document learnings.

---

## Context

**Phase 3 & 4 complete.** The family infrastructure is live:
- 21 agents operational across iflygaca/Office, iflygaca/FlyGACA, iflygaca/Captain-Adel
- 5 workflows registered (`/full-sync`, `/feature-ship`, `/compliance-audit`, `/security-hardening`, `/perf-sprint`)
- Family contract synchronized (byte-identical across three repos)
- Team training materials published; all new hires receive agent infrastructure training in Week 1

**Now:** Teams need to use the infrastructure in real work. Phase 5 measures whether the agent layer actually scales, where agents add value vs. friction, and what iteration is needed.

---

## Phase 5 Objectives

| Objective | Success Criterion | Owner |
| --- | --- | --- |
| **First workflow lives** | `/full-sync` runs weekly; team interprets report within 5 min | Operations |
| **First feature shipped via agents** | One React + Express + curriculum feature coordinated via `/feature-ship` | Product + Flight |
| **Compliance audit baseline** | First `/compliance-audit` run; findings documented; PDPL posture known | Compliance |
| **Team adopts agents** | 3+ engineers invoke agents in daily work (doc-smith, ksa-compliance, etc.) | All |
| **First hire trained** | One new hire completes Week 1 agent training; runs `/full-sync`; names two agents | HR |
| **Iteration cycle established** | Monthly agent effectiveness review (what's working, what's friction) | Operations |

---

## Execution Timeline: Weeks 1–12

### Week 1: Kick-Off — Team Executes First Workflow

**Owner:** Founder + Operations Lead

**Tasks:**

- [ ] **Kick-off meeting:** Show team the agent infrastructure (21-agent roster, 5 workflows, constraints)
- [ ] **First `/full-sync` run:** Operations lead triggers manually; team interprets the report together
  - *Expected output:* Green report (all repos aligned; entity facts match; decision log consistent)
  - *If red:* Agents flag drift; team decides what to fix
- [ ] **Agent discovery walkthrough:** Each team member runs `ls .claude/agents/` in their repo; reads one agent file
- [ ] **Slack integration:** Set up weekly `/full-sync` report posting to #fly-gaca-team (Slack → Claude Cloud Run webhook)

**Deliverable:** Team has run agents once; understands report structure; knows where to find agents

---

### Week 2: First Feature Coordinated via `/feature-ship`

**Owner:** Product Lead + Flight Lead

**Tasks:**

- [ ] **Select a small, real feature** that touches React + Express (or Captain-Adel curriculum if flight-focused)
  - *Example: Add a new study-progress dashboard screen (React) + API endpoint (Express) + mock exam scope update (curriculum)*
  - *Constraint:* Must involve at least two of the three repos to justify multi-repo coordination
  
- [ ] **Run `/feature-ship <name>`** with the selected feature
  - react-19-architect reviews React changes
  - express-backend-pro reviews API design & security
  - ksa-compliance gates any regulatory impact
  - cross-repo-sync coordinates the synchronized PR merge
  
- [ ] **Document the workflow:**
  - What agents were invoked and why
  - What blockers or requests came back
  - Was it faster or slower than manual coordination?
  - What would make it smoother next time?

**Deliverable:** First feature shipped with agent coordination; team feedback captured

---

### Week 3: First Compliance Audit

**Owner:** Compliance Lead + Founder

**Tasks:**

- [ ] **Run `/compliance-audit`** manually
  - ksa-compliance + flight-data-pipeline-engineer audit PDPL, ZATCA, Nitaqat, flight-hour schema
  
- [ ] **Document baseline posture:**
  - What compliance gaps exist today?
  - Which are blockers for shipping?
  - Which are nice-to-haves?
  - Roadmap for Q3/Q4 2026
  
- [ ] **Escalate findings:** If any high-severity gaps (e.g., PDPL boundary violation, missing ZATCA invoice logic), open GitHub issues with remediation steps

**Deliverable:** First compliance audit report; roadmap for gaps; team awareness of compliance posture

---

### Week 4: Agent Adoption — Daily Invocations

**Owner:** All team members

**Tasks:**

- [ ] **Each engineer invokes an agent at least once:**
  - Ask `@doc-smith` to fix a PDF build
  - Ask `@ksa-compliance` to review a compliance change
  - Ask `@regulatory-corpus-keeper` to verify a GACAR citation
  - Ask `@react-19-architect` for RTL/i18n guidance
  
- [ ] **Log invocations:** Slack thread in #fly-gaca-team, capturing:
  - What you asked the agent
  - How long it took
  - Did it save time or add friction?
  - What was the quality of the output?
  
- [ ] **Feedback loop:** Operations lead aggregates feedback for weekly review

**Deliverable:** Evidence of agents being used; data on time/friction/quality

---

### Week 5: First New Hire Onboards

**Owner:** HR Lead + Ops Lead

**Tasks:**

- [ ] **First non-founder hire completes Week 1 onboarding** (05-people/onboarding-checklist-2026-07-03.md)
  - Day 3: Agent infrastructure orientation
    - Reads 06-operations-it/agent-infrastructure-team-training.md
    - Runs `/full-sync` once
    - Lists agents in their repo
  
- [ ] **Success checkpoint:** New hire can name two agents and explain what they do
  
- [ ] **Capture onboarding feedback:**
  - Was the training clear?
  - Did the `/full-sync` walkthrough help?
  - What was confusing?
  - Update the training guide if needed

**Deliverable:** First hire successfully trained on agent infrastructure; feedback loop created

---

### Weeks 6–8: Iteration Cycle — Weekly Standup

**Owner:** Operations Lead + Founder

**Tasks (every Monday 10:00 UTC):**

- [ ] **Agent effectiveness standup (30 min):**
  - How many invocations this week? (metric)
  - Which agents added value? Which added friction?
  - Any workflow blockers or process friction?
  - Agent utilization dashboard (if tracking via Slack)
  
- [ ] **Monthly deep-dive (Week 8 only, 60 min):**
  - Aggregate 4 weeks of data
  - Identify patterns: which agents are loved, which are unused?
  - Propose iterations (e.g., improve doc-smith output, add new agent, retire one if unused)
  - Roadmap adjustments
  
- [ ] **Decision record:** Capture decisions in 01-governance/decision-log.md (DEC-013, etc.)

**Deliverable:** Weekly standup data; monthly iteration review; updated roadmap

---

### Weeks 9–12: Scale & Integrate

**Owner:** All team members + Operations

**Tasks:**

- [ ] **Second/third new hires onboard** with agent training
  - Capture cumulative feedback; refine training if needed
  
- [ ] **Second feature shipped via `/feature-ship`**
  - Is the workflow faster the second time?
  - Are teams confident coordinating across repos?
  
- [ ] **Run `/security-hardening`** — proactive security audit before any public release
  
- [ ] **Monthly agent effectiveness dashboard:**
  - Track invocation counts per agent
  - Track invocation-to-value ratios
  - Identify underutilized agents
  - Propose improvements or sunsetting
  
- [ ] **Update agent-workforce-plan.md:**
  - Record learnings from Phase 5
  - Note which agents earned their slot; which need iteration
  - Propose Phase 6 (if needed)

**Deliverable:** Team fluent in agent infrastructure; automated monitoring in place; roadmap updated

---

## Key Metrics

Track these weekly in a shared dashboard (Google Sheet or Notion):

| Metric | Target | Frequency |
| --- | --- | --- |
| **`/full-sync` runs** | 1 automatic (Sunday 18:00 UTC) + 1 manual on-demand | Weekly |
| **Workflow invocations (all 5)** | ≥1 per week | Weekly |
| **Agent invocations (per agent)** | ≥2 per week (all agents combined) | Weekly |
| **New features shipped via `/feature-ship`** | ≥1 per month | Monthly |
| **Compliance audits run** | 1 baseline + 1 quarterly | Quarterly |
| **Agent effectiveness score** | See below | Monthly |
| **New hires trained** | ≥1 per month | Ongoing |

### Agent Effectiveness Score (Monthly)

For each agent, track:
- **Invocation count:** How often was it used?
- **Time saved:** Did invoking the agent save time vs. doing it manually?
- **Quality:** Was the output correct and usable on first try?
- **Friction:** Did invoking the agent add friction (e.g., needing follow-ups)?

**Formula:** 
```
Effectiveness = (Invocation Count × Quality) − Friction
                ÷ Time to invoke
```

High effectiveness → Keep agent. Low effectiveness → Iterate or retire.

---

## Success Criteria (Phase 5 Complete)

| Criterion | When to declare Phase 5 done |
| --- | --- |
| **Agent adoption** | 3+ team members invoke agents in daily work; ≥10 invocations/week across all agents |
| **Workflow confidence** | Team ships ≥2 features via `/feature-ship` without manual coordination friction |
| **Compliance baseline** | `/compliance-audit` completed; compliance roadmap established |
| **New hire onboarding** | ≥2 new hires complete Week 1 agent training; both can name ≥2 agents and explain what they do |
| **Monitoring live** | Weekly `/full-sync` reports posted; team reviews in <5 min; action items tracked |
| **Iteration cycle** | Monthly agent effectiveness review held; improvements documented in decision log |
| **Team fluency** | Team asks agents proactively; workflow triggers (`/feature-ship`, `/compliance-audit`) run without prompting |

---

## Risk Mitigation

| Risk | Mitigation |
| --- | --- |
| **Team doesn't use agents** → Lack of adoption kills ROI | Weekly standups celebrate agent usage; make it a team norm; tie to OKRs |
| **Agents create more work** → Friction instead of velocity | Monthly effectiveness review; kill agents that consistently underperform |
| **Workflows fail silently** → Cross-repo drift undetected | `/full-sync` runs automatically; Slack posting ensures visibility |
| **First hire finds training confusing** → Poor onboarding loop | Capture feedback immediately; update guide; second hire sees improvements |
| **Agents drift from constraints** → Creep in agent scope or use cases | Quarterly review of agent definitions in `.claude/agents/*.md` against actual usage |

---

## Roles & Accountability

| Role | Responsibility |
| --- | --- |
| **Founder** | Oversee Phase 5; make strategic decisions on agent iterations; approve new agents |
| **Operations Lead** | Run weekly standups; track metrics; coordinate agent effectiveness reviews; update roadmaps |
| **Product Lead** | First `/feature-ship` run; feedback on react-19-architect + express-backend-pro |
| **Flight Lead** | First curriculum iteration with ml-instructor-trainer; feedback on flight agents |
| **Compliance Lead** | First `/compliance-audit` run; PDPL/ZATCA roadmap; ksa-compliance feedback |
| **HR Lead** | First hire onboarding; capture training feedback; iterate training guide |
| **All team members** | Use agents in daily work; log invocations; participate in monthly reviews |

---

## Handoff Criteria (to Phase 6, if needed)

Phase 5 is "done" when:
- Team routinely (daily/weekly) invokes agents without thinking about it
- Workflows (`/full-sync`, `/feature-ship`, etc.) run automatically; team reviews output in <5 min
- First 2–3 hires trained and productive
- Monthly effectiveness review shows positive ROI across agent portfolio
- No agent is marked "unused" or "friction" for 2+ consecutive months

**Then:** Phase 6 = scale to full team (if hiring), upstream agents to open-source marketplace, or optimize based on learnings

---

## Documents to Create/Update During Phase 5

| Document | Purpose | Owner |
| --- | --- | --- |
| **Agent Effectiveness Dashboard** | Weekly metric tracking | Operations Lead |
| **Phase 5 Learnings** | Findings from Weeks 1–12; posted to decision log | Founder |
| **Updated agent-workforce-plan.md** | Record which agents earned their slot; propose Phase 6 | Founder |
| **Compliance Roadmap** | PDPL, ZATCA, Nitaqat gaps and timeline | Compliance Lead |
| **Onboarding Guide Iterations** | Feedback from new hires; training improvements | HR Lead |

---

## Next Steps (Week 1)

1. **Schedule kick-off meeting** — Founder + full team, 60 min
2. **Run first `/full-sync`** — Operations lead triggers; share report in Slack
3. **Assign agent champions** — Each person picks one agent to "own" (doc-smith, ksa-compliance, etc.) and learn deeply
4. **Create metrics dashboard** — Shared spreadsheet for weekly tracking
5. **Open #fly-gaca-team channel** — Slack channel for agent usage, questions, feedback

---

**Phase 5 begins now. First kickoff meeting: [TBD by Founder].**

---

*Fly GACA | Phase 5: Live Execution & Team Scaling | Confidential — Internal*
