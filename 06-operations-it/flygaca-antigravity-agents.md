---
title: AGENTS.md — Fly GACA
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-26
lang: en
---

# AGENTS.md — Fly GACA

> **How to use this file.** It is the standing-context version of the project brief for agentic
> tools that read an `AGENTS.md` (Google Antigravity and friends). Companion files:
> `flygaca-claude-briefing.md` (same content, XML-tagged for Claude) and
> `fly-gaca-master-plan.docx` (the human-readable master plan). Edit this file and the Claude
> briefing **as a pair** — they are one text in two formats.
>
> **This file names no agents.** It is context *about the company* for whatever agent reads it.
> The roster — which subagents exist, what each owns, and why there are four and not twelve —
> is `agent-workforce-plan.md`.

> [!IMPORTANT]
> **The repository's own `CLAUDE.md` is authoritative.** `ay2m/FlyGACA` carries a detailed,
> code-adjacent guidance file, and so does `ay2m/FlyGACA-ios`. If an agent can read the repo, that
> file wins over this one on anything technical. Use this page only where no repo context is
> available — and do **not** drop a copy of it into a repo root as the old version instructed;
> that is how the two drifted apart in the first place. Corrected 2026-08-19: the previous version
> briefed agents to build a from-scratch vanilla-JS Firebase app, which is wrong on every count.

---

## 1. Project context

Fly GACA is an **educational digital aviation platform and open regulatory library** for
Saudi Arabian civil aviation. Tagline: *"The whole of Saudi aviation, in one cockpit."*
It serves pilots, operators, instructors, and cadets in the Kingdom of Saudi Arabia.

| | |
|---|---|
| Primary domain | flygaca.com (API origin: api.flygaca.com) |
| Product repo | github.com/ay2m/FlyGACA — web app + Express backend + regulatory corpus |
| Other repos | ay2m/Captain-Adel (captadel.com service) · ay2m/FlyGACA-ios (native SwiftUI family) · ay2m/Office (this documents tree) · ay2m/FlyGACA-app (**archived** predecessor — never cite as current) |
| Owner | Captain Adel Al-Subaie — Chief Instructor, ATPL, CFII |
| Build mode | Solo founder · no fixed deadline · phased delivery |

**Problem it solves.** Saudi pilots juggle scattered PDFs, paper logbooks, calculators,
and many reference sites to study and stay current. The GACAR (General Authority of Civil
Aviation Regulations) is rich, evolving, and spread across dozens of parts. Fly GACA fixes
fragmented access, slow lookups, and the absence of GACAR-aware pilot tooling.

## 2. Current status — built, not greenfield

**Do not build from zero.** The product is live-capable: the regulatory library (documents,
charts, aerodrome map, corpus change feed), Captain Adel chat, 55 flight tools, the airspace HUD,
the learn/guides hub, the study suite (quiz, flashcards, ground school, mock exam, paths,
exam-prep packs), authenticated account surfaces (dashboard, logbook, currency, records,
settings), pricing/schools/checkout, the licensed-API page, and the B2B org-admin dashboard all
exist. A separate native SwiftUI family ships two App Store apps (ELPT, AIP).

When you do not know whether something is built, **ask** — do not assume in either direction.

## 3. Strategy

A single funnel: the **free GACAR library** is the wedge (lowest risk, highest trust, useful
alone) → **Captain Adel**, the cited-source AI assistant, is the **paid premium layer** →
**flight schools and operators** buying cadet seats are the revenue engine, with a metered
**licensed API** as a third line.

Captain Adel is one brain behind two front doors — inside flygaca.com, and via captadel.com.
**Never two codebases.**

## 4. Legal & compliance constraints — non-negotiable

These override all other considerations.

- Fly GACA is an **EDUCATIONAL** tool and is **NOT affiliated** with the General Authority of
  Civil Aviation. The official, authoritative source for any regulation is always GACA
  (gaca.gov.sa).
- No answer, feature, or copy may imply official status. The disclaimer is a shared component —
  never inline it, never reword it.
