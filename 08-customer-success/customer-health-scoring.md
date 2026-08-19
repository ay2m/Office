---
title: Customer Health Scoring Model & Automation Spec
section: 08-customer-success
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Customer Health Scoring Model & Automation Spec

## Purpose

This document defines the mathematical scoring engine and technical automation spec for Fly GACA Customer Health Scoring. It measures the health of B2B flight schools / Approved Training Organizations (ATOs), charter operators, MROs, and commercial operators licensing Fly GACA Pro for cadet cohorts.

The composite score is a single 0–100 metric calculated automatically every week, driving proactive Customer Success triggers (onboarding, at-risk intervention, renewal, expansion).

It operationalizes [`health-dashboard-spec.md`](health-dashboard-spec.md) and [`customer-health-dashboard.xlsx`](customer-health-dashboard.xlsx).

> **Read "Licensed Seats" as package capacity.** Schools buy annual packages, not seats — Cohort
> (SAR 12,000/yr, up to 25 seats, one 90-day intake), Academy (SAR 39,000/yr, up to 100 seats),
> Institution (from SAR 72,000). Every seat ratio below is measured against the package's
> capacity ceiling (`orgs.seat_limit`), which is a contracted maximum the school pays for
> whether or not it fills. See [`03-finance/monetization.md`](../03-finance/monetization.md).

---

## Composite Formula & Dimension Weights

The composite customer health score \(H\) is a weighted linear combination of five normalized dimension scores \(S_i \in [0, 100]\):

\[
H = 0.30 \cdot S_{\text{usage}} + 0.20 \cdot S_{\text{engagement}} + 0.20 \cdot S_{\text{support}} + 0.15 \cdot S_{\text{financial}} + 0.15 \cdot S_{\text{sentiment}}
\]

| Dimension | Weight (\(w_i\)) | Telemetry Source | Primary Indicator |
|-----------|-----------------|------------------|-------------------|
| **Product Usage** (\(S_{\text{usage}}\)) | **30%** | Cloud SQL: `study_progress.summary` joined to the `org_seats` roster (the same query behind `GET /api/org/:orgId/cohort-readiness`) | Seat activation, mock exam volume, Captain Adel AI queries |
| **Engagement** (\(S_{\text{engagement}}\)) | **20%** | Web analytics & CS CRM logs | Instructor dashboard logins, session depth, QBR attendance |
| **Support Health** (\(S_{\text{support}}\)) | **20%** | Support Ticketing API (Zendesk) | Ticket volume, resolution time, SLA breaches, escalation rate |
| **Financial / Contract** (\(S_{\text{financial}}\)) | **15%** | Accounting DB / ZATCA Billing + `orgs.seat_limit` | Package capacity fill, invoice payment timeliness |
| **Sentiment** (\(S_{\text{sentiment}}\)) | **15%** | In-app NPS / CSAT & QBR surveys | Cadet NPS, instructor CSAT, executive champion strength |

---

## 5-Factor Mathematical Calculations

### 1. Product Usage Score (\(S_{\text{usage}}\)) — Weight: 30%

Evaluates active participation and learning velocity across the cadet roster over a rolling 7-day window.

\[
S_{\text{usage}} = 0.40 \cdot U_{\text{active}} + 0.30 \cdot U_{\text{exams}} + 0.30 \cdot U_{\text{ai}}
\]

Where:
- **Active Seat Ratio (\(U_{\text{active}}\)):** measured against **assigned roster seats**, not
  package capacity — a Cohort school that provisions 18 of its 25 seats should not be scored as
  28% idle for capacity it deliberately left unused. Capacity fill is a separate, financial signal
  (§4).
  \[
  U_{\text{active}} = \min\left(100, \, \frac{\text{Active Cadets (7d)}}{\text{Assigned Roster Seats}} \times 100\right)
  \]
