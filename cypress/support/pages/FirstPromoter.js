const emailField = '#user_email';
const passwordField = '#user_password';
const signInBtn = 'input[value="Sign in"]';
const profile = '.profile-wrap';
const leadsMenu = 'a[controller="leads"]';
const leadsEmail = '.lead-email.lead-email-value';
const freeTrialBtn = `//span[@class="elementor-button-text"][text()="START YOUR 7-DAY FREE TRIAL"]`;
const pricingTrialButton =
  '//span[@class="elementor-button-text"][text()="START 7-DAY FREE TRIAL"]';
const productOverview =
  '.elementor-nav-menu .menu-item a[href="/product-overview"]';
const industriesMenu =
  '//ul[@class="elementor-nav-menu"]//a[@class="elementor-item has-submenu"][text()="Industries"]';
const subMenuItems = (subMenu) => `.sub-menu a[href="/${subMenu}"]`;
const pricingMenuItem = 'a[href="/pricing"]';
const faqMenuItem = 'a[href="/faq"]';
const resourcesMenu =
  '//ul[@class="elementor-nav-menu"]//a[@class="elementor-item has-submenu"][text()="Resources"]';

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

  clickProductOverviewItem() {
    cy.get(productOverview).first().click();
  }

  verifyRedirectedUrl(url) {
    cy.url().then((URL) => {
      expect(URL).to.equal(url);
    });
  }

  clickIndustiresSubMenuItem(subMenu) {
    cy.xpath(industriesMenu).first().click();
    cy.get(subMenuItems(subMenu)).first().click({ force: true });
  }

  clickPricingMenuItem() {
    cy.get(pricingMenuItem).first().click();
  }

  clickPricingTrialButton() {
    cy.xpath(pricingTrialButton).click();
  }

  clickFaqMenuItem() {
    cy.get(faqMenuItem).first().click();
  }

  clickResourcesSubMenuItem(subMenu) {
    cy.xpath(resourcesMenu).first().click();
    cy.get(subMenuItems(subMenu)).first().click({ force: true });
  }
}
