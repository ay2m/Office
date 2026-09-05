---
title: Runbook — Launch Fly GACA
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Runbook — Launch Fly GACA

Taking the product live. The mechanical deploy sequence is **not** duplicated here — it lives with
the code, in `docs/RUNBOOK-deploy.md` in [`iflygaca/FlyGACA`](https://github.com/iflygaca/FlyGACA). This
page is the launch wrapper around it: what ships, the gates that must be green first, the smoke
test, and the commercial/legal switches that are ours rather than the deploy tool's.

Everything below needs your own Google Cloud, GitHub and Moyasar logins, so it runs on your
machine, not from an assistant session.

---

## What ships

One Vite build (`dist/`) plus one Express service:

- **The regulatory library** — GACAR parts, handbooks, aerodromes, charts, the aerodrome map, and
  the corpus change feed.
- **Captain Adel** — the RAG chat, cited to the exact Part/section. See
  [`runbook-captain-adel.md`](runbook-captain-adel.md).
- **55 flight tools**, the Kingdom Airspace HUD, the learn/guides hub, and the study surfaces
  (quiz, flashcards, ground school, mock exam, paths, exam-prep packs, study sheets).
- **Accounts** — dashboard, logbook, currency, records, settings — with sign-in by email/password
  or Google.
- **Commercial surfaces** — pricing, schools, checkout, the B2B org-admin cohort dashboard, and the
  licensed Captain Adel API page.

The SPA is served from a Cloud Storage bucket behind an HTTPS load balancer; `/api/*` goes to the
Cloud Run service, backed by Cloud SQL. All in `me-central2` (Dammam). See
[`../hosting-facts.md`](../hosting-facts.md).

---

## 1 — Gates that must be green before you deploy

Run these from a clean checkout of `iflygaca/FlyGACA`:

```sh
npm run verify        # typecheck → lint → format:check → test → build → check:bundle → check:perf
npm run test:e2e      # Playwright, incl. accessibility
```

The server is its own npm package with its own gate — the root `verify` does **not** cover it:

```sh
cd server && npm run lint && npm test && npm run build
```

Two of those gates are launch-relevant in their own right: `check:bundle` fails if the initial
gzipped JS exceeds its budget, and the i18n parity test fails on any string present in one language
but not the other — a half-translated launch cannot ship by accident.

---

## 2 — Deploy

Follow `docs/RUNBOOK-deploy.md` in the product repo, in its order. In outline:

1. Provision (or confirm) the Google Cloud project, the Cloud SQL instance, the OAuth client, the
   Secret Manager entries and the Cloud Scheduler renewal job.
2. Apply pending schema migrations before the new revision serves traffic.
3. Deploy the API to Cloud Run — **set every price you intend to sell**; an unset price makes that
   checkout kind fail loudly rather than charge SAR 0.
4. Build the SPA against the API origin and sync `dist/` to the bucket.
5. Confirm the load balancer routes `/*` to the bucket and `/api/*` to the Cloud Run service.

> [!IMPORTANT]
> Keep every new API surface under `/api/*`. The Cloudflare Worker and the Netlify / Vercel mirrors
> all proxy `/api/*` back to the same Cloud Run origin as a same-origin rewrite — that is what keeps
> the session cookie same-site and the CSP at `connect-src 'self'`.

### Domains

`flygaca.com` is canonical and `api.flygaca.com` is the API origin. The mirrors send
`X-Robots-Tag: noindex` for any host that isn't `flygaca.com`, so a preview host cannot get indexed
by mistake. `flygaca.sa` stays redirect-only and waits on the name opinion — see
[`../hosting-facts.md`](../hosting-facts.md).

---

## 3 — Post-deploy smoke test

On the live origin:

- Home (the bento dashboard) renders, and the command palette opens and navigates.
- `/library` loads; open a GACAR Part and a chart; `/library/map` draws aerodromes; `/updates`
  lists corpus changes.
- `/chat` answers a GACAR question **with citations that deep-link into the library**, and the
  free-tier counter behaves (5 questions per day).
- A few tools compute and their **copy-link** buttons produce a URL that restores the inputs — that
  is the check that a page is on the URL-state hook rather than local state.
- A study quiz runs; the mock exam times and scores; progress persists across a reload.
- Sign up → verify by email → sign in with Google → write a logbook entry → see currency update.
- `/pricing` → `/checkout` with a live Moyasar key: complete one real low-value purchase, confirm
  the return leg grants the entitlement, then confirm the webhook does **not** double-grant.
- Switch to Arabic: the document flips to RTL, and no key renders as literal text.
- A made-up URL shows the branded 404, and the app still works offline for the library after a
  first visit.

Watch the Cloud Run logs through the first hour: `GET /healthz` returns 503 until the database
answers, so an early 503 means the database, not the app.

---

## 4 — The commercial switches

These are decisions, not deploy steps, and they are the ones that actually make launch *launch*:

- **Pricing is live on the server.** Prices are set on the Cloud Run revision (Pro SAR 79/mo ·
  649/yr; Exam Season Pass SAR 299 / 90 days; packs 249 / 399 / 499; bundle 1,499; credits 39;
  B2B Cohort 12,000/yr) and the free tier is the full library, all 55 tools, and 5 Captain Adel
  questions per day. Confirm the live values against
  [`../../03-finance/`](../../03-finance/) before announcing.
- **Entitlement is server-owned.** There is no client-side "everything is free" flag to remember to
  turn off — the app reads entitlements only to gate UI, and no route lets a client write its own
  plan. Grants (staff, school seats, founding) only ever upgrade.
- **Promo codes** are validated server-side and apply to the first charge only.
- **ZATCA** — VAT registration and Fatoora e-invoicing must be in place before you take money; see
  [`../../04-compliance-ksa/`](../../04-compliance-ksa/).

---

## 5 — Pre-launch reminders

- The **legal pages** (Disclaimer, Terms, Privacy Notice, Refund) need Saudi counsel's sign-off
  before a public announcement.
- The **GACAR / AIP redistribution position** (P0-1) should be confirmed by counsel.
- The **PDPL DPIA** covers personal data in the logbook and account area — it is a launch gate, not
  a follow-up.
- The not-affiliated disclaimer is a component, not a string to reword. It must stay visible on
  every regulatory surface.

*Part of the Fly GACA launch walkthrough. Not legal advice.*
