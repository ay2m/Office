---
title: B2B Pipeline Playbook — Fly GACA for Schools
section: 07-gtm
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# B2B Pipeline Playbook — Fly GACA for Schools

> The operational counterpart to the strategy in
> [`03-finance/monetization.md`](../03-finance/monetization.md). Schools are the only
> revenue line that can be invoiced **today** (manual ZATCA e-invoice + admin
> licence grant) — this playbook is how that motion runs until online checkout
> opens, and after.

## Offer

**Annual packages, not seats.** The school buys a capacity band for a year;
every member gets full Fly GACA Pro, and the school gets the admin dashboard
(cohort exam-readiness, per-cadet progress). ZATCA-compliant invoicing.

| Package | SAR / year (VAT-incl.) | Capacity | Term | Motion |
|---|---|---|---|---|
| **Cohort** | **12,000** | up to 25 seats | one 90-day intake | self-serve checkout, published price |
| **Academy** | **39,000** | up to 100 seats | rolling 12 months | contact sales |
| **Institution** | **from 72,000** | 100+ seats, SSO | annual | contact sales |

There is no seat minimum and no seat band. A school with 8 cadets and a school
with 25 cadets both buy Cohort at SAR 12,000 — capacity is a ceiling, not a
meter.

**What changed, and why it changes the call.** The retired card quoted
SAR 299/249/199 per seat with a 10-seat minimum, so every conversation became a
negotiation about headcount and which band it landed in. Packages remove that
lever entirely. The two questions to run the call on are now **which band** and
**when the intake starts** — not how many cadets and what the unit price is.

**Per-seat equivalents — for defence, not for quoting.** If a Head of Training
does the division, the numbers hold: **480/seat/yr** at Cohort (12,000 ÷ 25),
**~390/seat/yr** at Academy (39,000 ÷ 100). Both are well under the SAR
930–1,120 a cadet pays for a foreign course — 25 of those is SAR 23k+. Quote the
package; use these only when asked.

> **Founding-partner offer: unresolved.** The old founding rate (SAR 199/seat
> flat, first 2–3 schools) has no equivalent under package pricing — there is no
> per-seat lever to discount. The exchange we want is unchanged: (a) permission
> to use the school's name/logo, (b) a short case study after one term, (c) a
> monthly feedback call. The consideration is not decided — candidates are a
> percentage off the first annual package, a free first 90-day intake, or Cohort
> price at Academy capacity. **Do not quote a founding rate until the founder
> signs one off.**

## Target list (build and qualify)

Start with GACAR Part 141 certificated academies and training-heavy operators:

- OxfordSaudia Flight Academy (Dammam / King Fahd Intl) — the scale anchor
- Saudi Aviation Academy / academy programmes around Riyadh and Jeddah
- Aviation technical colleges and cadet programmes feeding Saudia/flynas/flyadeal
- Charter/AOC operators with recurrent-training needs (smaller seat counts,
  steadier renewals)

Qualify on: cadet cohort size (this alone picks the band — ≤25 is Cohort, ≤100
Academy, above that Institution), intake rhythm (one dated intake vs. rolling
enrolment, which is the Cohort/Academy split), written-exam pass pressure,
English/ELPT needs, and whether instructors currently track readiness manually.

## Outreach sequence

1. **Warm intro or direct email** to the Head of Training — one paragraph:
   every cadet gets the GACAR library, cited AI answers, mock exams and a
   logbook; the school sees who is ready and who is falling behind. Link
   `/schools`.
2. **Demo (30 min)** — live walk through Captain Adel (cited answers), a timed
   mock exam, and the readiness view. Offer a **14-day free cohort pilot**
   (launch mode makes this free to run today).
3. **Recommend a package** — not a quote. Name the band their cohort size and
   intake rhythm land in, state the annual price from the card above, and say
   what capacity and what term it buys. Cohort is a published price: send the
   `/pricing` link rather than a letterhead quote unless procurement demands a
   formal document, in which case the letter states one line — package, price,
   term — with 30-day validity. Academy and Institution go to a proposal.
4. **Close** — signed order form (or self-serve Cohort checkout once Moyasar is
   live) → invoice (below) → roster provisioned within 1 business day.

