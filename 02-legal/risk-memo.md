---
title: "Fly GACA — Investor Risk Memo & Diligence Checklist"
section: 02-legal
doc_type: memo
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Investor Risk Memo & Diligence Checklist

> A skeptical outside-investor view of Fly GACA, written to be argued with. **Not legal,
> financial, or investment advice.** It is a founder's-eye risk inventory and a diligence
> punch-list — the questions a hard-nosed investor would ask before writing a cheque, and
> the proof points that would move the answer from "pass" to "yes".
>
> **Date:** 2026-05-30 · **Stage assessed:** pre-revenue, pre-entity, product largely built
> (see `roadmap.md`) · **Status:** living document — update as risks are retired.

---

## One-page summary

Fly GACA is a deep, polished, single-founder product solving a real problem (Saudi civil
aviation regulation is scattered and hard to study). The build is far ahead of the
business. The reasons an investor hesitates are **not** about product quality — they are
about **market size, unresolved legal/brand risk, dependence on GACA, key-person risk, and
the total absence of revenue validation.**

**Verdict in one line:** a genuinely good product wrapped around an unproven, capped market
and a stack of unresolved legal/dependency risks — fundable *after* the legal all-clear and
real proof of demand, not before.

| # | Risk | Severity | Likelihood | Status |
|---|------|----------|------------|--------|
| R1 | Brand/name ("Fly GACA") may be unregistrable / passing-off exposure | **Critical** | Medium–High | Open (awaiting lawyer) |
| R2 | Corpus rehosting rights unconfirmed | **Critical** | Low–Medium | Open (awaiting lawyer) |
| R3 | Small, single-country, single-regulator TAM | **High** | High (structural) | Unquantified |
| R4 | Dependence on / threat from GACA itself | **High** | Medium | Unmitigated (no relationship) |
| R5 | Solo founder / bus factor of one | **High** | — | Acknowledged, unmitigated |
| R6 | No revenue validation; monetization built but untested | **High** | — | Open (Phase 5 in progress) |
| R7 | AI accuracy/liability in a safety-critical domain | Medium–High | Medium | Partial (guards, thin evals) |
| R8 | PDPL / data-residency compliance burden | Medium | — | Open (DPIA not done) |
| R9 | Thin/commoditizing moat | Medium | Medium | Structural |
| R10 | Content-freshness treadmill (AIRAC 28-day cycle) | Medium | High (ongoing) | Manual, founder-bound |

---

## Risks in detail

### R1 — The brand rests on a name you may not be allowed to own *(Critical)*
`phase0.md` P0-2 already concludes "Fly GACA" may be **unregistrable** at SAIP and carries
**passing-off / misrepresentation** exposure because it leans on a government authority's
identity; a disclaimer is "necessary but not sufficient." All SEO, domain equity, and
marketing spend compound into a brand that may need a post-launch rebrand or attract a
cease-and-desist. **This is the single biggest reason to wait.**
*Mitigation:* lawyer opinion in hand; decide keep / tagline-only / rebrand **before** public
launch; have "Captain Adel" ready as a brand that survives a rebrand.

### R2 — The corpus rests on an unconfirmed copyright position *(Critical)*
The product *is* rehosted GACAR/AIP. The "official documents" exclusion is likely favorable
but unconfirmed, and the 2026 Copyright Law's implementing regulations are not yet
published. An unfavorable answer collapses the product to a "deep-link index," gutting the
reader, search, and most RAG value.
*Mitigation:* lawyer opinion; ship as deep-link index until cleared (already the plan).

### R3 — The market may be too small to justify the build *(High)*
Saudi Arabia has a few thousand active pilots/cadets — not hundreds of thousands. The price
card was re-cut on 2026-08-19 to **SAR 79/mo · 649/yr** for Pro, and that barely moves this
risk: annual, which is the plan the product actually pushes, went from ~588 to 649/yr, so
**the binding constraint is the number of buyers, not the price per buyer.** On a few thousand
addressable pilots and cadets, even an aggressive 20% capture of 3,000 is ~600 subscribers,
≈ **SAR 390k/yr** — and the B2B line, now sold as annual packages of SAR 12,000 (Cohort) to
39,000 (Academy) rather than per seat, adds a countable handful of academies on top, not a
long tail. Single-country, single-regulator; every new market (UAE GCAA, etc.) is a corpus
rebuild, not a copy-paste. Plausibly a good **cashflow/lifestyle business**, harder to see a
**venture-scale** outcome.

The re-cut does add a second-order risk of its own: at **SAR 79/mo** the monthly plan now sits
*above* the Saudi consumer-subscription corridor and is deliberately anchored to a professional
tool rather than a study app. That is defensible against a SAR 120,000 CPL, but it is an
assertion about willingness to pay that no Saudi cadet has yet tested with a card — see the
diligence item below.
*Mitigation:* a credible bottoms-up TAM (below); honest framing of the financing type.

### R4 — You depend on, and are most threatened by, the same body *(High)*
GACA could ship its own free official app, endorse a competitor, change the regulation
format, or object to the name — any one is potentially fatal. You sit adjacent to a
government monopoly with no endorsement and a borrowed name.
*Mitigation:* secure at minimum a documented non-objection; ideally a pilot/partnership.

### R5 — Bus factor of one *(High)*
"Captain Adel" is the founder. The roadmap itself flags solo-founder load. No team, no
redundancy, no continuity plan. The 1:1 Consult line — which sold founder hours directly —
was retired on 2026-08-19, so no revenue line now depends on founder availability; but the
corpus-freshness and content-authoring paths still run through one person.
*Mitigation:* co-founder or first hire; remove the founder from the content-freshness path.

