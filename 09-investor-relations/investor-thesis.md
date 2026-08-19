---
title: Fly GACA — Investor Thesis
section: 09-investor-relations
doc_type: strategy
status: draft
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Investor Thesis

> **Draft for owner review — not financial, legal or investment advice.** Confirm every figure
> against `../03-finance/` before external use. Authoritative deliverables:
> fly-gaca-pitch-deck-2026-06-16.pptx (+ slide exports) · investor-faq.docx ·
> due-diligence-questionnaire.docx · monthly-investor-update-template.docx ·
> saudi-investor-target-list.xlsx · risk-register.xlsx.

## Purpose

The written-narrative companion to the pitch deck — the thesis in prose so it can be edited,
diffed, and kept consistent with the deck and the finance model. It is deliberately honest
about stage: the companion risk memo (`../02-legal/risk-memo.md`) is written to be argued
with, and this narrative does not contradict it.

## Authoritative deliverables (source of truth)

- fly-gaca-pitch-deck-2026-06-16.pptx (+ slide-01…15.jpg exports)
- investor-faq.docx
- due-diligence-questionnaire.docx
- monthly-investor-update-template.docx
- saudi-investor-target-list.xlsx
- risk-register.xlsx

## 1. The thesis in one paragraph

Saudi civil aviation regulation (GACAR, AIP) is scattered, hard to search, and hard to study
— yet every Saudi cadet, pilot and flight school is examined and licensed against it. Fly
GACA has already built the deepest structured corpus of that regulation in existence — 74
GACAR Parts, 21 topical handbooks and 190 reference documents, indexed across 47,361
retrieval chunks — and wrapped it in study tools, mock exams and "Captain Adel," an AI
flight instructor that answers only from the retrieved regulation and cites the exact Part,
in both English and Arabic, with personal data processed in-Kingdom. The product is complete
and deployed a year ahead of its business; the company is now executing the go-to-company
critical path — legal entity, name clearance, and annual B2B cohort packages for flight academies as
the first revenue line — into a small but winner-take-most market that is won through
institutions before any funded competitor can lock the channel.

## 2. Problem & market

**The problem.** Saudi civil aviation regulation is the binding text of every cadet's
written exams, every licence conversion, and every operator's compliance obligations — and
it is fragmented across GACA publications, hard to access and harder to study. The
Improvement Audit characterises the product fit as a **painkiller (regulatory
fragmentation)**, not a vitamin. The economics of failure make the pain concrete: a Saudi
cadet spends **~SAR 120,000+** on a CPL, and a failed written exam or delayed checkride
costs more than a year of any study tool (`../03-finance/monetization.md`).

**The cadet pipeline.** The buyer chain runs cadet → flight academy → operator: GACAR
Part 141 academies (OxfordSaudia at Dammam is the scale anchor), aviation technical colleges
feeding Saudia/flynas/flyadeal, type-rating and conversion shops serving foreign pilots
entering the Kingdom, and operators with recurrent-training needs (`../07-gtm/gtm-schools.md`).
The academies carry the pass-rate risk for their cadets — which is why they, not
individuals, are the first buyer.

**Market size — the honest version.** Saudi Arabia has a few thousand active pilots and
cadets, not hundreds of thousands; the market is single-country and single-regulator
(`../02-legal/risk-memo.md` R3). Vision 2030's aviation expansion is the widely-cited
backdrop for pipeline growth, but this repo holds no sourced expansion figures — a credible
bottoms-up TAM (pilots + cadets + schools, with sources) is an open diligence item:
**[Owner to confirm]**. The counterweight to the small TAM is structure: a handful of
institutions represent most of the revenue, so the market is **winner-take-most and won
through institutions, not SEO** — 3–5 signed academies is a defended channel, not a toehold.

## 3. Product & moat

**What is built (deployed, live).** The GACAR/AIP regulatory library; Captain Adel answering
with citations to the exact Part; a 162-question study system with mock exams; 55 flight
tools; eleven guides; full Arabic RTL; offline PWA support; and a launch-ready SEO pass —
eleven product phases complete (`../01-governance/board-pack-2026-07.md`).

**The moat, in layers:**

