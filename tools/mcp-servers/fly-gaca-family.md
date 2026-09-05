# Fly GACA Family MCP — Shared State Server

**Resource URI base:** `mcp://fly-gaca-family`

Five named KV resources store cross-repo context for the unified agent team across iflygaca/Office, iflygaca/FlyGACA, and iflygaca/Captain-Adel. Each resource has a designated owner agent and supports optimistic concurrency via SHA verification.

## Resources

| Resource | Owner Agent | Purpose | Read By | Write By |
|----------|-------------|---------|---------|----------|
| `office-entity-facts-v1` | entity-facts-guardian | Entity facts snapshot from `01-governance/company-facts.md` | cross-repo-sync, family-warden, react-19-architect, ml-instructor-trainer | entity-facts-guardian only |
| `product-architecture-v1` | react-19-architect, express-backend-pro | Frontend + backend design decisions, constraints, deployment strategy | all product agents, cross-repo-sync | react-19-architect, express-backend-pro only |
| `corpus-index-v1` | regulatory-corpus-keeper | GACAR document tiers, indexing status, AIRAC calendar, freshness timestamps | all content agents, cross-repo-sync | regulatory-corpus-keeper only |
| `captain-adel-model-v1` | ml-instructor-trainer | Instructor persona version, eval metrics, training pipeline state | all flight service agents, cross-repo-sync | ml-instructor-trainer only |
| `cross-repo-health-v1` | cross-repo-sync, family-warden | Contract parity, SHA verification, sync status, repo roster | all agents (read-only) | cross-repo-sync, family-warden only |

## Schema & Concurrency

Each KV entry includes:

```json
{
  "key": "resource-name",
  "value": { /* structured data */ },
  "sha": "sha256_hash_of_value",
  "version": 1,
  "last_updated": "2026-08-26T14:30:00Z",
  "owner": "agent-name",
  "created_at": "2026-08-26T14:30:00Z"
}
```

**Write pattern (optimistic concurrency):**
```javascript
// Agent reads current value + SHA
const { data, sha } = mcp.read('corpus-index-v1');

// Agent modifies data
data.last_corpus_indexing = new Date().toISOString();

// Agent writes back with expected SHA; conflict if SHA mismatch
try {
  mcp.write('corpus-index-v1', data, sha);
} catch (err) {
  console.error(`Concurrency conflict: ${err.message}`);
  // Retry: read again, re-merge, re-write
}
```

## Backend

**Type:** SQLite (better-sqlite3) or Supabase D1 (cloud)  
**Path:** `$MCP_DB_PATH` (default `/tmp/fly-gaca-family.db`)  
**Seed data:** `tools/mcp-servers/seed/*.json` (auto-loaded on startup)  
**Storage:** WAL mode (write-ahead logging) for concurrency safety

## Startup

```bash
node tools/mcp-servers/fly-gaca-family-mcp.js
# ✓ MCP server initialized at /tmp/fly-gaca-family.db
# Seed data loaded.
```

Seed files must exist and be valid JSON. Missing seed → logged warning, continue without it. Seed data is loaded via INSERT OR IGNORE, so existing writes are never overwritten by re-initialization.

## Agent Access

Agents access the MCP server via the Claude Code runtime. The `SendMessage` tool can query shared state by resource name:

```
Agent A (entity-facts-guardian):
  → Reads office-entity-facts-v1 from company-facts.md
  → Writes to MCP with SHA lock

Agent B (cross-repo-sync):
  → Reads office-entity-facts-v1 from MCP
  → Verifies against FlyGACA's src/lib/seo/jsonld.ts
  → Reports drift to family-warden
```

## Testing

```bash
# Verify schema and seed load
node tools/mcp-servers/fly-gaca-family-mcp.js

# List all resources (read-only)
sqlite3 /tmp/fly-gaca-family.db "SELECT key, version, last_updated FROM kv_store ORDER BY last_updated DESC;"

# Verify no SHA mismatches
npm run test:mcp-concurrency  # Week 3 deliverable
```

## CI/CD Gates

- **docs-check.yml** (Office): Add `node tools/mcp-servers/fly-gaca-family-mcp.js` step after check.mjs
- **fly-gaca-ci.yml** (FlyGACA): `npm run test:family-contract` includes MCP health check
- **captain-adel-ci.yml** (Captain-Adel): Same as FlyGACA

## Known Limitations

1. **Offline proof:** Three copies of the contract cannot prove byte-identity offline — only `version` + `sha` reduce to a visible diff. A scheduled cross-repo workflow (not yet built) would fully close this gap.
2. **Supabase migration:** This MVP uses local SQLite. Cloud deployment (Supabase D1) requires:
   - Environment variable `SUPABASE_URL`, `SUPABASE_KEY`
   - Schema migration to D1 dialect (minor)
   - Rate limiting + auth headers
   - Seed re-load on first cloud boot
