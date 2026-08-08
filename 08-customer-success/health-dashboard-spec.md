---
title: Customer Health Dashboard Specification
section: 08-customer-success
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-09
lang: en
---

# Customer Health Dashboard Specification

## Purpose

This document specifies how the Fly GACA health-scoring model is operationalized
into a working dashboard. It implements the methodology defined in
[`customer-health-scoring.md`](customer-health-scoring.md) and powers the
proactive playbooks (at-risk, renewal, expansion).

The current implementation is the workbook
[`customer-health-dashboard.xlsx`](customer-health-dashboard.xlsx) in this folder.

## Data Sources & Inputs

Each customer row carries the five pre-scored dimensions (0–100). In production
these dimension scores are derived from product telemetry, the support system,
the CRM, and survey data; this spec treats them as inputs.

| Column | Type | Description |
|--------|------|-------------|
| `customer` | text | Account name |
| `segment` | text | Flight Schools / Charter Operators / MROs / Commercial Operators |
| `plan` | text | Starter / Professional / Enterprise |
| `usage` | 0–100 | Product Usage dimension |
| `engagement` | 0–100 | Engagement dimension |
| `support` | 0–100 | Support Health dimension |
| `financial` | 0–100 | Financial / Contract dimension |
| `sentiment` | 0–100 | Sentiment dimension |

## Scoring Dimensions & Weights

The composite score is a weighted blend (weights sum to 1.0), matching
`customer-health-scoring.md`:

| Dimension | Column | Weight |
|-----------|--------|--------|
| Product Usage | `usage` | 30% |
| Engagement | `engagement` | 20% |
| Support Health | `support` | 20% |
| Financial / Contract | `financial` | 15% |
| Sentiment | `sentiment` | 15% |

`composite = 0.30·usage + 0.20·engagement + 0.20·support + 0.15·financial + 0.15·sentiment`

## Score Bands & Triggered Playbooks

| Band | Range | Recommended next step |
|------|-------|-----------------------|
| Healthy | 80–100 | [Expansion playbook](expansion-playbook.md) — pursue growth / advocacy |
| Neutral | 60–79 | [Renewal playbook](renewal-playbook.md) — reinforce value, monitor |
| At-Risk | 0–59 | [At-risk playbook](at-risk-playbook.md) — intervene, escalate |

## Output & Reporting

The dashboard shows, per customer: composite score, band, and the recommended
playbook, plus a portfolio summary (account count, average score, and count per
band).

A production dashboard should additionally visualize: score distribution by
band, trend over time, accounts by segment/plan, and a drill-down to the weakest
dimension per account.

## Refresh Cadence

Health scores are recalculated **weekly** (per `customer-health-scoring.md`).
Accounts scoring below 60 automatically notify the assigned CSM and enter the
relevant playbook.

## Related

- [Customer Health Scoring](customer-health-scoring.md)
- [At-Risk Playbook](at-risk-playbook.md)
- [Voice of Customer](voice-of-customer.md)
