---
title: Fly GACA — Agent Workforce Plan
section: 06-operations-it
doc_type: plan
status: active
owner: Founder
last_updated: 2026-08-26
lang: en
---

# Fly GACA — Agent Workforce Plan

> **Purpose.** Fly GACA is run by one person. Agents already do real work here —
> `00-strategy/phase0.md` lists *"Claude = research / scaffolding done in this workspace"* as a
> first-class **owner** alongside "You" and "Lawyer" — but that arrangement has never been
> designed, named, or governed. This plan names the roster, states what agents may and may not
> be trusted with, and wires the whole thing into the Office's own conventions.
>
> **Created:** 2026-08-26 · **Owner:** Founder · **Companions:**
> `flygaca-antigravity-agents.md` and `flygaca-claude-briefing.md` (standing context, no roster)
> · `00-strategy/project.md` (the *product-side* agents — see §1). **Not legal advice.**

---

## 1. Two layers, drawn once

"Agents" means two unrelated things in this company, and confusing them has already cost
review time. They are separated here permanently.

| | **Internal agents** (this plan) | **Product agents** (`00-strategy/project.md`) |
|---|---|---|
| Who they serve | The founder, building the company | Customers and prospects |
| Where they live | `.claude/agents/` in each repo | The `sales_agents/` Python package on `google-genai` |
| Named members | `doc-smith`, `ar-mirror`, `ksa-compliance`, `family-warden` | Enrollment Advisor · Chief Flight Instructor · B2B Account Owner · Routing Gateway |
| Failure mode | A bad draft, caught in review | A wrong answer to a real pilot |
| Governed by | This plan + `01-governance/` | `00-strategy/project.md` + `06-operations-it/test-ready.md` (55 E2E cases) |

Captain Adel is a third thing again — a shipped product feature, governed by
`spec-captain-adel-refusal-protocol.md` and the corpus policy. Nothing in this plan changes it.

**Everything below concerns the internal layer only.**

## 2. What an agent is, and what it is not

An agent here **drafts and scaffolds**. It does not decide, approve, or carry
accountability — every document an agent produces is the founder's document the moment it is
committed, and it is signed, filed, or sent on the founder's judgement alone.

Three things follow, and they are not negotiable:

- **An agent never closes an owner decision.** The open markers in
  `00-strategy/owner-decision-brief-2026-07.md` — and the D1 external-recipient appointment
  blocking `05-people/grievance-and-disciplinary-procedure-2026-07-03.md` — stay open until a
  human closes them.
- **An agent is not a hire, and this plan does not cancel the hiring plan.**
  `05-people/job-descriptions-pack.docx` still plans six roles over 24 months, including an
  **ML/AI Engineer at month 9** whose job is to *build* the product's AI. That plan is gated on
  a bridge round that has not been sized (`09-investor-relations/investor-thesis.md` records the
  ask and use-of-funds as still unset). Agents cover drafting in the meantime; they do not
  remove the bus-factor-of-one risk, which that same thesis names as an open diligence item.
- **An agent must earn its slot.** A subagent is justified only when it encodes repo-specific,
  **non-inferable** knowledge. `doc-smith` earns its slot because nothing about this repo tells
  a general model that `templates/**` needs only a `title` key, or that editing `build.mjs`
  marks every PDF in the repo stale. A general model already writes a competent HR policy; it does not
  need an agent to do it. **Twelve sections do not mean twelve agents.** §4 records what was
  rejected and why, so the roster does not quietly inflate.

## 3. The shared charter

Every agent in every repo of the family inherits these, whether or not its own file repeats
them. They are stated once here and sourced, not restated, so there is one place to correct.

