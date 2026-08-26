# /office-sync

**Manual trigger for cross-repo family synchronization.**

## What it does

Runs a full consistency check across all three repos (ay2m/Office, ay2m/FlyGACA, ay2m/Captain-Adel):

1. Verifies family contract is byte-identical (SHA matches)
2. Checks entity facts parity between Office `company-facts.md` and FlyGACA/Captain-Adel consumption points
3. Validates decision log consistency (no reversibility markers missing, stakeholders named)
4. Confirms repo roster alignment (`repos` block in contract matches reality)
5. Reports any drift found

## Usage

```
/office-sync
```

Or trigger the `cross-repo-sync` agent directly:

```
Use the cross-repo-sync agent to run /full-sync and report family alignment.
```

## What you'll see

- ✓ Green: All three repos in sync, entity facts aligned, no drift detected
- ⚠ Yellow: Minor drift (e.g., decision log missing a stakeholder name) — requires review
- ✗ Red: Critical drift (e.g., contract SHA mismatch, entity facts divergence) — blocks merges until fixed

## When to run

- **Weekly** (Mondays as part of Phase 5 standups)
- Before opening a PR that touches entity facts, decision log, or the family contract
- After merging any changes to `01-governance/company-facts.md` or `contracts/flygaca-family.json`

---

*Fly GACA Family | Office Sync Command*
