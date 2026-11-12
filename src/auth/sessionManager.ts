import { BrowserContext } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Enterprise Session Manager
 * Preserves authenticated cookies & localStorage across portal RPA runs
 * to prevent repeated MFA triggers and rate-limiting.
 * https://opstrellis.com
 */
export class SessionManager {
  private sessionDir: string;

  constructor(sessionDir: string = './.auth') {
    this.sessionDir = sessionDir;
    if (!fs.existsSync(this.sessionDir)) {
      fs.mkdirSync(this.sessionDir, { recursive: true });
    }
  }

  public getSessionPath(accountName: string): string {
    return path.join(this.sessionDir, `${accountName}-state.json`);
  }

  public hasValidSession(accountName: string, maxAgeHours: number = 24): boolean {
    const sessionPath = this.getSessionPath(accountName);
    if (!fs.existsSync(sessionPath)) return false;

    const stats = fs.statSync(sessionPath);
    const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
    return ageHours < maxAgeHours;
  }

  public async saveSession(context: BrowserContext, accountName: string): Promise<void> {
    const sessionPath = this.getSessionPath(accountName);
    await context.storageState({ path: sessionPath });
    console.log(`[SessionManager] Authenticated session saved to: ${sessionPath}`);
  }
}
