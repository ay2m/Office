---
title: QA Consistency Sweep — 2026-06-14
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# QA Consistency Sweep — 2026-06-14

> [!NOTE]
> **Superseded 2026-08-19 — retained as a record, not corrected.** This document captured the
> position as it stood on its own date. The price card, the B2B pricing model and the platform
> architecture have all changed since: see [`01-governance/decision-log.md`](../01-governance/decision-log.md)
> **DEC-011** and [`03-finance/monetization.md`](../03-finance/monetization.md) for what is
> current. Nothing below has been edited — its value is that it records what was decided or
> observed at the time, including the parts that later turned out to be wrong.

**Scope:** Issue A (GCP region labelling) and Issue B (corpus-count conflicts) across the full project tree, excluding `node_modules/` and `.git/`. Git worktrees under `flygaca/.claude/worktrees/` are inventoried but treated as non-canonical (they mirror the main repo at older points and are not independently edited).

---

## CRITICAL FINDING — Issue A brief contains an inverted fact

> The task brief states: *"me-central2 is Qatar (Doha); the Saudi Arabia (Dammam) region is me-central1"*

**This is backwards. The project codebase and GCP geography are correct as written:**

| GCP Region | Location | Project role |
|---|---|---|
| `me-central1` | **Doha, Qatar** | Interim compute (Cloud Run not yet granted in Dammam) |
| `me-central2` | **Dammam, Saudi Arabia** | PDPL target — Firestore already here; compute pending |

Evidence from the codebase:
- `flygaca/functions/region.js` line 21: `module.exports = 'me-central1'; // interim (Doha); target me-central2 (Dammam)`
- `library/06-product-eng/runbooks/runbook-pdpl-me-central2.md` title and throughout: *"move to me-central2 (Dammam)"*; *"Compute runs interim in me-central1 (Doha)"*
- `library/06-product-eng/hosting-facts.md`: *"`me-central1` (Doha, Qatar) is NOT in-Kingdom"*; table lists `me-central2 (Dammam)` for Firestore and Cloud Functions
- Live Firestore database confirmed at `me-central2 (Dammam)` per RUNBOOK checklist
- Cloud Run URL in use: `https://captadel-30479965011.me-central1.run.app` — which is confirmed as the Qatar/Doha interim

The two documents that have the mapping **inverted** (and should be corrected) are:

1. **`book-of-fly-gaca-review-2026-06-14.md` line 60** — states *"me-central2 is Qatar"* (wrong)
2. **`.claude/agents/flygaca-qa-reviewer.md` line 15** — states *"Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar"* (wrong — has both sides reversed)

No other file in the project has the mapping wrong. The ~170 other `me-central` occurrences consistently and correctly use `me-central2 = Dammam` and `me-central1 = Doha`.

---

## Issue A — GCP Region ("me-central") Occurrences

### 1A. Inventory

Total files containing `me-central` (excluding node_modules, .git): **~50 unique canonical files** (plus worktree mirrors). Key non-worktree files:

