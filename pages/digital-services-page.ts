import { Page } from "playwright";
import { BasePage } from "./base-page";

export class DigitalServicePage extends BasePage{
  readonly path:string;
  readonly acceptCookiesButton: string;

  constructor(page: Page) {
    super(page);
    this.path = '/digital-services';
    this.acceptCookiesButton = '#ccc-recommended-settings';
  }
}
