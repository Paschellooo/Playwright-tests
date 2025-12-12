import { test, expect, Page, Locator } from '@playwright/test';
import { text } from 'stream/consumers';
interface Elements {
  locator: (page: Page) => Locator;
  name?: string;
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
  text: 'SearchK'
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

test('проверка отображения элементов названий хеддер', async ({ page }) => {
elements.forEach(({ locator, name, text})=> {
  if (text){
   test.step(`Проверка названия эелемента ${name}`, async() => {
await expect(locator(page)).toContainText(text);
}); 
}
});
});

test('проверка атрибутов href элементов навигации хеддер', async ({ page }) => {
  elements.forEach(({ locator, name, attribute }) => {
    if (attribute) {
      test.step(`Проверка атрибутов href элемента ${name}`, async () => {
        await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
      });
    }
  });
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