import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { WorkdayPage } from "../../pages/workday-page";
import { SpellChecker } from "../../utils/spellcheck";

test.describe('Workday Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const workdayPage = new WorkdayPage(page);
    await workdayPage.navigateToUrl();
    await workdayPage.acceptCookies();
  })
  test('Should perform a spell check on the workday page', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page);
      await expect(misspelledWords.length).toEqual(0);
    });
});