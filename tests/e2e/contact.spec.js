import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('renders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Contact Us', level: 1 })).toBeVisible();
  });

  test('shows email address', async ({ page }) => {
    await expect(page.getByText('hello@northlumedistribution.ca')).toBeVisible();
  });

  test('shows contact form with all fields', async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel(/Phone/)).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('form fields have correct types', async ({ page }) => {
    await expect(page.getByLabel('Email')).toHaveAttribute('type', 'email');
    await expect(page.getByLabel(/Phone/)).toHaveAttribute('type', 'tel');
  });

  test('name and email are required', async ({ page }) => {
    await expect(page.getByLabel('Name')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '');
    await expect(page.getByLabel('Message')).toHaveAttribute('required', '');
  });

  test('phone is optional', async ({ page }) => {
    const phone = page.getByLabel(/Phone/);
    const required = await phone.getAttribute('required');
    expect(required).toBeNull();
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact Us/);
  });
});
