---
title: Customer Health Scoring Model
section: 08-customer-success
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-03
lang: en
---

# Customer Health Scoring Model

## Purpose

This document defines how Fly GACA measures the health of its B2B customers —
flight schools / Approved Training Organizations (ATOs), charter operators,
MROs, and commercial operators that license Fly GACA for their cadets and staff.
The health score is a single 0–100 number that drives proactive Customer
Success motions (onboarding, at-risk intervention, renewal, expansion).

It is operationalized by [`scripts/health_score.py`](../scripts/health_score.py)
— see [`health-dashboard-spec.md`](health-dashboard-spec.md) for the dashboard
and run instructions.

## Scoring Dimensions & Weights

The composite score is a weighted blend of five dimensions, each scored 0–100.
Weights sum to 1.0.

| Dimension | Weight | What it measures |
|-----------|--------|------------------|
| Product Usage | 30% | Active users vs. licensed seats; use of the library, tools, study/exam prep, and Captain Adel |
| Engagement | 20% | Logins, session depth, response to outreach, QBR participation |
| Support Health | 20% | Ticket volume/severity, time-to-resolution, escalations |
| Financial / Contract | 15% | Payment timeliness, contract status, seat utilization |
| Sentiment | 15% | NPS / CSAT, qualitative feedback, champion strength |

`composite = 0.30·usage + 0.20·engagement + 0.20·support + 0.15·financial + 0.15·sentiment`

## Score Bands

| Band | Range | Meaning | Playbook |
|------|-------|---------|----------|
| Healthy | 80–100 | Realizing value; expansion/advocacy candidate | [Expansion](expansion-playbook.md) |
| Neutral | 60–79 | Stable but watch for drift | [Renewal](renewal-playbook.md) |
| At-Risk | 0–59 | Churn risk; needs intervention | [At-Risk](at-risk-playbook.md) |

## Refresh Cadence

Scores are recalculated **weekly**. Any account scoring below 60 automatically
notifies the assigned CSM and enters the relevant playbook.

## Related

- [Health Dashboard Spec](health-dashboard-spec.md)
- [At-Risk Playbook](at-risk-playbook.md)
- [Customer Success overview](../customer-success.md)
