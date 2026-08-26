---
title: Agent Effectiveness Dashboard — Phase 5 Metrics
section: 06-operations-it
doc_type: template
status: active
owner: Operations Lead
last_updated: 2026-08-26
lang: en
---

# Agent Effectiveness Dashboard — Phase 5 Metrics

**Version:** 1.0 | **Effective:** 2026-08-26 | **Tracking Period:** Weeks 1–12

> **Purpose.** Track weekly agent invocations, effectiveness, and team adoption during Phase 5 (Live Execution & Team Scaling). This dashboard feeds the monthly deep-dive review and the agent effectiveness score calculation. Update every Monday with the prior week's data.

---

## Weekly Invocation Log

Track each agent use: who invoked it, when, what for, outcome (success/rework/not used).

| Week | Date | Agent | Invoker | Use Case | Time Saved (min) | Quality (1–5) | Friction (0–3) | Notes |
|------|------|-------|---------|----------|------------------|---------------|----------------|-------|
| 1 | 2026-08-26 | | | | | | | |
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| | | | | | | | | |

**Columns:**
- **Week**: Phase 5 week number (1–12)
- **Date**: Invocation date
- **Agent**: Agent name (e.g., `doc-smith`, `ksa-compliance`, `react-19-architect`)
- **Invoker**: Team member name or role (e.g., "Alice / Docs", "Bob / Product")
- **Use Case**: What task did the agent help with? (e.g., "Draft PDPL policy", "Review React component", "Design schema migration")
- **Time Saved (min)**: Estimated minutes saved vs. doing it manually (leave blank if N/A; 0 if no time saved)
- **Quality (1–5)**: 5 = perfect first-draft output; 3 = usable with light edits; 1 = had to redo
- **Friction (0–3)**: 0 = seamless; 1 = one follow-up needed; 2 = multiple iterations; 3 = more friction than doing it alone
- **Notes**: Any blockers, surprises, suggestions

---

## Weekly Summary (Fill Monday morning)

| Week | Total Invocations | Agents Used | Avg Quality | Avg Friction | Est. Cumulative Hours Saved | Key Blockers | Win of the Week |
|------|-------------------|-------------|-------------|--------------|------------------------------|--------------|-----------------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |
| 12 | | | | | | | |

**Cumulative totals at end of Phase 5:**
- Total invocations across all agents: ____
- Unique agents used: ____
- Total hours saved (est.): ____
- Average quality across all invocations: ____ / 5
- Average friction across all invocations: ____ / 3

---

## Per-Agent Effectiveness Score (Monthly)

Run this calculation at end of Weeks 4, 8, and 12 (after each month of Phase 5).

**Formula:** `Effectiveness = ((Invocation Count × Quality) − Friction) ÷ Time to Invoke`

| Agent | Invocations (mo) | Avg Quality | Avg Friction | Time to Invoke (min) | Effectiveness Score | Status |
|-------|------------------|-------------|--------------|----------------------|---------------------|--------|
| doc-smith | | | | 2 | | Keep / Iterate / Retire |
| ar-mirror | | | | 3 | | Keep / Iterate / Retire |
| ksa-compliance | | | | 5 | | Keep / Iterate / Retire |
| family-warden | | | | 4 | | Keep / Iterate / Retire |
| react-19-architect | | | | 3 | | Keep / Iterate / Retire |
| express-backend-pro | | | | 3 | | Keep / Iterate / Retire |
| regulatory-corpus-keeper | | | | 4 | | Keep / Iterate / Retire |
| sql-migrator | | | | 3 | | Keep / Iterate / Retire |
| genkit-rag-specialist | | | | 5 | | Keep / Iterate / Retire |
| flight-curriculum-designer | | | | 4 | | Keep / Iterate / Retire |
| ml-instructor-trainer | | | | 4 | | Keep / Iterate / Retire |
| flight-data-pipeline-engineer | | | | 3 | | Keep / Iterate / Retire |
| instructor-deployment-steward | | | | 3 | | Keep / Iterate / Retire |
| governance-auditor | | | | 3 | | Keep / Iterate / Retire |
| entity-facts-guardian | | | | 4 | | Keep / Iterate / Retire |
| cross-repo-sync | | | | 5 | | Keep / Iterate / Retire |
| | | | | | | |

**Scoring guide:**
- **Keep**: Effectiveness ≥ 1.0 (agent earned its slot; team loves it or it saves real time)
- **Iterate**: 0.5 ≤ Effectiveness < 1.0 (mixed results; refine agent scope, constraints, or team guidance)
- **Retire**: Effectiveness < 0.5 (unused or adds more friction than value; mark for removal in Phase 6)

---

## Workflow Execution Tracker

Track when each workflow runs, who triggered it, and what it surfaced.

