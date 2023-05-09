import Login from '../../support/pages/Login';
import { ignoreSpeedTestPopup, selectAgentStatus, verifyReactivateAccount } from '../../support/Utils';

const login = new Login();
let testData;

describe('Login Flow', () => {
  beforeEach(() => {
    cy.fixture('testData').then((data) => (testData = data));
    cy.visit('/', { failOnStatusCode: false });
  });

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Verify elements of login page', () => {
    login.verifyEmailField();
    login.verifyPasswordField();
    login.verifyLoginButton();
    login.verifySignupButton();
    login.verifyForgetPassword();
  });

  it('Login with Incorrect Credentials', () => {
    login.enterEmailtoSignin('test2ing@email.com');
    login.enterPasswordToSignin('Fleek@2016');
    login.clickTermsCheckBox();
    login.clickSigninButton();
    login.verifyErrorMessage('Login or password is not correct');
  });

  it('Verify the Forget Password Button', () => {
    login.clickForgetPassword();
    login.verifyForgetPasswordPage();
  });

  it('Verifies the Sign Up Button', () => {
    login.clickSignUpBtn();
    login.verifySignUpPage();
  });

  it('Verify that when user check the I agree the Terms of Service & Privacy Policy checkbox then LOGIN button should enable', () => {
    login.verifySignInButtonDisabled();
    login.clickTermsCheckBox();
    login.verifySignInButtonEnabled();
  });

  it('Verify that Locked account should give error when trying to Login', () => {
    cy.url().then((url) => {
      let lockedAccount;
      let password;
      if (url.includes('qa.int.batchdialer.com')) {
        lockedAccount = 'anil+4@test.com';
        password = Cypress.env('password');
      } else {
        lockedAccount = 'martinj@test.com';
        password = 'Test@123';
      }
      login.enterEmailtoSignin(lockedAccount);
      login.enterPasswordToSignin(password);
      login.clickTermsCheckBox();
      login.clickSigninButton();
      login.verifyErrorMessage(
        'This client account is locked. Please contact support'
      );
    });
  });

  it('SuccessFully Login', () => {
    verifyReactivateAccount();
    login.enterEmailtoSignin(Cypress.env('username'));
    login.enterPasswordToSignin(Cypress.env('password'));
    login.clickTermsCheckBox();
    login.clickSigninButton();
    login.verifySuccessfullLogin();
  });
});
