/**
 * Stamp (or verify) the self-hash on contracts/flygaca-family.json.
 *
 * The manifest is committed byte-identically to ay2m/Office, ay2m/FlyGACA and
 * ay2m/Captain-Adel. Nothing offline can prove the three copies are the same
 * revision, so the manifest carries its own `sha`: a hand-edit in any copy that
 * forgets to re-stamp fails that repo's parity test immediately, and `version`
 * turns a stale copy into a one-line diff.
 *
 * The hash is over the parsed object with `sha` blanked, not over the file
 * text, so reformatting or re-indenting the JSON does not change it. Every
 * consumer recomputes it the same four lines — keep them in step:
 *
 *     const { sha, ...rest } = JSON.parse(text);   // conceptually
 *     manifest.sha = '';
 *     sha256(JSON.stringify(manifest)) === sha
 *
 *   node stamp-manifest.mjs <path...>            re-stamp in place
 *   node stamp-manifest.mjs --check <path...>    exit 1 if any is out of date
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

/** The canonical hash: the manifest with `sha` blanked, serialized compactly. */
export function manifestHash(manifest) {
  return createHash('sha256').update(JSON.stringify({ ...manifest, sha: '' })).digest('hex');
}

const args = process.argv.slice(2);
const check = args.includes('--check');
const paths = args.filter((a) => a !== '--check');

if (paths.length === 0) {
  console.error('usage: node stamp-manifest.mjs [--check] <manifest.json...>');
  process.exit(2);
}

let failed = false;
for (const p of paths) {
  const manifest = JSON.parse(readFileSync(p, 'utf8'));
  const want = manifestHash(manifest);
  if (manifest.sha === want) {
    console.log(`ok    ${p}  v${manifest.version}  ${want.slice(0, 12)}`);
    continue;
  }
  if (check) {
    console.error(`STALE ${p}  sha is ${manifest.sha.slice(0, 12) || '(empty)'}, should be ${want.slice(0, 12)}`);
    failed = true;
    continue;
  }
  manifest.sha = want;
  writeFileSync(p, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`stamp ${p}  v${manifest.version}  ${want.slice(0, 12)}`);
}

if (failed) process.exit(1);
