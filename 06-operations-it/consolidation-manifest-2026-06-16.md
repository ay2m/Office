---
title: 06-product-eng Consolidation Manifest — 2026-06-16
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# 06-product-eng Consolidation Manifest — 2026-06-16

> [!NOTE]
> **Superseded 2026-08-19 — retained as a record, not corrected.** This document captured the
> position as it stood on its own date. The price card, the B2B pricing model and the platform
> architecture have all changed since: see [`01-governance/decision-log.md`](../01-governance/decision-log.md)
> **DEC-011** and [`03-finance/monetization.md`](../03-finance/monetization.md) for what is
> current. Nothing below has been edited — its value is that it records what was decided or
> observed at the time, including the parts that later turned out to be wrong.

Closes master-index **GAP-1**: engineering docs were misfiled under `library/` (which should hold only the regulatory corpus) and duplicated inside the app at `flygaca/office/`. Documents are now consolidated into this bucket. Copy-only — originals were left in place because this folder blocks deletions for the agent (see root MOVED.md).

## Copied into 06-product-eng/ from library/06-product-eng/
- content-integration-plan.md, content-qa.md, diff-tracker-scope.md, hosting-facts.md, improvement-audit.md, test-ready.md, robots.txt
- spec-crm.md, spec-freshness-pipeline.md, spec-instructor-dashboard.md
- runbooks/ (full set: deploy, ios, launch, cloudflare, captadel-*, arabic-provider, captain-adel, security, vps-hardening, pdpl, etc.)
- setup/ (setup-entity.md, setup-firebase.md, setup-vps.md)

Already authored directly in this bucket (this engagement): spec-currency-tracker.md, spec-captain-adel-refusal-protocol.md, diagrams/ (licensing-journey, airac-editorial-sync, captain-adel-fallback, workflows.md), QA-Consistency-Sweep.

## Deliberately NOT moved (with reasons)
- **library/06-product-eng/cloudflare-agents/** — 812 MB of live Cloudflare Worker code incl. node_modules (sales-agents, captadel-agent). This is application code, not paperwork. It should live with the codebase, not in either the corpus or the office bucket. Decide its home as part of repo structure, not this cleanup.
- **flygaca/office/** — the app repo's own working copy of office docs (LAWYER-BRIEF, RUNBOOKs, SPEC-crm, SETUP-*, plus " 2" duplicate variants). Left untouched: it sits inside the app tree (with git worktrees) and relocating it risks breaking app/build references. If you want a single source of truth, treat this bucket as canonical and let the app reference/copy from here.

## Your manual step (agent cannot delete here)
Once you've confirmed the bucket copies are good, delete the now-duplicated doc originals from **library/06-product-eng/** (keep `cloudflare-agents/` until you decide its home), so `library/` holds regulatory corpus only. The `flygaca/office/` copy is a separate decision per above.

## Note
- Two `runbook-launch.md` count-corrected backups (.bak-counts-2026-06-14) came along with runbooks/ — harmless; delete the .bak files anytime.
