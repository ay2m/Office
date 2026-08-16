---
title: B2B Pipeline Playbook — Fly GACA for Schools
section: 07-gtm
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-09
lang: en
---

# B2B Pipeline Playbook — Fly GACA for Schools

> The operational counterpart to the strategy in
> [`03-finance/monetization.md`](../03-finance/monetization.md). Schools are the only
> revenue line that can be invoiced **today** (manual ZATCA e-invoice + admin
> licence grant) — this playbook is how that motion runs until online checkout
> opens, and after.

## Offer

Seat-based annual licensing: the school buys N cadet seats, every cadet gets
full Fly GACA Pro, and the school gets the admin dashboard (cohort
exam-readiness, per-cadet progress). Annual contracts, minimum **10 seats**,
ZATCA-compliant invoicing.

| Seats | SAR / seat / year |
|---|---|
| 10–24 | 299 |
| 25–74 | 249 |
| 75+ | 199 |

**Founding-partner offer (first 2–3 schools only):** SAR 199/seat flat for
year 1, in exchange for (a) permission to use the school's name/logo, (b) a
short case study after one term, and (c) a monthly feedback call. Renewal at
the standard tier.

## Target list (build and qualify)

Start with GACAR Part 141 certificated academies and training-heavy operators:

- OxfordSaudia Flight Academy (Dammam / King Fahd Intl) — the scale anchor
- Saudi Aviation Academy / academy programmes around Riyadh and Jeddah
- Aviation technical colleges and cadet programmes feeding Saudia/flynas/flyadeal
- Charter/AOC operators with recurrent-training needs (smaller seat counts,
  steadier renewals)

Qualify on: cadet cohort size, written-exam pass pressure, English/ELPT needs,
and whether instructors currently track readiness manually.

## Outreach sequence

1. **Warm intro or direct email** to the Head of Training — one paragraph:
   every cadet gets the GACAR library, cited AI answers, mock exams and a
   logbook; the school sees who is ready and who is falling behind. Link
   `schools.html`.
2. **Demo (30 min)** — live walk through Captain Adel (cited answers), a timed
   mock exam, and the readiness view. Offer a **14-day free cohort pilot**
   (launch mode makes this free to run today).
3. **Quote** — seats × tier from the card above, on letterhead, validity 30
   days. State what a seat includes and the dashboard.
4. **Close** — signed order form → invoice (below) → seats granted within 1
   business day.

## 14-Day Cohort Pilot Onboarding Workflow

The 14-day pilot is our core conversion engine. It delivers measurable proof of value to the Head of Training before any invoice is issued.

```
Day 1–3: Setup & Roster ──► Day 4–7: Enablement & Baseline ──► Day 8–11: Active Cohort & Mid-Pilot ──► Day 12–14: Benchmark & Close
 (Grant seats & consent)    (Instructor walkthrough & diagnostic)   (Adoption check & path assignment)  (ROI deck & paid contract)
```

### Phase 1: Days 1–3 — Account Provisioning & Roster Setup
- **Letter of Intent (LoI) & Consent Agreement:** Execute pilot agreement outlining scope (10–30 pilot seats, 14-day duration, data privacy consent terms under KSA PDPL).
- **School Entity Setup:** Cloud Function provisions school account: `createSchoolAccount({ schoolName, adminEmails, seatLimit: 30 })`.
- **Roster Ingestion:** School Admin submits cadet/instructor email CSV. Server invokes `grantSchoolLicence({ emails, schoolId, expiresAt: T+14 })`.
- **Cadet Welcome & Opt-In:** Automated bilingual welcome email sent to cadets. On first login, cadets complete the PDPL data-sharing consent prompt (`consent: true`), enabling progress sharing to `schools/{id}/roster/{cadetUid}` while keeping logbook private.

### Phase 2: Days 4–7 — Instructor Enablement & Baseline Readiness Diagnostic
- **Day 4 — 30-Min Instructor Enablement Session:** CS Lead conducts live onboarding for Ground Instructors / Chief Flight Instructor:
  - Navigating `instructor.html` (Cohort Exam-Readiness Rollup, Cadet Drill-Down).
  - Filtering cadets by readiness score and weak topic tags (e.g., GACAR Part 61 vs. Airspace).
  - Assigning custom reading paths (`assignedPaths`) based on syllabus requirements.
