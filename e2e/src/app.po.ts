import { browser, by, element, Key } from 'protractor';
import { Currency, Item } from '../../src/app/api/inventory.generated';

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

  getCreateButton() {
    return element(by.partialButtonText('New item'));
  }

  getSubmitButton() {
    return element(by.partialButtonText('Save'));
  }

  async fillForm(item: Item) {
    await element(by.css('[placeholder = "Name"]')).sendKeys(item.name);
    await element(by.css('[placeholder = "Type"]')).sendKeys(item.type);
    await element(by.css('[placeholder = "Description"]')).sendKeys(item.description);

    await element(by.cssContainingText('.mat-tab-label-content', 'Details')).click();

    await element(by.css('[placeholder = "Count"]')).sendKeys(item.count);
    await element(by.css('[placeholder = "Count Date"]')).sendKeys(item.countDate.toISOString());
    await element(by.css('mat-slide-toggle')).sendKeys(Key.SPACE);
    await element(by.css('[placeholder = "Width"]')).sendKeys(item.dimension.width);
    await element(by.css('[placeholder = "Height"]')).sendKeys(item.dimension.height);
    await element(by.css('[placeholder = "Depth"]')).sendKeys(item.dimension.depth);
    await element(by.css('[placeholder = "Price"]')).sendKeys(item.price.value);
    await element(by.css('[name = "Currency"]')).click();
    await element(by.cssContainingText('span', Currency[item.price.currency])).click();
  }
}