### R6 — Enormous build, zero market validation *(High)*
11 phases shipped, and Phase 5 (money) is now in progress — the billing machinery is built
and priced, but checkout has never been open: no legal entity to accept payment, and the
paywall flip is still pending. Prices are "decided" but never tested on a
paying customer. Scarce solo-founder time was spent building before selling.
*Mitigation:* pre-sell before finishing the paywall — LOIs / pre-paid subscriptions.

### R7 — AI in a safety-critical domain is a liability vector *(Medium–High)*
Captain Adel gives regulatory/currency/minima guidance. Citations + disclaimers reduce but
don't remove the risk of a confidently-wrong answer a pilot relies on. The eval harness is
~17 cases — thin for a compliance assistant.
*Mitigation:* expand evals substantially; track groundedness; keep refuse-don't-guess
behavior; legal review of disclaimer sufficiency.

### R8 — PDPL / data-residency burden *(Medium)*
Personal data must stay in-Kingdom; the DPIA is a hard gate (Phase 3) not yet done. Cloud Run
and Cloud SQL both sit in `me-central2` (Dammam), so the application and database are
in-Kingdom — but **Captain Adel calls the Gemini API, whose processing region is not
established**, and chat queries are personal data. That, not the retired VPS, is the live
compliance tripwire.
*Mitigation:* complete the DPIA; establish and document the Gemini processing region and its
transfer mechanism before the privacy notice is published.

### R9 — The moat is thinner than claimed *(Medium)*
"Only platform on GACAR + cited AI" — but the corpus is public and scrapable, and LLM+RAG
over public docs is commoditizing. The durable moats (brand, distribution, official
endorsement) are exactly what's missing/at-risk today.
*Mitigation:* convert head-start into distribution and/or endorsement before a funded
competitor or GACA replicates it.

### R10 — Content-freshness treadmill *(Medium, ongoing)*
AIP changes every 28-day AIRAC cycle; GACAR amends regularly. Stale content in a compliance
product is worse than none — and the refresh burden lands on one person and grows with each
prep pack.
*Mitigation:* semi-automate ingestion/freshness; staffing plan for upkeep.

---

## Scalability notes

- **Tech scales; the business model is the constraint.** A React/Vite SPA on static hosting with
  a single Express service on Cloud Run (`me-central2`, Dammam) over Cloud SQL Postgres is
  comfortably sized for realistic load. The non-scaling part is the manually-maintained
  corpus and prep-pack content.
- **No geographic leverage** — corpus, tools, and AI grounding are Saudi-specific.
- **B2B concentration, now with a fixed ceiling per logo** — only a handful of Saudi flight
  schools, so a few logos = most revenue; and because Schools is priced as annual packages
  (12,000 / 39,000 / from 72,000) rather than per seat, revenue per school is a step function.
  Growth inside an account happens only when it crosses a band, not as cadets are added. Long,
  relationship-driven sales cycles with no sales motion or entity yet.
- **Best scalable line (subscriptions)** targets the smallest audience; the per-buyer-rich
  line (one-time packs) is capped by how much content one person can author.

---

## Diligence checklist — what would move "pass" → "term sheet"

### A. Legal / existential (highest priority)
- [ ] Written Saudi IP-lawyer opinion on the **name** (keep / tagline / rebrand)
- [ ] Written opinion on **corpus rehosting** rights (host vs. deep-link)
- [ ] Documented **GACA position** — at minimum a non-objection; ideally a partnership/endorsement path
- [ ] Disclaimer sufficiency reviewed against misrepresentation/passing-off exposure
- [ ] AI-corpus position confirmed under the 2026 law + its implementing regulations

### B. Market & demand (prove people pay)
- [ ] Bottoms-up TAM: count of Saudi pilots + cadets + flight schools, with sources
- [ ] Realistic capture model → revenue ceiling; honest venture-vs-cashflow framing
- [ ] 2–3 signed **flight-school LOIs** — committing to a **named annual package** (Cohort at
      SAR 12,000 or Academy at 39,000), not to a seat count
- [ ] ≥ N pre-sold annual subscriptions or paid pilots (sell before finishing the paywall)
- [ ] Evidence willingness-to-pay at **SAR 79/mo and SAR 649/yr** — the annual is the number
      that matters, since >60% of new Pro subscriptions are targeted to land there (interviews,
      landing-page conversion, pre-orders)

### C. Team & continuity
- [ ] Co-founder or first hire identified; equity/role plan
- [ ] Key-person mitigation — founder removed from the content-freshness critical path
- [ ] Continuity plan if the founder is unavailable

### D. Product / liability / compliance
- [ ] Expanded Captain Adel eval set (well beyond ~17 cases) with a published accuracy/groundedness bar
- [ ] PDPL DPIA completed and signed off; controller registered/appointed
- [ ] Content-freshness process (AIRAC re-ingestion) documented and semi-automated

### E. Operating readiness
- [ ] Legal entity registered (P0-3); business bank account open
- [ ] Payment gateway + ZATCA VAT / Fatoora path validated
- [ ] Live waitlist capture + a working go-to-market channel with early traction data

---

## What I'd want to hear in the next meeting

1. The lawyer's verdict on the name and the corpus — in writing.
2. Whether GACA will tolerate, ignore, or partner with you.
3. Proof that a flight school or a pilot will actually pay — a signature, not a survey.

Retire R1, R2, R4, and R6, and this becomes a very different — and fundable — conversation.
