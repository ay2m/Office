# flight-service Plugin

**Status:** Phase 2 Implementation (Week 4-6)  
**Repo:** ay2m/Captain-Adel  
**Agents:** 4

AI flight instructor service: curriculum, model tuning, learner data, deployment.

## Agents

| Agent | Owner | Status | Purpose |
|-------|-------|--------|---------|
| flight-curriculum-designer | New | Week 4 | Syllabus, exam scope, learner paths, mock exams |
| ml-instructor-trainer | New | Week 5 | Model persona, fine-tuning, eval metrics |
| flight-data-pipeline-engineer | New | Week 5 | Learner data ingestion, flight-hour tracking, currency |
| instructor-deployment-steward | New | Week 6 | captadel.com hosting, Cloud Run revision mgmt |

## Skills

- `aviation-pedagogy.md` — GACAR alignment, safety-critical design, exam structure
- `flight-instructor-personas.md` — Captain Adel persona (warm, challenging, culturally aware)
- `pdpl-learner-data.md` — PDPL compliance for learner records, in-Kingdom data residency
- `captadel-deployment.md` — Standalone captadel.com, separate from FlyGACA deployment

## Orchestrators

At `fly-gaca-operations` level (shared by all plugins):
- `captain-adel-launch` — Curriculum + model training + deployment sequencing
- `captain-adel-personalization-tuning` — Learner feedback loop → model improvement

## Constraints (Non-Inferable Facts)

**Curriculum:**
- GACAR-aligned; every module must reference official GACAR chapter/section
- Exam questions are safety-critical; mock exams validated by SMEs
- Learner path progression: foundational knowledge → scenario-based → high-stakes
- No shortcuts; pacing follows cognitive load research

**ML/Instructor Persona:**
- Captain Adel: warm but demanding, encourages learner reasoning before answers
- Personality tuning: emoji, color, vibe, response latency all matter
- Eval metrics: knowledge retention (+15% target), confusion detection, engagement
- Training data: PDPL-compliant learner interactions, no external data leakage

**Learner Data:**
- All data in me-central2 (Dammam region); never leaves Kingdom
- Flight logbook schema: date, aircraft, route, performance notes, sign-off
- Currency tracking: recency rules per GACAR (e.g., 3 landings in 90 days for CPL)
- No external processing; inference happens server-side only

**Deployment:**
- captadel.com is **separate** from flygaca.com; distinct Cloud Run services
- Webhook routing: learner quiz submission → Captain Adel inference → response
- Version pinning: frozen model version per cohort (no live updates mid-cohort)
- Rollback: Cold start from previous pinned version; 5min max recovery

## Integration Points

- MCP `captain-adel-model-v1` — Owned by ml-instructor-trainer (version, persona params)
- MCP `cross-repo-health-v1` — Read-only; no direct writes from flight agents
- GitHub Actions CI — Type-check, curriculum validation, model eval
- Code mirrors — Captain Adel repo's conventions take precedence

## Testing (Week 5-6)

```bash
# Curriculum compliance with GACAR
npm run test:curriculum

# Instructor persona consistency
npm run test:persona

# Learner data pipeline (PDPL)
npm run test:data-pipeline

# Flight-hour currency calculation
npm run test:currency

# Model deployment safety
npm run test:deployment
```

## Deployment (Week 6)

Curriculum launch requires coordination:

1. Curriculum design + SME review
2. Mock exam generation + validation
3. Model fine-tuning on curriculum
4. Learner path + cohort setup
5. captadel.com deployment (separate from FlyGACA)

Use `captain-adel-launch` orchestrator.

## Next Steps

- Week 4: flight-curriculum-designer agent .md + skills/
- Week 5: ml-instructor-trainer + flight-data-pipeline-engineer agents + skills/
- Week 6: instructor-deployment-steward agent + skills/
- Week 6+: Orchestrator integration testing
