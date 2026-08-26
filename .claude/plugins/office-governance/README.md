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

Registered in the family marketplace at `.claude-plugin/marketplace.json`:

```
/plugin marketplace add ay2m/Office
/plugin install office-governance@flygaca-family
```

**Installing it inside `ay2m/Office` itself is redundant.** A session in this repo already loads
`.claude/agents/` automatically; this plugin exists so the same seven agents are available in a
session that does *not* have the Office checkout. The seven agent files here are byte-identical
copies of `.claude/agents/`, and `tools/agents/check-agents.mjs` fails CI if they ever diverge —
so edit one, copy it to the other, in the same commit.

### MCP Memory State

| Memory Key | Agent | Purpose |
|-----------|-------|---------|
| `office-entity-facts-v1` | entity-facts-guardian | Current entity facts snapshot from company-facts.md |
| `office-governance-v1` | governance-auditor | Decision log state and policy drift tracking |
| `office-contract-v1` | family-warden | Family contract version, sha, and parity status |

## What this plugin is not

`office-docs` (also Office-hosted) carries the **commands** for the doc convention and print
pipeline; this plugin carries the **agents and skills**. The cross-repo workflows —
`/full-sync`, `/feature-ship`, `/security-sweep`, `/compliance-review` — live in
`family-orchestrators`. Install what you need; none of the three duplicates another.

---

**Fly GACA | Phase 2 Multi-Repo Agent Architecture | reconciled in Phase 2.2**
