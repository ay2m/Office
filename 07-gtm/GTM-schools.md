# Fly GACA — Go-to-Market: Flight Schools (B2B-First)

**Status:** plan, not built · **Maps to:** `ROADMAP.md` Phase 5, `office/SPEC-instructor-dashboard.md`
**Prepared:** 2026-05-30 · **Companion:** `STRATEGY-competitive-teardown.md`

The roadmap puts Schools in Phase 5, after a long consumer build and behind the legal entity.
This document argues for the opposite sequencing — **B2B before consumer-paid** — and lays
out the motion to land the first academies. The thesis from the competitive teardown: this
market is small enough to be **winner-take-most, and it is won through institutions, not SEO.**

> Not legal advice. Live invoicing depends on the legal entity (`PHASE0.md` P0-3) and ZATCA
> onboarding (`ROADMAP.md` Phase 5). A pilot can run on a manual contract before that lands.

---

## 1. Why B2B-first beats consumer-first here

| | Consumer freemium (current plan) | B2B-first (this doc) |
|---|---|---|
| Buyer count to meaningful revenue | hundreds of individuals at SAR 49/mo | **3–5 institutions** at SAR 149–249/seat/yr |
| Revenue per close | ~SAR 49/mo, high churn | **annual contract, 20–200 seats**, low churn |
| Engagement data for the AI | scattered, self-selected | **captive cohorts** generating dense usage data |
| Defensibility | none — features are cloneable | **switching cost + reference logo** per school |
| Gate | needs full paywall + payments | a contract + a roster + a dashboard |

A signed academy delivers three compounding assets at once: revenue, a reference logo that
makes the next school trivial, and the cohort data that makes Captain Adel and the
exam-readiness analytics measurably better than any self-serve competitor's.

## 2. Target segments (Saudi, in priority order)

1. **GACA-approved ATOs / flight academies** — the core. Cadets sit GACA written exams; the
   school carries the pass-rate risk. This is the seat-licence buyer.
2. **Aviation faculties / technical colleges** running ground school.
3. **Type-rating & conversion shops** serving foreign pilots entering the Kingdom — these
   feed the Conversion Prep Pack line directly.
4. **Corporate / GA flight departments** with recurrency and currency-tracking needs.

> Maintain the live prospect list in a private CRM, not in-repo — it is personal/commercial
> data and the repo is public. This doc holds the *motion*, not the contacts.

## 3. The offer

Anchored on the decided price sheet (`ROADMAP.md` Phase 5):

- **SAR 249 / seat / year**, tiering to **199 at 25+** and **149 at 75+ seats**.
- **Admin dashboard included** — cohort exam-readiness, per-cadet progress, who's falling
  behind (the genuine instructor tool, built per `SPEC-instructor-dashboard.md`).
- Annual contract; ZATCA-compliant invoicing once the entity is live.
- **Pilot-program pricing** for the first 2–3 logo schools: a discounted or partly-free first
  cohort in exchange for a reference and a testimonial. The logo is worth more than the margin.

**The wedge in the pitch:** built on **GACAR** (not FAA), every quiz answer cited to the exact
Part, the only platform pairing Saudi regulation with real accident lessons, and bilingual.
No FAA-based incumbent (Gleim, Sporty's, King) can say any of that.

## 4. The motion (no entity required to start)

1. **Build the demo asset** — a one-page school deck + a live dashboard walkthrough on seeded
   demo data. Lead with cohort readiness and the cited-explanation wedge.
2. **Warm intros** to 8–10 academies; book pilot conversations.
3. **Land 1–2 pilot cohorts** on a manual letter of agreement (no payment gateway needed yet)
   — free or discounted, in exchange for usage and a testimonial.
4. **Instrument and report** — weekly cohort readiness back to the instructor; this report *is*
   the retention mechanism and the renewal case.
5. **Convert pilots to paid annual** once the entity + ZATCA are live; use the references to
   open the next tier of schools.

## 5. What has to be built (and what doesn't yet)

**Build now (not gated by the entity):**
- The instructor/admin dashboard — `SPEC-instructor-dashboard.md` (multi-tenant model + rules).
- The school deck and seeded demo cohort.
- A "request seats" enquiry path on `schools.html` (the page already sells this).
- Seat-entitlement data model — `users/{uid}` plan carries a `school` entitlement + cohort id.

**Defer to the business track (gated by `PHASE0.md` P0-3):**
- ZATCA VAT registration + Fatoora e-invoicing.
- mada-capable gateway + recurring/bulk billing.

## 6. Success metric for the quarter

**One signed pilot cohort and one reference-able logo** beats any amount of consumer polish.
That single proof point is the thing a funded competitor cannot quickly replicate — and the
thing that turns the channel from open to defended.

## 7. The risk this closes

Per the teardown, the move to fear most is a competitor **buying the channel** — exclusive ATO
prep partnerships locked before we register the entity. Landing pilot cohorts now, even
unpaid, is the direct counter: it is far harder to displace an incumbent already running a
school's cohort than to sign a school that has no platform yet.
