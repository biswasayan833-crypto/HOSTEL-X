import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Ayan Biswas\\.gemini\\antigravity\\brain\\7b5ee5ad-6590-4a64-95e9-92d085f57400\\screenshots';

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-land-1024x768', width: 1024, height: 768 },
  { name: 'tablet-port-768x1024', width: 768, height: 1024 },
  { name: 'mobile-412x915', width: 412, height: 915 },
  { name: 'mobile-390x844', width: 390, height: 844 },
];

const SECTIONS = [
  { name: 'hero', selector: 'main > section:first-child' },
  { name: 'citadel-deconstruction', selector: '#citadel-deconstruction' },
  { name: 'nova', selector: '#concierge-nova' },
  { name: 'smart-living', selector: '#smart-living' },
  { name: 'intel-convergence', selector: 'div[aria-label="Citadel Intelligence Ecosystem Convergence"]' },
  { name: 'collective-blueprint', selector: '#resident-collective' },
  { name: 'collective-convergence', selector: 'div[aria-label="Resident Collective Convergence Climax"]' },
  { name: 'access-pass', selector: '#access-pass' },
  { name: 'access-cta', selector: 'div[aria-label="Final Cinematic Gateway Call to Action"]' },
  { name: 'cinematic-finale', selector: '#cinematic-finale' },
  { name: 'footer', selector: '#footer' },
];

async function run() {
  console.log('=== MULTI-VIEWPORT VERIFICATION RUNNER ===');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const allLogs = [];
  const collisionIssues = [];

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    for (const mode of ['light', 'dark']) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      page.on('console', (msg) => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
          allLogs.push(`[${vp.name}][${mode}][${msg.type().toUpperCase()}] ${msg.text()}`);
        }
      });

      await page.evaluateOnNewDocument((m) => {
        localStorage.setItem('hostelx-theme', m);
      }, mode);

      await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });

      await page.waitForFunction(() => {
        return !document.querySelector('aside[aria-label*="System Initialization"]');
      }, { timeout: 15000 }).catch(() => {});

      await new Promise(r => setTimeout(r, 600));

      await page.evaluate((targetMode) => {
        const isLightNow = document.documentElement.classList.contains('light');
        if ((targetMode === 'light' && !isLightNow) || (targetMode === 'dark' && isLightNow)) {
          const toggleBtn = document.querySelector('button[aria-label*="Click to switch"]');
          if (toggleBtn) toggleBtn.click();
        }
      }, mode);

      await new Promise(r => setTimeout(r, 500));

      // Overlap / Collision Check
      const collisions = await page.evaluate(() => {
        const textElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span, div'))
          .filter(el => {
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
            if (el.children.length > 0 && el.innerText.trim().length > 100) return false;
            const text = el.innerText ? el.innerText.trim() : '';
            return text.length > 3 && el.children.length <= 2;
          });

        const issues = [];
        for (let i = 0; i < textElements.length; i++) {
          const r1 = textElements[i].getBoundingClientRect();
          if (r1.width <= 0 || r1.height <= 0) continue;
          if (r1.bottom < 0 || r1.top > window.innerHeight * 2) continue;

          for (let j = i + 1; j < textElements.length; j++) {
            const r2 = textElements[j].getBoundingClientRect();
            if (r2.width <= 0 || r2.height <= 0) continue;
            if (textElements[i].contains(textElements[j]) || textElements[j].contains(textElements[i])) continue;

            const overlapX = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
            const overlapY = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
            const overlapArea = overlapX * overlapY;

            if (overlapArea > 200 && overlapY > 12 && overlapX > 40) {
              issues.push({
                t1: textElements[i].innerText.slice(0, 30),
                t2: textElements[j].innerText.slice(0, 30),
                area: overlapArea
              });
            }
          }
        }
        return issues;
      });

      if (collisions.length > 0) {
        console.warn(`  [${vp.name}][${mode}] Potential collisions:`, collisions.length);
        collisionIssues.push(...collisions.map(c => `[${vp.name}][${mode}] "${c.t1}" <-> "${c.t2}"`));
      }

      // Capture selective key snapshots for mobile and tablet
      if (vp.name === 'mobile-390x844' || vp.name === 'tablet-port-768x1024') {
        for (const sec of ['intel-convergence', 'collective-convergence', 'access-cta', 'access-pass']) {
          const target = SECTIONS.find(s => s.name === sec);
          const el = await page.$(target.selector);
          if (el) {
            await page.evaluate((sel) => {
              const e = document.querySelector(sel);
              if (e) e.scrollIntoView({ behavior: 'instant', block: 'center' });
            }, target.selector);
            await new Promise(r => setTimeout(r, 400));
            const outPath = path.join(ARTIFACT_DIR, `qa-${vp.name}-${mode}-${sec}.png`);
            await el.screenshot({ path: outPath });
          }
        }
      }

      await page.close();
    }
  }

  await browser.close();

  console.log('\n================ QA SUMMARY ================');
  console.log('Total viewports tested:', VIEWPORTS.length);
  console.log('Console errors/warnings:', allLogs.length === 0 ? 'ZERO (PASSED)' : allLogs);
  console.log('Text collisions detected:', collisionIssues.length === 0 ? 'ZERO (PASSED)' : collisionIssues);
  console.log('============================================\n');
}

run().catch(console.error);
