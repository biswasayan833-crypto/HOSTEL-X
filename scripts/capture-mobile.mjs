import puppeteer from "puppeteer-core";
import path from "path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = "C:\\Users\\Ayan Biswas\\.gemini\\antigravity\\brain\\7b5ee5ad-6590-4a64-95e9-92d085f57400\\screenshots";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 2600));

  // Scroll to scene
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Citadel Architectural Intelligence Stage"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase5-mobile-390-scene.png") });
  console.log("Captured phase5-mobile-390-scene.png");

  // Scroll to matrices
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Energy Harvest Matrix"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, "phase5-mobile-390-matrices.png") });
  console.log("Captured phase5-mobile-390-matrices.png");

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