| Constraint | Source of truth |
|---|---|
| **Fly GACA is not affiliated with GACA.** Never imply official status; never fabricate a regulatory citation — name and link GACA's own copy. | `CLAUDE.md`; `flygaca-antigravity-agents.md` §4 |
| **PDPL and in-Kingdom data.** `me-central2` is Dammam and in-Kingdom. **`me-central1` is Doha, Qatar — never PDPL-safe.** | `runbooks/runbook-pdpl-me-central2.md`; `hosting-facts.md` |
| **Corpus policy tiers** — HOST safe-core · HOST original · DO-NOT-HOST cite-and-refer-only. AIP answers carry an effective date and the "not for operational use" line. | `flygaca-antigravity-agents.md` §5 |
| **English is authoritative; EN and AR move together.** | `CLAUDE.md`; `ar/_GLOSSARY.md` |
| **Sensitive material.** This tree holds real signed and draft agreements and real financial, HR and investor data. Quote the minimum the task needs; never carry it to another repo, tool, or public output. | `01-governance/SECURITY.md` |
| **Banking data never leaves the Office.** The IBAN and account number in `01-governance/company-facts.md` do not appear in any other repo, in `contracts/flygaca-family.json`, or in any PR body — `check-facts.mjs` enforces the manifest half of this. | `01-governance/company-facts.md` |
| **Governance wins.** If an agent file and a document in `01-governance/` disagree, the governance document wins and the agent file is the thing that is wrong. | `.claude/agents/README.md` |

> One rule is easy to break by being helpful: **no agent copies a briefing file into a repo
> root.** `flygaca-antigravity-agents.md` used to instruct exactly that, and the two copies
> drifted until one was briefing sessions to build a Firebase app that no longer existed. A
> repo's own `CLAUDE.md` is authoritative inside that repo; the briefings are for sessions with
> no repo access.

## 4. The Office roster (`ay2m/Office`)

Four subagents, in `.claude/agents/`. Note this directory is inside `check.mjs`'s root-anchored
`SKIP_DIRS`, so agent files need **no** document front-matter and **no** `_print/` PDF.

| Agent | Owns | The non-inferable part |
|---|---|---|
| `doc-smith` | Any `.md`/`.html` add, edit or rename; front-matter; the print pipeline | The three exact front-matter exemptions; that `_print/` is committed and a doc edit without a rebuilt PDF fails CI; the `build.mjs` → `themeHash` trap |
| `ar-mirror` | The `ar/` mirror — Saudi MSA against the glossary, path alignment, Arabic PDFs | That filenames stay ASCII kebab-case even under `ar/`; that EN/AR parity is a practice, **not** a CI gate, so drift is silent |
| **`ksa-compliance`** *(new)* | `04-compliance-ksa/`, the PDPL half of `02-legal/`, the compliance framing in `03-finance/` | That the six vendored `.claude/skills/` are **foreign-law scaffolding** and PDPL/ZATCA govern; the `me-central1`/`me-central2` trap; that Gemini inference runs outside the Kingdom and is an **open** item |
| **`family-warden`** *(new)* | `contracts/flygaca-family.json`, `company-facts.md` parity, cross-repo drift | The stamp-and-three-PRs change procedure; the banking-leak guard; that the legacy `FlyGACA/…` org paths and the per-module App Store repos are dead |

> **The table above is a summary; `.claude/agents/README.md` owns the roster.**
> Four documents could plausibly carry it — that README, this plan, the root
> `CLAUDE.md` and the root `README.md`. A table in all four drifts within two PRs,
> by exactly the mechanism that left four different PDF counts in the tree. So:
> the README holds the roster, this document explains *why* each agent exists, and
> the two root files carry a pointer and nothing more.

### Rejected, and why

Recorded so the next session does not re-propose them.

| Candidate | Why not |
|---|---|
| `finance-clerk` | Its one load-bearing rule — banking data never leaves the Office — belongs in the shared charter, where it binds *every* agent, not only finance work. |
| `legal-scribe` | Contract drafting is craft a general model does well. The genuinely non-inferable parts (corpus tiers, non-affiliation, "not legal advice") are charter-level, §3. |
| `gtm-cs` · `ir-steward` · `people-ops` · `brand-keeper` | Nothing they would encode that `doc-smith` plus the charter does not already carry. Adding them would be roster theatre. |

## 5. Target roster — `ay2m/FlyGACA`

**Not built by this change.** The Office cannot write to the product repos; this is the
hand-off, and the owning repo decides. Each proposal is stated as what it would encode, so it
can be judged against the same earn-its-slot test.