- The project handles personal data and must comply with **Saudi PDPL**. Personal data and the
  compute that touches it stay in the Kingdom.
- **Bilingual EN/AR with RTL is first-class.** New copy needs a key in *both* language bundles;
  the test suite fails on a key present in one and missing from the other.
- The open risks in Section 6 must be respected — do not build as if they are settled.

## 5. Knowledge-base corpus policy

What Captain Adel may learn from is a legal **and** safety decision. Three tiers, fixed:

- **HOST — safe core:** GACAR parts, Saudi AIPs, GACA advisory circulars / guidance. All
  GACA-published.
- **HOST — original:** Fly GACA's own training and exam material. Scraped third-party question
  banks are **not** permitted.
- **DO NOT HOST — cite & refer only:** ICAO Annexes / SARPs (ICAO copyright; substance already
  reflected in GACAR) and aircraft manuals / POH / AFM (manufacturer copyright; aircraft-specific
  data is a safety hazard if quoted generically). Captain Adel cites these and links to the
  official source; it never reproduces them and never substitutes for a POH/AFM.
- **AIP freshness:** AIPs change every 28-day AIRAC cycle. Every AIP-sourced answer must carry an
  effective date and the line *"not for operational use — verify the current AIP and NOTAMs."*

## 6. Open risks

1. **Redistribution rights** for GACAR, AIPs, and advisory circulars. Confirm the Saudi position
   or obtain GACA's permission. Interim: source, version, and link to GACA's copy.
2. **The "GACA" name** leans on the government authority's identity — trademark and passing-off
   exposure. Needs a trademark check and an unmissable disclaimer everywhere.
3. **flygaca.sa** is unblocked but unregistered; the "gaca" substring may trigger SaudiNIC name
   review. flygaca.com is canonical either way.

Not legal advice — a Saudi IP lawyer should confirm items 1 and 2.

## 7. Hosting & infrastructure

**Google Cloud is the canonical origin. There is no Firebase anywhere in this product** — no
Hosting, no Auth, no Functions, no Firestore, no App Check, no Blaze/Spark plan. Payments are
**Moyasar**, never Stripe.

| Concern | What runs it |
|---|---|
| SPA (`dist/`) | Cloud Storage bucket behind an HTTPS load balancer |
| API (`server/`) | One Express 5 service on **Cloud Run**, region **`me-central2`** (Dammam) |
| Datastore | **Cloud SQL for PostgreSQL**, same region, over a Cloud SQL unix socket |
| Secrets | **Google Secret Manager**, mounted into the Cloud Run revision |
| Renewals | **Cloud Scheduler** → `POST /api/billing/renew` with a shared cron secret |
| Mirrors | A Cloudflare Worker + Netlify / Vercel, each proxying `/api/*` back to the same Cloud Run origin |
| EU VPS (Paris) | Corpus ingest / RAG chunk build / evals / staging — **public data only**, never the front door |

**PDPL boundary:** accounts, profiles, the logbook and real user queries stay in `me-central2`
(Dammam). **`me-central1` is Doha, Qatar** — not in-Kingdom, never PDPL-safe. Keep every new API
surface under `/api/*` so the mirrors' same-origin proxy and the strict CSP keep working.

## 8. Tech stack

| Layer | Choice |
|---|---|
| Frontend | **React 19 + TypeScript (strict) + Vite**; CSS Modules with design tokens and logical properties; i18next EN/AR; PWA via vite-plugin-pwa |
| Backend | **Express 5** (TypeScript) on Cloud Run — pure `*-core` policy modules, thin route wrappers, all SQL in one store module |
| Database | **PostgreSQL** (Cloud SQL); forward-only SQL migrations |
| Auth | Email + password (scrypt) and Google via server-side OAuth; HS256 JWT in an HttpOnly cookie |
| Entitlements | **Server-owned.** No route lets a client write its own plan, credits or pack ownership |
| Payments | **Moyasar** — hosted widget + server-to-server confirm, webhook as defence in depth; ZATCA e-invoicing |
| AI assistant | Captain Adel — **Gemini via Genkit**, RAG over the GACAR corpus, grounding computed server-side |
| Calculators | Pure, DOM-free modules, unit-tested, outside the UI layer |
| Native | Capacitor shell for the web app; separate native SwiftUI family in `ay2m/FlyGACA-ios` |
| Testing | **Vitest** (coverage ratchet) + **Playwright** E2E and accessibility |

