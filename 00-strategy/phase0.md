---
title: "Fly GACA — Phase 0 Tracker: Foundations"
section: 00-strategy
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — Phase 0 Tracker: Foundations

Phase 0 lays the legal, corporate and technical groundwork for Fly GACA. Later phases must
not start until their Phase 0 dependencies clear. This file is the living checklist — edit
the **Status** fields and tick the checkboxes as you go.

**Last updated:** 2026-05-23

> **Staleness check (2026-06-16):** the checklist state below has not been re-verified since
> the date above (~3 weeks). Treat statuses as point-in-time until reviewed.
> **TODO(owner):** re-confirm each Status field and bump "Last updated".

**Phase 0 is done when:** the redistribution-rights question has a documented answer, the
legal entity is registered, and the empty repository and Firebase project both exist.

**Status values:** `Not started` · `In progress` · `Blocked` · `Done`

**Owner key:** **You** = Captain Adel · **Claude** = research / scaffolding done in this
workspace · **Lawyer** = Saudi IP lawyer

> This tracker contains desk research. It is **not legal advice.** Open risks P0-1 and P0-2
> must be confirmed by a Saudi IP lawyer before heavy building begins.

## At a glance

| ID | Workstream | Owner | Status | Depends on |
|----|------------|-------|--------|------------|
| P0-1 | Resolve redistribution rights | You + Lawyer | In progress | — |
| P0-2 | Domain canonicalization + name lock | You + Lawyer | In progress | — |
| P0-3 | Register the legal entity | You | Not started | P0-2 |
| P0-4 | Create the repository | Claude + You | Done | — |
| P0-5 | Create the Firebase project | You | Done | — |
| P0-6 | Set up the VPS as the pipeline box | You | Done | — |

---

## P0-1 · Resolve redistribution rights — the launch-blocker

**Status:** In progress — research verified, lawyer brief ready, interim posture decided; lawyer engagement outstanding
**Owner:** You + Lawyer (desk research by Claude)
**Open risk:** #1, the launch-blocker · **Blocks:** Phase 1 corpus rehosting

**Steps**

- [x] Desk research on the Saudi copyright treatment of official documents
- [x] Desk research refreshed and web-verified (2026-05-23) — findings below confirmed
- [ ] Engage a Saudi IP lawyer — **brief ready:** `office/lawyer-brief.md` · candidate firms: `office/lawyer-shortlist.md`
- [ ] Optional: get written clarification from GACA's Data Management Office (boad@gaca.gov.sa)
- [x] Decide the interim posture — **DECIDED 2026-05-23: deep-linking index for Phase 1**; rehost the texts only after lawyer clearance
- [ ] Record the final answer in this tracker

**Findings (desk research, May 2026)**

The picture is encouraging for GACAR, with caveats.

Under the current Saudi Copyright Law (Royal Decree M/41, 2003), **Article 4 excludes from
copyright protection** "laws, judicial judgments, decisions of administrative bodies,
international agreements and other official documents, and their official translations."
GACAR parts are regulations issued by a government authority — squarely inside that
exclusion.

A **new Copyright Law** was published in the Official Gazette on 13 Feb 2026 and **takes
effect 12 August 2026.** It keeps the exclusion — it expressly excludes "official
regulations" from protection — so GACAR stays outside copyright under the new law too. The
new law also adds an **AI exception** permitting reproduction of works to develop AI
products and algorithms; its exact scope will be set by SAIP's implementing regulations
(due within 180 days, applying from 12 Aug 2026). Treat that exception as helpful to the
Captain Adel corpus but not yet load-bearing.

**GACA's own website terms** allow downloading and copying content "for personal and/or
non-commercial use." Fly GACA is a commercial venture, so GACA's site licence alone does
not authorise commercial rehosting — the case for rehosting rests on the copyright-law
*exclusion of official documents*, which removes the need for a licence at all.

**AIPs and advisory circulars** are also official GACA publications and most likely fall
under the same exclusion. AIPs carry the extra operational constraint from the corpus
policy: every AIP-sourced item changes on the 28-day AIRAC cycle and must show an effective
date plus the "not for operational use" line.

