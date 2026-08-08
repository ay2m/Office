---
title: Fly GACA — Finance Strategy
section: 03-finance
doc_type: strategy
status: draft
owner: Founder
last_updated: 2026-08-09
lang: en
---

# Fly GACA — Finance Strategy

> **Draft for owner review — not financial or legal advice.** The polished policy detail lives in the
> authoritative deliverables in this folder: banking-and-treasury-policy.docx · procurement-policy.docx ·
> expense-and-travel-policy.docx · petty-cash-policy.docx · capital-expenditure-capex-policy.docx ·
> chart-of-accounts-saudi-specific.docx · monthly-close-checklist.docx · budget-vs-actual-tracker.xlsx ·
> financial-dashboard-kpis.xlsx. This document is the working narrative that connects them.

## Purpose

The working-narrative companion to the polished finance deliverables — the "why" behind the
policies and trackers, in diffable markdown. It states how Fly GACA earns, spends, banks and
reports as a **pre-revenue, pre-entity, solo-founder** company entering the go-to-company
quarter (Q3 FY2026), and what changes at each gate on the critical path
(`00-strategy/ceo-execution-roadmap-2026-07.md`).

## Authoritative deliverables (source of truth)

- banking-and-treasury-policy.docx
- procurement-policy.docx
- expense-and-travel-policy.docx
- petty-cash-policy.docx
- capital-expenditure-capex-policy.docx
- chart-of-accounts-saudi-specific.docx
- monthly-close-checklist.docx
- budget-vs-actual-tracker.xlsx
- financial-dashboard-kpis.xlsx
- monetization.md (pricing + revenue plan — single source of truth for prices)

## 1. Financial model summary

**As of 2026-07-03.** Revenue to date: **SAR 0**. Legal entity: not yet registered. The
product is built and deployed; the billing machine (Moyasar checkout to be integrated per
DEC-010 — Stripe code built but dormant, RevenueCat IAP, B2B seat licences, free-tier
quotas, protected-content gate) is dormant behind launch mode. The finance model for the
next two quarters is therefore about **sequencing**, not forecasting precision: earn the
revenue that is invoiceable now, keep fixed costs near zero, and time the one-off
legal/entity spend against the critical-path gates.

### 1.1 Revenue lines & sequencing

Decision of record: **B2B-schools-first** (DEC-009, `01-governance/decision-log.md`).
Consumer checkout cannot open until the legal entity exists and a payment gateway is live;
schools can be quoted and invoiced **today** via a manual ZATCA-compliant e-invoice plus the
existing admin grant callable (`grantSchoolLicence`). Full plan: `monetization.md` (Phases
A–C) and `07-gtm/b2b-pipeline.md`.

| # | Revenue line | Status | Gate | When it earns |
|---|---|---|---|---|
| 1 | **Schools (B2B seat licences)** | Sellable now — quote → signed order → manual ZATCA e-invoice → bank transfer → seats granted | None for pilots; bank account (Sprint 2) for cash collection | Now — the only invoiceable line pre-entity |
| 2 | **Prep Packs** (Conversion / ELPT / AIP, one-time) | Built, dormant | Entity + payment gateway (Sprint 3) | Paywall flip |
| 3 | **Pro subscriptions** (monthly / annual) | Built, dormant; founding-member annual lock building the pool pre-launch | Entity + payment gateway (Sprint 3) | Paywall flip |
| 4 | **Exam Term** (one-time, 120 days) | Built, dormant | Entity + payment gateway (Sprint 3) | Paywall flip; seasonal around exam windows |
| 5 | **Consults / Premium** (founder time) | Priceable now; founder-time-bound | Entity for invoicing | Keep slots scarce; raise price before adding slots |

Year-1 revenue logic (per `monetization.md` and DEC-009): ~10 schools × ~50 seats × ~SAR 249
≈ **SAR 125k ARR** — this dominates everything else until consumer checkout opens, so it
gets the founder's selling time from Sprint 1 onward.

### 1.2 Pricing snapshot (SAR) — decided June 2026

`monetization.md` is the single source of truth; this is the summary card.

| Line | Item | Price |
|---|---|---|
| Subscription | Pro Monthly | 59/mo |
| Subscription | Pro Annual | 349/yr (headline ~SAR 29/mo; 7-day trial) |
| Subscription | Exam Term (120 days) | 199 one-time |
| Pack | License Conversion Prep Pack | 899 (launch 699) · incl. 90 days Pro |
| Pack | ELPT / SAELPT Prep Pack | 349 · incl. 30 days Pro |
| Pack | AIP Prep Pack | 299 · incl. 30 days Pro |
| Pack | Conversion Bundle (all three) | 1,299 |
| Service | Captain Adel 1:1 Consult (180 min) | 899 (launch 699) |
| Service | Conversion Pack Premium | 1,699 |
| B2B | Schools, 10–24 seats | 299/seat/yr |
| B2B | Schools, 25–74 seats | 249/seat/yr |
| B2B | Schools, 75+ seats | 199/seat/yr |
| B2B | Founding partner (first 2–3 schools) | 199/seat flat, year 1 |

