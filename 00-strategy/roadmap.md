---
title: Fly GACA — Project Roadmap
section: 00-strategy
doc_type: plan
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — Project Roadmap

The master plan from the end of Phase 0 to a shipped product, across all eleven phases.
Companion to `phase0.md` (the detailed Phase 0 tracker). This file is a living checklist —
edit the **Status** fields and tick the checkboxes as you go.

**Last updated:** 2026-05-24
**Status values:** `Not started` · `In progress` · `Blocked` · `Done`

> **Staleness check (2026-06-16):** phase statuses below have not been re-verified since the
> date above. Treat as point-in-time. **TODO(owner):** re-confirm and bump "Last updated".

**Sequenced by dependency, not by date.** Solo build, no fixed deadline. The order below
is the order things *can* be done in; where two tracks can run in parallel, that is called
out explicitly.

> Not legal advice. The legal items below depend on the Saudi IP lawyer's opinion (see
> `office/lawyer-brief.md`) and, for PDPL, on proper professional review.

---

## Where things stand (24 May 2026)

| Phase | Title | Status |
|-------|-------|--------|
| 0 | Foundations | In progress — technical track done; legal track open |
| 1 | The library goes live | **Done** — live; custom domain + CI still pending |
| 2 | Captain Adel answers | **Done** — RAG function live on `gemini-2.5-flash`; App Check + evals pending |
| 3 | Pilot accounts & tools | In progress — accounts system built, verified & live (Auth provider on, rules deployed); PDPL DPIA is the one gate left before inviting users |
| 4 | Arabic, offline & polish | In progress — bilingual engine + RTL live; homepage, About & all 4 section hubs translated; remaining inner pages + native review pending |
| 5 | Money & flight schools | Not started |
| 6 | Reach | Not started |
| 7 | The training platform | In progress — explanations, Captain Adel in quizzes, 162-question bank, exam-readiness analytics shipped |
| 8 | The library as a platform | **Done** — all 6 features shipped: study content, accident lessons, whole-library search, cross-links, reading paths, FAA comparison |
| 9 | Launch & visibility | In progress — site deployed & live; SEO/structured-data/analytics done; custom domain + go-to-market pending |
| 10 | Captain Adel, production-grade | In progress — rate limits, input guards & eval harness shipped; App Check, CI gate & budget alerts pending |
| 11 | Depth across the practical sections | **Done** — Tools 17→21, Guides 7→11, Study bank 60→162 + flashcards mode |

**The road ahead, in priority order:** the build is far ahead of the paperwork. The
remaining work is mostly **gates and finishing**, not new construction —
(1) the **legal track** (Phase 0): engage the Saudi lawyer, lock the name, register
the entity; (2) the **PDPL DPIA**, which is the one gate before pilot accounts can be
opened to the public; (3) **finish Phase 4** — translate the remaining inner pages and
get a native Arabic review; (4) the small **console chores** — custom domain, App
Check, budget alerts, the analytics token, a CI deploy gate; then (5) **Phase 5**
(monetisation, gated by the legal entity) and (6) **Phase 6** (native apps + public
API). The legal/entity track is now the critical path — the product itself is built.

Phase 0's technical track (repo, Firebase, VPS) is **done**; what remains in Phase 0 is the
legal track — engaging the lawyer (P0-1/P0-2) and registering the entity (P0-3).
**Phases 1, 2, 8 and 11 have shipped**: the library, the in-app reader, the 21 flight
tools, the 11 guides and the Study section (Ground School, 12 quiz banks, flashcards and a
timed mock exam) are all live at `flygaca-firebase.web.app`, Captain Adel answers with
cited sources, and the library now powers safety lessons, reading paths and whole-library
search. Phase 7 (the training platform) is largely shipped and **Phase 9 — the public
launch — is the immediate next step.**

---

## The critical path — what gates what

**The single most important point: Phase 1 is not blocked.** Because Phase 1 was decided to
launch as a **deep-link index** (it links to GACA's own copies rather than rehosting the
texts) and has **no user accounts**, the Phase 1 build can start *now* and run in parallel
with the legal track. The lawyer's opinion gates the *corpus rehosting upgrade* and the
*final brand name* — not the Phase 1 build itself.

The gating chain for everything else:

- **Lawyer opinion (P0-1)** → unlocks rehosting the actual document texts (a Phase 1
  upgrade) and confirms the AI-corpus position for Phase 2.
- **Lawyer opinion + name decision (P0-2)** → locks the final brand name → unlocks **P0-3**
  (entity registration needs the name) and final branding everywhere.
- **Legal entity (P0-3)** → unlocks the `.sa` domain, a business bank account, and the
  payment gateway + VAT in Phase 5.
- **Blaze billing plan** → required before **Phase 2** (Cloud Functions need it).
- **PDPL DPIA** → required before **Phase 3** (user accounts and personal data).

**Recommended parallelism:** run the legal track (finish Phase 0) and the **Phase 1 build**
at the same time. Do not wait idle for the lawyer.

---

## Phase 0 — Foundations (closing out)

**Goal:** legal, corporate and technical groundwork. **Status:** In progress.
**Detailed tracker:** `phase0.md`.

### Legal — engage the lawyer (P0-1 & P0-2)

- [ ] Pick 2–3 firms from `office/lawyer-shortlist.md`
- [ ] Send `office/lawyer-brief.docx`; request a fixed-fee quote, turnaround, and a
  conflict check (do they act for GACA?)
