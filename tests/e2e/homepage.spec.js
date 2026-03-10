import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('renders hero section with heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Reliable Product Distribution');
  });

  test('renders hero CTA buttons', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Get in Touch' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Products/ })).toBeVisible();
  });

  test('renders About section', async ({ page }) => {
    await expect(page.getByText('Who We Are')).toBeVisible();
  });

  test('renders Stats section with key numbers', async ({ page }) => {
    await expect(page.getByText('Years of Experience', { exact: true })).toBeVisible();
    await expect(page.getByText('Countries Served', { exact: true })).toBeVisible();
  });

  test('renders Featured Products section', async ({ page }) => {
    await expect(page.getByText('Featured Products')).toBeVisible();
    await expect(page.getByRole('link', { name: /View all products/ })).toBeVisible();
  });

  test('renders Contact CTA section', async ({ page }) => {
    await expect(page.getByText('Ready to Stock Up?')).toBeVisible();
  });

  test('hero Get in Touch navigates to contact page', async ({ page }) => {
    await page.getByRole('link', { name: 'Get in Touch' }).first().click();
    await expect(page).toHaveURL(/\/en\/contact/);
  });

  test('hero View Products navigates to products page', async ({ page }) => {
    await page.getByRole('link', { name: /View Products/ }).first().click();
    await expect(page).toHaveURL(/\/en\/products/);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/North Lume Distribution/);
  });
});
