#!/usr/bin/env node
/**
 * Fly GACA — brand HTML → PNG renderer (print collateral).
 *
 * Companion to build-html.mjs. The print assets in 11-brand/print/ are authored
 * as HTML (the editable source that closes GAP-7); build-html.mjs renders their
 * PDFs, and this script screenshots them to the flat PNGs the brand catalogue
 * still references — overwriting the legacy filenames in place so those
 * references stay valid. Screenshots are taken at ~300dpi (deviceScaleFactor
 * over the CSS mm size) after document.fonts.ready so Cairo/Arabic shapes.
 *
 * Only the assets listed in ASSETS below are (re)generated. Assets that were
 * NOT rebuilt as HTML (folder-cover, notepad, sticker-pack, envelope-c5) keep
 * their existing PNGs untouched.
 *
 * Usage:  node build-png.mjs
 */

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(TOOLS_DIR, '..', '..');
const PRINT_DIR = path.join(REPO_ROOT, '11-brand', 'print');
const DPI = 300;
const MM_PER_IN = 25.4;

// html source  ->  legacy PNG filename to overwrite  +  CSS page size in mm.
const ASSETS = [
  ['letterhead-a4-en.html',                'letterhead-a4-english.png',            [210, 297]],
  ['letterhead-a4-ar.html',                'letterhead-a4-arabic-rtl.png',         [210, 297]],
  ['contract-cover-a4.html',               'contract-cover-a4.png',                [210, 297]],
  ['internal-memo-a4.html',                'internal-memo-a4.png',                 [210, 297]],
  ['press-release-a4.html',                'press-release-a4.png',                 [210, 297]],
  ['business-card-front-capt-adel.html',   'business-card-front-capt-adel.png',    [85, 55]],
  ['business-card-back.html',              'business-card-back-capt-adel.png',     [85, 55]],
  ['business-card-front-staff-template.html', 'business-card-front-staff-template.png', [85, 55]],
  ['envelope-dl.html',                     'envelope-dl-220-110-mm.png',           [220, 110]],
  ['compliments-slip-dl.html',             'compliments-slip-dl-210-99-mm.png',    [210, 99]],
];

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

const px = (mm) => Math.round((mm / MM_PER_IN) * DPI);

async function main() {
  const browser = await chromium.launch({ executablePath: findChromium() });
  for (const [html, png, [wmm, hmm]] of ASSETS) {
    const src = path.join(PRINT_DIR, html);
    if (!existsSync(src)) { console.warn(`  skip (missing): ${html}`); continue; }
    // deviceScaleFactor scales a CSS-px viewport up to print resolution.
    const cssW = Math.round((wmm / MM_PER_IN) * 96);
    const cssH = Math.round((hmm / MM_PER_IN) * 96);
    const page = await browser.newPage({
      viewport: { width: cssW, height: cssH },
      deviceScaleFactor: DPI / 96,
    });
    await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.screenshot({
      path: path.join(PRINT_DIR, png),
      clip: { x: 0, y: 0, width: cssW, height: cssH },
    });
    await page.close();
    console.log(`  ${html} -> 11-brand/print/${png} (${px(wmm)}x${px(hmm)}px @ ${DPI}dpi)`);
  }
  await browser.close();
  console.log(`Done — ${ASSETS.length} PNGs regenerated.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
