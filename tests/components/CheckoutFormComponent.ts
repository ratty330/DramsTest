import { Locator, Page, expect } from "@playwright/test";
import { FormComponent } from "./FormComponent";
import { IUser } from "../fixtures/models";

export class CheckoutFormComponent extends FormComponent {
  
  readonly locatorFirstNameInput: Locator;
  readonly locatorLastNameInput: Locator;
  readonly locatorZipCodeInput: Locator;

  constructor(page: Page){
    super(page, 'Error:');

    this.locatorFirstNameInput = this.locatorForm.locator('[data-test="firstName"]');
    this.locatorLastNameInput = this.locatorForm.locator('[data-test="lastName"]');
    this.locatorZipCodeInput = this.locatorForm.locator('[data-test="postalCode"]');

  }

  fill = async (data: IUser) => {
    await this.locatorFirstNameInput.fill(data.firstName);
    await this.locatorLastNameInput.fill(data.lastName);
    await this.locatorZipCodeInput.fill(data.zipCode);
  }

  override validateErrorLayout = async (): Promise<void> => {
      await expect(this.locatorSubmitButton).toHaveText('Continue');

      await expect(this.locatorFirstNameInput).toBeVisible();
      await expect(this.locatorFirstNameInput).toHaveAttribute('type', 'text');
      await expect(this.locatorFirstNameInput).toHaveAttribute('placeholder', 'First Name');
      await expect(this.locatorFirstNameInput).toHaveClass(/\berror\b/);

      await expect(this.locatorLastNameInput).toBeVisible();
      await expect(this.locatorLastNameInput).toHaveAttribute('type', 'text');
      await expect(this.locatorLastNameInput).toHaveAttribute('placeholder', 'Last Name');
      await expect(this.locatorLastNameInput).toHaveClass(/\berror\b/);

      await expect(this.locatorZipCodeInput).toBeVisible();
      await expect(this.locatorZipCodeInput).toHaveAttribute('type', 'text');
      await expect(this.locatorZipCodeInput).toHaveAttribute('placeholder', 'Zip/Postal Code');
      await expect(this.locatorZipCodeInput).toHaveClass(/\berror\b/);

      return super.validateErrorLayout(); 
  }

  override validateDefaultLayout = async (): Promise<void> => {
      await expect(this.locatorSubmitButton).toHaveText('Continue');

      await expect(this.locatorFirstNameInput).toBeVisible();
      await expect(this.locatorFirstNameInput).toHaveAttribute('type', 'text');
      await expect(this.locatorFirstNameInput).toHaveAttribute('placeholder', 'First Name');
      await expect(this.locatorFirstNameInput).not.toHaveClass(/\berror\b/);

      await expect(this.locatorLastNameInput).toBeVisible();
      await expect(this.locatorLastNameInput).toHaveAttribute('type', 'text');
      await expect(this.locatorLastNameInput).toHaveAttribute('placeholder', 'Last Name');
      await expect(this.locatorLastNameInput).not.toHaveClass(/\berror\b/);

      await expect(this.locatorZipCodeInput).toBeVisible();
      await expect(this.locatorZipCodeInput).toHaveAttribute('type', 'text');
      await expect(this.locatorZipCodeInput).toHaveAttribute('placeholder', 'Zip/Postal Code');
      await expect(this.locatorZipCodeInput).not.toHaveClass(/\berror\b/);

      return super.validateDefaultLayout(); 
  }
  
}