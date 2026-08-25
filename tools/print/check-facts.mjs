/**
 * The entity-facts gate.
 *
 * `01-governance/company-facts.md` calls itself "the source of truth for company
 * identity" and lists exactly where each value is restated in the product repos
 * — but nothing ever checked it, so the claim was maintained by hand and by
 * memory. `contracts/flygaca-family.json` is its machine-readable mirror, and
 * this file is the half of the check that runs HERE: every value in the
 * manifest's `entity` block must still match the doc it was copied from.
 *
 * The other half runs in the product repos, which assert the same manifest
 * against their own copies of these strings (ay2m/FlyGACA:
 * tests/family-contract.test.ts, ay2m/Captain-Adel: test/family-contract.test.js).
 * Between the three, a change to the CR or the VAT number cannot land in one
 * place and rot in the other four.
 *
 * Dependency-free and browser-free, in the same style as check.mjs — run it
 * any time:
 *
 *   node tools/print/check-facts.mjs
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(TOOLS_DIR, '..', '..');
const MANIFEST = path.join(REPO_ROOT, 'contracts', 'flygaca-family.json');
const FACTS = path.join(REPO_ROOT, '01-governance', 'company-facts.md');

const errors = [];

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));

// 1. The manifest is internally consistent. Kept identical to
//    tools/contracts/stamp-manifest.mjs and to both product repos' parity tests.
const wantSha = createHash('sha256')
  .update(JSON.stringify({ ...manifest, sha: '' }))
  .digest('hex');
if (manifest.sha !== wantSha) {
  errors.push(
    `contracts/flygaca-family.json: sha is ${manifest.sha || '(empty)'}, should be ${wantSha}\n` +
      '    → someone edited the manifest without re-stamping it. Run:\n' +
      '      node tools/contracts/stamp-manifest.mjs contracts/flygaca-family.json',
  );
}

// 2. Office owns the `entity` and `repos` blocks. If that ever flips, this gate
//    is checking a block it is no longer the authority for.
for (const block of ['entity', 'repos']) {
  const owner = manifest[block]?.owner;
  if (owner !== 'ay2m/Office') {
    errors.push(`contracts/flygaca-family.json: ${block}.owner is "${owner}", expected "ay2m/Office"`);
  }
}

/**
 * Read the `| label | value |` rows out of the doc's Markdown tables into a
 * label → value map. Bold markers, backticks and footnote asterisks are
 * stripped so the comparison is against the value, not its emphasis.
 */
function tableRows(src) {
  const rows = new Map();
  for (const line of src.split('\n')) {
    const m = /^\|([^|]+)\|([^|]+)\|\s*$/.exec(line);
    if (!m) continue;
    const label = m[1].trim();
    const value = m[2].replace(/\*\*/g, '').replace(/`/g, '').trim();
    if (!label || label.startsWith('---') || value.startsWith('---')) continue;
    rows.set(label, value);
  }
  return rows;
}

const rows = tableRows(readFileSync(FACTS, 'utf8'));

/**
 * Each manifest field and the `company-facts.md` row it was copied from.
 * `mode` is how strictly they have to agree: an `exact` row holds the value and
 * nothing else; a `contains` row wraps it in prose (the registered address
 * carries the district in both languages, the entity type carries its Arabic
 * translation) so the value must appear inside it.
 */
const MAPPING = [
  ['legalNameAr', 'Legal name (Arabic)', 'exact'],
  ['legalNameEn', 'Legal name (English, as on the CR)', 'exact'],
  ['entityTypeEn', 'Entity type', 'contains'],
  ['entityTypeAr', 'Entity type', 'contains'],
  ['commercialRegistration', 'Unified national number / CR', 'exact'],
  ['addressLocality', 'Registered address', 'contains'],
  ['addressLocalityAr', 'Registered address', 'contains'],
  ['postalCode', 'Registered address', 'contains'],
  ['vatNumber', 'VAT registration number', 'exact'],
  ['vatEffectiveDate', 'Effective registration date', 'exact'],
  ['taxPeriod', 'Tax period', 'exact'],
  ['tin', 'TIN', 'exact'],
];

for (const [field, label, mode] of MAPPING) {
  const expected = manifest.entity[field];
  if (expected === undefined) {
    errors.push(`contracts/flygaca-family.json: entity.${field} is missing`);
    continue;
  }
  if (!rows.has(label)) {
    errors.push(`01-governance/company-facts.md: no table row labelled "${label}" (entity.${field})`);
    continue;
  }
  const actual = rows.get(label);
  const ok = mode === 'exact' ? actual === expected : actual.includes(expected);
  if (!ok) {
    errors.push(
      `entity.${field}: manifest says "${expected}", but company-facts.md row "${label}" says "${actual}"`,
    );
  }
}

// 3. The banking hard rule. company-facts.md forbids the IBAN and the account
//    number from leaving this repo, and the manifest is copied into both product
//    repos — so assert the actual values from the doc are absent from it, rather
//    than pattern-matching (the VAT number is 15 digits too, same as the account).
const manifestText = readFileSync(MANIFEST, 'utf8');
for (const label of ['IBAN', 'Account number']) {
  const secret = rows.get(label);
  if (!secret) {
    errors.push(`01-governance/company-facts.md: no table row labelled "${label}" — the banking leak check cannot run`);
    continue;
  }
  if (manifestText.includes(secret)) {
    errors.push(
      `contracts/flygaca-family.json contains the ${label} from company-facts.md. ` +
        'That file is copied into ay2m/FlyGACA and ay2m/Captain-Adel; banking data never leaves ay2m/Office.',
    );
  }
}

if (errors.length) {
  console.error(`entity-facts check FAILED (${errors.length}):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(
  `entity facts OK — ${MAPPING.length} fields in contracts/flygaca-family.json v${manifest.version} ` +
    `(sha ${manifest.sha.slice(0, 12)}) match 01-governance/company-facts.md`,
);
