#!/usr/bin/env node
/**
 * Fly GACA — docs guard (CI).
 *
 * Dependency-free (node builtins only, regex front-matter parse) so it runs in
 * CI with no `npm install` and no browser. Fails (exit 1) on:
 *
 *   1. Front-matter — every content .md carries the standard keys
 *      (title, section, doc_type, status, owner, last_updated, lang).
 *      Exemptions: templates/ and ar/templates/ use their own authoring schema
 *      (require `title` only); the root README.md is skipped entirely.
 *   2. Print coverage — every walked .md has a matching PDF under _print/.
 *   3. Staleness — the .md's content hash matches .buildcache.json, i.e. its PDF
 *      was rebuilt after the last edit. (Recomputes build.mjs's own key:
 *      sha256(sha256(theme.css)+sha256(build.mjs) sliced to 16, src). Valid
 *      because this guard never edits build.mjs or theme.css.)
 *   4. Brand HTML — each self-contained brand .html (rendered by build-html.mjs)
 *      has a matching PDF under _print/.
 *
 * Usage:  node tools/print/check.mjs
 */

import { createHash } from 'node:crypto';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(TOOLS_DIR, '..', '..');
const OUT_ROOT = path.join(REPO_ROOT, '_print');
const SKIP_DIRS = new Set(['.git', '.claude', 'node_modules', 'tools', '_print']);  // .claude = agent/tool config, not company documents
const REQUIRED = ['title', 'section', 'doc_type', 'status', 'owner', 'last_updated', 'lang'];

function walk(dir, ext, files = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(REPO_ROOT, full);
    if (SKIP_DIRS.has(rel.split(path.sep)[0])) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, ext, files);
    else if (name.endsWith(ext)) files.push(rel);
  }
  return files;
}

function frontMatter(src) {
  if (!src.startsWith('---\n')) return null;
  const end = src.indexOf('\n---', 4);
  if (end === -1) return null;
  const block = src.slice(4, end);
  const keys = new Set();
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_]+):/);
    if (m) keys.add(m[1]);
  }
  return keys;
}

const errors = [];
const isTemplate = (rel) => rel.split(path.sep).includes('templates');
const isRootReadme = (rel) => rel === 'README.md';

// build.mjs's cache key, replicated exactly.
const themeHash = createHash('sha256')
  .update(readFileSync(path.join(TOOLS_DIR, 'theme.css')))
  .update(readFileSync(path.join(TOOLS_DIR, 'build.mjs')))
  .digest('hex').slice(0, 16);
const cacheFile = path.join(TOOLS_DIR, '.buildcache.json');
const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : {};

const mdFiles = walk(REPO_ROOT, '.md').sort();
for (const rel of mdFiles) {
  const src = readFileSync(path.join(REPO_ROOT, rel), 'utf8');

  // 1. front-matter
  if (!isRootReadme(rel)) {
    const keys = frontMatter(src);
    if (!keys) {
      errors.push(`${rel}: missing YAML front-matter`);
    } else if (isTemplate(rel)) {
      if (!keys.has('title')) errors.push(`${rel}: template missing 'title'`);
    } else {
      const miss = REQUIRED.filter((k) => !keys.has(k));
      if (miss.length) errors.push(`${rel}: front-matter missing ${miss.join(', ')}`);
    }
  }

  // 2 + 3. PDF present and not stale
  const pdf = path.join(OUT_ROOT, rel.replace(/\.md$/, '.pdf'));
  if (!existsSync(pdf)) {
    errors.push(`${rel}: no PDF at _print/${rel.replace(/\.md$/, '.pdf')} (run: cd tools/print && npm run build)`);
  } else {
    const hash = createHash('sha256').update(themeHash).update(src).digest('hex');
    if (cache[rel] && cache[rel] !== hash) {
      errors.push(`${rel}: PDF is stale — source changed since last build (run: cd tools/print && npm run build)`);
    } else if (!cache[rel]) {
      errors.push(`${rel}: no build-cache entry (run: cd tools/print && npm run build)`);
    }
  }
}

// 4. brand HTML → PDF
const htmlFiles = walk(REPO_ROOT, '.html').sort();
for (const rel of htmlFiles) {
  const pdf = path.join(OUT_ROOT, rel.replace(/\.html$/, '.pdf'));
  if (!existsSync(pdf)) {
    errors.push(`${rel}: no PDF at _print/${rel.replace(/\.html$/, '.pdf')} (run: cd tools/print && node build-html.mjs)`);
  }
}

const mdCount = mdFiles.length;
const htmlCount = htmlFiles.length;
if (errors.length) {
  console.error(`docs-check: ${errors.length} problem(s) across ${mdCount} md + ${htmlCount} html:\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log(`docs-check: OK — ${mdCount} markdown + ${htmlCount} brand-HTML docs, all with valid front-matter and up-to-date PDFs.`);