| Week | Workflow | Trigger | Participant Agents | Outcome | Issues / Findings |
|------|----------|---------|-------------------|---------|-------------------|
| 1 | `/full-sync` | Manual (ops lead) | entity-facts-guardian, cross-repo-sync | Green / Red | |
| | | | | | |
| 2 | `/feature-ship` | Manual (product lead) | react-19-architect, express-backend-pro, ksa-compliance | Green / Red | |
| | | | | | |
| 3 | `/compliance-audit` | Manual (compliance lead) | ksa-compliance, flight-data-pipeline-engineer | Green / Red | |
| | | | | | |
| Ongoing | `/full-sync` | Automatic (Sundays 18:00 UTC) | entity-facts-guardian, cross-repo-sync | Green / Red | |

---

## Team Adoption Snapshot (End of Each Week)

| Week | # Team Members Using Agents | # Using Agents Regularly (3+/week) | New Agents Discovered | Most-Used Agent | Adoption Sentiment (1–5) |
|------|-------|-----|------|--------|----------|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |
| 9 | | | | | |
| 10 | | | | | |
| 11 | | | | | |
| 12 | | | | | |

**Sentiment scale:** 1 = "Agents are a burden"; 3 = "Agents are useful sometimes"; 5 = "We can't imagine working without agents now"

**Success bar:** By end of Phase 5, ≥3 team members using agents 3+/week, adoption sentiment ≥4.

---

## New Hire Onboarding Progress

Track when first hires complete agent infrastructure training.

| Hire # | Name / Role | Week Started | Agent Training Completed | Can Name 2 Agents | Has Run `/full-sync` | Notes |
|--------|------------|--------------|-------------------------|-------------------|----------------------|-------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

**Success criterion:** Each new hire completes Week 1 agent orientation (reads training guide, runs `/full-sync` once, can name ≥2 agents).

---

## Monthly Deep-Dive Snapshot (Weeks 4, 8, 12)

### Month 1 Recap (End of Week 4)

**Summary:** [1-2 sentences on how teams adopted agents in the first month]

**Wins:** [List 2-3 concrete wins from invocation log — e.g., "doc-smith draft saved 3 hours on HR policy", "react-19-architect caught RTL bug early"]

**Blockers:** [List top 2-3 friction points — e.g., "ksa-compliance output too verbose", "unclear when to use regulatory-corpus-keeper vs. generic search"]

**Agent Retirements Proposed:** [Any agents to flag for potential retirement? List here.]

**Improvements for Month 2:** [Actionable changes based on feedback — e.g., "tighten ksa-compliance prompt", "add agent cheat sheet to Slack"]

---

### Month 2 Recap (End of Week 8)

**Summary:** 

**Wins:**

**Blockers:**

**Agent Retirements Proposed:**

**Improvements for Month 3:**

---

### Month 3 Recap (End of Week 12)

**Summary:**

**Wins:**

**Blockers:**

**Readiness for Phase 6:**
- [ ] ≥3 team members using agents 3+/week
- [ ] ≥2 features shipped via `/feature-ship` without manual friction
- [ ] `/compliance-audit` completed; roadmap established
- [ ] ≥2 new hires trained and productive
- [ ] No agent has been marked "unused" or "friction" for 2+ consecutive months
- [ ] Monthly effectiveness review shows positive ROI across portfolio

---

## How to Use This Dashboard

1. **Weekly (Mondays 10:00 UTC):** Operations Lead opens the dashboard and logs the prior week's invocations from Slack (#fly-gaca-team thread). Updates "Weekly Summary" row for that week.

2. **Monthly (Week 4/8/12, after standup):** Operations Lead + Founder calculate per-agent effectiveness scores using the formula above. Mark each agent Keep / Iterate / Retire. Fill in "Monthly Deep-Dive Snapshot" section.

3. **Standup Input:** Every Monday standup (06-operations-it/phase5-live-execution-plan.md, Weeks 6–8) references the dashboard summary — "This week: X invocations, Y agents used, Z hours saved."

4. **Decision Record:** At end of Phase 5 (after Week 12), Founder files a decision-log entry summarizing Phase 5 learnings (agents that earned their slots, iterations needed, agents to retire, roadmap for Phase 6). Reference this dashboard.

---

## Shared Access

- **Location:** Google Sheet (invite: Founder, Operations Lead, Product Lead, Flight Lead, Compliance Lead)
  - Or: Airtable base linked to this repo via `tools/` automation
  - Or: Keep as markdown here and Operations Lead updates locally, commits weekly
  
- **Permission:** Operations Lead has write access; all team leads have read-only view for standup reference

---

*Fly GACA | Phase 5: Agent Effectiveness Dashboard | Confidential — Internal*
