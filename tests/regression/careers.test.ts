import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { SpellChecker } from "../../spellcheck";
import { CareersPage } from "../../pages/career-page";

test.describe('Careers Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const careersPage = new CareersPage(page);
    await careersPage.navigateToUrl();
    await careersPage.acceptCookies();
  })
  test('Should perform a spell check on the Homepage', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page, KainosWords);
      await expect(misspelledWords.length).toEqual(0);
    });
});