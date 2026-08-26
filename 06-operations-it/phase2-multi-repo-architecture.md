---
title: Fly GACA — Phase 2 Multi-Repo Agent Architecture
section: 06-operations-it
doc_type: architecture
status: active
owner: Founder
last_updated: 2026-08-26
lang: en
---

# Phase 2: Multi-Repo Agent Architecture

**Version:** 2.0.0 | **Effective:** 2026-08-26 | **Duration:** Weeks 3–10 (after Phase 5 Week 1–2)

> **Purpose.** Migrate the flat agent roster into a wshobson plugin architecture with unified MCP state management, enabling coordinated multi-repo workflows, qualified harness deployment (Claude Code, Cursor, desktop app), and commercial-quality multi-agent orchestration.

---

## Framework Selection

### Research Complete

Both `wshobson/agents` and `msitarzewski/agency-agents` offer distinct strengths:

| Framework | Best For | Advantage |
|-----------|----------|-----------|
| **wshobson/agents** | Multi-repo orchestration | 93 plugins, 202 agents, single source of truth, 16 orchestrators, enterprise quality gates |
| **msitarzewski/agency-agents** | Personality + UX | 5.5K stars, persona-driven agents, MCP memory patterns, 5 full workflow examples, desktop app |

### Decision: Hybrid Approach

- **Backbone**: wshobson/agents for plugin architecture, multi-harness adapters, orchestrators, quality gates
- **Personality Layer**: Inspired by msitarzewski emoji + color + vibe model
- **State Management**: MCP servers (proven by msitarzewski examples)
- **Team Experience**: Start wshobson for operational rigor; layer msitarzewski personas for human collaboration

---

## Plugin Architecture

### Four Plugins (Fly GACA Family)

| Plugin | Owner | Agents | Purpose |
|--------|-------|--------|---------|
| **office-governance** | ay2m/Office | 7 | Document authoring, compliance, entity facts, cross-repo sync |
| **product-engineering** | ay2m/FlyGACA | 5 | React, Express, corpus, SQL, RAG |
| **flight-service** | ay2m/Captain-Adel | 4 | Curriculum, model tuning, learner data, deployment |
| **fly-gaca-operations** | ay2m/Office | 5 orchestrators | Cross-repo workflows (full-sync, feature-ship, compliance-audit, security-hardening, performance-sprint) |

### Office Governance Plugin (7 agents)

**Agents:**
- **doc-smith** (cyan) — Markdown/HTML → PDF pipeline, front-matter, templates
- **ar-mirror** (purple) — Arabic translation, `ar/` mirror maintenance
- **ksa-compliance** (yellow) — PDPL, ZATCA, MISA scaffolding
- **family-warden** (magenta) — Contract parity, entity-facts consistency
- **governance-auditor** (blue) — Decision log, policy drift detection
- **entity-facts-guardian** (green) — Entity facts, IBAN protection, versioning
- **cross-repo-sync** (orange) — Office ↔ FlyGACA ↔ Captain-Adel coordination

**Skills:**
- office-ci-gates — Front-matter, PDF coverage, staleness
- entity-facts-validation — Entity facts parity
- cross-repo-stamping — Contract versioning and stamping

**Commands:**
- office-sync — Manual cross-repo synchronization

### Product Engineering Plugin (5 agents, ay2m/FlyGACA)

**Agents:**
- **react-19-architect** (teal) — React 19, Vite, RTL, TypeScript strict
- **express-backend-pro** (indigo) — Express 5, Cloud Run, security
- **regulatory-corpus-keeper** (amber) — GACAR corpus, citation tiers
- **sql-migrator** (stone) — PostgreSQL, forward-only migrations
- **genkit-rag-specialist** (lime) — Gemini, RAG pipeline, grounding

**Skills:**
- react-typescript-strict
- express-security-patterns
- gacar-corpus-policy
- postgresql-migrations
- gemini-rag-patterns

**Commands:**
- feature-launch — React + Express + corpus coordination
- security-hardening — Security audit across frontend + backend
- performance-sprint — Bundle + endpoint + query optimization

### Flight Service Plugin (4 agents, ay2m/Captain-Adel)

**Agents:**
- **flight-curriculum-designer** (sky) — Syllabus, exam scope, learner paths
- **ml-instructor-trainer** (violet) — Persona tuning, model fine-tuning, eval
- **flight-data-pipeline-engineer** (rose) — Learner data, flight-hours, PDPL
- **instructor-deployment-steward** (fuchsia) — Cloud Run hosting, webhooks

**Skills:**
- aviation-pedagogy
- flight-instructor-personas
- pdpl-learner-data
- captadel-deployment

**Commands:**
- instructor-launch — Curriculum + model + deployment sequencing
- personalization-tuning — Learner feedback loop → model improvement

