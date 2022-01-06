import FirstPromoter from '../support/pages/FirstPromoter';
import Login from '../support/pages/Login';
import Register from '../support/pages/Register';
import { ignoreSpeedTestPopup } from '../support/Utils';

const firstPromoter = new FirstPromoter();
const register = new Register();
const login = new Login();
const randomNumber = Math.floor(Math.random() * 10000);
const email = 'testing+' + randomNumber + '@test.com';

describe('First Promoter Flow', () => {
  after(() => {
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      data.firstPromoterEmail = parseInt(data.firstPromoterEmail) + 1;
      cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
    });
  });

  describe('Register User and Verify in First Promoter', () => {
    it('Register New Account', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickFreeTrialBtn();
      register.enterFirstName('Demo');
      register.enterLastName('testing');
      register.enterCompanyName('BatchService');
      register.selectIndustry('Other');
      register.enterPhoneNumber('9999999999');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        let count = parseInt(data.firstPromoterEmail) + 1;
        const email = `test+${count}@test.com`;
        register.enterEmail(email);
      });
      register.enterPassword('Fleek@2016');
      register.enterConfirmPassword('Fleek@2016');
      register.clickContinueToPlanBtn();
      register.choosePlan('Single Line Dialer'); //Multi-Line Dialer
      register.enterCardDetailsForSignUp(
        Cypress.env('CardName'),
        Cypress.env('CardNumber'),
        Cypress.env('ExpiryDate'),
        Cypress.env('CVC'),
        Cypress.env('Country'),
        Cypress.env('BillingZip')
      );
      register.clickAgreeCheckbox();
      register.clickSubscribeBtn();
      cy.waitFor(cy.get('.main_sec', { timeout: 30000 }));
      ignoreSpeedTestPopup();
      login.verifySuccessfullLogin();
    });

    it('Login to FirstPromoter and verify Register Account is reflecting', () => {
      cy.visit('https://batchdialer.firstpromoter.com/users/sign_in');
      firstPromoter.enterEmail('sandeepk@batchservice.com');
      firstPromoter.enterPassword('Kumar@12345');
      firstPromoter.clickSignInBtn();
      firstPromoter.verifySuccessFulLogin();
      firstPromoter.clickLeadsMenu();
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        let count = parseInt(data.firstPromoterEmail) + 1;
        const email = `test+${count}@test.com`;
        firstPromoter.verifyReisteredAccount(email);
      });
    });
  });
});
