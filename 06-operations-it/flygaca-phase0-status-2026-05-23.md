# Fly GACA — Phase 0 Status Report

**Date:** 23 May 2026
**Owner:** Captain Adel Al-Subaie
**Covers:** Progress on Phase 0 — Foundations.

> **Point-in-time snapshot.** This report reflects the state on 23 May 2026 and is ~3+ weeks
> old as of 2026-06-16. It is kept as a historical record — for current status see
> `../00-strategy/PHASE0.md`. **TODO(owner):** confirm whether a fresh status report is due.

## Summary

Phase 0 is well underway. The technical foundations are largely in place — the repository
is scaffolded, the Firebase backend exists with its database correctly configured in the
Dammam region, and the VPS pipeline box is provisioned and being hardened. The legal track
(redistribution rights and the "Fly GACA" name) has had its desk research completed and now
needs a Saudi IP lawyer. The legal entity registration has not yet started.

## Phase 0 workstreams at a glance

| ID | Workstream | Status |
|----|------------|--------|
| P0-1 | Resolve redistribution rights | In progress — desk research done; lawyer pending |
| P0-2 | Domain canonicalization + name lock | In progress — research done; decision + lawyer pending |
| P0-3 | Register the legal entity | Not started |
| P0-4 | Create the repository | In progress — scaffolded locally; GitHub push pending |
| P0-5 | Create the Firebase project | **Done** |
| P0-6 | Set up the VPS pipeline box | In progress — provisioned; hardening underway |

The live, detailed checklist lives in the repository at `flygaca/PHASE0.md`.

## Research findings

### P0-1 — Redistribution rights (the launch-blocker)

Desk research is encouraging. Saudi copyright law — both the current 2003 law (Article 4)
and the new law that takes effect 12 August 2026 — excludes official regulations and
official documents from copyright protection. GACAR parts fall squarely inside that
exclusion, so rehosting them is very likely permissible; the Saudi AIP and GACA advisory
circulars probably so. The new 2026 law also adds an AI exception that helps the Captain
Adel corpus, though its precise scope awaits SAIP's implementing regulations. GACA's own
website terms only permit personal / non-commercial use, so the case for commercial
rehosting rests on the copyright-law exclusion, not on GACA's site licence. **A Saudi IP
lawyer must confirm this against the new law before any corpus rehosting.** Zero-risk
interim option: launch Phase 1 as a deep-linking index to GACA's own copies, then rehost
once cleared.

### P0-2 — Domain and the "Fly GACA" name

The domain is straightforward — keep **flygaca.com** as canonical (it is owned and `.com`
has no eligibility rules); `flygaca.sa` would need the legal entity first and may be
queried by SaudiNIC because it contains "gaca". The name itself is the real risk: Saudi
trademark law prohibits registering marks that use a government authority's designation,
and SAIP can refuse marks with misleading components. "Fly GACA" may be unregistrable as a
trademark, and a disclaimer reduces but does not cure that exposure. The lawyer should
weigh three paths: keep "Fly GACA" with prominent disclaimers; demote it to a descriptive
tagline and register a different primary mark; or rebrand. "Captain Adel" as a brand is
unaffected. Note: an existing `github.com/FlyGACA` org with a `Library` repo should be
reconciled.

Both findings are desk research, not legal advice.

## What's been built

### Repository (P0-4)

The full repository structure has been scaffolded locally in the workspace, at `flygaca/`.
It contains the folder tree from the briefing (`assets`, `assistant`, `build_finance`,
`evals`, `functions/rag`, `library/PDFs`, `legal`, `office`, `tests`, `.github`), eleven
top-level HTML page placeholders with the unofficial-status disclaimer baked into each, a
README, `.gitignore`, a CI workflow, issue and PR templates, and a Dependabot config. The
PR template carries a legal/corpus checklist. Git is initialised with an initial commit.
**Outstanding:** create the private `github.com/ay2m/flygaca` repository and push; turn on
branch protection for `main`.

### Firebase (P0-5 — done)

The Firebase project exists and its database is correctly configured.

- **Project ID:** `flygaca-com`
- **Owner Google account:** flygaca@gmail.com
- **Web app:** registered as "Fly GACA"; the web config is saved in the repo at
  `assets/js/firebase-config.js` (these values are public-safe by design).
- **Cloud Firestore:** database `(default)`, **Standard edition**, Native mode, region
  **me-central2 (Dammam)** — keeps data inside the Kingdom for PDPL.