- **Mock Exam Completion Velocity (\(U_{\text{exams}}\)):**
  \[
  U_{\text{exams}} = \min\left(100, \, \frac{\text{Completed Mock Exams (7d)}}{\text{Assigned Roster Seats} \times 1.5} \times 100\right)
  \]
- **AI Instructor Engagement (\(U_{\text{ai}}\)):**
  \[
  U_{\text{ai}} = \min\left(100, \, \frac{\text{Captain Adel Queries (7d)}}{\text{Assigned Roster Seats} \times 4.0} \times 100\right)
  \]

> **Granularity warning on Cohort accounts.** With a 25-seat ceiling, one cadet is worth **4
> percentage points** of any seat ratio, and a full Cohort roster of 25 means an 85% target is
> unreachable except at 22 seats (88%) — 21 seats is 84% and misses. Thresholds expressed as
> percentages therefore do not mean what they mean on a 100-seat Academy account. **State Cohort
> triggers in cadets, not percent** (see the alert matrix below), and never open an at-risk case
> on a one-seat move.

### 2. Engagement Score (\(S_{\text{engagement}}\)) — Weight: 20%

Measures organizational alignment, instructor governance, and executive touchpoints over a rolling 30-day window.

\[
S_{\text{engagement}} = 0.40 \cdot E_{\text{instructor}} + 0.30 \cdot E_{\text{depth}} + 0.30 \cdot E_{\text{qbr}}
\]

Where:
- **Instructor Governance (\(E_{\text{instructor}}\)):**
  \[
  E_{\text{instructor}} = \min\left(100, \, \frac{\text{Instructor Dashboard Logins (30d)}}{\text{Provisioned Instructors} \times 4.0} \times 100\right)
  \]
- **Cadet Study Session Depth (\(E_{\text{depth}}\)):**
  \[
  E_{\text{depth}} = \min\left(100, \, \frac{\text{Average Session Duration (mins)}}{25.0} \times 100\right)
  \]
- **Executive QBR Participation (\(E_{\text{qbr}}\)):**
  \[
  E_{\text{qbr}} = \begin{cases} 
  100 & \text{Head of Training / Sponsor attended scheduled QBR} \\
  60 & \text{Designated CFi / Admin attended QBR} \\
  0 & \text{QBR missed, rescheduled >2x, or declined}
  \end{cases}
  \]

### 3. Support Health Score (\(S_{\text{support}}\)) — Weight: 20%

Quantifies technical friction and customer support load over a rolling 30-day window.

\[
S_{\text{support}} = \max\left(0, \, 100 - \left(25 \cdot T_{\text{P1}} + 10 \cdot T_{\text{P2}} + 5 \cdot T_{\text{P3}} + 15 \cdot S_{\text{breach}}\right)\right)
\]

Where:
- \(T_{\text{P1}}\): Unresolved P1 Critical tickets (system outage / auth blocking) in last 30d.
- \(T_{\text{P2}}\): Unresolved P2 High tickets (roster sync / score saving error) in last 30d.
- \(T_{\text{P3}}\): Open P3 Medium/Low tickets in last 30d.
- \(S_{\text{breach}}\): First-response or resolution SLA breaches in last 30d.

### 4. Financial / Contract Health Score (\(S_{\text{financial}}\)) — Weight: 15%

Tracks package capacity fill and invoice payment compliance.

\[
S_{\text{financial}} = 0.50 \cdot F_{\text{fill}} + 0.50 \cdot F_{\text{payment}}
\]