| Layer | What it is | Why it holds |
|---|---|---|
| **Corpus depth** | 74 GACAR Parts · 21 topical handbooks · 190 reference documents · 61 aerodromes · 13 charts, indexed by BM25 across **47,361 chunks** (canonical: `../06-operations-it/repo-health-report-2026-06-16.md` §2.2) | Machine-extracted, structured, drift-checked against GACA's publications — months of work a competitor must replicate before day one |
| **Cited-to-Part AI** | RAG is the source of truth: Captain Adel answers only from retrieved passages, cites the exact Part/section, and refuses rather than guesses; every change is eval-gated | Trustworthy behaviour in a safety-critical domain is the product, not a feature |
| **Native bilingual** | Every user-facing string ships EN/AR (CI-enforced); Arabic questions route to in-Kingdom Arabic model providers | No FAA-based incumbent (Gleim, Sporty's, King) is built on GACAR or serves Arabic natively |
| **PDPL posture** | Personal data processed in-Kingdom — the Express service runs on Cloud Run in **me-central2 (Dammam)** against a Cloud SQL Postgres instance in the same region | A compliance feature institutional buyers and regulators can verify |
| **Institutional switching cost** | Cohort seat packages + the instructor dashboard put cohort readiness data inside the school's workflow | A school running its cohort on the platform is far harder to displace than one with no platform |

**Stated honestly:** the corpus is public and LLM+RAG over public documents is
commoditising (risk memo R9). The durable moat is converting the head start into signed
academies and distribution before a funded competitor or GACA itself replicates it — which
is exactly what the current quarter's plan does.

## 4. Business model & traction

**Model** — freemium + Pro + Exam Season Pass + one-time exam-prep packs + annual school
packages + a licensed AI API (source of truth: `../03-finance/monetization.md`, price card
re-cut 2026-08-19; all figures VAT-inclusive). The regulations library is free forever — the
SEO funnel, the trust-builder and the safest legal posture; Fly GACA charges for the tools,
teaching and AI that act on the regulation, never for reading the law. The free tier is
deliberately generous: the whole library, all 55 flight tools, 5 Captain Adel questions a day
and one free prep pack.

| Line | Headline pricing (SAR) |
|---|---|
| Pro subscription | 79/mo · 649/yr (≈54/mo, save 32%; 7-day trial) |
| Exam Season Pass (90 days) | 299 one-time |
| Exam-prep packs — three content bands | Essential 249 (Conversion · Medical · AIP) · Standard 399 (ELP/SAELPT · ATPL · IR) · Complete 499 (CPL · PPL); All-Access Bundle 1,499 |
| Captain Adel credits | 39 · 50 answers |
| Schools — annual packages, not per-seat | Cohort 12,000/yr (25 seats, 90-day intake — 480/seat/yr) · Academy 39,000/yr (100 seats) · Institution from 72,000 |
| Licensed Captain Adel API (`/v1/ask`) | Starter 499/mo (1,000 answers) · Growth 1,999/mo (5,000) · Scale 6,999/mo (25,000) · Enterprise custom |

**Sequencing** — B2B-schools-first (DEC-009): schools are invoiceable today via manual
ZATCA e-invoice and an existing admin seat grant; consumer checkout is gated on the
legal entity and payment gateway (Sprint 3). Year-1 revenue logic: 10 Cohort packages at
SAR 12,000 ≈ **SAR 120k ARR**; the board-level plan target is **SAR 1.8M ARR and 5 academies
by Sep 2027** (`../01-governance/board-pack-2026-07.md`). The licensed API is the one line
that does not depend on consumer checkout at all — it is contracted and invoiced like the
schools line, and it monetises the corpus rather than the study product.

**Traction & current status — the honest picture** (per
`../00-strategy/ceo-execution-roadmap-2026-07.md`):

- Product: **built and deployed** — a year ahead by any build measure.
- Revenue: **zero**. Customers: **zero**. Legal entity: **not yet registered**.
- The quarter's scoreboard is two numbers: does the company legally exist, and how many
  customers have paid. Sprint plan: lawyer engaged + 3 school outreaches (July) → name
  locked + first pilot agreed (by 30 Jul) → CR + bank + **first paid invoice** (by 27 Aug) →
  gateway live + paywall flip + 2–3 more pilots (by 24 Sep).

An investor is being asked to underwrite execution of that conversion — build-to-business —
not to speculate on whether the product can be built. It already is.

## 5. Why now

- **The 12 Aug 2026 copyright law.** Saudi Arabia's new Copyright Law and SAIP implementing
  regulations take effect 12 August 2026, including the official-documents exclusion and an
  AI-training exception — both central to the corpus position. The written legal opinion is
  being obtained now, ahead of the change (DEC-007); a favourable reading converts the
  corpus from a legal question into a licensed asset.
- **The channel window.** The competitive move to fear is a funded competitor locking
  exclusive academy prep partnerships first. There is no GACAR-native incumbent today;
  landing pilot cohorts now — even free — defends the channel before it is contested
  (`../07-gtm/gtm-schools.md` §7).
- **GACA publication cadence favours structure.** The AIP changes on the 28-day AIRAC cycle
  and GACAR amends regularly; the platform's source-manifest drift-checking turns that churn
  into a moat (freshness) rather than a burden — for whoever industrialises it first.
- **The build is done.** Every riyal raised goes to legal existence, distribution and
  revenue — not to product risk.

## 6. The ask

**[Owner to confirm]** — raise amount, instrument (priced equity / SAFE / convertible),
valuation posture, and use of funds are not yet set anywhere in this repo and must be fixed
against the finance model before any external conversation. Grounded framing for that
discussion:

- **Milestones the money buys** (from the roadmap): legal entity + banked; name cleared or
  rebranded; 3+ academy contracts; consumer checkout live; PDPL DPIA signed off.
- **Honest financing-type framing** (risk memo R3): single-country TAM means this may be a
  strong cashflow business rather than a venture-scale one — match the instrument and the
  investor to that reality rather than overclaiming.
- **Non-dilutive first:** Monshaat registration and NTDP eligibility are already in the
  Sprint 2 plan (`../04-compliance-ksa/`); exhaust programme support before pricing equity.

## 7. Risks

Keep aligned with risk-register.xlsx and `../02-legal/risk-memo.md` — the narrative and the
register must never diverge. The top items, stated plainly:

| Risk | Severity | Status / mitigation |
|---|---|---|
| **Name/trademark** — "Fly GACA" may be unregistrable at SAIP; passing-off exposure from a government authority's designation | Critical | Lawyer opinion due by 30 Jul 2026; name locked before entity registration; brand spend frozen (DEC-008); `captadel.com` secured as the rebrand hedge |
| **Corpus rights** — rehosted GACAR/AIP rests on an unconfirmed copyright position under the new 2026 law | Critical | Written opinion is the legal gate (DEC-007); fallback is the deep-link index posture; AI-exception regs (post-12 Aug) may loosen it |
| **Solo founder** — bus factor of one; B2B selling and content freshness are founder-bound | High | Acknowledged, not yet mitigated; the 1:1 consult SKU was retired on 2026-08-19 so no revenue line now sells founder hours; first paid help earmarked for ZATCA/payments and Arabic legal review; co-founder/first hire is a diligence item |
| **GACA dependence** — the regulator could publish its own app, endorse a competitor, or object to the name | High | No relationship yet; documented non-objection is the minimum diligence target |
| **Zero revenue validation** — prices decided but never tested on a paying customer | High | Being retired now: the current quarter's whole plan is the first paid contract |
| **Small TAM** — single-country, single-regulator; expansion means a new corpus per country | High (structural) | Bottoms-up TAM to be built **[Owner to confirm]**; honest venture-vs-cashflow framing in the ask |
| **AI liability** — confidently-wrong answers in a safety-critical domain | Medium–High | Cite-and-refuse behaviour, guards, eval-gated changes; eval set needs substantial expansion |
| **PDPL** — DPIA not yet complete | Medium | Scheduled by 27 Aug 2026; gates consumer accounts, not the B2B motion |

## 8. Target investors

Segmentation lives in saudi-investor-target-list.xlsx — **[Owner to confirm]** the current
list and tiers. Grounded fit criteria from this repo's strategy documents:

- **Saudi-first**: the business is KSA-regulated (entity, ZATCA, PDPL, SAIP) and the product
  is Saudi-specific — investors who understand the Kingdom's aviation and Vision 2030
  context, and who can open academy/operator doors, are worth more than capital alone.
- **Programme capital before equity**: Monshaat / NTDP (applications prepared in
  `../04-compliance-ksa/`).
- **Right-sized expectations**: given the R3 framing, angels and seed funds comfortable
  with a capital-efficient, B2B-anchored, possibly cashflow-shaped outcome — not
  blitz-scale funds.

## Open questions

1. The ask — amount, instrument, valuation, use of funds: **[Owner to confirm]** (blocks any
   external conversation).
2. Bottoms-up TAM with sources (pilots, cadets, schools): **[Owner to confirm]** — top
   diligence-list item.
3. Lawyer verdicts on name and corpus (due ~30 Jul 2026) — the thesis's two critical risks;
   update §7 verbatim from the written opinion when in hand.
4. First paid school contract (target: by 27 Aug 2026) — converts §4 from plan to traction.
5. GACA posture — pursue a documented non-objection; the thesis is materially stronger with
   one.
6. Reconcile this narrative with the pitch deck (2026-06-16 build) after the name decision —
   the deck predates the go-to-company reprioritisation (DEC-006).

---

*Living document — keep consistent with the pitch deck, risk-register.xlsx and
`../03-finance/finance-strategy.md`. Confidential — not for distribution. Not investment,
financial or legal advice.*
