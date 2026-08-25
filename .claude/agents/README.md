# Project subagents

Claude Code loads every `*.md` here as a project-scoped subagent (see
[the subagent docs](https://code.claude.com/docs/en/sub-agents)). This is a
documents repository, so the agents are document agents — not code agents.

| Agent | Use it for |
| --- | --- |
| `doc-smith` | Drafting/editing any doc in the twelve sections — front-matter, templates, the print pipeline |
| `ar-mirror` | The `ar/` Arabic mirror — Saudi MSA against the glossary, paths, Arabic PDFs |

What these encode that a generic writing agent cannot know: the exact
front-matter schema and its three precise exemptions; that `_print/` is
committed and a doc edit without a rebuilt PDF fails CI; that editing
`build.mjs` marks all 263 PDFs stale so a no-op change should re-stamp
`.buildcache.json` instead of re-rendering; that English is authoritative and
`ar/` filenames stay ASCII kebab-case; and that EN/AR parity here is a practice
rather than a CI gate, so drift is silent.

## Conventions

- `name` matches the filename; lowercase and hyphens only.
- Both agents end by reporting the `node check.mjs` result and any unintended
  `_print/` churn — that is the repo's real definition of "done".
- Both carry the sensitivity constraint: this tree holds real signed/draft
  agreements and real financial, HR and investor material. Quote the minimum the
  task needs; never carry it into another repo, another tool, or a public
  output.
- Policy lives in `01-governance/`, not in an agent file. If an agent and a
  governance document disagree, the governance document wins.
