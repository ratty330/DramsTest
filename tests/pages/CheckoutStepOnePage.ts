import { Page } from "playwright-core";
import { BasePage } from "./BasePage";
import { CheckoutFormComponent } from "../components/CheckoutFormComponent";
import { Locator, expect } from "@playwright/test";

export class CheckoutStepOnePage extends BasePage{

  readonly form: CheckoutFormComponent;
  readonly locatorHeaderTitle: Locator;
  readonly locatorCancelButton: Locator;

  constructor(page: Page) {
    super(page, "/checkout-step-one");    

    this.locatorHeaderTitle = this.page.locator('#header_container').getByText('Checkout: Your Information');
    this.locatorCancelButton = this.page.getByRole('button', {name: 'Cancel'});
    this.form = new CheckoutFormComponent(this.page);
  }
  
  validateDefaultLayout = async () => {
    await expect(this.locatorHeaderTitle).toBeVisible();
    await expect(this.locatorCancelButton).toBeVisible();
    await this.form.validateDefaultLayout();
  }

  validateErrorLayout = async () => {
    await this.form.validateErrorLayout();
  }

  cancel = async () => {
    await this.locatorCancelButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}