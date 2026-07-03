---
title: Fly GACA — Process Workflow Documentation
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — Process Workflow Documentation

**Location:** `06-product-eng/diagrams/`
**Generated:** 2026-06-14
**Covers:** the three core operational processes illustrated in the SVG diagrams in this folder.
**Context docs:** `fly-gaca-review-action-plan.md` (especially §2.1, §4.1, §4.2), `captadel-plan.md`, `06-product-eng/spec-freshness-pipeline.md`, `06-product-eng/diff-tracker-scope.md`, `06-product-eng/runbooks/runbook-source-updates.md`.

---

## 1. Licensing Journey (`licensing-journey.svg`)

### Purpose
A reference map of the Saudi civil pilot licensing pathway from entry prerequisites through PPL issue, plus the foreign licence conversion route. This is the journey Fly GACA's Guides cover. The diagram is an educational aid — GACA's official publications are always the authoritative source.

### Phases and steps

| Phase | Step | Key regulatory reference |
|-------|------|--------------------------|
| 1 — Entry | Age 17+, Saudi nationality or valid residency, basic education | GACAR Part 61 Subpart B |
| 2 — Medical | Class 2 Medical Certificate from a GACA-approved AME (vision, cardiovascular, hearing/ENT/mental) | GACAR Part 67; valid 24 months for applicants under 40 |
| 3 — Student Pilot | Application to GACA, dual instruction begins with CFI, solo endorsement required | GACAR 61.87, Part 61 Subpart C |
| 4 — Training | Ground school, written knowledge test (70% pass mark), ICAO Language Proficiency Level 4 English test, 45 flight hours (incl. 10 hrs solo PIC) | GACAR Part 61 Subpart E; ICAO Annex 1 |
| 5 — Checkride | Oral exam + flight test with a GACA-designated examiner; fail means further instruction and re-test | GACAR Part 61 Subpart E, ACS standards |
| 6a — PPL Issued | GACAR Part 61 PPL, VFR day/night privileges; medical renewal due every 24 months; next step: hour-building toward CPL/IR | GACAR Part 61 |
| 6b — Conversion | Holders of FAA/EASA/ICAO licences may convert under GACAR 61.77; requires English proficiency + knowledge test + differences training if needed | GACAR 61.77 |

### Owner / role
Content team (keeps guide pages aligned with phases); editorial owner (ensures GACAR Part 61 reference is current each AIRAC cycle — see Workflow 2).

### Failure modes
- Guide page refers to a superseded requirement (e.g., old hour minimums) — caught by AIRAC editorial sync (Workflow 2).
- Conversion path details change without a guide update — must be flagged in the per-cycle checklist.

---

## 2. AIRAC Editorial Sync (`airac-editorial-sync.svg`)

### Purpose
The per-AIRAC-cycle process that keeps every regulation, aerodrome, chart, and handbook page on Fly GACA current and visibly stamped. This is the §2.1 trust-gap mitigation from the action plan. The action plan is explicit: a stamp that says "synced 8 months ago" is more damaging than no stamp. Currency is a product function, not a UI feature, and it requires a named editorial owner.

### Cadence
The AIP changes every **28-day AIRAC cycle**, effective each Thursday. GACAR Parts amend irregularly. The automated pipeline runs weekly (Monday) and every Thursday to align with AIRAC effective dates.

### Pipeline stages (automated — `scripts/update-sources.js`, VPS cron)

| Stage | What happens | Key file / code |
|-------|-------------|-----------------|
| A. Detect | Fetch canonical GACA pages; discover all document links; fingerprint the set | `assets/data/sources.json` |
| B. Hash + diff | SHA-256 each Part/doc; compare against committed manifest; flag changed items | `assets/data/corpus-manifest.json`, `scripts/build-manifest.js` |
| C. Re-ingest | Download changed files; run `pdftotext`; re-chunk and re-embed incrementally (not a full rebuild) | `functions/rag/`, `assistant/rag.py` |
| D. Stamp | Write/refresh provenance block (`fetched_at`, `verified_cycle`, `amendment`, AIRAC effective date) | `assets/data/source-status.json` |
| E. Eval gate | Run eval harness; any citation that no longer resolves to a live section **fails the build** and blocks publish | `captadel/evals/`, `scripts/check-data.js` |
| F. Publish | Deploy `assets/data/` + rebuilt RAG index; tag deploy with AIRAC cycle | `firebase deploy` |

