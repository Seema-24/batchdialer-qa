import Dashboard from '../support/pages/Dashboard';
import Login from '../support/pages/Login';
import PhoneNum from '../support/pages/PhoneNum';
import Register from '../support/pages/Register';
import { ignoreSpeedTestPopup, skipTourGuidePopup } from '../support/Utils';

const register = new Register();
const dashboard = new Dashboard();
const phone = new PhoneNum();
const login = new Login();
let fixtureData;
let testData;
const randomNumber = Math.floor(Math.random() * 10000);
describe('Registration', () => {
  beforeEach(() => {
    cy.fixture('constants').then((data) => (fixtureData = data));
    cy.visit('/');
    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
  });

  after(() => {
    cy.Logout();
  });

  it('Verify that when user click on SIGN UP NOW button its should open the registration page', () => {
    register.clickSignUpBtn();
    register.verifyRegistrationUrl();
  });

  it('Verify that all the fields are visible on registration page', () => {
    register.clickSignUpBtn();
    register.verifyFirstNameField();
    register.verifyLastNameField();
    register.verifyCompanyNameField();
    register.verifyIndustryDropdown();
    register.verifyPhoneNumberField();
    register.verifyEmailAddressField();
    register.verifyPasswordField();
    register.verifyConfirmPasswordField();
    register.verifyContinueToPlanButton();
  });

  it('Verify that when user click on EYE ICON then password should show in the password field', () => {
    register.clickSignUpBtn();
    register.enterPassword('Test');
    register.clickEyeButton();
    register.verifyDecryptedPassword();
  });

  it('Verify that when all the required fields are filled then user is able to go next step PLAN SELECTION', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('test+' + randomNumber + '@email.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyPlanSelectionWindow();
  });

  it('Verify that when user select a plan, then user go to the payment page', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('test+' + randomNumber + '@email.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyPlanSelectionWindow();
    register.choosePlan('Single Line Dialer');
    register.verifyPaymentsPage();
  });

  it('Verify that User can increase the number of agent by using slider on the plan selection page', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('test+' + randomNumber + '@email.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyPlanSelectionWindow();
    register.increaseAgentCount(10);
    register.verifyAgentCount(10);
  });

  it('Verifies Required Fields', () => {
    register.clickSignUpBtn();
    register.clickContinueToPlanBtn();
    register.verifyRequiredFields('Enter First Name');
    register.verifyRequiredFields('Enter Last Name');
    register.verifyRequiredFields('Enter Phone Number');
    register.verifyRequiredFields('Enter Email');
    register.verifyRequiredFields('Enter Password');
  });

  it('Verify that when password does not have upper case letter and a number its shows validation', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+5');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('test+' + randomNumber + '@email.com');
    register.enterPassword('test12');
    register.enterConfirmPassword('test12');
    register.clickContinueToPlanBtn();
    register.verifyToastMessage(
      'Password must contain at least one uppercase character'
    );
  });

  it('Verify that Password should be 6 characters long and contain upper case letter and a number', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+5');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('test+' + randomNumber + '@email.com');
    register.enterPassword('Test1');
    register.enterConfirmPassword('Test1');
    register.clickContinueToPlanBtn();
    register.verifyErrorMessage('Password is too short');
    register.enterPassword('Testto');
    register.enterConfirmPassword('Testto');
    register.clickContinueToPlanBtn();
    register.verifyToastMessage('Password must contain at least one number');
    register.enterPassword('Test12');
    register.enterConfirmPassword('Test12');
    register.clickContinueToPlanBtn();
    register.verifyPlanSelectionWindow();
  });

  it('Verifies Valid Phone Number', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+5');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999');
    register.enterEmail('test+' + randomNumber + '@email.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyRequiredFields('Enter Phone Number');
  });

  it('Verifies Valid Email Address', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+5');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('test@');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyRequiredFields('Email address not valid');
  });

  it('Verifies Duplicate Email', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+' + randomNumber + '');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('anil.kumar+1@fleekitsolutions.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyDuplicateEmail();
  });

  it('Verify the Hidden Registration fields', () => {
    register.clickSignUpBtn();
    register.verifyAffiliatePartnerField();
    register.verifySignupPathField();
    register.verifyUtmCampaignField();
    register.verifyUtmSourceField();
    register.verifyUtmMediumField();
  });

  it('Verify that coupon code entered in subscription is automatically converted to UPPERCASE', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+' + randomNumber + '');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('testing+' + randomNumber + '@test.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.choosePlan('Single Line Dialer'); //Multi-Line Dialer
    register.verifyPlanPrice();
    register.enterCoupon('qatest');
    register.verifyCouponUppercase('QATEST');
  });

  it('Verify that when user fill the valid card details and Check the Terms of Service & Privacy Policy checkbox then SUBSCRIBE NOW button should enable', () => {
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+' + randomNumber + '');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail('testing+' + randomNumber + '@test.com');
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.choosePlan('Single Line Dialer'); //Multi-Line Dialer
    register.verifyPlanPrice();
    register.verifyPaymentsPage();
    register.verifySubscribedNowBtnDisabled();
    register.enterCardDetailsForSignUp(
      Cypress.env('CardName'),
      Cypress.env('CardNumber'),
      Cypress.env('ExpiryDate'),
      Cypress.env('CVC'),
      Cypress.env('Country'),
      Cypress.env('BillingZip'),
      Cypress.env('Coupon')
    );
    register.clickAgreeCheckbox();
    register.enterBillingAddress('63 East June');
    register.selectBillingAddressFromSuggestion(Cypress.env('BillingZip'),'USA');
    register.verifySubscribedNowBtnEnabled();
  });

  it('Register User', () => {
    cy.url().then((url) => {
      if (url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        register.clickSignUpBtn();
        register.enterFirstName('Demo');
        register.enterLastName('testing');
        register.enterCompanyName('Fleek+' + randomNumber + '');
        register.selectIndustry('Other');
        register.enterPhoneNumber('9999999999');
        register.enterEmail('testing+' + randomNumber + '@test.com');
        register.enterPassword('Fleek@2016');
        register.enterConfirmPassword('Fleek@2016');
        register.clickContinueToPlanBtn();
        register.choosePlan('Single Line Dialer'); //Multi-Line Dialer
        register.verifyPlanPrice();
        register.enterCardDetailsForSignUp(
          Cypress.env('CardName'),
          Cypress.env('CardNumber'),
          Cypress.env('ExpiryDate'),
          Cypress.env('CVC'),
          Cypress.env('Country'),
          Cypress.env('BillingZip'),
          Cypress.env('Coupon')
        );
        register.clickAgreeCheckbox();
        register.enterBillingAddress('63 East June Circle, Meza, AZ');
        register.selectBillingAddressFromSuggestion( Cypress.env('BillingZip'),'USA');
        register.verifySubscribedNowBtnEnabled();
        register.clickSubscribeBtn();
        register.verifyPaymentSummaryVisible();
        cy.wait(1000);
        register.clickOnButton('Continue to dashboard');
        cy.waitFor(cy.get('.main_sec', { timeout: 30000 }));
        skipTourGuidePopup();
        login.verifySuccessfullLogin();
        cy.Logout();
      }
    });
  });

  it('Verify the Default call results present on New account registration', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Fleek@2016');
        skipTourGuidePopup();
        phone.clickPhoneNumberMenu();
        phone.clickCallResultMenu();
        phone.clickOpenCallResultGroup('UNGROUPED');
        phone.verifyCallResultAvailable([
          'Busy',
          'Abandoned',
          'Do Not Call',
          'Voicemail',
          'Successful Sale',
          'No Answer',
        ]);
        cy.Logout();
      }
    })
  });

  it('Verify that card with same details can not be added again', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Fleek@2016');
        cy.reload();
        skipTourGuidePopup();
        dashboard.clickUserProfile();
        dashboard.clickBilling();
        register.clickCardEditBtn();
        dashboard.clickAddNewCard();
        dashboard.enterCardName(Cypress.env('CardName'));
        dashboard.enterCardNumber(Cypress.env('CardNumber'));
        dashboard.enterExpiryDate(Cypress.env('ExpiryDate'));
        dashboard.enterCVC(Cypress.env('CVC'));
        dashboard.chooseCountry('United States');
        dashboard.enterBillingZip('43256');
        dashboard.clickContinue();
        register.verifyToastMessage('The card is already added');
        cy.Logout();
      }
    })
  });

  it('Verify the user is able to change the password in Profile', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Fleek@2016');
        cy.reload();
        skipTourGuidePopup();
        dashboard.clickUserProfile();
        dashboard.clickProfile();
        register.verifyFirstNameField();
        register.clickOnChangePasswordBtn();
        register.enterPassword('Test@123');
        register.clickOnButton('Save');
        register.verifyToastMessage('Profile Saved');
        cy.Logout();
      }
    })
  });

  it('Verify that user is able to edit the profile', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Test@123');
        cy.reload();
        skipTourGuidePopup();
        dashboard.clickUserProfile();
        dashboard.clickProfile();
        register.verifyFirstNameField();
        register.enterFirstName('User');
        register.enterLastName('Edited');
        register.enterProfilePhoneNumber('8888888888');
        register.clickOnButton('Save');
        register.verifyToastMessage('Profile Saved');
        cy.Logout();
      }
    })
  });

  it('Verify that the user is able login again after the edit profile info', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Test@123');
        cy.reload();
        ignoreSpeedTestPopup();
        cy.Logout();
      }
    })
  });

  it('Verify that the user is able to add profile picture', () => {
    const file = 'BatchLogo.png';
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Test@123');
        cy.reload();
        skipTourGuidePopup();
        dashboard.clickUserProfile();
        dashboard.clickProfile();
        register.verifyFirstNameField();
        register.verifyBeforeProfileAvatar();
        register.uploadFile(file);
        register.clickOnButton('CROP');
        register.clickOnButton('Save');
        cy.wait(1000);
        cy.reload();
        ignoreSpeedTestPopup();
        register.verifyAddedProfileAvatar();
        register.verifyProfilePictureChange(file);
        cy.Logout();
      }
    })
  });

  it('Verify that the user is able to change the existing profile picture', () => {
    const file = 'logo.jpg';
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Test@123');
        cy.reload();
        ignoreSpeedTestPopup();
        dashboard.clickUserProfile();
        dashboard.clickProfile();
        register.verifyFirstNameField();
        register.verifyAddedProfileAvatar();
        register.verifyProfilePictureChange(file);
        cy.Logout();
      }
    })
  });

  it('Verify that zip code captured during registration process and store in the users billing Profile', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        cy.log('Not Registering user on Prod');
      } else {
        login.verifyCloseApp();
        cy.Login('testing+' + randomNumber + '@test.com', 'Test@123');
        cy.reload();
        ignoreSpeedTestPopup();
        dashboard.clickUserProfile();
        dashboard.clickBilling();
        dashboard.clickBillingDetailsEditIcon();
        dashboard.verifyZip(Cypress.env('BillingZip'));
        dashboard.verifyCountry(Cypress.env('Country'));
        dashboard.clickCancelBtn();
        cy.Logout();
      }
    })
  });

  //BAT-2336 --> FIXED ON 14 JUNE 2022
  it('Cancel the Account from the Super Admin Panel', () => {
    cy.url().then((url) => {
      if (url.includes('app.batchdialer.com')) {
        cy.log('Not performing Account Reactivation on Production');
      } else {
        login.verifyCloseApp();
        cy.Login('god', 'god');
        register.clickUserTreeDropdown('Switch Account');
        register.clickOnUser('First Tenant');
        register.clickOnUser('Reseller 1');
        register.clickOnResellerUser();
        register.handleAlertWindow();
        register.clickClientsMenu();
        register.enterUserToSearch('testing@test.com');
        register.clickDeleteUserButton();
        register.clickCancelNowRadioBtn();
        register.clickOnButton('Continue');
        cy.Logout();
      }
    });
  });

  //BAT-2336 --> FIXED ON 14 JUNE 2022
  it('Reactivate the Cancelled Account', () => {
    cy.url().then((url) => {
      if (url.includes('app.batchdialer.com')) {
        cy.log('Not performing Account Reactivation on Production');
      } else {
        login.verifyCloseApp();
        login.enterEmailtoSignin('testing@test.com');
        login.enterPasswordToSignin('Fleek@2016');
        login.clickTermsCheckBox();
        login.clickSigninButton();
        register.verifyAccountReactivationPage();
        register.choosePlan('Multi-Line Dialer'); //Single Line Dialer
        register.verifyPlanPrice();
        register.enterCardDetailsForSignUp(
          Cypress.env('CardName'),
          Cypress.env('CardNumber'),
          Cypress.env('ExpiryDate'),
          Cypress.env('CVC'),
          Cypress.env('Country'),
          Cypress.env('BillingZip'),
          Cypress.env('Coupon')
        );
        register.enterBillingAddress('Columbus');
        register.selectBillingAddressFromSuggestion(Cypress.env('BillingZip'),'New York');
        register.clickAgreeCheckbox();
        register.verifySubscribedNowBtnEnabled();
        register.clickSubscribeBtn();
        cy.waitFor(cy.get('.main_sec', { timeout: 60000 }));
        ignoreSpeedTestPopup();
        login.verifySuccessfullLogin();
      }
    });
  });
});
