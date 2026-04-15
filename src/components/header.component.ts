import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly logo: Locator;
  readonly homeMenuButton: Locator;
  readonly practiceMenuButton: Locator;

  constructor(private readonly page: Page) {
    this.logo = this.page.getByRole('link', { name: /QA PlayGround/i }).first();
    this.homeMenuButton = this.page.getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Home' });
    this.practiceMenuButton = this.page.getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Practice' });
  }

  async openPracticeElements(): Promise<void> {
    await this.practiceMenuButton.click();
  }

  async assertVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.practiceMenuButton).toBeVisible();
  }
}