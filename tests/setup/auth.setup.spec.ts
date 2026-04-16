import path from 'node:path';
import { promises as fs } from 'node:fs';
import type { Browser } from '@playwright/test';
import { test, expect } from '@fixtures/test.fixture';
import { env } from '@config/env';

type AuthUser = {
  userKey: string;
  username: string;
  password: string;
};

function getConfiguredUsers(): AuthUser[] {
  const users: Array<AuthUser | null> = [
    env.AUTH_ADMIN_USERNAME && env.AUTH_ADMIN_PASSWORD
      ? { userKey: 'admin', username: env.AUTH_ADMIN_USERNAME, password: env.AUTH_ADMIN_PASSWORD }
      : null,
    env.AUTH_MANAGER_USERNAME && env.AUTH_MANAGER_PASSWORD
      ? { userKey: 'manager', username: env.AUTH_MANAGER_USERNAME, password: env.AUTH_MANAGER_PASSWORD }
      : null,
    env.AUTH_MEMBER_USERNAME && env.AUTH_MEMBER_PASSWORD
      ? { userKey: 'member', username: env.AUTH_MEMBER_USERNAME, password: env.AUTH_MEMBER_PASSWORD }
      : null,
    env.AUTH_MEMBER_1_USERNAME && env.AUTH_MEMBER_1_PASSWORD
      ? { userKey: 'member1', username: env.AUTH_MEMBER_1_USERNAME, password: env.AUTH_MEMBER_1_PASSWORD }
      : null,
    env.AUTH_MEMBER_2_USERNAME && env.AUTH_MEMBER_2_PASSWORD
      ? { userKey: 'member2', username: env.AUTH_MEMBER_2_USERNAME, password: env.AUTH_MEMBER_2_PASSWORD }
      : null,
  ];

  return users.filter((user): user is AuthUser => user !== null);
}

async function loginAndSaveStorageState(
  browser: Browser,
  user: AuthUser,
  storageStatePath: string,
): Promise<void> {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(new URL(env.AUTH_LOGIN_PATH, env.BASE_URL).toString());
  await page.locator(env.AUTH_USERNAME_SELECTOR).fill(user.username);
  await page.locator(env.AUTH_PASSWORD_SELECTOR).fill(user.password);
  await page.locator(env.AUTH_SUBMIT_SELECTOR).click();

  if (env.AUTH_POST_LOGIN_PATH) {
    await page.waitForURL(`**${env.AUTH_POST_LOGIN_PATH}`);
  } else {
    await page.waitForLoadState('networkidle');
  }

  await fs.mkdir(path.dirname(storageStatePath), { recursive: true });
  await context.storageState({ path: storageStatePath });
  await context.close();
}

test.describe('Authentication storage state bootstrap @auth-setup', () => {
  test('generates storageState files for configured users', async ({ authStorageStateByUser, browser }) => {
    const users = getConfiguredUsers();
    test.skip(
      users.length === 0,
      'No auth users configured. Set one or more AUTH_<ROLE>_USERNAME/PASSWORD entries in your .env file.',
    );

    for (const user of users) {
      const relativePath = authStorageStateByUser[user.userKey];
      expect(relativePath, `Missing authStorageStateByUser mapping for "${user.userKey}"`).toBeTruthy();
      if (!relativePath) {
        throw new Error(`Missing authStorageStateByUser mapping for "${user.userKey}"`);
      }

      const absolutePath = path.resolve(process.cwd(), relativePath);
      await loginAndSaveStorageState(browser, user, absolutePath);
      await expect(async () => fs.access(absolutePath)).toPass();
    }
  });
});
