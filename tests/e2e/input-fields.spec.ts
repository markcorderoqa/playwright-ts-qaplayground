import { test, expect } from '@fixtures/test.fixture';

test.describe('Input Field Practice', () => {
    test('TC01: Verify successful movie name input', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        let movieName = 'Inception';
        let inputFieldValue = '';

        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();

        });

        await test.step("Locate the movie name input using data-testid='input-movie-name'", async () => {
            await inputFieldsPracticePage.assertMovieNameInputVisible();
        });

        await test.step("Type a valid movie name e.g. 'Inception' using fill()", async () => {
            await inputFieldsPracticePage.fillMovieNameInput(movieName);
        });

        await test.step("Read the input value using inputValue()", async () => {
            inputFieldValue = await inputFieldsPracticePage.getMovieNameInputValue();
        });

        await test.step("Assert the returned value equals 'Inception'", async () => {
            await inputFieldsPracticePage.assertMovieNameInputValue(inputFieldValue, 'Inception');
        });
    });

    test('TC02: Verify input placeholder disappears on typing', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });

        await test.step("Locate the movie name input using data-testid='input-movie-name'", async () => {
            await inputFieldsPracticePage.assertMovieNameInputVisible();
        });

        await test.step("Verify placeholder text 'Enter hollywood movie name' is visible", async () => {
            await inputFieldsPracticePage.assertMovieNameInputPlaceholderVisible();
        });

        await test.step('Type any text into the input field', async () => {
            await inputFieldsPracticePage.fillMovieNameInput('Inception');
        });

        await test.step('Assert the placeholder text is no longer visible', async () => {
            await inputFieldsPracticePage.assertMovieNameInputPlaceholderNotVisible();
        });
    });

    test('TC03: Verify keyboard tab triggers focus change after append', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });

        await test.step("Locate the append input using data-testid='input-append-text'", async () => {
            await inputFieldsPracticePage.assertAppendInputVisible();
        });

        await test.step('Click the input to focus it', async () => {
            await inputFieldsPracticePage.clickAppendInput();
        });

        await test.step("Append text to the existing value 'I am good'", async () => {
            await inputFieldsPracticePage.appendTextToAppendInput(' and you?');
        });

        await test.step("Press Tab using Keys.TAB (Selenium) or press('Tab') (Playwright)", async () => {
            await inputFieldsPracticePage.pressTabKey();
        });

        await test.step('Verify focus has shifted to the next focusable element', async () => {
            await inputFieldsPracticePage.assertFocusHasShiftedToNextFocusableElement();
        });

    });

    test('TC04: Verify appended text value is retained in the field', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        let appendInputValue = '';

        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });

        await test.step("Locate the append input using data-testid='input-append-text'", async () => {
            await inputFieldsPracticePage.assertAppendInputVisible();
        });

        await test.step("Note the existing value 'I am good'", async () => {
            appendInputValue = await inputFieldsPracticePage.getAppendInputValue();
        });

        await test.step('Append additional text to the input', async () => {
            await inputFieldsPracticePage.appendTextToAppendInput(' and you?');
        });

        await test.step('Assert the input value contains both the original and appended text', async () => {
            await inputFieldsPracticePage.assertAppendedTextRetainedInField(appendInputValue, ' and you?');
        });
    });

    test('TC05: Verify text present inside input field matches expected value', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        let verifyTextInputValue = '';
        
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });
        
        await test.step("Locate the verify text input using data-testid='input-verify-text''", async () => {
            await inputFieldsPracticePage.assertAppendInputVisible();
        });

        await test.step('Read the current value of the input field', async () => {
            verifyTextInputValue = await inputFieldsPracticePage.getVerifyTextInputValue();
        });

        await test.step("Assert the value equals 'QA PlayGround'", async () => {
            await inputFieldsPracticePage.assertVerifyTextInputValue(verifyTextInputValue, 'QA PlayGround');
        });
    });

    test('TC06: Verify getAttribute returns the correct input value', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });
        
        await test.step("Locate the verify text input using data-testid='input-verify-text''", async () => {
            await inputFieldsPracticePage.assertAppendInputVisible();
        });

        await test.step("Call getAttribute('value') on the input element", async () => {
            await inputFieldsPracticePage.getVerifyTextInputAttributeValue('value');
        });

        await test.step("Assert the returned string equals 'QA PlayGround'", async () => {
            await inputFieldsPracticePage.assertVerifyTextInputAttributeValue('value', 'QA PlayGround');
        });
    });

    test('TC07: Verify input field text can be cleared successfully', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });

        await test.step("Locate the clear text input using data-testid='input-clear-text'", async () => {
            await inputFieldsPracticePage.assertClearTextInputVisible();
        });

        await test.step("Verify the input contains the value 'QA PlayGround Clear Me'", async () => {
            await inputFieldsPracticePage.assertClearTextInputValue('QA PlayGround Clear Me');
        });
        
        await test.step("Call fill('') on the input", async () => {
            await inputFieldsPracticePage.fillClearTextInput('');
        });

        await test.step('Assert the input field is now empty', async () => {
            await inputFieldsPracticePage.assertClearTextInputValueIsEmpty();
        });
    });

    test('TC08: Verify field is empty after executing clear action', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });

        await test.step("Locate the clear text input using data-testid='input-clear-text'", async () => {
            await inputFieldsPracticePage.assertClearTextInputVisible();
        });

        await test.step("Execute clear action on the input field", async () => {
            await inputFieldsPracticePage.fillClearTextInput('');
        });

        await test.step("Assert getAttribute('value') returns an empty string", async () => {
            expect(await inputFieldsPracticePage.getClearTextInputAttributeValue('value')).toBe('');
        });
    });

    test('TC09: Verify disabled input field cannot be edited by user', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });
        
        await test.step("Locate the disabled input using data-testid='input-disabled'", async () => {
            await inputFieldsPracticePage.assertDisabledInputVisible();
        });

        await test.step("Verify the input element has the disabled attribute", async () => {
            await inputFieldsPracticePage.assertDisabledInputAttributeValue();
        });

        await test.step("Attempt to type text in the disabled field", async () => {
            await inputFieldsPracticePage.fillDisabledTextInput('Test');
        });

        await test.step("Assert the value remains 'Enter' unchanged", async () => {
            await inputFieldsPracticePage.assertDisabledTextInputValue('Enter');
        });
    });

    test('TC10: Verify isEnabled() returns false for disabled input', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        let isEnabled: boolean;
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });
        
        await test.step("Locate the disabled input using data-testid='input-disabled'", async () => {
            await inputFieldsPracticePage.assertDisabledInputVisible();
        });

        await test.step('Call isEnabled() on the input element', async () => {
            isEnabled = await inputFieldsPracticePage.isEnabledDisabledInput();
        });

        await test.step("Assert isEnabled() returns false", async () => {
            await inputFieldsPracticePage.assertDisabledInputIsEnabled(isEnabled);
        });
    });

    test('TC11: Verify disabled input field cannot be edited by user', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });

        await test.step("Locate the readonly input using data-testid='input-readonly'", async () => {
            await inputFieldsPracticePage.assertReadonlyInputVisible();
        });
        
        await test.step("Attempt to type text into the readonly field", async () => {
            await inputFieldsPracticePage.fillReadonlyTextInput('Test');
        });

        await test.step("Assert the value remains 'This text is readonly' unchanged", async () => {
            await inputFieldsPracticePage.assertReadonlyTextInputValue('This text is readonly');
        });
    });

    test('TC12: Verify getAttribute returns correct readonly attribute value', async ({ practicePage, homePage, headerComponent, inputFieldsPracticePage }) => {
        await test.step('Open browser and navigate to /practice/input-fields', async () => {
            await homePage.visit();
            await headerComponent.assertVisible();
            await headerComponent.openPracticeElements();
            await practicePage.clickInputFieldsPracticeNowButton();
        });
        
        await test.step("Locate the readonly input using data-testid='input-readonly'", async () => {
            await inputFieldsPracticePage.assertReadonlyInputVisible();
        });

        await test.step("Call getAttribute('readonly') on the input element", async () => {
            await inputFieldsPracticePage.getReadonlyTextInputAttributeValue('readonly');
        });

        await test.step("Assert the attribute is present on the element", async () => {
            await inputFieldsPracticePage.assertReadonlyTextInputAttributeValue('readonly', 'true');
        });
    });

    test('Browser Context: Sample test using a fresh browser context', async ({ freshContextPage }) => {
        await test.step('Open input fields page with a manually created context page', async () => {
            await freshContextPage.goto('/practice/input-fields');
        });

        await test.step("Assert movie name input is visible in the fresh context", async () => {
            await expect(freshContextPage.getByTestId('input-movie-name')).toBeVisible();
        });
    });

    test('Browser Context: Two independent contexts at the same time', async ({ browser }) => {
        const userAContext = await browser.newContext();
        const userBContext = await browser.newContext();

        try {
            const userAPage = await userAContext.newPage();
            const userBPage = await userBContext.newPage();

            await test.step('Open input fields page in both contexts in parallel', async () => {
                await Promise.all([
                    userAPage.goto('/practice/input-fields'),
                    userBPage.goto('/practice/input-fields'),
                ]);
            });

            await test.step('Verify movie input is visible for both independent sessions', async () => {
                await Promise.all([
                    expect(userAPage.getByTestId('input-movie-name')).toBeVisible(),
                    expect(userBPage.getByTestId('input-movie-name')).toBeVisible(),
                ]);
            });

            await test.step('Type different values to prove context isolation', async () => {
                await Promise.all([
                    userAPage.getByTestId('input-movie-name').fill('Inception'),
                    userBPage.getByTestId('input-movie-name').fill('Interstellar'),
                ]);
            });

            await test.step('Assert each context keeps its own independent value', async () => {
                await expect(userAPage.getByTestId('input-movie-name')).toHaveValue('Inception');
                await expect(userBPage.getByTestId('input-movie-name')).toHaveValue('Interstellar');
            });
        } finally {
            await Promise.all([userAContext.close(), userBContext.close()]);
        }
    });

    test('Browser Tabs: Open new tab and perform tab actions', async ({ browser }) => {
        const context = await browser.newContext();

        try {
            const firstTab = await context.newPage();
            await firstTab.goto('/practice/input-fields');

            await test.step('Open a second tab in the same browser context', async () => {
                const secondTab = await context.newPage();
                await secondTab.goto('/practice/input-fields');

                await test.step('Switch to second tab and type a value', async () => {
                    await secondTab.bringToFront();
                    await secondTab.getByTestId('input-movie-name').fill('Second Tab Value');
                    await expect(secondTab.getByTestId('input-movie-name')).toHaveValue('Second Tab Value');
                });

                await test.step('Switch back to first tab and type a different value', async () => {
                    await firstTab.bringToFront();
                    await firstTab.getByTestId('input-movie-name').fill('First Tab Value');
                    await expect(firstTab.getByTestId('input-movie-name')).toHaveValue('First Tab Value');
                });

                await test.step('Close the second tab and continue on first tab', async () => {
                    await secondTab.close();
                    await expect(firstTab.getByTestId('input-movie-name')).toHaveValue('First Tab Value');
                });
            });
        } finally {
            await context.close();
        }
    });
});