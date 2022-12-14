import { ignoreSpeedTestPopup } from '../Utils';

const signUpBtn = 'a[href*="register"]';
const firstName = 'input[name="firstname"].form-control';
const lastName = 'input[name="lastname"].form-control';
const companyName = 'input[name="companyname"].form-control';
const industry = 'select[name="industry"].form-control';
const phoneNumber = 'input[name="phonenumber"].form-control';
const profilePhoneField = 'input[name="phone"].form-control';
const email = 'input[name="email"].form-control';
const password = 'input[name="password"]';
const confirmPassword = 'input[name="password2"].form-control';
const continueToPlan = 'button[type="submit"]';
const dialerPlan = (x) =>
  "//div[@class='plan'][contains(.,'" + x + "')]//button";
const requiredFields = (validate) =>
  "//span[@class='error-msg'][text()='" + validate + "']";
const duplicateEmail =
  "//div[@class='Toastify__toast-body'][contains(.,'Email is already used')]";
const nameOnCard = 'input[name="name"]';
const cardNumberField =
  '.CardNumberField-input-wrapper input[name="cardnumber"]';
const expirydate = 'input[name="exp-date"]';
const cvc = 'input[name="cvc"]';
const countryDropdown = '.ss-select';
const countriesOption = '.ss-select-option';
const billingZip = 'input[name="zip"]';
const agreeCheckbox = '.custom_checkbox .checkmark';
const subscribeBtn = '.card_form button[type="button"]';
const couponField = 'input[name="coupon"]';
const applyCouponBtn = '.summary .value1 button';
const planPrice = '.summary .value:not(.long)';
const userTreeDropdown = '.profile_drop.dropdown';
const userDropdown =(option) => `//div[@class="user__dropdown" and text()="${option}"]`;
const userDropdownMenu = '.dropdown img[alt="Menu"]';
const resellerUserTree = (user) =>
  `//div[@class="group-row__center__title" and text()="${user}"]/parent::div[@class="group-row__center"]/preceding-sibling::div`
const reseller = `//div[@class="group-row-role__left__title"][contains(text(),"First Tenant Reseller 1")]`;
const clientsMenu = 'a[title="Clients"]';
const searchBox = 'input[placeholder*="Search"]';
const deleteUserButton = 'img[src*="delete"]';
const accountReactivationPage = '.main_signuparia.reactivation .content_contain';
const hiddenFields = (fieldName) => `input[name="${fieldName}"]`;
const toast = '.Toastify__toast-body';
const fileInput = 'input[type="file"]';
const profileAvatar = '.profile-content div.avatar';
const profilePictureAdded = '.profile-content img.avatar';
const cancelNowRadioBtn =
  '//label[text()="Cancel the account now (fraud etc.)"]//span[@class="checkmark"]';
const decryptedPassword = 'input[name="password"][type="text"]';
const eyeButton = '.view_password';
const planSelectionWindow = '.plan-selection';
const agentCountSlider = '.rc-slider-handle';
const agentCount = '.agents .title';
const errorMsg = '.error-msg';
const paymentsPage = '.payment-details';
const billingAddressInput = '.google-autocomplete-wrapper input';
const billingAddressOption = '.google-autocomplete-option';
const paymentSummary = '.main_signuparia .payment_modal_register';
const cardEditBtn = '.billing-user-info__payment__edit';
const city = 'input[name="city"]';

export default class Register {
  clickSignUpBtn() {
    cy.get(signUpBtn).click();
  }

  verifyRegistrationUrl() {
    cy.url().should('eq', `${Cypress.config().baseUrl}/register/`);
  }

  enterFirstName(name) {
    cy.get(firstName).clear().type(name);
  }

  verifyFirstNameField() {
    cy.get(firstName).should('be.visible');
  }

  enterLastName(name) {
    cy.get(lastName).clear().type(name);
  }

  verifyLastNameField() {
    cy.get(lastName).should('be.visible');
  }

  enterCompanyName(name) {
    cy.get(companyName).type(name);
  }

  verifyCompanyNameField() {
    cy.get(companyName).should('be.visible');
  }

  enterPhoneNumber(phone) {
    cy.get(phoneNumber).clear().type(phone);
  }

  verifyPhoneNumberField() {
    cy.get(phoneNumber).should('be.visible');
  }

  enterProfilePhoneNumber(phone) {
    cy.get(profilePhoneField).clear().type(phone);
  }

