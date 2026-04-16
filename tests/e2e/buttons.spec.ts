import { test } from '@fixtures/test.fixture';

test.describe('Buttons Practice', () => {
    test('TC01: Verify button is clickable and triggers action', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the primary button using data-testid or id', async () => {
            await buttonsPracticePage.assertGoToHomeButtonVisible();
        });

        await test.step('Click the button using click() or locator.click()', async () => {
            await buttonsPracticePage.clickGoToHomeButton();
        });

        await test.step('Assert the expected action or message appears after click', async () => {
            await homePage.assertLoaded();
        });
    });

    test('TC02: Verify button displays the correct label text', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the button element using data-testid or id', async () => {
            await buttonsPracticePage.assertGoToHomeButtonVisible();
        });

        await test.step('Read the button text using getText() or textContent()', async () => {
            await buttonsPracticePage.getGoToHomeButtonText();
        });

        await test.step('Assert the text matches the expected label"', async () => {
            await buttonsPracticePage.assertGoToHomeButtonText('Go To Home');
        });
    });

    test('TC03: Verify double-click button triggers double-click action', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the button element using data-testid or id', async () => {
            await buttonsPracticePage.assertDoubleClickButtonVisible();
        });

        await test.step('Perform a double-click using doubleClick() or dblclick()', async () => {
            await buttonsPracticePage.doubleClickDoubleClickButton();
        });

        await test.step('Assert the double-click message or state change appears', async () => {
            await buttonsPracticePage.assertBtnActionResultVisible();
            await buttonsPracticePage.assertBtnActionResultText("You Double-clicked on button!");
        });
    });

    test('TC04: Verify right-click button triggers context menu action', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the right-click button element using data-testid or id', async () => {
            await buttonsPracticePage.assertRightClickButtonVisible();
        });

        await test.step("Perform a right-click using contextClick() or click({button:'right'})", async () => {
            await buttonsPracticePage.rightClickRightClickButton();
        });

        await test.step('Assert the right-click feedback message appears', async () => {
            await buttonsPracticePage.assertBtnActionResultVisible();
            await buttonsPracticePage.assertBtnActionResultText("You Right-clicked on button!");
        });
    });

    test('TC05: Verify disabled button cannot be clicked', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the disabled button', async () => {
            await buttonsPracticePage.assertDisabledButtonVisible();
        });

        await test.step("Assert isEnabled() returns false (Selenium) or toBeDisabled() passes (Playwright)", async () => {
            await buttonsPracticePage.assertDisabledButtonAttributeValue('disabled', 'true');
        });

        await test.step('Attempt to click the button', async () => {
            await buttonsPracticePage.clickDisabledButton();
        });

        await test.step('Assert no action is triggered', async () => {
            await buttonsPracticePage.assertDisabledButtonAttributeValue('disabled', 'true');
        });
    });

    test('TC06: Verify button is enabled when it should be', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate an active button', async () => {
            await buttonsPracticePage.assertGoToHomeButtonVisible();
        });

        await test.step('Assert the button is enabled and can receive clicks', async () => {
            await buttonsPracticePage.assertGoToHomeButtonEnabled();
        });

        await test.step('Assert the button does not have the disabled attribute', async () => {
            await buttonsPracticePage.assertGoToHomeButtonNoAttribute('disabled');
        });
    });

    test('TC07: Verify button is accessible via keyboard', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Tab to the button element', async () => {
            await buttonsPracticePage.clickTabToGoToHomeButton();
        });

        await test.step('Press Enter or Space to activate the button', async () => {
            await buttonsPracticePage.pressEnterOrSpaceToActivateButton();
        });

        await test.step('Assert the button action fires correctly', async () => {
            await homePage.assertLoaded();
        });
    });

    test('TC08: Verify double click button is accessible to screen readers', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the go to home button', async () => {
            await buttonsPracticePage.assertDoubleClickButtonVisible();
        });

        await test.step('Assert go to home button has aria-label', async () => {
            await buttonsPracticePage.assertDoubleClickButtonAttributeValue('aria-label', 'Double Click Me');
        });

        await test.step('Assert role="button" is present or the element is a native button', async () => {
            await buttonsPracticePage.assertDoubleClickButtonHasRole('button');
        });
    });

    test('TC09: Verify button hover mouse pointer changes', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the go to home button', async () => {
            await buttonsPracticePage.assertDoubleClickButtonVisible();
        });

        await test.step('Hover over the button using Actions.moveToElement() or locator.hover()', async () => {
            await buttonsPracticePage.hoverOverDoubleClickButton();
        });

        await test.step('Assert the mouse pointer changes', async () => {
            await buttonsPracticePage.assertMousePointerChanges();
        });
    });

    test('TC10: Verify button click and hold triggers click and hold action', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the click and hold button', async () => {
            await buttonsPracticePage.assertClickAndHoldButtonVisible();
        });

        await test.step('Click and hold the button using clickAndHold() or mousedown()', async () => {
            await buttonsPracticePage.clickAndHoldClickAndHoldButton();
        });

        await test.step('Assert the click and hold message appears', async () => {
            await buttonsPracticePage.assertClickAndHoldMessageAppears('Hold Complete!');
        });
    });

    test('TC11: Verify button state resets after page refresh', async ({ practicePage, homePage, headerComponent, buttonsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/buttons', async () => {
            await homePage.visit();
            await homePage.assertLoaded();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickButtonsPracticeNowButton();
        });

        await test.step('Locate the click and hold button', async () => {
            await buttonsPracticePage.assertClickAndHoldButtonVisible();
        });

        await test.step('Click and hold the button using clickAndHold() or mousedown()', async () => {
            await buttonsPracticePage.clickAndHoldClickAndHoldButton();
        });

        await test.step('Assert the click and hold message appears', async () => {
            await buttonsPracticePage.assertClickAndHoldMessageAppears('Hold Complete!');
        });

        await test.step('Refresh the page', async () => {
            await buttonsPracticePage.refreshPage();
        });

        await test.step('Assert the click and hold message does not appear', async () => {
            await buttonsPracticePage.assertClickAndHoldMessageAppears('Click and Hold!');
        });
    });
});
