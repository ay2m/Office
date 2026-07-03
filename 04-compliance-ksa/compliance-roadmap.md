---
title: KSA Compliance Roadmap
section: 04-compliance-ksa
doc_type: plan
status: draft
owner: Founder
last_updated: 2026-07-03
lang: en
---

# KSA Compliance Roadmap

_Status: draft (sequenced) · Created: 2026-06-16 · Rewritten: 2026-07-03 · Owner: Founder_

> Not legal or regulatory advice, and not a statement of certified compliance status.
> Statuses below are the founder's operational tracking, sequenced against
> `../00-strategy/ceo-execution-roadmap-2026-07.md` (Sprints 0–3) and
> `../02-legal/launch-gate-legal-checklist-2026-06-14.md` (gates L0–L3). Every filing must
> be confirmed against the relevant Saudi authority before reliance. Items marked
> **[Owner to confirm]** are open unknowns.

## Purpose

A diffable index and status tracker over the KSA regulatory pack — what each filing is, who
owns it, its current state, and what gates it blocks. The binding detail lives in the
`.docx` deliverables listed below. Company context: solo founder, **pre-entity (no CR yet),
pre-revenue**; the first revenue motion is B2B school pilots invoiced manually
(ZATCA-compliant e-invoice) per DEC-009.

## The dependency chain (from the CEO execution roadmap)

```
Lawyer opinion ─► NAME LOCKED ─► CR ─► Bank account ─► ZATCA VAT + Fatoora ─► Payment gateway ─► Paywall flip (L2)
Parallel: PDPL DPIA specialist review ─► public user accounts (L1)
Parallel: B2B pilot ─► manual ZATCA e-invoice ─► first revenue (pre-Fatoora-onboarding)
```

**Hard deadline: 12 Aug 2026** — the new Saudi Copyright Law + SAIP implementing
regulations take effect; the lawyer opinion (Sprint 0/1) must account for it.

## Registrations & licensing

| Item | Deliverable | Owner | Status | Blocks |
|---|---|---|---|---|
| Commercial Registration (CR) | Saudi Business Center filing — result logged in `../00-strategy/phase0.md` (P0-3) | Founder | **Blocked-by-name-lock** (lawyer opinion, Sprint 1) — target Sprint 2 (2026-07-30 → 08-27). Sole-prop vs LLC choice open **[Owner to confirm]** | Bank account → ZATCA VAT → payment gateway → paywall flip (L2); Monshaat; NTDP; entity-name contracts |
| MISA investment license | misa-investment-license-application-bundle.docx | Founder | Not started — **[Owner to confirm]** whether MISA is required at all for a Saudi-national solo founder (the CEO roadmap routes entity formation via CR on the Saudi Business Center, not MISA) | Nothing on the Q3 critical path if not required |
| Monshaat SME registration | monshaat-sme-registration-kit.docx | Founder | Not started — **Blocked-by-CR** (Sprint 2.2) | SME support programs only; nothing downstream |
| NTDP application | ntdp-application.docx | Founder | Not started — **Blocked-by-CR**; eligibility check scheduled Sprint 2.2 | Grant/support funding only |
| Tamheer & Doroob | tamheer-and-doroob-program-application-pack.docx | Founder | Not started — not applicable pre-entity and pre-hire; no hires planned this quarter | First-hire onboarding only |

## Tax & invoicing

| Item | Deliverable | Owner | Status | Blocks |
|---|---|---|---|---|
| VAT compliance | vat-compliance-memo.docx | Founder | Memo drafted; registration **Not started — Blocked-by-CR + bank account** (Sprint 3.1) | Fatoora onboarding; consumer checkout (L2) |
| ZATCA Fatoora e-invoicing | zatca-fatoora-e-invoicing-compliance-pack.docx | Founder | Pack drafted, not implemented. **Interim:** first B2B pilot invoice is issued as a manual ZATCA-compliant e-invoice (Sprint 2.5, per `../07-gtm/b2b-pipeline.md`). Full Fatoora onboarding is Sprint 3.1, **Blocked-by-VAT-registration** | First B2B revenue (manual path); paywall flip (integrated path) |
| Tax/compliance calendar | saudi-tax-and-compliance-calendar.docx | Founder | Drafted — activates as an operational tracker on CR issuance | Nothing; tracking aid |

## Workforce

| Item | Deliverable | Owner | Status | Blocks |
|---|---|---|---|---|
| Saudization (Nitaqat) | saudization-nitaqat-compliance-plan.docx | Founder | Plan drafted; **not applicable pre-entity / pre-first-employee**. Revisit at first hire (likeliest: paid help on ZATCA/payments integration or Arabic legal-page review, per CEO roadmap risk checkpoints) | Nothing until first employee |

## Data protection & security