  enterEmail(mail) {
    cy.get(email).type(mail);
  }

  verifyEmailAddressField() {
    cy.get(email).should('be.visible');
  }

  enterPassword(pswd) {
    cy.get(password).clear().type(pswd);
  }

  verifyPasswordField() {
    cy.get(password).should('be.visible');
  }

  enterConfirmPassword(pswd) {
    cy.get(confirmPassword).clear().type(pswd);
  }

  verifyConfirmPasswordField() {
    cy.get(confirmPassword).should('be.visible');
  }

  selectIndustry(Industry) {
    cy.get(industry).select('Other');
  }

  verifyIndustryDropdown() {
    cy.get(industry).should('be.visible');
  }

  clickContinueToPlanBtn() {
    cy.get(continueToPlan).click();
  }

  verifyContinueToPlanButton() {
    cy.get(continueToPlan).should('be.visible');
  }

  choosePlan(plan) {
    cy.xpath(dialerPlan(plan)).click();
  }

  verifyRequiredFields(validate) {
    cy.xpath(requiredFields(validate)).should('be.visible');
  }

  verifyDecryptedPassword() {
    cy.get(decryptedPassword).should('be.visible');
  }

  clickEyeButton() {
    cy.get(eyeButton).first().click();
  }

  verifyPlanSelectionWindow() {
    cy.get(planSelectionWindow).should('be.visible');
  }

  verifyDuplicateEmail() {
    // cy.xpath(duplicateEmail).should('be.visible');
    cy.get('.Toastify__toast-body').then((toast) => {
      expect(toast.text().toLowerCase()).to.contain('email is already used');
    });
  }

  verifyAgentCount(count) {
    cy.get(agentCount).first().should('have.text', `${count} Agents`);
  }

  increaseAgentCount(count) {
    cy.get(agentCountSlider).first().click();
    for (let i = 1; i < count; i++) {
      cy.get(agentCountSlider).first().type('{rightarrow}');
    }
  }

  verifyPlanPrice() {
    cy.get(planPrice).then((price) => {
      expect(price.text()).to.not.equal('$0.00');
    });
  }

  enterNameOnCard(name) {
    cy.get(nameOnCard).type(name);
  }

  enterCardNumber(cardNo) {
    const iframe = cy
      .get('iframe[title*="Secure card number"]')
      .its('0.contentDocument')
      .should('exist')
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
    iframe.find(cardNumberField).type(cardNo);
  }

  enterExpiryDate(date) {
    const iframe = cy
      .get('iframe[title*="Secure expiration date"]')
      .its('0.contentDocument')
      .should('exist')
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
    iframe.find(expirydate).type(date);
  }

  enterCVC(cvcNo) {
    const iframe = cy
      .get('iframe[title*="Secure CVC"]')
      .its('0.contentDocument')
      .should('exist')
      .its('body')
      .should('not.be.undefined')
      .then(cy.wrap);
    iframe.find(cvc).type(cvcNo);
  }

  selectCountry(country) {
    cy.get(countryDropdown).click();
    cy.get(countriesOption).then((option) => {
      for (let i = 0; i < option.length; i++) {
        if (option[i].textContent.trim() === country) {
          option[i].click();
          break;
        }
      }
    });
  }

  enterBillingZip(zip) {
    cy.get(billingZip).type(zip);
  }

  clickAgreeCheckbox() {
    cy.get(agreeCheckbox).click();
  }

  enterCardDetailsForSignUp(
    CardName,
    CardNumber,
    CardExpiry,
    CardCVC,
    Country,
    BillingZip,
    Coupon
  ) {
    cy.url().then((url) => {
      // if (url.includes('app')) {
      //   this.enterCoupon(Coupon);
      //   this.clickApplyCouponBtn();
      // }
      this.enterNameOnCard(CardName);
      this.enterCardNumber(CardNumber);
      this.enterExpiryDate(CardExpiry);
      this.enterCVC(CardCVC);
      this.selectCountry(Country);
      // this.enterBillingZip(BillingZip);
    });
  }

  clickSubscribeBtn() {
    cy.get(subscribeBtn).click({force:true});
  }

  verifySubscribedNowBtnEnabled() {
    cy.get(subscribeBtn).should('be.enabled');
  }

  verifySubscribedNowBtnDisabled() {
    cy.get(subscribeBtn).should('be.disabled');
  }