### Operations & Orchestration Plugin (5 orchestrators, ay2m/Office)

**Agents:**
- **operations-orchestrator** (rose) — Multi-agent workflow coordination

**Orchestrators:**
| Workflow | Agents | Purpose |
|----------|--------|---------|
| `/full-sync` | cross-repo-sync, governance-auditor, entity-facts-guardian + product-engineering, flight-service | Morning check-in: Office ↔ product ↔ service; verify contracts, entity facts, decision log |
| `/feature-ship` | react-19-architect, express-backend-pro, flight-curriculum-designer, cross-repo-sync | Ship a feature: React → Express API → Captain Adel integration → Office docs |
| `/compliance-audit` | ksa-compliance, entity-facts-guardian, flight-data-pipeline-engineer, governance-auditor | Quarterly: PDPL, ZATCA, Nitaqat, decision log review |
| `/security-hardening` | (product-engineering security flow), (flight-service data security), ksa-compliance | Security review: XSS, injection, data residency, PDPL |
| `/performance-sprint` | (product-engineering performance flow), sql-migrator, flight-data-pipeline-engineer | Performance: bundle, endpoints, queries, learner throughput |

---

## MCP Memory State Management

Shared MCP server stores context across agent sessions:

| Memory Key | Agents Writing | Purpose |
|------------|-----------------|---------|
| `office-entity-facts-v1` | entity-facts-guardian | Current entity facts snapshot from company-facts.md |
| `office-governance-v1` | governance-auditor | Decision log state and policy drift |
| `office-contract-v1` | family-warden | Family contract version, sha, parity status |
| `product-architecture-v1` | react-19-architect, express-backend-pro | Frontend + backend design decisions |
| `corpus-index-v1` | regulatory-corpus-keeper | GACAR document index, freshness timestamp |
| `captain-adel-model-v1` | ml-instructor-trainer | Model version, persona tuning params |
| `flight-data-v1` | flight-data-pipeline-engineer | Learner data ingestion status, currency checks |
| `cross-repo-health-v1` | cross-repo-sync, family-warden | Contract parity check, sha verification |

---

## Deployment Strategy

### Harnesses (Multi-Harness Deployment)

Agents deployable to:

1. **Claude Code** (native CLAUDE.md integration, marketplace discovery)
   - Full tool access, all agents
   - Marketplace-hosted plugin discovery
2. **Cursor** (via wshobson adapter framework, auto-generated rules)
   - Subset of agents (adapter guards tool access)
   - Rules-based agent invocation
3. **Desktop App** (optional, msitarzewski-inspired)
   - Browse agent roster visually
   - Lightweight GUI for non-technical team members
   - MCP memory visualization

### Plugin Registry

- Plugins registered in `.claude/plugins/marketplace.json`
- `flygaca-family` collection: three active plugins (office-governance, product-engineering, flight-service) + orchestration
- Auto-discovered by Claude Code when collection is installed
- Upstream contribution: aviation-specific agents (regulatory-corpus-keeper, flight-curriculum-designer, ml-instructor-trainer) to wshobson marketplace post-launch

---

## Integration with Phase 5

Phase 5 (Weeks 1–12, parallel to Phase 2 Weeks 3–10):
- **Phase 5 Week 1 kickoff** → Agent champions assigned, first invocations logged
- **Phase 2 Weeks 3–10 build** → Agents tested in daily workflows
- **Phase 5 Weeks 2–12 metrics** → Invocation log feeds Phase 2 effectiveness validation
- **Phase 5 Week 12 review** → Agent portfolio readiness for Phase 6

Agents are scaffolding; Phase 5 measures whether they actually add ROI. Phase 2 architecture supports that measurement with MCP memory state and effectiveness scoring formulas.

---

## Implementation Phases (5 phases, Weeks 3–10)

### Phase 1: Foundation (Weeks 3–4)

1. Create wshobson plugin structure (`plugins/` directory)
2. Port existing agents into `office-governance` plugin
3. Add 3 new Office agents (already created: governance-auditor, entity-facts-guardian, cross-repo-sync)
4. Set up MCP memory server (standard MCP architecture)
5. CI: Extend `.claude/agents/` validation to plugin structure

**Deliverables:**
- `.claude/plugins/office-governance/` complete (7 agents, 3 skills, 1 command)
- MCP memory server skeleton
- Updated CI gates for plugin structure

### Phase 2: Product Engineering Agents (Weeks 5–6)

1. Create `product-engineering` plugin structure in ay2m/FlyGACA
2. Port 5 agents (react-19-architect, express-backend-pro, regulatory-corpus-keeper, sql-migrator, genkit-rag-specialist)
3. Link to FlyGACA repo CLAUDE.md
4. Create feature-launch orchestrator (example: new exam feature → React component + Express API + corpus update)
5. Validate with one live feature shipping

