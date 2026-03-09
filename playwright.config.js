import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.{js,ts}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'tests/e2e/reports/html', open: 'never' }],
    ['json', { outputFile: 'tests/e2e/reports/results.json' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: { mode: 'only-on-failure', fullPage: true },
    video: { mode: 'on-first-retry', size: { width: 1920, height: 1080 } },
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true,
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  outputDir: 'tests/e2e/results',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  timeout: 60000,
  expect: { timeout: 10000 },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