**If nothing changed** at stage B, the pipeline logs "current" and exits — no re-ingest, no re-deploy.

### Editorial owner actions (human, per checklist)

The automated pipeline detects and re-ingests changes. The editorial owner's role is to **confirm material significance and sign off**:

1. Review the auto-detected changes log.
2. Confirm changed Parts against the official GACA publication.
3. Review the diff for substantive regulatory amendments (not just formatting).
4. Update reader-page prose if needed (e.g., a changed hour minimum in a guide).
5. Sign off the freshness stamp (approve the `verified_cycle` update).

**SLAs (from `spec-freshness-pipeline.md`):**
- AIP-class (aerodromes, charts, AIS): re-verified within **72 hours** of each new AIRAC cycle.
- GACAR Parts: re-ingested within **7 days** of a detected amendment.
- Reference shelf (handbooks, ICAO, FAA): best-effort, monthly diff.

### User-visible outputs

| Output | Trigger | Appearance |
|--------|---------|------------|
| Freshness stamp | Every reader page | "GACAR Part 61 — Amdt 3, verified AIRAC 2026-05" + green check |
| Staleness banner | `verified_cycle` older than current AIRAC for AIP-class item | Amber flag: "verification pending for the current cycle" |
| Library status line | Always visible | "Corpus current as of AIRAC YYYY-CC" |
| Captain Adel citation datestamp | Every RAG answer | Amendment + AIRAC stamp on each cited source |

### Failure modes

| Failure | Consequence | Mitigation |
|---------|-------------|------------|
| GACA site returns 0 docs (blocked / 403) | No content wiped (fail-safe); alert owner | Soft warning (exit 0) on network trouble; positive change required to act |
| Eval gate fails after re-ingest | Publish blocked; owner alerted | Manual review and fix before next deploy |
| Stamp says "current" when actually stale | Worst failure — breaks the trust contract | Automated `verified_cycle` check; staleness banner auto-triggers if cycle drifts |
| Editorial owner misses the 72-hour AIP window | Staleness banner shown to users | Checklist alert; escalation to backup owner |

### Action plan reference
§2.1 (trust and authority gap), §4.1 (currency stamps + AIRAC flags), `spec-freshness-pipeline.md`, `runbook-source-updates.md`.

---

## 3. Captain Adel RAG Fallback (`captain-adel-fallback.svg`)

### Purpose
The decision flow for Captain Adel's RAG answer pipeline, with the strict low-confidence fallback mandated by §4.2 of the action plan. The core principle: when retrieval confidence is low, Captain Adel **must refuse and redirect to the exact GACAR text** rather than guess. A confident wrong answer with a plausible citation is worse than a refusal. Conservative refusal is a feature, not a failure.

### Pipeline steps

| Step | Description | Code location |
|------|-------------|---------------|
| 1. User question | Regulatory or aeronautical query arrives via `chat.html` → `/api/chat` → Cloud Function | `chat.html`, `functions/` |
| 2. Scope + safety pre-check | Is this a GACAR/aviation question? Injection / role-confusion detection. Out-of-scope → immediate refuse | `functions/rag/system-prompt.js` |
| 3. BM25 retrieval | Lexical search over 47,361 GACAR chunks; hybrid embedding+BM25 fused via RRF (v0.5); parent-child chunk expansion for tables and limits | `functions/rag/bm25.js`, `_chunks.json.gz` |
| 4. Confidence decision | If retrieval confidence is **HIGH**: proceed to generation. If **LOW**: strict fallback (refuse + redirect) | `functions/rag/agent.js` |
| 5. Gemini generation | `gemini-2.5-flash` under system prompt; answer constrained to retrieved passage text; must cite Part + section + amendment; SSE streaming (v0.6) | `functions/rag/agent.js` |
| 6. Citation faithfulness guard | Runtime check (v0.6): score every answer's claims against cited section text; score ≥ 0.8 to pass; fail → strip unsupported claims or refuse with partial grounding | `captadel/evals/checks/citation-faithfulness.js` |
| 7. Answer delivered | Streamed response with cited section, retrieved source snippet (not just a link), and amendment + AIRAC stamp; clickable deep-link into Library reader | `chat.html` |

