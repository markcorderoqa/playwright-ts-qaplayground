import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  protected async assertAttributeValue(
    locator: Locator,
    attribute: string,
    expectedValue: string,
    elementName: string,
    options?: { allowBooleanTrueAsEmpty?: boolean },
  ): Promise<void> {
    const actualValue = await locator.getAttribute(attribute);
    if (actualValue === null) {
      throw new Error(`Attribute "${attribute}" was not found on ${elementName}.`);
    }

    const shouldAllowEmptyForBooleanTrue = options?.allowBooleanTrueAsEmpty && expectedValue === 'true';
    if (shouldAllowEmptyForBooleanTrue && actualValue === '') {
      return;
    }

    expect(actualValue).toBe(expectedValue);
  }
}