Founding-member consumer offer: annual at **SAR 299** for the first year (first 500 waitlist
members), honoured through a 30-day grandfather window at the paywall flip. Invariant: the
regulations library, guides and safety lessons are **never paywalled** — Fly GACA charges
for tools, teaching and AI, never for reading the law.

### 1.3 Cost structure — solo-founder static-site startup

The cost base is deliberately minimal: a no-framework static PWA (Cloudflare Worker +
Firebase Hosting, effectively free tier at current traffic), Cloud Functions on the Blaze
plan, and the Captain Adel RAG service. There is no payroll, no office, no inventory.

| Bucket | Items | Behaviour |
|---|---|---|
| **COGS** | Gemini API + in-Kingdom Arabic provider inference, Firebase (Functions/Firestore), VPS hosting for Captain Adel | Variable with usage; the free-tier quota design (5 Adel questions/month, 3 tool runs/day) caps it — target: Captain Adel cost per free user **< ~SAR 1/month** |
| **Operating** | Domains (flygaca.com, captadel.com), dev tooling, analytics | Small, flat |
| **One-time (Q3, per ceo-roadmap)** | IP lawyer fixed fee (Sprint 0–1) · CR registration + bank account (Sprint 2) · ZATCA VAT/Fatoora onboarding + payment-gateway setup (Sprint 3) · Apple/Google developer accounts (iOS/Android wrappers) | Lumpy; timed against gates — amounts **[Owner to confirm]** as quotes land |
| **Contingent** | Paid help for ZATCA/payments integration and Arabic legal-page review (the flagged solo-founder overload points); rebrand cost if the name opinion says "rebrand" | Only if triggered |

Actual YTD figures live in budget-vs-actual-tracker.xlsx — **[Owner to confirm]** current
budget/actual/burn numbers; the board pack (§3) carries the same bracketed cells.

### 1.4 Runway thinking

Pre-entity, the company is founder-funded and burn is near zero outside the one-time items
above. The runway question only becomes quantitative once the business bank account opens
(Sprint 2) and the lawyer/registration invoices land. Working posture until then:

- **Cash runway (months)** is a top-8 board KPI (plan target ≥18 months by Sep 2027) —
  current figure **[Owner to confirm]** in the board pack and financial-dashboard-kpis.xlsx.
- Sequence spend behind gates: no gateway/VAT spend before the entity exists; no brand or
  localization spend before the name is locked (DEC-008).
- The first school invoice (Sprint 2 target) is the first cash in — treat B2B collections,
  not fundraising, as the default runway extension.

## 2. Budgeting & close rhythm

- **Monthly close** — run monthly-close-checklist.docx at each month end. Owner: Founder
  (solo; there is no delegation path yet). Sign-off is the founder dating the completed
  checklist.
- **Budget vs actual** — budget-vs-actual-tracker.xlsx reviewed at the same monthly close;
  variances feed the Financials section of the board pack (`01-governance/board-pack-2026-07.md` §3).
- **Quarterly** — the board pack circulates with the KPI dashboard and financials no later
  than 48 hours before the meeting; the decision log is updated within 7 days of any
  finance-relevant decision.
- Cadence detail (thresholds, approval limits) — see procurement-policy.docx,
  expense-and-travel-policy.docx and capital-expenditure-capex-policy.docx; this document
  does not restate their numbers.

## 3. Treasury & banking posture

Summarised from banking-and-treasury-policy.docx — see that document for signatories,
limits and reserve rules; amounts are not restated here.

- The **business bank account is open** — Arab National Bank via SiFi (ceo-roadmap 2.3
  done); the IBAN is recorded in `../01-governance/company-facts.md` and `phase0.md`.
  Personal/company fund separation is in effect from the account's opening. (Note: the
  banking-and-treasury-policy.docx pre-specified Al Rajhi/SNB — corrected to the actual
  bank in this pass.)
- School payments are collected by **bank transfer against the ZATCA e-invoice**; no card
  acquiring is needed for the B2B line.
- Signatory model — **decided 2026-08-09 (brief C3):** single signatory (the founder) now;
  move to dual signatory when a second officer joins. **[Owner to confirm]** the
  banking-and-treasury-policy.docx text is updated to match this model.
- Petty cash: per petty-cash-policy.docx; expected to be negligible for a remote,
  static-site operation.

