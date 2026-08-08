---
title: Fly GACA — Monetization Strategy
section: 03-finance
doc_type: strategy
status: active
owner: Founder
last_updated: 2026-08-09
lang: en
---

# Fly GACA — Monetization Strategy

> Status: **adopted June 2026.** This document is the single source of truth for
> pricing and the revenue plan. `pricing.html`, `schools.html`, `flygaca.html`,
> `assets/js/pricing-toggle.js` and the ROADMAP Phase 5 price sheet must match the
> price card below. The companion operational playbook for the B2B motion is
> [`07-gtm/b2b-pipeline.md`](../07-gtm/b2b-pipeline.md).

## Where we are

The site is in **launch mode — everything is free for everyone**
(`window.FG_LAUNCH_MODE = true` in `assets/js/entitlements.js`,
`ADEL_LAUNCH_MODE=free` in `functions/.env.flygaca-app`). The entire billing
machine is built or specified and dormant: Moyasar checkout to be integrated at
the Sprint 3 paywall flip (**gateway of record, DEC-010** — the Stripe checkout
code in `functions/stripe.js` stays built but dormant as a non-KSA fallback),
RevenueCat iOS IAP (`functions/revenuecatWebhook.js`), B2B seat licences
(`functions/school.js`), the Captain Adel free-tier quota
(`functions/rag/dailyquota.js`), and the protected-content gate
(`functions/content.js`).

**Online checkout cannot open until the legal entity exists (ROADMAP P0-3).**
Schools, however, can be quoted and invoiced manually today — so the revenue
plan is sequenced B2B-first.

## Guiding rule — never paywall the regulations

Unchanged and non-negotiable: the GACAR library, the guides and the safety
lessons stay free forever. They are the SEO funnel, the trust-builder and the
safest legal posture. Fly GACA charges for the **tools, teaching and AI** that
act on the regulations — never for reading the law.

## Market benchmarks (June 2026)

Prices observed for comparable products (1 USD ≈ 3.75 SAR):

| Comparable | Price | ≈ SAR |
|---|---|---|
| Boldmethod (study subscription) | $14.99/mo | ~56/mo |
| ChatGPT Plus (AI-tutor WTP anchor) | $20/mo | ~75/mo |
| Bristol Groundschool question bank | €31/mo | ~135/mo |
| ATPL Training (QB + AI tutor) | from €9.90/mo | ~43/mo |
| Gleim FAA test-prep bundle | $49–99 one-time | 185–370 |
| ASA Prepware (per test) | $59–69 one-time | 220–260 |
| King Schools / Sporty's course | $179–349 one-time | 670–1,310 |
| ForeFlight Basic/Pro/Performance | $120/$240/$360 per yr | 450/900/1,350 per yr |
| CPL at OxfordSaudia (context, not a competitor) | — | ~120,000 total |

The economics that matter: a Saudi cadet spends ~SAR 120,000+ on a CPL. A failed
written exam or a delayed checkride costs more than a year of any study tool.
Willingness to pay is anchored by the global study-subscription band
(Boldmethod/ChatGPT ≈ SAR 55–75/mo), not by the cost of the content.

## Price card (SAR) — the decided numbers

**Subscriptions**

| Item | Price | Why |
|---|---|---|
| Pro Monthly | **59/mo** | Boldmethod band, under the ChatGPT-Plus anchor. The monthly is the anchor, not the product. |
| Pro Annual | **349/yr** (≈29/mo, save 51%) | Pulls cash forward, locks a training year, undercuts ForeFlight Basic, costs less than two Exam Terms. Headline framed as **~SAR 29/month** on marketing surfaces. 7-day free trial. |
| Exam Term | **199** one-time, 120 days | Gleim/ASA per-test band. Deliberately priced so the annual is the obvious upgrade for anyone with more than one exam ahead. |

**Prep Packs** (one-time; official GACA/testing fees never included)

| Item | Price | Why |
|---|---|---|
| License Conversion Prep Pack | **899** (launch 699) · incl. 90 days Pro | Top of the King/Sporty's course band. Conversion candidates are employment-gated — the highest-WTP segment on the site. |
| ELPT / SAELPT Prep Pack | **349** · incl. 30 days Pro | Right vs. one-time test-prep comparables. |
| AIP Prep Pack | **299** · incl. 30 days Pro | Entry pack; feeds the funnel. |
| Conversion Bundle (all three) | **1,299** (saves 248) | ~16% bundle discount after the pack raise. |
| Captain Adel 1:1 Consult (180 min) | **899** (launch 699) | Founder time is the scarcest input; the launch discount narrows from 599 → 699. |
| Conversion Pack Premium | **1,699** | Pack + consult + 6 months Pro; priced to keep the consult's value intact. |

**Fly GACA for Schools (B2B)** — annual, per seat, minimum **10 seats**

