/**
 * Example of a "Page Object Model"
 * More here: https://playwright.dev/docs/test-pom
 * */

import { Locator, Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly header: Locator;
  readonly mainContent: Locator;
  readonly contentfulTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("#nav-header");
    this.mainContent = page.locator("main");
    this.contentfulTitle = page.locator("main:nth-child(2) h2");
  }

  async goto() {
    await this.page.goto("/");
  }
}
