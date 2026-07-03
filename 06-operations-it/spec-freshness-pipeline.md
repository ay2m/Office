---
title: Fly GACA — Corpus Freshness Pipeline — Design Spec
section: 06-operations-it
doc_type: spec
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — Corpus Freshness Pipeline — Design Spec

**Status:** design, not built · **Maps to:** `roadmap.md` cross-cutting (AIP/AIRAC freshness),
Phase 2 ingestion, Phase 10 · **Prepared:** 2026-05-30
**Companion:** `strategy-competitive-teardown.md`

The competitive teardown names freshness as a structural weakness a single maintainer cannot
reliably hold, and the first superseded citation as the moment our trust proposition cracks.
This spec turns that liability into a **visible, automated, stamped guarantee** — the one place
a funded competitor would attack, closed before they can.

The AIP changes every **28-day AIRAC cycle**; GACAR Parts amend irregularly. Today, refreshing
both is manual. This spec makes staleness *detectable, dated, and bounded by an SLA.*

> The pipeline runs on the VPS, which is **public-data-only** (`office/setup-vps.md`, PDPL
> boundary). It ingests/diffs the public corpus and rebuilds indexes; it never touches
> personal data. Output artifacts are deployed; no user data crosses the boundary.

---

## 1. The two freshness clocks

| Source class | Cadence | Constraint |
|---|---|---|
| AIP (aerodromes, charts, AIS) | every 28-day AIRAC cycle | must show effective date + "not for operational use" |
| GACAR Parts | irregular amendments | must track amendment number / date and re-ingest on change |
| Reference shelf (handbooks, ICAO refs, FAA) | rare | low-priority diff |

Each artifact in `assets/data/` and the RAG corpus (`functions/rag/_chunks.json.gz`) carries
**provenance metadata** so freshness is a property of the data, not tribal knowledge.

## 2. Provenance metadata (added to every corpus item)

```jsonc
{
  "source_id": "gacar-part-61",
  "source_class": "gacar",          // gacar | aip | reference
  "source_url": "https://gaca.gov.sa/...",   // canonical official copy
  "fetched_at": "2026-05-30T00:00:00Z",
  "effective": { "airac": "2026-06", "from": "2026-06-11" }, // aip only
  "amendment": "Amdt 3 (2025-11)",   // gacar only
  "content_hash": "sha256:…",        // drives change detection
  "verified_cycle": "2026-05"        // last cycle a human/CI confirmed currency
}
```

## 3. Pipeline stages (cron on the VPS)

1. **Fetch** — pull the canonical official copies for each tracked source.
2. **Hash & diff** — compare `content_hash` against the last build. Unchanged → skip. Changed
   → flag for re-ingest. AIP sources are checked on the AIRAC calendar regardless of hash.
3. **Re-ingest** — re-parse → chunk → re-embed only the changed sources (incremental, not a
   full rebuild). Reuse the existing Phase 2 ingestion code (`assistant/rag.py`,
   `functions/rag/`).
4. **Stamp** — write/refresh the provenance block and bump `verified_cycle`.
5. **Validate** — run the eval harness (`evals/`) against the rebuilt corpus; a citation that
   no longer resolves to a live section **fails the build** (ties to Phase 10's CI eval gate).
6. **Publish** — deploy refreshed `assets/data/` + the rebuilt RAG index; tag the deploy with
   the AIRAC cycle.

```
fetch → hash/diff → [changed?] → re-ingest → stamp → eval-gate → publish
                       │no
                       └────────────────────────────────→ skip (log "current")
```

## 4. The user-visible guarantee (the marketing surface)

- **A freshness stamp on every reader page**: "GACAR Part 61 — Amdt 3, verified AIRAC 2026-05"
  / "AIP AD — effective AIRAC 2026-06 · not for operational use." Reuse the existing AIRAC
  calculator tool's cycle logic.
- **A staleness banner**: if `verified_cycle` is older than the current AIRAC cycle for an
  AIP-class item, the page auto-shows "verification pending for the current cycle — confirm
  against the official AIP."
- **A public status line** ("Corpus current as of AIRAC YYYY-CC") on the library hub.

This is the differentiator: *always current, verified every cycle, with the date on the page* —
a claim a single manual maintainer cannot credibly make and a competitor can then market
against. The automated diff + stamp + eval-gate is what makes it true rather than aspirational.

## 5. Captain Adel integration

- Retrieval prefers the freshest chunk; superseded chunks are excluded from the index, not
  merely down-ranked.
- The system prompt already cites the exact Part; extend citations to include the
  **amendment / AIRAC stamp** so an answer is dated, not just sourced.
- The eval harness gains a **staleness case class**: an answer citing a superseded source is a
  hard failure, alongside the existing citation/refusal/injection cases.

## 6. SLA (the commitment the pipeline lets us keep)

| Source class | Refresh target |
|---|---|
| AIP-class | re-verified within **the first 72h of each new AIRAC cycle** |
| GACAR | re-ingested within **7 days** of a detected amendment |
| Reference | best-effort, monthly diff |

## 7. What to build, in order

1. Add the provenance block to the corpus schema + backfill existing items.
2. The fetch + hash/diff job (change detection) — the cheapest, highest-value first step.
3. The reader-page freshness stamp + staleness banner (user-visible win, small effort).
4. Incremental re-ingest wired to the diff output.
5. The staleness eval case + CI gate (pairs with Phase 10's CI eval work).
6. The public "current as of AIRAC" status line.

Steps 1–3 alone convert the weakness into a marketed strength; 4–6 make the guarantee
self-sustaining.