- [ ] Compare quotes; engage one firm
- [ ] Receive the written opinion on redistribution rights and the name
- [ ] Record the answers in `phase0.md` — host vs. deep-link; the name verdict

### Legal — lock the name (P0-2, after the opinion)

- [ ] Decide: keep "Fly GACA", demote it to a tagline, or rebrand
- [ ] Lock the final legal/brand name (this feeds P0-3)
- [ ] Finalise `legal/DISCLAIMER.md` with the lawyer-approved wording
- [ ] If the name changes: update the repo, pages, brand assets and domains accordingly

### Legal entity (P0-3, after the name is locked)

- [ ] Choose the legal structure (sole proprietorship vs. LLC)
- [ ] Register the Commercial Registration on the Saudi Business Center
- [ ] Register with Monshaat (SME)
- [ ] Check NTDP eligibility and apply
- [ ] Open a business bank account
- [ ] Record the CR number and entity details in `phase0.md`

### Housekeeping

- [ ] Delete the duplicate Firebase project `fly-gaca-495116`
- [ ] Reconcile the old `FlyGACA/Library` repo — archive it, or fold it into `library/`
- [ ] Verify the data-residency of Gemini / Vertex AI inference (needed before Phase 2)

**Exit criteria:** the redistribution-rights question has a documented, lawyer-confirmed
answer; the name is locked; the legal entity is registered with a business bank account.

---

## Phase 1 — The library goes live

