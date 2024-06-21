import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { SpellChecker } from "../../spellcheck";
import { DigitalServicePage } from "../../pages/digital-services-page";

test.describe('Digital Service Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const digitalServicePage = new DigitalServicePage(page);
    await digitalServicePage.navigateToUrl();
    await digitalServicePage.acceptCookies();
  })
  test('Should perform a spell check on the digital-services page', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page, KainosWords);
      await expect(misspelledWords.length).toEqual(0);
    });
});