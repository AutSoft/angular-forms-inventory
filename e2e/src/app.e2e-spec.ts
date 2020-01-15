import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

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

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