**Preliminary conclusion:** rehosting GACAR is very likely permissible; AIPs and circulars
probably so. The lawyer should confirm this against the **new** law and its forthcoming
implementing regulations, not just the 2003 law. Zero-risk interim posture: ship Phase 1 as
a deep-linking index to GACA's own copies, then rehost once the lawyer signs off.

**Done when:** a documented, lawyer-confirmed answer exists (rehost permitted / deep-link index).

---

## P0-2 · Domain canonicalization + name lock

**Status:** In progress — research verified, domain decisions locked, lawyer brief ready; name decision awaits lawyer
**Owner:** You (decision) + Claude (research) + Lawyer (trademark)
**Open risks:** #2 (the name) and #3 (the domain) · **Blocks:** P0-3

**Steps**

- [x] Desk research on `.sa` eligibility and the "Fly GACA" trademark exposure
- [x] Desk research refreshed and web-verified (2026-05-23)
- [x] Decide the canonical domain — **DECIDED: keep flygaca.com** as canonical
- [x] Decide whether to also secure flygaca.sa and captadel.com — **DECIDED 2026-05-23:** `captadel.com` secured (owned); defer `flygaca.sa` until the legal entity exists (P0-3)
- [ ] Engage the Saudi IP lawyer on the name — **brief ready:** `office/lawyer-brief.md` (covers P0-1 + P0-2 together)
- [ ] Decide: keep "Fly GACA", use it as a tagline only, or rebrand — **awaits lawyer**
- [ ] Lock the final legal/brand name — this feeds P0-3
- [ ] Finalise the disclaimer in `legal/DISCLAIMER.md`

**Findings (desk research, May 2026)**

The domain is straightforward; the name is the real risk.

*Domain.* flygaca.com is already owned and `.com` has no eligibility rules — keep it as
canonical, as the briefing assumes. A `.sa` / `.com.sa` domain requires the registrant to
be a Saudi entity, national or trademark owner with a Commercial Registration, and
SaudiNIC reviews every request for a genuine relationship between the name and the
registrant. Two consequences: flygaca.sa cannot be registered until the legal entity
(P0-3) exists; and because "flygaca" contains "gaca", SaudiNIC review could question it.
Recommendation — stay on flygaca.com, revisit `.sa` after P0-3, and separately secure
captadel.com for the Captain Adel marketing front door.

*Name — this needs a lawyer.* Saudi trademark law prohibits registering marks consisting
of "names or designations specific to the Kingdom" or official Saudi marks "unless
authorised by the entity that owns them," and SAIP can refuse any mark with "misleading
components" or that implies official endorsement. "GACA" is the well-known designation of
a Saudi government authority. Realistically:

- "Fly GACA" may be **unregistrable as a trademark** at SAIP, and even unregistered use
  carries passing-off / misrepresentation exposure because the name leans on the
  authority's identity.
- A disclaimer is **necessary but not sufficient** — disclaimers reduce confusion but do
  not cure use that is misleading overall.
- Three realistic paths for the lawyer to weigh: (1) keep "Fly GACA", accept it may be
  unregistrable, and mitigate with prominent disclaimers everywhere; (2) keep "Fly GACA"
  only as a descriptive tagline and register a different primary mark; (3) rebrand the
  primary name to one that does not contain "GACA". The "Captain Adel" brand is unaffected
  either way.

**Existing GitHub footprint:** there is already a `github.com/FlyGACA` org with a `Library`
repo. **DECIDED 2026-05-23:** the project will live in the **FlyGACA org**, not the `ay2m`
account — the repo is `github.com/FlyGACA/flygaca`. The old `Library` repo should be
archived, or folded into the new monorepo's `library/` folder (see P0-4).

**Done when:** the canonical domain is set, the name is locked, and the trademark position
is confirmed by the lawyer.

---

## P0-3 · Register the legal entity

**Status:** Not started
**Owner:** You · **Depends on:** P0-2 (registration needs the locked name)
**Walkthrough:** `office/setup-entity.md`

**Steps**

