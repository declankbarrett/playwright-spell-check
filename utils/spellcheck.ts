const HunspellSpellchecker = require('hunspell-spellchecker');
import fs from "fs"
import path from 'path'
import { Page } from "playwright";

export class SpellChecker{
  private words:string[];
  private pageContent:string;
  private spellchecker = new HunspellSpellchecker();

// Function to check the spelling of the page content
  async spellCheck(page:Page, additionalWords:string[]){
    await this.getPageContent(page);
    await this.spellcheckSetup();
    this.words = await this.formatPageContent(this.pageContent);
    // Check each word for spelling errors
    const misspelledWords = this.words.filter(word => (!this.spellchecker.check(word)) !== ((additionalWords.indexOf(word) > -1)));
    // Output misspelled words
    if (misspelledWords.length > 0) {
      console.log('Misspelled words:', misspelledWords);
    } else {
      console.log('No misspelled words found.');
    }
    return misspelledWords;
  };

  // Gathers the page content in the body of the dom
  private async getPageContent(page){
    this.pageContent = await page.evaluate(() => {
      return document.body.innerText;
  
    });
    // Optional output to console to verify what has been picked up as "pageContent" in the event of mispelled word
    // *********** console.log(this.pageContent); *****************
    return this.pageContent;
  };

  // Returns an array of strings for the page content
  private async formatPageContent(input: string): Promise<string[]> {
    // Step 1: Replace all punctuation with a space, but keep ' if surrounded by letters
    const withoutNumbers = input.replace(/\d+/g, '');
    const processedString = withoutNumbers.replace(/([a-zA-Z])['’]([a-zA-Z])|[^\w\s]/g, (match, p1, p2) => {
        // If the match is ' surrounded by letters, return it as is
        if (p1 && p2) return `${p1}'${p2}`;
        // Otherwise, replace with a space
        return ' ';
    });

    // Step 2: Split the processed string into an array by spaces
    const resultArray = processedString.split(/\s+/).filter(word => word.length > 0);

    return resultArray;
  };

  // Loads the dictionary in to perform the spellcheck
  private async spellcheckSetup(){
    const DICT_PATH = path.join(__dirname, '../node_modules', 'dictionary-en-gb');
    const DICT_AFF = fs.readFileSync(path.join(DICT_PATH, 'index.aff'));
    const DICT_DIC = fs.readFileSync(path.join(DICT_PATH, 'index.dic'));
    const dict = this.spellchecker.parse({ aff: DICT_AFF, dic: DICT_DIC });
    this.spellchecker.use(dict);
  }
}


