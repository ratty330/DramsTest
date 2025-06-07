import { Locator, Page } from "playwright-core";
import { ErrorComponent } from "./ErrorComponent";
import { expect } from "@playwright/test";

export abstract class FormComponent {
  readonly page: Page;
  readonly locatorForm: Locator;
  readonly locatorSubmitButton: Locator;
  readonly errorComponent: ErrorComponent;

  constructor(page: Page, errorMessagePrefix = 'Epic sadface:'){
    this.page = page;
    this.errorComponent = new ErrorComponent(this.page, errorMessagePrefix);

    this.locatorForm = this.page.locator('form');
    this.locatorSubmitButton = this.locatorForm.locator('input[type=submit]');
  }

  abstract fill(data: any);

  submit = async () => {
    await this.locatorSubmitButton.click();
  }
  
  /**
   * When form is invalid, at least one input field should have error styles and a error icon
   * ```html
   *    <input class="error">
   *    <svg class="error_icon"/>
   *  ```
   */
  async validateErrorLayout(){
    await expect(this.locatorForm).toBeVisible();
    await expect(this.locatorForm.locator('input:not([type=submit]).error')).not.toHaveCount(0);
    await expect(this.locatorForm.locator('svg.error_icon')).not.toHaveCount(0);
    await expect(this.locatorSubmitButton).toBeVisible();
  
    await this.errorComponent.isVisible();
  }

  /**
   * When form is valid, no input field should have error styles not error icon
   */
  async validateDefaultLayout() {
    await expect(this.locatorForm).toBeVisible();
    await expect(this.locatorForm.locator('input:not([type=submit]).error')).toHaveCount(0);
    await expect(this.locatorForm.locator('svg.error_icon')).toHaveCount(0);
    await this.errorComponent.isNotVisible();
    await expect(this.locatorSubmitButton).toBeVisible();
  }
}