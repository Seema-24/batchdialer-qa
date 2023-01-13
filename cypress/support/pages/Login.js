const emailInputField = 'input[name="email"]';
const passwordInputField = 'input[name="password"]';
const termsCheckBox = '.terms-row input';
const signinButton = '.full_width_input [type="submit"]';
const dashboardProfilePic = '.profile_pic';
const logoutBtn = 'span[href*="logout"] div';
const forgetPassword = '.login-forgot-link';
const signUpBtn = 'a[href*="register"]';
const errorMessage = '.Toastify__toast--error';

export default class Login {
  enterEmailtoSignin(email) {
    cy.get(emailInputField).clear().type(email);
  }

  enterPasswordToSignin(pswd) {
    cy.get(passwordInputField).clear().type(pswd);
  }

  clickTermsCheckBox() {
    cy.get(termsCheckBox).check();
  }

  clickSigninButton() {
    cy.get(signinButton).click();
  }

  verifySignInButtonEnabled() {
    cy.get(signinButton).should('be.enabled');
  }

  verifySignInButtonDisabled() {
    cy.get(signinButton).should('be.disabled');
  }

  verifySuccessfullLogin() {
    cy.get(dashboardProfilePic, { timeout: 20000 }).should('be.visible');
  }

  logout() {
    cy.visit('/logout/');
  }

  clickForgetPassword() {
    cy.get(forgetPassword).click();
  }

  verifyForgetPasswordPage() {
    cy.url().should('contain', 'forgot');
  }

  clickSignUpBtn() {
    cy.get(signUpBtn).click();
  }

  verifySignUpPage() {
    cy.url().should('contain', 'register');
  }

  verifyEmailField() {
    cy.get(emailInputField).should('be.visible');
  }

  verifyPasswordField() {
    cy.get(passwordInputField).should('be.visible');
  }

  verifyLoginButton() {
    cy.get(signinButton).should('be.visible');
  }

  verifySignupButton() {
    cy.get(signUpBtn).should('be.visible');
  }

  verifyForgetPassword() {
    cy.get(forgetPassword).should('be.visible');
  }

  verifyErrorMessage(message) {
    cy.get(errorMessage).should('contain.text', message);
  }

  verifyCloseApp() {
    cy.get('body').then(($body) => {
      if($body.find(dashboardProfilePic).length) {
        cy.logout();
      }
    })
  }
}
