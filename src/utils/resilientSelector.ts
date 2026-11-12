import { Page, Locator } from '@playwright/test';

/**
 * Resilient Selector & Retry Utility
 * Handles dynamic SPAs, animated modals, and network jitter in enterprise portals.
 * https://opstrellis.com
 */
export async function resilientClick(page: Page, selector: string, maxRetries: number = 3): Promise<void> {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      attempts++;
      const locator = page.locator(selector).first();
      await locator.waitFor({ state: 'visible', timeout: 8000 });
      await locator.scrollIntoViewIfNeeded();
      await locator.click();
      return;
    } catch (err) {
      if (attempts >= maxRetries) throw err;
      console.warn(`[ResilientClick] Attempt ${attempts} failed for "${selector}". Retrying in 1s...`);
      await page.waitForTimeout(1000);
    }
  }
}

export async function resilientFill(page: Page, selector: string, value: string): Promise<void> {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  await locator.fill('');
  await locator.fill(value);
}
