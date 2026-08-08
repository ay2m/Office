---
title: Fly GACA — Owner Decision Brief (Phase 0)
section: 00-strategy
doc_type: plan
status: active
owner: Founder
last_updated: 2026-08-09
lang: en
---

# Fly GACA — Owner Decision Brief (Phase 0)

> **Purpose.** The 2026-07-03 refactor added nine documents that carry **60 `[Owner to confirm]`
> markers** — facts and choices only you can make. Rather than hunt for them across nine files,
> this brief collects every one into a single worksheet. Clearing it **is** Phase 0 of
> `06-operations-it/docs-followup-roadmap-2026-07.md`.
>
> **Created:** 2026-07-04. **Owner:** You (solo). **Not legal or financial advice.**

## How to use this

Fill the **Your answer** column (edit this file, or reply to me with the row IDs). Then I:
1. Resolve every marker across the nine source documents to your answers.
2. Flip the three no-counsel strategy docs (`finance-strategy`, `compliance-roadmap`,
   `investor-thesis`) to `status: active` (roadmap Phase 3).
3. Bundle the counsel-only items (Group E) into the lawyer brief (roadmap Phase 1).

Groups **A–D** are yours to decide now. Group **E** is for the lawyer, not your desk — listed so
nothing is lost. "**Rec.**" = my recommended default; a blank Rec. means it's a pure decision with
no safe default.

**Progress (2026-08-09):** Group A **complete** — A1 answered by the owner (Moyasar, DEC-010);
A2–A9 resolved to the recommended defaults and applied to the refund policy, order form and
finance-strategy. Also resolved: **C3** (signatory model) and **D4 / D6** (Workspace seat;
equipment register, secrets inventory, password manager) — recommended defaults accepted and
applied to the HR checklists. Still open: B1, B4, C1, C2, C4–C6, D1–D3, D5 (counsel), D7.

---

## Group A — Payments & pricing  ·  *unblocks: refund policy, order-form, finance-strategy, compliance-roadmap* — ✅ COMPLETE (2026-08-09)

| # | Decision | Unblocks | Rec. | Your answer |
|---|---|---|---|---|
| A1 | **Payment processor — Stripe or Moyasar?** (`monetization.md` says Stripe built; DEC-003 chose Moyasar — reconcile) | refund §7, finance-strategy, sub-processor register | Moyasar (matches DEC-003 + KSA/mada) unless Stripe is already live | **ANSWERED (2026-08-09): Moyasar** — logged as DEC-010; Stripe code kept dormant as non-KSA fallback; applied to finance-strategy §4, monetization.md Phase C and the ceo-roadmap |
| A2 | **Price card — VAT inclusive or exclusive?** | finance-strategy, refund §8 | Inclusive (consumer-facing SAR prices) | **RESOLVED (2026-08-09): VAT-inclusive** — default accepted; matches refund policy §8 as drafted; noted in finance-strategy §6 |
| A3 | Renewal-charge refund window | refund §3 | **7 days** (proposed) | **RESOLVED (2026-08-09): 7 days** — applied to refund policy §3 |
| A4 | Prep-Pack refund window (if content untouched) | refund §4 | **14 days** (proposed) | **RESOLVED (2026-08-09): 14 days** — applied to refund policy §4 |
| A5 | Consult reschedule/cancel cut-off | refund §4 | **48 hours** (proposed) | **RESOLVED (2026-08-09): 48 hours** — applied to refund policy §4 |
| A6 | Refund processing time after approval | refund §7 | **14 business days** (proposed) | **RESOLVED (2026-08-09): 14 business days** — applied to refund policy §7 |
| A7 | B2B invoice payment term | order-form §4 | **Net 30 days** (proposed) | **RESOLVED (2026-08-09): Net 30** — applied to order form §4 |
| A8 | Seat grant triggers on **signature** or **payment receipt**? | order-form §3 | On payment receipt (protects cash) | **RESOLVED (2026-08-09): on payment receipt** — applied to order form §3 |
| A9 | Mid-term added-seat pro-rating method | order-form §3 | Pro-rate by remaining full months | **RESOLVED (2026-08-09): remaining full months** — applied to order form §3 |

## Group B — Entity & compliance  ·  *unblocks: compliance-roadmap, both legal drafts (operator identity)*

| # | Decision | Unblocks | Rec. | Your answer |
|---|---|---|---|---|
| B1 | **MISA investment license — required?** (CEO roadmap routes via CR on Saudi Business Center, not MISA) | compliance-roadmap MISA row | Likely not, for a Saudi-national solo founder — confirm with counsel | |
| B2 | **Entity form — sole proprietorship or LLC?** | compliance-roadmap CR row; contracts' operator name | **ANSWERED by the registration (2026-07-27): LLC** — شركة بدع الدولية / BDA Company International, CR 7030976893 | ✓ |
| B3 | **VAT registration — mandatory or voluntary, and when?** | compliance-roadmap; refund §8; order-form VAT line | **ANSWERED by the ZATCA certificate: registered**, effective 2025-11-01, quarterly (VAT 311415259500003) — first return overdue, see `03-finance/invoicing-and-vat-returns.md` | ✓ |
| B4 | **me-central2 migration date** (Google in-Kingdom access grant) — PDPL residency | compliance-roadmap data-residency; PDPL | *(decision — set target date)* | |

