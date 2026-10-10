import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
const urls = new Set();
for (const route of ["blog", "locations", "contact"]) {
  await page.goto(`http://127.0.0.1:4175/${route}/`);
  for (const href of await page
    .locator('a[href^="https:"]')
    .evaluateAll((a) => a.map((x) => x.href)))
    if (!href.includes("google.com/maps")) urls.add(href);
}
const results = [];
for (const url of urls) {
  try {
    const response = await page.request.get(url, { timeout: 20000 });
    results.push({ url, status: response.status(), finalUrl: response.url() });
  } catch (e) {
    results.push({ url, error: e.message.split("\n")[0] });
  }
}
await writeFile(
  "docs/reference/link-check.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results.filter((r) => r.status >= 400 || r.error)));
console.log(`${results.length} unique external links checked`);
await browser.close();