- **Day 5–7 — Baseline Diagnostic Mock Exam:** All cadets complete a timed 50-question GACAR diagnostic exam in Fly GACA.
  - Establishes initial cohort readiness baseline (e.g., 54% average pass probability).
  - Identifies top 3 systemic weak areas across the cohort (e.g., METAR/TAF decoding, Weather Minimums).

### Phase 3: Days 8–11 — Active Cohort Engagement & Mid-Pilot Review
- **Daily Cadet Study Motion:** Cadets complete assigned reading paths, consult Captain Adel for cited GACAR explanations, and attempt topic quizzes.
- **Day 9 — Mid-Pilot Usage Audit & Instructor Check-In:**
  - Audit active cadet seat ratio (target: >85% active seats).
  - Automated re-engagement nudges sent to cadets with <2 logins or <50% diagnostic score.
  - Review instructor activity: verify instructors have accessed dashboard and reviewed weak topic breakdowns.

### Phase 4: Days 12–14 — Post-Pilot Benchmark, ROI Presentation & Paid Conversion
- **Day 12 — Post-Pilot Benchmark Exam:** Cadets take a second timed mock exam.
  - Measure performance uplift: demonstrate readiness increase (target: +15–25 percentage point improvement).
- **Day 13 — Executive ROI Deck Preparation:** CSM compiles pilot telemetry into a 5-slide Executive Review:
  - Cohort Activation Rate (% of licensed seats active).
  - Knowledge Uplift (% baseline vs. benchmark mock exam score).
  - Instructor Time Saved (hours saved on manual drill grading & regulation lookup).
  - Cadet Feedback / CSAT score.
- **Day 14 — Pilot Wrap-Up & Commercial Conversion Meeting:** Present ROI report to Head of Training & Chief Executive Officer.
  - Present annual seat licensing quotation (SAR 199–249/seat/yr).
  - Execute formal B2B order form, transition pilot seats to permanent annual entitlement, and issue ZATCA e-invoice.

## Invoice → grant flow

1. Issue a ZATCA-compliant (Fatoora) e-invoice for the contract total; payment
   by bank transfer. Keep the invoice number in the deal record.
2. Collect the cadet roster (emails) from the school admin.
3. Grant seats with the admin-only callable in `functions/school.js`:
   `grantSchoolLicence({ emails, schoolId, expiresAt })` — writes
   `plan: 'school'` entitlements server-side (clients can never self-grant;
   see `firestore.rules`).
4. Mid-year roster changes: revoke a graduate with
   `revokeSchoolLicence({ emails })`, grant the replacement — seat counts stay
   within the contract.
5. At renewal: re-invoice, then re-grant with the new `expiresAt`.

## Lifecycle

Run the standard CS playbooks against every school account:

- Days 1–14: [14-Day Pilot Onboarding](#14-day-cohort-pilot-onboarding-workflow) — account provisioned, diagnostic set, >85% cadet activation, ROI conversion.
- Week 3–4: [Onboarding](../08-customer-success/onboarding-playbook.md) — full cohort onboarding, instructor training on `instructor.html`, >80% steady-state adoption.
- Ongoing: [health scoring](../08-customer-success/customer-health-scoring.md) on adoption (active vs.
  licensed seats), exam outcomes, instructor logins.
- T-90 days: [Renewal](../08-customer-success/renewal-playbook.md) — lead with the readiness data the
  dashboard collected all year.
- Expansion: [Expansion playbook](../08-customer-success/expansion-playbook.md) — new cohorts, ELPT
  pack add-ons for the school, the Instructor Dashboard when it ships.

## KPIs

- Pipeline: contacted → demo → 14-day pilot → signed annual (target conversion: >60% pilot-to-paid)
- 14-Day Pilot Activation Rate: >85% of pilot seats logged in and completed diagnostic exam by Day 7
- Cohort Knowledge Uplift: >15 percentage point increase in mock exam readiness from Day 5 to Day 12
- Seats sold; active vs. licensed seats (>80%)
- Renewal rate (>95% target per `08-customer-success/customer-success.md`)
- Time from signed order to all-seats-granted (<2 business days)
