import { Page } from "playwright-core";
import { BasePage } from "./BasePage";
import { Locator, expect } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";

export class CheckoutCompletePage extends BasePage{
  
  readonly locatorHeaderTitle: Locator;
  readonly locatorCheckoutImg: Locator;
  readonly locatorHeading: Locator;
  readonly locatorDescription: Locator;
  readonly locatorHomeButton: Locator;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page, "/checkout-complete");    

    this.header = new HeaderComponent(this.page);
    this.footer = new FooterComponent(this.page);

    this.locatorHeaderTitle = this.page.locator('#header_container').getByText('Checkout: Complete!');
    this.locatorCheckoutImg = this.page.getByRole('img', { name: 'Pony Express' });
    this.locatorHeading = this.page.getByRole('heading', { name: 'Thank you for your order!' });
    this.locatorDescription = this.page.getByText('Your order has been');
    this.locatorHomeButton = this.page.getByRole('button', {name: 'Back Home'});
  }
  
  validateDefaultLayout = async () => {
    await expect(this.locatorCheckoutImg).toBeVisible();
    await expect(this.locatorHeading).toBeVisible();
    await expect(this.locatorDescription).toBeVisible();
    await expect(this.locatorHomeButton).toBeVisible();

    await this.footer.validateDefaultLayout();
    await this.header.validateDefaultLayout();
  }

  backHome = async () => {
    this.locatorHomeButton.click();
    this.page.waitForLoadState('networkidle');
  }
}