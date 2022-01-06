const emailField = '#user_email';
const passwordField = '#user_password';
const signInBtn = 'input[value="Sign in"]';
const profile = '.profile-wrap';
const leadsMenu = 'a[controller="leads"]';
const leadsEmail = '.lead-email.lead-email-value';
const freeTrialBtn = `//span[@class="elementor-button-text"][text()="START YOUR 7-DAY FREE TRIAL"]`;

export default class FirstPromoter {
  enterEmail(email) {
    cy.get(emailField).type(email);
  }

  enterPassword(password) {
    cy.get(passwordField).type(password);
  }

  clickSignInBtn() {
    cy.get(signInBtn).click();
  }

  verifySuccessFulLogin() {
    cy.get(profile).should('be.visible');
  }

  clickLeadsMenu() {
    cy.get(leadsMenu).click();
  }

  verifyReisteredAccount(email) {
    cy.get(leadsEmail).should('contain.text', email);
  }

  clickFreeTrialBtn() {
    cy.xpath(freeTrialBtn).first().click();
  }
}
