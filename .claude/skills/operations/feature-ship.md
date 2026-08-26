---
name: feature-ship
description: End-to-end feature shipping — coordinate React component, Express API, curriculum/data, docs across three repos
---

# Feature-Ship Workflow

**Orchestrator:** operations-orchestrator  
**Trigger:** Manual command `/feature-ship <feature-name> [scope]`  
**Duration target:** 30 minutes  
**Participants:** react-19-architect, express-backend-pro, flight-curriculum-designer or flight-data-pipeline-engineer, doc-smith, cross-repo-sync

## Pre-flight checks

- [ ] Developer has opened feature branch on at least one repo (FlyGACA or Captain-Adel)
- [ ] Feature branch is up-to-date with main (no stale merge base)
- [ ] No ongoing full-sync or compliance-audit workflows
- [ ] MCP server is running

## Workflow Steps

### Step 1: Frontend Review (react-19-architect) [Optional]
**Duration:** 5-8 minutes (skip if scope=api-only)

1. If FlyGACA repo has changes:
   - Verify TypeScript strict mode enforced (no `any` types)
   - Verify all props typed explicitly
   - Verify i18n hooks used for all user strings (no hardcoded text)
   - Verify RTL logical properties (margin-inline, padding-inline, etc.)
   - Verify no localStorage for sensitive data
   - Check React 19 strict mode compliance (no deprecated features)
   - Review for CSS Modules (no inline styles)
2. Run linter + typecheck on changed files:
   - `npm run lint` and `npm run type-check`
3. Sign off: "✅ React component ready to ship" or escalate with required changes

**Outcomes:**
- ✅ Component review passed
- ⚠️ Minor style issues, minor refactoring suggested (optional for this PR)
- ❌ Blocking issues (TypeScript errors, missing i18n, hardcoded text) — require fixes before shipping

### Step 2: Backend Review (express-backend-pro) [Optional]
**Duration:** 5-8 minutes (skip if scope=frontend-only)

1. If FlyGACA or Captain-Adel repo has API changes:
   - Verify parameterized queries (no SQL injection)
   - Verify HttpOnly JWT cookies (no localStorage tokens)
   - Verify server-owned entitlements (backend verifies access, not frontend)
   - Verify me-central2 region (no data leaks to Doha or US)
   - Verify error responses are generic to client (no stack traces)
   - Verify CORS origin whitelist enforced
2. Run linter + typecheck on API code:
   - `npm run lint` and `npm run type-check`
3. For database schema changes:
   - Verify forward-only migrations (no rollbacks, no drops)
   - Verify immutable audit trail (all mutations logged)
4. Sign off: "✅ API ready to ship" or escalate with required changes

