---
title: Content Integration Plan — the 40-file upload
section: 06-operations-it
doc_type: plan
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Content Integration Plan — the 40-file upload

**Created:** 2026-05-23 · **Status:** Plan — awaiting go-ahead
**Companion to:** `roadmap.md` (Phase 2). Not legal advice.

You uploaded 40 HTML files — a large slice of an earlier Fly GACA build. This
document audits every file, sorts them into three workstreams, and lays out a
phased plan to fold them into the current site.

**Design decision (locked):** every imported page is **restyled into the current
design system** — `tokens.css` + `base.css`, the Falcon palette, the Cairo
typeface. The uploads use an older system (Inter Tight, a different token set,
and they reference CSS/JS files that aren't in this repo — `flygaca.css`,
`tools-theme.css`, `command-palette.js`, `top-loader.js`, `consent.js`). None of
them will be dropped in as-is.

---

## The audit at a glance

| Group | What | Files | Destination |
|---|---|---:|---|
| **A — Topical eBooks** | GACAR topical handbooks + front-matter | 21 | The Library (new section) + Captain Adel's corpus |
| **B — Tool pages** | Interactive flight tools | 12 | `tools/` — restyled |
| **C — Guide pages** | Plain-language licensing guides | 7 | A new "Guides" section |
| | | **40** | |

---

## Group A — Topical eBooks → the Library (21 files)

These are GACA's **topical compilations** — the other half of the regulatory
library. The site today holds the 74 numbered GACAR Parts; it does **not** hold
these topical books, even though the Captain Adel system prompt already promises
them. They are already structured as readable documents (a Contents list, then
numbered `<section>` blocks) — the same shape the 74 Parts had before
preprocessing.

### A.1 — Topical handbooks (18)

| Document | Size | Sections |
|---|---:|---:|
| Air Operator & Air Agency — Administration | 4.0 MB | 649 |
| Surveillance | 1.66 MB | 319 |
| Air Navigation Services — Certification & Administration | 1.46 MB | 308 |
| Air Operator — Operational Approvals | 1.34 MB | 152 |
| Authorizing Documents | 1.21 MB | 269 |
| Airmen — Certification | 1.05 MB | 193 |
| Aerodromes, Heliports, Vertiports & Water Aerodromes — Administration | 996 KB | 206 |
| Safety Management Systems — General | 894 KB | 196 |
| Air Operator & Air Agency — Certification | 798 KB | 139 |
| Designees — Appointment & Management | 685 KB | 138 |
| Aircraft & Equipment — Certification | 395 KB | 63 |
| CORSIA — Carbon Offsetting & Reduction Scheme | 377 KB | 45 |
| Compliance Enforcement | 356 KB | 53 |
| Miscellaneous | 329 KB | 37 |
| Unmanned Aircraft Systems | 303 KB | 67 |
| General Guidance & Information | 283 KB | 39 |
| Ground Services | 273 KB | 37 |
| Foreign Air Operators — Authorization | 45 KB | 5 |

### A.2 — Front-matter & reference (3)

| Document | Size | Note |
|---|---:|---|
| Change History (v104) | 54 KB | **Wire to Captain Adel's `list_changes` tool** — the RAG retriever already looks for a `change-history` document; this is it. |
| Foreword (v5) | 35 KB | The regulatory preamble — legal basis, ICAO compliance, amendments. |
| GACARs Map (Nov 2024) | 34 KB | A cross-reference map of the GACAR structure. |

**Scale:** ~18 MB of HTML, ~2,800 sections — comparable to the 74 Parts already
in the library. This roughly **doubles the library** and meaningfully widens what
Captain Adel can cite.

### Integration steps (Group A)

1. **Preprocess** each of the 21 files — the same pipeline used for the 74 Parts:
   strip the page chrome (topbar, search, progress bar, inline CSS), keep the
   `<section>`/`<h2>`/`<h3>`/`<p>`/table content, run the OCR-noise filter,
   emit a clean reader fragment to `assets/data/ebooks/<slug>.html`.
2. **Build an index** — `assets/data/ebooks-index.json` (same shape as
   `gacar-index.json`: slug, title, badge, category, section outline with
   anchors).
3. **Add a Library section** — the library is three-section today (Regulations ·
   Aerodromes · Charts). Add a fourth: **"Handbooks"** (or fold into Regulations
   — see open decisions). Wire `library.html` + `library.js` to load the new
   index; the existing full-text search should index it too.
4. **Reader** — `document.html` already renders Part fragments; point it at the
   new `type=handbooks` fragments. Minimal change.
5. **Rebuild the RAG corpus** — re-run the chunk builder over the 74 Parts **plus**
   the 21 eBooks → a new `functions/rag/_chunks.json.gz`. Tag the Change-History
   chunks so `list_changes` resolves.
6. **Redeploy** — hosting (new library content) and, once it's live, the Cloud
   Function (new corpus).

**Effort:** the largest workstream. Preprocessing is scripted, but the big files
(Air Operator Administration at 649 sections) will need spot-checking for
extraction quality.

---

## Group B — Tool pages → `tools/`, restyled (12 files)

Your own interactive tools — fully built, bilingual (EN/AR), with real Saudi
data. They use the old design system and reference missing assets, so each is
**rebuilt on the current `tools.css` design** (the same one the four live tools
use).

