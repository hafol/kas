// Dev-only screenshot harness — renders the app like an iPhone 11 (414×896, DPR2)
// with the safe-area simulator (?ios=11) and saves PNGs for pixel comparison.
//
//   node scripts/shoot.mjs [screen ...] [--ios=11] [--port=5173]
//
// Screens map to the app's URL params (see App.jsx):
//   home (default) | gov | digital_id | gold_detail | my_bank | passcode
// Output: scripts/shots/<screen>.png
//
// Requires a running dev/preview server (npm run dev) on --port (default 5173).
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'shots');

const args = process.argv.slice(2);
const flag = (name, def) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=')[1] : def;
};
const ios = flag('ios', '11');
const port = flag('port', '5173');
const width = parseInt(flag('w', '414'), 10);   // CSS px width (device logical width)
const height = parseInt(flag('h', '896'), 10);  // CSS px height
const tag = flag('tag', '');                    // optional filename suffix, e.g. -se
const screens = args.filter((a) => !a.startsWith('--'));
if (screens.length === 0) screens.push('home');

const SCREEN_QUERY = {
  home: '',
  gov: '&screen=gov',
  digital_id: '&screen=digital_id',
  gold_detail: '&screen=gold_detail',
  my_bank: '&screen=my_bank',
  transfers: '&screen=transfers',
  transfers_form: '&screen=transfers',     // clicks into "Клиенту Kaspi" (see CLICKS)
  transfers_found: '&screen=transfers',    // phone typed → recipient box (see ACTIONS)
  transfers_phonefocus: '&screen=transfers', // phone focused, empty (see ACTIONS)
  transfers_receipt: '&screen=transfers',  // full transfer → receipt (see ACTIONS)
  passcode: '&screen=passcode',
};

// Optional: after load, click an element containing this text, then re-wait.
const CLICKS = {
  transfers_form: 'Клиенту Kaspi',
};

// Optional: after load, run a custom interaction sequence, then re-wait.
const ACTIONS = {
  // open form → Телефон tab → focus phone, type → fill amount → Перевести → receipt
  transfers_receipt: async (page) => {
    await page.getByText('Клиенту Kaspi', { exact: true }).first().click();
    await page.waitForTimeout(400);
    await page.getByText('Телефон', { exact: true }).first().click();
    await page.waitForTimeout(200);
    const lbl = page.getByText('Телефон получателя');
    const box = await lbl.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(150);
    await page.keyboard.type('7051234567');
    await page.waitForTimeout(300);
    await page.locator('input').nth(1).fill('100');   // amount (2nd input once phone active)
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /Перевести/ }).click();
    await page.waitForTimeout(500);
  },
  // open form → Телефон tab → focus + type phone → shows mask + floating label + found box
  transfers_found: async (page) => {
    await page.getByText('Клиенту Kaspi', { exact: true }).first().click();
    await page.waitForTimeout(400);
    await page.getByText('Телефон', { exact: true }).first().click();
    await page.waitForTimeout(200);
    const lbl = page.getByText('Телефон получателя');
    const box = await lbl.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(150);
    await page.keyboard.type('7051234567');
    await page.waitForTimeout(500);
  },
  // open form → Телефон tab → focus only (no digits) → shows empty template + blue label
  transfers_phonefocus: async (page) => {
    await page.getByText('Клиенту Kaspi', { exact: true }).first().click();
    await page.waitForTimeout(400);
    await page.getByText('Телефон', { exact: true }).first().click();
    await page.waitForTimeout(200);
    const lbl = page.getByText('Телефон получателя');
    const box = await lbl.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(400);
  },
};

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices['iPhone 11'],   // mobile UA, touch, DPR 2
  viewport: { width, height },
  isMobile: true,
  hasTouch: true,
});

// Unlock the activation gate and keep the verify fetch from hanging.
await context.addInitScript(() => {
  try {
    localStorage.setItem('activation_code', 'PREVIEW');
    localStorage.setItem('device_id', 'preview-device');
  } catch (e) {}
});
await context.route('**/api/**', (route) =>
  route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
);

const base = `http://localhost:${port}`;
for (const screen of screens) {
  const q = SCREEN_QUERY[screen] ?? '';
  const url = `${base}/?ios=${ios}${q}`;
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // splash (700ms) + skeleton (320ms) + margin
  if (CLICKS[screen]) {
    await page.getByText(CLICKS[screen], { exact: true }).first().click();
    await page.waitForTimeout(500);
  }
  if (ACTIONS[screen]) {
    await ACTIONS[screen](page);
  }
  const file = join(OUT, `${screen}${tag}.png`);
  await page.screenshot({ path: file });
  console.log(`✓ ${(screen + tag).padEnd(14)} ${width}x${height}  ${url}  →  ${file}`);
  await page.close();
}

await browser.close();