## 14-Day Cohort Pilot Onboarding Workflow

The 14-day pilot is our core conversion engine. It delivers measurable proof of value to the Head of Training before any invoice is issued.

```
Day 1–3: Setup & Roster ──► Day 4–7: Enablement & Baseline ──► Day 8–11: Active Cohort & Mid-Pilot ──► Day 12–14: Benchmark & Close
 (Grant seats & consent)    (Instructor walkthrough & diagnostic)   (Adoption check & path assignment)  (ROI deck & paid contract)
```

### Phase 1: Days 1–3 — Account Provisioning & Roster Setup
- **Letter of Intent (LoI) & Consent Agreement:** Execute pilot agreement outlining scope (up to 25 pilot seats — the Cohort capacity the pilot converts into — 14-day duration, data privacy consent terms under KSA PDPL).
- **School Entity Setup:** Create the org row in Cloud SQL with `seat_limit: 25`, owned by the school's admin account. The seat limit is enforced server-side on every provisioning call.
- **Roster Ingestion:** School Admin submits cadet/instructor email CSV; we post it to `POST /api/org/:orgId/provision-seats` with `expiresAt: T+14` (max 100 addresses per call). This writes `invited` rows to `org_seats` keyed by email — seats exist before the invitee has an account.
- **Cadet Welcome & Self-Claim:** Automated bilingual welcome email sent to cadets. Each cadet verifies their email, then the app calls `POST /api/grants/school-seat`, which matches the verified address to its seat and merges a `plan: 'school'` entitlement upward — **the verified email is the ownership proof, and an unverified one is granted nothing.** On first login cadets also complete the PDPL data-sharing consent prompt, enabling progress sharing to the school's cohort-readiness view while keeping the logbook private.

### Phase 2: Days 4–7 — Instructor Enablement & Baseline Readiness Diagnostic
- **Day 4 — 30-Min Instructor Enablement Session:** CS Lead conducts live onboarding for Ground Instructors / Chief Flight Instructor:
  - Navigating `/business/admin` (Cohort Exam-Readiness Rollup, Cadet Drill-Down).
  - Filtering cadets by readiness score and weak topic tags (e.g., GACAR Part 61 vs. Airspace).
  - Assigning custom reading paths (`assignedPaths`) based on syllabus requirements.
- **Day 5–7 — Baseline Diagnostic Mock Exam:** All cadets complete a timed 50-question GACAR diagnostic exam in Fly GACA.
  - Establishes initial cohort readiness baseline (e.g., 54% average pass probability).
  - Identifies top 3 systemic weak areas across the cohort (e.g., METAR/TAF decoding, Weather Minimums).

### Phase 3: Days 8–11 — Active Cohort Engagement & Mid-Pilot Review
- **Daily Cadet Study Motion:** Cadets complete assigned reading paths, consult Captain Adel for cited GACAR explanations, and attempt topic quizzes.
- **Day 9 — Mid-Pilot Usage Audit & Instructor Check-In:**
  - Audit active cadet seat ratio (target: >85% active seats — on a 25-seat Cohort roster that is 22 of 25, and each idle cadet costs 4 points, so name the individuals rather than the percentage).
  - Automated re-engagement nudges sent to cadets with <2 logins or <50% diagnostic score.
  - Review instructor activity: verify instructors have accessed dashboard and reviewed weak topic breakdowns.

### Phase 4: Days 12–14 — Post-Pilot Benchmark, ROI Presentation & Paid Conversion
- **Day 12 — Post-Pilot Benchmark Exam:** Cadets take a second timed mock exam.
  - Measure performance uplift: demonstrate readiness increase (target: +15–25 percentage point improvement).
- **Day 13 — Executive ROI Deck Preparation:** CSM compiles pilot telemetry into a 5-slide Executive Review:
  - Cohort Activation Rate (% of provisioned seats active).
  - Knowledge Uplift (% baseline vs. benchmark mock exam score).
  - Instructor Time Saved (hours saved on manual drill grading & regulation lookup).
  - Cadet Feedback / CSAT score.