| Item | Deliverable | Owner | Status | Blocks |
|---|---|---|---|---|
| PDPL program & DPIA | pdpl-compliance-program-and-dpia.docx | Founder | **In progress** — internally drafted and founder-signed; awaiting PDPL-specialist / SDAIA-qualified counsel review (parallel track, Sprint 2.4; checklist item P0-6/L-3) | Public user accounts (L1); AI features for account holders. Does **not** block the B2B pilot motion |
| Information security | information-security-policy.docx | Founder | Drafted (ISO 27001 / CITC-aligned) | B2B security questionnaires; institutional customers |
| Sub-processors / DPA register | sub-processor-list-and-dpa-register.docx | Founder | **Partial — review needed** (confirm Cloudflare Web Analytics and the payment processor are listed; checklist P1-7). Payment processor entry pending Stripe-vs-Moyasar reconciliation (decision-log open item) **[Owner to confirm]** | Accounts launch (L1); every signed B2B DPA (`../02-legal/b2b-data-processing-agreement-draft-2026-06-14.md` Part 5 references this register) |
| Vendor management | vendor-management-policy.docx | Founder | Drafted | — |
| Business continuity / DR | business-continuity-and-disaster-recovery-plan-bcp-dr.docx | Founder | Drafted | Institutional B2B due diligence only |

## Launch gates

Cross-reference `../02-legal/launch-gate-legal-checklist-2026-06-14.md`:

| Gate | Event | Hard compliance gates from this roadmap |
|---|---|---|
| **L0** — soft open (free library) | Public access, no accounts | None from this pack (legal-track items P0-1…P0-5 gate L0) |
| **L1** — accounts launch | Registration, free tier | **PDPL DPIA specialist sign-off**; sub-processor register current |
| **L2** — payments launch | Paid subscriptions online | **CR → bank → ZATCA VAT → Fatoora → payment gateway** — the full chain above |
| **L3** — Academy B2B (contracted) | Signed school deals | Manual ZATCA e-invoice capability (available pre-L2); signed DPA per customer |

Monetization gate (per `../03-finance/monetization.md`): online checkout cannot open until
the legal entity exists; B2B schools can be quoted and manually invoiced first.

## Sequenced narrative

### Q3 2026 (now — the critical-path quarter)

- **Sprint 0, wk of 2026-07-02:** lawyer brief out to 2–3 shortlisted firms (DEC-007). No
  compliance filings possible yet — everything registration-shaped is gated on the name.
- **Sprint 1, to 07-30:** engage one firm; receive the written opinion (corpus rights +
  name, accounting for the **12 Aug 2026** copyright law); **lock the name** (DEC-008).
- **Sprint 2, 07-30 → 08-27:** register the **CR** (sole-prop vs LLC decided first); open
  the **bank account**; submit **Monshaat** and check **NTDP** eligibility; complete the
  **PDPL DPIA** review in parallel; issue the **first manual ZATCA e-invoice** against a
  converted school pilot.
- **Sprint 3, 08-27 → 09-24:** **ZATCA VAT registration + Fatoora onboarding**; payment
  gateway live (Stripe-vs-Moyasar to be reconciled first — decision-log open item);
  paywall flip.

### Q4 2026 (post-entity consolidation)

- Fatoora issuing on every transaction; tax/compliance calendar live against real filing
  dates; first VAT return cycle.
- Arabic versions of P0/P1 legal documents (counsel to confirm if legally required —
  checklist L-4); SAIP trademark application (post name opinion, checklist L-5).
- Sub-processor register finalized against the chosen payment processor.
- Saudization/Tamheer revisited only if the first hire happens.

### 2027 (growth-stage items)

- External PDPL audit by a certified KSA privacy consultant (after 3+ months of account
  data); NCA Essential Cybersecurity Controls alignment; penetration test before
  institutional/government academy customers. (Checklist Table 7.)

## Data-residency note

PDPL target region is **me-central2 (Dammam, Saudi Arabia)**; interim compute runs in
**me-central1 (Doha, Qatar)** — see `../06-operations-it/repo-health-report-2026-06-16.md` §2.1
and `../06-operations-it/runbooks/runbook-pdpl-me-central2.md`.

## Open questions

- **[Owner to confirm]** Is a MISA license required at all for a Saudi-national solo
  founder, or is CR-via-Saudi-Business-Center the complete entity path?
- **[Owner to confirm]** Sole proprietorship vs LLC for the CR (Sprint 2.1 prerequisite).
- **[Owner to confirm]** Stripe vs Moyasar as the live processor (decision-log DEC-003 vs
  built Stripe checkout) — affects the sub-processor register and Fatoora integration.
- **[Owner to confirm]** VAT registration threshold/timing: mandatory vs voluntary
  registration point for the expected first-year revenue (~SAR 125k B2B ARR logic).
- **[Owner to confirm]** me-central2 migration date (Google access grant) — the PDPL
  posture for account-stage data depends on it.

---

*Living doc — bump statuses each sprint. Companion to
`../00-strategy/ceo-execution-roadmap-2026-07.md` and
`../02-legal/launch-gate-legal-checklist-2026-06-14.md`.*