Do not introduce Firebase, Stripe, or a framework swap. New dependencies need a reason — check
what the repo already has.

## 9. Work in flight

The original phases 0–6 (foundations → library → Captain Adel → accounts → Arabic/offline → money
→ reach) are **done or superseded**. Current work is incremental and tracked in the product repo's
`ROADMAP.md`, which is the authority. Ask which item is in play rather than inferring a phase.

## 10. Repository structure (`ay2m/FlyGACA`)

```
src/                React app
  pages/            one folder per page
  router.tsx        the single route table
  calc/             pure, DOM-free logic (unit-tested)
  lib/              typed frontend services
  i18n/             en.json + ar.json — always edited together
  components/  hooks/  styles/   (tokens.css is the design-token source of truth)
server/             the Express service — its own npm package with its own CI gate
server/migrations/  the SQL schema
public/data/        the regulatory JSON corpus + indexes — fetched at runtime, never bundled
content/            authored markdown (guides, regulations)
scripts/            Node ESM content and build pipelines
docs/               engineering docs (RUNBOOK-deploy, BILLING, LICENSED-API, …)
e2e/                Playwright specs
```

## 11. Business & company track

- Entity registered; **ZATCA** VAT registration and Fatoora e-invoicing on the finance track.
- The **PDPL** compliance program and DPIA cover the personal data the account surfaces hold.
- **Pricing (SAR, VAT-inclusive):** Pro **79/month · 649/year**; Exam Season Pass **299** for 90
  days; exam-prep packs banded **249 / 399 / 499**; pack bundle **1,499**; chat credits **39**;
  B2B Cohort **12,000/year**, Academy **39,000**, Institution **from 72,000**; licensed API
  **499 / 1,999 / 6,999** per month. **No Student tier.** Free tier: the full library, all **55**
  tools, and **5 Captain Adel questions per day**.
- **Go-to-market:** regulatory explainers from the founder's LinkedIn; seed with flight schools
  and pilot communities; free library → paid assistant and tools → flight-school B2B seats.

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

- **The mark:** two falcon wings inside the Saudi silhouette, letter F in negative space. Never
  stretch, skew, rotate, recolour, or outline. Min 4.5:1 contrast, min size 16 px, preferred
  surface Falcon Night.
- The UI is dark-first; documents use the Ivory reading surface. **Colours come from tokens** —
  never hard-code one, and never use physical `left`/`right` where a logical property exists.

## 13. Agent operating rules

- **Read the repo's own `CLAUDE.md` first.** It governs.
- When a request is ambiguous, **ask before assuming** — especially on anything touching
  regulations, legal constraints, or the corpus policy.
- Keep all aviation and regulatory content **accurate and conservative**. GACA is the sole
  authority; every regulatory surface reminds users to verify official sources.
- Honour Sections 4, 5, and 6 in every change. They are not optional.
- Match existing repo conventions. TypeScript strict — no `any`, no `@ts-ignore`, no non-null `!`
  to silence the compiler.
- Write tests with the code and **run them**. Run the repo's full verification gate before
  claiming a task is done; the server package has its own separate gate.
- Make small, reviewable commits. Flag any security or data-sovereignty implication explicitly.
- Build for English and Arabic (RTL) from the start on any user-facing surface.

## 14. Definition of done

A task is done only when: the code builds and runs; tests for the change pass; the verification
gate is green; both language bundles moved together; legal/corpus constraints are upheld; and any
security or data-residency impact has been called out. Partial work, failing tests, or unverified
output is **not** done.
