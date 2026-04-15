import { test as base, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/header.component';
import { HomePage } from '@pages/home.page';
import { PracticePage } from '@pages/practice.page';
import { InputFieldsPracticePage } from '@pages/input-fields-practice.page';

type Fixtures = {
  homePage: HomePage;
  headerComponent: HeaderComponent;
  practicePage: PracticePage;
  inputFieldsPracticePage: InputFieldsPracticePage;
  freshContextPage: Page;
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

  freshContextPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';