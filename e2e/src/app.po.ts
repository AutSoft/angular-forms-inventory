import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getItems() {
    return element.all(by.css('tr'));
  }

  getDeleteButton(index: number) {
    return element.all(by.css('[mattooltip = "Delete"]')).get(index);
  }
}