- **Day 14 — Pilot Wrap-Up & Commercial Conversion Meeting:** Present ROI report to Head of Training & Chief Executive Officer.
  - Recommend the package the pilot has already demonstrated: **Cohort at SAR 12,000/yr** for a roster that fits 25 seats and runs to a dated intake, **Academy at SAR 39,000/yr** where enrolment is rolling or the roster will pass 25. Ask for the band, not for a seat count.
  - Execute formal B2B order form, re-provision the roster against the purchased package (pilot seats carry a 14-day expiry and lapse on their own — nothing has to be revoked), and issue the ZATCA e-invoice.

## Invoice → grant flow

1. Issue a ZATCA-compliant (Fatoora) e-invoice for the **package price** — one
   line, not seats × rate; payment by bank transfer. Keep the invoice number in
   the deal record. (Once Moyasar is live, Cohort skips this step entirely and
   self-serves.)
2. Set the org's `seat_limit` to the package capacity (25 / 100 / contracted).
   This is the only place capacity is enforced — the API refuses any
   provisioning call that would push the roster past it.
3. Collect the cadet roster (emails) from the school admin.
4. Provision seats: `POST /api/org/:orgId/provision-seats` with the email list
   and the intake `expiresAt` (Express on Cloud Run, `me-central2`; rows land in
   `org_seats` in Cloud SQL). Owner-authenticated, max 100 emails per call. A
   seat's expiry is **capped at 90 days** — a longer date is silently clamped to
   the intake window, so a Cohort purchase can never mint permanent accounts.
5. Members claim their own seats: each verified account calls
   `POST /api/grants/school-seat`, which finds the seat by email and merges a
   `plan: 'school'` entitlement upward — never downward over a plan the member
   already bought. There is no route by which a client writes its own plan.
6. Mid-term roster changes: re-post the replacement addresses to
   `provision-seats`. A graduate's access lapses on its own when the intake
   expires, so nothing needs revoking — but note the limit check counts **every**
   `org_seats` row for the org, expired ones included, and there is no
   self-serve revoke endpoint. A school that cycles more names through a term
   than its package capacity therefore needs either an Academy upgrade or an
   operator to clear the stale rows. Treat it as an upsell signal, not a support
   ticket.
7. At renewal: re-invoice the package, then re-provision the roster with the new
   `expiresAt`.

## Lifecycle

Run the standard CS playbooks against every school account:

- Days 1–14: [14-Day Pilot Onboarding](#14-day-cohort-pilot-onboarding-workflow) — account provisioned, diagnostic set, >85% cadet activation, ROI conversion.
- Week 3–4: [Onboarding](../08-customer-success/onboarding-playbook.md) — full cohort onboarding, instructor training on `/business/admin`, >80% steady-state adoption.
- Ongoing: [health scoring](../08-customer-success/customer-health-scoring.md) on adoption (active vs.
  provisioned seats, and provisioned vs. package capacity), exam outcomes, instructor logins.
- T-90 days: [Renewal](../08-customer-success/renewal-playbook.md) — lead with the readiness data the
  dashboard collected all year.
- Expansion: [Expansion playbook](../08-customer-success/expansion-playbook.md) — the band upgrade
  (Cohort → Academy) is now the primary expansion move, plus additional intakes, ELPT pack add-ons
  for the school, and the Instructor Dashboard when it ships.

## KPIs

- Pipeline: contacted → demo → 14-day pilot → signed annual package (target conversion: >60% pilot-to-paid)
- 14-Day Pilot Activation Rate: >85% of pilot seats logged in and completed diagnostic exam by Day 7
- Cohort Knowledge Uplift: >15 percentage point increase in mock exam readiness from Day 5 to Day 12
- **Packages sold and B2B ARR** — 10 Cohort packages is SAR 120k ARR, the year-1 target in
  `03-finance/monetization.md`. Count packages, not seats.
- **Band mix** — share of new business landing at Academy or above; this is the lever on ARR now
  that price per school is fixed within a band
- Capacity utilization: active vs. licensed seats (>80% — on Cohort that is 20 of 25)
- Renewal rate (>95% target per `08-customer-success/customer-success.md`)
- Time from signed order to fully-provisioned roster (<2 business days)
