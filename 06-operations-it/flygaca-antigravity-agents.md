---
title: AGENTS.md — Fly GACA
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# AGENTS.md — Fly GACA

> **How to use this file.** Place it at the root of the `flygaca` repository. Google
> Antigravity (and other agentic tools) read `AGENTS.md` automatically as standing
> context for every agent run. It is the single source of truth for what Fly GACA is,
> what the constraints are, and the order in which it gets built.
>
> Companion files: `flygaca-claude-briefing.md` (same plan, XML-tagged for Claude) and
> `fly-gaca-master-plan.docx` (the human-readable master plan).

---

## 1. Project context

Fly GACA is an **educational digital aviation platform and open regulatory library** for
Saudi Arabian civil aviation. Tagline: *"The whole of Saudi aviation, in one cockpit."*
It serves pilots, operators, instructors, and cadets in the Kingdom of Saudi Arabia.

| | |
|---|---|
| Primary domain | flygaca.com (live on server 72.62.20.20) |
| Repository | github.com/ay2m/flygaca |
| Owner | Captain Adel Al-Subaie — Chief Instructor, ATPL, CFII |
| LinkedIn | sa.linkedin.com/in/captadel |
| Build mode | Solo founder · no fixed deadline · phased delivery |

**Problem it solves.** Saudi pilots juggle scattered PDFs, paper logbooks, calculators,
and many reference sites to study and stay current. The GACAR (General Authority of Civil
Aviation Regulations) is rich, evolving, and spread across dozens of parts. Fly GACA fixes
fragmented access, slow lookups, and the absence of GACAR-aware pilot tooling.

## 2. Current status — from scratch

**Build from zero. Treat nothing as already built.** The brand identity (Mark v2,
"Falcon over Kingdom") and several business-document drafts exist; the software does not.
Do not assume any feature, file, or deployment exists unless verified. Any earlier mention
of a shipped "v1.0.0" is aspirational — Section 9 below is the real path.

## 3. Strategy

A single funnel: the **free GACAR library** is the wedge (lowest risk, highest trust,
useful alone) → **Captain Adel**, the cited-source AI assistant, is the **paid premium
layer** → **flight schools and operators** buying cadet seats are the revenue engine.

Captain Adel is built **once** as a single assistant service — served inside flygaca.com
behind the paywall, and reachable via captadel.com as a marketing front door. One brain,
two front doors, **never two codebases**. The sub-brand-vs-standalone question is
deferred; the build does not depend on it.

**Scope discipline:** the first public launch is the library and search **only**.
Everything else is post-launch, sequenced in Section 9.

## 4. Legal & compliance constraints — non-negotiable

These override all other considerations.

- Fly GACA is an **EDUCATIONAL** tool and is **NOT affiliated** with the General Authority
  of Civil Aviation. The official, authoritative source for any regulation is always GACA
  (gaca.gov.sa).
- No answer, feature, or copy may imply official status. Every surface must tell users to
  verify against the latest official GACA publication.
- The project handles personal data and must comply with **Saudi PDPL**. Respect data
  sovereignty in every hosting and storage decision.
- The three open risks in Section 6 must be respected — do not build as if they are
  settled.

## 5. Knowledge-base corpus policy

What Captain Adel may learn from is a legal **and** safety decision. Three tiers, fixed:

- **HOST — safe core:** GACAR parts, Saudi AIPs, GACA advisory circulars / guidance. All
  GACA-published. Pending the redistribution check in Section 6.
- **HOST — original:** Fly GACA's own training and exam material, authored from the
  Captain Adel Curriculum Map. Scraped third-party question banks are **not** permitted.
- **DO NOT HOST — cite & refer only:** ICAO Annexes / SARPs (ICAO copyright; substance
  already reflected in GACAR) and aircraft manuals / POH / AFM (manufacturer copyright;
  aircraft-specific data is a safety hazard if quoted generically). Captain Adel cites
  these and links to the official source; it never reproduces them and never substitutes
  for a POH/AFM.
- **AIP freshness:** AIPs change every 28-day AIRAC cycle. Every AIP-sourced answer must
  carry an effective date and the line *"not for operational use — verify the current AIP
  and NOTAMs."*

## 6. Open risks — resolve before heavy building (Phase 0 gate)

