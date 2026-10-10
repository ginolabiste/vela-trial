import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = ["blog", "locations", "contact"];
for (const route of routes) {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    test(`${route}: layout and assets at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      const failed = [];
      page.on("response", (response) => {
        if (
          response.url().startsWith("http://127.0.0.1") &&
          response.status() >= 400
        )
          failed.push(response.url());
      });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${route}/`);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every((i) => i.complete && i.naturalWidth > 0),
          ),
      ).toBe(true);
      expect(
        await page
          .locator("a")
          .evaluateAll((links) =>
            links.every(
              (a) => a.getAttribute("href") && a.getAttribute("href") !== "#",
            ),
          ),
      ).toBe(true);
      expect(errors).toEqual([]);
      expect(failed).toEqual([]);
    });
  }
  test(`${route}: WCAG automated checks`, async ({ page }) => {
    await page.goto(`/${route}/`);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
  test(`${route}: active navigation and mobile keyboard`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${route}/`);
    const menu = page.getByRole("button", { name: "Menu" });
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeHidden();
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator('nav [aria-current="page"]')).toHaveAttribute(
      "href",
      `/${route}/`,
    );
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Auto insurance", exact: true }).first(),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  });
}
test("office search, empty state, clear, phone and directions", async ({
  page,
}) => {
  await page.goto("/locations/");
  const search = page.getByRole("searchbox", { name: "Search our locations" });
  await expect(page.locator(".office:visible")).toHaveCount(4);
  await search.fill("  BERWYN  ");
  await expect(page.locator(".office:visible")).toHaveCount(1);
  await expect(page.getByRole("status")).toHaveText("1 location found");
  await search.fill("60630");
  await expect(page.locator(".office:visible h2")).toHaveText(
    "Corporate Headquarters",
  );
  await search.fill("<script>");
  await expect(page.getByText("No offices found")).toBeVisible();
  await expect(page.locator(".office:visible")).toHaveCount(0);
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(page.locator(".office:visible")).toHaveCount(4);
  await expect(search).toBeFocused();
  for (const card of await page.locator(".office").all()) {
    expect(await card.locator(".office-phone").getAttribute("href")).toMatch(
      /^tel:\+1\d{10}$/,
    );
    const href = await card
      .getByRole("link", { name: "Get directions" })
      .getAttribute("href");
    expect(new URL(href).searchParams.get("destination")).toBe(
      await card.locator("address").textContent(),
    );
  }
});
test("all internal links resolve and homepage navigation works", async ({
  page,
  request,
}) => {
  const links = new Set();
  for (const route of ["", ...routes]) {
    await page.goto(`/${route}${route ? "/" : ""}`);
    for (const href of await page
      .locator("a")
      .evaluateAll((a) =>
        a
          .map((x) => x.getAttribute("href"))
          .filter((x) => x.startsWith("/") || x.startsWith("./")),
      ))
      links.add(href);
  }
  for (const link of links)
    expect((await request.get(link)).status()).toBe(200);
  await page.goto("/");
  await page.getByRole("link", { name: "Tips & Resources →" }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
});
test("skip link, no fake form and correct article count", async ({ page }) => {
  await page.goto("/contact/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page.locator("form")).toHaveCount(0);
  await expect(
    page.getByText("This trial preview does not collect or send messages.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.goto("/blog/");
  await expect(page.locator(".article")).toHaveCount(4);
  await expect(
    page.getByRole("link", { name: "Older articles" }),
  ).toHaveAttribute(
    "href",
    "https://www.insureonthespot.com/customer-service/blog/page/2/",
  );
});
