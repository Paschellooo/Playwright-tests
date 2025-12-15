import test, {expect, Locator, Page} from '@playwright/test';
interface Elements {
  locator: (page: Page) => Locator;
  name?: string;
  text?: string;
  attribute?: {
    type:string;
    value: string;
  };
}
export class MainPage {
    readonly page: Page;
    readonly elements: Elements[];

    constructor(page:Page) {
        this.page = page
        this.elements = [
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
        ]
    }
    async openMainPage() {
        await this.page.goto('https://playwright.dev/')
    }
    async checkElementsVisability(){
          for (const {locator, name} of this.elements){
          test.step(`проверка отображения элемента ${name}` , async () => {
          await expect.soft(locator(this.page)).toBeVisible();
          });
        }
    }
        async checkElementsText(){
          for (const {locator, name, text} of this.elements){
  if (text){
   test.step(`Проверка названия эелемента ${name}`, async() => {
await expect(locator(this.page)).toContainText(text);
}); 
}
        }
    }

            async checkElementsHrefAttribute(){
          for (const {locator, name, attribute} of this.elements){
    if (attribute) {
      test.step(`Проверка атрибутов href элемента ${name}`, async () => {
        await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
      });
    }
  }
        }
        async clickSwitchLightModeIcon() {
          await this.page.getByLabel('Switch between dark and light').click();
        }
        async checkDataThemeValue() {
         await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
        }
        async setLightMode (){
                await this.page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', 'system');
      });
        }

                async setDarkMode (){
                await this.page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', 'dark');
      });
        }
        async checkLayoutWithLightMode(){
            await expect(this.page).toHaveScreenshot(`pageWithLightMode.png`);
        }
        
        async checkLayoutWithDarkMode(){
            await expect(this.page).toHaveScreenshot(`pageWithDarkMode.png`);
    }
}