| File | Lines | Context / label used | Correct? |
|---|---|---|---|
| `the-book-of-fly-gaca.html` | 642, 664 | `me-central2` placed in Dammam | ✅ Correct |
| `flygaca-resume-briefing-2026-05-23.md` | 91, 101, 148, 174 | `me-central2 (Dammam)` | ✅ Correct |
| `01-governance/CLAUDE.md` | 107, 126–129, 143–144 | `me-central1` (Doha) interim; `me-central2` (Dammam) target | ✅ Correct |
| `library/06-product-eng/setup/setup-vps.md` | 27, 36 | `me-central2 / Cloud Functions` | ✅ Correct |
| `library/06-product-eng/setup/setup-firebase.md` | 15, 18–19 | `me-central2 (Dammam, Saudi Arabia)` | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-cloudflare.md` | 5, 33 | `me-central2` target; `me-central1` interim | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-captain-adel.md` | 55, 107, 207 | `me-central1` for live endpoint (interim Doha) | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-captadel-deploy.md` | 21–22, 94–96, 123–124, 151, 160–161 | `me-central2` Dammam target; `me-central1` Doha interim | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-security-rollout.md` | 94 | `me-central1` for current function | ✅ Correct (reflects live interim) |
| `library/06-product-eng/runbooks/runbook-launch.md` | 148 | `me-central2 / Dammam` | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-ios.md` | 68 | `me-central1` URL (live interim) | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-captadel-saas.md` | 14, 50, 81, 133 | `me-central2 (Dammam)` target | ✅ Correct |
| `library/06-product-eng/runbooks/runbook-captadel-extraction.md` | 129 | `me-central1` for current Cloud Run | ✅ Correct (interim) |
| `library/06-product-eng/runbooks/runbook-pdpl-me-central2.md` | all | `me-central2` = Dammam; `me-central1` = Doha | ✅ Correct throughout |
| `library/06-product-eng/hosting-facts.md` | 17, 24–26, 30–32, 40, 42, 64, 66 | `me-central2 (Dammam)` as canonical | ✅ Correct |
| `flygaca-claude-briefing.md` | 110, 120, 151 | `me-central2 (Dammam)` | ✅ Correct |
| `00-strategy/roadmap.md` | 172, 207, 255 | `me-central2` for Firestore | ✅ Correct |
| `00-strategy/phase0.md` | 193, 195, 201, 212–215, 234 | `me-central2 (Dammam)` | ✅ Correct |
| `master-paperwork-template-index-2026-06-14.md` | 195 | Runbook name reference only | ✅ Correct |
| `02-legal/privacy-notice-full-stage-draft-2026-06-14.md` | 145–146, 189 | `me-central2` (Dammam, KSA) | ✅ Correct |
| `flygaca-antigravity-agents.md` | 102, 113, 131 | `me-central2 (Dammam)` | ✅ Correct |
| `flygaca-phase0-status-2026-05-23.md` | 81, 109, 121, 135 | `me-central2 (Dammam)` | ✅ Correct |
| `flygaca/assistant/captain_adel.py` | 25, 172 | `me-central2` as default | ✅ Correct |
| `flygaca/functions/region.js` | 9, 21 | `me-central1` (Doha) interim; comment names Dammam as target | ✅ Correct |
| `flygaca/functions/.env.flygaca-app` | throughout | `me-central1` for current deploy; names Dammam as target | ✅ Correct |
| `flygaca/firebase.json` | rewrites | `me-central1` (live interim) | ✅ Correct |
| `flygaca/privacy.html` | 115 | `me-central2 (Dammam)` | ✅ Correct |
| `flygaca/roadmap.md` | 207 | `me-central1 (Doha — closest CF v2 region` | ✅ Correct |
| **`book-of-fly-gaca-review-2026-06-14.md`** | **60, 107** | **"me-central2 is Qatar" — WRONG** | ❌ INCORRECT |
| **`.claude/agents/flygaca-qa-reviewer.md`** | **15** | **"Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar" — WRONG (both sides reversed)** | ❌ INCORRECT |

### 1B. Files fixed

#### FIXED: `.claude/agents/flygaca-qa-reviewer.md` (line 15)
- **Before:** `correct region facts (Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar)`
- **After:** `correct region facts (Saudi GCP region is me-central2 = Dammam; me-central1 = Doha, Qatar — the current interim compute region)`
- **Backup created:** `.claude/agents/flygaca-qa-reviewer.md.bak-2026-06-14`

#### FIXED: `book-of-fly-gaca-review-2026-06-14.md` (lines 60 and 107)
- **Line 60 before:** `However, me-central2 is Qatar — the Saudi hosting intent (Dammam) would be me-central1.`
- **Line 60 after:** `However, this is correct as written: me-central2 IS Dammam (Saudi Arabia) and me-central1 IS Doha (Qatar). The project codebase is accurate throughout. The confusion was in this review document, not the source.`
- **Line 107 before:** `Verify and correct GCP region — confirm me-central2 vs me-central1 (Qatar vs KSA) across the whole codebase and all docs`
- **Line 107 after:** `GCP region verified — me-central2 = Dammam (Saudi Arabia, PDPL target, Firestore live here); me-central1 = Doha (Qatar, current compute interim). Codebase is correct; erroneous statements were only in this review doc and the QA agent definition.`
- **Backup created:** `book-of-fly-gaca-review-2026-06-14.md.bak-2026-06-14`

