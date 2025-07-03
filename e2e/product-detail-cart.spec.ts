import { test, expect } from "@playwright/test";

test.describe("Product Detail and Add to Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("click on product, verify details, add to cart, check cart badge update", async ({
    page,
  }) => {
    // Click on the first product
    await page.locator("[data-cy=product-item]").first().click();
    await expect(page).toHaveURL(/\/products\//);
    await expect(page.locator("[data-cy=product-title]")).toBeVisible();

    // Select color and storage if options exist
    const colorOptions = page.locator("[data-cy=color-option]");
    if ((await colorOptions.count()) > 0) {
      await colorOptions.first().click();
    }
    const storageOptions = page.locator("[data-cy=storage-option]");
    if ((await storageOptions.count()) > 0) {
      await storageOptions.first().click();
    }

    // Add to cart
    const addToCartBtn = page.locator('button:has-text("Add to cart")');
    await addToCartBtn.click();
    // Wait for badge to update
    const cartBadge = page.locator("[data-cy=cart-badge]");
    await expect(cartBadge).toHaveText("1");
  });
});