## 4. Payments gateway — Moyasar (RESOLVED, DEC-010)

Resolved 2026-08-09 as **DEC-010** (`01-governance/decision-log.md`): **Moyasar is the KSA
payment gateway of record.** This confirms DEC-003 and clears the reconciliation flagged in
the decision log (2026-07-02) and the board pack ahead of the Sprint 3 paywall flip.

| Aspect | Position |
|---|---|
| **Go-live gateway** | **Moyasar** — Saudi-licensed, mada-capable, Fatoora-compatible; the decision of record for KSA consumer payments |
| **Stripe code** | `functions/stripe.js` checkout + webhook stays in the repo **dormant** — not removed; it remains the fallback if a non-KSA/international card-acquiring need appears later. No Stripe secrets are set and no Stripe products are created at go-live |
| **Sprint 3 work** | Moyasar integration (products at the `monetization.md` price card, checkout + webhook) replaces the Stripe step in the Phase C checklist; this is new integration work in the highest-load sprint — plan paid help per §1.3 if needed |
| **iOS** | Unchanged — RevenueCat IAP, independent of the web gateway choice |

Review checkpoint: DEC-010 carries a review date of **2026-08-27 (Sprint 3)** — if Moyasar
onboarding or integration slips the paywall flip, the fallback decision (activate the
dormant Stripe code) is taken then and logged.

## 5. KPIs tracked

Aligned with the board pack top-8 (`01-governance/board-pack-2026-07.md` §2) and the
monetization KPIs; the dashboard workbook is financial-dashboard-kpis.xlsx.

| KPI | Source | Target |
|---|---|---|
| Legal entity exists (CR + bank) | Board pack | Registered by 27 Aug 2026 |
| Paying customers (schools) | Board pack | ≥1 signed pilot → 1 paid contract this quarter; 5 academies by Sep 2027 |
| ARR (SAR) | Board pack | First invoice this quarter; 1.8M plan target (Sep 2027) |
| Cash runway (months) | Board pack / tracker | ≥18 (plan); current **[Owner to confirm]** |
| School seats sold; active vs licensed | monetization.md / CS | >80% adoption |
| Captain Adel cost per free user | monetization.md | < ~SAR 1/month |
| Free→paid conversion at the Adel quota wall | monetization.md | Baseline being instrumented now |
| Annual share of new Pro subscriptions | monetization.md | >60% |
| Waitlist size / weekly growth | monetization.md | Pre-launch conversion pool |
| Renewal rate (schools) | b2b-pipeline.md | >95% |

## 6. Saudi-specific notes

- **ZATCA e-invoicing** — B2B invoices are ZATCA-compliant from the first one (manual
  Fatoora-compatible e-invoice pre-integration); full Fatoora integration lands in Sprint 3
  alongside **VAT registration**. Detail: `../04-compliance-ksa/zatca-fatoora-e-invoicing-compliance-pack.docx`
  and `vat-compliance-memo.docx`; deadlines in `saudi-tax-and-compliance-calendar.docx`.
- **Chart of accounts** — chart-of-accounts-saudi-specific.docx maps the ledger to KSA
  reporting conventions; adopt it from the first bank transaction so the first close is
  clean.
- **SME programmes** — Monshaat registration and NTDP eligibility are Sprint 2 actions
  (ceo-roadmap 2.2); application kits in `../04-compliance-ksa/`. Any grant/support money is
  upside, not planned cash.
- **PDPL** — user questions are personal data; the in-Kingdom region plan (me-central2,
  Dammam target) holds regardless of monetization phase. The DPIA gates public consumer
  accounts, not the B2B motion.
- **VAT on prices** — **decided 2026-08-09 (brief A2):** the published SAR price card is
  **VAT-inclusive** for consumer-facing prices; B2B quotes show VAT as a separate line at
  the prevailing rate (order form §2).

## Open questions

1. Current cash on hand, YTD actuals and runway months — **[Owner to confirm]** in
   budget-vs-actual-tracker.xlsx and the board pack.
2. One-time cost amounts: lawyer fixed fee, CR + bank fees, gateway/VAT onboarding —
   **[Owner to confirm]** as quotes arrive (lawyer quotes requested in Sprint 0).
3. ~~VAT treatment of the price card~~ — resolved 2026-08-09 (A2): consumer prices
   VAT-inclusive.
4. Entity form — resolved by the registration: LLC, CR 7030976893; the chart of accounts
   reflects this.
5. ~~Banking signatory model~~ — resolved 2026-08-09 (C3): single signatory now, dual at a
   second officer; docx text update **[Owner to confirm]**.

---

*Living document — companion to `monetization.md` (prices), the ceo-execution-roadmap (gates)
and the board pack (reporting). Not financial or legal advice.*
