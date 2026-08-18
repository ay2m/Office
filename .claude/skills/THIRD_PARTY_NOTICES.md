# Third-Party Notices — vendored Claude Code skills

This directory contains skills vendored from third-party, community-maintained sources. They are
developer tooling for Claude Code only; they are not part of any shipped product and are never
served to end users.

## Anthropic-Cybersecurity-Skills

- **Project:** Anthropic-Cybersecurity-Skills (a community project — **not affiliated with
  Anthropic PBC**, despite the name)
- **Author:** Mahipal Jangra (@mukul975)
- **Source:** https://github.com/mukul975/Anthropic-Cybersecurity-Skills
- **License:** Apache License 2.0 (each vendored skill folder retains its upstream `LICENSE`)
- **Pinned upstream commit:** `4c0b700ac5d280ba46695062077f0fe922ce3602`

### What was vendored, and why these

Upstream ships 817 skills across 29 domains, most of them hands-on technical playbooks. This is a
**documents** repository, so the selection is deliberately narrow: the six governance, privacy and
risk skills whose output is written policy rather than shell commands. Five of the six contain no
code blocks at all. The technical domains (malware analysis, forensics, cloud, red teaming) were
**not** vendored — the product repos are where that work happens.

| Vendored skill | Maps to in this repo |
| --- | --- |
| `implementing-gdpr-data-protection-controls` | `02-legal/` PDPL policies + DPA — GDPR is the closest published analogue to Saudi PDPL |
| `performing-privacy-impact-assessment` | `04-compliance-ksa/` PDPL DPIA |
| `implementing-iso-27001-information-security-management` | `01-governance/`, `06-operations-it/` |
| `conducting-cyber-risk-assessment-with-nist-800-30` | `09-investor-relations/` risk register |
| `managing-third-party-vendor-risk` | `03-finance/` procurement, `02-legal/` NDA + SLA |
| `implementing-pci-dss-compliance-controls` | Moyasar SAQ-A scope, `03-finance/` ZATCA invoicing |
### What was intentionally omitted

For each vendored skill, only `SKILL.md`, `references/**`, and the upstream `LICENSE` were copied.
The bundled `scripts/` and `assets/` were **deliberately excluded** to avoid introducing unreviewed
third-party executables — every one of the 817 upstream skills ships a `scripts/` directory. If a
skill's workflow refers to a helper script, consult the pinned upstream commit above rather than
running anything from here.

### Updating from upstream

`.claude/settings.json` registers the upstream repo as a Claude Code marketplace, so
`/plugin install cybersecurity-skills@anthropic-cybersecurity-skills` pulls the full 817-skill set
on demand. It is **registered but not enabled** on purpose: enabling it alongside these vendored
copies would put two skills of each vendored name on the path. Use the plugin to review what
changed upstream, or to reach a skill outside the curated set, then port any delta into the
vendored copy rather than running both.

### The Office guardrail

These skills are **advisory developer tooling**. Where any conflicts with this repo's `CLAUDE.md`
or with `01-governance/`, **governance wins** — `01-governance/` is the source of policy, not a
third-party skill.

Three repo-specific cautions:

1. **They are foreign-law frameworks.** GDPR, ISO 27001, NIST 800-30 and PCI DSS are useful
   scaffolding for structure and vocabulary, but the governing privacy law here is **Saudi PDPL**
   and the tax regime is **ZATCA**. Never let a skill's GDPR/CCPA language be pasted into a policy
   as if it were the applicable law — translate the structure, cite the actual regulation.
2. **The doc convention still applies.** Anything these skills help draft is a normal `.md` in a
   numbered section: full YAML front-matter, and a rebuilt PDF under `_print/` committed in the same
   commit (`node tools/print/check.mjs` before you push). The skills know nothing about that.
3. **Sensitivity.** This repo holds real legal, financial, HR and investor material. A skill that
   suggests uploading documents or findings to an external scanner or SaaS tool does not override
   the sensitive-content discipline in `CLAUDE.md`.

Note these vendored files live under `.claude/`, which `tools/print/check.mjs`, `build.mjs` and
`build-html.mjs` all skip by name — so they need neither front-matter nor a `_print/` PDF. That skip
is **root-anchored**, so vendored skills must stay at `.claude/skills/`, never inside a numbered
section directory.
