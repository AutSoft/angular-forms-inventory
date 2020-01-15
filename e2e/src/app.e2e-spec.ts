import { browser, logging } from 'protractor';
import { Currency, Item } from '../../src/app/api/inventory.generated';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    return browser.executeAsyncScript(
      // tslint:disable-next-line:only-arrow-functions
      function(cb) { fetch('https://autsoftangulare2e.azurewebsites.net/api/Inventory/resetDatabase?password=123').then(cb); }
    );
  });

  beforeEach(() => {
    page = new AppPage();
    return page.navigateTo();
  });

  it('should delete first item', async () => {
    const numberOfItems = await page.getItems().count();

    await page.getDeleteButton(0).click();
    await browser.waitForAngular();

    expect(await page.getItems().count()).toBe(numberOfItems - 1);
  });

  it('should create item', async () => {
    const numberOfItems = await page.getItems().count();

    await page.getCreateButton().click();
    const item = new Item({
      name: 'MacBook Pro 2018',
      type: 'laptop',
      description: 'MacBook Pro with Retina display',
      count: 3,
      countDate: new Date(),
      dimension: { width: 10, height: 5, depth: 0.5 },
      price: { value: 10, currency: Currency.USD }
    });
    await page.fillForm(item);
    await page.getSubmitButton().click();
    await browser.waitForAngular();

    expect(await page.getItems().count()).toBe(numberOfItems + 1);
  });

  it('should list items', async () => {
    await browser.driver.manage().window().setSize(1200, 950);
    expect(await browser.imageComparison.checkFullPageScreen('item-list')).toEqual(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
