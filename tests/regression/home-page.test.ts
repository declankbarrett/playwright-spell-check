import test, { expect } from "playwright/test";
import { HomePage } from "../../pages/home-page";
import { SpellChecker } from "../../spellcheck";
import { KainosWords } from "../../utils/kainos-specific-words";

test.describe('Kainos Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToUrl();
    await homePage.acceptCookies();
  })
  test('Should perform a spell check on the Homepage', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page, KainosWords);
      await expect(misspelledWords.length).toEqual(0);
    });
});