---
title: Fly GACA — Resume Briefing (current as of 23 May 2026)
section: 06-operations-it
doc_type: brief
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Resume Briefing (current as of 23 May 2026)

> [!NOTE]
> **Superseded 2026-08-19 — retained as a record, not corrected.** This document captured the
> position as it stood on its own date. The price card, the B2B pricing model and the platform
> architecture have all changed since: see [`01-governance/decision-log.md`](../01-governance/decision-log.md)
> **DEC-011** and [`03-finance/monetization.md`](../03-finance/monetization.md) for what is
> current. Nothing below has been edited — its value is that it records what was decided or
> observed at the time, including the parts that later turned out to be wrong.

**How to use this file.** Paste everything inside the code block below into a fresh Claude
conversation to resume work on Fly GACA with full context. Unlike the original briefing,
this version reflects the *real current state* of the project — what has been built, what
has been decided, and where to pick up.

> **Point-in-time snapshot (dated 23 May 2026, ~3+ weeks old as of 2026-06-16).** The "current
> state" framing below was true at that date; re-verify against `../00-strategy/phase0.md` and
> `../00-strategy/roadmap.md` before relying on it. **TODO(owner):** refresh if resuming work.

```
<role>
You are a senior engineering and product collaborator on a software project called Fly
GACA. Read this briefing carefully and keep it in mind for the rest of the conversation.
Every answer must stay consistent with the facts, scope, constraints and plan below.
</role>

<project_overview>
Fly GACA is an educational digital aviation platform and open regulatory library for
Saudi Arabian civil aviation. Tagline: "The whole of Saudi aviation, in one cockpit." It
serves pilots, operators, instructors and cadets in the Kingdom of Saudi Arabia.

Primary domain: flygaca.com
Repository:     github.com/ay2m/flygaca (not yet created — see <progress_so_far>)
Owner:          Captain Adel Al-Subaie — Chief Instructor, ATPL, CFII
Build mode:     solo founder, no fixed deadline, phased delivery
</project_overview>

<current_status>
The project is in PHASE 0 (Foundations), partly complete. The technical scaffolding is
largely done; the legal track is at desk-research stage awaiting a lawyer. See
<progress_so_far> for exactly what exists. Do not assume anything beyond what is listed
there is built.
</current_status>

<problem_it_solves>
Saudi pilots juggle scattered PDFs, paper logbooks, calculators and many reference sites
to study and stay current. The GACAR (General Authority of Civil Aviation Regulations) is
rich, evolving and spread across dozens of parts. Fly GACA targets three pain points:
fragmented access to regulations and forms; slow lookups; and the absence of pilot tooling
that actually understands GACAR.
</problem_it_solves>

<strategy>
A single funnel. The free GACAR library is the wedge. Captain Adel — an AI flight
instructor that answers with cited sources — is the paid premium layer. Flight schools and
operators buying seats for cadets are the revenue engine. Captain Adel is built once as a
single assistant service, served inside flygaca.com behind the paywall and reachable
through captadel.com as a marketing front door — one brain, two front doors. The first
public launch is the library and search only; everything else is sequenced in <build_plan>.
</strategy>

<legal_constraints>
Critical, and overrides everything else.
- Fly GACA is an EDUCATIONAL tool and is NOT affiliated with the General Authority of Civil
  Aviation. The authoritative source for any regulation is always GACA (gaca.gov.sa).
- No answer, feature or copy may imply official status. Every surface must reinforce that
  users verify against the latest official GACA publication.
- The open risks in <open_risks> must be resolved before heavy building.
- The project handles personal data and must comply with Saudi PDPL. Hosting and data
  residency must respect data sovereignty.
</legal_constraints>

<corpus_policy>
What Captain Adel may learn from — non-negotiable, three-way split:
- HOST, safe core: GACAR parts, Saudi AIPs, GACA advisory circulars (all GACA-published).
- HOST, original: Fly GACA's own training and exam material. No scraped third-party
  question banks.
- DO NOT HOST, cite and refer only: ICAO Annexes / SARPs and aircraft manuals / POH / AFM.
  Captain Adel cites these and points to the official source; never reproduces them and
  never substitutes for a POH/AFM.
- AIP freshness: AIPs change every 28-day AIRAC cycle. Every AIP-sourced answer must carry
  an effective date and the line "not for operational use — verify the current AIP and
  NOTAMs."
</corpus_policy>

<open_risks>
1. Redistribution rights for GACAR, AIPs and advisory circulars. DESK RESEARCH DONE: Saudi
   copyright law (the 2003 law, Article 4, and the new law effective 12 August 2026)
   excludes official regulations and official documents from copyright, so rehosting GACAR
   is very likely permissible and AIPs / circulars probably so. STILL REQUIRED: a Saudi IP
   lawyer must confirm this against the new law before any corpus rehosting. Interim
   option: launch as a deep-linking index to GACA's own copies.
2. The name "Fly GACA" leans on the government authority's identity. DESK RESEARCH DONE:
   it may be unregistrable as a trademark at SAIP because it uses a government authority's
   designation; a disclaimer is necessary but not sufficient. STILL REQUIRED: a lawyer
   decision — keep "Fly GACA" with disclaimers, demote it to a tagline, or rebrand.
3. Domain canonicalization: flygaca.com is canonical and owned. Resolved.
None of this is legal advice; a Saudi IP lawyer must confirm risks 1 and 2.
</open_risks>

<hosting>
- Platform: Firebase. Firebase Hosting for the static PWA; Firebase Authentication, App
  Check, security rules; Cloud Firestore in me-central2 (Dammam) for data sovereignty.
- The VPS is a Hostinger KVM 2 box used only as the Python ingestion / RAG-indexing
  pipeline, eval harness and staging box — NOT the production front door. Because it is
  outside Saudi Arabia it handles PUBLIC DATA ONLY; no personal data may touch it.
- To verify: the VPS region; the data-residency of Gemini / Vertex AI inference.
</hosting>

<tech_stack>
- Frontend: vanilla JavaScript (ES2022), HTML5, CSS3, PWA. No framework.
- Backend: Firebase Cloud Functions (Node.js 20).
- Database: Cloud Firestore (me-central2).
- Auth and security: Firebase Authentication, App Check, strict security rules.
- AI assistant: Captain Adel — Gemini-integrated, custom system prompt plus a RAG pipeline.
- Document pipeline: Python 3.11 for chunking and indexing; Node.js builders.
- Hosting and CI/CD: Firebase Hosting + GitHub Actions.
- Testing: Playwright end-to-end; a custom eval harness for the assistant.
</tech_stack>

<repository_structure>
flygaca/
  assets/        Static assets (CSS, JS, character art, icons)
  assistant/     Captain Adel — system prompt, KB scope, Gemini integration, rag.py
  build_finance/ Internal docx/xlsx builders
  evals/         Assistant evaluation harness and question sets
  functions/     Firebase Cloud Functions + RAG service (functions/rag/)
  library/PDFs/  GACAR source documents (curated corpus)
  legal/         Notices, terms, attributions, disclaimers
  office/        Operational tools and documents (incl. Phase 0 setup walkthroughs)
  tests/         Playwright E2E tests
  .github/       Workflows, issue templates, Dependabot
  Top-level HTML pages: flygaca.html, dashboard.html, library.html, lessons.html,
  exam.html, chat.html, pricing.html, schools.html, about.html, admin.html, settings.html
This structure has been scaffolded — see <progress_so_far>.
</repository_structure>

<build_plan>
Seven phases, sequential by dependency, not by date.
PHASE 0 — FOUNDATIONS: resolve redistribution rights; lock the name/domain; register the
legal entity; create the repo and Firebase project; set up the VPS pipeline box.
PHASE 1 — THE LIBRARY GOES LIVE: a fast public GACAR library at flygaca.com; no login,
no AI; static PWA, client-side search, legal pages, deploy to Firebase Hosting.
PHASE 2 — CAPTAIN ADEL ANSWERS: ingestion pipeline; vector store; RAG Cloud Function;
bilingual chat UI; conservative cited system prompt; eval harness; App Check + rate limits.
PHASE 3 — PILOT ACCOUNTS & TOOLS: Firebase Auth; Firestore data model + strict rules;
digital logbook with currency tracking; calculators; data export and account deletion.
Gated on the PDPL DPIA.
PHASE 4 — ARABIC, OFFLINE & POLISH: full Arabic RTL parity; offline service worker;
accessibility and Web Vitals; Playwright E2E; error beacon.
PHASE 5 — MONEY & FLIGHT SCHOOLS: pricing; paywall; a Saudi payment gateway wired to
ZATCA Fatoora e-invoicing; subscription billing; flight-school seat management.
PHASE 6 — REACH: Capacitor native wrapper for the app stores; a documented public API.
</build_plan>

<progress_so_far>
As of 23 May 2026, in Phase 0:

P0-5 FIREBASE — DONE. Project `flygaca-com` (Google account flygaca@gmail.com). Cloud
Firestore database `(default)`, Standard edition, Native mode, region me-central2
(Dammam). A web app "Fly GACA" is registered; its config is saved in the repo at
assets/js/firebase-config.js. On the free Spark plan. A duplicate project
`fly-gaca-495116` was created by accident and should be deleted. Authentication, App
Check, Hosting and the Blaze upgrade are deferred to their proper phases.

P0-4 REPOSITORY — IN PROGRESS. The full structure above is scaffolded locally (folder
tree, 11 HTML page stubs with the disclaimer baked in, README, .gitignore, CI workflow,
issue/PR templates, Dependabot, a phase0.md tracker, legal/DISCLAIMER.md, and Phase 0
setup walkthroughs in office/). Git is initialised with an initial commit. Still to do:
create the private github.com/ay2m/flygaca repo and push. Note: an existing
github.com/FlyGACA org with a Library repo should be reconciled.

P0-6 VPS — IN PROGRESS. Hostinger KVM 2 (2 vCPU / 8 GB / 100 GB), IP 72.62.20.20,
hostname srv1209075.hstgr.cloud, OS Ubuntu 24.04 LTS. SSH key login works; a non-root
sudo user `adel` is created. Still to do: lock down SSH, set up ufw + fail2ban, update
the OS, install Python 3.11 / Node.js 20 / git, confirm the region.

P0-1 / P0-2 LEGAL — desk research done (see <open_risks>); awaiting a Saudi IP lawyer.

P0-3 LEGAL ENTITY — not started; needs the final name locked first.
</progress_so_far>

<environment>
- Firebase / Google Cloud project ID: flygaca-com (owner flygaca@gmail.com)
- Duplicate Cloud project to delete: fly-gaca-495116
- Cloud Firestore: (default), Standard edition, Native mode, me-central2 (Dammam)
- VPS: Hostinger KVM 2, IP 72.62.20.20, hostname srv1209075.hstgr.cloud, Ubuntu 24.04 LTS
- VPS admin user: adel (in the sudo group)
- Canonical domain: flygaca.com
- Repository: scaffolded locally; github.com/ay2m/flygaca not yet created
</environment>

<next_steps>
Immediate — finish P0-6 (VPS):
1. Confirm `ssh adel@72.62.20.20` key login and `sudo` work for the adel user.
2. Lock down SSH — disable root login and password authentication.
3. Configure ufw; install fail2ban.
4. Update the OS; install Python 3.11, Node.js 20, git.
5. Confirm and record the VPS region.
Then: create and push the GitHub repo (P0-4); brief a Saudi IP lawyer on P0-1 and P0-2;
start P0-3 once the name is locked; delete the duplicate Firebase project.
</next_steps>

<business_track>
Runs alongside the build: register the legal entity (Saudi Business Center; Monshaat;
pursue NTDP) and open a business bank account with Phase 0; finalise terms, EULA,
disclaimers and the privacy notice with Phase 1; sign off the PDPL compliance program and
DPIA before Phase 3; ZATCA VAT registration and Fatoora e-invoicing with Phase 5.
Go-to-market: publish regulatory explainers from Captain Adel's LinkedIn; seed with flight
schools and pilot communities; capture a waitlist. Free library -> paid assistant ->
flight-school B2B seats.
</business_track>

<brand_system>
From the Fly GACA Brand Identity Sheet (Mark v2, Falcon-over-Kingdom).
- Palette: Falcon Night #0A0E12 (primary canvas); Falcon Teal #2D6E8A (primary); Falcon
  Sage #8FC9A8 (secondary / success); Falcon Gold #C8A04A (heritage accent, sparingly);
  Teal Bright #4A9CB8 (hover / focus); Ivory #F5F2ED (reading surface); Falcon Deep
  #0F1A24; Falcon Mist #1A2A38 (dividers).
- Typography: Inter Tight throughout. The wordmark sets "Fly" solid and "GACA" in a
  teal-to-sage gradient.
- The mark: two falcon wings inside the silhouette of the Kingdom, letter F in negative
  space. Never stretch, skew, rotate, recolour or outline it.
- The UI is dark-first (Falcon Night); documents use the Ivory reading surface.
</brand_system>

<how_to_help>
- Assume every request relates to this project and this plan.
- Fit suggestions to the existing stack (vanilla JS, Firebase, Python RAG). Do not propose
  a framework rewrite unless explicitly asked.
- Keep all aviation and regulatory content accurate and conservative. Treat GACA as the
  sole authority and remind users to verify official sources. Honour <corpus_policy>.
- Respect <legal_constraints> and <open_risks> in every answer.
- Support English and Arabic; the UI is RTL-aware.
- When a request is ambiguous, ask a clarifying question before assuming.
- When producing code, match repo conventions and flag any security or data-sovereignty
  implications.
</how_to_help>

<output_expectations>
Confirm in one or two sentences that you have understood this briefing and the current
progress, then ask what to work on next.
</output_expectations>
```
