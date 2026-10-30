// Builds side-by-side "reference vs app" comparison PNGs into scripts/shots/compare/.
// Reference images (teacher's originals) on the left, our render on the right.
import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SHOTS = join(__dirname, 'shots');
const OUT = join(SHOTS, 'compare');
await mkdir(OUT, { recursive: true });

// screen -> [reference file in references/, app shot in scripts/shots/]
const PAIRS = {
  home:        ['references/photo_5402456933362506316_y.jpg', 'scripts/shots/home.png'],
  my_bank:     ['references/photo_5411483112077729148_y.jpg', 'scripts/shots/my_bank.png'],
  gov:         ['references/photo_5404444923399972095_y.jpg', 'scripts/shots/gov.png'],
  gold_detail: ['references/photo_5406696723213656072_y.jpg', 'scripts/shots/gold_detail.png'],
  digital_id:  ['references/photo_5404444923399972143_y.jpg', 'scripts/shots/digital_id.png'],
  passcode:    ['references/photo_5415776782293606524_y.jpg', 'scripts/shots/passcode.png'],
};

const dataUri = async (rel) => {
  const buf = await readFile(join(ROOT, rel));
  const ext = extname(rel).slice(1).toLowerCase();
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buf.toString('base64')}`;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1000 } });

for (const [screen, [ref, app]] of Object.entries(PAIRS)) {
  const [refUri, appUri] = await Promise.all([dataUri(ref), dataUri(app)]);
  const html = `<!doctype html><meta charset="utf-8">
  <body style="margin:0;background:#1e1e1e;font-family:system-ui,sans-serif">
    <div style="display:flex;gap:16px;padding:16px;align-items:flex-start">
      <div style="flex:1;text-align:center">
        <div style="color:#9cdcfe;font-size:14px;padding:6px">REFERENCE (teacher)</div>
        <img src="${refUri}" style="width:100%;border:1px solid #444;border-radius:8px">
      </div>
      <div style="flex:1;text-align:center">
        <div style="color:#4ec9b0;font-size:14px;padding:6px">OUR APP · iPhone 11 (?ios=11)</div>
        <img src="${appUri}" style="width:100%;border:1px solid #444;border-radius:8px">
      </div>
    </div>
  </body>`;
  await page.setContent(html);
  await page.waitForFunction(() => {
    const imgs = Array.from(document.images);
    return imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0);
  }, { timeout: 15000 });
  const file = join(OUT, `${screen}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`✓ ${screen.padEnd(12)} → ${file}`);
}

await browser.close();
