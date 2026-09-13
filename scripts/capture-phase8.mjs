import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.resolve("./screenshots");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // 1. Desktop 1440px - Regression Check (Hero)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3001", { waitUntil: "networkidle0" }).catch(() => {});
  try {
    await page.waitForFunction(() => !document.querySelector('aside[aria-label="System Initializer"]'), { timeout: 8000 });
  } catch (e) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1440-hero.png") });
  console.log("Captured phase8-desktop-1440-hero.png");

  // Scroll to Holographic Access Pass (Phase 7 Regression)
  await page.evaluate(() => {
    const el = document.getElementById("access-pass");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1440-access.png") });
  console.log("Captured phase8-desktop-1440-access.png");

  // Scroll to Cinematic Finale Top (Monumental Statement)
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1440-finale-manifesto.png") });
  console.log("Captured phase8-desktop-1440-finale-manifesto.png");

  // Scroll to Awakened 3D Citadel & NOVA Transmission
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Cinematic Finale and Final Statement"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1440-citadel-awakened.png") });
  console.log("Captured phase8-desktop-1440-citadel-awakened.png");

  // Scroll to Chapter Warp Matrix
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Jump to 01 // INGRESS & HERO"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1440-warp-hub.png") });
  console.log("Captured phase8-desktop-1440-warp-hub.png");

  // Scroll to Architectural Editorial Footer
  await page.evaluate(() => {
    const el = document.getElementById("footer");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1440-footer.png") });
  console.log("Captured phase8-desktop-1440-footer.png");

  // 2. Desktop 1280px
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase8-desktop-1280.png") });
  console.log("Captured phase8-desktop-1280.png");

  // 3. Tablet 1024px
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase8-tablet-1024.png") });
  console.log("Captured phase8-tablet-1024.png");

  // 4. Tablet 768px
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase8-tablet-768.png") });
  console.log("Captured phase8-tablet-768.png");

  // 5. Mobile 412px
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase8-mobile-412.png") });
  console.log("Captured phase8-mobile-412.png");

  // 6. Mobile 390px
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("cinematic-finale");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase8-mobile-390.png") });
  console.log("Captured phase8-mobile-390.png");

  await browser.close();
  console.log("All Phase 8 screenshots captured successfully.");
}

capture().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
