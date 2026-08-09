#!/usr/bin/env node
/**
 * Fly GACA — office docs print pipeline.
 *
 * Walks every .md in the repo (English tree + ar/ mirror), renders it to
 * branded HTML (theme.css, "Falcon" document theme) and prints an A4 PDF
 * with headless Chromium into _print/, mirroring the source tree:
 *
 *   03-finance/finance-strategy.md  ->  _print/03-finance/finance-strategy.pdf
 *   ar/01-governance/decision-log.md -> _print/ar/01-governance/decision-log.pdf
 *
 * Front-matter (title/section/doc_type/status/owner/last_updated/lang) becomes
 * the branded cover block; status draft/scaffold adds a page watermark.
 *
 * Usage:
 *   node build.mjs                  incremental build (hash-cached)
 *   node build.mjs --force          rebuild everything
 *   node build.mjs path/to/doc.md   build specific file(s) (repo-relative)
 *
 * Incremental cache: .buildcache.json stores sha256(md + theme + script) per
 * source; unchanged docs are skipped so committed PDFs don't churn (Chromium
 * stamps CreationDate on every render).
 */

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { chromium } from 'playwright-core';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(TOOLS_DIR, '..', '..');
const OUT_ROOT = path.join(REPO_ROOT, '_print');
const CACHE_FILE = path.join(TOOLS_DIR, '.buildcache.json');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'tools', '_print']);
const MIN_CHROMIUM = 131; // @page margin boxes (footer page numbers) need M131+

