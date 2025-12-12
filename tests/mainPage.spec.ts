import { test, expect, Page, Locator } from '@playwright/test';
import { text } from 'stream/consumers';
interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type:string;
    value: string;
  };
}
const elements: Elements [] = [
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
  name: 'Playwright logo link',
  text: 'Playwright',
  attribute: {
    type:'href',
    value: '/',
  },
  },
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
  name: 'Docs link',
  text: 'Docs',
  attribute: {
    type:'href',
    value: '/docs/intro',
  },
  },
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
  name: 'API link',
  text: 'API',
   attribute: {
    type:'href',
    value: '/docs/api/class-playwright',
  },
  },
  { locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
  name: 'Button Node.JS',
  text: 'Node.js'
  },
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
  name: 'Discord server',
  attribute: {
    type:'href',
    value: 'https://aka.ms/playwright/discord',
   },
  },
  { locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
  name: 'Search input',
  text: 'Search'
  },
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
  name: 'Community link',
  text: 'Community',
   attribute: {
    type:'href',
    value: '/community/welcome',
   },
  },
  { locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
  name: 'Github link',
  attribute: {
    type:'href',
    value: 'https://github.com/microsoft/playwright',
   },
  },
   { locator: (page: Page): Locator => page.getByLabel('Switch between dark and light mode'),
    name: 'Dark-light mode'
  },
];
const lightMods = ['light','dark']

test.describe('тесты главной страницы', ()=> {
  test.beforeEach(async ({page}) => {
      await page.goto('https://playwright.dev/');
  });

  test('проверка отображения элементов навигации хеддер', async ({ page }) => {
    elements.forEach (({locator, name}) => {
  test.step(`проверка отображения элемента ${name}` , async () => {
  await expect.soft(locator(page)).toBeVisible();
  });
  });
});

test('проверка названия элементов названий хеддер', async ({ page }) => {
elements.forEach(({ locator, name,text })=> {
  if (text){
   test.step(`Проверка названия элелемента ${name}`, async() => {
await expect(locator(page)).toContainText(text);
}); 
}
});
});

test('проверка атрибутов href элементов навигации хеддер', async ({ page }) => {
  elements.forEach(({ locator, name, attribute }) => {
    if (attribute) {
      test.step(`Проверка атрибутов href элемента ${name}`, async () => {
        await expect(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
      });
    }
  });
});

test('проверка переключения light мода', async ({ page }) => {
await page.getByLabel('Switch between dark and light mode').click();
await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
lightMods.forEach((value) => {
  test(`проверка стилей активного ${value} мода` , async ({page}) => {
    await page.evaluate((value) => {   // работа с окружение браузера
      document.querySelector('html')?.setAttribute('data-theme',value);
    },value);
await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
});
});
});