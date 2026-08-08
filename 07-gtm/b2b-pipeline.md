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
   mock exam, and the readiness view. Offer a **2-week free cohort pilot**
   (launch mode makes this free to run today).
3. **Quote** — seats × tier from the card above, on letterhead, validity 30
   days. State what a seat includes and the dashboard.
4. **Close** — signed order form → invoice (below) → seats granted within 1
   business day.

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

- Week 0–4: [Onboarding](../08-customer-success/onboarding-playbook.md) — roster loaded, instructors
  trained on the dashboard, >80% cadet activation.
- Ongoing: [health scoring](../08-customer-success/customer-health-scoring.md) on adoption (active vs.
  licensed seats), exam outcomes, instructor logins.
- T-90 days: [Renewal](../08-customer-success/renewal-playbook.md) — lead with the readiness data the
  dashboard collected all year.
- Expansion: [Expansion playbook](../08-customer-success/expansion-playbook.md) — new cohorts, ELPT
  pack add-ons for the school, the Instructor Dashboard when it ships.

## KPIs

- Pipeline: contacted → demo → pilot → signed (track conversion at each step)
- Seats sold; active vs. licensed seats (>80%)
- Renewal rate (>95% target per `08-customer-success/customer-success.md`)
- Time from signed order to all-seats-granted (<2 business days)
