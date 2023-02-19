const { test, expect } = require('@playwright/test');
const { delay } = require('../tests_helpers/utils.js');

class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async uploadProfilePic(file_path) {
    //const edit_pic_button = '.sc-grxQYx.hPjwiI'; //[todo]: maybe store this somewhere else (maybe in the selector.js file or as an object property)... and make sure this class doesnt contain any dynamically generated parts...
    const edit_pic_button = '.sc-grxQYx.kbShdE'; //[todo]: maybe store this somewhere else (maybe in the selector.js file or as an object property)... and make sure this class doesnt contain any dynamically generated parts...
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.waitForSelector(edit_pic_button),
      this.page.locator(edit_pic_button).click()
    ]);
    await fileChooser.setFiles(file_path);
  }

  async confirmNoPreExistingProfilePic() {
    const empty_profile_pic_locator = '.sc-cxdZMj.eefgRh.wui-text';
    const empty_profile_pic_text = await this.page.locator(empty_profile_pic_locator).innerText();
    expect(empty_profile_pic_text).toBe('Ajouter un fichier');
  }

  async saveProfileChanges() {
    const save_profile_button = 'button[data-testid="account-edit-button-submit"]';
    const successful_update_message = '.sc-cwSeag.sc-jKvnYE.dmMSMx';
    await this.page.locator(save_profile_button).click()
    return this.page.locator(successful_update_message).innerText()
  }

  async deleteProfilePic() {
    const delete_pic_button = '.sc-grxQYx.kphoff'; //[todo]: maybe store this somewhere else (maybe in the selector.js file or as an object property)... and make sure this class doesnt contain any dynamically generated parts...
    const save_profile_button = 'button[data-testid="account-edit-button-submit"]';
    await this.page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
    await this.page.locator(delete_pic_button).click()
    await this.page.locator(save_profile_button).click()
    await delay(3000)
  }
  
}

module.exports = ProfilePage;
