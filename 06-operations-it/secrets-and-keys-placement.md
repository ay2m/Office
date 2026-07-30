---
title: "Secrets & keys — where each one goes (both products)"
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-29
lang: en
---

# Secrets & keys — where each one goes (both products)

One index for **where** every secret, key and price is configured across the two
backends. **No secret values live here** — only names and locations. The
step-by-step is in the authoritative runbooks (linked at the end); this page is
the map on top of them.

## Golden rules

- **Never** put a secret value in git, in chat, or in code. Secrets live only in
  the platform's secret store (Google Secret Manager); the code reads them at
  runtime.
- `VITE_*` variables are **public build-time** values shipped to the browser —
  **not secrets** (publishable keys, reCAPTCHA site key). Safe to expose.
- The IBAN never leaves this repo (see `01-governance/company-facts.md`).

## A) flygaca.com — FlyGACA-app · Firebase Cloud Functions · project `flygaca-app` · region `me-central1`

**Secrets** → `firebase functions:secrets:set NAME` (prompts for the value, stores it in Secret Manager):

| Secret | What / where to get it | Required |
|---|---|---|
| `GOOGLE_GENAI_API_KEY` | Gemini API key — Google AI Studio (aistudio.google.com) | ✅ chat |
| `MOYASAR_SECRET_KEY` | Moyasar dashboard → Developers → API keys (`sk_live_…`) | ✅ billing |
| `MOYASAR_WEBHOOK_SECRET` | Moyasar webhook shared secret | ○ backstop |

**Params (not secrets)** → in `functions/.env.flygaca-app` (or the deploy prompt):

- `APP_ORIGIN=https://flygaca.com` (required — builds the Moyasar callback URL)
- Prices: `MOYASAR_PRICE_PRO_MONTHLY_SAR`, `_PRO_ANNUAL_SAR`, `_STUDENT_MONTHLY_SAR`,
  `_STUDENT_ANNUAL_SAR`, `_PASS_SAR`, `_CREDITS_SAR` (**no default — must set**), `_PREP_PACK_SAR`
- Optional: `ENFORCE_APP_CHECK`, `FREE_DAILY_LIMIT`, `RETRIEVE_K`, `REFUSE_SCORE`,
  `GROUNDED_SCORE`, `CORPUS_URL`

**Public (not secrets)** → root `.env` as `VITE_*`: `VITE_MOYASAR_PUBLISHABLE_KEY`
(`pk_live_…`), `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY`.

**GitHub Actions** (deploy/CI, in repo settings → Secrets): `FIREBASE_SERVICE_ACCOUNT`,
`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

## B) captadel.com — Captain-Adel · Cloud Run · project `captadel-app` · region `me-central2` (fallback `me-central1`)

**Secrets** → Google Secret Manager, via `printf '%s' "VALUE" | gcloud secrets create NAME --data-file=-`, or the batch shortcut `export NAME=… … && ./deploy/deploy.sh secrets`:

| Secret | What / where to get it | Required |
|---|---|---|
| `GEMINI_API_KEY` | Gemini API key — Google AI Studio (same key as flygaca, different name) | ✅ |
| `MOYASAR_SECRET_KEY` · `MOYASAR_PUBLISHABLE_KEY` · `MOYASAR_WEBHOOK_SECRET` | Moyasar dashboard | ✅ billing |
| `MOYASAR_PRICE_MONTHLY_SAR` (35) · `MOYASAR_PRICE_ANNUAL_SAR` (299) | you set | ✅ |
| `CRON_SECRET` | you generate (`openssl rand -hex 32`) — guards the renewals route | ✅ renewals |
| `ADEL_API_KEY` | a shared secret you invent (trusted-tier API) | ○ |
| `ALLAM_*`, `EMBEDDINGS_*`, `RERANK_*` | in-Kingdom Arabic provider / dense retrieval | ○ later |

**Non-secret env** → `--set-env-vars` in `deploy.sh`: `SITE_URL=https://captadel.com`,
`MODEL_PROVIDER`, `ARABIC_PROVIDER`, `ADEL_LAUNCH_MODE`, `ADEL_DAILY_*`.

**GitHub Actions**: `GCP_SA_KEY`.

## Four things to watch

1. **One Gemini key, two names** — `GOOGLE_GENAI_API_KEY` (flygaca) vs `GEMINI_API_KEY`
   (captadel). Same value from Google AI Studio, set in each product's own store.
2. **One Moyasar account, two secret stores + two webhooks** — set the Moyasar keys in
   both stores, and register **two** webhook endpoints in the Moyasar dashboard:
   `https://flygaca.com/api/moyasar-webhook` and `https://captadel.com/v1/billing/webhook`.
3. **Publishable key** — public build var on flygaca (`VITE_MOYASAR_PUBLISHABLE_KEY`),
   but a stored secret on captadel (`MOYASAR_PUBLISHABLE_KEY`, served via `/v1/config`).
4. **No Stripe** — any "Stripe" mention in older docs is stale; both products use Moyasar.

## Authoritative step-by-step

- flygaca.com: `FlyGACA-app/docs/BILLING.md` (secret-setting), `docs/APP-CHECK-BACKEND.md`,
  `docs/RUNBOOK-deploy.md` (CI secrets).
- captadel.com: `Captain-Adel/docs/RUNBOOK-captadel-saas.md` §3 (Moyasar keys, webhook,
  Apple Pay, renewals), `docs/RUNBOOK-captadel-deploy.md` (Gemini + project + deploy).