**Outcomes:**
- ✅ API review passed
- ⚠️ Minor style issues, optional refactoring (don't block ship)
- ❌ Blocking issues (SQL injection risk, localStorage tokens, security bypass) — require fixes

### Step 3: Curriculum/Data Review [Optional]
**Duration:** 5-8 minutes (skip if scope=code-only)

1. If curriculum changes (PPL, CPL, IR, ATPL, ELPT, AIP modules):
   - Verify all new questions cite GACAR sections (non-negotiable)
   - Verify GACAR alignment (no made-up rules)
   - Verify three-step review gate status (draft → SME review → publish)
   - If updating learner data pipeline:
     - Verify PDPL compliance (retention policies, audit trail, anonymization)
     - Verify data residency (no export to US/EU, stays in-Kingdom)
2. For flight-hour or learner data changes:
   - Verify immutable audit trail (insert/update/delete all logged)
   - Verify currency calculation rules are correct per certification type
   - Verify no sensitive PII in pipeline logs
3. Sign off: "✅ Curriculum/data ready to ship" or escalate

**Outcomes:**
- ✅ Curriculum/data review passed
- ⚠️ Minor pedagogical suggestions (don't block ship)
- ❌ Blocking issues (non-GACAR, PDPL violation, data leaks) — require fixes

### Step 4: Documentation (doc-smith)
**Duration:** 3-5 minutes

1. If feature touches user-facing functionality:
   - Verify product docs updated (in docs/ or help center)
   - Verify bilingual parity (EN and AR translations)
   - Verify no sensitive data in docs
2. If feature touches internal operations:
   - Verify runbook updated (if operational impact)
   - Verify decision log entry created (if architectural decision made)
3. Sign off: "✅ Docs synchronized" or provide doc changes

**Outcomes:**
- ✅ Docs updated and synchronized
- ⚠️ Docs optional for this feature (log why)
- ❌ Critical docs missing (user-facing feature without docs) — require doc before ship

### Step 5: Cross-Repo Sync Check (cross-repo-sync)
**Duration:** 5-8 minutes

1. Verify no merge conflicts:
   - Fetch main from all three repos
   - Attempt to rebase/merge feature branch onto current main
   - If conflicts exist:
     - Halt workflow and alert developer
     - Developer resolves conflicts and re-runs feature-ship
2. Verify contract integrity:
   - Check `contracts/flygaca-family.json` version hasn't been bumped by feature (only family-warden bumps this)
   - Verify entity facts block unchanged (unless governance approved a change)
3. Verify no unintended changes to shared files:
   - If feature modified files outside its repo's ownership, flag for manual review
4. Generate merge summary:
   - What changes are in each repo?
   - Which agents reviewed each change?
   - Any security/PDPL concerns?
5. Sign off: "✅ Ready to merge all three repos" or escalate with issues

**Outcomes:**
- ✅ No conflicts, no unintended changes, all repos ready to merge
- ⚠️ Minor issues detected (e.g., docs could be better) — log but don't block
- ❌ Blocking issues (merge conflicts, contract tampering, security bypass) — halt and escalate

### Step 6: Summary and Report
**Duration:** 2-3 minutes

1. Aggregate results from steps 1-5:
   - Frontend: pass/skip/fail
   - Backend: pass/skip/fail
   - Curriculum/data: pass/skip/fail
   - Docs: pass/skip/fail
   - Merge check: pass/fail
2. Determine overall status:
   - If all pass/skip → ✅ READY TO MERGE
   - If 1-2 warn → ⚠️ CONDITIONAL (log warnings)
   - If any fail → ❌ BLOCKERS (halt, escalate)
3. Generate report:
   ```yaml
   feature-ship-run:
     feature-name: learner-progress-tracking
     scope: full-stack
     timestamp: 2026-08-26T10:30:00Z
     duration_minutes: 28
     status: ready-to-merge
     
     frontend:
       status: pass
       repo: ay2m/FlyGACA
       files-changed: 8
       ts-errors: 0
       i18n-complete: true
       rtl-compliant: true
     
     backend:
       status: pass
       repo: ay2m/FlyGACA
       files-changed: 5
       security-issues: 0
       migration-required: true
       migration-status: forward-only
     
     curriculum:
       status: skip
       reason: feature is code-only
     
     docs:
       status: pass
       repo: ay2m/Office
       files-changed: 2
       bilingual: true
     
     merge-check:
       status: pass
       conflicts: 0
       contract-intact: true
       all-repos-mergeable: true
     
     blockers: []
     warnings: []
   ```
4. If READY TO MERGE:
   - Post summary to Slack #engineering
   - Developer can proceed with merging feature branch to main on all repos
5. If BLOCKERS:
   - Post FAILED summary to Slack with blocker details
   - Developer must fix and re-run feature-ship

## Decision Tree

```
Frontend changes?
├─ Yes → Run frontend review
│  ├─ Pass → Continue
│  └─ Fail → HALT: require fixes
└─ No → Skip frontend review

Backend changes?
├─ Yes → Run backend review
│  ├─ Pass → Continue
│  └─ Fail → HALT: require fixes
└─ No → Skip backend review

Curriculum/data changes?
├─ Yes → Run curriculum review
│  ├─ Pass → Continue
│  └─ Fail → HALT: require fixes
└─ No → Skip curriculum review

Docs updated?
├─ Yes → Check completeness
│  ├─ Complete → Continue
│  └─ Incomplete (user-facing) → HALT: require docs
└─ No/Optional → Continue

All merge checks pass?
├─ Yes → READY TO MERGE
└─ No → HALT: resolve conflicts, re-run

Overall status?
├─ READY TO MERGE → Post to Slack, developer proceeds
└─ BLOCKERS → Post failures, developer fixes and re-runs
```

## Rollback (if needed)

If workflow detects a critical issue post-merge:
1. **Developer reverts the feature branch** on main
2. **Re-run feature-ship** to validate rollback is clean
3. **Root-cause the blocker** (was it a missed security check? Bad test coverage?)
4. **Fix and re-ship** once root cause is addressed

## Idempotency

Running feature-ship twice on the same feature branch should produce the same results:
- Same code → same linter/typecheck results
- Same docs → same bilingual check
- Same merge base → same conflict detection

This allows feature-ship to be re-run safely if a transient error occurs.
