---
description: Create a document that passes the doc gate first time — front-matter, template, PDF, mirror
argument-hint: <section>/<file-name> "<Title>"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

Create `$1` with title `$2`, in the one shape CI accepts.

## 1. Start from a template

`templates/` holds the starters — `tpl-fin-report.md`, `tpl-hr-policy.md`,
`tpl-legal-memo.md`, `tpl-ops-runbook.md`, `tpl-strat-proposal.md` (mirrored
under `ar/templates/`). Base the new doc on the one that matches, rather than an
existing document that may carry its own drift.

## 2. Front-matter, all seven keys

```yaml
---
title: <doc title>
section: <e.g. 03-finance>
doc_type: <document|readme|template|runbook|brief|...>
status: <active|draft|scaffold>
owner: <e.g. Founder>
last_updated: <YYYY-MM-DD>
lang: <en|ar>
---
```

`status: draft` or `scaffold` stamps a DRAFT/SCAFFOLD watermark on the rendered
PDF — set it deliberately. Filenames stay ASCII kebab-case, including under
`ar/`, so the two trees diff cleanly.

## 3. Rebuild the PDF **in the same commit**

```bash
cd tools/print
npm ci                            # once, or after a dependency change
node build.mjs <path/to/doc.md>   # render one file
node check.mjs                    # the gate itself — cheap, no browser
```

Commit the regenerated PDF **and** the updated `.buildcache.json` alongside the
`.md`. A doc edit without a rebuilt PDF fails `docs-check.yml`; forgetting the
rebuild is the single most common way this repo goes red.

If you added or renamed an `.html` page instead, run `node build-html.mjs` —
same gate, different builder.

## 4. Mirror it

New or materially changed content should get an `ar/` counterpart at the same
path, translated per `ar/_GLOSSARY.md`. CI does **not** hard-gate EN/AR parity
here, so this is discipline, not a build error — and English is authoritative on
any conflict. `/office-docs:ar-sync` walks it.

## 5. Index it

Add the doc to `_INDEX.md` (and `ar/_INDEX.md` for the mirror) if it is
something a reader would look for. Note `_INDEX.md` defers to
`00-strategy/00-master-office-paperwork-index.gsheet` as the authoritative
master index.

Handle content with care: this tree holds real legal, financial, HR and
investor material. Write what the task needs and no more.
