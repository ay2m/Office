# `family-orchestrators` — cross-repo workflows

The workflows that do not fit in one repo. Everything here assumes the family's
three active repos — `iflygaca/Office`, `iflygaca/FlyGACA`, `iflygaca/Captain-Adel` — and
knows which one owns which claim.

## Install

```
/plugin marketplace add iflygaca/Office
/plugin install family-orchestrators@flygaca-family
```

## Commands

| Command | Use it when |
| --- | --- |
| `/full-sync` | Auditing drift: the manifest's three copies, entity facts, the repo roster, and the claims that keep regrowing wrong |
| `/feature-ship` | A change crosses repos — the blast-radius table, the manifest sequence, per-repo gates, three PRs together |
| `/security-sweep` | Secrets, headers, entitlement write paths, injection posture, dependencies — repo by repo |
| `/compliance-review` | PDPL, ZATCA, the GACA relationship, and residency claims stated as fact when they are aspirations |

## Agent

`family-auditor` — reads across whichever repos a session has and reports drift
with `file:line` evidence, resolving disagreements by **ownership** rather than
by preference. Inside `iflygaca/Office`, prefer the project agent `family-warden`,
which covers the same ground and can edit; `family-auditor` is the read-only
version for sessions that agent never reaches.

## Running these with one repo checked out

Most Claude Code sessions see one repository. Two ways to run a cross-repo walk:

- **A session with several repos attached** (Claude Code on the web can attach
  more than one). The orchestrators then read all of them directly.
- **One repo at a time.** Run the walk in each checkout and carry the findings
  forward. `/full-sync` is written so a single-repo run is still useful — it
  just has to say which repos it could not read, which every command here
  requires of its report.

Never fabricate the other side of a comparison. "Office says X" is only a
finding if you read Office in this session.

## Why the ceremony exists

The family contract exists because cross-repo claims used to live only in prose
and drifted without anything failing. The gates are per-repo and offline —
Office's `check-facts.mjs`, FlyGACA's `tests/family-contract.test.ts`, Captain
Adel's `test/family-contract.test.js` — and none of them can see the other two
copies. Nothing offline proves the three are the same revision; `version` and
`sha` reduce that to a visible one-line diff. That is the gap these workflows
close by hand, and closing it properly needs a scheduled cross-repo workflow
that does not exist yet.
