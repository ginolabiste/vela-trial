import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:4173",
    channel: process.env.CI ? undefined : "msedge",
    headless: true,
  },
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command: "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
      },
  workers: 2,
});
