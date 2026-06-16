# Hosting facts (PDPL boundary, regions, domains)

Single-page reference for hosting decisions confirmed in PHASE0 / resume-briefing
(Drive, as of 2026-05-23). Use this before reaching for the longer planning docs.

## Domains

| Domain | Status | Notes |
|---|---|---|
| `flygaca.com` | Owned, canonical | The main product. |
| `captadel.com` | Owned (secured 2026-05-23) | Captain Adel's marketing / standalone front door. **Registrar not yet recorded** — write it in here when known. |
| `flygaca.sa` | Deferred until P0-3 | Saudi-NIC review needs the legal entity to exist; the "gaca" substring may also trigger review. |

## PDPL data boundary — the load-bearing rule

> All personal data — accounts, profiles, the logbook, **real user queries** — stays
> in the Kingdom (Firestore `me-central2` / Cloud Functions). Public corpus work
> can happen on the EU VPS.  — `phase0.md`, P0-6

That makes the choice unambiguous:

| What | Where | Why |
|---|---|---|
| Firestore | **`me-central2` (Dammam)** | In-Kingdom, native mode. |
| Cloud Functions (Fly GACA gateway) | **`me-central2` (Dammam)** | Receives personal data (user queries). |
| **Captain Adel service (captadel)** | **`me-central2` (Dammam)** | Real user queries → personal data under PDPL. Anything west of Dammam is not in-Kingdom. |
| Public corpus pipeline / RAG indexing / evals / staging | EU VPS (Paris) — Hostinger | **Public data only**; explicitly never personal data. |
| ALLaM GPU endpoint | KSA / in-Kingdom GPU host | Same reason as captadel — see `captadel/deploy/allam-vllm.md`. |

> "me-central1" (Doha, Qatar) is **not** in-Kingdom. Earlier doc wording that says
> "Cloud Run me-central1 / Kingdom box" should read `me-central2` (Dammam) per the
> policy above. Treat `me-central2` as the canonical answer.

## GCP / Firebase

| Item | Value |
|---|---|
| Firebase / GCP project ID | `flygaca-firebase` (replaced `flygaca-com`; an empty `fly-gaca-495116` project also exists — delete later) |
| Web app config | `assets/js/firebase-config.js` |
| Firestore | Native mode, **`me-central2`** (to be created) |
| Billing | Spark today; Blaze required for Cloud Functions (Phase 2) |
| Captain Adel service host | Cloud Run, **`me-central2`** (per PDPL above) |

## EU VPS (Paris) — public-data box

| Item | Value |
|---|---|
| Provider | Hostinger KVM 2 (2 vCPU / 8 GB / 100 GB) |
| IP | 72.62.20.20 |
| Hostname | srv1209075.hstgr.cloud |
| Region | Paris, Île-de-France (Hostinger, AS47583) |
| OS | Ubuntu 24.04 LTS, hardened (SSH key-only, ufw, fail2ban) |
| Role | RAG indexing / eval harness / staging — **public data only** |

## GitHub

| Item | Value |
|---|---|
| Org | `github.com/FlyGACA` |
| Monorepo | `github.com/FlyGACA/flygaca` |
| Captain Adel (planned standalone) | `github.com/FlyGACA/captadel` — see `office/runbook-captadel-extraction.md` |

## Sources
- `phase0.md` (Drive) — P0-2 (domain decisions), P0-5 (Firebase + me-central2), P0-6 (VPS + PDPL boundary)
- `flygaca-resume-briefing-2026-05-23.md` (Drive) — hosting + PDPL summary
- `captadel/README.md` and `office/runbook-captadel-extraction.md` (this repo) — to be re-aligned to `me-central2`
