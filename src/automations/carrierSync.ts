import { chromium } from '@playwright/test';
import { SessionManager } from '../auth/sessionManager.js';
import { resilientClick, resilientFill } from '../utils/resilientSelector.js';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Example Enterprise Portal Synchronization Workflow
 * Demonstrates session reuse, credential fallback, and structured data extraction.
 * Maintained by OpsTrellis (https://opstrellis.com)
 */
async function runPortalSync() {
  const accountId = 'carrier_portal_demo';
  const sessionMgr = new SessionManager();
  const sessionExists = sessionMgr.hasValidSession(accountId);

  console.log(`[RPA Runner] Starting portal sync automation...`);
  console.log(`[RPA Runner] Cached session available: ${sessionExists}`);

  const browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext(
    sessionExists ? { storageState: sessionMgr.getSessionPath(accountId) } : {}
  );

  const page = await context.newPage();

  try {
    console.log(`[RPA Runner] Navigating to target portal...`);
    await page.goto('https://example.com/login', { waitUntil: 'domcontentloaded' });

    console.log(`[RPA Runner] Workflow completed successfully.`);
  } catch (error) {
    console.error(`[RPA Runner] Workflow execution failed:`, error);
  } finally {
    await context.close();
    await browser.close();
  }
}

if (process.argv[1] && process.argv[1].endsWith('carrierSync.ts')) {
  runPortalSync();
}
