---
description: Run the family's security surface repo by repo — secrets, headers, write paths, injection posture, dependencies
argument-hint: [office|flygaca|captain-adel|all]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Skill
---

Sweep `$1` (default `all`). This is an audit: read, verify, report. Fix only
what is unambiguous and small, and never weaken a control to make a check pass.

## Everywhere

- **Secrets.** No live credential in any tracked file. `ay2m/Captain-Adel`'s
  `.env.example` is committed and is meant to hold **placeholders only** — it
  currently ships a real-looking `GEMINI_API_KEY` (added in `75e6003`); that key
  should be rotated and the line blanked. Check for new instances rather than
  re-reporting only that one. The vendored `implementing-secret-scanning-with-gitleaks`
  skill in `ay2m/Captain-Adel` carries the scanning workflow.
- **Dependencies.** `npm audit --omit=dev` in each package (report-only in CI —
  read it, don't assume someone did).
- **Sensitive content.** `ay2m/Office` holds real legal, financial, HR and
  investor material. Never quote it into another repo, a PR body, or an external
  tool beyond what the task needs.

## `ay2m/FlyGACA`

- **Security headers live in `config/headers.json` and nowhere else.**
  `tests/headers-parity.test.ts` holds the dormant Vercel/Netlify mirrors and
  the live `firebase.json` front to that file — but it **cannot see the live
  load balancer**, which needs `npm run -s headers:gcloud` applied to both the
  backend bucket and the backend service. Until that runs, the canonical front
  serves no CSP and no HSTS.
- **Entitlement write paths.** The `entitlements` table is written only by
  `routes/billing.ts` and `routes/grants.ts`. Grep for any new route that lets a
  client write its own plan, credits or pack ownership — structurally, there
  must be none. Grants only ever upgrade (`mergeUpward`), and a domain / staff /
  student match is honoured only for a **verified** email.
- **Fulfilment re-derives** kind and amount from the stored `checkout_intents`
  row, never from the callback URL. A promo code is a string from the client,
  never a price.
- Keep every API surface under `/api/*`, so the same-origin proxy rewrites hold
  and `connect-src 'self'` never has to be widened.

## `ay2m/Captain-Adel`

- **The CSP is tight and hand-maintained** in `src/server.js`. Any new
  third-party asset needs an explicit edit; the deliberate exceptions are
  gstatic/apis.google.com (Firebase Auth) and cdn/api.moyasar.com. Diagrams from
  the vendored diagram skill are `docs/` artefacts — moving one under `public/`
  would require a CSP edit first.
- **Route ordering**: the billing webhook mounts `express.raw` **before** the
  global `express.json`. Reordering silently breaks signature verification.
- **Firestore is blanket-deny**; the browser never opens it directly. Payment
  markers are tombstoned, not deleted — that is the webhook-replay guard.
- **Injection posture.** Suspicious turns are **flagged** (a hardening note is
  appended to the system instruction), not rejected, and `/v1/chat` never 401s
  on bad auth — it downgrades to anonymous. Both are deliberate; do not "fix"
  them. The vendored skills — `detecting-indirect-prompt-injection`,
  `testing-prompt-injection-in-rag-pipelines`, `testing-for-system-prompt-leakage`,
  `defending-llms-with-guardrails`, `securing-agentic-ai-tool-invocation`,
  `performing-security-headers-audit`, `testing-api-security-with-owasp-top-10` —
  are the playbooks for testing this surface.

## `ay2m/Office`

- Security and data-isolation concerns go to the maintainer directly per
  `01-governance/SECURITY.md` — **not** a public issue.
- `node tools/print/check-facts.mjs` asserts the IBAN and account number are
  absent from the shared manifest. Run it.

## Report

Finding · repo · evidence (file:line) · severity · recommended fix. Separate
**confirmed** from **suspected**. If a check could not run here, say so — a
sweep that quietly skipped the load balancer is how "we have a CSP" became true
in a test and false in production.
