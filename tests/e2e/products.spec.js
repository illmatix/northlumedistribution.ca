import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/products');
  });

  test('renders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Our Products', level: 1 })).toBeVisible();
  });

  test('shows search input', async ({ page }) => {
    await expect(page.getByPlaceholder(/Search products/)).toBeVisible();
  });

  test('shows category filter pills', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'All Categories' })).toBeVisible();
    // At least one category pill beyond "All Categories"
    const pills = page.locator('button:has-text("All Categories") ~ button');
    await expect(pills.first()).toBeVisible();
  });

  test('shows product brands', async ({ page }) => {
    // At least one brand heading should be visible
    const brandHeadings = page.locator('h3');
    await expect(brandHeadings.first()).toBeVisible();
  });

  test('search filters products', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search products/);
    await searchInput.fill('Volt');

    // Should show filtered count
    await expect(page.getByText(/brand.*found/)).toBeVisible();
  });

  test('search with no results shows empty state', async ({ page }) => {
    await page.getByPlaceholder(/Search products/).fill('xyznonexistent');

    await expect(page.getByText('No products found')).toBeVisible();
  });

  test('category pill filters products', async ({ page }) => {
    // Click the first category pill (not "All Categories")
    const firstCategory = page.locator('button:has-text("All Categories") ~ button').first();
    await firstCategory.click();

    // Should show filtered results
    await expect(page.getByText(/brand.*found/)).toBeVisible();
  });

  test('clear all resets filters', async ({ page }) => {
    await page.getByPlaceholder(/Search products/).fill('test');
    await page.getByRole('button', { name: 'Clear all', exact: true }).click();

    await expect(page.getByPlaceholder(/Search products/)).toHaveValue('');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Our Products/);
  });
});
