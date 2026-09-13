import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.resolve('c:/Users/Ayan Biswas/Desktop/HostelX/screenshots/overlap-audit');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '412', width: 412, height: 915 },
  { name: '390', width: 390, height: 844 },
];

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const results = [];

  for (const theme of ['dark', 'light']) {
    console.log(`\n========================================`);
    console.log(`Auditing Theme: ${theme.toUpperCase()}`);
    console.log(`========================================`);

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });

      // Wait for preloader to finish naturally so React sets preloaderDone = true (opacity-100)
      try {
        await page.waitForFunction(() => !document.querySelector('aside[aria-label*="System"]'), { timeout: 8000 });
      } catch (e) {
        await new Promise(r => setTimeout(r, 2000));
      }
      await new Promise(r => setTimeout(r, 1000));

      // Apply theme
      if (theme === 'light') {
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
          document.documentElement.setAttribute('data-theme', 'light');
        });
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        });
      }
      await new Promise(r => setTimeout(r, 400));

      // Scroll into Citadel Deconstruction to stage 2
      await page.evaluate(() => {
        const el = document.getElementById('citadel-deconstruction');
        if (el) {
          const top = el.offsetTop;
          window.scrollTo({ top: top + window.innerHeight * 0.9, behavior: 'instant' });
        }
      });
      await new Promise(r => setTimeout(r, 1000));

      // Measure vertical separation in Citadel Deconstruction
      const deconstructMetrics = await page.evaluate(() => {
        const section = document.getElementById('citadel-deconstruction');
        if (!section) return null;

        const spans = Array.from(section.querySelectorAll('span'));
        const eyebrow = spans.find(s => s.textContent && s.textContent.includes('DECONSTRUCTION TELEMETRY'));
        const tag = spans.find(s => s.textContent && (s.textContent.includes('// EXOSKELETON') || s.textContent.includes('// MONOLITH') || s.textContent.includes('// CORE') || s.textContent.includes('// HABITAT')));
        const h2 = section.querySelector('h2');
        const subtitle = section.querySelector('h2 + p');
        const descContainer = section.querySelector('[data-story-desc="true"]');
        const desc = descContainer ? descContainer.querySelector('p') : null;

        if (!eyebrow || !tag || !h2 || !subtitle || !desc) {
          return { error: 'Missing elements', found: { eyebrow: !!eyebrow, tag: !!tag, h2: !!h2, subtitle: !!subtitle, desc: !!desc } };
        }

        const rectEyebrow = eyebrow.getBoundingClientRect();
        const rectTag = tag.getBoundingClientRect();
        const rectH2 = h2.getBoundingClientRect();
        const rectSub = subtitle.getBoundingClientRect();
        const rectDesc = desc.getBoundingClientRect();

        return {
          diff_eyebrow_to_tag: Math.round(rectTag.top - rectEyebrow.bottom),
          diff_tag_to_h2: Math.round(rectH2.top - rectTag.bottom),
          diff_h2_to_sub: Math.round(rectSub.top - rectH2.bottom),
          diff_sub_to_desc: Math.round(rectDesc.top - rectSub.bottom),
        };
      });

      const passHierarchy = deconstructMetrics && !deconstructMetrics.error &&
        deconstructMetrics.diff_eyebrow_to_tag >= 0 &&
        deconstructMetrics.diff_tag_to_h2 >= 0 &&
        deconstructMetrics.diff_h2_to_sub >= 0 &&
        deconstructMetrics.diff_sub_to_desc >= 0;

      console.log(`  [${theme.toUpperCase()} @ ${vp.name}px] ${passHierarchy ? 'PASS' : 'FAIL'}`, JSON.stringify(deconstructMetrics));

      results.push({
        theme,
        viewport: vp.name,
        pass: passHierarchy,
      });

      const screenshotPath = path.join(outputDir, `audit-${theme}-${vp.name}-citadel-deconstruction.png`);
      await page.screenshot({ path: screenshotPath });

      await page.close();
    }
  }

  await browser.close();

  console.log('\n========================================');
  let allPass = true;
  for (const r of results) {
    if (!r.pass) allPass = false;
  }
  console.log(`OVERALL RESULT: ${allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
