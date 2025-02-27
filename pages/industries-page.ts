import { Page } from "playwright";
import { BasePage } from "./base-page";

export class IndustriesPage extends BasePage{
  readonly path:string;
  readonly acceptCookiesButton: string;

  constructor(page: Page) {
    super(page);
    this.path = '/industries';
    this.acceptCookiesButton = '#ccc-recommended-settings';
  }
}
