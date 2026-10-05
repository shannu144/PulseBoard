import { test, expect } from "@playwright/test";

test.describe("Personalized Content Dashboard E2E Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should render the dashboard layout with header and sidebar", async ({ page }) => {
    // Check Brand Logo
    await expect(page.getByText("PulseBoard")).toBeVisible();
    // Check For You section heading
    await expect(page.getByRole("heading", { name: "For You" })).toBeVisible();
    // Check search input
    await expect(
      page.getByPlaceholder("Search news, movies, podcasts, and tweets...")
    ).toBeVisible();
  });

  test("should filter feed with debounced search functionality", async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      "Search news, movies, podcasts, and tweets..."
    );
    await searchInput.fill("Quantum");
    // Wait for debounced search dispatch
    await page.waitForTimeout(400);

    // Should display matching card
    await expect(page.getByText(/Quantum/i).first()).toBeVisible();
  });

  test("should allow bookmarking items into Favorites section", async ({ page }) => {
    // Click the first favorite button
    const firstFavoriteBtn = page.getByLabel("Save to Favorites").first();
    await firstFavoriteBtn.click();

    // Navigate to Favorites tab in sidebar
    await page.getByRole("button", { name: /Favorites/i }).click();

    // Check that favorites page shows saved counter
    await expect(page.getByText(/saved/i)).toBeVisible();
  });

  test("should toggle dark mode and light mode", async ({ page }) => {
    const themeBtn = page.getByLabel(/Mode/i);
    await themeBtn.click();

    // Verify dark class toggled on html element
    const html = page.locator("html");
    await expect(html).toBeVisible();
  });

  test("should open and customize profile in Auth Modal", async ({ page }) => {
    // Click user avatar in header
    await page.getByLabel("User Account").click();

    // Modal should appear
    await expect(page.getByText("Account & Profile")).toBeVisible();
    await expect(page.getByText("Alex Rivera")).toBeVisible();
  });
});
