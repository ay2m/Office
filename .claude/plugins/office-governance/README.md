# Office Governance & Documentation Plugin

**Backbone plugin for the Fly GACA family architecture.**

Ports the Office repo's seven governance and documentation agents into a wshobson plugin architecture, enabling cross-repo orchestration, MCP state management, and qualified multi-harness deployment.

## Agents (7)

| Agent | Role | Color | Tools |
|-------|------|-------|-------|
| **doc-smith** | Document authoring, editing, print pipeline | cyan | Read, Write, Edit, Glob, Grep, Bash |
| **ar-mirror** | Arabic translation, ar/ mirror maintenance | purple | Read, Write, Edit, Glob, Grep, Bash |
| **ksa-compliance** | PDPL, ZATCA, MISA compliance scaffolding | yellow | Read, Write, Edit, Glob, Grep, Bash |
| **family-warden** | Contract parity, entity-facts consistency | magenta | Read, Edit, Glob, Grep, Bash |
| **governance-auditor** | Decision log, policy drift detection | blue | Read, Glob, Grep, Bash |
| **entity-facts-guardian** | Entity facts, IBAN protection, versioning | green | Read, Glob, Grep, Bash |
| **cross-repo-sync** | Office ↔ FlyGACA ↔ Captain-Adel coordination | orange | Read, Edit, Bash |

## Skills

- **office-ci-gates** — Front-matter, PDF coverage, staleness gates
- **entity-facts-validation** — Entity facts parity with MCP
- **cross-repo-stamping** — Contract versioning, hash stamping workflow

## Commands

- **office-sync** — Manual trigger for cross-repo sync workflow

## Integration

This plugin is registered in the marketplace at `.claude/plugins/marketplace.json` and is automatically discovered by Claude Code when the `flygaca-family` plugin collection is installed.

### MCP Memory State

| Memory Key | Agent | Purpose |
|-----------|-------|---------|
| `office-entity-facts-v1` | entity-facts-guardian | Current entity facts snapshot from company-facts.md |
| `office-governance-v1` | governance-auditor | Decision log state and policy drift tracking |
| `office-contract-v1` | family-warden | Family contract version, sha, and parity status |

---

**Fly GACA | Phase 2: Multi-Repo Agent Architecture | Foundation (Week 1-2)**
