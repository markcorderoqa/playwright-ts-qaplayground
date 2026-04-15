import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InputFieldsPracticePage extends BasePage {
  readonly movieNameInput: Locator;
  readonly appendInput: Locator;
  readonly verifyTextInput: Locator;
  readonly clearTextInput: Locator;
  readonly disabledInput: Locator;
  readonly readonlyInput: Locator;

  constructor(page: Page) {
    super(page);
    this.movieNameInput = page.getByTestId('input-movie-name');
    this.appendInput = page.getByTestId('input-append-text');
    this.verifyTextInput = page.getByTestId('input-verify-text');
    this.clearTextInput = page.getByTestId('input-clear-text');
    this.disabledInput = page.getByTestId('input-disabled');
    this.readonlyInput = page.getByTestId('input-readonly');
  }

  async assertMovieNameInputVisible(): Promise<void> {
    await expect(this.movieNameInput).toBeVisible();
  }

  async fillMovieNameInput(movieName: string): Promise<void> {
    await this.movieNameInput.fill(movieName);
  }

  async getMovieNameInputValue(): Promise<string> {
    return this.movieNameInput.inputValue();
  }

  async assertMovieNameInputValue(movieInputFieldValue: string, expectedValue: string): Promise<void> {
    expect(movieInputFieldValue).toBe(expectedValue);
  }

  async assertMovieNameInputPlaceholderVisible(): Promise<void> {
    await expect(this.movieNameInput).toHaveAttribute('placeholder', 'Enter hollywood movie name');
  }

  async assertMovieNameInputPlaceholderNotVisible(): Promise<void> {
    await expect(this.movieNameInput).not.toContainText('Enter hollywood movie name');
  }

  async assertAppendInputVisible(): Promise<void> {
    await expect(this.appendInput).toBeVisible();
  }

  async clickAppendInput(): Promise<void> {
    await this.appendInput.click();
  }

  async getAppendInputValue(): Promise<string> {
    return await this.appendInput.inputValue();
  }

  async appendTextToAppendInput(text: string): Promise<void> {
    await this.appendInput.press('End');
    await this.page.keyboard.type(text);
  }

  async pressTabKey(): Promise<void> {
    await this.appendInput.press('Tab');
  }

  async assertFocusHasShiftedToNextFocusableElement(): Promise<void> {
    await expect(this.verifyTextInput).toBeFocused();
  }

  async assertAppendedTextRetainedInField(existingValue: string, appendedValue: string): Promise<void> {
    expect(await this.appendInput.inputValue()).toBe(`${existingValue}${appendedValue}`);
  }

  async getVerifyTextInputValue(): Promise<string> {
    return await this.verifyTextInput.inputValue();
  }

  async assertVerifyTextInputValue(verifyTextInputValue: string, expectedValue: string): Promise<void> {
    expect(verifyTextInputValue).toBe(expectedValue);
  }

  async getVerifyTextInputAttributeValue(attribute: string): Promise<string> {
    const attributeValue = await this.verifyTextInput.getAttribute(attribute);
    if (attributeValue === null) {
      throw new Error(`Attribute "${attribute}" was not found on verify text input.`);
    }
    return attributeValue;
  }

  async assertVerifyTextInputAttributeValue(attribute: string, expectedValue: string): Promise<void> {
    expect(await this.verifyTextInput.getAttribute(attribute)).toBe(expectedValue);
  }

  async assertClearTextInputVisible(): Promise<void> {
    await expect(this.clearTextInput).toBeVisible();
  }

  async assertClearTextInputValue(value: string): Promise<void> {
    expect(await this.clearTextInput.inputValue()).toBe(value);
  }

  async fillClearTextInput(value: string): Promise<void> {
    await this.clearTextInput.fill(value);
  }

  async assertClearTextInputValueIsEmpty(): Promise<void> {
    expect(await this.clearTextInput.inputValue()).toBe('');
  }

  async getClearTextInputAttributeValue(attribute: string): Promise<string> {
    const attributeValue = await this.clearTextInput.getAttribute(attribute);
    if (attributeValue === null) {
      throw new Error(`Attribute "${attribute}" was not found on clear text input.`);
    }
    return attributeValue;
  }

  async assertDisabledInputVisible(): Promise<void> {
    await expect(this.disabledInput).toBeVisible();
  }

  async assertDisabledInputAttributeValue(): Promise<void> {
    await expect(this.disabledInput).toBeDisabled();
  }

  async fillDisabledTextInput(value: string): Promise<void> {
    await expect(this.disabledInput.fill(value)).rejects.toThrow(/not enabled|disabled/i);
  }

  async assertDisabledTextInputValue(value: string): Promise<void> {
    expect(await this.disabledInput.inputValue()).toBe(value);
  }

  async isEnabledDisabledInput(): Promise<boolean> {
    return await this.disabledInput.isEnabled();
  }

  async assertDisabledInputIsEnabled(isEnabled: boolean): Promise<void> {
    expect(await this.disabledInput.isEnabled()).toBe(isEnabled);
  }

  async assertReadonlyInputVisible(): Promise<void> {
    await expect(this.readonlyInput).toBeVisible();
  }

  async fillReadonlyTextInput(value: string): Promise<void> {
    await expect(this.readonlyInput.fill(value)).rejects.toThrow(/readonly/i);
  }

  async assertReadonlyTextInputValue(value: string): Promise<void> {
    expect(await this.readonlyInput.inputValue()).toBe(value);
  }

  async getReadonlyTextInputAttributeValue(attribute: string): Promise<string> {
    const attributeValue = await this.readonlyInput.getAttribute(attribute);
    if (attributeValue === null) {
      throw new Error(`Attribute "${attribute}" was not found on readonly text input.`);
    }
    return attributeValue;
  }

  async assertReadonlyTextInputAttributeValue(attribute: string, expectedValue: string): Promise<void> {
    await this.assertAttributeValue(this.readonlyInput, attribute, expectedValue, 'readonly text input', {
      allowBooleanTrueAsEmpty: true,
    });
  }
}