| Tool file | Title | Status now |
|---|---|---|
| `vfr.html` | VFR Saudi — Quick Card | I built a version; **replace** with restyled yours |
| `airspace.html` | Saudi FIR Viewer | I built a version; **replace** with restyled yours |
| `chart-symbols.html` | Chart Symbols Trainer | I built a version; **replace** with restyled yours |
| `wb.html` | Weight & Balance | I built a version; **replace** with restyled yours |
| `aerodromes.html` | Aerodrome Cards | New — restyle & add |
| `flightplan.html` | ICAO FPL Builder | New — restyle & add |
| `loa.html` | OERK ⇄ OETH LoA | New — restyle & add |
| `metbrief.html` | MET + Hazard Briefer | New — restyle & add |
| `notam-decoder.html` | NOTAM Decoder | New — restyle & add |
| `procsep.html` | Procedural Separation (ICAO Doc 053) | New — restyle & add |
| `route-planner.html` | Route Planner | New — restyle & add |
| `saelpt.html` | SAELPT Practice | New — restyle & add |

### Integration steps (Group B)

1. For each tool: port the markup and logic, swap the old CSS for `tools.css`
   classes, re-wire the EN/AR language toggle to the site's existing
   `lang-toggle`, drop the missing-file `<script>` references.
2. **Content reconciliation** — your `vfr.html` and the GACAR §91.165 text in the
   corpus differ slightly (ICAO-metric vs the imperial cloud distances in the
   Part 91 table). Where a tool states a regulatory number, reconcile it against
   the GACAR source and cite the section.
3. Update the **tools hub** — all 12 move from "Soon" to "Live"; drop the
   six-placeholder note.
4. Add each tool to `sw.js` precache; bump the service-worker version.
5. The bilingual `data-en`/`data-ar` content is a head start on the Phase 4
   Arabic work — keep it.

**Effort:** medium. Twelve self-contained pages; the logic is already written,
the work is the restyle and the asset re-wiring.

---

## Group C — Guide pages → a new "Guides" section (7 files)

Plain-language, SEO-friendly explainers — a content type the current site does
not have. They carry a fuller site navigation (Exam Prep, Ground School, For
Schools, Pricing) from the earlier build.

| Guide file | Title |
|---|---|
| `index.html` | The Aviator's Guide to GACA — the guides hub |
| `saudi-ppl-requirements.html` | Saudi PPL Requirements 2026 |
| `saudi-cpl-requirements.html` | Saudi CPL Requirements 2026 |
| `saudi-instrument-rating.html` | Saudi Instrument Rating 2026 |
| `foreign-license-conversion-to-gaca.html` | Foreign Licence Conversion to GACA |
| `gaca-medical-class-1.html` | GACA Class 1 Medical 2026 |
| `icao-english-saelpt.html` | ICAO English & SAELPT 2026 |

### Integration steps (Group C)

1. Decide placement — a `guides/` directory with its own hub, mirroring `tools/`.
2. Restyle each to `tokens.css` + `base.css` + a new `guides.css`.
3. Trim the navigation down to the site's real nav (Library · Captain Adel ·
   Tools · Guides · About) — the uploads reference pages that don't exist yet
   (Pricing, Dashboard, For Schools belong to Phase 3/5).
4. These overlap content with the licensing handbooks — each guide should link
   through to the relevant eBook section so the guide is the friendly front door
   and the eBook is the authority.

**Effort:** medium. Seven content-heavy pages; mostly a restyle plus nav cleanup.

---

## Recommended sequence

**A → B → C.** Reasoning:

- **Group A first** — it is the biggest value gain and it directly serves
  Captain Adel: the topical books are the corpus he is missing. It also closes a
  promise the system prompt already makes.
- **Group B second** — the four live tools become twelve; self-contained, low
  risk, and they make the tools hub whole.
- **Group C last** — guides depend on the eBooks existing (they link into them)
  and introduce a new section that is really Phase 3 territory.

Each phase ends with a verification pass (Playwright screenshots, link checks)
and a redeploy.

---

## Open decisions for you

1. **Library shape** — add a fourth section **"Handbooks"** to the library, or
   fold the topical books into the existing **Regulations** section as a second
   document type? A separate section keeps the numbered Parts uncluttered.
2. **Guides placement** — a new top-level **"Guides"** nav item, or keep guides
   under a quieter link until Phase 3?
3. **Content currency** — the Change History is *v104*, the GACARs Map is dated
   *Nov 2024*. Are these the latest GACA editions, or should fresher copies be
   sourced before they go live? (Affects the freshness line shown to readers.)
4. **Corpus rebuild & redeploy** — rebuilding `_chunks.json.gz` with the eBooks
   means redeploying the Cloud Function, which is gated on the Blaze plan. The
   library content can ship to Hosting before the function is upgraded; Captain
   Adel just won't cite the new books until the function redeploys.
5. **The four tools I already built** — confirmed for replacement by restyled
   versions of yours. Your versions are bilingual and carry researched Saudi
   data; I'll reconcile any regulatory numbers against the GACAR corpus as I go.

---

## Effort summary

| Phase | Workstream | Relative size | Gated by |
|---|---|---|---|
| A | 21 eBooks → Library + corpus | Large | Decision 1; corpus redeploy needs Blaze |
| B | 12 tools → restyled | Medium | Decision 5 (confirmed) |
| C | 7 guides → new section | Medium | Decision 2 |

Nothing here is blocked from *starting* — Group A can begin as soon as the
library-shape decision (1) is made.

*Living document — update as the integration proceeds.*
