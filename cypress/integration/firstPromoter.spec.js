import FirstPromoter from '../support/pages/FirstPromoter';
import Login from '../support/pages/Login';
import Register from '../support/pages/Register';
import { ignoreSpeedTestPopup } from '../support/Utils';

const firstPromoter = new FirstPromoter();
const register = new Register();
const login = new Login();

describe('First Promoter Flow', () => {
  after(() => {
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      data.firstPromoterEmail = parseInt(data.firstPromoterEmail) + 1;
      cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
    });
  });

  describe('Register User and Verify in First Promoter', () => {
    it('Verify Trial Registration redirection from Product Overview page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickProductOverviewItem();
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Industries -> Real Estate page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickIndustiresSubMenuItem('real-estate');
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Industries -> Collections page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickIndustiresSubMenuItem('collections');
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Industries -> Solar Sales page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickIndustiresSubMenuItem('solar-sales');
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Industries -> Roofing Sales page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickIndustiresSubMenuItem('roofing-sales');
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Pricing page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickPricingMenuItem();
      firstPromoter.clickPricingTrialButton();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from FAQ page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickFaqMenuItem();
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Resources -> Demo Request page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickResourcesSubMenuItem('demo-request');
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

    it('Verify Trial Registration redirection from Resources -> Blog page', () => {
      cy.visit('https://www.batchdialer.com/?fpr=6vu4l');
      firstPromoter.clickResourcesSubMenuItem('blog');
      firstPromoter.clickFreeTrialBtn();
      firstPromoter.verifyRedirectedUrl(
        'https://app.batchdialer.com/register_trial/?fpr=6vu4l&_fp_ref_id=6vu4l'
      );
    });

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
      register.enterBillingAddress('63 East June Street, Mesa, AZ, USA');
      cy.wait(1000);
      register.selectBillingAddressFromSuggestion(
        '63 East June Street, Mesa, AZ, USA'
      );
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
