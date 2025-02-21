const HunspellSpellchecker = require('hunspell-spellchecker');
import fs from "fs";
import path from 'path';
import { Page } from "playwright";
import { KainosWords } from "./kainos-specific-words"; // Import additional words

export class SpellChecker {
  private words: string[];
  private pageContent: string;
  private spellchecker = new HunspellSpellchecker();
  private additionalWords: Set<string>; // Use a Set for faster lookups

  constructor() {
    this.additionalWords = new Set(KainosWords); // Load additional words once
  }

  // Function to check the spelling of the page content
  async spellCheck(page: Page): Promise<string[]> {
    await this.getPageContent(page);
    await this.spellcheckSetup();
    this.words = await this.formatPageContent(this.pageContent);

    // Check each word for spelling errors
    const misspelledWords = this.words.filter(
      word => !this.spellchecker.check(word) && !this.additionalWords.has(word)
    );

    // Output misspelled words
    if (misspelledWords.length > 0) {
      console.log('Misspelled words:', misspelledWords);
    } else {
      console.log('No misspelled words found.');
    }

    return misspelledWords;
  }

  // Gathers the page content in the body of the DOM
  private async getPageContent(page: Page): Promise<string> {
    this.pageContent = await page.evaluate(() => document.body.innerText);
    return this.pageContent;
  }

  // Returns an array of strings for the page content
  private async formatPageContent(input: string): Promise<string[]> {
    // Remove numbers and replace punctuation with spaces (except for valid apostrophes)
    const withoutNumbers = input.replace(/\d+/g, '');
    const processedString = withoutNumbers.replace(
      /([a-zA-Z])['’]([a-zA-Z])|[^\w\s]/g,
      (match, p1, p2) => (p1 && p2 ? `${p1}'${p2}` : ' ')
    );

    // Split the processed string into an array of words
    return processedString.split(/\s+/).filter(word => word.length > 0);
  }

  // Loads the dictionary into memory for spellchecking
  private async spellcheckSetup(): Promise<void> {
    const DICT_PATH = path.join(__dirname, '../node_modules', 'dictionary-en-gb');
    const DICT_AFF = fs.readFileSync(path.join(DICT_PATH, 'index.aff'));
    const DICT_DIC = fs.readFileSync(path.join(DICT_PATH, 'index.dic'));
    const dict = this.spellchecker.parse({ aff: DICT_AFF, dic: DICT_DIC });
    this.spellchecker.use(dict);
  }
}