All other `me-central` occurrences: **no edits required** — they are internally consistent and factually correct.

---

## Issue B — Corpus Count Conflicts

### 2A. Authoritative Figures (evidence-based)

| Item | Authoritative count | Primary evidence |
|---|---|---|
| GACAR Parts | **74** | `library/GACAR-Source-Corpus/` = 74 dirs; `gacar-index.json` count=74; `assets/data/parts/` = 74 files |
| Handbooks (topical ebooks) | **21** | `assets/data/ebooks/` = 21 HTML files; `ebooks-index.json` count=21; GACA source: GACAR topical books |
| GACA Guidance-Manual PDFs | **17** | `library/GACA/Guidance-Manuals/` = 17 PDF files (Vol 1–17) — these are **source PDFs**, not the app ebooks |
| Aerodromes | **61** | `airports.json` count=61; `aerodromes-index.json` documents=61; `assets/data/aerodromes-index.json` |
| VFR Charts | **13** | `assets/data/charts/` = 13 image files |
| Reference documents | **190** | `reference-index.json` count=190; `_extracted/` = 190 TXT files |
| Tools (flight tools) | **35** (HTML files), functionally **24** interactive tools | `flygaca/tools/` = 35 HTML incl. index + utilities; `flygaca.html` hero says "24 flight tools"; action plan confirms "24 tool pages exist" |
| Guides | **10** (non-index HTML) | `flygaca/guides/` = 10 non-index HTML files; action plan: "guide count corrected 11→10" |
| RAG chunks (current) | **47,361** | `runbook-captain-adel.md` (74 Parts + 21 handbooks + 190 ref docs) |
| RAG chunks (old Book figure) | ~~29,749~~ | Stale — was 74 Parts + 17 eBook PDFs only (pre-handbook integration) |

**Key distinction:** The Book's "17 administration eBooks" refers to the 17 GACA Guidance-Manual PDFs in `library/GACA/Guidance-Manuals/`. The app's "21 handbooks" are the 21 topical HTML ebooks in `assets/data/ebooks/` (a different, larger set derived from the GACA topical books). These are not the same thing. The Book's corpus description predates the handbook integration.

### 2B. Conflict Table

Every conflicting figure found, with file, line, current value, and recommended correction:

