import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { DigitalServicePage } from "../../pages/digital-services-page";
import { SpellChecker } from "../../utils/spellcheck";

test.describe('Digital Service Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const digitalServicePage = new DigitalServicePage(page);
    await digitalServicePage.navigateToUrl();
    await digitalServicePage.acceptCookies();
  })
  test('Should perform a spell check on the digital-services page', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page);
      await expect(misspelledWords.length).toEqual(0);
    });
});