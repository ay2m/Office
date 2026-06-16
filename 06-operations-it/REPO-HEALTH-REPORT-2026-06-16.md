# The-Office — Repository Health Report

_Status: current · Last updated: 2026-06-16 · Owner: ops_

This is the single front door for the health of **The-Office** documentation repository.
It synthesizes the standing audits (linked below), records the canonical resolutions to
facts that kept getting re-litigated, scores each department by documentation depth, and
tracks the open hygiene/structure actions. It is **about this repo** (the operating
documents); the application code lives in separate repositories and is covered only where
a doc audit points at it.

> **Repo at a glance (2026-06-16):** 12 numbered departments · 247 tracked files ·
> documentation/spec repo (no application source). Reorganized and hygiene-swept this date.

---

## 1. Standing audits (don't duplicate — link)

These reports remain authoritative for their domains. Read them at source; this report
only summarizes status and removes the need to hunt for them.

| Audit | Scope | Where |
|---|---|---|
| Improvement Audit | 5-pillar review of app code/UX/content/strategy | `IMPROVEMENT-AUDIT.md` |
| QA Consistency Sweep | Cross-doc fact consistency (region, corpus counts) | `QA-Consistency-Sweep-2026-06-14.md` |
| Content QA | GACAR corpus extraction quality (OCR, anchors) | `CONTENT-QA.md` |
| Consolidation Manifest | What was merged/superseded during consolidation | `CONSOLIDATION-MANIFEST-2026-06-16.md` |
| Content Integration Plan | How external content folds into the library | `CONTENT-INTEGRATION-PLAN.md` |
| Test Coverage Analysis | Spec-vs-test gap audit across `SPEC-*` | `TEST-COVERAGE-ANALYSIS-2026-06-16.md` |
| Legal Gap Audit | Legal-pack completeness | `../02-legal/Legal-Gap-Audit-2026-06-14.md` |
| HR Pack Gap Audit | People-pack completeness | `../05-people/HR-Pack-Gap-Audit-2026-06-14.md` |
| Ground-School Gap Audit | Curriculum coverage | `../10-academy-curriculum/Ground-School-Curriculum-Gap-Audit-2026-06-14.md` |

## 2. Canonical resolved facts (stop re-litigating these)

The consistency sweep settled two facts that recur across documents. **These values are
authoritative**; if a document disagrees, the document is stale, not this table.

### 2.1 GCP region mapping
| Region | Location | Role |
|---|---|---|
| `me-central1` | **Doha, Qatar** | Interim compute (Cloud Run); **not** in-Kingdom |
| `me-central2` | **Dammam, Saudi Arabia** | PDPL target; Firestore already live here; compute pending |

The ~170 occurrences across the repo use this mapping correctly. Two files had it
**reversed** (flagged for human edit in the sweep): `00-strategy/Book-of-Fly-GACA-Review-2026-06-14.md`
line 60 and `.claude/agents/flygaca-qa-reviewer.md` line 15.

### 2.2 Corpus counts
Canonical: **74 GACAR Parts · 21 topical handbooks · 190 reference documents · 61 aerodromes ·
13 charts**, indexed by BM25 across **47,361 chunks**.

Stale figures to ignore (predate handbook integration): "96 documents / 75 Parts / 17 admin
eBooks / 29,749 chunks" in `The Book of Fly GACA.html` line 771. Note the "17 administration
eBooks" (GACA Guidance-Manual PDFs) are a *different set* from the app's "21 handbooks"
(topical HTML ebooks).

## 3. Documentation-depth scorecard

Markdown depth is a proxy for "is this department's thinking written down and diffable,"
not for the quality of the polished `.docx`/`.xlsx` deliverables (which can be excellent
while `md=0`).

| Dept | Files | `.md` | Depth | Note |
|---|---:|---:|---|---|
| 00-strategy | 25 | 7 | ●●●● | Strong narrative + brainstorms |
| 01-governance | 12 | 4 | ●●● | Repo-meta + core agreements |
| 02-legal | 26 | 17 | ●●●● | Deepest md coverage; briefs + audits |
| 03-finance | 10 | 1 | ●○○○ | **Gap** — only MONETIZATION.md in md |
| 04-compliance-ksa | 13 | 0 | ○○○○ | **Gap (highest value)** — KSA-regulated, no md |
| 05-people | 14 | 3 | ●●○ | Audit + a few notes |
| 06-operations-it | 48 | 36 | ●●●● | Specs/runbooks hub |
| 07-gtm | 14 | 4 | ●●○ | Playbooks mostly in docx |
| 08-customer-success | 17 | 9 | ●●●● | Well-documented in md |
| 09-investor-relations | 21 | 0 | ○○○○ | **Gap** — deck/xlsx only, no md thesis |
| 10-academy-curriculum | 11 | 3 | ●●○ | Curriculum + audit |
| 11-brand | 29 | 5 | ●●● | Design system + assets |

Three departments scaffolded this pass to close the worst md gaps (see §4): `03-finance`,
`04-compliance-ksa`, `09-investor-relations`.

## 4. Action tracker

| # | Area | Action | Status |
|---|---|---|---|
| H1 | Hygiene | Add `.gitignore` (DS_Store/bak/editor cruft) | ✅ Done |
| H2 | Hygiene | Untrack 4 `.DS_Store` + 1 `.bak` | ✅ Done |
| H3 | Hygiene | Declare binaries in `.gitattributes` | ✅ Done |
| H4 | Hygiene | Delete abandoned `FLYGACA_DOCUMENTATION_COMPILATION.md` stub | ✅ Done |
| N1 | Naming | Normalize filenames to ASCII kebab-case; fix links + `_INDEX.md` | ✅ Done |
| N2 | Naming | Document the convention in `CONTRIBUTING.md` | ✅ Done |
| C1 | Content | Scaffold finance / compliance / investor md docs | ✅ Done (templates) |
| C2 | Content | Refresh stale status docs (PHASE0, ROADMAP, briefings) | ✅ Done (flagged) |
| X1 | External | Update the Google-Sheet master index + any Drive deep-links to renamed files | ⛔ Owner action |
| X2 | Content | Fix the 2 reversed region refs (§2.1) | ⛔ Owner action |
| X3 | Content | Update `The Book of Fly GACA.html` line 771 to canonical counts (§2.2) | ⛔ Owner action |

## 5. Notes & caveats

- **Filenames are now lowercase kebab-case**, which is less Drive-friendly than the prior
  Title Case but consistent and link-safe. New files should follow `CONTRIBUTING.md`.
- **App-code findings** (IMPROVEMENT-AUDIT, TEST-COVERAGE-ANALYSIS) are tracked here for
  visibility but are actioned in the application repos (`functions/`, `assets/`, `captadel/`),
  not in The-Office.
- This report is the place to record future repo-health resolutions so they live in one
  durable spot instead of scattered briefings.