**Goal:** a fast, public GACAR library at flygaca.com — no login, no AI. Static PWA,
client-side search, legal pages, deployed to Firebase Hosting. Launches as a **deep-link
index** (links to GACA's copies); rehosting the texts is a later upgrade gated on the
lawyer.
**Status:** Not started — **can start now**, in parallel with the Phase 0 legal track.
**Gated by:** nothing for the index build · **Gates:** Phase 2.

### Content & corpus index

- [x] Inventory the corpus — 74 GACAR parts, 61 aerodromes (AIP AD) and 13 VFR charts
- [x] Build the index data files — gacar / aerodromes / charts indexes in `assets/data/`
- [x] Define the search index format — client-side JSON, searched in `assets/js/library.js`
- [x] In-app reader — 74 GACAR parts rendered on the Ivory reading surface from the
  corpus (`assets/data/parts/`, shown by `document.html`). Note: hosting the regulation
  text itself still needs the lawyer's confirmation under P0-1.

### Design system & build (vanilla JS PWA, no framework)

- [x] Implement the brand as CSS — Falcon palette tokens + Cairo type, dark-first,
  RTL-aware (`assets/css/tokens.css`, `base.css`); brand assets in `assets/`
- [x] Build `flygaca.html` — landing page: hero, features, Captain Adel waitlist, footer
- [x] Build `library.html` — three-section library (Regulations · Aerodromes · VFR Charts) with search
- [x] Build the client-side search — title search, plus full-text search across all
  8,256 GACAR sections, with snippets that deep-link into the reader
- [x] Build the document detail view — `document.html`: regulation reader, aerodrome
  dashboard, and a zoomable VFR chart viewer; plus the interactive map (`map.html`)
- [x] PWA shell — `site.webmanifest`, app icons, and an offline service worker (`sw.js`)
- [ ] Responsive layout; confirm the unofficial-status disclaimer renders on every page
- [ ] Accessibility baseline (semantic HTML, keyboard nav, contrast)

### Legal & policy pages (business track, with Phase 1)

- [x] Disclaimer page — `disclaimer.html` (draft — pending lawyer review before launch)
- [x] Terms of Use — `terms.html` (draft — pending lawyer review before launch)
- [x] Privacy Notice — `privacy.html`, PDPL-aware (draft — pending lawyer review + DPIA)
- [ ] Attributions / sources page (credit GACA as the authoritative source)
- [ ] Cookie / analytics notice if analytics are used

### Deploy

- [x] Configure `firebase.json` + `.firebaserc` (hosting, root rewrite, caching headers)
- [ ] Run the first deploy — `firebase deploy --only hosting` (see `office/runbook-deploy.md`)
- [ ] Connect the custom domain flygaca.com (DNS) — automatic SSL
- [ ] GitHub Actions: build + deploy to Firebase Hosting on push to `main`
- [ ] Launch smoke test on production

### Go-to-market (business track)

- [ ] Wire the waitlist capture (store emails in Firestore me-central2)
- [ ] Publish the first regulatory explainers from the Captain Adel LinkedIn
- [ ] Seed flight schools and pilot communities; start collecting the waitlist

**Exit criteria:** flygaca.com serves a fast public GACAR index with working search and
legal pages, deployed through CI, with a live waitlist.

---

## Phase 2 — Captain Adel answers

**Goal:** the AI study assistant — ingestion pipeline, vector store, a RAG Cloud Function,
a bilingual cited chat UI, an eval harness, and App Check + rate limits.
**Status:** Not started. **Gated by:** Blaze plan; Gemini/Vertex residency check; the
lawyer's AI-corpus view is helpful here · **Gates:** the paywall in Phase 5.

### Prerequisites

- [ ] Upgrade Firebase to the **Blaze plan** (requires a payment card) — Cloud Functions
  need it
- [ ] Confirm Gemini / Vertex AI inference data-residency is acceptable for the data flow
- [ ] Choose the vector store (e.g. Firestore vector search, or an index built on the VPS
  and served from a Cloud Function)

### Ingestion pipeline (Python 3.11, on the VPS — public data only)

- [ ] Build PDF ingestion: parse GACAR / AIP / circular documents → clean text
- [ ] Implement chunking (`assistant/rag.py`, `functions/rag/`)
- [ ] Generate embeddings
- [ ] Build and store the vector index
- [ ] Tag every chunk with its effective date / AIRAC cycle (AIP freshness)
- [ ] Confirm the pipeline touches public data only (PDPL boundary)

### RAG service & assistant

- [ ] Build the RAG Cloud Function in me-central2 (`functions/rag/`)
- [ ] Retrieval: query → embed → retrieve → rank → assemble context
- [ ] Integrate Gemini with the Captain Adel system prompt (`assistant/`)
- [ ] Write the conservative, cited system prompt — every answer cites sources, never
  implies official status, and adds the AIP "not for operational use" line where relevant
- [ ] Enforce the corpus policy — host-safe + original material only; cite-only for ICAO
  Annexes and POH/AFM, never reproduced
- [ ] Bilingual answering (English and Arabic)

### Chat UI

- [x] Build `chat.html` — chat interface with Captain Adel's avatar, wired to a
  configurable RAG endpoint; assistant scaffold + system prompt in `assistant/`,
  BM25 corpus built at `functions/rag/_chunks.json.gz`
- [ ] Streaming responses with inline citations
- [ ] Clear messaging for rate limits and refusals

### Security & abuse control

- [ ] Register **App Check**; enforce it on the RAG function
- [ ] Rate limits (per IP / per session, pre-accounts)
- [ ] Basic abuse and prompt-injection guards

### Evaluation

- [ ] Build the eval harness (`evals/`) with authored question sets
- [ ] Evals for answer accuracy, citation correctness, and correct refusals
- [ ] Run evals; iterate on the prompt and retrieval until the bar is met
- [ ] Wire a regression eval into CI

**Exit criteria:** Captain Adel answers aviation questions with correct citations and
disclaimers, behind App Check and rate limits, passing the eval bar.

---

## Phase 3 — Pilot accounts & tools

**Goal:** Firebase Authentication, a Firestore data model with strict rules, a digital
logbook with currency tracking, calculators, and PDPL data rights (export + deletion).
**Status:** In progress — the full accounts system is **built and code-verified**; it
must not be switched on for the public until the PDPL DPIA is signed off.
**Gated by (launch, not build):** the PDPL DPIA.

### Prerequisite — PDPL compliance (business/legal track)

- [ ] Complete the PDPL compliance program and the Data Protection Impact Assessment (DPIA)
- [ ] Identify the data controller; register / appoint as PDPL requires
- [ ] Update the Privacy Notice to cover accounts, the logbook, and chat history
- [ ] Confirm all personal data stays in the Kingdom (Firestore me-central2 / Cloud
  Functions); the VPS stays public-data-only

### Authentication

- [x] Sign-up / sign-in / password-reset UI — `account.html` + `assets/js/auth.js`,
  Firebase Auth (email/password) wrapped as a shared ES module
- [x] `settings.html` — profile, change-password (with re-authentication), and the
  account/identity panel
- [x] Email/Password provider enabled in the Firebase console; sign-up tested live
- [ ] Email verification

### Data model & security rules

- [x] Firestore data model designed and implemented — `users/{uid}` profile +
  `users/{uid}/logbook/{entry}`, documented in `assets/js/store.js`
- [x] Strict security rules — `firestore.rules`: per-user isolation, no cross-user
  reads, field validation on writes
- [x] Security rules deployed (`firebase deploy --only firestore:rules`) — live and
  verified: a test sign-up wrote a profile that passed the `isOwner` rule
- [ ] Add emulator-based automated rule tests

### Digital logbook

- [x] Logbook entry UI — `logbook.html` + `assets/js/logbook.js`: add / edit / delete
  flights, all fields (hours, landings, approaches, route, remarks), running totals
- [x] Currency tracking — `dashboard.js` computes day/night passenger recency, IFR
  recency, and medical / flight-review expiry from the logbook
- [x] Currency dashboard — `dashboard.html`: currency cards, logbook totals, recent flights

### Calculators

- [x] 21 aviation calculators and tools shipped in the Tools section (E6B, weight &
  balance, fuel, performance, conversions and more) — see Phase 11

### PDPL data-subject rights

- [x] Data export — `settings.html` downloads the full profile + logbook as JSON
- [x] Account deletion — full erasure of all Firestore data, then the Auth account
- [ ] Consent management and a record of consent — pairs with the DPIA work

**Exit criteria:** pilots can register, keep a logbook with currency tracking, and use the
calculators; PDPL data-subject rights work end to end; the DPIA is signed off and the
Email/Password provider is enabled.

---

## Phase 4 — Arabic, offline & polish

**Goal:** full Arabic RTL parity, an offline service worker, accessibility and Web Vitals,
a Playwright E2E suite, and an error beacon.
**Status:** In progress — the bilingual foundation (i18n engine, RTL, translated chrome
+ homepage) has shipped; per-page Arabic content is the remaining bulk.
**Gated by:** Phases 1–3 (the surfaces being polished).

### Arabic & RTL

- [x] Bilingual engine — `landing.js` carries an EN/AR engine on every page:
  persists the choice, sets `dir`/`lang`, translates the nav + footer chrome and
  the two shared legal blocks from a built-in dictionary, applies `data-en`/`data-ar`
  attributes, and keeps the brand wordmark LTR
- [x] RTL layout — the whole CSS design system is built on logical properties, so
  `dir="rtl"` mirrors every page automatically; verified across the site
- [x] Fully translated to Arabic — the entire main navigable surface: the homepage,
  About, all four section hubs (Library, Tools, Study, Guides), the Captain Adel
  chat page, the Safety section and Reading Paths, plus the 7 original guide pages.
  The engine handles plain text (`data-ar`), rich blocks with inline markup
  (`data-ar-html`) and form placeholders (`data-ar-ph`)
- [ ] Long-tail translation — the 21 individual tool/calculator pages, the study
  sub-pages, the account area, and the 4 newer guides
- [ ] Legal pages (disclaimer / terms / privacy) — translate **with** the lawyer
  review, not before; first-pass machine Arabic of legal text is inadvisable
- [ ] Arabic content QA with a native reviewer (aviation terminology accuracy) —
  the current Arabic copy is a first pass and is flagged for native review

### Offline

- [x] Offline service worker — `sw.js` precaches the app shell and runtime-caches
  visited content, with an offline navigation fallback
- [ ] Extend offline caching to library reader content
- [ ] Graceful offline UX (clear states, no broken flows)

### Quality

- [x] Accessibility baseline — semantic HTML, skip links, keyboard nav, an
  accessibility/mobile pass (Phase 1 close-out)
- [x] Client-side error beacon — shipped in `assets/js/analytics.js` (Phase 9)
- [ ] Full accessibility audit — WCAG, screen-reader, contrast across the palette
- [ ] Web Vitals — set a performance budget; optimise LCP / CLS / INP; trim assets
- [x] Playwright E2E suite (`tests/`) — `smoke.spec.js` loads all 43 public pages
  and fails on any JS error; `critical-flows.spec.js` exercises navigation, the
  bilingual engine, flashcards, the quiz and the chat UI. 50 tests, all passing.
  Run with `npm test` (see `tests/README.md`).
- [ ] Run E2E in CI on every push
- [ ] Cross-browser and cross-device QA

**Exit criteria:** full English/Arabic parity, works offline, passes the accessibility and
Web Vitals bar, with a green E2E suite.

---

## Phase 5 — Money & flight schools

**Goal:** turn Fly GACA into a revenue business — a free funnel, a paid Pro tier, a
one-time Services line, a B2B flight-school product, Saudi payments wired to ZATCA,
and the paywall to enforce it.
**Status:** Not started — **plan locked, prices decided** (below). **Gated by:** the
legal entity (P0-3) for live payments; the build of the pages and paywall is not gated.

### Guiding rule — never paywall the regulations

The GACAR library is public regulatory law: it stays free forever. It is the SEO
funnel, the trust-builder, and the safest legal posture. Fly GACA charges for the
*tools, teaching and AI* that act on the regulations — not for reading the rules.

### Free tier — the funnel (no account required)

- The whole Library — 74 GACAR Parts, 21 handbooks, 61 aerodromes, 13 charts, 190
  reference docs, full-text search, the in-app reader
- All 11 Guides, the Safety section, Reading Paths
- Captain Adel — **5 cited questions per month**, as a taste (this cap is both the
  conversion engine and the per-message cost cap; a monthly allowance is *lower* cost
  per free user than the old per-day cap, and a sharper paywall). Server window is
  `ADEL_FREE_PERIOD=month` (or `day`) with `ADEL_DAILY_FREE` as the count
- The three **funnel tools** (below) and the basic airport lookup — free by design

### Pro tier — the individual paid product

- All 21 Flight Tools / calculators (tool *pages* stay public and indexable for SEO;
  the gate is on *interactive use*). Free users get a small trial allowance
  (≈3 runs/day) so they hit value before the wall
- **Unlimited Captain Adel** (fair-use soft cap; the Phase 10 rate limiter guards abuse)
- **Saudi Airport Directory** — every OE** airport: runways, frequencies, elevation,
  lighting, fuel/customs/handling, AIP cross-reference, searchable; static data from
  the official AIP
- **Live weather** — METAR/TAF for Saudi airports, from NOAA's aviationweather.gov
  feed (free, legal); pairs with the airport directory
- The full Study system — 12 quiz banks, the timed mock exam, exam-readiness
  analytics, the 34-lesson Ground School, flashcards
- The digital logbook + currency tracking + cross-device sync
- Billed two ways: a **monthly / annual subscription**, and a one-time fixed-term
  **Exam Term** (120 days) for the pass-and-leave student

### Services — one-time Prep Packs (the new product line)

Fly GACA is independent of GACA, so it cannot sell a licence conversion or a test —
only GACA does that. What it sells is **preparation**: structured playbooks, document
checklists, process roadmaps and cited study/mock material that get a candidate ready.
Paid once.

- **License Conversion Prep Pack** — for foreign ATPL/CPL/PPL holders converting to a
  GACA licence: the conversion-path roadmap, the full document checklist, a GACA
  air-law conversion study pack built only from the GACAR, mock questions, and a
  "what to expect" process walkthrough. Includes 90 days of Pro + Captain Adel
  Conversion Mode
- **ELPT / SAELPT Prep Pack** — English Language Proficiency prep against the six ICAO
  descriptors: phraseology drills, practice scenarios, a mock-interview structure, a
  self-scoring rubric. Includes 30 days of Pro
- **AIP Prep Pack** — how to actually use the Saudi AIP for exams and checkrides:
  structure, how to find what an examiner asks, quizzes from real navigation
  questions. Includes 30 days of Pro
- **Conversion Bundle** — all three Prep Packs together
- **Captain Adel 1:1 Consult** — a live 180-minute deep-dive session; limited slots
  per week (it spends the founder's real time)
- **Conversion Pack Premium** — the License Conversion Prep Pack + one 1:1 consult +
  6 months of Pro

> **Fees not included.** Every pack price covers Fly GACA's prep material and guidance
> *only*. All official costs — GACA conversion/application fees, the air-law exam fee,
> the ELPT/SAELPT test fee, the medical — are paid by the candidate directly to GACA
> or the testing body. Stated in plain language on the pricing page and at the top of
> every pack. Pack content is built only from official GACAR / AIP / GACA-published
> material — no fabricated exam specifications.

### The funnel — how the tools guide interest

The free tools are lead magnets that diagnose a need and hand the user to the matching
paid offer:

- **Conversion Eligibility Checker** (free) → state / licence / hours / ratings → an
  instant read on the likely GACA conversion path and requirements → CTA to the
  License Conversion Prep Pack
- **ELP Readiness Self-Check** (free) → self-assessment against the ICAO descriptors →
  estimated band + weak areas → CTA to the ELPT Prep Pack
- **AIP Quiz** (free) → quick quiz answerable from the Saudi AIP → score + weak
  sections → CTA to the AIP Prep Pack
- **Basic airport lookup** (free) → upsells the full Airport Directory + weather in Pro

The other ~18 calculators sit behind Pro with a small free trial allowance, and each
paywall upsells contextually. Every Prep Pack bundles a stretch of Pro so the buyer
experiences the calculators and Captain Adel — services feed the subscription rather
than competing with it.

### Captain Adel — tiering & economics

- Free: 5 cited questions/month — the most magnetic feature on the site and the single
  best conversion point; a monthly cap controls per-message API cost while making the
  paywall bite sooner than a daily reset would
- Pro: unlimited (fair-use soft cap; the Phase 10 rate limiter guards abuse). At the
  Pro price a heavy user's token cost is a few riyals — healthy margin
- Inside the Prep Packs: **Captain Adel Conversion Mode** — a focused assistant primed
  on the conversion / ELP / AIP material, included with each pack

### Fly GACA for Schools — the B2B revenue engine

- Seat-based bulk licensing — a school buys N cadet seats, each cadet gets Pro
- A school **admin dashboard** — cohort exam-readiness, per-cadet progress, who is
  falling behind (a genuine instructor tool, not just billing)
- Annual contracts, ZATCA-compliant invoicing, per-seat price below individual Pro

### Price sheet (SAR) — decided

> The full derivation (market benchmarks, anchoring logic, the phased revenue plan)
> lives in **`office/monetization.md`** — that document is the source of truth;
> `pricing.html`, `schools.html` and `flygaca.html` must match it.

**Subscriptions**
- Pro Monthly — **59**
- Pro Annual — **349** (≈ 29/mo billed yearly, ~6 months free vs monthly), with a 7-day
  free trial
- Exam Term — **199** (120 days full access, one-time)

> **Pricing note.** Monthly sits at 59 and annual at 349 deliberately: the wide spread
> makes the annual the obvious buy (the decoy/anchor effect), pulls cash forward, and
> reduces churn. The annual headline is framed as **~SAR 29/month** on the marketing
> surfaces. Founding-member waitlist offer: annual locked at **299** for year 1
> (first 500 members).

**Services — one-time Prep Packs** *(Fly GACA prep only — official fees not included)*
- License Conversion Prep Pack — **899**, launch offer **699** (incl. 90 days Pro)
- ELPT / SAELPT Prep Pack — **349** (incl. 30 days Pro)
- AIP Prep Pack — **299** (incl. 30 days Pro)
- Conversion Bundle (all three) — **1,299** (saves 248)

**Premium — 1:1**
- Captain Adel 1:1 Consult — **899 / 180-min session**, with a **699 launch offer**
  (founding rate, limited slots)
- Conversion Pack Premium — **1,699** (pack + one 1:1 consult + 6 months Pro)

**Schools (B2B)** — minimum 10 seats; see `docs/b2b-pipeline.md` for the sales motion
- **299** / seat / year — **249** at 25+ seats, **199** at 75+ seats; admin dashboard
  included
- Founding-partner rate for the first 2–3 schools: **199** flat, year 1

### Build track — what can be built now (gateway deferred)

- [ ] Subscription / entitlement data model — `users/{uid}` carries a plan
  (`free` | `pro` | `school`), one-time pack entitlements, term and expiry; security
  rules enforce it
- [ ] Paywall + gating layer — gate interactive tool use (≈3/day trial), the full
  Study system, the logbook, the airport directory/weather and unlimited Captain Adel;
  the 5/month Captain Adel free counter; a clean contextual upgrade prompt at each limit
- [ ] The three funnel tools — Conversion Eligibility Checker, ELP Readiness
  Self-Check, AIP Quiz — each free, each with a CTA to its pack
- [ ] Saudi Airport Directory + live METAR/TAF weather
- [ ] The three Prep Packs — content + delivery
- [ ] `pricing.html` — public pricing page: Free vs Pro vs Services vs Schools
- [ ] `schools.html` — the B2B offering and a "request seats" enquiry path
- [ ] School admin dashboard — seat management + cohort analytics
- [ ] Subscription / purchase management UI — upgrade, cancel, billing history, pack
  purchases (checkout stubbed until the gateway is live)

### Business track — gated on the legal entity (P0-3)

- [ ] ZATCA VAT registration
- [ ] ZATCA Fatoora e-invoicing onboarding (integration + compliance)
- [ ] Choose a mada-capable payment gateway (Moyasar / HyperPay / PayTabs / Tap)
- [ ] Integrate the gateway via Cloud Functions; recurring subscription billing +
  one-time pack/consult payments
- [ ] Wire ZATCA Fatoora — issue compliant e-invoices
- [ ] Bulk billing and invoicing for schools

**Exit criteria:** individuals can subscribe, buy an Exam Pass, or buy a one-time Prep
Pack and pay; ZATCA-compliant invoices are issued; flight schools can buy and manage
cadet seats; the free library remains open to everyone.

---

## Phase 6 — Reach

**Goal:** a Capacitor native wrapper for the app stores, and a documented public API.
**Status:** Not started. **Gated by:** a stable, polished product (Phases 1–5).

### Native apps

- [ ] Wrap the PWA with Capacitor
- [ ] iOS build — Apple Developer account, App Store listing, submission and review
- [ ] Android build — Google Play listing, submission and review
- [ ] Store assets — screenshots, descriptions, privacy disclosures, compliance

### Public API

- [ ] Design the public API surface (read access to the library / regulations)
- [ ] API authentication (keys), rate limits, and quotas
- [ ] Write and publish the API documentation
- [ ] Developer onboarding

**Exit criteria:** native apps are live in the App Store and Google Play; a documented
public API is available.

---

## Phase 7 — The training platform

**Goal:** turn the Study section from a quiz into a genuine exam-prep system, tighten the
practical tools, and play to Fly GACA's two unfair advantages — it is the only platform
built on **GACAR**, and Captain Adel is an AI instructor grounded in the cited regulation
text. Drawn from a competitive scan of Gleim, Sporty's, King Schools, SkyVector and
ForeFlight.
**Status:** In progress — training depth shipped; per-exam profiles, stage checks and the
cross-device foundation remain. **Gated by:** nothing for the training items; the
cross-device items want Phase 3 accounts.

### Training & test-prep depth (priority)

- [x] Expand the question bank — 162 questions across 12 banks (VFR, airspace, AIP/AIS,
  radio/ELPT, air law, licensing, medical, aircraft/equipment, weather, aerodynamics,
  human factors, navigation), each tagged to its GACAR Part / ICAO subject
- [x] Add an explanation + GACAR citation to **every** question, deep-linked into the
  `document.html` reader — the feature no FAA-based competitor can match
- [ ] Realistic per-exam mock profiles — real question count, time limit, pass mark and
  subject weighting for each GACA written exam (one 25-question timed mock is live;
  per-path PPL/CPL/ATPL profiles still to build)
- [x] Weak-area analytics + an "exam readiness" score (`study-progress.js`); review mode
  re-runs missed questions (`quiz.html?review=1`)
- [x] Wire Captain Adel into the study flow — every quiz answer carries an "ask Captain
  Adel" hand-off, and Ground School lessons open straight into him
- [ ] Stage checks between Ground School modules + an end-of-course completion record
  (an unofficial personal study record, not a GACA endorsement)

### Practical tools

- [ ] Live METAR/TAF lookup for Saudi aerodromes (OE** ICAO) from a public aviation-weather
  feed — surfaced on the aerodrome pages, kept separate from Captain Adel
- [ ] Interactive pan/zoom/measure VFR chart viewer with the 61 aerodromes overlaid
- [ ] Route-planner depth — a leg-by-leg heading/distance/time/fuel table, plotted on a map

### Foundation

- [ ] User accounts + cloud sync (Phase 3) so progress, bookmarks, saved plans and quiz
  history follow the user across devices — the base every analytics feature above needs

**Immediate focus — the first three to build:** the deep-linked explanations, Captain Adel
in the study flow, and expanding the question bank.

**Exit criteria:** the Study section works as a per-exam prep system — a large tagged
question bank, every question explained and cited, realistic mock exams, and progress
analytics that tell a candidate when they are ready.

---

## Phase 8 — The library as a platform

**Goal:** turn the integrated library — 74 GACAR Parts, 21 handbooks, 61 aerodromes,
13 charts and 190 reference documents, all in Captain Adel's corpus — from a reference
shelf into the engine behind study content, safety teaching and connected learning.
**Status:** **Done** — all six features shipped. **Gated by:** nothing — the corpus and
reader were in place.

### Content generation

- [x] Auto-generated cited study content from the corpus — the question bank grew from
  60 to 162 questions across 12 banks, every item explained and cited; flashcard decks
  draw from the same bank (`study/flashcards.html`)

### New learning surfaces

- [x] "Learn from accidents" — `safety.html`, a safety section built on 54 NTSB accident
  lessons, each one openable into Captain Adel to ask how the GACAR guards against it
- [x] GACAR ↔ FAA side-by-side — the `faaComparePanel()` on GACAR Part readers pairs the
  Saudi rule with its FAA equivalent (valuable for foreign-licence conversion)
- [x] Curated reading paths — `paths.html`, 6 guided document tracks across 38 steps
  (private pilot, drone operations, the Class 1 medical and more)

### Connecting it up

- [x] Related-reading cross-links — `addRelated()` surfaces the closest handbook chapter,
  advisory circular, ICAO annex and FAA section on every reader page (TF-IDF similarity,
  `related-index.json`)
- [x] Whole-library full-text search — `renderLibSearch()` searches a 46,036-entry index
  (`library-search.json`) spanning the GACAR, the 21 handbooks and the 190 reference docs

**Outcome:** the library now produces study material and powers connected, cross-referenced
learning — the NTSB "Learn from accidents" section is the most distinctive piece, as no
competitor pairs Saudi regulation with real accident lessons.

**Exit criteria:** the library actively produces study material and powers connected,
cross-referenced learning — not just a place to read documents.

---

## Phase 9 — Launch & visibility

**Goal:** take Fly GACA from "built" to "launched" — the whole platform live on the
real domain, findable, measured and announced. The product is feature-complete; this
phase puts it in front of pilots.
**Status:** In progress — the findability track (SEO, structured data, sitemap,
analytics) is done; the deploy and the domain remain. **Gated by:** nothing technical;
the legal pages depend on the lawyer review.

### Deploy & domain

- [x] Deployed the full current stack — hosting + the Captain Adel Cloud Function —
  live at `flygaca-firebase.web.app`
- [ ] Connect the custom domain `flygaca.com` — DNS records, automatic SSL
- [ ] Confirm the GitHub repo is fully pushed; add a CI deploy on push to `main`

### Findability

- [x] SEO pass — every public page carries a unique title and description, Open Graph +
  Twitter cards (absolute image URLs) and a canonical link; the 7 unfinished stub pages
  are `noindex`; sitewide Organization + WebSite JSON-LD on the homepage and
  Article + Breadcrumb + FAQ JSON-LD across all 11 guides
- [x] `sitemap.xml` rebuilt to all 47 current public pages; `robots.txt` confirmed current
  — **still to do:** submit the sitemap to Google Search Console / Bing after deploy
- [x] Privacy-respecting analytics + a client-side error beacon — `assets/js/analytics.js`
  on every page: cookieless Cloudflare Web Analytics (dormant until a token is set, no
  consent banner needed) and an error beacon that logs uncaught errors to a localStorage
  ring buffer with an optional POST endpoint. Privacy Notice updated to disclose it.
  — **still to do:** create the Cloudflare Web Analytics site and paste the token

### Go to market

- [ ] Finalise the legal pages once the Saudi lawyer review lands
- [ ] Soft launch — flight schools, pilot communities, the Captain Adel LinkedIn
- [ ] Convert the waitlist into first users

**Exit criteria:** `flygaca.com` is live, indexed, measured, and reaching real pilots.

---

## Phase 10 — Captain Adel, production-grade

**Goal:** harden the chat AI for real, untrusted traffic — abuse protection, cost
control and a measured quality bar. These were Phase 2's exit criteria, deferred to
ship the MVP; this phase closes them.
**Status:** In progress — the code-side hardening (rate limits, input guards, eval
harness) has shipped; the console-side items (App Check, CI gate, budget alerts)
remain. **Gated by:** real traffic starting (Phase 9).

- [ ] Register **App Check**; enforce it on the `chat` Cloud Function — needs the
  Firebase console (register a reCAPTCHA provider, then verify the token in
  `index.js` and attach it in the browser). Steps documented in
  `office/runbook-captain-adel.md`.
- [x] Rate limits — per IP and per session — `functions/rag/ratelimit.js`, a
  sliding-window limiter (per-IP, a 30 s burst window, and per browser session);
  a blocked turn returns HTTP 429 and `chat.js` shows a friendly message. Limits
  are tunable via `ADEL_RL_*` env vars.
- [x] Prompt-injection and abuse guards — `functions/rag/guards.js`:
  control-character stripping, message/history length caps, and a soft
  injection detector that hardens a flagged turn (appends a security note to the
  system instruction) rather than producing false-positive blocks.
- [x] Build the eval harness (`evals/`) — `cases.json` (17 cases across citation,
  refusal, injection and behaviour) + `run.js`, a scoring runner that exits
  non-zero on any failure. Runs live against the agent with a `GEMINI_API_KEY`.
- [ ] Wire a regression eval into CI — `node evals/run.js` as a GitHub Actions
  gate on any change to `functions/rag/` or the system prompt.
- [ ] Budget alerts on Firebase and the Gemini API; watch the 2 GiB cold-start
  cost — needs the console (steps documented in the runbook).

**Exit criteria:** Captain Adel is protected against abuse and runaway cost, and passes
a documented accuracy / citation / refusal bar.

---

## Phase 11 — Depth across the practical sections

**Goal:** make the three working sections a pilot uses every day — Tools, Guides and
Study — wider and more usable, so each is a genuine destination rather than a thin
shelf. A breadth pass, run across all three at once.
**Status:** **Done** — the expansion below shipped together. **Gated by:** nothing.

### Tools — 17 → 21 calculators

- [x] Top of Descent — descent point, rate and angle from cruise to a target altitude
- [x] Fuel Planner — trip, reserve, alternate and taxi fuel with a total endurance figure
- [x] Time–Speed–Distance — solve any of the three from the other two, with leg support
- [x] Cloud Base — convergence of temperature and dew point into an estimated cloud base
- [x] All four follow the self-contained `tools/density-altitude.html` pattern
  (calc-layout / calc-panel / calc-field / calc-out, inline script) and are wired into the
  Tools hub, the nav and the service-worker precache

### Guides — 7 → 11 how-to guides

- [x] Reading a METAR & TAF — decoding the standard aviation weather reports field by field
- [x] Decoding NOTAMs — the contraction set and how to read a raw NOTAM
- [x] The AIRAC Cycle — why aeronautical data changes every 28 days and how to stay current
- [x] Airspace Explained — ICAO Classes A–G in plain language, mapped to the Saudi system
- [x] All four match the Guides section styling and are registered in the hub, nav and SW

### Study — exam prep, deeper

- [x] Question bank grown 60 → 162 across 12 topic banks, every item explained and cited
- [x] Flashcard review mode — `study/flashcards.html` + `assets/js/flashcards.js`: pick a
  deck (per-bank or a 40-card mixed deck), flip each card, mark "Got it" or "Review again",
  and the misses loop back for a second pass; linked from the Study hub
- [x] Exam-readiness panel and missed-question review mode (carried from Phase 7)

**Outcome:** Tools and Guides are broad enough to cover a real cross-country workflow, and
Study now offers three ways through the same bank — quizzes, a timed mock exam and
flashcards.

**Exit criteria (met):** each of the three sections is wider and more usable; everything
is wired into navigation and cached for offline use.

---

## Cross-cutting — ongoing from Phase 1 onward

These are not one-off tasks; they run continuously once the relevant phase ships.

- [ ] **AIP / AIRAC freshness** — the AIP changes every 28-day AIRAC cycle. From Phase 1/2,
  a routine to refresh AIP-sourced content and effective dates.
- [ ] **Regulatory content freshness** — track GACAR amendments and re-ingest.
- [ ] **Security & dependencies** — keep Dependabot current; rotate keys; review rules.
- [ ] **Eval regression** — re-run the Captain Adel eval harness on prompt/model changes.
- [ ] **Go-to-market** — continuous LinkedIn explainers, community seeding, waitlist → user
  conversion, and flight-school outreach.
- [ ] **Backups & monitoring** — Firestore backups, uptime and error monitoring.

---

## Phase 12 — The ecosystem (LTV & retention)

**Goal:** grow Fly GACA from a tools-and-answers product into the integrated ecosystem a
Saudi pilot stays subscribed to for years — by deepening the AI, adding exclusive Pro
features, and extending the B2B/instructor side. **Status:** Not started — sequenced below.
**Guiding principle (founder's call):** do **not** build it all before launch. Ship the core
paywalled product, then surface the rest as **"Coming soon to Pro"** to drive retention — a
live, evolving platform is a reason not to cancel.

### Already shipped — reuse, don't rebuild
Much of the "ecosystem" already exists and only needs to be marketed as such:
- **Smart digital logbook + GACAR currency/recency alerts** — `logbook.html`, `logbook.js`,
  `currency.js` (Part 61), `dashboard.html` (Pro-gated)
- **VFR/IFR planning + NavLog inputs** — the route-planner, flight-plan, W&B, fuel and TSD
  tools under `tools/`
- **Checkride mock exams / question banks** — `study/checkride.html`, `study/quiz.html`,
  `study/groundschool.html` and the tagged banks in `assets/data/`
- **School admin dashboard (concept) + bulk licensing** — `schools.html`, `functions/school.js`

### New builds — ranked by ROI (biggest pain point first)
1. **AI Oral-Exam / Checkride Examiner** *(flagship — build first)* — a conversational AI
   that role-plays a GACA examiner: asks licence-specific (PPL/CPL/IR) questions grounded in
   the corpus, grades the answer and cites the exact Part/section. Highest willingness-to-pay
   moment, and the **lowest-cost** new AI feature because it reuses Captain Adel's RAG brain
   (`src/brain/` in [`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel)) — a new `mode: 'examiner'` persona behind the `/v1/chat` contract,
   **eval-gated**; new gated page `study/oral-exam.html` reusing `chat.js`. Pairs with the
   Exam Term SKU. *No "guaranteed to pass" claims; always cite + verify against official source.*
2. **GACAR / AIP Change Digest** — scheduled monitor + AI summary of regulation/AIP changes
   into plain-language bullets, on the dashboard and as an opt-in digest, every item linked to
   the official source. Heaviest ops (monitoring + email).
3. **Instructor Dashboard** — assign custom mock exams, per-cadet weak-area analytics, review
   cadet W&B. Needs a new instructor↔cohort↔cadet Firestore model + `firestore.rules` coverage
   + `tests/rules.test.js`; extends `school.js`.
4. **Enterprise / white-label portal** — academy-branded curriculum + content management.
   Largest; future.

### This pass (shipped now)
- [x] **"Coming soon to Pro" retention shelf** — bilingual section on `pricing.html` listing the
  Oral-Exam Examiner, Change Digest and Instructor Dashboard (compliance-safe, no pass guarantees)
- [x] This roadmap section

**Exit criteria:** the Oral-Exam Examiner ships eval-gated as the flagship Pro feature; the
remaining items are sequenced with their data-model / ops prerequisites; the GACAR library and
guides stay free throughout.

---

## Decision & risk checkpoints

- **Lawyer opinion** — until it lands, do not rehost the corpus or finalise the name. Phase
  1 ships as a deep-link index regardless.
- **Name** — a rebrand verdict touches the repo, domains, brand assets and the entity name;
  cheaper to absorb before Phase 1's public launch than after.
- **PDPL** — the DPIA is a hard gate for Phase 3; budget time for it.
- **Costs that need a card** — the Blaze plan (Phase 2), the payment gateway and VAT
  (Phase 5), and the Apple/Google developer accounts (Phase 6).
- **Solo-founder load** — Phases 2 and 3 are the largest; Arabic QA (Phase 4) and the
  ZATCA/payments integration (Phase 5) are the most likely points to bring in help.

---

*Living document — keep it in step with `phase0.md` and the repo. Not legal advice.*
