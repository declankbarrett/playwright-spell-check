import { Page } from "playwright";
import { BasePage } from "./base-page";

export class InsightsPage extends BasePage{
  readonly path:string;
  readonly acceptCookiesButton: string;

  constructor(page: Page) {
    super(page);
    this.path = '/insights';
    this.acceptCookiesButton = '#ccc-recommended-settings';
  }
}
