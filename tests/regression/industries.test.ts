import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { SpellChecker } from "../../spellcheck";
import { IndustriesPage } from "../../pages/industries-page";

test.describe('Industries Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const industriesPage = new IndustriesPage(page);
    await industriesPage.navigateToUrl();
    await industriesPage.acceptCookies();
  })
  test('Should perform a spell check on the Homepage', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page, KainosWords);
      await expect(misspelledWords.length).toEqual(0);
    });
});