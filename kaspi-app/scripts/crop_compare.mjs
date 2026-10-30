// Zoomed strip comparison: shows the bottom (or top) slice of a reference image
// next to our app render, enlarged, so small details (e.g. nav icons) are visible.
//   node scripts/crop_compare.mjs <name> <refRelPath> <appRelPath> [--edge=bottom|top] [--slice=170]
import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(__dirname, 'shots', 'compare');
await mkdir(OUT, { recursive: true });

const a = process.argv.slice(2);
const flag = (n, d) => { const h = a.find((x) => x.startsWith(`--${n}=`)); return h ? h.split('=')[1] : d; };
const [name, refPath, appPath] = a.filter((x) => !x.startsWith('--'));
const edge = flag('edge', 'bottom');
const slice = parseInt(flag('slice', '180'), 10);
const COLW = parseInt(flag('colw', '520'), 10); // displayed width of the full image

const dataUri = async (rel) => {
  const buf = await readFile(join(ROOT, rel));
  const ext = extname(rel).slice(1).toLowerCase();
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buf.toString('base64')}`;
};

const [refUri, appUri] = await Promise.all([dataUri(refPath), dataUri(appPath)]);
const pos = edge === 'top' ? 'top:0' : 'bottom:0';
const cell = (label, color, uri) => `
  <div style="text-align:center">
    <div style="color:${color};font-size:13px;padding:6px">${label}</div>
    <div style="width:${COLW}px;height:${slice}px;overflow:hidden;position:relative;border:1px solid #444;border-radius:8px;background:#000">
      <img src="${uri}" style="position:absolute;${pos};left:0;width:${COLW}px">
    </div>
  </div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: COLW * 2 + 60, height: slice + 80 } });
await page.setContent(`<!doctype html><meta charset="utf-8">
  <body style="margin:0;background:#1e1e1e;font-family:system-ui,sans-serif">
    <div style="display:flex;gap:16px;padding:16px;justify-content:center">
      ${cell('REFERENCE', '#9cdcfe', refUri)}
      ${cell('OUR APP', '#4ec9b0', appUri)}
    </div>
  </body>`);
await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0));
const file = join(OUT, `${name}.png`);
await page.screenshot({ path: file, fullPage: true });
console.log(`✓ ${file}`);
await browser.close();
