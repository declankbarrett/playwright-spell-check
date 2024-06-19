import { Page } from "playwright";
import { BasePage } from "./base-page";

export class CareersPage extends BasePage{
  readonly path:string;
  readonly acceptCookiesButton: string;

  constructor(page: Page) {
    super(page);
    this.path = '/careers';
    this.acceptCookiesButton = 'button:has-text("Allow")';
  }


  async navigateToUrl(){
    await this.page.goto(this.baseUrl + this.path);
  }

  async acceptCookies(){
    await this.page.click(this.acceptCookiesButton);
  }
  
}