# product-engineering Plugin

**Status:** Phase 2 Implementation (Week 3-5)  
**Repo:** ay2m/FlyGACA  
**Agents:** 5

React + Express + regulatory corpus expertise for the product.

## Agents

| Agent | Owner | Status | Purpose |
|-------|-------|--------|---------|
| react-19-architect | New | Week 4 | React 19, Vite, TypeScript strict, RTL/i18n |
| express-backend-pro | New | Week 4 | Express 5, Cloud Run, SQL, HttpOnly JWT |
| regulatory-corpus-keeper | New | Week 4 | GACAR indexing, corpus policy (3 tiers), AIRAC |
| sql-migrator | New | Week 5 | PostgreSQL, forward-only migrations, Cloud SQL |
| genkit-rag-specialist | New | Week 5 | Gemini integration, RAG pipeline, Captain Adel grounding |

## Skills

- `react-typescript-strict.md` — Strict TS patterns, component design, RTL testing
- `express-security-patterns.md` — JWT, entitlements, injection prevention
- `gacar-corpus-policy.md` — Corpus tiers (HOST_SAFE_CORE, HOST_ORIGINAL, DO_NOT_HOST)
- `postgresql-migrations.md` — Schema evolution, Unix socket, no rollbacks
- `gemini-rag-patterns.md` — Genkit abstractions, RAG chunk strategy, grounding

## Orchestrators

At `fly-gaca-operations` level (shared by all plugins):
- `fly-gaca-feature-launch` — React + Express + corpus indexing coordination
- `fly-gaca-security-hardening` — Frontend + backend + data residency
- `fly-gaca-performance-optimization` — Bundle + endpoint + query tuning

## Constraints (Non-Inferable Facts)

**React:**
- React 19 strict mode enforced; all hooks must be exhaustive-deps compliant
- CSS Modules with design tokens; no inline styles
- RTL: all margins/padding use logical properties (margin-inline-start, etc.)
- No prop drilling; use Context or MCP for app state
- Test RTL rendering alongside LTR

**Express:**
- me-central2 (Dammam region) only; no other regions
- JWT in HttpOnly cookie; no localStorage tokens
- All entitlements server-owned; client cannot claim capabilities
- Every API endpoint validates user scope before accessing data
- SQL parameterization mandatory; no string interpolation
- Cloud Secret Manager for all credentials; never in .env files

**Corpus:**
- Three tiers: HOST_SAFE_CORE (freely hostable), HOST_ORIGINAL (Fly GACA authored), DO_NOT_HOST (cite with link only)
- Every citation must link to official GACAR source
- Unsure of tier? Default to DO_NOT_HOST
- AIRAC 28-day refresh cycle; always check effective date
- Never fabricate a citation

## Integration Points

- MCP `product-architecture-v1` — Owned by react-19-architect, express-backend-pro (read by all)
- MCP `corpus-index-v1` — Owned by regulatory-corpus-keeper
- GitHub Actions CI — Lint, type-check, test, build, deploy
- Code mirrors — Product repo's conventions take precedence

## Testing (Week 4-5)

```bash
# React component tests (RTL + LTR)
npm run test:react

# Express API tests
npm run test:api

# Corpus policy compliance
npm run test:corpus

# SQL migration safety
npm run test:migrations

# Genkit RAG integration
npm run test:genkit
```

## Deployment (Week 5)

Feature ship requires coordination:

1. React component → test RTL/LTR
2. Express endpoint → validate entitlements
3. Corpus update → verify tier classification
4. Documentation → push to Office

Use `fly-gaca-feature-launch` orchestrator.

## Next Steps

- Week 4: Agent .md files (agents/), skills/ (Read, Grep, Bash focused)
- Week 4: Link to ay2m/FlyGACA repo's CLAUDE.md
- Week 5: SQL migrator + genkit specialist agents
- Week 5+: Orchestrator integration testing
