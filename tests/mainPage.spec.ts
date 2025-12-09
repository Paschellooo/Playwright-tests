import { test, expect } from '@playwright/test';

test.describe('тесты главной страницы', ()=> {
  test.beforeEach(async ({page}) => {
      await page.goto('https://playwright.dev/');
  });

  test('проверка отображения элементов навигации хеддер', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Community' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
});

test('проверка отображения элементов названий хеддер', async ({ page }) => {

  await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright');
  await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
  await expect.soft(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  await expect.soft(page.getByRole('link', { name: 'Community' })).toContainText('Community');
});

test('проверка атрибуов href элементов навигации хеддер', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href','/');
  await expect.soft(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href','/docs/intro');
  await expect.soft(page.getByRole('link', { name: 'API' })).toHaveAttribute('href','/docs/api/class-playwright');
  await expect.soft(page.getByRole('link', { name: 'Community' })).toHaveAttribute('href','/community/welcome');
    await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute('href','https://github.com/microsoft/playwright');
  await expect.soft(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute('href','https://aka.ms/playwright/discord');
});

test('проверка переключения light мода', async ({ page }) => {
await page.getByLabel('Switch between dark and light mode').click();
await expect.soft (page.locator('html')).toHaveAttribute('data-theme', 'light')
});

test('проверка заголовка станицы', async ({ page }) => {
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
});

test('проверка кнопки get started', async ({ page }) => {
await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');
await expect.soft(page.getByRole('banner')).toContainText('Get started');
await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
});
});
