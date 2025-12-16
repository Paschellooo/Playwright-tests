import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../modules/MainPage';

let mainPage: MainPage

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
   mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {

    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {

    await mainPage.checkElementsHrefAttribute();
  });

  test('Проверка переключения лайт мода', async ({ page }) => {
    test.step('нажатин на иконку переключения лайт мода', async () =>{
 await mainPage.clickSwitchLightModeIcon();
  });
      test.step('проверка смены аттрибута', async () =>{
    await mainPage.checkDataThemeValue();
  });

    test(`Проверка стилей со светлой темой`, async ({ page }) => {;
    await mainPage.setLightMode();
    await mainPage.clickSwitchLightModeIcon();
  });
      test(`Проверка стилей с темной темой`, async ({ page }) => {

    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
    });
    // 1/55 время