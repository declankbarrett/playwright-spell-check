import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { CareersPage } from "../../pages/career-page";
import { SpellChecker } from "../../utils/spellcheck";

test.describe('Careers Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.navigateToUrl();
    await careersPage.acceptCookies();
  })
  test('Should perform a spell check on the Careers', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page);
      await expect(misspelledWords.length).toEqual(0);
    });
});