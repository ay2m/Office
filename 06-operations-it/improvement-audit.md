---
title: Fly GACA — Continuous Improvement Audit
section: 06-operations-it
doc_type: audit
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Continuous Improvement Audit

> [!NOTE]
> **Superseded 2026-08-19 — retained as a record, not corrected.** This document captured the
> position as it stood on its own date. The price card, the B2B pricing model and the platform
> architecture have all changed since: see [`01-governance/decision-log.md`](../01-governance/decision-log.md)
> **DEC-011** and [`03-finance/monetization.md`](../03-finance/monetization.md) for what is
> current. Nothing below has been edited — its value is that it records what was decided or
> observed at the time, including the parts that later turned out to be wrong.

_Date: 2026-06-09 · Scope: Technical Code & Architecture, UI/UX & Web Design, Written
Content & Communication, Product & Business Strategy._

This report applies a five-pillar continuous-improvement framework to the repo. Each
finding is tagged **[code]** (actionable in this repository) or **[ops]** (needs external
action — legal, billing keys, sales, analytics accounts). Findings were verified against
source; one originally-reported UI finding was retracted as false (the hero grid already
stacks on mobile at `landing.css:613`).

A first batch of verified, low-risk **[code]** fixes was applied alongside this report —
see **[Applied in this pass](#applied-in-this-pass)**.

---

## Priority summary

| # | Pillar | Finding | Tag | Severity | Status |
|---|--------|---------|-----|----------|--------|
| 1 | Content | Chat error/rate-limit/not-ready replies were English-only — broke Arabic UX on any backend failure (`assets/js/chat.js`) | code | High | **Fixed** |
| 2 | Technical | Silent `catch` on the entitlement read demotes every paid pilot during a Firestore outage with no log (`functions/index.js:60`) | code | High | **Fixed** |
| 3 | UI/UX | No `:disabled` button styling — disabled CTAs render fully active (`assets/css/base.css`) | code | Med | **Fixed** |
| 4 | Technical | 47 ` 2.*` sync-artifact duplicate files committed and unreferenced | code | Low | **Fixed** |
| 5 | Technical | `guards.js` duplicated across `functions/rag/` and `captadel/src/brain/` with no CI parity check — can silently diverge | code | Med | Open |
| 6 | Technical | Rate-limiter wholesale `hits.clear()` on overflow under-counts a window (`functions/rag/ratelimit.js:53-62`) | code | Med | Open |
| 7 | Technical | `TESTER_EMAILS` (`assets/js/store.js`) ↔ `functions/staff.js` synced by hand, no CI guard | code | Med | Open |
| 8 | Technical | Monolithic page modules: `document.js` (~790 lines), `landing.js` (~629), `tools-aerodromes.js` (~508) | code | Med | Open |
| 9 | UI/UX | Nav touch targets undersized (`.lang-toggle`/`.nav-search` < 44px) | code | Med | Open |
| 10 | UI/UX | No visible loading/empty-state feedback in chat, library search, document reader | code | Med | Open |
| 11 | UI/UX | Form errors lack `role="alert"`/`aria-invalid` (pricing, account) | code | Med | Open |
| 12 | Content | Dynamic library/search result metadata not bilingual; `tools/` UIs partially un-translated | code | Med | Open |
| 13 | Content | Pricing page has no "prices subject to change / VAT" caveat | code | Low | Open |
| 14 | Content | "Captain Adel" / "AI flight instructor" / "study assistant" naming inconsistent | code | Low | Open |
| 15 | Product | Analytics dark — Cloudflare token empty, error beacon local-only, no product analytics (`assets/js/analytics.js`) | ops | High | Open |
| 16 | Product | No customer feedback loop (waitlist capture only) | ops | Med | Open |
| 17 | Product | Stripe integration coded but not wired to the pricing CTA (`functions/stripe.js`) | ops | Med | Open |
| 18 | Product | Legal entity + PDPL DPIA are hard gates on monetization / public launch (`phase0.md`, `roadmap.md`) | ops | High | Open |
| 19 | Product | B2B schools motion + social pipeline documented but not executed (`office/`) | ops | Med | Open |

---

## A. Technical Code & Architecture

**Strong already:** clean three-unit separation (static PWA / gateway / Captain Adel
subtree); `*-core.js` pure modules with unit tests; defense-in-depth injection guards and
XSS escaping (`chat.js` `esc()`/`safeUrl()`); region as a single source of truth
(`functions/region.js`); comprehensive CI gates (chrome, data, links, e2e, eval, rules).

**Findings**
- **[#2, fixed]** `functions/index.js` `identify()` swallowed the entitlement read with an
  empty `catch (_)`. A sustained Firestore outage would silently treat every paid pilot as
  free with no signal. Now logs `logger.warn('entitlement read failed', …)`; fail-to-free
  behaviour unchanged.
- **[#4, fixed]** 47 ` 2.*` files (`package 2.json`, `CLAUDE 2.md`, `functions/content 2.js`,
  20+ `tools-* 2.js`, duplicated `docs/`, `tests/`) were committed sync artifacts, referenced
  by nothing. Removed.
- **[#5]** `functions/rag/guards.js` and `captadel/src/brain/guards.js` are ~99% identical by
  design (gateway + service copies) but kept in sync by hand. **Recommend** a CI guard that
  diffs the shared logic (or a generated shared module) so injection detection can't diverge.
- **[#6]** `functions/rag/ratelimit.js:53-62` clears the entire `hits` map when it exceeds
  `MAX_KEYS`, under-counting one window for all keys. Acceptable at MVP scale; **recommend**
  an LRU/segmented eviction before high traffic.
- **[#7]** `TESTER_EMAILS` in `assets/js/store.js` must mirror `functions/staff.js`; a missed
  update mis-grants access. **Recommend** a small CI check asserting parity.
- **[#8]** Decompose the largest page modules (`document.js`, `landing.js`,
  `tools-aerodromes.js`) along their internal seams (reader vs bookmarks vs i18n dict).

## B. UI/UX & Web Design

**Strong already:** WCAG-AA+ contrast tokens (`tokens.css`); fluid `clamp()` type scale;
skip links, focus-visible rings, ARIA landmarks and live regions; logical-property RTL;
responsive breakpoints at 1024/900/760/480.

**Findings**
- **[#3, fixed]** No `:disabled` button rule existed — disabled CTAs looked active. Added
  `.btn:disabled` (opacity .5, `not-allowed`, no transform/pointer-events) to `base.css`.
- **[#9]** `.lang-toggle` / `.nav-search` compute to ~28–32px tall — below the 44px touch
  target. **Recommend** bumping vertical padding (verify visually to avoid nav reflow).
- **[#10]** Add a spinner/skeleton + bilingual "loading…" to chat, library search and the
  document reader; users on slow links get no feedback today.
- **[#11]** Add `role="alert"` / `aria-invalid` to form validation so screen readers
  announce failures (pricing, account/waitlist forms).
- _Retracted:_ "hero grid doesn't stack on mobile" — false; `landing.css:613` stacks it at
  `max-width:760px`.

## C. Written Content & Communication

**Strong already:** identical not-affiliated / verify-against-GACA disclaimer strip on every
page + full `about.html`; BLUF marketing copy; calm instructor-grade tone with no hype;
the Captain Adel persona handles Arabic/English code-switching.

**Findings**
- **[#1, fixed]** `chat.js` `NOT_READY` / `ERROR` / `RATE_LIMITED` were English-only. They
  now carry `{ en, ar }` and a `msg()` helper that reads `document.documentElement.lang`
  (set by the `landing.js` bilingual engine), so an Arabic-preferring pilot gets Arabic
  fallbacks when the engine is unreachable.
- **[#12]** Dynamic text injected by `library.js` / `doc-search.js` (result counts, filter
  state, "no results") and several `tools/` UIs are not bilingual. **Recommend** routing all
  injected strings through the same `data-en`/`data-ar` (or a small lang helper) so
  `check:i18n` semantics extend to runtime content.
- **[#13]** Add a small "prices for reference, subject to change; VAT per local law" caveat
  to `pricing.html`.
- **[#14]** Standardize the assistant's first-mention framing, e.g. "Captain Adel — an AI
  flight instructor (not a real person), trained on the GACAR."
- **Process:** ROADMAP Phase 4 flags a pending native-Arabic review; current AR copy
  (including the strings added in this pass) should pass through it.

## D. Product & Business Strategy

**Strong already:** painkiller fit (regulatory fragmentation), defensible moats (GACAR
corpus depth, cited-to-Part AI, native bilingual), coherent freemium + Pro + Exam-term +
school-seat + pack pricing, transaction-safe cross-platform entitlements that never clobber.
These are **[ops]** items — recorded here, not changed in code.

**Findings**
- **[#15]** Instrument before launch: the Cloudflare Web Analytics token in
  `assets/js/analytics.js` is empty and the error beacon is local-only. Stand up a
  privacy-friendly product analytics tool now to capture a pre-paywall baseline.
- **[#16]** Add a feedback loop (in-app "report an issue" → ticket) before paying customers
  arrive.
- **[#17]** Wire the `pricing.html` CTA to the already-coded `functions/stripe.js` checkout
  (sandbox-testable without the legal entity).
- **[#18]** Legal entity registration (`phase0.md` P0-3) gates monetization; the PDPL DPIA
  gates the public Phase 3 launch. Start both in parallel with engineering.
- **[#19]** Execute the documented B2B schools outreach (`office/gtm-schools.md`) and publish
  the ready social launch posts (`office/social-media/`).

---

## Applied in this pass

Low-risk, verified **[code]** fixes shipped with this report:

1. **Bilingual chat fallbacks** — `assets/js/chat.js` (`MESSAGES` + `msg()`).
2. **Entitlement-read observability** — `functions/index.js` (`logger.warn`, behaviour
   unchanged).
3. **Disabled-button styling** — `assets/css/base.css` (`.btn:disabled`).
4. **Repo hygiene** — removed 47 unreferenced ` 2.*` sync-artifact files.

Everything else above is left as a tracked recommendation, deliberately not implemented in
this pass because it is larger, needs visual review, or is an ops/strategy action.
