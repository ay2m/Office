---
description: Run the doc gate and fix what it reports — front-matter, PDF coverage, staleness
allowed-tools:
  - Bash
  - Read
  - Edit
  - Glob
---

```bash
node tools/print/check.mjs
```

Dependency-free, no browser, safe to run any time. It fails on four things:

1. **Front-matter** — every content `.md` carries all seven keys. Exemptions:
   the root `README.md` skips the front-matter check only (its PDF must still
   exist and be fresh); anything under a `templates/` directory needs a
   front-matter block but only `title` inside it; `tools/**` and `_print/**` are
   never walked, and neither is `.claude/**`.
2. **Print coverage** — every walked `.md` has a PDF under `_print/`.
3. **Staleness** — the `.md`'s content hash matches `.buildcache.json`, i.e.
   its PDF was rebuilt after the last edit.
4. **Brand HTML** — each self-contained `.html` rendered by `build-html.mjs`
   has its PDF.

## Fixing it

```bash
cd tools/print
npm ci                 # if node_modules is missing
npm run build          # incremental — only content-changed docs re-render
node build-html.mjs    # renders ALL the HTML pages
npm run build:force    # only when you genuinely need a full rebuild
```

Commit the PDFs and `.buildcache.json` with the source change.

## The trap

**Editing `build.mjs` marks every PDF stale**, because its own bytes fold into
the shared `themeHash`. For a change that genuinely alters rendering, rebuild.
For one that cannot (a `SKIP_DIRS` entry, a comment, a log line), re-stamping
all 250-odd PDFs is pure churn — Chromium restamps `CreationDate` on every one.
Instead recompute `sha256(themeHash + source)` per existing key in
`.buildcache.json` and write it back with
`JSON.stringify(cache, null, 1) + '\n'`. Verify with `node check.mjs` **and** a
clean `git status _print/`.

Report what the gate said before and after, and paste the final line.