1. **Redistribution rights** for GACAR, AIPs, and advisory circulars — the launch-blocker.
   Confirm the Saudi position or obtain GACA's permission. Interim: source, version, and
   link to GACA's copy; launch as a deep-linking index if not yet cleared.
2. **The "GACA" name** leans on the government authority's identity — trademark and
   passing-off exposure. Needs a trademark check and an unmissable disclaimer everywhere.
3. **Domain canonicalization** — flygaca.com is owned; the brand sheet shows flygaca.sa.
   Assume flygaca.com unless changed.

Not legal advice — a Saudi IP lawyer should confirm items 1 and 2.

## 7. Hosting & infrastructure

**Managed-first.** Run the platform on Firebase; repurpose the VPS — it is **not** the
production front door.

- **Firebase Hosting** for the static PWA; **Firebase Auth, App Check, security rules**;
  **Cloud Firestore in me-central2 (Dammam)** for data sovereignty.
- **VPS (72.62.20.20):** hosts the Python document-ingestion / RAG-indexing pipeline, the
  eval harness, and staging builds. A compute box, not the live site.
- **To verify:** the VPS region, and the data-residency of AI inference (Gemini / Vertex).

## 8. Tech stack

| Layer | Choice |
|---|---|
| Frontend | Vanilla JavaScript (ES2022), HTML5, CSS3, PWA — **no framework** |
| Backend | Firebase Cloud Functions (Node.js 20) |
| Database | Cloud Firestore (me-central2 region) |
| Auth & security | Firebase Authentication, App Check, strict security rules |
| AI assistant | Captain Adel — Gemini, custom system prompt + RAG pipeline |
| Document pipeline | Python 3.11 for chunking & indexing; Node.js builders |
| Hosting & CI/CD | Firebase Hosting + GitHub Actions |
| Observability | Web Vitals + custom error beacon |
| Testing | Playwright E2E; custom eval harness for the assistant |

Do not introduce a frontend framework or swap a core technology without explicit approval.

## 9. Build plan — phases 0 to 6

Phases are **sequential by dependency, not by date**. Each ends with something usable. Do
not start a phase whose predecessor's "Done when" is unmet.

### Phase 0 — Foundations
Resolve redistribution rights; pick the canonical domain and lock the legal/brand name;
register the legal entity (Saudi Business Center; consider Monshaat SME and NTDP); create
the repo with the Section 10 structure; create the Firebase project in me-central2; set up
the VPS as the pipeline box.
**Done when:** the copyright question has an answer, the entity is registered, the empty
repo and Firebase project exist.

### Phase 1 — The library goes live
Static PWA shell on the Falcon brand; curate and text-extract the GACAR corpus; library
index + document reader; client-side search over a prebuilt index; brand assets (favicon,
app icon, OG card, lockups); legal pages (educational disclaimer, not-affiliated notice,
terms, attributions); deploy to Firebase Hosting; point flygaca.com DNS.
**Done when:** a visitor can search "night currency," open Part 91, read it on mobile, and
every page makes the unofficial/educational status obvious.

### Phase 2 — Captain Adel answers
Ingestion pipeline on the VPS (Python 3.11, chunk + embed); a vector store; the RAG Cloud
Function (retrieve → prompt → Gemini → answer + citations); bilingual chat UI at chat.html
with captadel.com as a front door; Captain Adel's system prompt (conservative, always
cites, defers to GACA, refuses POH substitution); the eval harness with question sets;
App Check + per-user rate limits.
**Done when:** the eval set passes its quality bar, every answer carries citations, no
answer asserts official status. Launch free/beta — paywall arrives in Phase 5.

### Phase 3 — Pilot accounts & tools
**Gated:** the PDPL compliance program and DPIA must be signed off first. Firebase Auth;
Firestore data model + strict per-user security rules; App Check enforced; digital logbook
with GACAR currency tracking (VFR/IFR/night/landings); core calculators (weight & balance
first); profile and settings; data export and full account deletion (PDPL rights).
**Done when:** a pilot can register, log a flight, see currency, export a report, and
fully delete their account and data.

### Phase 4 — Arabic, offline & polish
Full Arabic RTL parity; offline-aware service worker (library readable offline);
accessibility and Web Vitals; Playwright E2E coverage; the error beacon and observability.
**Done when:** the UI works in Arabic RTL, the library works offline, performance is green.

