import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.resolve("./screenshots/audit");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log("Navigating to http://localhost:3001...");
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });

  try {
    await page.waitForFunction(() => !document.querySelector('aside[aria-label="System Initializer"]'), { timeout: 8000 });
  } catch (e) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  // 1. Switch to LIGHT MODE
  console.log("Switching to Light Mode...");
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[aria-label*="Click to switch to"]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // 2. Capture all 9 sections in Light Mode (1440px)
  console.log("Capturing 1440px Light Mode sections...");

  // Hero
  await page.screenshot({ path: path.join(outputDir, "audit-light-01-hero.png") });
  console.log("Captured 01-hero");

  // Citadel
  await page.evaluate(() => {
    const el = document.getElementById("citadel-deconstruction");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-02-citadel.png") });
  console.log("Captured 02-citadel");

  // NOVA
  await page.evaluate(() => {
    const el = document.getElementById("concierge-nova");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-03-nova.png") });
  console.log("Captured 03-nova");

  // Smart Living
  await page.evaluate(() => {
    const el = document.getElementById("smart-living");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-04-smartliving.png") });
  console.log("Captured 04-smartliving");

  // Intelligence
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-05-intelligence.png") });
  console.log("Captured 05-intelligence");

  // Collective
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-06-collective.png") });
  console.log("Captured 06-collective");

  // Access Pass
  await page.evaluate(() => {
    const el = document.getElementById("access-pass");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-07-accesspass.png") });
  console.log("Captured 07-accesspass");

  // Finale
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "audit-light-08-finale.png") });
  console.log("Captured 08-finale");

  // Footer
  await page.evaluate(() => {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "audit-light-09-footer.png") });
  console.log("Captured 09-footer");

  // 3. Responsive Viewports in Light Mode
  console.log("Capturing responsive viewports in Light Mode...");
  const viewports = [
    { name: "1280", w: 1280, h: 800 },
    { name: "1024", w: 1024, h: 768 },
    { name: "768", w: 768, h: 1024 },
    { name: "412", w: 412, h: 915 },
    { name: "390", w: 390, h: 844 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, `audit-light-vp-${vp.name}-hero.png`) });

    // Also capture smart living or finale on mobile
    if (vp.w <= 412) {
      await page.evaluate(() => {
        const el = document.getElementById("smart-living");
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({ path: path.join(outputDir, `audit-light-vp-${vp.name}-smartliving.png`) });
    }
    console.log(`Captured vp-${vp.name}`);
  }

  // 4. Dark Mode Regression Check
  console.log("Verifying Dark Mode regression...");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const toggleBtn = document.querySelector('button[aria-label*="Click to switch to"]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({ path: path.join(outputDir, "audit-dark-01-hero.png") });
  console.log("Captured dark-01-hero");

  await page.evaluate(() => {
    const el = document.getElementById("concierge-nova");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "audit-dark-03-nova.png") });
  console.log("Captured dark-03-nova");

  await page.evaluate(() => {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "audit-dark-09-footer.png") });
  console.log("Captured dark-09-footer");

  await browser.close();
  console.log("All audit screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
