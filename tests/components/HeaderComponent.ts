import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class HeaderComponent {
  readonly page: Page;
  readonly locatorHeading: Locator;
  readonly locatorCartLink: Locator;

  constructor(page: Page){
    this.page = page;

    this.locatorHeading = this.page.locator('#header_container').locator('.app_logo', { hasText: 'Swag Labs'});
    this.locatorCartLink = this.page.locator('#shopping_cart_container a');
  }

  validateDefaultLayout = async () => {
    await expect(this.locatorHeading).toBeVisible();
    await expect(this.locatorCartLink).toBeVisible();
  }

  visitCart = async () => {
    await this.locatorCartLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}