import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Ayan Biswas\\.gemini\\antigravity\\brain\\7b5ee5ad-6590-4a64-95e9-92d085f57400\\screenshots';

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const TARGETS = [
  { name: '01-intel-convergence', selector: 'div[aria-label="Citadel Intelligence Ecosystem Convergence"]' },
  { name: '02-collective-convergence', selector: 'div[aria-label="Resident Collective Convergence Climax"]' },
  { name: '03-collective-blueprint', selector: '#resident-collective' },
  { name: '04-access-holographic-pass', selector: 'div[aria-label="3D Interactive Holographic Resident Credential Card"]' },
  { name: '05-access-scanner', selector: 'div[aria-label="Resident Credential Scanner Control Terminal"]' },
  { name: '06-access-cta', selector: 'div[aria-label="Final Cinematic Gateway Call to Action"]' },
  { name: '07-cinematic-manifesto', selector: '#cinematic-finale' },
];

async function capturePanels(mode = 'light') {
  console.log(`Starting targeted capture for ${mode.toUpperCase()} mode...`);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.evaluateOnNewDocument((m) => {
    localStorage.setItem('hostelx-theme', m);
  }, mode);

  await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });

  await page.waitForFunction(() => {
    return !document.querySelector('aside[aria-label*="System Initialization"]');
  }, { timeout: 15000 }).catch(() => console.log('Preloader timeout'));

  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate((targetMode) => {
    const isLightNow = document.documentElement.classList.contains('light');
    if ((targetMode === 'light' && !isLightNow) || (targetMode === 'dark' && isLightNow)) {
      const toggleBtn = document.querySelector('button[aria-label*="Click to switch"]');
      if (toggleBtn) toggleBtn.click();
    }
  }, mode);

  await new Promise(r => setTimeout(r, 800));

  for (const target of TARGETS) {
    console.log(`Capturing ${target.name}...`);
    const el = await page.$(target.selector);
    if (!el) {
      console.warn(`Target not found: ${target.selector}`);
      continue;
    }

    await page.evaluate((sel) => {
      const elem = document.querySelector(sel);
      if (elem) elem.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, target.selector);

    await new Promise(r => setTimeout(r, 800));

    const outPath = path.join(ARTIFACT_DIR, `panel-${mode}-${target.name}.png`);
    await el.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  console.log(`Completed ${mode} capture.`);
}

async function run() {
  await capturePanels('light');
  await capturePanels('dark');
}

run().catch(console.error);
