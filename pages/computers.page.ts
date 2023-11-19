import { expect, type Locator, type Page } from '@playwright/test';

export class ComputersPage {
    readonly page: Page;
    readonly filterInput: Locator;
    readonly filterButton: Locator;
    readonly tableCell: Locator;
    readonly addNewComputerButton: Locator;
    readonly computerNameField: Locator;
    readonly introducedField: Locator;
    readonly discontinuedField: Locator;
    readonly companyField: Locator;
    readonly createComputerButton: Locator;
    readonly errorNameText: Locator;
    readonly validateCreateText: Locator;
    readonly invalidInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filterInput = page.getByPlaceholder('Filter by computer name...')
        this.filterButton = page.getByRole('button', { name: 'Filter by name' })
        this.tableCell = page.locator('//*[@id="main"]/table/tbody/tr[1]/td[1]/a')
        this.addNewComputerButton = page.getByRole('link', { name: 'Add a new computer' })
        this.computerNameField = page.getByLabel('Computer name')
        this.introducedField = page.getByLabel('Introduced')
        this.discontinuedField = page.getByLabel('Discontinued')
        this.companyField = page.getByLabel('Company')
        this.createComputerButton = page.getByRole('button', { name: 'Create this computer' })
        this.errorNameText = page.getByText('Failed to refine type :')
        this.validateCreateText = page.locator('//*[@id="main"]/div[1]')
        this.invalidInput = page.getByText('Failed to decode date : java.')
    }
    async goto() {
        await this.page.goto('https://computer-database.gatling.io/computers');
    }

    async filter(search) {
        await expect(this.filterInput).toBeVisible();
        await this.filterInput.fill(search);
        await this.filterButton.click();

    }

    async validate(search) {
        await expect(this.tableCell).toContainText(search, { timeout: 5000 });
    }


    async validateNegative() {
        await expect(this.tableCell).toBeHidden({ timeout: 5000 });
    }
    async addNewComputer() {
        await this.addNewComputerButton.click();
    }
    async createComputer(computerName, Introduced, Discontinued) {
        await expect(this.createComputerButton).toBeVisible({ timeout: 5000 });
        await this.computerNameField.fill(computerName);
        await this.introducedField.fill(Introduced);
        await this.discontinuedField.fill(Discontinued);
        await this.companyField.selectOption('1');
        await this.createComputerButton.click();
    }
    async validateNegativeCreateComputer() {
        await expect(this.errorNameText).toBeVisible({ timeout: 5000 });

    }
    async validateCreateComputer(search) {
        await expect(this.validateCreateText).toContainText('Computer ' + search + ' has been created', { timeout: 5000 });
    }
    async invalidInputIntroduced() {
        await this.invalidInput
    }
}


