import { Locator, Page, expect } from "@playwright/test";
import { FormComponent } from "./FormComponent";
import { ILogin } from "../fixtures/models";

export class LoginFormComponent extends FormComponent {
 
  readonly locatorUsernameInput: Locator;
  readonly locatorPasswordInput: Locator;

  constructor(page: Page){
    super(page);

    this.locatorUsernameInput = this.locatorForm.locator('input[data-test="username"]');
    this.locatorPasswordInput = this.locatorForm.locator('input[data-test="password"]');

  }
  fill = async (data: ILogin) => {
    await this.locatorUsernameInput.fill(data.username);
    await this.locatorPasswordInput.fill(data.password);
  }

  override validateErrorLayout = async (): Promise<void> => {
    await expect(this.locatorSubmitButton).toHaveText('Login');  

    await expect(this.locatorUsernameInput).toBeVisible();
    await expect(this.locatorUsernameInput).toHaveAttribute('type', 'text');
    await expect(this.locatorUsernameInput).toHaveAttribute('placeholder', 'Username', {ignoreCase: false});
    await expect(this.locatorUsernameInput).toHaveClass(/\berror\b/);

    await expect(this.locatorPasswordInput).toBeVisible();
    await expect(this.locatorPasswordInput).toHaveAttribute('type', 'password');
    await expect(this.locatorPasswordInput).toHaveAttribute('placeholder', 'Password', {ignoreCase: false});
    await expect(this.locatorPasswordInput).toHaveClass(/\berror\b/);

    super.validateErrorLayout(); 
  }

  override validateDefaultLayout = async (): Promise<void> => {
    await expect(this.locatorSubmitButton).toHaveText('Login');  
    
    await expect(this.locatorUsernameInput).toBeVisible();
    await expect(this.locatorUsernameInput).toHaveAttribute('type', 'text');
    await expect(this.locatorUsernameInput).toHaveAttribute('placeholder', 'Username', {ignoreCase: false});
    await expect(this.locatorUsernameInput).not.toHaveClass(/\berror\b/);
    
    
    await expect(this.locatorPasswordInput).toBeVisible();
    await expect(this.locatorPasswordInput).toHaveAttribute('type', 'password');
    await expect(this.locatorPasswordInput).toHaveAttribute('placeholder', 'Password', {ignoreCase: false});
    await expect(this.locatorPasswordInput).not.toHaveClass(/\berror\b/);

    return super.validateDefaultLayout();
  }
  
}