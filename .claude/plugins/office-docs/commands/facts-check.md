---
description: Verify the entity facts this repo owns against the shared family manifest
allowed-tools:
  - Bash
  - Read
  - Grep
  - Edit
---

```bash
node tools/print/check-facts.mjs      # aliased as npm run check:facts
```

`iflygaca/Office` **owns** the `entity` block of `contracts/flygaca-family.json`.
The gate asserts every value in that block against the table in
`01-governance/company-facts.md` it was copied from — and asserts the **IBAN and
account number from that same doc are absent** from the manifest, because the
manifest travels byte-identically to `iflygaca/FlyGACA` and `iflygaca/Captain-Adel`.

A banking detail appearing in the manifest is an incident, not a diff. Stop and
report it rather than quietly editing it out of one copy.

## Changing an entity fact

1. Edit `01-governance/company-facts.md` — the source of truth.
2. Update the `entity` block here to match.
3. Bump `version`, then re-stamp:
   `node tools/contracts/stamp-manifest.mjs contracts/flygaca-family.json`.
   Editing without re-stamping fails every repo's gate immediately.
4. Copy the file **verbatim** into both product repos.
5. Open all three PRs together, and check the consumers still carry the strings
   verbatim: `iflygaca/FlyGACA`'s `src/lib/seo/jsonld.ts` plus `footer.legalEntity`
   and `legal.*` in both i18n bundles; `iflygaca/Captain-Adel`'s `footer.js`,
   `terms.html`, `privacy.html`, `package.json` and `LICENSE`.

`/family-orchestrators:full-sync` audits the whole triangle when you want the
other two repos checked as well.
