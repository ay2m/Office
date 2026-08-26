# Fly GACA Family MCP — Week 1-2 Foundation

**Status:** Phase 2 Implementation (Week 1-2 Foundation)  
**Last Updated:** 2026-08-26

Shared state server for the unified agent team across ay2m/Office, ay2m/FlyGACA, and ay2m/Captain-Adel.

## Quick Start

### Installation

```bash
cd tools/mcp-servers
npm install
```

### Initialize (Development)

```bash
npm run init
# ✓ MCP server initialized at /tmp/fly-gaca-family.db
# Seed data loaded.
```

This creates a local SQLite database at `$MCP_DB_PATH` (default `/tmp/fly-gaca-family.db`) and loads seed data from `tools/mcp-servers/seed/*.json`.

### Running Tests

```bash
npm test
# All MCP tests completed.
```

Tests verify:
- ✓ SHA-based optimistic locking (concurrency safety)
- ✓ Seed data integrity
- ✓ Read/write operations
- ✓ Resource listing and filtering

## Architecture

### Components

| File | Purpose |
|------|---------|
| `fly-gaca-family-mcp.js` | Core MCP server (SQLite backend, SHA-based locking) |
| `fly-gaca-family.md` | Resource definition and API docs (agent discovery) |
| `seed/*.json` | Initial state for all five KV resources |
| `package.json` | Dependencies and scripts |
| `tests/mcp.test.js` | Concurrency tests (CI gate) |

### Five KV Resources

**See `fly-gaca-family.md` for full schema and concurrency patterns.**

1. **office-entity-facts-v1** — Entity facts from `01-governance/company-facts.md` (read-only for agents)
2. **product-architecture-v1** — React + Express design decisions and constraints
3. **corpus-index-v1** — GACAR document tiers, indexing status, AIRAC calendar
4. **captain-adel-model-v1** — Instructor persona version, eval metrics, training pipeline
5. **cross-repo-health-v1** — Contract parity, SHA verification, sync status

## Deployment Paths

### Local (Development)

```bash
npm run init
# Uses /tmp/fly-gaca-family.db
# Suitable for agent dev/test; data is ephemeral
```

### Cloud (Supabase D1) — Week 3+

```bash
# Set environment variables
export SUPABASE_URL="https://xxx.supabase.co"
export SUPABASE_KEY="sbp_xxx"
export MCP_DB_PATH="https://xxx.supabase.co/rest/v1/kv_store"

npm run init
# Seed data loads to D1; uses HTTP API
```

(Schema migration to D1 dialect required; see `fly-gaca-family.md` limitations.)

## CI/CD Integration

**Office (docs-check.yml):**
```bash
node tools/agents/check-agents.mjs        # Validate agent definitions
node tools/mcp-servers/fly-gaca-family-mcp.js  # (optional in Week 2)
```

**FlyGACA & Captain-Adel (ci.yml):**
```bash
npm run test:family-contract  # Includes MCP health check
```

## Concurrency Model

All writes use **optimistic locking with SHA verification**:

```javascript
const { data, sha } = mcp.read('corpus-index-v1');

// Modify data...
data.last_corpus_indexing = new Date().toISOString();

// Write with SHA lock (fails if another agent changed it)
try {
  mcp.write('corpus-index-v1', data, sha);
} catch (err) {
  // Retry: read again, merge, re-write
}
```

This prevents lost updates when multiple agents write to the same resource. The `version` field auto-increments on every successful write.

## Seed Data Format

Each seed file in `seed/` is a JSON object with `owner` and `timestamp`:

```json
{
  "owner": "entity-facts-guardian",
  "timestamp": "2026-08-26T00:00:00Z",
  "source": "01-governance/company-facts.md",
  "entity": { /* ... */ }
}
```

Seed files are loaded on startup via `INSERT OR IGNORE`, so existing data is never overwritten by re-init.

## Troubleshooting

### "Cannot find module 'better-sqlite3'"

```bash
cd tools/mcp-servers
npm install
```

### Database locked

SQLite uses WAL mode. Ensure no other process is holding the database. For testing:

```bash
rm /tmp/fly-gaca-family.db*
npm run init
```

### Concurrency conflicts in tests

This is expected — tests validate that conflicts are caught. Look for error messages like:

```
Concurrency conflict on [resource]: expected sha xxx, got yyy.
```

Retry logic should read, merge, and re-write.

## Links

- **Phase 2 Plan:** `06-operations-it/agent-workforce-plan.md` (§7-11)
- **Resource API:** `tools/mcp-servers/fly-gaca-family.md`
- **Agent Validation:** `tools/agents/check-agents.mjs`
- **CI Gate:** `.github/workflows/docs-check.yml`

## Next Steps (Week 3)

- [ ] Supabase D1 migration (if cloud deployment chosen)
- [ ] Agent implementations (governance-auditor, entity-facts-guardian, cross-repo-sync)
- [ ] MCP agent writer helpers (internal agents for entity/chat block updates)
- [ ] Full-sync orchestrator (morning check-in across all three repos)
