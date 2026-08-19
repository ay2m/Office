---
title: Fly GACA — Finance Strategy
section: 03-finance
doc_type: strategy
status: draft
owner: Founder
last_updated: 2026-08-19
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
DEC-010 — RevenueCat iOS IAP still unimplemented, B2B seat grants, free-tier
quotas, protected-content gate) is dormant behind launch mode. Stripe was never shipped and
the code no longer exists. The finance model for the
next two quarters is therefore about **sequencing**, not forecasting precision: earn the
revenue that is invoiceable now, keep fixed costs near zero, and time the one-off
legal/entity spend against the critical-path gates.

### 1.1 Revenue lines & sequencing

Decision of record: **B2B-schools-first** (DEC-009, `01-governance/decision-log.md`).
Consumer checkout cannot open until the legal entity exists and a payment gateway is live;
schools can be quoted and invoiced **today** via a manual ZATCA-compliant e-invoice plus the
existing admin grant route (`POST /api/org/:orgId/provision-seats`, each member then
self-claiming via `POST /api/grants/school-seat` on a verified email). Full plan:
`monetization.md` (Phases A–C) and `07-gtm/b2b-pipeline.md`.

| # | Revenue line | Status | Gate | When it earns |
|---|---|---|---|---|
| 1 | **Schools (B2B annual packages)** | Sellable now — quote → signed order → manual ZATCA e-invoice → bank transfer → seats granted | None for pilots; bank account (Sprint 2) for cash collection | Now — the only invoiceable line pre-entity |
| 2 | **Exam-prep packs** (nine packs, three price bands, one-time) | Built, dormant | Entity + payment gateway (Sprint 3) | Paywall flip |
| 3 | **Pro subscriptions** (monthly / annual) | Built, dormant; founding-member annual lock building the pool pre-launch | Entity + payment gateway (Sprint 3) | Paywall flip |
| 4 | **Exam Season Pass** (one-time, 90 days) | Built, dormant | Entity + payment gateway (Sprint 3) | Paywall flip; seasonal around exam windows |
| 5 | **Captain Adel credits** (39 / 50 answers) | Built, dormant | Entity + payment gateway (Sprint 3) | Paywall flip; tops up the free daily allowance without a subscription |
| 6 | **Licensed Captain Adel API** (`/v1/ask`, metered monthly tiers) | Surface built and tiered (`docs/LICENSED-API.md`); no customers | Entity for invoicing; API keys issued per contract | Post-entity — B2B-shaped, sells like the schools line (quote → invoice), not self-serve |

Year-1 revenue logic (per `monetization.md` and DEC-009): 10 Cohort packages at SAR 12,000
≈ **SAR 120k ARR** — this dominates everything else until consumer checkout opens, so it
gets the founder's selling time from Sprint 1 onward.

### 1.2 Pricing snapshot (SAR) — price card re-cut 2026-08-19

`monetization.md` is the single source of truth; this is the summary card. Every figure is
**VAT-inclusive**, as ZATCA requires of a published consumer price.

| Line | Item | Price |
|---|---|---|
| Subscription | Pro Monthly | 79/mo |
| Subscription | Pro Annual | 649/yr (≈54/mo, save 32%; 7-day trial) |
| Subscription | Exam Season Pass (90 days) | 299 one-time |
| Credits | Captain Adel credits | 39 · 50 answers |
| Pack — Essential | Conversion · Medical · AIP | 249 each |
| Pack — Standard | ELP/SAELPT · ATPL · IR | 399 each |
| Pack — Complete | CPL · PPL | 499 each |
| Pack | All-Access Bundle (all eight paid packs, permanent) | 1,499 |
| B2B | Cohort — up to 25 seats, one 90-day intake | 12,000/yr (480/seat/yr) |
| B2B | Academy — up to 100 seats, rolling 12 months | 39,000/yr (~390/seat/yr) |
| B2B | Institution — 100+ seats, SSO | from 72,000 |
| API | Licensed `/v1/ask` — Starter / Growth / Scale | 499 · 1,999 · 6,999 per month (1,000 / 5,000 / 25,000 answers); Enterprise custom |

Packs price by how much material each carries, not by certificate-vs-subject label;
`airspace-vfr` stays free as the sampler. **There is no Student tier** — it was removed on
2026-08-19 (it undercut Pro for an identical entitlement and its eligibility check was never
wired to a route).

Founding-member consumer offer: annual at **SAR 549** for the first year (first 500 waitlist
members), honoured through a 30-day grandfather window at the paywall flip. Invariant: the
regulations library, guides and safety lessons are **never paywalled** — Fly GACA charges
for tools, teaching and AI, never for reading the law.

### 1.3 Cost structure — solo-founder static-site startup

The cost base is deliberately minimal: a static SPA build served from a Cloud Storage bucket
behind an HTTPS load balancer (with Cloudflare/Netlify/Vercel mirrors proxying `/api/*`), a
single Express service on **Cloud Run me-central2 (Dammam)** backed by a **Cloud SQL
Postgres** instance, and the Captain Adel RAG flow (Genkit + Gemini). There is no payroll, no
office, no inventory.

| Bucket | Items | Behaviour |
|---|---|---|
| **COGS** | Gemini API + in-Kingdom Arabic provider inference, Cloud Run + Cloud SQL, corpus-bucket egress | Variable with usage; the free-tier quota design (5 Captain Adel questions/day, 3/day signed-out) caps it — target: Captain Adel cost per free user **< ~SAR 1/month**. The 55 flight tools are free and run client-side, so they carry no marginal cost |
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
| **Go-live gateway** | **Moyasar** — Saudi-licensed, mada- and Apple Pay-capable, Fatoora-compatible; the decision of record for KSA consumer payments |
| **Stripe** | **Not in play.** Stripe was never shipped and the code no longer exists in the product repo; no Stripe secrets are set and no Stripe products are created at go-live |
| **Sprint 3 work** | Moyasar integration (products at the `monetization.md` price card, checkout → confirm → webhook → renewal job, all on the Cloud Run service) is the payments step in the Phase C checklist; this is new integration work in the highest-load sprint — plan paid help per §1.3 if needed |
| **iOS** | Unchanged — RevenueCat IAP (still unimplemented), independent of the web gateway choice |

Review checkpoint: DEC-010 carries a review date of **2026-08-27 (Sprint 3)** — if Moyasar
onboarding or integration slips the paywall flip, the fallback is another mada-capable Saudi
gateway (HyperPay / PayTabs / Tap); that decision is taken then and logged.
**[Owner to confirm]** which fallback gateway is preferred — there is no dormant integration
to fall back on any more.

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
- **PDPL** — user questions are personal data; the service and its database are in-Kingdom
  (**me-central2, Dammam**) regardless of monetization phase. The DPIA gates public consumer
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