### Phase 5 — Money & flight schools
Pricing model + pricing.html; free-vs-paid split with Captain Adel behind the paywall; a
Saudi payment gateway (e.g. Moyasar or Tap) wired to ZATCA Fatoora e-invoicing;
subscription billing and VAT; flight-school / operator accounts (schools.html, admin view)
with cadet seat management.
**Done when:** a pilot can subscribe and receive a compliant e-invoice; a school can buy
and manage cadet seats.

### Phase 6 — Reach
Capacitor native wrapper for the iOS and Android stores; a documented public API.
**Done when:** the app is published in both stores and the API has versioned endpoints.

## 10. Repository structure

```
flygaca/
  assets/        Static assets (CSS, JS, character art, icons)
  assistant/     Captain Adel — system prompt, KB scope, Gemini integration, rag.py
  build_finance/ Internal docx/xlsx builders
  evals/         Assistant evaluation harness and question sets
  functions/     Firebase Cloud Functions + RAG service (functions/rag/)
  library/PDFs/  GACAR source documents (curated corpus)
  legal/         Notices, terms, attributions, disclaimers
  office/        Operational tools and documents
  tests/         Playwright E2E tests
  .github/       Workflows, issue templates, Dependabot
  *.html         flygaca, dashboard, library, lessons, exam, chat, pricing,
                 schools, about, admin, settings
```

## 11. Business & company track

Runs alongside the build; largely finalizes drafts already in the project knowledge base.

- **With Phase 0:** register the entity (Saudi Business Center; Monshaat SME; pursue
  NTDP); open a business bank account.
- **With Phase 1:** finalize terms, EULA, disclaimers, and privacy notice.
- **Before Phase 3:** sign off the PDPL compliance program and DPIA — the personal-data
  gate.
- **With Phase 5:** ZATCA — VAT registration and Fatoora e-invoicing.
- **Go-to-market:** publish regulatory explainers from Captain Adel's LinkedIn; seed with
  flight schools and pilot communities; capture a waitlist from launch.

## 12. Brand system

From the Fly GACA Brand Identity Sheet (Mark v2, Falcon-over-Kingdom).

| Token | Hex | Role |
|---|---|---|
| Falcon Night | `#0A0E12` | Primary canvas — dark-first UI |
| Falcon Teal | `#2D6E8A` | Primary — buttons, links, focus |
| Falcon Sage | `#8FC9A8` | Secondary accent, success |
| Falcon Gold | `#C8A04A` | Heritage accent — eyebrows/version stamps only, sparingly |
| Teal Bright | `#4A9CB8` | Hover, links on dark, focus rings |
| Ivory | `#F5F2ED` | Reading surface — documents & library |
| Falcon Deep | `#0F1A24` | Elevated cards |
| Falcon Mist | `#1A2A38` | Dividers, subtle borders |

- **Typography:** Inter Tight throughout. Wordmark sets "Fly" solid, "GACA" teal→sage gradient.
- **The mark:** two falcon wings inside the Saudi silhouette, letter F in negative space.
  Never stretch, skew, rotate, recolour, or outline. Min 4.5:1 contrast, min size 16 px,
  preferred surface Falcon Night.
- The UI is dark-first; documents use the Ivory reading surface.

## 13. Agent operating rules

- Work **one phase at a time**, in order. Do not pull work forward across a "Done when".
- When a request is ambiguous, **ask before assuming** — especially on anything touching
  regulations, legal constraints, or the corpus policy.
- Keep all aviation and regulatory content **accurate and conservative**. Treat GACA as
  the sole authority; every regulatory surface reminds users to verify official sources.
- Honour Sections 4, 5, and 6 in every change. They are not optional.
- Match existing repo conventions; do not introduce a framework or swap core tech without
  approval.
- Write tests with the code (Playwright for UI flows, the eval harness for the assistant)
  and **run them** before reporting a task complete.
- Make small, reviewable commits with clear messages. Flag any security or
  data-sovereignty implication explicitly.
- Build for English and Arabic (RTL) from the start where the surface is user-facing.

## 14. Definition of done

A task is done only when: the code builds and runs; tests for the change pass; the
relevant phase's "Done when" criteria are still satisfied; legal/corpus constraints are
upheld; and any security or data-residency impact has been called out. Partial work,
failing tests, or unverified output is **not** done.
