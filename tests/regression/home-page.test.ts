import test, { expect } from "playwright/test";
import { HomePage } from "../../pages/home-page";
import { KainosWords } from "../../utils/kainos-specific-words";
import { SpellChecker } from "../../utils/spellcheck";

test.describe('Kainos Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToUrl();
    await homePage.acceptCookies();
  })
  test('Should perform a spell check on the homepage', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page);
      await expect(misspelledWords.length).toEqual(0);
    });
});