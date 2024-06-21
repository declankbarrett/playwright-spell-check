import test, { expect } from "playwright/test";
import { KainosWords } from "../../utils/kainos-specific-words";
import { SpellChecker } from "../../spellcheck";
import { InsightsPage } from "../../pages/insights-page";

test.describe('Insights Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const insightsPage = new InsightsPage(page);
    await insightsPage.navigateToUrl();
    await insightsPage.acceptCookies();
  })
  test('Should perform a spell check on the insights page', async ({ page }) => {
    let spellchecker = new SpellChecker();
      let misspelledWords = await spellchecker.spellCheck(page, KainosWords);
      await expect(misspelledWords.length).toEqual(0);
    });
});