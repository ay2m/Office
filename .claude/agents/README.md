# Project subagents

Claude Code loads every `*.md` here as a project-scoped subagent (see
[the subagent docs](https://code.claude.com/docs/en/sub-agents)). This is a
documents repository, so the agents are document agents — not code agents.

**This table is the roster.** It lives here and nowhere else — the plan document
explains *why* each agent exists, and the root `CLAUDE.md` carries a pointer. A
second copy of this table would drift within two PRs.

| Agent | Use it for |
| --- | --- |
| **Office & Governance** |  |
| `doc-smith` | Drafting/editing any doc in the twelve sections — front-matter, templates, the print pipeline |
| `ar-mirror` | The `ar/` Arabic mirror — Saudi MSA against the glossary, paths, Arabic PDFs |
| `ksa-compliance` | Anything turning on Saudi regulation — PDPL, ZATCA, MISA, Nitaqat, ISMS — and any output of the vendored `.claude/skills/` before it is adopted |
| `family-warden` | `contracts/flygaca-family.json`, its parity with `01-governance/company-facts.md`, the repo roster, and cross-repo drift sweeps |
| `governance-auditor` | Decision log consistency, reversibility markers, compliance-decision tracking, orphaned items |
| `entity-facts-guardian` | Company facts parity with MCP state, IBAN/account protection, entity field drift detection |
| `cross-repo-sync` | `iflygaca/Office` ↔ `iflygaca/FlyGACA` ↔ `iflygaca/Captain-Adel` coordination, contract SHA verification, three-way parity |
| **GTM & Customer** |  |
| `schools-acquisition` | B2B flight-school outreach, 14-day pilot playbook, package pricing discipline, pipeline conversion tracking |
| `gtm-defensibility-steward` | Competitive positioning, brand constraints, defensible wedges (NTSB↔GACAR, RTL parity, cited explanations) |
| `fly-gaca-gtm-orchestrator` | Cross-repo GTM coordination — Schools motion, pricing sync, competitive threats, conversion funnels, ARR composition |
| **Product Engineering** |  |
| `react-19-architect` | React 19, Vite, TypeScript strict mode, RTL/i18n patterns, component design |
| `express-backend-pro` | Express 5, Cloud Run, SQL migrations, HttpOnly JWT, me-central2 data residency |
| `regulatory-corpus-keeper` | GACAR indexing, corpus tier enforcement, AIRAC calendar staleness, cited-only docs |
| `sql-migrator` | PostgreSQL schema design, forward-only migrations, Unix socket, immutable audit trail |
| `genkit-rag-specialist` | Gemini integration, RAG pipeline, Captain Adel grounding, inference safety (outside Kingdom) |
| **Flight Service (Captain-Adel)** |  |
| `flight-curriculum-designer` | GACAR-aligned syllabi, mock exams, learner progression paths, safety-critical content |
| `ml-instructor-trainer` | Captain Adel persona, model fine-tuning, eval metrics, knowledge retention measurement |
| `flight-data-pipeline-engineer` | Learner data (PDPL-compliant), flight-hour tracking, currency calculation, anonymization |
| `instructor-deployment-steward` | captadel.com hosting, Cloud Run revision management, deployment safety gates |
| **Operations & Orchestration** |  |
| `operations-orchestrator` | Multi-repo workflow routing — coordinates full-sync, feature-ship, compliance-audit, security-hardening, performance-sprint |
| `strategy-analyst` | `00-strategy/` — OKRs, roadmap, CEO execution plan, Phase 0 tracker, numbered brainstorms |
| `governance-clerk` | `01-governance/` — decision log (DEC-NNN), board packs, company-facts parity |
| `legal-scribe` | `02-legal/` — terms/EULA/NDAs/DPA/refund/IP-takedown drafts, lawyer briefs |
| `finance-steward` | `03-finance/` — policies, monetization bands (price authority), trackers |
| `people-ops` | `05-people/` — handbook, offer letters, onboarding/offboarding, grievance procedure |
| `ops-it-spec` | `06-operations-it/` — product specs, runbooks/, hosting & secrets facts |
| `seo-strategist` | `07-gtm/seo/` — bilingual EN+AR SEO strategy |
| `customer-success` | `08-customer-success/` — onboarding playbook, health scoring, NPS, QBR |
| `ir-steward` | `09-investor-relations/` — deck, FAQ, DD questionnaire, investor updates |
| `academy-curriculum` | `10-academy-curriculum/` — curriculum map, coverage matrix, learner paths |
| `brand-keeper` | `11-brand/` — Falcon Theme, tokens, style guide, print collateral |
| `print-pipeline` | `tools/print/` + `_print/` freshness — build.mjs themeHash trap |
| `index-curator` | `_INDEX.md` (EN+AR), gsheet master-index deference, rename cascades |
| `consistency-sweeper` | Cross-doc fact reconciliation against named sources |
| `templates-curator` | `templates/` + `ar/templates/` starters and their title-only schema |
| `privacy-dpia` | Deep PDPL work — DPIA/PIA, breach notification, sub-processor register |
| `exam-bank-author` | Mock exams/question banks in `10-academy-curriculum/` |
| `captadel-liaison` | Office-side Captain Adel docs — refusal-protocol spec alignment |

~~`flygaca-qa-reviewer`~~ | **Retired.** Its own line had `me-central1`/`me-central2` reversed; consistency-sweep moved to `family-warden` (and later `consistency-sweeper`), narrowed to reconcile against a named source rather than re-derive. The dated audit records that reference it are left intact.

## Phase 2 Expansion (Weeks 3-7) — Complete

The roster expands from 4 → 25 agents, all in `.claude/agents/` for CI exemption.

### Office & Governance
- Core: `doc-smith`, `ar-mirror`, `ksa-compliance`, `family-warden`
- Governance: `governance-auditor`, `entity-facts-guardian`, `cross-repo-sync`, `governance-clerk`, `legal-scribe`, `finance-steward`, `people-ops`

### Product Engineering
- `react-19-architect` — React 19, Vite, TypeScript strict, RTL/i18n
- `express-backend-pro` — Express 5, Cloud Run, SQL migrations, HttpOnly JWT
- `regulatory-corpus-keeper` — GACAR indexing, corpus tiers, AIRAC calendar
- `sql-migrator` — PostgreSQL schemas, forward-only migrations
- `genkit-rag-specialist` — Gemini integration, RAG pipeline, Captain Adel grounding

### Flight Service & AI
- `flight-curriculum-designer` — GACAR-aligned syllabi, mock exams, learner paths
- `ml-instructor-trainer` — Captain Adel persona, model tuning, eval metrics
- `flight-data-pipeline-engineer` — Learner data (PDPL), flight-hour tracking
- `instructor-deployment-steward` — captadel.com hosting, Cloud Run revision mgmt
- `captadel-liaison` — Office-side Captain Adel docs & chat-contract expectations

### Operations & Orchestration
- `operations-orchestrator` — Routes full-sync, feature-ship, compliance-audit, security-hardening, performance-sprint
- Workflows: `full-sync.md`, `feature-ship.md`, `compliance-audit.md`, `security-hardening.md`, `performance-sprint.md`

**Status:** Phase 2 agent and orchestrator layer complete. All 25 agents operational.
**See:** [`06-operations-it/agent-workforce-plan.md`](../../06-operations-it/agent-workforce-plan.md) for full architecture spec.

What these encode that a generic writing agent cannot know: the exact
front-matter schema and its three precise exemptions; that `_print/` is
committed and a doc edit without a rebuilt PDF fails CI; that editing
`build.mjs` marks every PDF in the repo stale so a no-op change should re-stamp
`.buildcache.json` instead of re-rendering; that English is authoritative and
`ar/` filenames stay ASCII kebab-case; that EN/AR parity here is a practice
rather than a CI gate, so drift is silent; that the vendored skills are
foreign-law scaffolding while PDPL and ZATCA govern; and that the family
contract is byte-identical across three repos, so changing it costs a re-stamp
and three synchronized PRs.

Why the roster is four and not twelve — the earn-its-place test, the candidates
that were rejected, and how the family's other repos are meant to fit — is in
[`06-operations-it/agent-workforce-plan.md`](../../06-operations-it/agent-workforce-plan.md).

## Marketplace skills (outside this roster)

A viral thread pitched Anthropic's official `finance` / `small-business` / `legal` plugins
(marketplace: `knowledge-work-plugins`, at claude.com/plugins/…) as a way to run this office on
Claude. Before installing any of them, read
[`SKILLS.md`](../../SKILLS.md) — it evaluates all 48 skills against what this repo actually is
(a static docs tree with no connected QuickBooks/Stripe/CRM, and a 25-agent roster that already
covers finance/legal/governance/compliance with this repo's own conventions) and recommends
enabling only two, as a second opinion alongside `legal-scribe`, never as a replacement for it.

## Conventions

- `name` matches the filename; lowercase and hyphens only.
- Every agent ends by reporting the `node check.mjs` result and any unintended
  `_print/` churn — that is the repo's real definition of "done".
- Every agent carries the sensitivity constraint: this tree holds real
  signed/draft agreements and real financial, HR and investor material. Quote the
  minimum the task needs; never carry it into another repo, another tool, or a
  public output.
- **Banking data never leaves this repository.** The IBAN and account number in
  `01-governance/company-facts.md` go into no other repo, no PR body, no commit
  message and no deck. `tools/print/check-facts.mjs` enforces the manifest half
  of this; the rest is on the agent.
- **Never freeze a count in an agent file.** Quote the command instead —
  `node tools/print/check.mjs` prints the live totals. Four documents in this
  repo have carried four different PDF counts for exactly this reason.
- Nothing under `.claude/` is CI-gated: `SKIP_DIRS` is root-anchored, so these
  files need no front-matter and no `_print/` PDF, and nothing checks that
  `tools:` names a real tool or that a path quoted here still exists. Treat that
  as a known weakness, not a licence.
- Policy lives in `01-governance/`, not in an agent file. If an agent and a
  governance document disagree, the governance document wins.
