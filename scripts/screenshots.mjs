import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.SCREENSHOT_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const captures = [];
for (const [kind, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  await mkdir(`screenshots/${kind}`, { recursive: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  for (const route of ["blog", "locations", "contact"]) {
    await page.goto(`${base}${route}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `screenshots/${kind}/${route}.png`,
      fullPage: true,
    });
    captures.push({
      route,
      kind,
      width,
      height,
      url: page.url(),
      scrollHeight: await page.evaluate(
        () => document.documentElement.scrollHeight,
      ),
    });
  }
  await page.close();
}
await writeFile(
  "screenshots/manifest.json",
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      browser: "Installed Microsoft Edge (Playwright)",
      captures,
    },
    null,
    2,
  ),
);
await browser.close();
