import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ButtonsPracticePage extends BasePage {
    readonly goToHomeButton: Locator;
    readonly doubleClickButton: Locator;
    readonly btnActionResult: Locator;
    readonly rightClickButton: Locator;
    readonly disabledButton: Locator;
    readonly clickAndHoldButton: Locator;

    constructor(page: Page) {
        super(page);
        this.goToHomeButton = page.getByTestId('btn-goto-home');
        this.doubleClickButton = page.getByTestId('btn-double-click');
        this.rightClickButton = page.getByTestId('btn-right-click');
        this.disabledButton = page.getByTestId('btn-disabled');
        this.btnActionResult = page.getByTestId('btn-action-result');
        this.clickAndHoldButton = page.getByTestId('btn-click-hold');
    }

    async assertGoToHomeButtonVisible(): Promise<void> {
        await expect(this.goToHomeButton).toBeVisible();
    }

    async clickGoToHomeButton(): Promise<void> {
        await this.goToHomeButton.click();
    }

    async getGoToHomeButtonText(): Promise<string> {
        const goToHomeButtonText = await this.goToHomeButton.textContent();
        if (goToHomeButtonText === null) {
            throw new Error('Go to Home button text is null.');
        }
        return goToHomeButtonText;
    }

    async assertGoToHomeButtonText(expectedText: string): Promise<void> {
        expect(await this.goToHomeButton.textContent()).toBe(expectedText);
    }

    async assertGoToHomeButtonAttributeValue(attribute: string, expectedValue: string): Promise<void> {
        await this.assertAttributeValue(this.goToHomeButton, attribute, expectedValue, 'Go to Home button', {
            allowBooleanTrueAsEmpty: true,
        });
    }

    async assertGoToHomeButtonEnabled(): Promise<void> {
        await expect(this.goToHomeButton).toBeEnabled();
    }

    async assertGoToHomeButtonNoAttribute(attribute: string): Promise<void> {
        await expect(this.goToHomeButton).not.toHaveAttribute(attribute);
    }

    async clickTabToGoToHomeButton(): Promise<void> {
        const maxTabPresses = 50;
        for (let i = 0; i < maxTabPresses; i++) {
            const isFocused = await this.goToHomeButton.evaluate((el) => el.ownerDocument.activeElement === el);
            if (isFocused) {
                return;
            }
            await this.page.keyboard.press('Tab');
        }
        throw new Error(`Go to Home button did not receive focus within ${maxTabPresses} Tab presses.`);
    }

    async assertGoToHomeButtonFocused(): Promise<void> {
        await expect(this.goToHomeButton).toBeFocused();
    }

    async pressEnterOrSpaceToActivateButton(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

    async assertDoubleClickButtonVisible(): Promise<void> {
        await expect(this.doubleClickButton).toBeVisible();
    }

    async doubleClickDoubleClickButton(): Promise<void> {
        await this.doubleClickButton.dblclick();
    }

    async assertDoubleClickButtonAttributeValue(attribute: string, expectedValue: string): Promise<void> {
        await this.assertAttributeValue(this.doubleClickButton, attribute, expectedValue, 'double click button', {
            allowBooleanTrueAsEmpty: true,
        });
    }

    async assertDoubleClickButtonHasRole(role: Parameters<Page['getByRole']>[0]): Promise<void> {
        await expect(this.doubleClickButton).toHaveRole(role);
    }

    async assertBtnActionResultVisible(): Promise<void> {
        await expect(this.btnActionResult).toBeVisible();
    }

    async assertBtnActionResultText(expectedText: string): Promise<void> {
        expect(await this.btnActionResult.textContent()).toBe(expectedText);
    }

    async assertRightClickButtonVisible(): Promise<void> {
        await expect(this.rightClickButton).toBeVisible();
    }

    async rightClickRightClickButton(): Promise<void> {
        await this.rightClickButton.click({ button: 'right' });
    }

    async assertDisabledButtonVisible(): Promise<void> {
        await expect(this.disabledButton).toBeVisible();
    }

    async assertDisabledButtonAttributeValue(attribute: string, expectedValue: string): Promise<void> {
        await this.assertAttributeValue(this.disabledButton, attribute, expectedValue, 'disabled button', {
            allowBooleanTrueAsEmpty: true,
        });
    }

    async clickDisabledButton(): Promise<void> {
        await expect(this.disabledButton.click()).rejects.toThrow(/not enabled|disabled/i);
    }

    async hoverOverDoubleClickButton(): Promise<void> {
        await this.doubleClickButton.hover();
    }

    async assertMousePointerChanges(): Promise<void> {
        await expect(this.doubleClickButton).toHaveCSS('cursor', 'pointer');
    }

    async assertClickAndHoldButtonVisible(): Promise<void> {
        await expect(this.clickAndHoldButton).toBeVisible();
    }

    async clickAndHoldClickAndHoldButton(): Promise<void> {
        await this.clickAndHoldButton.hover();
        await this.page.mouse.down();
        await expect(this.clickAndHoldButton).toHaveText('Hold Complete!');
        await this.page.mouse.up();
    }

    async assertClickAndHoldMessageAppears(expectedText: string): Promise<void> {
        await expect(this.clickAndHoldButton).toHaveText(expectedText);
    }

    async refreshPage(): Promise<void> {
        await this.page.reload();
    }
}