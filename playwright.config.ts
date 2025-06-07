import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
export const STORAGE_STATE_DEFAULT_USER = path.join(__dirname, 'playwright/.auth/user.json');


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    /* Removed slowMo as it does not exist in the type definition and is already defined in the project configurations */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts'
    },
    {
      name: 'e2e test',
      testMatch: '*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_DEFAULT_USER,
      },
      dependencies: ['setup'],
    }
  ],
});
