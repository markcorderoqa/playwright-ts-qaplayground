import { test as base, type BrowserContext, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/header.component';
import { HomePage } from '@pages/home.page';
import { PracticePage } from '@pages/practice.page';
import { InputFieldsPracticePage } from '@pages/input-fields-practice.page';
import { ButtonsPracticePage } from '@pages/buttons-practice.page';

type AuthStorageStateByUser = Record<string, string>;

type AuthSession = {
  userKey: string;
  context: BrowserContext;
  page: Page;
};

type Fixtures = {
  homePage: HomePage;
  headerComponent: HeaderComponent;
  practicePage: PracticePage;
  inputFieldsPracticePage: InputFieldsPracticePage;
  buttonsPracticePage: ButtonsPracticePage;
  
  freshContextPage: Page;
  adminPage: Page;
  managerPage: Page;
  memberPage: Page;
  member1Page: Page;
  member2Page: Page;
  authStorageStateByUser: AuthStorageStateByUser;
  createAuthenticatedSession: (userKey: string, storageStatePathOverride?: string) => Promise<AuthSession>;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  },
  
  practicePage: async ({ page }, use) => {
    const practicePage = new PracticePage(page);
    await use(practicePage);
  },

  inputFieldsPracticePage: async ({ page }, use) => {
    const inputFieldsPracticePage = new InputFieldsPracticePage(page);
    await use(inputFieldsPracticePage);
  },

  buttonsPracticePage: async ({ page }, use) => {
    const buttonsPracticePage = new ButtonsPracticePage(page);
    await use(buttonsPracticePage);
  },

  /**Fresh Context Page
   * This is a page that is used to test the browser context isolation.
   * It is used to test the browser context isolation by creating a new page in a new browser context.
  */
  freshContextPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  /** Auth Storage State By User
   * This is a fixture that is used to create an authenticated session.
   * It is used to create an authenticated session by creating a new browser context and a new page in the browser context.
  */
  authStorageStateByUser: [
    {
      admin: 'playwright/.auth/admin.json',
      manager: 'playwright/.auth/manager.json',
      member: 'playwright/.auth/member.json',
      member1: 'playwright/.auth/member1.json',
      member2: 'playwright/.auth/member2.json',
    },
    { option: true },
  ],

  /** Create Authenticated Session
   * This is a fixture that is used to create an authenticated session.
   * It is used to create an authenticated session by creating a new browser context and a new page in the browser context.
  */
  createAuthenticatedSession: async ({ browser, authStorageStateByUser }, use) => {
    const contexts: BrowserContext[] = [];

    await use(async (userKey: string, storageStatePathOverride?: string) => {
      const storageState = storageStatePathOverride ?? authStorageStateByUser[userKey];
      if (!storageState) {
        throw new Error(
          `No storage state configured for user "${userKey}". Configure test.use({ authStorageStateByUser: { ${userKey}: 'path/to/storage-state.json' } }) or pass an override path.`,
        );
      }

      const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        storageState,
      });
      contexts.push(context);

      const page = await context.newPage();
      return { userKey, context, page };
    });

    await Promise.all(contexts.map((context) => context.close()));
  },

  /** User Pages
   * This is a page that is used to test the user page.
   * It is used to test the user page by creating a new page in a new browser context.
  */
  adminPage: async ({ createAuthenticatedSession }, use) => {
    const { page } = await createAuthenticatedSession('admin');
    await use(page);
  },

  managerPage: async ({ createAuthenticatedSession }, use) => {
    const { page } = await createAuthenticatedSession('manager');
    await use(page);
  },

  memberPage: async ({ createAuthenticatedSession }, use) => {
    const { page } = await createAuthenticatedSession('member');
    await use(page);
  },

  member1Page: async ({ createAuthenticatedSession }, use) => {
    const { page } = await createAuthenticatedSession('member1');
    await use(page);
  },

  member2Page: async ({ createAuthenticatedSession }, use) => {
    const { page } = await createAuthenticatedSession('member2');
    await use(page);
  },
});

export { expect } from '@playwright/test';