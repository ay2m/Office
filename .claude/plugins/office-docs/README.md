# `office-docs` — the documents repository

Workflow commands for `iflygaca/Office`: the doc convention CI enforces, the
Markdown/HTML → branded A4 PDF pipeline, the Arabic mirror, and the entity-facts
gate.

## Install

```
/plugin marketplace add iflygaca/Office
/plugin install office-docs@flygaca-family
```

## Commands

| Command | Use it when |
| --- | --- |
| `/doc-new` | Creating a document — template, all seven front-matter keys, PDF in the same commit, mirror, index |
| `/docs-check` | The gate failed, or before committing — what it checks, how to fix it, and the `build.mjs` churn trap |
| `/ar-sync` | Translating or auditing the `ar/` mirror, glossary-first |
| `/facts-check` | Changing an entity fact, or verifying the block this repo owns in the family manifest |

## What it deliberately does not duplicate

The project subagents in `.claude/agents/` stay project-scoped — **doc-smith**
(any `.md`/`.html` add, edit or rename, front-matter, the print pipeline),
**ar-mirror** (translating against the glossary and rebuilding the Arabic PDFs),
**ksa-compliance** (PDPL, ZATCA, MISA, Nitaqat, and anything the vendored skills
produce), **family-warden** (the family contract, entity-facts parity, the repo
roster) and the GTM trio. `.claude/agents/README.md` is their roster and the
only copy of it. Claude Code loads them automatically for sessions in this
checkout. These commands are the procedures those agents follow, packaged so a
session that is not in the checkout can still get them right.

The vendored governance and privacy skills under `.claude/skills/` also stay
where they are. They are foreign-law scaffolding: **PDPL and ZATCA remain the
governing regimes**, and `01-governance/` remains the source of policy. See
`.claude/skills/THIRD_PARTY_NOTICES.md`.

## Handle with care

This repository holds real operating material — signed and draft legal
agreements, financial data, HR records, investor plans. Quote the minimum a task
needs, never carry its contents into another repo or an external tool, and route
security or data-isolation concerns to the maintainer per
`01-governance/SECURITY.md` rather than a public issue.
