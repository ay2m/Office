# Office CI Gates

**Enforces the CI checks that guard document quality in the Office repo.**

## What this does

Validates:
- **Front-matter** — Every `.md` file has exactly the required YAML keys (title, section, doc_type, status, owner, last_updated, lang)
- **PDF coverage** — Every `.md` and `.html` file has a matching, up-to-date PDF under `_print/`
- **Staleness** — PDFs are regenerated when their source changes or when `build.mjs`/`theme.css` is edited
- **HTML coverage** — All 20 brand-HTML pages have built PDFs

## When to use

Before committing any `.md`, `.html`, or `_print/` changes. Run `node tools/print/check.mjs` to verify.

## Commands

```bash
cd tools/print
npm ci                    # once, or after dependency change
npm run build             # rebuild docs that changed
npm run build:force       # rebuild all docs from scratch
npm run check             # run CI gate (alias: node check.mjs)
```

---

*Fly GACA Office | CI Gates Skill*
