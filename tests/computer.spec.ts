import { test, expect } from '@playwright/test';
import { ComputersPage } from '../pages/computers.page';
test.describe.configure({mode: "serial", retries: 1, timeout: 15000});

test('PositiveSearch', async ({ page }) => {
  const computersPage = new ComputersPage(page);
  await computersPage.goto();
  await computersPage.filter('IBM');
  await computersPage.validate('IBM');
});


test('NegativeSearch', async ({ page }) => {
  const computersPage = new ComputersPage(page);
  await computersPage.goto();
  await computersPage.filter('Intranet');
  await computersPage.validateNegative();
});


test('positiveCreateComputer', async ({ page }) => {
  const computersPage = new ComputersPage(page);
  await computersPage.goto();
  await computersPage.addNewComputer();
  await computersPage.createComputer('Cisco', '','');
  await computersPage.validateCreateComputer('Cisco');

});

test('testNegativeCreateComputer', async ({ page }) => {
  const computersPage = new ComputersPage(page);
  await computersPage.goto();
  await computersPage.addNewComputer();
  await computersPage.createComputer('', '','');
  await computersPage.validateNegativeCreateComputer();
});


test('testNegativeInputIntroduced', async ({ page }) => {
  const computersPage = new ComputersPage(page);
  await computersPage.goto();
  await computersPage.addNewComputer();
  await computersPage.createComputer('Cisco', '02022023','02022023');
  await computersPage.invalidInputIntroduced
});