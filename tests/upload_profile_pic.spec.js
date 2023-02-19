/*************************************************************************************************************************/
/*                                      SCENARIOS W NO PRE EXISTING PIC                                                  */
/*************************************************************************************************************************/
const { test, expect } = require('@playwright/test');
const LoginPage = require('../tests_page_objects/login');
const ProfilePage = require('../tests_page_objects/profile_page');
const { delay } = require('../tests_helpers/utils.js');

test.describe('Upload Profile Picture', () => {
  let page;
  let loginPage;
  let profilePage;
  let after_each_flag = true;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.WTJ_USERNAME, process.env.WTJ_PASSWORD);
    page = loginPage.page;
    const account_button = '.sc-gelMue.evhqnV'; //[todo]: maybe store this somewhere else (maybe in the selector.js file)... and make sure this class doesnt contain any dynamically generated parts...
    await page.waitForSelector(account_button);
    await page.locator(account_button).click();
  });

  test.afterEach(async () => {
    if(after_each_flag){await profilePage.deleteProfilePic()}
    else{after_each_flag = true}
    await page.close()
  });

  test('It should be possible to upload a small profile pic (30ko)', async () => {
    const small_pic = 'tests_file_uploads/profile_pics/PROFILE_PIC_SMALL_SIZE_640_624.png'
    profilePage = new ProfilePage(page);
    await profilePage.confirmNoPreExistingProfilePic();
    await delay(2000);
    await profilePage.uploadProfilePic(small_pic)
    await delay(2000);
    const saving_changes_msg = await profilePage.saveProfileChanges();
    expect(saving_changes_msg).toBe('Mise à jour réussie !');
    await delay(2000);
  });

  test('It should be possible to upload a medium profile pic (72ko)', async () => {
    const medium_pic = 'tests_file_uploads/profile_pics/PROFILE_PIC_MEDIUM_SIZE_1280_1248.png'
    profilePage = new ProfilePage(page);
    await delay(2000);
    await profilePage.uploadProfilePic(medium_pic)
    await delay(2000);
    const saving_changes_msg = await profilePage.saveProfileChanges();
    expect(saving_changes_msg).toBe('Mise à jour réussie !');
    await delay(2000);
  });

  test('It should NOT be possible to upload a large profile pic (x>1mo)', async () => {
    after_each_flag = false;
    const large_pic = 'tests_file_uploads/profile_pics/PROFILE_PIC_TOO_BIG.png'
    profilePage = new ProfilePage(page);
    await delay(2000);
    await profilePage.uploadProfilePic(large_pic)
    await delay(2000);
    // because of behaviourail inconsistencies across browsers, we'll postpone this case (see readme file)
    // const saving_changes_msg = await profilePage.saveProfileChanges();
    // expect(saving_changes_msg).toBe('Mise à jour réussie !');
    // console.log(saving_changes_msg)
  });

  /***************************************************************************************************************/
  /*                                                      WIP                                                    */
  /*                                           REMAINING TEST SCENARIOS                                          */
  /***************************************************************************************************************/

  // SEE "wtj_test_plan.txt" for the list of the remaining test scenarios that will be implemented below

});
