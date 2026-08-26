# Entity Facts Validation

**Ensures entity facts in `company-facts.md` stay consistent across the family.**

## What this does

Guards the twelve entity fields that travel to both product repos:

1. **Company name** — Used in SPA titles, meta tags, JSON-LD, installer metadata, license footers
2. **Entity name (Arabic)** — قائمة الطيران العربية
3. **IBAN** — **Never** copied into `flygaca-family.json` (stays in Office only)
4. **Account number** — **Never** copied into manifest
5. **Registration number** — Public legal identifier
6. **Incorporation date** — Used in investor materials
7. **Business sector** — "Flying School and Associated Services"
8. **Country of incorporation** — "Saudi Arabia"
9. **Region** — "Me-Central 2" (Dammam, in-Kingdom PDPL-safe)
10. **Primary contact email** — For customer inquiries
11. **Office website** — https://flygaca.com/
12. **Legal authority** — GACA (General Authority of Civil Aviation)

## When to use

After editing `01-governance/company-facts.md`, especially:
- Incorporation or registration changes
- Banking details updates (IBAN audit)
- Contact or website changes
- Regional or sector description changes

## Commands

```bash
cd tools/print
npm run check:facts       # verify entity facts parity
node check-facts.mjs      # full validation run
```

---

*Fly GACA Office | Entity Facts Validation Skill*
