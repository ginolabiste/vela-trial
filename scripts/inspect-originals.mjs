import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await mkdir("screenshots/originals", { recursive: true });
const observations = {};
for (const [name, path] of Object.entries({
  blog: "customer-service/blog/",
  locations: "locations/",
  contact: "contact/",
})) {
  await page.goto("https://www.insureonthespot.com/" + path, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.screenshot({
    path: `screenshots/originals/${name}-desktop.png`,
    fullPage: true,
  });
  observations[name] = await page.evaluate(() => ({
    title: document.title,
    headings: [...document.querySelectorAll("h1,h2")].map((e) =>
      e.textContent.trim(),
    ),
    images: [...document.images].map((e) => ({ src: e.src, alt: e.alt })),
    links: [...document.querySelectorAll("a[href]")].map((e) => ({
      text: e.textContent.trim(),
      href: e.href,
    })),
    font: getComputedStyle(document.body).fontFamily,
  }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: `screenshots/originals/${name}-mobile.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
}
await writeFile(
  "docs/reference/observations.json",
  JSON.stringify(observations, null, 2),
);
await browser.close();
