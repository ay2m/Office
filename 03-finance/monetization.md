---
title: Fly GACA — Monetization Strategy
section: 03-finance
doc_type: strategy
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Monetization Strategy

> Status: **adopted June 2026; price card re-cut 2026-08-19.** This document is the
> commercial source of truth for pricing and the revenue plan. `src/pages/pricing/Pricing.tsx`,
> `src/lib/prepCatalog.ts`, `.env.example` and the ROADMAP price sheet must match the price
> card below — and in the product repo `tests/pricing-server-parity.test.ts` enforces it. The companion operational playbook for the B2B motion is
> [`07-gtm/b2b-pipeline.md`](../07-gtm/b2b-pipeline.md).

## Where we are

The site is in **launch mode — everything is free for everyone**
(`FREE_FOR_EVERYONE` in `src/lib/services/entitlements.ts`). The entire billing
machine is built or specified and dormant: Moyasar checkout to be integrated at
the paywall flip (**gateway of record: Moyasar**), B2B seat grants
(`server/src/routes/grants.ts`), the Captain Adel free-tier quota
(`server/src/chat-quota-core.ts`), and entitlement gating
(`src/lib/services/features.ts`). Stripe was never shipped and the code no
longer exists; RevenueCat iOS IAP remains unimplemented.

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