- [ ] Choose the legal structure (sole proprietorship vs LLC)
- [ ] Register the Commercial Registration on the Saudi Business Center
- [ ] Register with Monshaat (SME)
- [ ] Check NTDP eligibility and apply
- [ ] Open a business bank account
- [ ] Record the CR number and entity details here

**Done when:** the Commercial Registration is issued, the entity legally exists, and a
business bank account is open.

---

## P0-4 · Create the repository

**Status:** Done — repo on GitHub (FlyGACA/flygaca), pushed, branch protection on
**Owner:** Claude (scaffold) + You (GitHub + push) · **Blocks:** all later build phases

**Steps**

- [x] Scaffold the full folder/file structure — done, in this `flygaca/` folder
- [x] Add README, `.gitignore`, CI workflow, issue templates and Dependabot config
- [x] Decide the repo home — **DECIDED 2026-05-23:** `github.com/FlyGACA/flygaca` (the existing FlyGACA org)
- [x] Create the private `github.com/FlyGACA/flygaca` repository — done 2026-05-23
- [x] Add the remote and push — `origin` set; `main` pushed and tracking `origin/main`
- [x] Turn on branch protection for `main` — ruleset: restrict deletions + block force pushes
- [ ] Reconcile the old `FlyGACA/Library` repo — archive it, or fold it into `library/`

**Done when:** the structured repository exists on GitHub. ✅ Met.

---

## P0-5 · Create the Firebase project

**Status:** In progress — project switched to `flygaca-firebase` (23 May 2026); Firestore database must be re-created in the new project before the waitlist rules can deploy
**Owner:** You (Google account) + Claude (config guidance) · **Blocks:** Phase 1 deployment
**Walkthrough:** `office/setup-firebase.md`

**Project details**

- Firebase / Google Cloud project ID: **flygaca-firebase**
  (superseded `flygaca-com`, used for the first deploy on 23 May 2026)
- Web app registered: "Fly GACA" — config saved to `assets/js/firebase-config.js`
- Cloud Firestore: ⚠️ the `flygaca-firebase` `(default)` DB was created in
  **`nam5` (US multi-region)**, NOT me-central2 — and a Firestore location is
  permanent. Remediated by a new project **`flygaca-app`** with Firestore +
  Functions in **me-central2 (Dammam)**. See `office/runbook-pdpl-me-central2.md`.
- Billing plan: Spark (free) for now

**Steps**

- [x] Create the Firebase project — `flygaca-firebase`
- [x] Create the Cloud Firestore database in me-central2 (Dammam) — done in the **`flygaca-app`** project (the `flygaca-firebase` DB was mistakenly in nam5/US and is being decommissioned; see `office/runbook-pdpl-me-central2.md`)
- [ ] Enable Authentication — deferred to Phase 3 (sign-in providers configured then)
- [ ] Register App Check — deferred to Phase 2/3 (needs a provider and site keys)
- [ ] Enable Hosting — handled at the Phase 1 deploy
- [ ] Upgrade to the Blaze plan — needed for Cloud Functions; do at the start of Phase 2 (requires your payment card)
- [ ] Verify the data-residency of Gemini / Vertex AI inference — open item, resolve before Phase 2
- [x] Record the project ID here

**Note — duplicate project:** a duplicate Google Cloud project `fly-gaca-495116` was created
during setup. It is unused and empty; delete it later (deferred — see the task list).

**Done when:** the Firebase project exists with Firestore in me-central2.
⚠️ Partially met — Firestore in me-central2 now exists in **`flygaca-app`**, but
the app cutover (Auth, secrets, webhooks, custom domain) is still pending. Track
in `office/runbook-pdpl-me-central2.md`.

---

## P0-6 · Set up the VPS as the pipeline box

**Status:** Done — VPS hardened, runtimes installed, region confirmed (2026-05-23)
**Owner:** You + Claude (config guidance)
**Walkthrough:** `office/setup-vps.md` · **Runbook:** `office/runbook-vps-hardening.md`

**Server:** Hostinger **KVM 2** (2 vCPU / 8 GB RAM / 100 GB NVMe), IP **72.62.20.20**,
hostname `srv1209075.hstgr.cloud`. Region: **Paris, Île-de-France, France**
(Hostinger / AS47583).

