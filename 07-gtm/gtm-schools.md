---
title: "Fly GACA — Go-to-Market: Flight Schools (B2B-First)"
section: 07-gtm
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Go-to-Market: Flight Schools (B2B-First)

**Status:** plan, not built · **Maps to:** `roadmap.md` Phase 5, `office/spec-instructor-dashboard.md`
**Prepared:** 2026-05-30 · **Companion:** `strategy-competitive-teardown.md`

The roadmap puts Schools in Phase 5, after a long consumer build and behind the legal entity.
This document argues for the opposite sequencing — **B2B before consumer-paid** — and lays
out the motion to land the first academies. The thesis from the competitive teardown: this
market is small enough to be **winner-take-most, and it is won through institutions, not SEO.**

> Not legal advice. Live invoicing depends on the legal entity (`phase0.md` P0-3) and ZATCA
> onboarding (`roadmap.md` Phase 5). A pilot can run on a manual contract before that lands.

---

## 1. Why B2B-first beats consumer-first here

| | Consumer freemium (current plan) | B2B-first (this doc) |
|---|---|---|
| Buyer count to meaningful revenue | hundreds of individuals at SAR 79/mo | **3–5 institutions** on annual packages of SAR 12,000–72,000 |
| Revenue per close | ~SAR 79/mo (SAR 649/yr), high churn | **one annual package, 25–100+ seats**, low churn |
| Engagement data for the AI | scattered, self-selected | **captive cohorts** generating dense usage data |
| Defensibility | none — features are cloneable | **switching cost + reference logo** per school |
| Gate | needs full paywall + payments | a contract + a roster + a dashboard |

The arithmetic is the argument: one Cohort package (SAR 12,000/yr) equals **19 Pro annual
subscriptions** at SAR 649 — sold once, to one buyer, with one invoice, against nineteen
separate consumer acquisitions that each churn on their own schedule.

A signed academy delivers three compounding assets at once: revenue, a reference logo that
makes the next school trivial, and the cohort data that makes Captain Adel and the
exam-readiness analytics measurably better than any self-serve competitor's.

## 2. Target segments (Saudi, in priority order)

1. **GACA-approved ATOs / flight academies** — the core. Cadets sit GACA written exams; the
   school carries the pass-rate risk. This is the package buyer.
2. **Aviation faculties / technical colleges** running ground school.
3. **Type-rating & conversion shops** serving foreign pilots entering the Kingdom — these
   feed the Conversion Prep Pack line directly.
4. **Corporate / GA flight departments** with recurrency and currency-tracking needs.

> Maintain the live prospect list in a private CRM, not in-repo — it is personal/commercial
> data and the repo is public. This doc holds the *motion*, not the contacts.

## 3. The offer

Anchored on the price card in [`03-finance/monetization.md`](../03-finance/monetization.md).
Fly GACA for Schools sells **annual packages, not seats.** The school buys a capacity band for
a year; it does not buy, count or negotiate individual seats.

| Package | Price (SAR, VAT-incl.) | Capacity | Term | How it's bought |
|---|---|---|---|---|
| **Cohort** | **12,000 / yr** | up to 25 seats | one 90-day intake | self-serve checkout, published price |
| **Academy** | **39,000 / yr** | up to 100 seats | rolling 12 months | contact sales |
| **Institution** | **from 72,000** | 100+ seats, SSO | annual | contact sales |

- **Admin dashboard included** at every tier — cohort exam-readiness, per-cadet progress, who's
  falling behind (the genuine instructor tool, built per `spec-instructor-dashboard.md`).
- Annual contract; ZATCA-compliant invoicing once the entity is live.
- **Published prices are an acquisition edge.** Almost every flight-school software vendor is
  quote-only; a school can price us in ten seconds without a sales call. Do not undercut the
  card in a first conversation — the price is the credibility.

**Why this beats the per-seat card it replaces.** A seat-band quote invited a negotiation on
every line — how many cadets, which band, what happens at 24 seats — and it priced our smallest
buyer highest. A package moves the conversation from *unit price* to *fit*: which band, and
when does the intake start. The implied per-seat economics are strong enough to hold their own
in that conversation if a Head of Training raises them — **480/seat/yr at Cohort, ~390 at
Academy** — against 25 cadets each buying a foreign course at SAR 930–1,120 (SAR 23k+).

**The wedge in the pitch:** built on **GACAR** (not FAA), every quiz answer cited to the exact
Part, the only platform pairing Saudi regulation with real accident lessons, and bilingual.
No FAA-based incumbent (Gleim, Sporty's, King) can say any of that.

## 4. The motion (no entity required to start)

1. **Build the demo asset** — a one-page school deck + a live dashboard walkthrough on seeded
   demo data. Lead with cohort readiness and the cited-explanation wedge.
2. **Warm intros** to 8–10 academies; book pilot conversations.
3. **Land 1–2 pilot cohorts** on a manual letter of agreement (no payment gateway needed yet)
   — a free 14-day pilot sized inside the Cohort cap, in exchange for usage and a testimonial.
4. **Instrument and report** — weekly cohort readiness back to the instructor; this report *is*
   the retention mechanism and the renewal case.
5. **Convert pilots to a paid Cohort package** once the entity + ZATCA are live; use the
   references to open the Academy-sized schools.

> **Open commercial decision.** The retired price card carried a founding-partner rate (SAR
> 199/seat flat for the first 2–3 schools). Package pricing has no per-seat lever to discount,
> so the reference-logo concession has to be re-expressed — a percentage off the first annual
> package, a free first intake, or a capacity bump (Cohort price at Academy capacity). **Not yet
> decided; do not quote a founding rate until it is.** See `07-gtm/b2b-pipeline.md`.

## 5. What has to be built (and what doesn't yet)

**Build now (not gated by the entity):**
- The instructor/admin dashboard — `spec-instructor-dashboard.md` (multi-tenant model + rules).
- The school deck and seeded demo cohort.
- A "talk to sales" enquiry path on `/schools` for Academy and Institution (Cohort is the only
  self-serve tier).
- Seat provisioning is already live: `POST /api/org/:orgId/provision-seats` writes the roster to
  the `org_seats` table (Cloud SQL Postgres), capped by the org's `seat_limit` and dated to the
  90-day intake window; each member then self-claims via `POST /api/grants/school-seat` on a
  **verified** email, which merges a `plan: 'school'` entitlement upward. No client can grant
  itself a seat — there is no route that writes its own plan.

**Defer to the business track (gated by `phase0.md` P0-3):**
- ZATCA VAT registration + Fatoora e-invoicing.
- Moyasar live (the gateway of record — mada, card, Apple Pay), which is what turns Cohort into
  a self-serve checkout rather than an invoice.

## 6. Success metric for the quarter

**One signed pilot cohort and one reference-able logo** beats any amount of consumer polish.
That single proof point is the thing a funded competitor cannot quickly replicate — and the
thing that turns the channel from open to defended.

## 7. The risk this closes

Per the teardown, the move to fear most is a competitor **buying the channel** — exclusive ATO
prep partnerships locked before we register the entity. Landing pilot cohorts now, even
unpaid, is the direct counter: it is far harder to displace an incumbent already running a
school's cohort than to sign a school that has no platform yet.
