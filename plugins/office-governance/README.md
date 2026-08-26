# office-governance Plugin

**Status:** Phase 2 Implementation (Week 3-4)  
**Agents:** 7 (4 existing + 3 new)

Governance, compliance, and cross-repo consistency for the Office and the family.

## Agents

| Agent | Owner | Status | Purpose |
|-------|-------|--------|---------|
| doc-smith | (existing) | Done | Document editing, print pipeline |
| ar-mirror | (existing) | Done | Arabic translation and mirror |
| ksa-compliance | (existing) | Done | Saudi regulation expertise (PDPL, ZATCA, MISA) |
| family-warden | (existing) | Done | Family contract parity and consistency |
| governance-auditor | New | Week 3-4 | Decision log, reversibility, policy drift |
| entity-facts-guardian | New | Week 3-4 | Company facts parity, IBAN protection |
| cross-repo-sync | New | Week 3-4 | Office ↔ FlyGACA ↔ Captain-Adel coordination |

## Skills

- `office-ci-gates.md` — CI/CD gate strategy
- `entity-facts-validation.md` — company-facts.md validation rules
- `cross-repo-stamping.md` — Contract re-stamping workflow

## Orchestrators

None at plugin level; orchestrators are in `fly-gaca-operations` plugin.

## Week 3-4 Deliverables

### `agents/governance-auditor.md`
- Tools: Read, Glob, Grep, Bash
- Color: blue
- Owns: Decision log (DEC-NNN format), reversibility tracking, policy drift detection
- Non-inferable facts: Decision schema fields, reversibility scoring, stakeholder roles

### `agents/entity-facts-guardian.md`
- Tools: Read, Glob, Grep, Bash
- Color: green
- Owns: company-facts.md parity with MCP, IBAN/account protection, version stamping
- Non-inferable facts: 12 entity fields, IBAN/account never in manifest, version bump sequence

### `agents/cross-repo-sync.md`
- Tools: Read, Edit, Bash
- Color: orange
- Owns: ay2m/Office ↔ ay2m/FlyGACA ↔ ay2m/Captain-Adel sync coordination
- Non-inferable facts: Three-repo byte-identical contract workflow, synchronized PR opening, SHA verification

## Integration Points

- `.claude/agents/README.md` — Updated with three new agents and shared constraints
- `01-governance/CLAUDE.md` — Links to this plugin and agent roster
- `contracts/flygaca-family.json` — Read-only for sync verification
- `06-operations-it/agent-workforce-plan.md` — Live reference

## Testing (Week 3)

```bash
# Validate agent definitions
node tools/agents/check-agents.mjs

# Test cross-repo sync workflow
npm run test:cross-repo-sync  # (Week 3 deliverable)
```

## Next Steps

- Week 3: Agent .md files + skills
- Week 4: Integrate with MCP (entity-facts-guardian reads/writes to MCP)
- Week 5: Product-engineering and flight-service agents (depend on office-governance)