**Data boundary (PDPL):** the VPS is outside Saudi Arabia, so it **must never store or
process personal data** — that is a restricted cross-border activity under PDPL. It
handles **public data only**: ingesting/chunking the public GACAR corpus, building the
RAG vector index, the eval harness (authored test sets), and staging builds. All personal
data — accounts, profiles, the logbook, real user queries — stays in the Kingdom
(Firestore me-central2 / Cloud Functions). See `office/setup-vps.md` for the full rule.

**Steps**

- [x] Reinstall the OS as **Ubuntu 24.04 LTS** — done; running Ubuntu 24.04.4 LTS (kernel 6.8.0-117)
- [x] Confirm and record the datacenter region — **Paris, Île-de-France, France** (Hostinger, AS47583)
- [x] Set up SSH key-only login; harden (firewall, disable password auth, non-root user)
- [x] Install Python 3.11, Node.js 20 and git
- [x] Configure it as the RAG-indexing / eval-harness / staging host — explicitly **not**
  the production front door, and holding no personal data
- [x] Record the VPS provider, region, IP and role here

**Result — hardening completed 2026-05-23**

- **OS:** Ubuntu 24.04.4 LTS, fully updated; unattended security upgrades enabled.
- **Access:** SSH key-only. Non-root sudo user `adel`. Root SSH login **disabled** and
  password authentication **disabled**, enforced via
  `/etc/ssh/sshd_config.d/01-flygaca-hardening.conf` (verified: fresh `adel` key login
  works, `root` login refused).
- **Firewall:** `ufw` active — default-deny inbound, only OpenSSH (22/tcp) allowed.
- **Brute-force protection:** `fail2ban` active with the `sshd` jail (systemd backend).
- **Runtime:** Python 3.11.15 (deadsnakes PPA, alongside the system Python 3.12),
  Node.js v20.20.2, git 2.43.0.
- **Role:** public-data-only pipeline / eval-harness / staging box — **not** production,
  holds no personal data (PDPL boundary per `office/setup-vps.md`).

**Done when:** the VPS runs an Ubuntu LTS, is reachable over SSH keys, Python 3.11 is
ready, and its role is documented as a public-data-only pipeline/staging box. ✅ Met.

---

## Recommended sequence

1. **Now — start P0-1 and P0-2.** Longest lead time; both need the lawyer, so brief the
   lawyer on the two together.
2. **P0-2 name decision → P0-3.** Entity registration needs the final locked name.
3. **P0-4, P0-5, P0-6 in parallel** — independent of each other and of the legal track.

The legal track (P0-1, P0-2) gates *heavy building and corpus rehosting*, not the repo or
Firebase setup — so the technical scaffolding can proceed straight away.

## Legal note

The findings in P0-1 and P0-2 are desk research carried out in this workspace and are
**not legal advice.** The briefing requires a Saudi IP lawyer to confirm the redistribution
rights and the name. Do not let Phase 1 corpus rehosting proceed as if these are settled.

## References (desk research, May 2026)

- Saudi Copyright Law, Royal Decree M/41 (2003) — WIPO Lex: https://www.wipo.int/wipolex/en/legislation/details/3593
- Saudi Arabia Copyright Law 2026, key changes — Gowling WLG: https://gowlingwlg.com/en/insights-resources/articles/2026/saudi-arabia-copyright-law-2026
- Saudi Arabia's new Copyright Law — A&O Shearman: https://www.aoshearman.com/en/insights/saudi-arabias-new-copyright-law-key-changes-and-implications
- GACA official site: https://gaca.gov.sa/en/
- Saudi domain name registration regulations — SaudiNIC: https://help.nic.sa/en/regulation/
- SAIP conditions for place / "Saudi Arabia" names as trademarks — CWB: https://cwbip.com/insights/news/2024/saip-sets-conditions-using-saudi-arabia-and-place-names-trademarks
- Law of Trademarks — Saudipedia: https://saudipedia.com/en/article/2612/government-and-politics/systems/law-of-trademarks
