import Login from '../support/pages/Login';
import Register from '../support/pages/Register';
import Reseller from '../support/pages/ResellerAdmin';
import { ignoreSpeedTestPopup } from '../support/Utils';

const reseller = new Reseller();
const login = new Login();
const register = new Register();
let fixtureData;
let testData;
const randomNumber = Math.floor(Math.random() * 100000);
const email = 'testing+' + randomNumber + '@test.com';

describe('Reseller Admin', () => {
  before(() => {
    cy.fixture('constants').then((data) => (fixtureData = data));
    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
    cy.visit('/', { failOnStatusCode: false });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
    register.clickSignUpBtn();
    register.enterFirstName('Demo');
    register.enterLastName('testing');
    register.enterCompanyName('Fleek+' + randomNumber + '');
    register.selectIndustry('Other');
    register.enterPhoneNumber('9999999999');
    register.enterEmail(email);
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
    register.clickSubscribeBtn();
    cy.waitFor(cy.get('.main_sec', { timeout: 30000 }));
    ignoreSpeedTestPopup();
    login.verifySuccessfullLogin();
    cy.Logout();
  });

  after(() => {
    cy.Logout();
  });

  it('Verify that Reseller admin user is able to login', () => {
    cy.Login(Cypress.env('resellerUsername'), Cypress.env('resellerPassword'));
    reseller.clickUserTreeDropdown();
    reseller.clickOnUser('First Tenant');
    reseller.clickOnUser('Reseller 1');
    reseller.clickOnResellerUser();
    cy.wait(1000);
    login.verifySuccessfullLogin();
  });

  it('Verify that subscribed client details are reflected in the Clients page of the corresponding Reseller admin', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.verifySearchResult(email);
    reseller.clearSearchField();
  });

  it('Verify that Reseller admin is able to view the Profile', () => {
    reseller.clickProfileDropdown();
    reseller.clickOnDropdownItem('Profile');
    reseller.verifyProfilePageVisible();
  });

  it('Verify that Reseller admin is able to edit their own profile info', () => {
    reseller.enterProfileFieldValue('address', '57 E June St');
    reseller.clickOnButton('Save');
    reseller.verifyToastMessage('Saved');
    reseller.verifyProfileFieldValue('address', '57 E June St');
  });

  it('Verify the search functionality in the Reseller admin CLIENTS page', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.verifySearchResult(email);
    reseller.clearSearchField();
  });

  it('Verify that Reseller admin is able to lock an existing client account', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickOnButton('Lock');
    reseller.verifyToastMessage('Status changed');
    reseller.verifyAccountStatus(email, 'locked');
  });

  it('Verify that Reseller admin is able to unlock an existing locked client account', () => {
    reseller.clickOnButton('Unlock');
    reseller.verifyToastMessage('Status changed');
    reseller.verifyAccountStatus(email, 'active');
    reseller.clearSearchField();
  });

  it('Verify the details General Tab in Edit client', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickAccountEditButton();
    reseller.verifyGeneralTabLabels([
      'Client Name',
      'Contact Name',
      'Referer',
      'Register IP address',
    ]);
    reseller.verifyGeneralTabInputFields(['name', 'firstname', 'lastname']);
    reseller.clickOnButton('CANCEL');
    reseller.clearSearchField();
  });

  it('Verify that all the available users details are displayed in Edit Client Users tab', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickAccountEditButton();
    reseller.clickOnTab('users');
    reseller.verifyEditClientTabContent('users');
    reseller.clickOnButton('CANCEL');
    reseller.clearSearchField();
  });

  it('Verify that Next Billing cycle date is displayed in the Edit Client Billing Tab', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickAccountEditButton();
    reseller.clickOnTab('billing');
    reseller.verifyEditClientTabContent('billing');
    reseller.verifyLabels('Next Billing Cycle');
    reseller.clickOnButton('CANCEL');
    reseller.clearSearchField();
  });

  it('Verify that Reseller admin is able to update the Billing address of a client', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickAccountEditButton();
    reseller.clickOnTab('address');
    reseller.verifyEditClientTabContent('address');
    reseller.enterBillToName('Test User');
    reseller.enterAddress('57 E June St');
    reseller.enterCity('Mesa');
    reseller.selectState('Arizona');
    reseller.enterZip('85201');
    reseller.enterPhone('9999999999');
    reseller.clickOnButton('SAVE');
    reseller.verifyToastMessage('Client saved');
  });

  it('Vefiy that Reseller admin is able to add an IP address in which a client is registered to BLACKLIST through Edit Client General Tab', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickAccountEditButton();
    reseller.clickOnTab('general');
    reseller.verifyEditClientTabContent('general');
    reseller.clickOnButton('Add to Blacklist');
    reseller.verifyToastMessage('Added');
    cy.wait(1000);
    reseller.clickOnButton('Remove from Blacklist');
    reseller.verifyToastMessage('Removed');
    reseller.clickOnButton('CANCEL');
    reseller.clearSearchField();
  });

  it('Verify that Reseller admin is able to delete an existing client account', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery(email);
    cy.wait(1000);
    reseller.clickClientDeleteButton(email);
    reseller.verifyToastMessage('Client deleted');
  });
});
