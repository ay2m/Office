---
title: "Runbook — PDPL data residency: move to me-central2 (Dammam) — complete"
section: 06-operations-it
doc_type: runbook
status: draft
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Runbook — PDPL data residency: move to me-central2 (Dammam) — complete

> [!WARNING]
> **Retired 2026-08-19 —** the migration this runbook planned is **done**, and it was overtaken by
> a bigger change: the product was ported off Firebase entirely. Every cutover step below
> (Firestore restore, `firebase auth:import`, Cloud Functions secrets, the `flygaca-app` project,
> the Stripe/RevenueCat webhooks, the interim `me-central1` compute) refers to infrastructure that
> no longer exists. Nothing here is runnable, and the "still blocked / needs you" list is not a
> live to-do list.
>
> **The outcome, which is what matters:** personal data and the compute that touches it are in
> **`me-central2` (Dammam)** — Cloud SQL for PostgreSQL and the Cloud Run API, in the same region,
> connected over a Cloud SQL unix socket. The interim `me-central1` (Doha) gap is closed.
>
> **Go to instead:** [`../hosting-facts.md`](../hosting-facts.md) — the PDPL boundary section is
> the current statement of what lives where and why — and `docs/RUNBOOK-deploy.md` in
> [`iflygaca/FlyGACA`](https://github.com/iflygaca/FlyGACA).

## The history, in four lines

Worth keeping, because it is the reason the boundary is stated so bluntly everywhere else:

1. The original project put Cloud Firestore in **`nam5` (US multi-region)** while the public privacy
   notice claimed Dammam. A Firestore location is permanent, so the database could not be moved.
2. A fresh project was created with the database in **`me-central2`**, and the eight personal-data
   records were migrated. Compute ran **interim in `me-central1` (Doha)** because Cloud Run in
   Dammam was not yet available on the account.
3. Cloud Run access in `me-central2` was subsequently granted, closing the processing gap.
4. The whole Firebase estate was then replaced by Cloud Run + Cloud SQL, and those projects were
   deleted.

## The rule that survived all of it

> All personal data — accounts, profiles, the logbook, real user queries — stays in the Kingdom.
> Public corpus work can happen on the EU VPS.

And the correction that must never be lost: **`me-central1` is Doha, Qatar.** It is not Riyadh, not
"the Kingdom box", and not PDPL-safe. `me-central2` (Dammam) is the only in-Kingdom answer.

> [!NOTE]
> [`../../04-compliance-ksa/compliance-roadmap.md`](../../04-compliance-ksa/compliance-roadmap.md)
> and `00-strategy/phase0.md` both still point here for the residency story. The residency
> conclusion they are citing is correct; the Firebase-era mechanics around it are not.
