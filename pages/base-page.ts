
const HunspellSpellchecker = require('hunspell-spellchecker');
import { Page } from "playwright";

export class BasePage {
  readonly page:Page;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://www.kainos.com';
  }
}
