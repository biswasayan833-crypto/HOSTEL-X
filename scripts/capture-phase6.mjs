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

  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-hero.png") });
  console.log("Captured phase6-desktop-1440-hero.png");

  // Scroll to Collective Section Top (Header & Metrics)
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-collective-header.png") });
  console.log("Captured phase6-desktop-1440-collective-header.png");

  // Scroll to Central Resident Network Field Scene
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Citadel Resident Network Field Stage"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-collective-scene.png") });
  console.log("Captured phase6-desktop-1440-collective-scene.png");

  // Trigger Network Focus Mode by clicking a resident node (e.g. AYA-014)
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="AYA-014"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-focus-mode.png") });
  console.log("Captured phase6-desktop-1440-focus-mode.png");

  // Scroll to Research Divisions
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Research and Community Divisions"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-divisions.png") });
  console.log("Captured phase6-desktop-1440-divisions.png");

  // Scroll to Collaboration Matrices & Spaces
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Active Cross-Disciplinary Collaborations"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-collaborations.png") });
  console.log("Captured phase6-desktop-1440-collaborations.png");

  // Scroll to Collective Convergence Climax
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Resident Collective Convergence Climax"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1440-convergence.png") });
  console.log("Captured phase6-desktop-1440-convergence.png");

  // 2. Desktop 1280px
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase6-desktop-1280.png") });
  console.log("Captured phase6-desktop-1280.png");

  // 3. Tablet 1024px
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase6-tablet-1024.png") });
  console.log("Captured phase6-tablet-1024.png");

  // 4. Tablet 768px
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, "phase6-tablet-768.png") });
  console.log("Captured phase6-tablet-768.png");

  // 5. Mobile 412px
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 1 });
  try {
    await page.waitForFunction(() => !document.querySelector('aside[aria-label="System Initializer"]'), { timeout: 4000 });
  } catch (e) {}
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase6-mobile-412.png") });
  console.log("Captured phase6-mobile-412.png");

  // 6. Mobile 390px
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("resident-collective");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase6-mobile-390.png") });
  console.log("Captured phase6-mobile-390.png");

  await browser.close();
  console.log("All Phase 6 screenshots captured successfully.");
}

capture().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