| Proposed | Would encode |
|---|---|
| `corpus-warden` | The 28-day AIRAC cycle; the three corpus tiers; that every AIP-sourced answer carries an effective date and the "not for operational use — verify the current AIP and NOTAMs" line; that scraped third-party question banks are not permitted |
| `i18n-parity` | That `src/i18n/en.json` and `ar.json` are edited together and the suite already fails on a key present in one and missing from the other; that physical `left`/`right` is banned where a logical property exists |
| `contract-mirror` | That `contracts/flygaca-family.json` is byte-identical across three repos, that `chat` is this repo's block to own via `server/src/contract.ts`, and that `tests/family-contract.test.ts` is the local gate |

## 6. Target roster — `ay2m/Captain-Adel`

Also a hand-off.

| Proposed | Would encode |
|---|---|
| `grounding-auditor` | That `src/brain` is the reference implementation of retrieve → ground → cite; the four `groundingKinds` (`grounded`/`partial`/`refusal`/`na`); that `/v1/chat` is a **superset** of FlyGACA's contract and may not drop a field the other side depends on |
| `contract-mirror` | Same as above, gated locally by `test/family-contract.test.js`; this repo owns **no** block, so both its copies are mirrors it may not edit |

## 7. Excluded — `ay2m/FlyGACA-ios`

**Deliberately no roster.** The repo is slated for removal and a from-scratch restart, so
building agents against its current shape would be work thrown away. This is an exclusion, not
an oversight — a future reader should not read the gap as one.

Two consequences to carry forward when that restart happens:

- `contracts/flygaca-family.json` still lists it in the `repos` block. Removing it is a real
  contract change (§8) and belongs to the commit that actually removes the repo, not here.
- Its module status — ELPT and AIP ship; PPL, CPL, IR and ATPL are parked, while their **web**
  study packs keep selling — is currently recorded only in prose. Whoever restarts the repo
  owns re-establishing where that fact lives.

## 8. How the family integrates with the Office

The Office is the governance hub. Product-repo agents do not read Office prose — prose drifts.
They read the one machine-readable artifact the family shares.

- **`contracts/flygaca-family.json`** carries three blocks, each naming its owner: `entity` and
  `repos` are the Office's, `chat` is `ay2m/FlyGACA`'s. It is committed **byte-identically** to
  all three active repos.
- **`01-governance/company-facts.md`** is the source the `entity` block is copied from. Any
  agent about to restate a company fact — legal name, CR, VAT, address — reads that file, not a
  deck and not a briefing.
- **Changing the contract** means: edit the owning repo's copy → bump `version` →
  `node tools/contracts/stamp-manifest.mjs contracts/flygaca-family.json` → copy the file
  verbatim into the other two → **open all three PRs together**. Editing without re-stamping
  fails every repo's gate immediately.
- **Each repo gates its own half**: here, `node tools/print/check-facts.mjs` (wired into
  `docs-check.yml`); there, `tests/family-contract.test.ts` and `test/family-contract.test.js`.

> Known limitation, unchanged by this plan: nothing offline proves the three copies are the same
> revision. `version` and `sha` reduce that to a visible one-line diff. Closing it needs a
> scheduled cross-repo workflow, which does not exist yet.

## 9. Retirements and corrections

- **`flygaca-qa-reviewer` is formally retired**, not revived. The subagent was deleted without
  a record, leaving references in `qa-consistency-sweep-2026-06-14.md` and
  `repo-health-report-2026-06-16.md`. Its consistency-sweep function moves to `family-warden`,
  deliberately narrowed: reconcile against a named source, never re-derive from memory. That
  narrowing is the lesson of the thing it replaces — the sweep record shows the old agent's own
  line 15 had `me-central1` and `me-central2` **reversed**, i.e. a cross-document fact-checker
  hallucinated the single most PDPL-load-bearing fact in the repo.
  **The two documents are left intact.** They are dated audit records of a fix that happened,
  and DEC-011 already set the precedent: superseded facts are corrected in the live documents
  while "the dated records that quote the old card are left intact — they are the record of what
  was decided then." The retirement is recorded forward-only, here and in
  `.claude/agents/README.md`.
