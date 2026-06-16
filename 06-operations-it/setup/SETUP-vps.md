# P0-6 Walkthrough — Set up the VPS as the pipeline box

**Goal:** set up a Hostinger KVM VPS (Europe — Germany or France) as the
document-ingestion / RAG-indexing, eval-harness and staging machine.

> The VPS is a compute box — **not** the production front door. Production is Firebase
> Hosting. Document this clearly so the VPS is never accidentally promoted to production.

> **Doing the work?** This file is the *why*. For the exact copy-paste commands —
> hardening, firewall, fail2ban, runtime install — follow `RUNBOOK-vps-hardening.md`.

## Data boundary (PDPL) — the rule that makes a non-Saudi VPS safe

The VPS is hosted outside Saudi Arabia, so it **must never store or process personal
data.** Under PDPL, processing personal data on a server abroad — not only storing it —
is a restricted cross-border activity. The safe rule is to keep personal data off the box
entirely.

**The VPS may only handle public, non-personal data:**

- Ingesting and chunking the GACAR corpus (public regulations).
- Building the RAG vector index and embeddings from that public text.
- The eval harness — provided the test question sets are authored, not real user queries.
- Staging builds of the PWA.

**The VPS must never touch the following — it all stays in the Kingdom (Firestore
me-central2 / Cloud Functions):**

- User accounts, profiles, authentication.
- The digital logbook and any pilot-specific data.
- Real user questions to Captain Adel and their chat history.
- The production website itself.

Guardrails: never pull user collections from Firestore to the VPS, even for testing —
only public library data; and ensure VPS logs do not accumulate personal data. The live,
per-user RAG runs in a Firebase Cloud Function (me-central2), not on the VPS.

## 1. Choose the region — data-sovereignty check

- Hostinger has no Middle East datacenter. Choose a **Europe** location (Germany or
  France) — strong connectivity to Saudi Arabia. Avoid the US locations.
- This is acceptable only because of the data boundary above. Record the chosen region in
  `../PHASE0.md`.

## 2. Choose the plan and OS

- Plan: **KVM 2** (2 vCPU, 8 GB RAM, 100 GB NVMe) — comfortable for indexing and staging.
  KVM 1 (4 GB) works to start and can be upgraded later.
- OS: **Ubuntu 24.04 LTS**, the plain image — no hPanel, CyberPanel or any control panel.

## 3. Prepare the OS and access

- Update the operating system.
- Set up SSH **key-only** login, disable password authentication, and create a non-root
  sudo user.
- Configure a firewall (ufw or equivalent) — open only SSH and the ports the pipeline
  actually needs.

## 4. Install the pipeline runtime

- Install **Python 3.11** (via the deadsnakes PPA on Ubuntu 24.04) and create a virtual
  environment for the ingestion / RAG-indexing pipeline (document chunking + embedding).
- Install **Node.js 20** for the document builders.
- Install **git**.

## 5. Define its role

This box runs, and only runs:

- the Python ingestion / RAG-indexing pipeline,
- the Captain Adel eval harness,
- staging builds.

It does not serve flygaca.com, and it holds no personal data.

## 6. Record the result

- Update `../PHASE0.md` P0-6 with the VPS provider, region, IP and the runtime versions
  installed.
