import { test, expect } from "@playwright/test";

test.describe("Catalog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("shows a list of products", async ({ page }) => {
    // Check that at least one product item is visible
    await expect(page.locator("[data-cy=product-item]").first()).toBeVisible();
    // Count total products and ensure there are more than 0
    const count = await page.locator("[data-cy=product-item]").count();
    expect(count).toBeGreaterThan(0);
  });

  test("can search for a product", async ({ page }) => {
    await page.locator("[data-cy=search-input]").fill("iPhone");
    // Verify that filtered results are shown
    const filteredCount = await page.locator("[data-cy=product-item]").count();
    expect(filteredCount).toBeGreaterThan(0);

    // Get all product items and verify at least one contains "iPhone"
    const items = page.locator("[data-cy=product-item]");
    const count = await items.count();
    let found = false;

    // Iterate through all items to check if any contain "iPhone"
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      if (text && text.includes("iPhone")) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  test("navigates to product detail page", async ({ page }) => {
    // Click on the first product to navigate to its detail page
    await page.locator("[data-cy=product-item]").first().click();
    // Verify URL contains /products/
    await expect(page).toHaveURL(/\/products\//);
    // Verify product title is visible on the detail page
    await expect(page.locator("[data-cy=product-title]")).toBeVisible();
  });
});
