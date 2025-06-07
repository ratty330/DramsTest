import { Locator, Page, expect } from "@playwright/test";
import { IProduct } from "../fixtures/models";

export class ProductItemComponent {
  private readonly page: Page;
  private readonly product: IProduct;

  private readonly locators = {
    productTitle: (): Locator => this.page.locator('a[id$=title_link]', { hasText: this.product.name }),
    container: (): Locator => this.page.locator('#inventory_container .inventory_item', { has: this.locators.productTitle() }),
    productPhoto: (): Locator => this.locators.container().getByAltText(this.product.name),
    productDescription: (): Locator => this.locators.container().getByText(this.product.description),
    productPrice: (): Locator => this.locators.container().getByText(`$${this.product.price}`),
    addCartButton: (): Locator => this.locators.container().getByRole('button', { name: 'Add to cart' }),
    removeCartButton: (): Locator => this.locators.container().getByRole('button', { name: 'Remove' })
  };

  constructor(page: Page, product: IProduct) {
    this.page = page;
    this.product = product;
  }

  get price(): number {
    return this.product.price;
  }

  async validateDefaultUX(): Promise<void> {
    const { productPhoto, productTitle, productDescription, productPrice, addCartButton } = this.locators;
    
    await expect(productPhoto()).toBeVisible();
    await expect(productTitle()).toBeVisible();
    await expect(productDescription()).toBeVisible();
    await expect(productPrice()).toBeVisible();
    await expect(addCartButton()).toBeVisible();
  }

  async validateRemoveUX(): Promise<void> {
    const { addCartButton, removeCartButton } = this.locators;
    
    await expect(addCartButton()).not.toBeVisible();
    await expect(removeCartButton()).toBeVisible();
  }

  async validateAddLayout(): Promise<void> {
    const { addCartButton, removeCartButton } = this.locators;
    
    await expect(removeCartButton()).not.toBeVisible();
    await expect(addCartButton()).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.locators.addCartButton().click();
  }

  async removeFromCart(): Promise<void> {
    await this.locators.removeCartButton().click();
  }

  async openDetailsClickingOnPhoto(): Promise<void> {
    await this.locators.productPhoto().click();
    await this.page.waitForLoadState('networkidle');
  }

  async openDetailsClickingOnTitle(): Promise<void> {
    await this.locators.productTitle().click();
    await this.page.waitForLoadState('networkidle');
  }
}