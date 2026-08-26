# Project subagents

Claude Code loads every `*.md` here as a project-scoped subagent (see
[the subagent docs](https://code.claude.com/docs/en/sub-agents)). This is a
documents repository, so the agents are document agents — not code agents.

**This table is the roster.** It lives here and nowhere else — the plan document
explains *why* each agent exists, and the root `CLAUDE.md` carries a pointer. A
second copy of this table would drift within two PRs.

| Agent | Use it for |
| --- | --- |
| `doc-smith` | Drafting/editing any doc in the twelve sections — front-matter, templates, the print pipeline |
| `ar-mirror` | The `ar/` Arabic mirror — Saudi MSA against the glossary, paths, Arabic PDFs |
| `ksa-compliance` | Anything turning on Saudi regulation — PDPL, ZATCA, MISA, Nitaqat, ISMS — and any output of the vendored `.claude/skills/` before it is adopted |
| `family-warden` | `contracts/flygaca-family.json`, its parity with `01-governance/company-facts.md`, the repo roster, and cross-repo drift sweeps |
| `schools-acquisition` | B2B flight-school outreach, 14-day pilot playbook, package pricing discipline, pipeline conversion tracking |
| `gtm-defensibility-steward` | Competitive positioning, brand constraints, defensible wedges (NTSB↔GACAR, RTL parity, cited explanations) |
| `fly-gaca-gtm-orchestrator` | Cross-repo GTM coordination — Schools motion, pricing sync, competitive threats, conversion funnels, ARR composition |
| ~~`flygaca-qa-reviewer`~~ | **Retired.** Its own line 15 had `me-central1`/`me-central2` reversed and a QA sweep had to catch it; the consistency-sweep function moved to `family-warden`, narrowed to reconcile against a named source rather than re-derive. The dated audit records that reference it are left intact. |

## Phase 2 Expansion (Weeks 3-7)

The roster grows to 15+ agents distributed across four plugins (`plugins/*/agents/`):

### `plugins/office-governance/agents/`
- `governance-auditor` — Decision log consistency, reversibility tracking
- `entity-facts-guardian` — Company facts parity with MCP, IBAN protection
- `cross-repo-sync` — Office ↔ FlyGACA ↔ Captain-Adel coordination

### `plugins/product-engineering/agents/`
- `react-19-architect` — React 19, Vite, TypeScript strict, RTL/i18n
- `express-backend-pro` — Express 5, Cloud Run, SQL migrations, HttpOnly JWT
- `regulatory-corpus-keeper` — GACAR indexing, corpus tiers, AIRAC calendar
- `sql-migrator` — PostgreSQL schemas, forward-only migrations
- `genkit-rag-specialist` — Gemini integration, RAG pipeline, Captain Adel grounding

### `plugins/flight-service/agents/`
- `flight-curriculum-designer` — GACAR-aligned syllabi, mock exams, learner paths
- `ml-instructor-trainer` — Captain Adel persona, model tuning, eval metrics
- `flight-data-pipeline-engineer` — Learner data (PDPL), flight-hour tracking
- `instructor-deployment-steward` — captadel.com hosting, Cloud Run revision mgmt

### `plugins/fly-gaca-operations/agents/`
- `operations-orchestrator` — Multi-agent workflow router (full-sync, feature-ship, compliance-audit, security-hardening, performance-sprint)

**Status:** Phase 2 Foundation (MCP server setup, plugin structure) complete. Agent implementations start Week 3.
**See:** [`06-operations-it/agent-workforce-plan.md`](../../06-operations-it/agent-workforce-plan.md) for full Phase 2 spec, and each plugin's `README.md` for agent details.

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