### The strict fallback (§4.2 — low confidence path)

When retrieval confidence is below threshold:

1. Do **not** attempt an answer.
2. State plainly that the question cannot be verified against GACAR with sufficient confidence.
3. Link the user to the exact GACAR Part(s) most likely relevant.
4. Never paraphrase a regulatory limit that cannot be grounded in a retrieved passage.

**Canonical refusal template:**
> "I can't verify this against GACAR with sufficient confidence. For authoritative guidance, refer to: [exact GACAR Part link]."

### Refusal taxonomy (`docs/refusal-taxonomy.md`)

Six refusal categories, each with canonical language and scored in the eval suite:

1. Out of scope (non-GACAR topic)
2. Ambiguous question (cannot determine which GACAR Part applies)
3. Low retrieval confidence (main fallback path)
4. Conflicting source passages (two retrieved sections contradict)
5. Missing or broken citation (passage cannot be linked back to a live section)
6. Injection or role-confusion attack detected

### Eval harness gates (from `captadel-plan.md` Wave 1)

The system is only as trustworthy as its eval coverage. Eval cases required before each version ships:

| Case class | Target count | Purpose |
|------------|-------------|---------|
| EN knowledge | 50+ | Baseline correctness |
| AR knowledge | 30+ | Arabic parity (within 5% of EN pass rate) |
| Adversarial (injection, role-confusion) | 20+ | Refusal robustness |
| Refusal calibration | 10+ | Correct refusal on low-confidence questions |
| Staleness (superseded citation) | New class | Hard failure — never cite a superseded source |

CI gate (`eval.yml`) required on all PRs touching `captadel/**`. A refusal-calibration regression is an unconditional block.

### Supporting operational features

- **Rate limiter (v0.6):** distributed (Redis/Firestore), replaces per-process `ratelimit.js`. Free tier: 5 questions/day; Pro: unlimited.
- **App Check enforcement (v0.6):** reduces abuse.
- **Structured observability (v0.6):** per-turn metrics — latency, sources retrieved, refusal rate, faithfulness score, provider — feeds real-world eval seeding.
- **ALLaM (v0.7 target):** in-Kingdom model for PDPL compliance and cost trajectory; AR eval pass rate must stay within 5% of EN.

### Owner / role
Captain Adel product owner (system prompt, refusal taxonomy, eval case ownership); engineering (retrieval, pipeline, CI gate); editorial owner (ensures corpus freshness so retrieval has current chunks to draw from — feeds into Workflow 2).

### Failure modes

| Failure | Consequence | Mitigation |
|---------|-------------|------------|
| Low-confidence answer slips through without refusal | Wrong operational guidance delivered to user; reputational damage | CI gate: refusal-calibration eval cases block regression |
| Citation faithfulness guard miscalibrated (too strict) | Legitimate answers refused; user frustration | Human-labelled subset quarterly review of judge calibration |
| Corpus stale — retrieval returns superseded chunks | Answer correct per old regulation | Staleness eval case class + AIRAC sync (Workflow 2) — superseded chunks excluded from index |
| Injection attack rewrites system prompt | Adel behaves as non-Adel; trust destroyed | Pre-check step + adversarial eval cases; runtime injection logging |
| Cost spike from runaway eval or high traffic | Budget overrun | Per-tenant cost caps; eval concurrency limits; budget alert in Firebase |

### Action plan reference
§2.3 (AI hallucination risk), §4.2 (strict fallback protocol), `captadel-plan.md` §1b (citation-faithfulness) and Wave 1 (eval foundation), `runbook-captain-adel.md`.

---

## Cross-workflow dependencies

```
Workflow 2 (AIRAC sync)
  └─> keeps corpus fresh
      └─> Workflow 3 (Captain Adel) retrieves from fresh index
          └─> Workflow 1 (Licensing Journey) guides reference current GACAR Parts
```

The trust proposition of Fly GACA depends on all three workflows running correctly. Workflow 2 is the foundation: if the corpus is stale, both Captain Adel (Workflow 3) and the Guides (Workflow 1) become unreliable regardless of how well their own logic is implemented.
