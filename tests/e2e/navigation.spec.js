import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('header navigation links work', async ({ page }) => {
    await page.goto('/');

    // Navigate to Products
    await page.getByRole('navigation').getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('/products');

    // Navigate to Contact
    await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' }).click();
    await expect(page).toHaveURL('/privacy');
  });

  test('privacy policy page renders', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/Privacy Policy/);
  });

  test('terms of service page renders', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.getByRole('heading', { name: 'Terms of Service', level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/Terms of Service/);
  });

  test('404 page renders for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
  });

  test('404 page has link back to home', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await page.getByRole('link', { name: 'Go home' }).click();
    await expect(page).toHaveURL('/');
  });

  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeAttached();
  });

  test('cookie consent banner appears on first visit', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');

    await expect(page.getByRole('dialog', { name: /Cookie consent/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Accept' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Decline' })).toBeVisible();

    await context.close();
  });

  test('cookie consent banner hides after accepting', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');

    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(page.getByRole('dialog', { name: /Cookie consent/ })).not.toBeVisible();

    await context.close();
  });
});
