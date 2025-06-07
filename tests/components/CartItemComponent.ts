import { Locator, Page } from "playwright-core";
import { ICartProduct } from "../fixtures/models";
import { expect } from "playwright/test";

export class CartItemComponent {
  readonly page: Page;
  readonly locatorQuantity: Locator;
  readonly locatorProductTitle: Locator;
  readonly locatorProductDescription: Locator;
  readonly locatorProductPrice: Locator;
  readonly locatorRemoveButton: Locator;

  constructor(page: Page, cart: ICartProduct){
    this.page = page;

    this.locatorProductTitle = this.page.getByRole('link', {name: `${cart.product.name}`});
    
    const container = this.page.locator('.cart_item', {hasText: `${cart.product.name}`});
    this.locatorProductDescription = container.getByText(cart.product.description);
    this.locatorQuantity = container.locator('.cart_quantity', {hasText: `${cart.qty}`});
    this.locatorProductPrice = container.locator('.inventory_item_price', {hasText: `$${cart.product.price}`});
    this.locatorRemoveButton = container.getByRole('button', { name: 'Remove'});

  }

  validateDefaultUX = async () => {
    await expect(this.locatorQuantity).toBeVisible();
    await expect(this.locatorProductTitle).toBeVisible();
    await expect(this.locatorProductDescription).toBeVisible();
    await expect(this.locatorProductPrice).toBeVisible();
    await expect(this.locatorRemoveButton).toBeVisible();
  }

  remove = async () => {
    await this.locatorRemoveButton.click();
  }

  isRemoved = async () => {
    await expect(this.locatorQuantity).not.toBeVisible();
    await expect(this.locatorProductTitle).not.toBeVisible();
    await expect(this.locatorProductDescription).not.toBeVisible();
    await expect(this.locatorProductPrice).not.toBeVisible();
    await expect(this.locatorRemoveButton).not.toBeVisible();
  }
}