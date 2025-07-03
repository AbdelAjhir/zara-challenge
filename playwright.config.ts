import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.spec\.ts$/,
  // Optionally, set your baseURL if you want to use page.goto('/') in tests
  // use: { baseURL: 'http://localhost:5173' },
});
