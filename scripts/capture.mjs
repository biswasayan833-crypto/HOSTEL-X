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

  // 1. Desktop 1440px - Hero State
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 2600)); // Wait for preloader

  await page.screenshot({ path: path.join(outputDir, "phase5-desktop-1440-hero.png") });
  console.log("Captured phase5-desktop-1440-hero.png");

  // Scroll to Intelligence Section Top (HUD + Header + Metrics)
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase5-desktop-1440-intelligence-header.png") });
  console.log("Captured phase5-desktop-1440-intelligence-header.png");

  // Scroll to Central Intelligence Scene (Architectural Silhouette, Laser Scanner & Telemetry Nodes)
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Citadel Architectural Intelligence Stage"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase5-desktop-1440-intelligence-scene.png") });
  console.log("Captured phase5-desktop-1440-intelligence-scene.png");

  // Scroll to Energy & Environmental Matrices
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Energy Harvest Matrix"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase5-desktop-1440-intelligence-matrices.png") });
  console.log("Captured phase5-desktop-1440-intelligence-matrices.png");

  // Scroll to Intelligence Convergence Climax
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Citadel Intelligence Ecosystem Convergence"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase5-desktop-1440-convergence.png") });
  console.log("Captured phase5-desktop-1440-convergence.png");

  // 2. Desktop 1280px
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase5-desktop-1280.png") });
  console.log("Captured phase5-desktop-1280.png");

  // 3. Tablet 1024px
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase5-tablet-1024.png") });
  console.log("Captured phase5-tablet-1024.png");

  // 4. Tablet 768px
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase5-tablet-768.png") });
  console.log("Captured phase5-tablet-768.png");

  // 5. Mobile 412px
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase5-mobile-412.png") });
  console.log("Captured phase5-mobile-412.png");

  // 6. Mobile 390px
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const el = document.getElementById("citadel-intelligence");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase5-mobile-390.png") });
  console.log("Captured phase5-mobile-390.png");

  await browser.close();
  console.log("All Phase 5 screenshots captured successfully.");
}

capture().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
