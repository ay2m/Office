#!/usr/bin/env node
/**
 * Fly GACA — HTML brand-doc → PDF renderer.
 *
 * The main pipeline (build.mjs) handles markdown. A handful of brand/showcase
 * documents are authored directly as self-contained HTML with their own print
 * CSS — this script prints those to PDF under _print/, mirroring their path,
 * using each file's OWN styles (no theme.css, no cover block).
 *
 * Kept deliberately separate from build.mjs so that changing HTML handling
 * never invalidates build.mjs's markdown cache (which keys on build.mjs bytes
 * and would otherwise re-render all ~220 md PDFs on any edit).
 *
 * Usage:  node build-html.mjs
 *
 * Note: the two showcase pages (design-system, tidal-reckoning) are dark-themed
 * and have no @media print rules — they print dark by design. the-book and the
 * brainstorms dashboard carry proper @page/@media print CSS and print light.
 */

import { mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(TOOLS_DIR, '..', '..');
const OUT_ROOT = path.join(REPO_ROOT, '_print');
const SKIP_DIRS = new Set(['.git', '.claude', 'node_modules', 'tools', '_print']);  // .claude = agent/tool config, not company documents

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  try {
    for (const dir of readdirSync(root).sort().reverse()) {
      if (!dir.startsWith('chromium-')) continue;
      const candidate = path.join(root, dir, 'chrome-linux', 'chrome');
      if (existsSync(candidate)) return candidate;
    }
  } catch { /* fall through to playwright default */ }
  return undefined;
}

function walkHtml(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(REPO_ROOT, full);
    if (SKIP_DIRS.has(rel.split(path.sep)[0])) continue;
    const st = statSync(full);
    if (st.isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(rel);
  }
  return files;
}

async function main() {
  const files = walkHtml(REPO_ROOT).sort();
  if (!files.length) { console.log('No brand HTML docs found.'); return; }
  console.log(`${files.length} HTML doc(s) to render:`);

  const browser = await chromium.launch({ executablePath: findChromium() });
  const page = await browser.newPage();
  // Network lockdown: printing is offline — only local file:// URLs may load;
  // abort anything else (no CDN/exfil requests from rendered docs).
  await page.route('**/*', (route) =>
    route.request().url().startsWith('file://') ? route.continue() : route.abort());
  for (const rel of files) {
    const out = path.join(OUT_ROOT, rel.replace(/\.html$/, '.pdf'));
    mkdirSync(path.dirname(out), { recursive: true });
    await page.goto(pathToFileURL(path.join(REPO_ROOT, rel)).href, { waitUntil: 'networkidle' });
    await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
    console.log(`  ${rel} -> ${path.relative(REPO_ROOT, out)}`);
  }
  await browser.close();
  console.log(`Done — ${files.length} HTML PDFs written under _print/`);
}

main().catch((err) => { console.error(err); process.exit(1); });
