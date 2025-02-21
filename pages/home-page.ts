import { Page } from "playwright";
import { BasePage } from "./base-page";

export class HomePage extends BasePage{
  readonly path:string;
  readonly acceptCookiesButton: string;

  constructor(page: Page) {
    super(page);
    this.path = '/';
    this.acceptCookiesButton = '#ccc-recommended-settings';
  }
}
