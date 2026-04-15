import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '@components/header.component';
import { BasePage } from './base.page';

export class PracticePage extends BasePage {
  readonly header: HeaderComponent;
  readonly inputFieldsCard: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.inputFieldsCard = page.getByTestId('card-link-input-fields');
  }

  async assertInputFieldsCardVisible(): Promise<void> {
    await expect(this.inputFieldsCard).toBeVisible();
  }

  async clickInputFieldsPracticeNowButton(): Promise<void> {
    await this.inputFieldsCard.click();
  }
}