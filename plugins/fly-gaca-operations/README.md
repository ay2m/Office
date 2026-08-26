# fly-gaca-operations Plugin

**Status:** Phase 2 Implementation (Week 5-7)  
**Scope:** Cross-repo orchestration  
**Agents:** 1 orchestrator agent + 5 orchestrator commands

Multi-agent workflows coordinating across Office, FlyGACA, and Captain-Adel.

## Agents

| Agent | Owner | Status | Purpose |
|-------|-------|--------|---------|
| operations-orchestrator | New | Week 7 | Stateless router for all orchestrated workflows |

## Orchestrators (Workflow Commands)

Each orchestrator is a Markdown `.md` file describing a multi-agent workflow.

| Orchestrator | Participants | Purpose | Run Frequency |
|--------------|--------------|---------|---------------|
| `full-sync` | cross-repo-sync, governance-auditor, entity-facts-guardian, all product/flight agents | Morning check-in: Office ↔ product ↔ service parity verification | Daily (6am UTC) |
| `feature-ship` | react-19-architect, express-backend-pro, flight-curriculum-designer, cross-repo-sync | Coordinate feature: React component → Express API → Captain Adel integration → Office docs | On-demand (developer triggers) |
| `compliance-audit` | ksa-compliance, entity-facts-guardian, flight-data-pipeline-engineer, governance-auditor | Quarterly: PDPL check, ZATCA readiness, Nitaqat/Tamheer eligibility, decision log review | Quarterly (month-start) |
| `security-hardening` | react-19-architect, express-backend-pro, flight-data-pipeline-engineer, ksa-compliance | Security review: React XSS, Express injection, data residency, PDPL boundaries | Quarterly (security sprints) |
| `performance-sprint` | react-19-architect, express-backend-pro, sql-migrator, flight-data-pipeline-engineer | Performance investigation: frontend bundle, backend endpoints, database queries, learner throughput | Quarterly (performance sprints) |

## Skills

- `multi-repo-coordination.md` — Three-repo sync protocol, PR opening sequence
- `cross-service-validation.md` — Health check patterns, MCP consensus verification

## Orchestrator Structure (Each .md file)

```yaml
---
title: Orchestrator Name
section: fly-gaca-operations
doc_type: orchestrator
status: active
owner: operations-orchestrator
last_updated: 2026-08-26
lang: en
---

## Purpose

[1-2 sentence summary]

## Participants

| Agent | Role |
|-------|------|
| agent-1 | Task |

## Workflow

1. [Step-by-step sequence]
2. [Sequential dependency order]
3. [MCP reads/writes]
4. [CI validation steps]
5. [Success criteria]

## Failure Scenarios

- Scenario 1 → Mitigation
- Scenario 2 → Mitigation

## Rollback

[How to undo if something goes wrong]
```

## MCP Writers (Internal Agents)

Two internal agents (built Week 5-6) write to MCP blocks that orchestrators depend on:

| Writer | Block | Trigger |
|--------|-------|---------|
| `mcp-entity-writer` | `office-entity-facts-v1` | entity-facts-guardian publishes changes |
| `mcp-product-writer` | `product-architecture-v1` | react-19-architect or express-backend-pro push design decisions |

These are **not** listed as public agents (no `.claude/agents/` .md files), but are documented in the orchestrator workflows.

## Integration Points

- **MCP:** All orchestrators read/write to shared KV store for state
- **GitHub Actions:** Orchestrators invoked via scheduled workflows (daily full-sync, on-demand feature-ship, quarterly audits)
- **Slack/Discord:** (Future) Orchestrator start/stop notifications, status posts
- **Claude Code:** Agents discover orchestrators via this plugin

## Testing (Week 6-7)

```bash
# Orchestrator definition validation
node tools/agents/check-agents.mjs  # Includes orchestrators

# MCP consensus verification
npm run test:orchestrator-mcp

# Cross-repo sync workflow (end-to-end)
npm run test:e2e-full-sync

# Feature ship dry-run
npm run test:e2e-feature-ship
```

## Scheduled Runs (Week 7+)

```yaml
# .github/workflows/fly-gaca-orchestrators.yml

- name: Daily full-sync (6am UTC)
  schedule: '0 6 * * *'
  run: node tools/orchestrators/run.mjs full-sync

- name: Monthly compliance audit (1st of month, noon UTC)
  schedule: '0 12 1 * *'
  run: node tools/orchestrators/run.mjs compliance-audit
```

## Monitoring

- **full-sync failures:** Alert on Slack #ops channel
- **feature-ship conflicts:** Escalate to PR reviewer
- **compliance-audit gaps:** Track in decision log
- **All failures:** Logged to `_logs/orchestrator-runs.jsonl`

## Next Steps

- Week 5: Orchestrator .md files (define workflows)
- Week 6: MCP writer agents + test suite
- Week 7: Scheduled CI integration + monitoring
- Week 8: Team onboarding + ops runbook
