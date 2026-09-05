---
title: Contributing to The Office
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Contributing to The Office

This guide is for **this repository** — `iflygaca/Office`, the internal documents repo.
(The application repos have their own contributing guides; setup steps and `npm run check:*`
commands for the web app do **not** apply here.)

**Start with the root [`CLAUDE.md`](../CLAUDE.md)** — it is the source of truth for this repo's
structure and conventions. This file is the short operational companion to it.

## What a contribution looks like here

There is no application code in this repo. A change is almost always one of:

- **Drafting or editing a document** — a policy, contract draft, playbook, spec, or runbook (`.md`).
- **Updating a deliverable** — a `.docx` / `.xlsx` / `.pptx` produced offline and committed as a binary.
- **Reorganizing** — renaming, moving, or re-indexing files (update [`_INDEX.md`](../_INDEX.md)
  and, if the Arabic mirror is affected, `ar/` in the same change).

## Conventions that are load-bearing

- **Not affiliated with GACA.** Fly GACA is an independent educational platform. Never imply
  official GACA status in any document, and never fabricate a regulatory citation — link or name
  the official GACA source instead.
- **Front-matter on every `.md`.** Every content Markdown file carries the standard YAML block
  (`title / section / doc_type / status / owner / last_updated / lang`). Files under any
  `templates/` directory need only a `title` key. The root `README.md` is exempt from the
  front-matter check only.
- **Rebuild the PDF with every `.md` edit.** Each `.md` has a print-ready PDF under `_print/`.
  Regenerate before committing:
  ```bash
  cd tools/print
  npm ci            # once, or after a dependency change
  npm run build     # incremental — only changed docs re-render
  ```
  Commit the regenerated PDF and the updated `tools/print/.buildcache.json` **together with**
  the `.md` change. HTML pages render separately via `node build-html.mjs`.
- **Bilingual discipline.** New or materially changed content docs should eventually get an `ar/`
  counterpart at the same path, translated per [`ar/_GLOSSARY.md`](../ar/_GLOSSARY.md). CI does
  not hard-gate EN/AR parity, but don't let the mirror drift silently.
- **Sensitive content.** Legal, financial, HR, and investor documents here are real operating
  material. Quote or restate the minimum necessary in commit messages, PR descriptions, and
  external tools.
- **Naming.** Filenames are lowercase ASCII kebab-case, including under `ar/`. Dates in filenames
  use `YYYY-MM-DD`. See the naming convention in
  `06-operations-it/repo-health-report-2026-06-16.md` §6.

## Before you open a PR

The pre-PR gate for this repo is the docs checker — the same thing CI runs
(`.github/workflows/docs-check.yml`):

```bash
cd tools/print
node check.mjs    # front-matter + Markdown↔PDF coverage + staleness + HTML↔PDF coverage
```

It exits non-zero on any violation. No browser is needed for the check itself.

## Pull requests

- Keep changes focused; describe what changed and why.
- All CI checks must be green.
- By contributing, you agree your contributions are licensed under the
  [Apache License 2.0](LICENSE). Regulatory **content** quoted anywhere belongs to GACA and is
  not covered by that license.

## Reporting issues

For anything that could be a security or data-isolation concern — a leaked secret, an over-broad
share link, a document that should not have been committed — do **not** open a public issue.
Email the maintainer privately at **ay2m@hotmail.com** (see [`SECURITY.md`](SECURITY.md)).