Where:
- **Package Capacity Fill (\(F_{\text{fill}}\)):**
  \[
  F_{\text{fill}} = \min\left(100, \, \frac{\text{Assigned Roster Seats}}{\text{Package Capacity (}orgs.seat\_limit\text{)}} \times 100\right)
  \]
  Under per-seat licensing an under-filled contract meant the school was paying for air, and a
  low ratio was a straightforward renewal risk. Under package pricing the school pays SAR 12,000
  either way, so this metric no longer measures overspend — it measures **how much of the
  contracted value the school is actually taking**, and it reads in two directions:
  - **Low fill** (≪ capacity) is a *value-realization* risk, not a billing one — the school is
    leaving capacity on the table and will feel the renewal is expensive. Route it to the
    onboarding/at-risk motion, not to a discount conversation.
  - **Fill at or near capacity** is an **upgrade signal**, since the ceiling is hard: the
    provisioning API refuses any call that would push the roster past `seat_limit`, so a school
    at 25 of 25 physically cannot enrol its next cadet without moving to Academy.
- **Payment Compliance (\(F_{\text{payment}}\)):**
  \[
  F_{\text{payment}} = \max\left(0, \, 100 - \max\left(0, \, \text{Days Past Due} - 14\right) \times 5\right)
  \]
  *(100 pts for payment on time or within 14-day grace period; deducts 5 pts per day thereafter).*

### 5. Sentiment Score (\(S_{\text{sentiment}}\)) — Weight: 15%

Captures subjective customer satisfaction, NPS surveys, and executive relationship stability.

\[
S_{\text{sentiment}} = 0.50 \cdot N_{\text{nps}} + 0.30 \cdot C_{\text{csat}} + 0.20 \cdot K_{\text{champion}}
\]

Where:
- **Net Promoter Score Normalization (\(N_{\text{nps}}\)):**
  \[
  N_{\text{nps}} = \begin{cases} 
  100 & \text{Promoter (Rating 9–10)} \\
  60 & \text{Passive (Rating 7–8)} \\
  0 & \text{Detractor (Rating 0–6)}
  \end{cases}
  \]
- **Customer Satisfaction Rating (\(C_{\text{csat}}\)):** Average CSAT rating (1–5 scale) normalized: \(C_{\text{csat}} = \text{CSAT Avg} \times 20\).
- **Executive Champion Index (\(K_{\text{champion}}\)):**
  \[
  K_{\text{champion}} = \begin{cases} 
  100 & \text{Active executive champion & public reference logo} \\
  70 & \text{Stable sponsor contact} \\
  30 & \text{Sponsor role changed / champion departed}
  \end{cases}
  \]

---

## Score Bands & Recommended CS Playbooks

| Band | Composite Score (\(H\)) | Operational Meaning | Recommended Playbook | Automated System Trigger |
|------|------------------------|---------------------|----------------------|--------------------------|
| **Healthy** | **80–100** | High adoption, strong ROI proof, zero SLA breaches | [Expansion Playbook](expansion-playbook.md) | Solicit testimonial / case study; notify AE on the band-upgrade trigger below |
| **Neutral** | **60–79** | Stable account; minor usage drift or pending QBR | [Renewal Playbook](renewal-playbook.md) | Flag for CSM bi-weekly review; schedule mid-term review |
| **At-Risk** | **0–59** | Churn threat; idle roster or support friction | [At-Risk Playbook](at-risk-playbook.md) | Immediate P1 CSM alert; initiate 14-day recovery plan |

---

## Technical Automation & Data Pipeline Spec

### 1. Architectural Overview

```
[ orgs / org_seats  ] ──┐
[ study_progress    ] ──┼──► Cloud Scheduler ──► Cloud Run (Express) ──► Compute Score ──► Cloud SQL ──► Webhook Alerting
[ Zendesk API       ] ──┤      (Weekly Sun 01:00)   POST /api/org/health-sweep   (H composite)   (org_health)   (Slack/CRM/Email)
[ ZATCA Invoicing   ] ──┘                           me-central2 (Dammam)
```

Everything on the left of that diagram except Zendesk is a table in the **Cloud SQL Postgres**
instance behind the Cloud Run service — the same store the org dashboard reads. There is no
separate telemetry database and no document store.

### 2. Scheduled Job Implementation Spec