- **Stale counts corrected** against what the tooling actually reports. Four documents carried
  four different PDF counts — the root `CLAUDE.md` said 254, `doc-smith.md` said 238,
  `.claude/agents/README.md` said 263, and `ar-mirror.md` had the mirror at "118 against 119".
  With this change in, the true figures are **245 markdown + 20 brand-HTML docs, 265 PDFs**, and
  **119 Arabic `.md` against 126 English — seven unmirrored, not six.**
  The durable fix is not a better number: the agent files now **quote the command**
  (`node tools/print/check.mjs`, `find _print -name '*.pdf' | wc -l`) instead of freezing a
  figure, and hard numbers survive only where a reader is sizing a rebuild — the root
  `CLAUDE.md` and the README badge. Keeping those two honest is `family-warden`'s job.

## 10. Rollout

Keyed to the critical path in `00-strategy/ceo-execution-roadmap-2026-07.md` — legal/entity and
first paying customer — not to a calendar. The scoreboard has not changed and this plan does not
compete with it.

**Phase 1 — now, no external dependency.** The roster exists and gets used on work already
queued. The first real assignment is sitting there: **four of the seven unmirrored English docs
are `04-compliance-ksa/` files** — `cyber-risk-assessment-2026-08`,
`pci-dss-scope-and-saq-determination`, `pdpl-pia-instructor-dashboard`,
`isms-scope-and-statement-of-applicability` — which is exactly `ksa-compliance` plus `ar-mirror`
territory. `family-warden` runs its first drift sweep over the legacy-org references.

**Phase 2 — when the entity and payments tracks move.** ZATCA Fatoora phase-2 and the VAT return
cycle become recurring work with a fixed shape; that is when `ksa-compliance` earns its keep
rather than being exercised once.

**Phase 3 — at the product repos' discretion.** §5 and §6 land as PRs in their own repos,
each with its own gate. Nothing here blocks on them.

## 11. Open questions

1. **The owner's name is recorded two ways, and the split is systematic.** Every May/June-2026
   briefing says **"Captain Adel Al-Subaie"** — `02-legal/lawyer-brief.md`, the three
   `flygaca-*` briefings, and `flygaca-phase0-status-2026-05-23.md`, whose `owner:`
   front-matter is the only non-`Founder` value of its kind in the tree. Every June/July-2026
   governance, HR and legal document says **"Captain Adel Yahya A. Madkhali"** —
   `01-governance/decision-log.md`, `board-pack-2026-07.md`, four `05-people/` policies, and
   five `02-legal/` documents including the DPA and the PDPL breach-notification procedure.
   This is not editorial. `02-legal/lawyer-brief.md` asks counsel whether "Captain Adel" is
   registrable as a trademark **using Al-Subaie as the personal name**, so if Madkhali is the
   legal name that brief asks the wrong question — and `flygaca-antigravity-agents.md` is
   written expressly to be fed to third-party agentic tools. `company-facts.md` separately
   lists "Captain Adel" as a **trade name**, so one of the two may be a persona rather than an
   error. Founder to resolve; `family-warden` then propagates. Deliberately not normalised
   inside this change — a legal-identity correction should not be buried in an agent-roster
   diff.
2. **The Arabic agent terminology in `ar/_GLOSSARY.md` is newly coined.** Nothing in the tree
   previously fixed the Arabic for "subagent" or "guardrail". The proposed terms are reasonable
   Saudi MSA but will propagate through every future translation — worth one deliberate read.
3. **Nothing validates an agent file.** No gate checks that `name:` matches the filename, that
   every entry in `tools:` is a real tool name, or that a path quoted in an agent file still
   exists — and a typo in `tools:` silently disables that tool. Note that `.claude/**/*.md`
   *does* match `docs-check.yml`'s `**/*.md` path filter, so the workflow triggers on an
   agents-only change and then skips those files via `SKIP_DIRS`; that is correct, not a
   misconfiguration. A small `check-agents.mjs` as a third workflow step would close it. It
   belongs in its own PR, because it changes the workflow file.

**Review date: 2026-11-26**, matching the quarter DEC-012 sets. Two questions at review: has
`docs-check` gone red because of an agent, and has any fact restated in two places diverged? If
the roster has grown past four without a written argument against §2's test, it has failed.