- **Billing:** Spark (free) plan for now.

Along the way a duplicate Google Cloud project — `fly-gaca-495116` (display name
"Fly-GACA") — was created by accident; it is empty and unused, and is flagged for deletion
later. The first Firestore database was mistakenly created as Enterprise edition; it was
deleted and recreated correctly as Standard `(default)`.

Deferred to their proper phases: enabling Authentication (Phase 3), registering App Check
(Phase 2/3), Hosting setup (Phase 1 deploy), and the Blaze plan upgrade (start of Phase 2
— needs a payment card). The data-residency of Gemini / Vertex AI inference still needs to
be verified before Phase 2.

### VPS (P0-6 — in progress)

The pipeline box is provisioned and being hardened.

- **Provider / plan:** Hostinger **KVM 2** (2 vCPU / 8 GB RAM / 100 GB NVMe)
- **IP:** 72.62.20.20 — **hostname:** srv1209075.hstgr.cloud
- **OS:** Ubuntu **24.04 LTS** (reinstalled — it had been provisioned on the non-LTS 25.10)
- **Region:** not yet confirmed (Hostinger has no Middle East datacenter; a Europe
  location is expected)
- **Access:** SSH key-based login works; a non-root admin user `adel` has been created
  with sudo rights, the SSH key, and a password.
- **Firewall:** the Hostinger panel firewall's catch-all "Drop" rule was removed to
  unblock SSH; a proper firewall (`ufw`) will be configured on the box during hardening.
- **Data boundary (PDPL):** the VPS is outside Saudi Arabia, so it handles **public data
  only** — corpus ingestion, RAG indexing, the eval harness, staging builds. No personal
  data ever touches it; that all stays in the Kingdom (Firestore me-central2 / Cloud
  Functions).

**Outstanding on the VPS:** finish hardening (lock down SSH, `ufw`, fail2ban), update the
OS, install Python 3.11 / Node.js 20 / git, and confirm the region.

## Key facts

| Item | Value |
|------|-------|
| Firebase project ID | flygaca-com |
| Google account | flygaca@gmail.com |
| Firestore | (default), Standard, Native, me-central2 (Dammam) |
| Duplicate project to delete | fly-gaca-495116 |
| VPS provider / plan | Hostinger KVM 2 |
| VPS IP / hostname | 72.62.20.20 / srv1209075.hstgr.cloud |
| VPS OS | Ubuntu 24.04 LTS |
| VPS admin user | adel (sudo) |
| Canonical domain | flygaca.com |
| Repository | flygaca/ (local; GitHub push pending) |

## Decisions made this session

- The Phase 0 tracker is kept as Markdown (`PHASE0.md`) inside the repository.
- The repository is scaffolded inside the workspace folder as `flygaca/`.
- Firebase: keep project `flygaca-com` (not the accidental duplicate); Firestore recreated
  as Standard edition `(default)` in me-central2.
- VPS: a fresh Hostinger KVM 2 box; OS reinstalled to Ubuntu 24.04 LTS; the VPS is a
  public-data-only pipeline box.
- The Hostinger panel firewall is being dropped in favour of `ufw` on the box.

## Open items and risks

- **Launch-blocker (P0-1):** redistribution rights need a Saudi IP lawyer's confirmation.
- **Name risk (P0-2):** "Fly GACA" may be unregistrable as a trademark — lawyer decision needed.
- The legal entity (P0-3) is not started; it needs the final name locked first.
- The GitHub repository is not yet created or pushed.
- The duplicate Firebase project `fly-gaca-495116` should be deleted.
- Gemini / Vertex AI inference data-residency is unverified.

## Next steps

Immediate — finishing P0-6 (VPS):

1. Test `ssh adel@72.62.20.20` and `sudo whoami` from the Mac — confirm key login and sudo for `adel`.
2. Lock down SSH — disable root login and password authentication.
3. Configure `ufw` and install fail2ban.
4. Update the OS.
5. Install Python 3.11, Node.js 20 and git.
6. Confirm and record the VPS region.

Then:

- Create the `github.com/ay2m/flygaca` repository and push (finishes P0-4).
- Brief a Saudi IP lawyer on P0-1 and P0-2 together.
- Begin P0-3 (legal entity) once the name is locked.
- Delete the duplicate Firebase project `fly-gaca-495116`.