// html: false — docs are untrusted markdown; raw HTML/JS must never reach Chromium.
const md = new MarkdownIt({ html: false, linkify: true, typographer: false });
// GitHub-style task-list checkboxes: - [ ] / - [x]
md.core.ruler.after('inline', 'task-lists', (state) => {
  for (const token of state.tokens) {
    if (token.type !== 'inline' || !token.children?.length) continue;
    const first = token.children[0];
    if (first.type === 'text' && /^\[( |x|X)\] /.test(first.content)) {
      const checked = /^\[(x|X)\]/.test(first.content);
      first.content = first.content.slice(4);
      // plain-text glyph (not html_inline) — with html:false an html_inline
      // token would be escaped and show literal markup in the PDF
      const box = new state.Token('text', '', 0);
      box.content = `${checked ? '☑' : '☐'} `;
      token.children.unshift(box);
    }
  }
});

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(REPO_ROOT, full);
    if (SKIP_DIRS.has(rel.split(path.sep)[0])) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (name.endsWith('.md')) files.push(rel);
  }
  return files;
}

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderHtml(relPath, source) {
  const { data: fm, content } = matter(source);
  const isArabic = fm.lang === 'ar' || relPath.startsWith('ar' + path.sep);
  const status = String(fm.status ?? 'active').toLowerCase();
  const needsWatermark = status === 'draft' || status === 'scaffold';

  // Cover block replaces the doc's own H1 (first one only) to avoid duplication.
  let body = content;
  const h1 = body.match(/^# (.+)$/m);
  const title = fm.title || (h1 ? h1[1] : path.basename(relPath, '.md'));
  if (h1 && fm.title) body = body.replace(/^# .+$\n?/m, '');

  const fmtDate = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v);
  const metaRow = (label, value) =>
    value ? `<span><b>${esc(label)}</b> ${esc(fmtDate(value))}</span>` : '';
  const labels = isArabic
    ? { section: 'القسم', type: 'النوع', status: 'الحالة', owner: 'المالك', updated: 'آخر تحديث', kicker: 'فلاي قاكا — وثائق التشغيل' }
    : { section: 'Section', type: 'Type', status: 'Status', owner: 'Owner', updated: 'Updated', kicker: 'Fly GACA — Operating Documents' };

  const cover = `
  <header class="cover">
    <p class="kicker">${labels.kicker}</p>
    <h1 class="doc-title">${esc(title)}</h1>
    <div class="meta">
      ${metaRow(labels.section, fm.section)}
      ${metaRow(labels.type, fm.doc_type)}
      ${fm.status ? `<span><b>${labels.status}</b> <span class="status-pill ${esc(status)}">${esc(fm.status)}</span></span>` : ''}
      ${metaRow(labels.owner, fm.owner)}
      ${metaRow(labels.updated, fm.last_updated)}
    </div>
  </header>
  <span class="doc-footer-string">${esc(title)} · Fly GACA</span>`;

  const watermark = needsWatermark
    ? `<div class="watermark">${status === 'scaffold' ? 'SCAFFOLD' : 'DRAFT'}</div>` : '';

  return `<!doctype html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<link rel="stylesheet" href="${pathToFileURL(path.join(TOOLS_DIR, 'theme.css'))}">
</head>
<body dir="${isArabic ? 'rtl' : 'ltr'}">
${watermark}
${cover}
${md.render(body)}
</body>
</html>`;
}

function findChromium() {
  // Prefer an explicit override, then any browser under PLAYWRIGHT_BROWSERS_PATH
  // (revision-agnostic — playwright-core only bundles a matching revision check,
  // not the browser itself), then playwright's own default resolution.
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

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const explicit = args.filter((a) => !a.startsWith('--'));

  const cache = !force && existsSync(CACHE_FILE)
    ? JSON.parse(readFileSync(CACHE_FILE, 'utf8')) : {};
  const themeHash = createHash('sha256')
    .update(readFileSync(path.join(TOOLS_DIR, 'theme.css')))
    .update(readFileSync(fileURLToPath(import.meta.url)))
    .digest('hex').slice(0, 16);

  const files = explicit.length ? explicit : walk(REPO_ROOT).sort();
  const work = [];
  for (const rel of files) {
    const src = readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    const hash = createHash('sha256').update(themeHash).update(src).digest('hex');
    const out = path.join(OUT_ROOT, rel.replace(/\.md$/, '.pdf'));
    if (cache[rel] === hash && existsSync(out)) continue;
    work.push({ rel, src, hash, out });
    if (!matter(src).data.title) console.warn(`  ⚠ no front-matter title: ${rel}`);
  }
  console.log(`${files.length} markdown docs; ${work.length} to build (${force ? 'forced' : 'incremental'})`);
  if (!work.length) { console.log('Nothing to do.'); return; }

  const browser = await chromium.launch({ executablePath: findChromium() });
  const version = browser.version();
  if (parseInt(version, 10) < MIN_CHROMIUM) {
    throw new Error(`Chromium ${version} too old — need >=${MIN_CHROMIUM} for @page margin boxes`);
  }
  const page = await browser.newPage();
  // Network lockdown: printing is offline — only local file:// URLs may load;
  // abort anything else (no CDN/exfil requests from rendered docs).
  await page.route('**/*', (route) =>
    route.request().url().startsWith('file://') ? route.continue() : route.abort());
  const tmp = path.join(tmpdir(), `flygaca-print-${process.pid}.html`);

  let done = 0;
  for (const job of work) {
    writeFileSync(tmp, renderHtml(job.rel, job.src));
    // goto(file://), NOT setContent — file:// @font-face silently fails on about:blank
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    mkdirSync(path.dirname(job.out), { recursive: true });
    await page.pdf({ path: job.out, printBackground: true, preferCSSPageSize: true });
    cache[job.rel] = job.hash;
    done += 1;
    if (done % 20 === 0 || done === work.length) {
      console.log(`  ${done}/${work.length}  ${job.rel}`);
    }
  }

  await browser.close();
  rmSync(tmp, { force: true });
  // prune cache entries for deleted sources
  for (const key of Object.keys(cache)) {
    if (!existsSync(path.join(REPO_ROOT, key))) delete cache[key];
  }
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1) + '\n');
  console.log(`Done — ${done} PDFs written under _print/`);
}

main().catch((err) => { console.error(err); process.exit(1); });