_Effective 2026-08-19. Every figure below is **VAT-inclusive**, as ZATCA requires of a
published consumer price. This card is the commercial statement of what
[`iflygaca/FlyGACA`](https://github.com/iflygaca/FlyGACA) actually charges — the technical source of
truth is `PRICE_*` on the Cloud Run revision, held to the displayed price by
`tests/pricing-server-parity.test.ts`. **Change one, change both.**_

**Subscriptions**

| Item | Price | Why |
|---|---|---|
| Pro Monthly | **79/mo** | Mid-band against the AI-instructor comparables (SAR 49–187/mo) and just above the Saudi consumer-subscription corridor, where a professional tool should sit. The monthly is the anchor, not the product. |
| Pro Annual | **649/yr** (≈54/mo, save 32%) | Pulls cash forward and locks a training year. Still under the SAR 860–960 band a full-year EASA question bank commands, and a fraction of the SAR ~1,970 a Gulf pilot already pays for Jeppesen Middle East charts. 7-day free trial. |
| Exam Season Pass | **299** one-time, 90 days | Matches the fixed-window convention this market actually uses (BGS 90-day ≈ SAR 344, ATPLQuestions 2-month ≈ SAR 343). Priced so the annual is the obvious upgrade for anyone with more than one exam ahead. |
| Captain Adel credits | **39** · 50 answers | Tops up beyond the free daily allowance without a subscription. |

**Exam-prep packs** (one-time, permanent ownership; official GACA/testing fees never included)

Packs price in three bands by how much material each carries — not by certificate-vs-subject
label, which put a 76-question pack and a 514-question pack at the same price.

| Band | Price | Packs |
|---|---|---|
| Essential | **249** | Conversion · Medical · AIP |
| Standard | **399** | ELP/SAELPT · ATPL · IR |
| Complete | **499** | CPL · PPL |
| All-Access Bundle | **1,499** | All eight paid packs, permanent — under half the price of buying them separately |

The entry band sits at the international question-bank floor (ASA/Dauntless/Sheppard ≈ SAR
188–244 per written) and inside the Saudi one-time edtech band (SAR 199–400). `airspace-vfr`
stays **free** as the sampler.

**Fly GACA for Schools (B2B)** — annual packages, not per-seat bands

| Tier | Price | What it covers |
|---|---|---|
| Cohort | **12,000/yr** | Up to 25 seats, one 90-day intake — **480/seat/yr**. Self-serve checkout. |
| Academy | **39,000/yr** | Up to 100 seats, rolling 12 months (~390/seat/yr). Contact sales. |
| Institution | **from 72,000** | 100+ seats, SSO. Contact sales. |

Publishing these is deliberate: in flight-school software almost every vendor is quote-only,
so a visible price is an acquisition edge. Seat economics hold up against the alternative —
25 cadets each buying a foreign course at SAR 930–1,120 is SAR 23k+.

**Licensed Captain Adel API** (`/v1/ask`) — metered, per calendar month

| Tier | Price | Included answers |
|---|---|---|
| Starter | **499/mo** | 1,000 |
| Growth | **1,999/mo** | 5,000 |
| Scale | **6,999/mo** | 25,000 |
| Enterprise | custom | uncapped · SLA |

Priced at roughly 24× the cost of serving a cited answer, between commodity answer APIs and
niche regulatory-data APIs — where a first-party corpus belongs.

The free tier stays: library free forever, all 55 flight tools, **5 Captain Adel questions per
day** (3/day signed-out), one free prep pack, all guides free.

> **There is no Student tier.** It charged less than Pro for an identical entitlement and its
> eligibility check was never wired to any route, so it was strictly the better buy for
> everyone and Pro's price was decorative. Removed 2026-08-19 rather than gated.

## The plan — three phases

### Phase A — B2B now (the only invoice-able revenue)

Schools don't need a payment gateway. The flow exists end-to-end today:

1. Outreach to GACAR Part 141 academies and operators (target list and sequence
   in `07-gtm/b2b-pipeline.md`).
2. Quote per the seat card above; founding-partner rate for the first 2–3.
3. Signed order → manual ZATCA-compliant e-invoice → bank transfer.
4. Grant access with the existing admin callable:
   `POST /api/org/:orgId/provision-seats`, then each member self-claims via
   `POST /api/grants/school-seat` on a verified email (`server/src/routes/`).
5. Run the customer-success lifecycle (onboarding → health → renewal) using the
   playbooks already in `08-customer-success/`.

Year-1 revenue logic: 10 Cohort packages at SAR 12,000 ≈ **SAR 120k ARR** —
this dominates everything else until consumer checkout opens, so it gets the
selling time.

### Phase B — consumer pre-launch (checkout still blocked)

Keep launch mode ON, but stop giving it away silently — make the free period a
**founding-member campaign**:

- Reframe the launch banner: free during launch, and joining the waitlist locks
  **founding-member annual at SAR 549** for the first year (first 500 members).
- Communicate the post-launch free tier *now* (library always free, 5 Adel
  questions/day, all 55 tools free) so the flip surprises nobody.
- Instrument what free users actually use (Adel volume, tool opens, study
  starts) — these numbers set the day-one conversion targets.
- Lead magnets stay free by design: Conversion Eligibility Checker, ELP
  Readiness Self-Check, AIP Quiz — each one ends in the matching pack CTA.

### Phase C — the paywall flip (entity + Moyasar live)

Activation checklist, in order:

1. **Moyasar live (DEC-010):** create the products at the price card above in
   the Moyasar dashboard; set the Moyasar API keys/secrets; verify checkout +
   webhook end-to-end in test mode (mada + card + Apple Pay).
2. **Gate Captain Adel first** (it is the marginal-cost item): remove
   `FREE_FOR_EVERYONE` in `src/lib/services/entitlements.ts` and redeploy the
   Cloud Run service — the server quota (5/day signed-in, 3/day anonymous, UTC
   day boundary, `server/src/chat-quota-core.ts`) takes over.
3. **Flip the client:** the same `FREE_FOR_EVERYONE` constant gates the UI, so
   the flip is one deploy. The 55 flight tools stay free and unmetered; Study,
   logbook and pack gating resume via `src/lib/services/features.ts`.
4. **Protected content:** move paid payloads (quiz banks, Ground School, pack
   content) behind the entitlement gate, set the pack bands per
   `06-operations-it/runbooks/runbook-security-rollout.md`.
5. **Grandfather window:** 30 days — every existing account gets the
   founding-member annual (SAR 549) offer by email before quotas bite. Honour
   every waitlist lock.
6. Remove the launch banner from `/pricing`; switch JSON-LD offers from
   `PreOrder` to `InStock`.
7. iOS: native IAP is not implemented — `src/lib/services/billing.ts` throws on
   the native path. Mirroring prices into store products is future work.

### Revenue mix to expect (and what to build/sell first)

1. **Schools** — dominant year 1; recurring, invoice-based, sticky. Sell now.
2. **Prep Packs** — high-ticket one-time; conversion candidates buy on need,
   not on habit. Build content depth here second.
3. **Pro subscriptions** — compounding but slow to start; the annual push +
   founding-member lock accelerates it.
4. **Exam Season Pass** — seasonal; promote in the run-up to exam windows.
5. **Licensed API** — invoiced, independent of consumer checkout, and the only
   line that can be sold before the paywall flips.

### KPIs

- Waitlist size and weekly growth (pre-launch conversion pool)
- School seats sold / active vs. licensed seats (>80% adoption target — see
  `08-customer-success/customer-success.md`)
- Captain Adel cost per free user per month (must stay below ~SAR 1)
- Free→paid conversion at the Adel quota wall (the single best conversion point)
- Annual share of new Pro subscriptions (target >60% — the toggle defaults to
  annual on purpose)

## Invariants to preserve

- Entitlements are **server-only** — there is simply no route that lets a
  client write its own plan; nothing in this plan
  changes that. All grants flow through the Express routes in
  `server/src/routes/{billing,grants}.ts` — there is no client write path.
- Every user-facing price string is bilingual (`data-en` / `data-ar`) —
  `npm run check:i18n` enforces it.
- PDPL: user questions are personal data; the assistant stays on the in-Kingdom
  region plan regardless of monetization phase.
- Not affiliated with GACA: packs sell **preparation**, never the licence, and
  official fees are always stated as excluded.
