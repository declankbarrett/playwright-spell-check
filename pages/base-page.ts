import { Page } from "playwright";

export abstract class BasePage {
  readonly page:Page;
  protected abstract path: string; 
  readonly baseUrl: string;
  protected abstract acceptCookiesButton: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'https://www.kainos.com';
  }

  async navigateToUrl(){
    await this.page.goto(this.baseUrl + this.path);
  }

  async acceptCookies(){
    await this.page.click(this.acceptCookiesButton);
  }
}