- **Endpoint:** `POST /api/org/health-sweep` on the Cloud Run service, authenticated by the same
  `CRON_SECRET` header pattern the billing renewal job uses — **to be built**; the org router
  today exposes `/mine`, `/:orgId/cohort-readiness` and `/:orgId/provision-seats` only.
- **Schedule:** Cloud Scheduler, every Sunday at 01:00 UTC+3 (`cron: 0 1 * * 0`).
- **Execution Logic:**
  1. Select active orgs from `orgs` (with `seat_limit` = the purchased package capacity).
  2. Aggregate the roster: `org_seats` left-joined to `users`, `entitlements` and
     `study_progress.summary` over 7d/30d — seats exist before their invitee has an account, so
     every join is outer and the nulls are meaningful (an unclaimed seat is *provisioned but not
     active*, and must not be counted as an active cadet).
  3. Query Support API for ticket counts & SLA breaches in past 30d.
  4. Fetch invoice status from Billing DB (`daysPastDue`).
  5. Compute the 5 dimension scores \(S_i\) and composite score \(H\).
  6. Upsert the current row and append a dated snapshot row, both keyed by `org_id`.

### 3. Health Record Shape (one row per org, latest snapshot)

```json
{
  "orgId": "3f0c…-uuid",
  "orgName": "oxford-saudia-dammam",
  "package": "cohort",
  "seatLimit": 25,
  "updatedAt": "2026-08-19T01:00:00Z",
  "compositeScore": 88.4,
  "band": "Healthy",
  "dimensions": {
    "usage": 88.0,
    "engagement": 82.5,
    "support": 100.0,
    "financial": 94.0,
    "sentiment": 76.0
  },
  "metrics": {
    "assignedSeats": 22,
    "activeCadets7d": 20,
    "activeSeatRatio": 0.91,
    "capacityFill": 0.88,
    "weeklyMockExamsPerCadet": 1.8,
    "monthlyInstructorLogins": 12,
    "openTicketsCount": 0,
    "daysPastDue": 0,
    "latestNpsScore": 9
  },
  "previousCompositeScore": 79.0,
  "delta7d": +9.4,
  "triggeredPlaybook": "expansion"
}
```

### 4. Automated Alert & Escalation Matrix

- **Condition 1 — Score Drops to At-Risk (\(H < 60\)) or \(\Delta H \le -15\) pts:**
  - System fires Slack alert to `#cs-at-risk-alerts` with detailed dimension breakdown.
  - Automatically creates Urgent P1 Task in Hubspot/Salesforce CRM assigned to CSM.
  - Triggers [At-Risk Playbook](at-risk-playbook.md) workflow.
- **Condition 2 — Capacity Fill near the package ceiling & \(H \ge 80\):**
  - Trigger in **seats, not percent**, because the ceiling is small enough that a percentage is
    ambiguous: **Cohort — 22 or more of 25 assigned** (85% of 25 is 21.25, which no roster can
    be); **Academy — 85 or more of 100**; Institution — per contract.
  - System fires Slack alert to `#sales-expansion`.
  - Sends email to Account Executive with a **band-upgrade** recommendation — Cohort → Academy
    (SAR 12,000 → 39,000/yr), or Academy → Institution. There are no seat top-ups to sell: the
    only way past a package ceiling is the next package.
- **Condition 2b — Provisioning refused at the ceiling:**
  - A `provision-seats` call rejected for exceeding `seat_limit` is the strongest expansion
    signal we get — the school tried to enrol a cadet and could not. Alert `#sales-expansion`
    the same day, independent of \(H\).
- **Condition 3 — Support Health \(S_{\text{support}} < 50\):**
  - Sends automated high-priority ticket escalation to Head of Product & CS Lead.

---

## Related Documents

- [Health Dashboard Spec](health-dashboard-spec.md)
- [At-Risk Playbook](at-risk-playbook.md)
- [Renewal Playbook](renewal-playbook.md)
- [Expansion Playbook](expansion-playbook.md)
- [Customer Success Overview](customer-success.md)