| Seats | Price/seat/yr | Why |
|---|---|---|
| 10–24 | **299** | 14% under consumer annual; includes the admin dashboard. |
| 25–74 | **249** | 29% volume discount. |
| 75+ | **199** | The anchor for academy-scale deals. |
| Founding partner (first 2–3 schools only) | **199 flat, year 1** | In exchange for a logo, a case study and a feedback loop. |

Every pack bundles Pro days **by design** — services feed the subscription.
The free tier (post-launch-mode) stays: library free forever, **5 Captain Adel
questions/month**, 3 tool runs/day, all guides free.

## The plan — three phases

### Phase A — B2B now (the only invoice-able revenue)

Schools don't need a payment gateway. The flow exists end-to-end today:

1. Outreach to GACAR Part 141 academies and operators (target list and sequence
   in `07-gtm/b2b-pipeline.md`).
2. Quote per the seat card above; founding-partner rate for the first 2–3.
3. Signed order → manual ZATCA-compliant e-invoice → bank transfer.
4. Grant access with the existing admin callable:
   `grantSchoolLicence(emails, schoolId, expiresAt)` (`functions/school.js`).
5. Run the customer-success lifecycle (onboarding → health → renewal) using the
   playbooks already in `08-customer-success/`.

Year-1 revenue logic: 10 schools × ~50 seats × ~SAR 249 ≈ **SAR 125k ARR** —
this dominates everything else until consumer checkout opens, so it gets the
selling time.

### Phase B — consumer pre-launch (checkout still blocked)

Keep launch mode ON, but stop giving it away silently — make the free period a
**founding-member campaign**:

- Reframe the launch banner: free during launch, and joining the waitlist locks
  **founding-member annual at SAR 299** for the first year (first 500 members).
- Communicate the post-launch free tier *now* (library always free, 5 Adel
  questions/month, 3 tools/day) so the flip surprises nobody.
- Instrument what free users actually use (Adel volume, tool opens, study
  starts) — these numbers set the day-one conversion targets.
- Lead magnets stay free by design: Conversion Eligibility Checker, ELP
  Readiness Self-Check, AIP Quiz — each one ends in the matching pack CTA.

### Phase C — the paywall flip (entity + Moyasar live)

Activation checklist, in order:

1. **Moyasar live (DEC-010):** create the products at the price card above in
   the Moyasar dashboard; set the Moyasar API keys/secrets; verify checkout +
   webhook end-to-end in test mode (mada + card). The dormant Stripe code stays
   untouched — no Stripe secrets, no Stripe products.
2. **Gate Captain Adel first** (it is the marginal-cost item): remove
   `ADEL_LAUNCH_MODE=free` from `functions/.env.flygaca-app` and redeploy
   functions — the server quota (5/month, KSA month boundary) takes over.
3. **Flip the client:** set `window.FG_LAUNCH_MODE = false` in
   `assets/js/entitlements.js`; tool metering (3/day) and Study/logbook gating
   resume. Bump `sw.js` version.
4. **Protected content:** move paid payloads (quiz banks, Ground School, pack
   content) into `functions/protected/`, set `ADEL_PROTECTED_CONTENT=1` per
   `06-operations-it/runbooks/runbook-security-rollout.md`.
5. **Grandfather window:** 30 days — every existing account gets the
   founding-member annual (SAR 299) offer by email before quotas bite. Honour
   every waitlist lock.
6. Remove the launch banner from `pricing.html`; switch JSON-LD offers from
   `PreOrder` to `InStock`.
7. iOS: mirror prices in RevenueCat products (`pack_aip`, `pack_elpt`,
   `pack_conversion`, monthly/annual subs).

### Revenue mix to expect (and what to build/sell first)

1. **Schools** — dominant year 1; recurring, invoice-based, sticky. Sell now.
2. **Prep Packs** — high-ticket one-time; conversion candidates buy on need,
   not on habit. Build content depth here second.
3. **Pro subscriptions** — compounding but slow to start; the annual push +
   founding-member lock accelerates it.
4. **Exam Term** — seasonal; promote in the run-up to exam windows.
5. **Consults / Premium** — margin-rich but founder-time-bound; keep slots
   scarce, raise price before adding slots.

### KPIs

- Waitlist size and weekly growth (pre-launch conversion pool)
- School seats sold / active vs. licensed seats (>80% adoption target — see
  `08-customer-success/customer-success.md`)
- Captain Adel cost per free user per month (must stay below ~SAR 1)
- Free→paid conversion at the Adel quota wall (the single best conversion point)
- Annual share of new Pro subscriptions (target >60% — the toggle defaults to
  annual on purpose)

## Invariants to preserve

- Entitlements are **server-only** (`firestore.rules`); nothing in this plan
  changes that. All grants flow through Cloud Functions.
- Every user-facing price string is bilingual (`data-en` / `data-ar`) —
  `npm run check:i18n` enforces it.
- PDPL: user questions are personal data; the assistant stays on the in-Kingdom
  region plan regardless of monetization phase.
- Not affiliated with GACA: packs sell **preparation**, never the licence, and
  official fees are always stated as excluded.