## Group C — Finance & investor  ·  *unblocks: finance-strategy, investor-thesis*

| # | Decision / figure | Unblocks | Rec. | Your answer |
|---|---|---|---|---|
| C1 | One-time Q3 fee amounts: IP lawyer, CR + bank, ZATCA/gateway, Apple/Google dev accounts | finance-strategy cost table | *(fill as quotes land — lawyer quotes requested Sprint 0)* | |
| C2 | Current cash on hand, YTD actuals, runway (months) | finance-strategy; KPI table | *(from budget-vs-actual-tracker.xlsx)* | |
| C3 | Banking signatory model — does the docx match solo-founder reality? | finance-strategy treasury | Single signatory now; dual when a second officer joins | **RESOLVED (2026-08-09): single signatory now, dual at a second officer** — default accepted; applied to finance-strategy §3; banking-policy docx text update still open |
| C4 | **The raise — amount, instrument, valuation, use of funds** | investor-thesis ask (blocks the whole pitch) | *(decision — or mark "not raising yet")* | |
| C5 | Bottoms-up TAM with sources (pilots, cadets, schools) | investor-thesis market | *(build from school/cadet counts; I can draft once you give the inputs)* | |
| C6 | Investor-target-list segmentation (current?) | investor-thesis | *(from saudi-investor-target-list.xlsx)* | |

## Group D — HR operational  ·  *unblocks: onboarding, offboarding, grievance, anti-harassment*

| # | Decision | Unblocks | Rec. | Your answer |
|---|---|---|---|---|
| D1 | **External grievance/harassment recipient** for founder-conflict cases (one appointee) | grievance §4.1(4); anti-harassment §5.1(2) | Appoint an external HR advisor or your lawyer — **needed before first hire** | |
| D2 | Medical insurance provider | onboarding, offboarding | *(decision — pick a provider)* | |
| D3 | Mudad / WPS payroll account status | onboarding | *(decision — set up before first payroll)* | |
| D4 | Google Workspace seat vs. current Cloudflare Email Routing (`02-legal/email-routing.md`) | onboarding account provisioning | Workspace seat once there's a hire needing a mailbox | **RESOLVED (2026-08-09): Workspace seat once a hire needs a mailbox; role/alias addresses stay on Cloudflare Email Routing** — applied to onboarding Phase A |
| D5 | HR-record retention period (post-employment) | all four HR docs | Employment + statutory limitation period — **confirm exact years with counsel** | |
| D6 | Equipment register location; secrets inventory; password-manager seat | onboarding, offboarding | Drive folder per `03-drive-folder-structure.docx`; a password manager (1Password/Bitwarden) | **RESOLVED (2026-08-09): register + secrets inventory in the ops Drive folder; 1Password or Bitwarden at first hire** — applied to onboarding Phases A/B and offboarding Phase C |
| D7 | Draft the two P2 stubs — **Probation Review Form** and **PIP Template** — now? | onboarding Day-80 review; grievance §6.3 | Yes, if a hire is near (I can draft both) | |

## Group E — Counsel-only  ·  *route to the Phase-1 lawyer brief — not your desk*

These are legal specifics for the lawyer, listed so they aren't lost. No owner action beyond
sending them with the brief.

| # | Question for counsel | Doc |
|---|---|---|
| E1 | Statutory withdrawal / cooling-off period under the E-Commerce Law; digital-content exception once access begins | refund §1 |
| E2 | Is a pro-rata refund required for annual consumer plans under KSA consumer-protection rules? | refund §3 |
| E3 | Prep-Pack digital-content refund treatment under the E-Commerce Law | refund §4 |
| E4 | VAT treatment on B2B invoices **before** VAT registration completes | order-form §2 |
| E5 | Exact final-settlement statutory deadline (differs by who ended the contract) | offboarding |
| E6 | Disciplinary time-limit article numbering (Art. 72 framing); suspension duration/pay limits | grievance §5.3, §6.2 |
| E7 | HRSD internal-work-regulation filing threshold | grievance §5.5 |
| E8 | Non-discrimination article references (current) | anti-harassment §3 |
| E9 | Expat visa/Iqama exit process (if a hire is a non-Saudi) | offboarding |
| E10 | Arabic legal translations of the termination letter, grievance, disciplinary, harassment docs | grievance, anti-harassment, offboarding |

---

## After you fill Groups A–D

Reply "resolve the brief" (or edit the answers in place) and I will apply every answer across the
nine documents, rebuild their PDFs, flip the three strategy docs to `active`, and hand Group E to
the lawyer track. The legal drafts (`refund`, `order-form`) stay `draft` until counsel review
regardless — that gate is Phase 1, not Phase 0.

*Companion to `ceo-execution-roadmap-2026-07.md` and `06-operations-it/docs-followup-roadmap-2026-07.md`.
60 markers across: finance-strategy (10), compliance-roadmap (9), investor-thesis (6),
refund-policy (6), order-form (4), onboarding (7), offboarding (6), grievance (7), anti-harassment (5).*
