import Login from '../support/pages/Login';
import Reseller from '../support/pages/ResellerAdmin';

const reseller = new Reseller();
const login = new Login();
let fixtureData;
let testData;

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
    reseller.enterSearchQuery('anil.kumar+1@fleekitsolutions.com');
    cy.wait(1000);
    reseller.verifySearchResult('anil.kumar+1@fleekitsolutions.com');
    reseller.clearSearchField();
  });

  it('Verify that Reseller admin is able to lock an existing client account', () => {
    reseller.clickOnMenu('Clients');
    reseller.enterSearchQuery('anil.kumar+1@fleekitsolutions.com');
    cy.wait(1000);
    reseller.clickOnButton('Lock');
    reseller.verifyToastMessage('Status changed');
    reseller.verifyAccountStatus('locked');
  });

  it('Verify that Reseller admin is able to unlock an existing locked client account', () => {
    reseller.clickOnButton('Unlock');
    reseller.verifyToastMessage('Status changed');
    reseller.verifyAccountStatus('active');
    reseller.clearSearchField();
  });
});
