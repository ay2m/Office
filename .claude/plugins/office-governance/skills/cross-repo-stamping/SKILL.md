# Cross-Repo Stamping Workflow

**Coordinates synchronized changes to the family contract across three repos.**

## What this does

The family contract (`contracts/flygaca-family.json`) is committed byte-identically to three repos:
- **iflygaca/Office** (owns `entity` and `repos` blocks)
- **iflygaca/FlyGACA** (owns `chat` block — the answer shape for both brains)
- **iflygaca/Captain-Adel** (mirrors both blocks)

Only the owning repo edits its block. When it changes:

1. **Edit** the owning repo's copy only
2. **Bump `version`** (e.g., 1.0.0 → 1.0.1)
3. **Re-stamp the self-hash** with `node tools/contracts/stamp-manifest.mjs contracts/flygaca-family.json`
4. **Copy verbatim** into the other two repos (no edits)
5. **Open three PRs together** — all three repos gate on their own copy matching the stamped hash

## Stamping command

```bash
cd tools/contracts
node stamp-manifest.mjs contracts/flygaca-family.json
```

This recomputes the `sha` field (a self-hash of the JSON minus the `sha` field itself) and updates it. Editing without re-stamping fails every repo's CI gate immediately.

## Known limitation

Nothing offline can prove all three copies are truly identical. `version` and `sha` reduce it to a visible one-line diff. A scheduled cross-repo GitHub Actions workflow could close this fully (does not exist yet).

## CI gates

- **Office**: `npm run check:facts` (asserts every entity value against company-facts.md; asserts IBAN/account number are absent from manifest)
- **FlyGACA**: `npm run test:contracts` (verifies chat block shape)
- **Captain-Adel**: `npm run test:contracts` (mirrors Office's entity block)

---

*Fly GACA Family | Cross-Repo Stamping Workflow*
