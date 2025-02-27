import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { IndustriesPage } from "../../pages/industries-page";
import { SpellChecker } from "../../utils/spellcheck";

test.describe('Industries Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const industriesPage = new IndustriesPage(page);
    await industriesPage.navigateToUrl();
    await industriesPage.acceptCookies();
  })
  test('Should perform a spell check on the industries page', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page);
      await expect(misspelledWords.length).toEqual(0);
    });
});