| File | Line | Current | Recommended | Notes |
|---|---|---|---|---|
| `the-book-of-fly-gaca.html` | 771 | "96 documents — 75 GACAR Parts, 17 administration eBooks" | "74 GACAR Parts · 21 handbooks · 190 reference documents (+ 61 aerodromes · 13 charts)" | Stale pre-handbook counts. "75" is wrong (74); "17 admin eBooks" confuses Guidance-Manual PDFs with the app's 21 HTML handbooks; "96" arithmetic does not reconcile with any current set |
| `the-book-of-fly-gaca.html` | 771 | "29,749 chunks" | "47,361 chunks" | Stale chunk count pre-dates handbook integration per `runbook-captain-adel.md` |
| `library/06-product-eng/runbooks/runbook-launch.md` | 18–19 | "17 Flight Tools, 7 Guides" | "24 flight tools, 10 guides" (or note as pre-launch snapshot) | Stale; live site and action plan confirm 24 tools, 10 guides |
| `flygaca/office/runbook-launch.md` | 18–19 | "17 Flight Tools, 7 Guides" | Same as above | Mirror of library copy; same correction needed |
| `book-of-fly-gaca-review-2026-06-14.md` | 53–55 | Quotes the "96 documents — 75 GACAR Parts, 17 eBooks" and calls it conflicting | Remains accurate as a review observation — but the resolution is now documented here | No edit needed (it's noting the conflict) |

### 2C. Figures that are consistent across authoritative sources

The following numbers appear identically in the live site (`flygaca.html`, `pricing.html`, `library.html`), the ROADMAP, the action plan, the RUNBOOK-captain-adel, and the product-profile:

- **74 GACAR Parts** — consistent everywhere except The Book (says 75)
- **21 handbooks** — consistent everywhere except The Book (says 17)
- **61 aerodromes** — consistent everywhere
- **13 charts** — consistent everywhere
- **190 reference documents** — consistent everywhere
- **24 flight tools** — consistent in live site; RUNBOOK-launch is stale at 17
- **10 guides** — consistent in live site; RUNBOOK-launch is stale at 7

### 2D. Fixes applied

**No mass-edits made to prose documents.** The two stale-count files require human confirmation before editing:

**Recommended human edits (not auto-fixed):**

1. **`the-book-of-fly-gaca.html` line 771** — Change "96 documents — 75 GACAR Parts, 17 administration eBooks, and the references that bind them. It is rebuilt by `build_library.py` and indexed by BM25 across **29,749 chunks**." to reflect current figures. Suggested: *"The corpus spans 74 GACAR Parts, 21 topical handbooks, 190 reference documents, 61 aerodromes and 13 charts — indexed by BM25 across **47,361 chunks**."* The "96 documents" framing is both wrong and confusing (the actual total of Parts + handbooks + references alone is 285).

2. **`library/06-product-eng/runbooks/runbook-launch.md` line 18** — Change "17 Flight Tools, 7 Guides" to "24 flight tools, 10 guides" to match the live site. (This is a launch runbook snapshot; the discrepancy is a maintenance concern, not a live-site error.)

3. **`flygaca/office/runbook-launch.md` line 18** — Same correction as above (this is a mirror of the library copy).

---

## Summary of Files Edited vs Flagged

### Files edited (with backups)

| File edited | Backup | Change |
|---|---|---|
| `/sessions/nice-quirky-pasteur/mnt/Fly GACA /.claude/agents/flygaca-qa-reviewer.md` | `.bak-2026-06-14` created | Fixed inverted region labels on line 15 |
| `/sessions/nice-quirky-pasteur/mnt/Fly GACA /book-of-fly-gaca-review-2026-06-14.md` | `.bak-2026-06-14` created | Corrected inverted region claim at lines 60 and 107 |

### Files flagged for human decision

| File | Issue | Recommended action |
|---|---|---|
| `the-book-of-fly-gaca.html` | Line 771: "96 documents — 75 GACAR Parts, 17 admin eBooks, 29,749 chunks" — all three figures stale | Human to update to 74 Parts · 21 handbooks · 190 refs / 47,361 chunks |
| `library/06-product-eng/runbooks/runbook-launch.md` | Line 18: "17 Flight Tools, 7 Guides" — stale launch snapshot | Human to update to 24 tools / 10 guides |
| `flygaca/office/runbook-launch.md` | Line 18: same stale figures | Same correction as above |

### Files with correct me-central labelling (no edits needed)

All remaining ~48 files containing `me-central` — including all source code, runbooks, briefings, privacy notice, PHASE0, ROADMAP, and CLAUDE.md — correctly map `me-central2 = Dammam (Saudi Arabia, PDPL target)` and `me-central1 = Doha (Qatar, interim compute)`.

---

## Region Truth Table (for reference)

| Claim | Verdict |
|---|---|
| GCP `me-central1` = Doha, Qatar | ✅ CORRECT |
| GCP `me-central2` = Dammam, Saudi Arabia | ✅ CORRECT |
| Firestore `(default)` is in `me-central2 (Dammam)` | ✅ CONFIRMED (RUNBOOK checklist, privacy.html) |
| Cloud Functions / Cloud Run are in `me-central1 (Doha)` | ✅ CONFIRMED INTERIM — pending Google account access grant for me-central2 compute |
| The PDPL target for compute is `me-central2 (Dammam)` | ✅ CORRECT (region.js comment, RUNBOOK-pdpl-me-central2) |

---

*Report generated: 2026-06-14 by QA Consistency Sweep agent.*