  enterCoupon(coupon) {
    cy.get(couponField).type(coupon);
  }

  verifyCouponUppercase(coupon) {
    cy.get(couponField).should('have.value', coupon);
  }

  clickApplyCouponBtn() {
    cy.get(applyCouponBtn).click();
  }

  clickUserTreeDropdown(option) {
    cy.get(userTreeDropdown).click();
    cy.xpath(userDropdown(option)).click();
  }

  clickOnUser(user) {
    cy.xpath(resellerUserTree(user)).click();
  }

  clickOnResellerUser() {
    cy.xpath(reseller).click();
  }

  handleAlertWindow() {
    cy.on('	window:alert', (str) => {
      expect(str).to.equal('Login?');
    });
    cy.on('window:confirm', () => true);
  }

  clickClientsMenu() {
    cy.get(clientsMenu).click({ force: true });
  }

  enterUserToSearch(user) {
    cy.get(searchBox).clear().type(user);
    cy.wait(1000);
  }

  clickDeleteUserButton() {
    cy.get(userDropdownMenu).click()
    cy.contains('Delete').click();
  }

  verifyAccountReactivationPage() {
    cy.get(accountReactivationPage).should('be.visible');
  }

  verifyAffiliatePartnerField() {
    cy.get(hiddenFields('cf_affiliate_partner')).should('exist');
  }

  verifySignupPathField() {
    cy.get(hiddenFields('cf_signup_path')).should('exist');
  }

  verifyUtmCampaignField() {
    cy.get(hiddenFields('cf_utm_campaign')).should('exist');
  }

  verifyUtmSourceField() {
    cy.get(hiddenFields('cf_utm_source')).should('exist');
  }

  verifyUtmMediumField() {
    cy.get(hiddenFields('cf_utm_medium')).should('exist');
  }

  verifyToastMessage(message) {
    cy.get(toast, { timeout: 20000 }).should('contain.text', message);
  }

  clickOnButton(buttonName) {
    cy.get('button').then((Btn) => {
      for (let i = 0; i < Btn.length; i++) {
        if (Btn[i].textContent.trim() === buttonName) {
          cy.get(Btn[i]).click();
          break;
        }
      }
    });
  }

  clickOnChangePasswordBtn() {
    this.clickOnButton('Change');
  }

  verifyFirstNameField() {
    cy.get(firstName).should('be.visible');
  }

  uploadFile(fileName) {
    cy.get(fileInput).attachFile(fileName);
    cy.wait(2000);
  }

  verifyAddedProfileAvatar() {
    cy.get(profilePictureAdded).should('have.attr', 'src');
  }

  verifyBeforeProfileAvatar() {
    cy.get(profileAvatar).should('not.have.attr', 'src');
  }

  verifyProfilePictureChange(fileName) {
    cy.get(profilePictureAdded).then((pic) => {
      const firstPictureSrc = pic.attr('src');
      this.uploadFile(fileName);
      this.clickOnButton('CROP');
      this.clickOnButton('Save');
      cy.wait(1000);
      cy.reload();
      ignoreSpeedTestPopup();
      cy.get(profilePictureAdded).then((pic) => {
        const secondPictureSrc = pic.attr('src');
        expect(firstPictureSrc).to.not.equal(secondPictureSrc);
      });
    });
  }

  clickCancelNowRadioBtn() {
    cy.xpath(cancelNowRadioBtn).click();
  }

  verifyErrorMessage(msg) {
    cy.get(errorMsg).should('have.text', msg);
  }

  verifyPaymentsPage() {
    cy.get(paymentsPage).should('be.visible');
  }

  enterBillingAddress(address) {
    cy.get(billingAddressInput).type(address, { delay: 100 });
  }

  selectBillingAddressFromSuggestion(zip,city) {
    cy.get(billingAddressOption).first().click({ force : true });
    cy.wait(1000);
    cy.get('.card_form').then(($form) => {
      if($form.find(billingZip).length){
        this.enterCity(city);
        this.enterBillingZip(zip);
        cy.wait(500);
      }
    })
  }

  verifyPaymentSummaryVisible() {
    cy.get(paymentSummary, { timeout: 60000 }).should('be.visible');
  }

  clickCardEditBtn() {
    cy.get(cardEditBtn).click();
  }

  enterCity(name) {
    cy.get(city).clear().type(name);
  }
}
