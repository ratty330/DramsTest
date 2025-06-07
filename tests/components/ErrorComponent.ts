import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";

export class ErrorComponent {
  readonly page: Page;
  readonly locatorMessage: Locator;
  readonly locatorDismissButton: Locator;
  errorMessagePrefix: string;

  constructor(page: Page, errorMessagePrefix = 'Epic sadface: '){
    this.page = page;
    this.errorMessagePrefix = errorMessagePrefix;
    this.locatorMessage = this.page.locator('[data-test=error]');
    this.locatorDismissButton = this.locatorMessage.getByRole('button');
  }

  dismiss = async () => {
    await this.locatorDismissButton.click();
  }

  isVisible = async () => {
    await expect(this.locatorDismissButton).toBeVisible();
    await expect(this.locatorDismissButton.locator('svg')).toBeVisible();
    await expect(this.locatorMessage).toBeVisible();
    await expect(this.locatorMessage).toContainText(this.errorMessagePrefix);
  }

  isNotVisible = async () => {
    await expect(this.locatorMessage).not.toBeVisible();
  }

  hasMessage = async (message: string) => {
    await expect(this.locatorMessage).toHaveText(`${this.errorMessagePrefix} ${message}`);
  }
}