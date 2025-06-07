import { Page } from "playwright-core";
import { BasePage } from "./BasePage";
import {CheckoutItemComponent} from "../components/CheckoutItemComponent";
import { Locator, expect } from "@playwright/test";
import { FooterComponent } from "../components/FooterComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { ICartProduct } from "../fixtures/models";

export class CheckoutStepTwoPage extends BasePage{

  readonly products: CheckoutItemComponent[];  
  readonly locatorHeaderTitle: Locator;
  readonly locatorQty: Locator;
  readonly locatorDescription: Locator;
  readonly locatorCancelButton: Locator;
  readonly locatorFinishButton: Locator; 
  readonly footer: FooterComponent;
  readonly header: HeaderComponent;
  readonly locatorPaymentInfoLabel: Locator;
  readonly locatorPaymentInfoValue: Locator;
  readonly locatorShippingInfoLabel: Locator;
  readonly locatorShippingInfoValue: Locator;
  readonly locatorPriceLabel: Locator;
  readonly locatorPriceItemValue: Locator;
  readonly locatorPriceTaxValue: Locator;
  readonly locatorTotal: Locator;
  
  constructor(page: Page, products: ICartProduct[]) {
    super(page, "/checkout-step-two");    

    this.footer = new FooterComponent(page);
    this.header = new HeaderComponent(page);

    this.products = new Array<CheckoutItemComponent>();
    for(const product of products){
      this.products.push(new CheckoutItemComponent(this.page, product));
    }

    this.locatorHeaderTitle = this.page.locator('#header_container').getByText('Checkout: Overview');
    this.locatorQty = this.page.getByText('Qty');
    this.locatorDescription = this.page.getByText('Description');    
    this.locatorPaymentInfoLabel = this.page.getByText('Payment Information', { exact: true});
    this.locatorPaymentInfoValue = this.page.getByText(/\bSauceCard\b\s#\d{5}/);
    this.locatorShippingInfoLabel = this.page.getByText('Shipping Information', { exact: true});
    this.locatorShippingInfoValue = this.page.getByText('Free Pony Express Delivery!', { exact: true});
    this.locatorPriceLabel = this.page.getByText('Price Total', { exact: true});
    this.locatorPriceItemValue = this.page.getByText(/\bItem total\b\:\s\$\d*.\d{2}/);
    this.locatorPriceTaxValue = this.page.getByText(/\bTax\b\:\s\$\d*.\d{2}/);
    this.locatorTotal = this.page.getByText(/\bTotal\b\:\s\$\d*.\d{2}/);
    this.locatorCancelButton = this.page.getByRole('button', { name: 'Cancel'});
    this.locatorFinishButton = this.page.getByRole('button', { name: 'Finish'});
  }
  
  validateDefaultLayout = async () => {
    await expect(this.locatorHeaderTitle).toBeVisible();
    await expect(this.locatorQty).toBeVisible();
    await expect(this.locatorDescription).toBeVisible();
    await expect(this.locatorPaymentInfoLabel).toBeVisible();
    await expect(this.locatorPaymentInfoValue).toBeVisible();
    await expect(this.locatorShippingInfoLabel).toBeVisible();
    await expect(this.locatorShippingInfoValue).toBeVisible();
    await expect(this.locatorPriceLabel).toBeVisible();
    await expect(this.locatorPriceItemValue).toBeVisible();
    await expect(this.locatorPriceTaxValue).toBeVisible();
    await expect(this.locatorTotal).toBeVisible();
    await expect(this.locatorCancelButton).toBeVisible();
    await expect(this.locatorFinishButton).toBeVisible();

    await this.footer.validateDefaultLayout();
    await this.header.validateDefaultLayout();
    
    for(const product of this.products){
      await product.validateDefaultUX();
    }

  }

  itemPrice = async (value: string) => {
    await expect(this.locatorPriceItemValue).toContainText(value); 
  }

  taxPrice = async (value: string) => {
    await expect(this.locatorPriceTaxValue).toContainText(value); 
  }

  totalPrice = async (value: string) => {
    await expect(this.locatorTotal).toContainText(value); 
  }

  cancel = async () => {
    await this.locatorCancelButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  finish = async () => {
    await this.locatorFinishButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}