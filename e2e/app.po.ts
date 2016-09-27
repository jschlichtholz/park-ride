import {browser, element, by} from 'protractor/globals';
import {ElementFinder} from "protractor";

/**
 * Helper class to get HTML elements required for testing.
 */
export class ParkPage {
  static navigateTo() {
    return browser.get('/');
  }

  private static getNavbar(): ElementFinder {
    return element(by.tagName('app-root')).element(by.className('navbar-fixed-top'));
  }

  private static getFooter(): ElementFinder {
    return element(by.tagName('app-root')).element(by.className('navbar-fixed-bottom'));
  }

  private static getNavbarBrand() {
    return ParkPage.getNavbar().element(by.className('navbar-brand'));
  }

  private static getNavbarForm(): ElementFinder {
    return ParkPage.getNavbar().element(by.tagName('form'));
  }

  static getNavbarBrandText(): webdriver.promise.Promise<string> {
    return ParkPage.getNavbarBrand().element(by.tagName('b')).getText();
  }

  static getNavbarFormInput(): ElementFinder {
    return ParkPage.getNavbarForm().element(by.tagName('input'));
  }

  static getFooterLeft(): ElementFinder {
    return ParkPage.getFooter().element(by.tagName('ul')).element(by.tagName('li'));
  }

  static getLanguageSelector(language: string): ElementFinder {
    return ParkPage.getFooter().element(by.tagName('ul')).element(by.className('flag-icon-' + language));
  }
}
