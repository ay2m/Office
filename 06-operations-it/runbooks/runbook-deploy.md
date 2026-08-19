---
title: Runbook — Deploy Fly GACA (superseded; pointer to the product-repo runbook)
section: 06-operations-it
doc_type: runbook
status: draft
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Runbook — Deploy Fly GACA (superseded)

> [!WARNING]
> **Retired 2026-08-19 —** this runbook deployed a static, no-build PWA to **Firebase Hosting**
> with `firebase deploy --only hosting`. None of that exists any more: there is no Firebase
> project, no `firebase.json`, no `.firebaserc`, no `sw.js` version to bump by hand, and the
> `flygaca-firebase` project is deleted. Do not run a single command from the old version of this
> page.
>
> **What replaced it:** a Vite build (`dist/`) published to a **Cloud Storage** bucket behind an
> **HTTPS load balancer**, with `/api/*` routed to an **Express 5 service on Cloud Run** backed by
> **Cloud SQL for PostgreSQL** — all in **`me-central2` (Dammam)**.
>
> **Go to instead:** `docs/RUNBOOK-deploy.md` in
> [`ay2m/FlyGACA`](https://github.com/ay2m/FlyGACA). That is the authoritative, maintained
> sequence — it lives with the code, so it cannot drift from the Dockerfile, the env vars or the
> migration runner. [`../hosting-facts.md`](../hosting-facts.md) is the one-page summary of what
> runs where.

## Why this file still exists

[`../hosting-facts.md`](../hosting-facts.md) links here as the Office-side entry point for
"how does this thing get deployed". It is a **signpost, not a mirror** — deliberately, because a
copied deploy sequence in a documents repo goes stale the first time the Dockerfile changes.

## The shape of a deploy, for orientation only

| Step | Where it happens |
|---|---|
| Provision the project, Cloud SQL instance, OAuth client, Secret Manager entries | Google Cloud, once |
| Apply the schema | `server/migrations/`, via the forward-only migration runner |
| Deploy the API | `gcloud run deploy` from the repo root — prices and secrets are set on the revision |
| Publish the SPA | `npm run build`, then sync `dist/` to the bucket |
| Front it | HTTPS load balancer: bucket backend on `/*`, serverless NEG on `/api/*` |
| Renewals | Cloud Scheduler → `POST /api/billing/renew` with `CRON_SECRET` |
| Payments | Moyasar webhook + the server-to-server confirm leg |

Two things worth carrying in your head before you open the real runbook:

- **Cloud Run and Cloud SQL must be in the same region** — the service reaches the database over a
  Cloud SQL unix socket, so there is no IP allowlist and no proxy sidecar.
- **A price left unset is not a silent SAR 0** — the checkout kind fails loudly instead. Set every
  price you intend to sell.

There is no one-command deploy, and `npm run deploy` in the product repo deliberately fails with a
pointer to the real runbook.

## Pre-launch reminders that outlived the Firebase era

- The legal pages need Saudi counsel's review before a public announcement (see the lawyer brief in
  `02-legal/`).
- The GACAR / AIP redistribution position (P0-1) should be confirmed by counsel.
- Contact mailboxes route per [`../../02-legal/email-routing.md`](../../02-legal/email-routing.md).
