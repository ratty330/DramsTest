import { Locator, expect } from "@playwright/test";
import { Page } from "playwright-core";
import { BasePage } from "./BasePage";
import { ProductItemComponent } from "../components/ProductItemComponent";
import data from '../fixtures/data/products.json';
import { FooterComponent } from "../components/FooterComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { SortOptions } from "../fixtures/models";

export class InventoryPage extends BasePage{
  
  readonly locatorHeaderTitle: Locator;
  readonly locatorHeaderFilterSelect: Locator;
  readonly sortSelect: Locator;
  readonly items: ProductItemComponent[];
  readonly footer: FooterComponent;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page, "/inventory.html");  
    
    this.locatorHeaderTitle = this.page.locator('#header_container').getByText('Products');
    this.locatorHeaderFilterSelect = this.page.locator('select.product_sort_container');
    this.sortSelect = this.page.locator('[data-test="active-option"]');
    this.footer = new FooterComponent(this.page);
    this.header = new HeaderComponent(this.page);
    this.items = new Array<ProductItemComponent>();
    
    for(const prod of data.az){
      this.items.push(new ProductItemComponent(this.page, prod))
    }
  }

  validateDefaultLayout = async () => {
    await expect(this.locatorHeaderFilterSelect).toBeVisible();
    await expect(this.locatorHeaderTitle).toBeVisible();
    
    for(const item of this.items){
      await item.validateDefaultUX ();
    }

    await this.header.validateDefaultLayout();
    await this.footer.validateDefaultLayout();
  }

  async sort(sort: SortOptions): Promise<void> {
    try {
      // Wait for the page to be fully loaded
      await this.page.waitForLoadState('networkidle');
      
      // Log the current state for debugging
      console.log('Attempting to sort with option:', sort.toString());
      
      // Try to find the select element using multiple approaches
      const selectElement = await this.page.$('select.product_sort_container');
      if (!selectElement) {
        throw new Error('Sort select element not found');
      }
      
      // Get all available options for debugging
      const options = await selectElement.evaluate((select: HTMLSelectElement) => {
        return Array.from(select.options).map(option => ({
          value: option.value,
          text: option.text
        }));
      });
      console.log('Available options:', options);
      
      // Try to select the option
      await selectElement.selectOption({ value: sort.toString() });
      
      // Verify the selection was successful
      const selectedValue = await this.sortSelect.textContent();
      console.log('Selected value:', selectedValue);
      
      // Wait for the items to update
      for(let i = 0; i < data[sort.toString()].length; i++){
        await expect(this.page.locator(`div:nth-child(${i+1}) > .inventory_item_description`, { hasText: data[sort.toString()][i].name})).toBeVisible();
      }
    } catch (error) {
      console.error('Error during sort operation:', error);
      // Log the current page URL and title for debugging
      console.log('Current page URL:', await this.page.url());
      console.log('Current page title:', await this.page.title());
      throw error;
    }
  }
}