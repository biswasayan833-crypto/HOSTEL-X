import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.resolve("./screenshots");

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

  console.log("1. Navigating to http://localhost:3001...");
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" }).catch(() => {});

  // Wait for preloader to finish
  try {
    await page.waitForFunction(() => !document.querySelector('aside[aria-label="System Initializer"]'), { timeout: 8000 });
  } catch (e) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  // 1. Check Default Dark Mode
  const isDarkInitial = await page.evaluate(() => {
    return document.documentElement.classList.contains("dark") &&
           !document.documentElement.classList.contains("light");
  });
  console.log("Default Dark Mode active:", isDarkInitial);

  await page.screenshot({ path: path.join(outputDir, "theme-dark-hero.png") });
  console.log("Captured theme-dark-hero.png");

  // Scroll to Footer to inspect Creator Signature in Dark Mode
  await page.evaluate(() => {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "theme-dark-footer-signature.png") });
  console.log("Captured theme-dark-footer-signature.png");

  // 2. Click Theme Toggle to switch to LIGHT MODE
  console.log("Switching to LIGHT MODE...");
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));

  const toggleClicked = await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[aria-label*="Click to switch to"]');
    if (toggleBtn) {
      toggleBtn.click();
      return true;
    }
    return false;
  });
  console.log("Theme Toggle clicked:", toggleClicked);

  // Wait for smooth theme transition
  await new Promise((r) => setTimeout(r, 800));

  const isLightActive = await page.evaluate(() => {
    return document.documentElement.classList.contains("light") &&
           localStorage.getItem("hostelx-theme") === "light";
  });
  console.log("Light Mode active and stored in localStorage:", isLightActive);

  await page.screenshot({ path: path.join(outputDir, "theme-light-hero.png") });
  console.log("Captured theme-light-hero.png");

  // Light Mode Citadel Deconstruction
  await page.evaluate(() => {
    const el = document.getElementById("citadel-deconstruction");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "theme-light-citadel.png") });
  console.log("Captured theme-light-citadel.png");

  // Light Mode NOVA Concierge
  await page.evaluate(() => {
    const el = document.getElementById("concierge-nova");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "theme-light-nova.png") });
  console.log("Captured theme-light-nova.png");

  // Light Mode Holographic Access Pass
  await page.evaluate(() => {
    const el = document.getElementById("access-pass");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "theme-light-access-pass.png") });
  console.log("Captured theme-light-access-pass.png");

  // Light Mode Cinematic Finale
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "theme-light-finale.png") });
  console.log("Captured theme-light-finale.png");

  // Light Mode Footer & Creator Signature
  await page.evaluate(() => {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "theme-light-footer-signature.png") });
  console.log("Captured theme-light-footer-signature.png");

  // 3. Test Reload Persistence (Theme should remain light)
  console.log("Testing reload persistence...");
  await page.reload({ waitUntil: "domcontentloaded" });
  try {
    await page.waitForFunction(() => !document.querySelector('aside[aria-label="System Initializer"]'), { timeout: 8000 });
  } catch (e) {
    await new Promise((r) => setTimeout(r, 2000));
  }
  const isLightPersisted = await page.evaluate(() => {
    return document.documentElement.classList.contains("light") &&
           localStorage.getItem("hostelx-theme") === "light";
  });
  console.log("Theme persisted after reload:", isLightPersisted);

  // 4. Responsive Viewports in Light Mode
  // Tablet 1024px
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, "theme-light-tablet-1024.png") });
  console.log("Captured theme-light-tablet-1024.png");

  // Tablet 768px
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.screenshot({ path: path.join(outputDir, "theme-light-tablet-768.png") });
  console.log("Captured theme-light-tablet-768.png");

  // Mobile 412px
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 1 });
  await page.screenshot({ path: path.join(outputDir, "theme-light-mobile-412.png") });
  console.log("Captured theme-light-mobile-412.png");

  // Mobile 390px (Hero + Navigation toggle check)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.screenshot({ path: path.join(outputDir, "theme-light-mobile-390.png") });
  console.log("Captured theme-light-mobile-390.png");

  // Mobile 390px (Footer + Creator Signature)
  await page.evaluate(() => {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "theme-light-mobile-390-footer.png") });
  console.log("Captured theme-light-mobile-390-footer.png");

  // Switch back to dark mode to confirm round-trip toggle
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[aria-label*="Click to switch to"]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  const isDarkRestored = await page.evaluate(() => {
    return document.documentElement.classList.contains("dark") &&
           localStorage.getItem("hostelx-theme") === "dark";
  });
  console.log("Dark mode round-trip restored:", isDarkRestored);

  await browser.close();
  console.log("All automated browser checks completed successfully!");
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
