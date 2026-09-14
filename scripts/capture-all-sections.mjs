import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Ayan Biswas\\.gemini\\antigravity\\brain\\7b5ee5ad-6590-4a64-95e9-92d085f57400\\screenshots';

if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

const SECTIONS = [
  { name: '01-hero', selector: 'main > section:first-child' },
  { name: '02-citadel-deconstruction', selector: '#citadel-deconstruction' },
  { name: '03-citadel-preview', selector: '#citadel-preview' },
  { name: '04-concierge-nova', selector: '#concierge-nova' },
  { name: '05-smart-living', selector: '#smart-living' },
  { name: '06-citadel-intelligence', selector: '#citadel-intelligence' },
  { name: '07-resident-collective', selector: '#resident-collective' },
  { name: '08-access-pass', selector: '#access-pass' },
  { name: '09-cinematic-finale', selector: '#cinematic-finale' },
  { name: '10-footer', selector: '#footer' },
];

async function captureMode(browser, mode, viewport = { width: 1440, height: 900 }, prefix = '') {
  console.log(`\n--- Capturing ${mode.toUpperCase()} MODE at ${viewport.width}x${viewport.height} ---`);
  const page = await browser.newPage();
  await page.setViewport(viewport);

  const consoleLogs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleLogs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  // Set theme before navigation using exact storage key
  await page.evaluateOnNewDocument((targetTheme) => {
    localStorage.setItem('hostelx-theme', targetTheme);
  }, mode);

  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for preloader to finish
  console.log('Waiting for preloader completion...');
  await page.waitForFunction(() => {
    const preloader = document.querySelector('aside[aria-label*="System Initialization"]');
    return !preloader;
  }, { timeout: 15000 }).catch(() => {
    console.log('Preloader timeout - proceeding');
  });

  await new Promise(r => setTimeout(r, 1200));

  // Sync React theme context by clicking toggle if needed
  await page.evaluate((targetMode) => {
    const isLightNow = document.documentElement.classList.contains('light');
    if ((targetMode === 'light' && !isLightNow) || (targetMode === 'dark' && isLightNow)) {
      const toggleBtn = document.querySelector('button[aria-label*="Click to switch"]');
      if (toggleBtn) {
        toggleBtn.click();
      }
    }
  }, mode);

  await new Promise(r => setTimeout(r, 600));

  for (const sec of SECTIONS) {
    console.log(`Capturing ${sec.name}...`);
    const el = await page.$(sec.selector);
    if (!el) {
      console.warn(`Could not find ${sec.selector}`);
      continue;
    }

    // Scroll element into view
    await page.evaluate((selector) => {
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }, sec.selector);

    // Give GSAP animations and R3F time to settle
    await new Promise(r => setTimeout(r, 800));

    const outPath = path.join(ARTIFACT_DIR, `audit-${prefix}${mode}-${sec.name}.png`);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  }

  await page.close();

  if (consoleLogs.length > 0) {
    console.log(`Console issues in ${mode}:`);
    consoleLogs.forEach(l => console.log('  ', l));
  } else {
    console.log(`Zero console errors/warnings in ${mode}!`);
  }
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    // 1. Audit Light Mode (High Priority)
    await captureMode(browser, 'light', { width: 1440, height: 900 }, '');

    // 2. Audit Dark Mode (Ensure zero regression)
    await captureMode(browser, 'dark', { width: 1440, height: 900 }, '');

    // 3. Mobile Light Mode Check (390px)
    await captureMode(browser, 'light', { width: 390, height: 844 }, 'mobile-');

    console.log('\n=== AUDIT CAPTURE COMPLETE ===');
  } finally {
    await browser.close();
  }
}

run().catch(console.error);
