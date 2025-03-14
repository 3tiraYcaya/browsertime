import intel from 'intel';
import { By } from 'selenium-webdriver';
const log = intel.getLogger('browsertime.command.mouse');
export class DoubleClick {
  constructor(browser, pageCompleteCheck) {
    this.browser = browser;
    this.actions = this.browser.getDriver().actions({ async: true });
    this.pageCompleteCheck = pageCompleteCheck;
  }

  /**
   * Perform mouse double click on an element matches a XPath selector.
   * @param {string} xpath
   * @returns {Promise} Promise object represents when the element has been double clicked.
   * @throws Will throw an error if the element is not found.
   */
  async byXpath(xpath, options) {
    try {
      const element = await this.browser
        .getDriver()
        .findElement(By.xpath(xpath));
      await this.actions.doubleClick(element).perform();
      if (options && 'wait' in options && options.wait === true) {
        return this.browser.extraWait(this.pageCompleteCheck);
      }
    } catch (error) {
      log.error('Could not double click on element with xpath %s', xpath);
      log.verbose(error);
      throw new Error('Could not double click on element with xpath ' + xpath);
    }
  }

  /**
   * Perform mouse double click on an element matches a CSS selector.
   * @param {string} selector
   * @returns {Promise} Promise object represents when the element has been double clicked.
   * @throws Will throw an error if the element is not found.
   */
  async bySelector(selector, options) {
    try {
      const element = await this.browser
        .getDriver()
        .findElement(By.css(selector));
      await this.actions.doubleClick(element).perform();
      if (options && 'wait' in options && options.wait === true) {
        return this.browser.extraWait(this.pageCompleteCheck);
      }
    } catch (error) {
      log.error('Could not double click on element with xpath %s', selector);
      log.verbose(error);
      throw new Error(
        'Could not double click on element with xpath ' + selector
      );
    }
  }

  /**
   * Perform mouse double click at the cursor's position.
   * @returns {Promise} Promise object represents when double click occurs.
   * @throws Will throw an error if double click cannot be performed.
   */
  async atCursor(options) {
    try {
      await this.actions.doubleClick().perform();
      if (options && 'wait' in options && options.wait === true) {
        return this.browser.extraWait(this.pageCompleteCheck);
      }
    } catch (error) {
      log.error('Could not perform double click');
      log.verbose(error);
      throw new Error('Could not perform double click');
    }
  }
}
