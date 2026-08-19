---
title: P0-5 Walkthrough — Create the Firebase project (retired)
section: 06-operations-it
doc_type: setup-guide
status: draft
owner: Founder
last_updated: 2026-08-19
lang: en
---

# P0-5 Walkthrough — Create the Firebase project (retired)

> [!WARNING]
> **Retired 2026-08-19 —** there is no Firebase project. The product was ported off Firebase
> entirely: no Hosting, no Auth, no Cloud Functions, no Firestore, no App Check, no Blaze/Spark
> plan. The projects this walkthrough would have created (`flygaca-firebase`, later
> `flygaca-app`) are deleted, and the Firebase console is not a surface anyone here uses.
>
> **What replaced it:** a plain Google Cloud project — Cloud Run (the Express API), Cloud SQL for
> PostgreSQL (the datastore), a Cloud Storage bucket behind an HTTPS load balancer (the SPA),
> Secret Manager, and Cloud Scheduler — all in **`me-central2` (Dammam)**.
>
> **Go to instead:** `docs/RUNBOOK-deploy.md` in [`ay2m/FlyGACA`](https://github.com/ay2m/FlyGACA)
> for the real provisioning sequence, and
> [`../hosting-facts.md`](../hosting-facts.md) for the one-page picture of what runs where.

## What is still true from this page

Only one thing, and it survived the port: **the region decision.** Personal data stays in the
Kingdom, so Cloud SQL, Cloud Run and the buckets are all `me-central2` (Dammam). `me-central1` is
Doha, Qatar — it is **not** in-Kingdom and must never be described as PDPL-safe.

Everything else on this page — Firestore location lock-in, Authentication, App Check, Hosting, the
Blaze upgrade — describes services the product does not use.

## What P0-5 now means

P0-5 in [`../../00-strategy/phase0.md`](../../00-strategy/phase0.md) reads as "create the managed
cloud project". That is still a real task; it is just a Google Cloud project rather than a Firebase
one, and the sequence lives with the code. Record the resulting project ID and the confirmed region
against P0-5 as before.

> [!NOTE]
> `00-strategy/phase0.md` still narrates the Firebase-era project history (`flygaca-firebase`,
> `flygaca-app`, the Firestore region incident). That is a dated record of what happened and is
> left as written — but do not read it as current infrastructure.
