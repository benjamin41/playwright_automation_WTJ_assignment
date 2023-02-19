const { delay } = require('../tests_helpers/utils.js');
class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://www.welcometothejungle.com/fr');
      await delay(2000) //little delay to wait for the page elements to be in DOM //[todo] maybe replace with waitforselector...
    }
  
    async login(username, password) {
      const sign_in_button = '#sticky-menu > div > div.sc-cwSeag.dcAqPU > div > button'; //[todo]: maybe store this somewhere else (maybe in the selector.js file)... and make sure this class doesnt contain any dynamically generated parts...
      await this.page.waitForSelector(sign_in_button)
      await this.page.locator(sign_in_button).click()
      await this.page.locator('#email_login').type(username)
      await this.page.locator('#password').type(password)
      //-----------------------------------------------------------------------------------------------------------------------
      const sign_in_button_2 = '.sc-grxQYx.dgOaHN'; //[todo]: maybe store this somewhere else (maybe in the selector.js file)... and make sure this class doesnt contain any dynamically generated parts...
      await this.page.waitForSelector(sign_in_button_2)
      await this.page.locator(sign_in_button_2).click()
      await delay(2000) //little delay to visually make sure everything is good //[todo] maybe replace with waitforselector...
    }
  }
  
  module.exports = LoginPage;
  