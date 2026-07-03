---
title: Contributing to Fly GACA
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-03
lang: en
---

# Contributing to Fly GACA

> **Vendored copy** — this is the application repo's (`FlyGACA/flygaca`) contributing guide,
> kept here for reference. Setup steps and paths refer to that repo's layout, not to this
> documents repo.

Thanks for your interest in improving Fly GACA — an independent, educational platform and open
regulatory library for Saudi civil aviation. This guide covers how to get set up, the
conventions that are load-bearing here, and the checks every change must pass.

**Start with [`CLAUDE.md`](CLAUDE.md)** — it is the source of truth for the architecture and the
project conventions. This file is the short operational companion to it.

## Getting set up

```bash
npm install
# the site is a no-build static PWA — just serve it over HTTP:
python3 -m http.server 8000      # then open http://localhost:8000/flygaca.html
```

Pages fetch JSON from `assets/data/` at runtime, so they must be served over HTTP — opening a
file directly (`file://`) will not work. To exercise Captain Adel locally, use the Firebase
emulator (`firebase emulators:start`).

## Conventions that are load-bearing

These are not style preferences — breaking them breaks the product:

- **Not affiliated with GACA.** Every user-facing surface reinforces one rule: verify against the
  latest official GACA publication. The product helps you find and study regulation, it never
  replaces it. Never imply official GACA status, and never fabricate a regulatory citation.
- **Bilingual + RTL.** English/العربية is a first-class requirement. New user-facing copy needs
  **both** an `data-en` and a matching `data-ar` (enforced by `npm run check:i18n`).
- **Never hand-edit the shared chrome.** The `<header class="site-nav">` and
  `<footer class="site-footer">` blocks are generated. Edit `partials/header.html` /
  `partials/footer.html`, then run `npm run build:chrome`. CI fails if pages drift.
- **Entitlements are server-only.** Clients may never write the `entitlement` field; paid access
  is granted exclusively by Cloud Functions via the Admin SDK. Don't add client-side bypasses.
- **Service worker freshness.** If you change cached assets, bump the version in `sw.js`.
- **Security headers / CSP** live in `firebase.json`. New external origins must be added there
  explicitly.

## Before you open a PR

Run the checks CI will run. Each exits non-zero on a violation:

```bash
npm run check:data       # library index counts + the README headline figures
npm run check:i18n       # bilingual parity (every data-en has a data-ar)
npm run check:links      # internal links, firebase routes, sw precache, sitemap
npm run check:chrome     # shared header/footer in sync across all pages
npm run test:unit        # fast node --test units (no external deps)
npm test                 # Playwright E2E (smoke-loads every page + key flows)
```

If you touched library content, update the counts in `scripts/check-data.js` **and** the table in
[`README.md`](README.md) together — the guard exists to keep them in sync.

Optional code style (not yet enforced in CI):

```bash
npm run format:check     # Prettier, scoped to source
npm run format           # auto-fix
```

An [`.editorconfig`](.editorconfig) is provided; please keep files LF-terminated, UTF-8, with a
final newline.

## Pull requests

- Keep changes focused; describe what and why. Fill out the
  [pull request template](.github/pull_request_template.md).
- All CI checks must be green.
- By contributing, you agree your contributions are licensed under the
  [Apache License 2.0](LICENSE). Note that the regulatory **content** in this repo belongs to GACA
  and is not covered by that license (see [`NOTICE`](NOTICE)).

## Reporting issues

Use the issue templates under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/). For anything
that could be a security or data-isolation concern, please do **not** open a public issue — email
the maintainer at ay2m@hotmail.com instead.