**Deliverables:**
- ay2m/FlyGACA: `.claude/plugins/product-engineering/`
- 5 agents with persona (emoji, color, vibe)
- feature-launch orchestrator tested end-to-end

### Phase 3: Flight Service Agents (Weeks 7–8)

1. Create `flight-service` plugin structure in ay2m/Captain-Adel
2. Port 4 agents (flight-curriculum-designer, ml-instructor-trainer, flight-data-pipeline-engineer, instructor-deployment-steward)
3. Link to Captain-Adel repo CLAUDE.md
4. Create instructor-launch orchestrator
5. Validate with one curriculum iteration

**Deliverables:**
- ay2m/Captain-Adel: `.claude/plugins/flight-service/`
- 4 agents with persona
- instructor-launch orchestrator tested

### Phase 4: Orchestration + Testing (Week 9)

1. Build `fly-gaca-operations` plugin with 5 orchestrators (full-sync, feature-ship, compliance-audit, security-hardening, performance-sprint)
2. Run full-sync weekly; validate Office ↔ product ↔ service parity
3. Document 3 common workflows (feature ship, compliance audit, performance sprint)
4. Team onboarding: show how to use desktop app (optional) + CLI commands

**Deliverables:**
- `.claude/plugins/fly-gaca-operations/` with 5 orchestrators
- Workflow documentation (feature-ship, compliance-audit, security-hardening, performance-sprint)
- Team onboarding guide

### Phase 5: Production (Week 10+)

1. Deploy to Claude Code + Cursor + optional desktop app
2. Team uses orchestrators in daily workflows
3. Monthly agent ecosystem review (add agents, refine, archive unused)
4. Contribution: upstream aviation-specific agents to wshobson marketplace
5. Metrics integration: Phase 5 invocation log feeds agent effectiveness scoring

**Deliverables:**
- All plugins deployed and discoverable
- Team using orchestrators daily
- Phase 5 metrics dashboard tracking invocations
- Upstream contributions filed

---

## Success Criteria

1. **Unified Team** — All 16+ agents discoverable in one place; clear ownership per repo
2. **No Duplication** — Office facts, product architecture, service state maintained once; agents read from MCP memory
3. **Orchestration Works** — full-sync runs weekly, zero manual intervention; reports parity
4. **Developer Experience** — Each team uses agents daily without friction
5. **Quality Gates** — Every agent has clear non-inferable facts; decision log records why each earned its slot
6. **Multi-Harness Ready** — Agents deployable to Claude Code, Cursor, optional desktop app (wshobson adapters)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| **Plugin scope creep** — 16 agents feels small; pressure to add more | Document "earn its slot" test; every new agent needs non-inferable facts + design review |
| **MCP memory drift** — Office facts and product architecture diverge | cross-repo-sync orchestrator runs weekly; governance-auditor flags inconsistencies |
| **Harness compatibility** — wshobson plugins work in Claude Code; unclear if all agents work in Cursor/OpenCode | Test with adapter framework in Phase 2.2; may need lite personas for unsupported tools |
| **Personality vs. rigor** — msitarzewski vibe feels lightweight vs. wshobson enterprise rigor | Hybrid: wshobson architecture for consistency, msitarzewski personas for approachability |
| **Orchestrator complexity** — 5 multi-agent orchestrators could become hard to maintain | Document each as single Markdown command; treat as infrastructure, not agent |

---

## Coordination with Phase 5

**Timeline alignment:**
- Phase 5 Week 1 (Aug 26–Sep 1): Kickoff, agent champions assigned
- Phase 2 Weeks 1–2 (Sep 2–15): Foundation, office-governance plugin built
- Phase 5 Weeks 2–4: Team logs first invocations, effectiveness metrics start
- Phase 2 Weeks 3–4 (Sep 16–29): Product engineering agents ported
- Phase 2 Weeks 5–6 (Sep 30–Oct 13): Flight service agents ported
- Phase 5 Weeks 5–8: Team adoption ramps; agents tested in daily workflows
- Phase 2 Weeks 7–8 (Oct 14–27): Orchestration layer complete, full-sync live
- Phase 5 Weeks 9–12: Metrics deep-dive, effectiveness review, agent retirements decided
- Phase 2 Week 9+ (Oct 28+): Production deployment, upstream contributions

Phase 5 effectiveness scoring informs Phase 2 orchestrator refinement — if an agent is low-ROI in invocation logs, its role in workflows is revisited.

---

*Fly GACA | Phase 2: Multi-Repo Agent Architecture | Foundation Complete (Week 1)*
