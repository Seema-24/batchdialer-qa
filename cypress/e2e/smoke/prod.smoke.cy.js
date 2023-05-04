import Agent from "../../support/pages/Agent";
import Campaign from "../../support/pages/Campaigns";
import Contacts from "../../support/pages/Contacts";
import Dashboard from "../../support/pages/Dashboard";
import Dialer from "../../support/pages/Dialer";
import Login from "../../support/pages/Login";
import PhoneNum from "../../support/pages/PhoneNum";
import Register from "../../support/pages/Register";
import Report from "../../support/pages/Report";
import Setup from "../../support/pages/Setup";
import Suprevisor from "../../support/pages/Supervisor";
import User from "../../support/pages/User";
import { closeDialogBox, getDate, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus, verifyCloseApp } from "../../support/Utils";

let fixtureData,testData,count;
const randomNumber = Math.floor(Math.random() * 1000);
const email = 'testingUser' + randomNumber + '@test.com';
const agentEmail = 'random' + randomNumber + '@email.com';
const supervisorEmail = 'random' + randomNumber + 1 + '@email.com';
const adminWithoutCallingEmail = 'random' + randomNumber + 2 + '@test.com';

const login = new Login();
const register = new Register();
const addUser = new User();
const dashboard = new Dashboard();
const agent = new Agent();
const addCamp = new Campaign();
const contact = new Contacts();
const dial = new Dialer();
const addNum = new PhoneNum();
const report = new Report();
const suprevisor = new Suprevisor();
const setup = new Setup();

describe('Registration & Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    closeDialogBox();
    cy.fixture('testData').then((data) => (testData = data));
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
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
    register.enterEmail(email);
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
    register.enterEmail(email);
    register.enterPassword('Fleek@2016');
    register.enterConfirmPassword('Fleek@2016');
    register.clickContinueToPlanBtn();
    register.verifyPlanSelectionWindow();
    register.choosePlan('Single Line Dialer');
    register.verifyPaymentsPage();
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
    register.enterEmail(email);
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
    register.enterEmail(email);
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
    register.enterEmail(email);
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
    register.enterEmail(email);
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
    register.enterEmail(email);
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

  it('Verify elements of login page', () => {
    register.closePopUp();
    login.verifyEmailField();
    login.verifyPasswordField();
    login.verifyLoginButton();
    login.verifySignupButton();
    login.verifyForgetPassword();
  });
  
  it('Login with Incorrect Credentials', () => {
    register.closePopUp();
    login.enterEmailtoSignin('test2ing@email.com');
    login.enterPasswordToSignin('Fleek@2016');
    login.clickTermsCheckBox();
    login.clickSigninButton();
    login.verifyErrorMessage('User test2ing@email.com not found');
  });
  
  it('Verify the Forget Password Button', () => {
    register.closePopUp();
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
    let lockedAccount = 'martinj@test.com';
    let password = 'Test@123';
    register.closePopUp();
    login.enterEmailtoSignin(lockedAccount);
    login.enterPasswordToSignin(password);
    login.clickTermsCheckBox();
    login.clickSigninButton();
    login.verifyErrorMessage(
      'This client account is locked. Please contact support'
    );
  });

  it('SuccessFully Login', () => {
    verifyCloseApp();
    register.closePopUp();
    login.enterEmailtoSignin(Cypress.env('username'));
    login.enterPasswordToSignin(Cypress.env('password'));
    login.clickTermsCheckBox();
    login.clickSigninButton();
    login.verifySuccessfullLogin();
  });

  it('Setup Account', () => {
    const [agentFirstName, agentlastName] = testData.agent.split(' ');
    const [supervisorFirstName, supervisorlastName] =
      testData.supervisor.split(' ');
    const [contactFirstName, contactlastName] = testData.Contact.split(' ');
    const [adminFirstName, adminlastName] =
      testData.adminWithoutCalling.split(' ');

    ignoreSpeedTestPopup();
    setup.addNewAgent(
      agentFirstName,
      agentlastName,
      agentEmail,
      testData.password,
      '0123456789'
    );
    setup.addNewSupervisor(
      supervisorFirstName,
      supervisorlastName,
      supervisorEmail,
      testData.password,
      '0123456789'
    );
    setup.addNewAdminWithoutCalling(
      adminFirstName,
      adminlastName,
      adminWithoutCallingEmail,
      testData.password,
      '9999999999'
    );
    setup.getAdminName();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      setup.BuyNewPhoneNumber(data.AdminName);
    });
    setup.getPhoneNumber();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      setup.assignNumberToAgent(data.Number, data.AdminName);
    });
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      setup.createCampaign(
        testData.campaign,
        [
          'Abandoned',
          'Answering Machine',
          'Busy',
          'Call Back',
          'Disconnected Number',
          'Do Not Call',
          'No Answer',
          'Not Interested',
          'Successful sale',
          'Unknown',
          'Voicemail',
        ],
        data.Number,
        data.agent
      );
    });
    cy.wait(2000);
    setup.addNewContact(contactFirstName, contactlastName);
  });
}); 

describe('Add User', () => {
  before(() => {
    cy.fixture('constants')
      .then((data) => (fixtureData = data))
      .then(() => {
        cy.visit('/', { failOnStatusCode: false });
      });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
    verifyCloseApp();
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
    addUser.getPhoneNumber();
  });

  it('Should Add User for Agent role', () => {
    addUser.clickingOnUserOption();
    cy.wait(3000);
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Agent');
    addUser.enterFirstName(fixtureData.userFirstname);
    addUser.enterLastName(fixtureData.userLastname + randomNumber.toString());
    addUser.enterEmail(
      fixtureData.userEmail.replace(
        'automation',
        'automation' + randomNumber.toString()
      )
    );
    addUser.enterPassword(fixtureData.userPassword);
    addUser.enterPhoneNumber('0123456789');
    addUser.clickSaveButton();
    addUser.verifySuccessToast();
  });

  it('Verify that Logout and Change presence icons are visible in USERS page', () => {
    addUser.verifyChangePresenceVisible(
      fixtureData.userFirstname,
      fixtureData.userLastname + randomNumber.toString()
    );
    addUser.verifyUserLogoutIconVisible();
  });

  it('Verify that admin user is able to change the Agent status from USERS page', () => {
    addUser.clickChangePresenceIcon();    
    addUser.verifyDialogOpen();
    addUser.verifyModalTitle("Change User's Presence");
    addUser.clickStatusDropdown();
    addUser.selectStatusOption('Offline');
    addUser.clickOnButton('Continue'); 
    addUser.verifyToastMessage('Presence has been changed');
  });
  
  it('Verify that admin user is able to enable/disble Edit contact info feature for the agent user', () => {
    addUser.clickingOnUserOption();
    addUser.searchUser(
      fixtureData.userFirstname +
        ' ' +
        fixtureData.userLastname +
        randomNumber.toString()
    );
    cy.wait(4000);
    addUser.clickUserEditButton(
      fixtureData.userFirstname,
      fixtureData.userLastname + randomNumber.toString()
    );
    addUser.clickAgentContactEditAccess();
    addUser.clickOnButton('SAVE');
    addUser.verifyToastMessage('Saved');
    cy.wait(1000);
    addUser.clickUserEditButton(
      fixtureData.userFirstname,
      fixtureData.userLastname + randomNumber.toString()
    );
    addUser.clickAgentContactEditAccess();
    addUser.clickOnButton('SAVE');
    addUser.verifyToastMessage('Saved');
  });

  it('Should delete the added user', () => {
    addUser.clickingOnUserOption();
    addUser.searchUser(
      fixtureData.userFirstname +
        ' ' +
        fixtureData.userLastname +
        randomNumber.toString()
    );
    cy.wait(2000);
    addUser.deleteAddedContact(
      fixtureData.userFirstname,
      fixtureData.userLastname + randomNumber.toString()
    );
    addUser.handleWindowAlert('Delete user?');
    addUser.verifyDeletedToast();
  });

  it('verify Dropdowns present on user page', function () {
    addUser.verifyRoleDropdown();
    addUser.verifyGroupsDropdown();
    addUser.verifyStatusFilterDropdown();
    addUser.verifyAddNewUserButton();
  });

  it('Role dropdown should show the selected role', function () {
    addUser.clickRoleDropdown();
    addUser.clickAdminstratorRole('Administrators');
  });

  it('verify Add New Supervisor Page Element', function () {
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Supervisor');
    addUser.verifyFirstName();
    addUser.verifyLastName();
    addUser.verifyRoleDropdownNewUser();
    addUser.verifyEmailField();
    addUser.verifyPasswordField();
    addUser.verifyPhoneNumber();
    addUser.verifyCancelButton();
    addUser.verifySaveButton();
    addUser.verifySecondPhoneField();
    addUser.clickCancelButton();
  });

  it('Verify that all statuses can be deleted, edit and colour changed except pre-defined statuses', () => {
    addUser.clickingOnUserOption();
    addUser.verifyAgentStatusActionMenuNotExist([
      'Available',
      'Break',
      'Lunch',
      'In training',
      'Out of desk',
      'Offline',
      'In Meeting',
      'PrepWork',
      'After Call',
    ]);
  });

  it('verify that clicking on the add status button then an inline input field should be visible along with the save and cancel button', () => {
    addUser.clickingOnUserOption();
    addUser.clickAddAgentStatus();
    addUser.verifyAgentStatusNameField();
    addUser.verifyAgentStatusSaveBtn();
    addUser.verifyAgentStatusCrossBtn();
    addUser.verifyColorPickerVisible();
  });

  it('Agent count should increase when admin add agent', async () => {
    dashboard.clickUserProfile();
    dashboard.clickBilling();
    count = await addUser.getTotalAgentCount();
    cy.log(count);
  });

  it('Create Agent and Verify count', () => {
    addUser.clickingOnUserOption();
    cy.wait(3000);
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Agent');
    addUser.enterFirstName(fixtureData.userFirstname);
    addUser.enterLastName(fixtureData.userLastname + randomNumber.toString());
    addUser.enterEmail(
      fixtureData.userEmail.replace(
        'automation',
        'automation' + randomNumber.toString()
      )
    );
    addUser.enterPassword(fixtureData.userPassword);
    addUser.enterPhoneNumber('0123456789');
    addUser.clickSaveButton();
    addUser.verifySuccessToast();
    dashboard.clickUserProfile();
    dashboard.clickBilling();
    addUser.verifyAgentCount(count);
    addUser.clickingOnUserOption();
    cy.wait(3000);
    addUser.searchUser(
      fixtureData.userFirstname +
        ' ' +
        fixtureData.userLastname +
        randomNumber.toString()
    );
    cy.wait(2000);
    addUser.deleteAddedContact(
      fixtureData.userFirstname,
      fixtureData.userLastname + randomNumber.toString()
    );
  });

});

describe('Agent Profile', function () {
  before(() => {
    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
    cy.fixture('constants').then((data) => (fixtureData = data));

    cy.visit('/', { failOnStatusCode: false });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  });

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    agent.selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Agent Should Login Successfully', () => {
    verifyCloseApp();
    cy.Login(testData.AgentEmail, testData.password);
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Verifies the Dashboard Elements', () => {
    agent.verifyAverageCallDurationBox();
    agent.verifyAverageWaitTimeBox();
    agent.verifyAverageAbandonTimeBox();
    agent.verifyTotalCallsBox();
    agent.verifyTalkingTimeBox();
    agent.verifyRemainingLeadsBox();
    agent.verifyActiveCampaignsBox();
    agent.verifyCallResultsBox();
    agent.verifyCallsSummaryBox();
    agent.verifyTotalCallsGraph();
    agent.verifyAverageCallDurationGraph();
    agent.verifyCallsLocationGraph();
  });

  it('Schedules Follow Up Call for a Contact', () => {
    agent.clickingOnContactOption();
    agent.enterSearch(testData.Contact);
    agent.clickOnContactName(testData.Contact);
    agent.clickFollowUpCall();
    agent.selectDateToFollowUpCall();
    dashboard.selectEventTime();
    cy.wait(1000);
    agent.clickSaveButton();
    cy.wait(1000);
    agent.verifyScheduledFollowUpCall(testData.Contact);
    agent.clickCloseButton();
  });

  it('Add a Note to the Contact', () => {
    agent.clickingOnContactOption();
    agent.enterSearch(testData.Contact);
    agent.clickOnContactName(testData.Contact);
    agent.clickNotesBtn();
    agent.clickAddNewNoteBtn();
    agent.enterNote('Hello');
    cy.wait(500);
    agent.clickSaveButton();
    agent.verifyAddedNote('Hello', 'exist');
  });

  it('Delete the Added Note', () => {
    agent.clickingOnContactOption();
    agent.enterSearch(testData.Contact);
    agent.clickOnContactName(testData.Contact);
    agent.clickNotesBtn();
    agent.clickDeletNoteBtn('Hello');
    agent.verifyAddedNote('Hello', 'not.exist');
  });

  it('Verify The Elements On Campaign Page', () => {
    agent.clickCampaignMenu();
    agent.verifyEquityBox([
      'Active Campaigns',
      'Paused Campaigns',
      'Completed Campaigns',
      'Archived Campaigns',
    ]);
    agent.verifySearchBoxOnCampaign();
    agent.veriffyStatusBtn();
    agent.verifyAgentBtn();
  });
  
  it('Verify Note Page Is Opening On the View Contact', () => {
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.clickOnNotesBtnOnViewContact();
    agent.clickOnAddNewNoteBtn();
    agent.verifyAddNewNotePage();
    agent.clickOnAddNoteCloseBtn();   
  });
  
  it('Verify The Summary Of Agent In Time In Status Of Recent Contacts', () => {
    agent.clickRecentContact();
    agent.clickTimeInStatusButton();
    agent.clickOnAgentDetailsPlusBtn([
      'Answered',
      'Appointments',
      'Leads',
      'Total',
      'Available',
      'Break',
      'Lunch',
      'In training',
      'Out of desk',
      'On Call',
      'Wrap Up Time',
      'In Meeting',
      'Auto Pause',
      'PrepWork',
      'After Call',
    ]);
  });

  it('Verify it open Select Campaign Window when selecting Available Status', () => {
    agent.selectAgentStatus('Available');
    agent.verifySelectCampaignBox();
    agent.selectCampaign(testData.campaign);
    agent.clickConfirmButton();
    agent.verifySoftphoneOpen();
    agent.clickCloseSoftphoneBtn();
  });

  it('Verify The Change Campaign Page Elements', () => {
    closeDialogBox();
    agent.clickOnAgentProfileDropDown();
    agent.clickOnChangeCampaignBtn();
    agent.verifyTesxtOnChangeCampaignPage('Start Calling');
    agent.verifyConfirmBtnOnChangeCamp();
    closeDialogBox();
  });

  it('Verify the Active Campaign count when Agent become available', () => {
    agent.clickingOnContactOption();
    cy.wait(500);
    agent.clickDashboardMenu();
    cy.wait(3000);
    agent.verifyActiveCampaignCount();
  });

  it('Open the Call Result Window when Agent disconnect the Call', () => {
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.clickPhoneNumber();
    agent.clickCallBtn();
    cy.wait(2000);
    agent.clickEndCallBtn();
    cy.wait(1000);
    agent.verifyCallResultWindow();
    agent.selectCallResult('No Answer');
    agent.clickContinueBtn();
  });

  it('Edit the Call Result of Recent Contacts', () => {
    agent.clickRecentContact();
    agent.clickEditRecentContact();
    agent.verifyCallResultWindow();
    agent.chooseEditCallResult('Busy');
    agent.clickContinueBtn();
    cy.wait(2000);
    agent.verifyCallResult('Busy');
    agent.ChooseCallResult('No Answer');
  });

  it('Verify the Total Calls should increase when agent call a contact', () => {
    agent.clickDashboardMenu();
    agent.getTotalCallsCount();
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.clickPhoneNumber();
    agent.clickCallBtn();
    cy.wait(3000);
    agent.clickEndCallBtn();
    agent.verifyCallResultWindow();
    agent.selectCallResult('No Answer');
    agent.clickContinueBtn();
    cy.wait(1000);
    agent.clickDashboardMenu();
    cy.reload();
    ignoreSpeedTestPopup();
    agent.clickingOnContactOption();
    cy.wait(2000);
    agent.clickRecentContact();
    cy.wait(2000);
    agent.clickDashboardMenu();
    cy.wait(1000);
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      agent.verifyTotalCallsCount(data.TotalCallsCount);
    });
  });

  it('Verifies the Call transfer Continue and Cancel Button', () => {
    agent.ChooseCallResult('No Answer');
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.getContactPhoneNumber();
    agent.clickPhoneNumber();
    agent.clickCallBtn();
    cy.wait(2000);
    agent.clickCallTransferBtn();
    agent.clickOnButton('Address Book');
    agent.selectAddressBook();
    agent.verifyConfirmTransferBtn();
    agent.verifyCancelBtn();
    agent.clickBackCursor('Transfer Call');
  });

  it('Verify that notes entered in the NOTES Tab is syncing with the Notes section in the Call Result window', () => {
    contact.clickNotes();
    contact.clickAddNewNotes();
    contact.enterNotes('Testing');
    //contact.clickSavebtn();
    cy.wait(1000)
    agent.clickEndCallBtn();
    agent.verifyDispositionWindowVisible();
    agent.verifyDispositionNoteText('Testing');
    agent.selectCallResult('No Answer');
    agent.enterDispositionNote('testing note');
    agent.selectMood('neutral'); // good and bad
    agent.clickContinueBtn();
    agent.ChooseCallResult('No Answer');
    cy.Logout();
  });

  it('Verify When Admin Assign Campaign to user it should show in agent Profile', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randomNumber.toString());
    addCamp.selectCallResults([
      'Answering Machine',
      'Busy',
      'Call Back'
    ]);
    addCamp.clickAdvancedConfiguration();
    addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Created');
    cy.Logout();
    cy.wait(1000);
    cy.visit('/', { failOnStatusCode: false });
    cy.Login(testData.AgentEmail, testData.password);
    agent.clickCampaignMenu();
    agent.verifyCampaign(fixtureData.campaignName + randomNumber.toString());
    cy.Logout();
    cy.wait(1000);
    cy.visit('/', { failOnStatusCode: false });
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(fixtureData.campaignName + randomNumber.toString());
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    addCamp.verifyArchivedCampaign(
      fixtureData.campaignName + randomNumber.toString(),
      'not.exist'
    );
  });
});

describe('Add Contact flow', () => {
  before(() => {
    cy.exec('del /q "cypress\\fixtures\\Download\\*.*"', { log: true, failOnNonZeroExit: false })
    cy.exec('rm cypress/fixtures/Download/*', { log: true, failOnNonZeroExit: false })

    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
    cy.fixture('constants')
      .then((data) => (fixtureData = data))
      .then(() => {
        cy.visit('/', { failOnStatusCode: false });
      });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
    verifyCloseApp();
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Should Add Contact using Create New option', () => {
    contact.clickingOnContactOption();
    contact.verifyContactExisting('9999999999');
    contact.clickAddNewContactButton();
    contact.selctCreateNewContactOption();
    contact.enterFirstName(fixtureData.userFirstname);
    contact.enterLastName(fixtureData.contactLastname + randomNumber.toString());
    contact.enterAddress('anyAddress');
    contact.enterCity('Tucson');
    contact.selectState('Arizona');
    contact.enterZipCode('85701');
    contact.enterEmail(
      fixtureData.contactEmail.replace(
        'automation-contact',
        'automation-contact' + randomNumber.toString()
      )
    );
    contact.enterPhoneNumber('9999999999');
    contact.clickSaveButton();
    contact.verifySuccessToast();
  });

  it('Should delete the added Contact', () => {
    contact.clickingOnContactOption();
    contact.deleteAddedContacts(
      fixtureData.userFirstname,
      fixtureData.contactLastname + randomNumber.toString()
    );
    contact.handleAlertForDelete();
    contact.verifyDeletedToast();
  });

  it('Verify functionality of a. Activities b. Campaigns c. Notes button', () => {
    contact.clickingOnContactOption();
    contact.enterSearch(testData.Contact);
    contact.clickContactName(testData.Contact);
    contact.verifyContactViewPageVisible();
    contact.clickOnButton('Activities');
    contact.verifyActivityTabOpen();
    contact.clickOnButton('Campaigns');
    contact.verifyCampaignTabOpen();
    contact.clickOnButton('Notes');
    contact.verifyNotesTabOpen();
  });

  it('Should add contact using upload file', () => {
    contact.clickingOnContactOption();
    dial.clickOnSubMenu('Contact Lists');
    contact.verifyListExisting('contact-sample.csv');
    dial.clickOnSubMenu('Contacts');
    contact.clickAddNewContactButton();
    contact.selectUploadFileOption();
    contact.uploadFileForContact('contact-sample.csv');
    cy.wait(2000);
    contact.selectFirstNameDropdown();
    contact.selectLastNameDropdown();
    contact.selectEmailDropdown();
    contact.selectPhoneDropdown();
    cy.wait(2000);
    contact.clickNextButton();
    contact.clickSubmitButton();
    contact.verifyImportStartedToast();
    contact.verifyImportContactCompleteToast();
    cy.wait(3000);
  });

  it('Verify that a Follow up call event created through Contacts page is reflected in TASKS page', () => {
    contact.clickContactName('Automation CSV1');
    contact.clickFollowUpCall();
    contact.selectDateForFollowUpCall();
    dashboard.selectEventTime();
    contact.clickSavebtn();
    cy.wait(1000);
    contact.verifyFollowUpCall('Automation CSV1');
    contact.clickCloseBtn();
    dashboard.clickTaskButton();
    dashboard.verifyEventContact('Automation CSV1');
    dashboard.verifyEventTitle('Call Back to Automation CSV1');
  });

  it('Should delete the added Contact', () => {
    contact.clickingOnContactOption();
    contact.deleteAddedContacts('Automation', 'CSV1');
    contact.handleAlertForDelete();
    contact.verifyDeletedToast();
    dial.clickOnSubMenu('Contact Lists');
    dial.clickListDeleteButton('contact-sample.csv');
    contact.handleAlertForDelete();
    dial.verifySuccessToastMessage('List deleted');
  });

  it('Verify User is able to Add contact to campaign using action button', () => {
    contact.clickLists();
    contact.clickingOnContactOption();
    contact.clickContactCheckbox(['1', '2']);
    contact.clickAction();
    contact.clickActionAddToCampaign();
    contact.selectCampaignForContact();
    contact.clickContinueButton();
    contact.verifyAddedCampaign();
  });
  it('User is able to import contact from list section', () => {
    contact.clickingOnContactOption();
    dial.clickOnSubMenu('Contact Lists');
    contact.verifyListExisting('contact-sample.csv');
    contact.clickImportContacts();
    contact.uploadFileForContact('contact-sample.csv');
    cy.wait(2000);
    contact.selectFirstNameDropdown();
    contact.selectLastNameDropdown();
    contact.selectEmailDropdown();
    contact.selectPhoneDropdown();
    contact.clickNextButton();
    contact.clickSubmitButton();
    contact.verifyImportStartedToast();
    contact.verifyImportContactCompleteToast();
    cy.wait(3000);
  });

  it('Should show Imported contact in table', () => {
    contact.clickingOnContactOption();
    contact.verifyAddedContacts('Automation', 'CSV1');
  });

  it('User is able to delete Imported Contact', () => {
    contact.clickingOnContactOption();
    contact.deleteAddedContacts('Automation', 'CSV1');
    contact.handleAlertForDelete();
    contact.verifyDeletedToast();
  });

  it('User is able to delete imported list from list section', () => {
    dial.clickOnMenu('Contacts');
    dial.clickOnSubMenu('Contact Lists');
    dial.clickListDeleteButton('contact-sample.csv');
    contact.handleAlertForDelete();
    dial.verifySuccessToastMessage('List deleted');
  });

  it('Verify Admin is able to add notes in Contacts', () => {
    contact.clickingOnContactOption();
    contact.enterSearch(testData.Contact);
    cy.wait(1000);
    contact.clickContactName('random Contact');
    contact.clickNotes();
    contact.clickAddNewNotes();
    contact.enterNotes('Testing note for Contact');
    contact.clickNotesBullets();
    cy.wait(3000);
    contact.clickSavebtn();
    contact.verifyAddedNote();
  });                 

  it('Verify that agent user is able to dial a valid phone number which is not in the contacts', () => {
    dial.selectStatus('Available');
    dial.verifySelectCampaignBoxHeading();
    dial.clickSelectCampaignDropdown();
    dial.selectCampaign(testData.campaign);
    dial.clickConfirmButton();
    dial.verifySoftPhoneOpen();
    contact.dialPhoneNumber('6029227636');  
    contact.clickDialerCallButton();
    cy.wait(5000);
    contact.clickEndCallButton();
    contact.selectCallResult('Successful Sale');
    contact.clickContinueBtn();
    contact.clickingOnContactOption();
    dashboard.closeUserProfile();
    contact.deleteAddedContacts('Unknown','Contact');
    contact.handleAlertForDelete();
    contact.verifyDeletedToast();
    contact.clickToCloseSoftphone();
  });
});

describe('Outbound Calling Scenarios with creating campaign', () => {
  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  describe('Preview Campaign Dialing', () => {
    const campaignName = 'Preview Campaign';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      cy.reload();
      ignoreSpeedTestPopup();
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create the New Preview Dialer', () => {
      dial.clickOnMenu('Campaigns');
      dial.verifyCampaignExisting(campaignName);
      dial.clickOnButton('NEW CAMPAIGN');
      dial.clickOnRadioButton('Preview Dialer');
      dial.selectAgentToAssign(testData.AdminName);
      dial.selectPhoneNumber(testData.Number);
      dial.enterCampaignName(campaignName);
      
      cy.wait(1000);
      dial.clickCallResultsDropdown();
      dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      dial.clickAdvanceConfiguration();
      dial.clickCallingHoursDropdown();
      dial.selectFromTime('12:00 am');
      dial.selectToTime('11:30 pm');
      dial.clickApplyToAllButton();
      dial.clickOnButton('APPLY');
      dial.clickTermsConditionsCheckbox();
      dial.clickOnButton('Save');
      dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Add the New Contact for the Outbound call', () => {
      contact.clickingOnContactOption();
      contact.verifyContactExisting('5103256012');
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5103256012');
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Change status to Available', () => {
      dial.selectStatus('Available');
      dial.verifySelectCampaignBoxHeading();
      dial.clickSelectCampaignDropdown();
      dial.selectCampaign(campaignName);
      dial.clickConfirmButton();
      dial.verifySoftPhoneOpen();
    });

    it('Dial the Added Number', () => {
      dial.clickOnMenu('Contacts');
      dial.clickContactName('Twilio', 'Test');
      dial.clickContactPhoneNumber();
      dial.clickAcceptCallButton();
    });

    it('Verify that Agent status should be On Call', () => {
      dial.verifyAgentStatus('On Call');
      dial.verifySoftphoneTitle('Twilio Test');
    });

    it('End the Call and select the Disposition', () => {
      dial.endCallAtTime('0:20');
      dial.verifyCallDispositionWindow();
      dial.selectCallDisposition('No Answer');
      dial.clickOnButton('Done');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Twilio', 'Test');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      dial.clickSoftphoneButton();
    });

    it('Delete the Created Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.clickThreeDotMenuBtn(campaignName);
      dial.clickOnDropdownItem('Archive');
      dial.verifySuccessToastMessage('Campaign Archived');
    });
  });

  describe('Predictive Campaign Dialing', () => {
    const campaignName = 'Predictive Campaign 1';
    const listName = 'twilio.csv';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.verifyCampaignExisting(campaignName);
      dial.clickOnButton('NEW CAMPAIGN');
      dial.clickOnRadioButton('Predictive Dialer');
      dial.selectAgentToAssign(testData.AdminName);
      dial.selectPhoneNumber(testData.Number);
      dial.enterCampaignName(campaignName);
      cy.wait(1000);
      dial.clickCallResultsDropdown();
      dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      dial.clickAdvanceConfiguration();
      dial.clickOnRadioButton('Automatic Answer');
      dial.enterSimultaneousDialsPerAgent('3');
      dial.clickCallingHoursDropdown();
      dial.selectFromTime('12:00 am');
      dial.selectToTime('11:30 pm');
      dial.clickApplyToAllButton();
      dial.clickOnButton('APPLY');
      dial.clickTermsConditionsCheckbox();
      dial.clickOnButton('Save');
      dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      dial.clickOnMenu('Contacts');
      dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(listName);
      contact.clickImportContacts();
      contact.uploadFileForContact(listName);
      cy.wait(2000);
      dial.selectMappingFields([
        'Phone Number',
        'First Name',
        'Last Name',
        'Email',
        'Zip',
        'Address',
        'Country',
        'State',
        'City',
      ]);
      cy.wait(1000)
      contact.clickNextButton();
      contact.clickSubmitButton();
      contact.verifyImportStartedToast();
      cy.wait(1000)
      contact.verifyImportContactCompleteToast();
    });

    it('Assign the Imported List to the Created Campaign', () => {
      dial.clickOnMenu('Contacts');
      dial.clickOnSubMenu('Contact Lists');
      dial.clickListAssignToCampaign(listName);
      dial.verifyModalTitle('Assign To Campaign');
      dial.chooseCampaignToAssign(campaignName);
      dial.clickOnButton('Continue');
      dial.verifySuccessToastMessage('List has been assigned to the campaigns');
    });

    it('Change status to Available', () => {
      dial.selectStatus('Available');
      dial.verifySelectCampaignBoxHeading();
      dial.clickSelectCampaignDropdown();
      dial.selectCampaign(campaignName);
      dial.clickConfirmButton();
      dial.verifySoftPhoneOpen();
      dial.verifySoftphoneLinesNumber(3);
      cy.wait(1000)
    });

    it('Verify that Agent status should be On Call and End the Call and select the Disposition', () => {
      //dial.verifyPhoneRingingIcon();
      dial.verifyAgentStatus('On Call');
      dial.verifySoftphoneTitle('Test Number');
      dial.endCallAtTime('0:20');
      dial.verifyCallDispositionWindow();
      dial.selectCallDisposition('No Answer');
      dial.clickOnButton('Done');
    });

    it('Delete the Created Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.clickThreeDotMenuBtn(campaignName);
      dial.clickOnDropdownItem('Archive');
      dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Delete the Uploaded List', () => {
      dial.clickOnMenu('Contacts');
      dial.clickOnSubMenu('Contact Lists');
      dial.clickListDeleteButton(listName);
      contact.handleAlertForDelete();
      dial.verifySuccessToastMessage('List deleted');
    });
  });

  describe('Predictive campaign with simultaneous dials per agent of 1', () => {
    const campaignName = 'Predictive Campaign 2';
    const listName = 'twilio.csv';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.verifyCampaignExisting(campaignName);
      dial.clickOnButton('NEW CAMPAIGN');
      dial.clickOnRadioButton('Predictive Dialer');
      dial.selectAgentToAssign(testData.AdminName);
      dial.selectPhoneNumber(testData.Number);
      dial.enterCampaignName(campaignName);
      cy.wait(1000);
      dial.clickCallResultsDropdown();
      dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      dial.clickAdvanceConfiguration();
      dial.clickOnRadioButton('Automatic Answer');
      dial.enterSimultaneousDialsPerAgent('1');
      dial.clickCallingHoursDropdown();
      dial.selectFromTime('12:00 am');
      dial.selectToTime('11:30 pm');
      dial.clickApplyToAllButton();
      dial.clickOnButton('APPLY');
      dial.clickTermsConditionsCheckbox();
      dial.clickOnButton('Save');
      dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      dial.clickOnMenu('Contacts');
      dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(listName);
      contact.clickImportContacts();
      contact.uploadFileForContact(listName);
      cy.wait(2000);
      dial.selectMappingFields([
        'Phone Number',
        'First Name',
        'Last Name',
        'Email',
        'Zip',
        'Address',
        'Country',
        'State',
        'City',
      ]);
      cy.wait(1000)
      contact.clickNextButton();
      contact.clickSubmitButton();
      contact.verifyImportStartedToast();
      contact.verifyImportContactCompleteToast();
    });

    it('Assign the Imported List to the Created Campaign', () => {
      dial.clickOnMenu('Contacts');
      dial.clickOnSubMenu('Contact Lists');
      dial.clickListAssignToCampaign(listName);
      dial.verifyModalTitle('Assign To Campaign');
      dial.chooseCampaignToAssign(campaignName);
      dial.clickOnButton('Continue');
      dial.verifySuccessToastMessage('List has been assigned to the campaigns');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(1000);
    });

    it('Change status to Available', () => {
      dial.selectStatus('Available');
      dial.verifySelectCampaignBoxHeading();
      dial.clickSelectCampaignDropdown();
      dial.selectCampaign(campaignName);
      dial.clickConfirmButton();
      dial.verifySoftPhoneOpen();
      dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify that Agent status should be On Call and End the Call and select the Disposition', () => {
      //dial.verifyPhoneRingingIcon();
      dial.verifyAgentStatus('On Call');
      dial.verifySoftphoneTitle('Test Number');
      dial.endCallAtTime('0:20');
      dial.verifyCallDispositionWindow();
      dial.selectCallDisposition('No Answer');
      dial.clickOnButton('Done');
    });

    it('Delete the Created Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.clickThreeDotMenuBtn(campaignName);
      dial.clickOnDropdownItem('Archive');
      dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Delete the Uploaded List', () => {
      dial.clickOnMenu('Contacts');
      dial.clickOnSubMenu('Contact Lists');
      dial.clickListDeleteButton(listName);
      contact.handleAlertForDelete();
      dial.verifySuccessToastMessage('List deleted');
    });
  });

  describe('Predictive campaign with simultaneous dials per agent of 1 and max attempt per record of 3', () => {
    const campaignName = 'Predictive Dialer Campaign';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.verifyCampaignExisting(campaignName);
      dial.clickOnButton('NEW CAMPAIGN');
      dial.clickOnRadioButton('Predictive Dialer');
      dial.selectAgentToAssign(testData.AdminName);
      dial.selectPhoneNumber(testData.Number);
      dial.enterCampaignName(campaignName);
      cy.wait(1000);
      dial.clickCallResultsDropdown();
      dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      dial.clickAdvanceConfiguration();
      dial.clickOnRadioButton('Automatic Answer');
      dial.enterSimultaneousDialsPerAgent('1');
      dial.enterMaxAttemptPerRecord('3');
      dial.enterRetryTime('4');
      dial.selectRetryTimeDropdown('sec');
      dial.clickOnButton('Got it')
      dial.clickCallingHoursDropdown();
      dial.selectFromTime('12:00 am');
      dial.selectToTime('11:30 pm');
      dial.clickApplyToAllButton();
      dial.clickOnButton('APPLY');
      dial.clickTermsConditionsCheckbox();
      dial.clickOnButton('Save');
      dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a New Contact for Campaign', () => {
      contact.clickingOnContactOption();
      contact.verifyContactExisting('5103256012');
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5103256012');
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Assign the Added Contact to the Created Campaign', () => {
      dial.clickOnMenu('Contacts');
      dial.clickContactThreeDotMenu('Twilio', 'Test');
      dial.clickOnDropdownItem('Add to Campaign');
      dial.verifyModalTitle('Select campaign');
      dial.selectCampaignToAssign(campaignName);
      dial.clickOnButton('Continue');
      dial.verifySuccessToastMessage('Contacts added to campaign');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(1000);
    });

    it('Change status to Available', () => {
      dial.selectStatus('Available');
      dial.verifySelectCampaignBoxHeading();
      dial.clickSelectCampaignDropdown();
      dial.selectCampaign(campaignName);
      dial.clickConfirmButton();
      dial.verifySoftPhoneOpen();
      dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify that Agent status should be On Call', () => {
      dial.clickOnMenu('Dashboard');
      dial.verifySimultaneousDial(
        ['Twilio Test'],
          'On Call',
          '0:30',
          'No Answer'
      );
    });

    it('Delete the Created Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.clickThreeDotMenuBtn(campaignName);
      dial.clickOnDropdownItem('Archive');
      dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Twilio', 'Test');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      dial.clickSoftphoneButton();
    });
  });

  describe('Campaign - Call Recording Feature', () => {
    const campaignWithRecording = 'Campaign with call recording';
    const campaignWithoutRecording = 'Campaign without Call Recording';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Preview Campaign with Call Recording Feature', () => {
      dial.clickOnMenu('Campaigns');
      dial.verifyCampaignExisting(campaignWithRecording);
      dial.clickOnButton('NEW CAMPAIGN');
      dial.clickOnRadioButton('Preview Dialer');
      dial.selectAgentToAssign(testData.AdminName);
      dial.selectPhoneNumber(testData.Number);
      dial.enterCampaignName(campaignWithRecording);
      dial.clickCallResultsDropdown();
      dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'Disconnected Number',
        'Successful sale'
      ]);
      dial.clickAdvanceConfiguration();
      dial.clickCallingHoursDropdown();
      dial.selectFromTime('12:00 am');
      dial.selectToTime('11:30 pm');
      dial.clickApplyToAllButton();
      dial.clickOnButton('APPLY');
      dial.clickTermsConditionsCheckbox();
      dial.clickOnButton('Save');
      dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a new Preview Campaign without the Call Recording Feature', () => {
      dial.clickOnMenu('Campaigns');
      dial.verifyCampaignExisting(campaignWithoutRecording);
      dial.clickOnButton('NEW CAMPAIGN');
      dial.clickOnRadioButton('Preview Dialer');
      dial.selectAgentToAssign(testData.AdminName);
      dial.selectPhoneNumber(testData.Number);
      dial.enterCampaignName(campaignWithoutRecording);
      dial.clickCallResultsDropdown();
      dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'Do Not Call',
        'Successful sale'
      ]);
      dial.clickAdvanceConfiguration();
      dial.disableCallRecording();
      dial.clickCallingHoursDropdown();
      dial.selectFromTime('12:00 am');
      dial.selectToTime('11:30 pm');
      dial.clickApplyToAllButton();
      dial.clickOnButton('APPLY');
      dial.clickTermsConditionsCheckbox();
      dial.clickOnButton('Save');
      dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a New Contact for Campaign', () => {
      contact.clickingOnContactOption();
      contact.verifyContactExisting('5103256012');
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5103256012');
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Change status to Available', () => {
      dial.selectStatus('Available');
      dial.verifySelectCampaignBoxHeading();
      dial.clickSelectCampaignDropdown();
      dial.selectCampaign(campaignWithRecording);
      dial.clickConfirmButton();
      dial.verifySoftPhoneOpen();
    });

    it('Dial the Added Number', () => {
      dial.clickOnMenu('Contacts');
      dial.clickContactName('Twilio', 'Test');
      dial.clickContactPhoneNumber();
      dial.clickAcceptCallButton();
    });

    it('Verify that Agent status should be On Call', () => {
      dial.verifyAgentStatus('On Call');
      dial.verifySoftphoneTitle('Twilio Test');
    });

    it('End the Call and select the Disposition', () => {
      dial.endCallAtTime('0:30');
      dial.verifyCallDispositionWindow();
      dial.selectCallDisposition('No Answer');
      dial.clickOnButton('Done');
    });

    it('verify that Call recording should be available in Recent Contacts', () => {
      dial.clickOnMenu('Reports');
      dial.clickOnSubMenu('Recent Contacts');
      cy.reload();
      ignoreSpeedTestPopup();
      dial.verifyCallRecordingIcon(campaignWithRecording,true);
    });

    it('Verify that costumer is able to play the recording', () => {
      dial.closeRecordingDialog();
      dial.clickCallRecordingIcon('Twilio', 'Test', campaignWithRecording);
      dial.verifyRecordingPlayerWindow();
      dial.verifyPlayerCampaignName(campaignWithRecording);
      dial.clickPlayPauseButton();
      dial.verifyPlayerCurrentTime('0:05');
      dial.clickPlayPauseButton();
      dial.clickForwardButton();
      dial.verifyPlayerCurrentTime('0:15');
      dial.clickBackwardButton();
      dial.verifyPlayerCurrentTime('0:05');
      dial.clickPlayerCloseButton();
    });

    it('Change status to Available', () => {
      dial.closeRecordingDialog();
      dial.selectStatus('Available');
      dial.verifySelectCampaignBoxHeading();
      dial.clickSelectCampaignDropdown();
      dial.selectCampaign(campaignWithoutRecording);
      dial.clickConfirmButton();
      dial.verifySoftPhoneOpen();
    });

    it('Dial the Added Number', () => {
      dial.clickOnMenu('Contacts');
      dial.clickContactName('Twilio', 'Test');
      dial.clickContactPhoneNumber();
      dial.clickAcceptCallButton();
    });

    it('Verify that Agent status should be On Call', () => {
      dial.verifyAgentStatus('On Call');
      dial.verifySoftphoneTitle('Twilio Test');
    });

    it('End the Call and select the Disposition', () => {
      dial.endCallAtTime('0:15');
      dial.verifyCallDispositionWindow();
      dial.selectCallDisposition('No Answer');
      dial.clickOnButton('Done');
    });

    it('verify that Call recording should not be available in Recent Contacts', () => {
      dial.clickOnMenu('Reports');
      dial.clickOnSubMenu('Recent Contacts');
      dial.verifyCallRecordingIcon(campaignWithoutRecording,false);
    });

    it('Delete the Created Campaign', () => {
      dial.clickOnMenu('Campaigns');
      dial.clickThreeDotMenuBtn(campaignWithRecording);
      dial.clickOnDropdownItem('Archive');
      dial.verifySuccessToastMessage('Campaign Archived');
      dial.clickThreeDotMenuBtn(campaignWithoutRecording);
      dial.clickOnDropdownItem('Archive');
      dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Twilio', 'Test');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      dial.clickSoftphoneButton();
    });
  });
});

describe('Add Phone Number flow', () => {
  let num;
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

  beforeEach(() => {
    cy.fixture('constants').then((data) => (fixtureData = data));
    handlePoorConnectionPopup();
    closeDialogBox();
  });

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
    verifyCloseApp();
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Should Buy Phone number successfully', () => { //BAT-650,652
    addNum.clickPhoneNumberMenu();
    addNum.clickBuyDidButton();
    addNum.selectStateModeOption('Colorado');
    addNum.selectPhoneNumber();
    addNum.assignAgentUser(testData.AdminName);
    addNum.getFirstPhoneNumber();
    addNum.clickOrderNowButton();
    addNum.closingDialog();
  });

  it('Should show added Phone number in table', () => {
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      num = data.BuyNumber;
      addNum.clickPhoneNumberMenu();
      addNum.verifyAddedPhoneNum(num);
      cy.log(num);
    });
  });

  it('Should delete the added Phone Number', () => {
    addNum.clickPhoneNumberMenu();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      addNum.deleteAddedPhoneNumber(data.BuyNumber);
      addNum.handleAlertForDelete();
    });
    addNum.verifyDeletedToast();
  });

  it('Search Contact through the Area Code', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickBuyDidButton();
    addNum.enterAreaCode('720');
    // addNum.clickSearchButton();
    addNum.verifySearchNumber('720');
  });

  it('Add a New Digit while creating New IVR', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickIvrAttendent();
    addNum.clickNewIvr();
    addNum.clickNewDigitBtn();
    addNum.clickNewDigitBtn();
    addNum.verifyAddedNewDigit(1);
  });

  it('Removes the Added New Digit', () => {
    addNum.removeAddedNewDigit(1);
    addNum.removeAddedNewDigit(2);
    addNum.verifyDeletedDigit();
  });

  it('Verifies Elements and Add DNC Number', () => {
      addNum.clickPhoneNumberMenu();
      addNum.clickDncMenu();
      addNum.clickAddBtn('DNC NUMBERS');
      addNum.verifyNumberField();
      addNum.verifyAddMoreBtn();
      addNum.verifySaveBtn();
      addNum.verifyCancelBtn();
      addNum.enterDncNumber('9999999999');
      addNum.clickSaveBtn();
  });

  it('Delete Added DNC Number', () => {
      addNum.clickDeleteDncValue('DNC NUMBERS', '(999) 999-9999');
      addNum.handleAlertForDelete();
  });

  it('Add New Call Result', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickOpenCallResultGroup('UNGROUPED');
    addNum.checkNewlyExistsCR();
    addNum.clickAddNewCallResultBtn();
    addNum.enterName('DemoTesting');
    addNum.chooseActiveInactive('Active');
    addNum.selectCallResultCampaignDropdown(testData.campaign);
    addNum.clickCallResultSaveBtn();
    addNum.verifyToastMessage('Saved');
  });

  it('Verify that the created call results is reflected in the create new campaign page Call Result', () => {
    addCamp.clickCampaignMenu();
    cy.wait(3000);
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randomNumber.toString());
    addNum.verifyCreatedCallResult('DemoTesting');
  });

  it('Add New Rule while Creating Call Result', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickAddNewCallResultBtn();
    addNum.enterName('A CALL BACK');
    addNum.chooseActiveInactive('Active');
    addNum.selectCallResultCampaignDropdown(testData.campaign);
    addNum.clickAddNewRuleBtn();
    cy.wait(500)
    addNum.selectRule('Schedule a Callback');
    addNum.clickCallResultSaveBtn();
    cy.wait(1000);
  });

  it('Change status to Available', () => {
    dial.selectStatus('Available');
    dial.verifySelectCampaignBoxHeading();
    dial.clickSelectCampaignDropdown();
    dial.selectCampaign(testData.campaign);
    dial.clickConfirmButton();
    dial.verifySoftPhoneOpen();
  });

  it('Verify that Events created through call result Schedule a call back is reflected in the TASKS page', () => {
    contact.dialPhoneNumber('6029227636');
    contact.clickDialerCallButton();
    cy.wait(5000);
    contact.clickEndCallButton();
    contact.selectCallResult('A CALL BACK'); 
    contact.clickContinueBtn();
    cy.wait(5000);
    for (let i = 0; i < 2; i++) {
      dashboard.clickDashboard();
      cy.reload();
      ignoreSpeedTestPopup();
      dashboard.clickTaskButton(); 
    }
    dashboard.clickFutureButton();
    dashboard.verifyEventType('Appointment');   
    dashboard.verifyEventContact('Unknown Contact');
    dashboard.verifyEventDate();
    dashboard.verifyEventAssignedName(testData.AdminName);
    dashboard.verifyEventTitle('Scheduled from call result');
    dashboard.clickEventThreeDotMenuBtn('Unknown Contact');
    dashboard.selectDropdownItemToClick('Delete Event');
  });

  it('Remove the added New Rule from Call Result', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickOpenCallResultGroup('UNGROUPED');
    addNum.clickCallResultEditBtn('A CALL BACK');
    addNum.clickDeleteRuleBtn();
    addNum.clickCallResultSaveBtn();
  });

  it('Delete Added Call Result', () => {
    cy.wait(1000);
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickOpenCallResultGroup('UNGROUPED');
    contact.clickToCloseSoftphone();
    addNum.clickCallResultDeleteBtn();
    addNum.handleDeleteAlert('Delete call result?');
    addNum.verifyCallResultDelete('DemoTesting');
  });
});
describe('Report Page', () => {
  before(() => {
    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
    cy.fixture('constants')
      .then((data) => (fixtureData = data))
      .then(() => {
        cy.visit('/', { failOnStatusCode: false });
      });
  
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });
  
  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })
  
  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
    verifyCloseApp();
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
  });

  it('Verify dropdowns of Report contacts', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Recent Contacts');
    report.clickFilterButton();
    report.verifyRecentContactsDropdown([
      'All Calls',
      'Call Results',
      'Agents',
      'Campaigns',
      'All Durations',
      'Mood',
    ]);
  });

  it('Verify that authorized user is able to search in Recent contacts by using customer phone number', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Recent Contacts');
    report.searchNumber(testData.contactNumber);
    report.verifyRowsData(testData.Contact);
  });

  it('Verify that authorized user is able to search in Recent contacts by using customer name', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Recent Contacts');
    report.searchContactName(testData.Contact);
    report.verifyRowsData(testData.Contact);
    report.verifyRowsData(testData.contactNumber);
  });

  it('Verify All status dropdown should show statuses', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Campaigns');
    report.clickCampaignStatusDropdown();
    report.verifyStatusDropdownElements([
      'All Statuses',
      'Active',
      'Paused',
      'Completed',
      'Archived',
    ]);
  });

  it('Verify On click of campaign calender it should open calender', () => {
    report.clickCampaignCalanderDropdown();
    report.verifyCalender();
  });
  it('Verify Status Dropdown Functionality', () => {
    report.clickCampaignStatusDropdown();
    report.clickActiveStatus();
    report.verifyStatusVisible('active');
    report.verifyStatusNotVisible('paused');
  });

});

describe('SuperVisor Flow', () => {
  before(() => {
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

  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  after(() => {
    cy.Logout();
  });

  it('Supervisor Should Login Successfully', () => {
    verifyCloseApp();
    cy.Login(testData.SupervisorEmail, testData.password);
    cy.reload();
  });

  it('Verify the Dashboard Elements', () => {
    suprevisor.clickOnMainTab();
    suprevisor.verifyDashboardElementsBox([
      'Outbound Calls',                
      'Connected Calls',                
      'Avg. Call Duration',             
      'Avg. Agent Wait Time',          
      'Abandon Rate',                  
      'Active Campaigns',              
      'Leads Generated',                
      'Connect Rate',                  
      'Dialing Time',                  
      'Avg. CPA(Calls Per Agent)',     
      'Calls Per Connect',             
      'Voicemails Reached',            
    ]);
    suprevisor.verifyDashboardGraphElementsBox([
      'Calls Summary',
      'Responsiveness',
      'Agent Analytics',              
      'Best Time to Call',              
      'Call Results',
      'Campaign Analytics',             
      'Avg. Agent Talk Time'            
    ]);
  });

  it('Verify Add Contact using Create New option', () => {
    suprevisor.clickingOnContactOption();
    cy.wait(3000);
    suprevisor.clickAddNewContactButton();
    suprevisor.selctCreateNewContactOption();
    suprevisor.verifyEditForm();
  });

  it('Verify Add Contact using Upload File option', () => {
    suprevisor.clickingOnContactOption();
    cy.wait(3000);
    suprevisor.clickAddNewContactButton();
    suprevisor.selectUploadFileOption();
    suprevisor.verifyUploadForm();
  });

  it('Verifies the Profile Page', () => {
    suprevisor.clickUserProfile();
    suprevisor.clickprofileButton();
    suprevisor.verifyProfilePage();
  });

  it('Verify Supervisor can Login as Agent', () => {
    suprevisor.clickDashboardMenu();
    suprevisor.clickLoginAsBtn('Switch Account');
    suprevisor.clickOpenUser();
    suprevisor.loginWithUser(testData.agent);
    ignoreSpeedTestPopup();
    suprevisor.verifyLogin(testData.agent);
    suprevisor.clickOnProfile();
    suprevisor.clickBackToSupervisor();
    suprevisor.verifySupervisorProfile();
  });
  it('Verify the Elements of Agent Section for Reports Page', () => {
    suprevisor.clickReportsMenu();
    suprevisor.clickReportsHeader('Agents');
    suprevisor.verifyDepartmentsDropdown();
    suprevisor.verifyAllCampaignsDropdown();
    suprevisor.verifyDatePicker();
    suprevisor.verifyExportButton('Agents');
  });

  it('Verify the Agents Name in Reports Agent section', () => {
    suprevisor.clickReportsMenu();
    suprevisor.clickReportsHeader('Agents');
    suprevisor.verifyReportsAgentName(testData.agent);
    suprevisor.verifyReportsAgentName(testData.AdminName);
  });

  it('verify the Agents Details in the Reports Agent section', () => {
    suprevisor.clickReportsMenu();
    suprevisor.clickReportsHeader('Agents');
    suprevisor.clickAgentsDetailsPlusBtn();
    suprevisor.verifyAgentsDetails([
      'Answered',
      'Appointments',
      'Leads',
      'Total',
      'Available',
      'Break',
      'Lunch',
      'In training',
      'Out of desk',
      'On Call',
      'Wrap Up Time',
      'In Meeting',
      'Auto Pause',
      'PrepWork',
      'After Call',
    ]);
  });

  it('Verify the Elements of Campaign section of Reports page', () => {
    suprevisor.clickReportsMenu();
    suprevisor.clickReportsHeader('Campaigns');
    suprevisor.verifyAllStatusDropdown();
    suprevisor.verifyAllAgentsDropdown();
    suprevisor.verifyExportButton('Campaigns');
    suprevisor.verifyDatePicker();
  });
});

describe('Dashboard Elements', () => {
  var date = [];
  before(() => {
    cy.readFile('cypress/fixtures/testData.json').then(
        (data) => (testData = data)
    );
    cy.visit('/', { failOnStatusCode: false });
    date = getDate(8);
    Cypress.Cookies.defaults({
        preserve: (cookies) => {
            return true;
        },
    });
  });

  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Verify the Status Timer is Visible Against the Status', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
    dashboard.verifyStatusTimerVisible();
  });

  it('verify elements in Dashboard Header', () => {
    dashboard.verifyDashboardHeaderElement();
  });

  it('Verify User settings Billing Elements', () => {
    dashboard.clickUserProfile();
    dashboard.clickBilling();
    dashboard.verifyCurrentBillingCard();
    dashboard.verifyUsageStatus();
    dashboard.verifyPaymentMethod();
    dashboard.verifyBillingAddress();
    dashboard.verifyPauseAccount();
    dashboard.verifyCancelAccount();
    dashboard.verifyInvoice();
  });
  
  it('Add New Credit Card', () => {
    dashboard.closeCreditCardPopup();
    dashboard.clickUserProfile();
    dashboard.clickBilling();
    dashboard.clickCardEditBtn();
    dashboard.clickAddNewCard();
    dashboard.enterCardName(Cypress.env('CardName'));
    dashboard.enterCardNumber(Cypress.env('CardNumber'));
    dashboard.enterExpiryDate(Cypress.env('ExpiryDate'));
    dashboard.enterCVC(Cypress.env('CVC'));
    dashboard.chooseCountry(Cypress.env('Country'));
    dashboard.enterBillingZip(Cypress.env('BillingZip'));
    dashboard.clickContinue();
    dashboard.verifyAddedCard(
        Cypress.env('CardNumber')
        .slice(Cypress.env('CardNumber')
        .length - 4)
    );  
  });
  
  it('Verify the Default Credit Card Functionality', () => {   
    dashboard.closeCreditCardPopup();
    dashboard.clickCardEditBtn();
    dashboard.clickCardDefaultBtn(
        Cypress.env('CardNumber')
        .slice(Cypress.env('CardNumber')
        .length - 4)
    );
    dashboard.verifyCardDefault(
        Cypress.env('CardNumber')
        .slice(Cypress.env('CardNumber')
        .length - 4)
    );
    dashboard.clickCardDefaultBtn('8192');
    dashboard.verifyCardDefault('8192');
  });
  
  it('Delete the Added New Credit Card', () => {
    dashboard.closeCreditCardPopup();
    dashboard.clickCardEditBtn();
    dashboard.clickDeleteCardBtn(
        Cypress.env('CardNumber')
        .slice(Cypress.env('CardNumber')
        .length - 4)
    );
    dashboard.verifyCardDelete();
  });

  it('download invoice and Verify', () => {
    dashboard.closeCreditCardPopup();
    dashboard.clickUserProfile();
    dashboard.clickSettingsButton();
    dashboard.clickUserProfile();
    dashboard.clickBilling();
    dashboard.downloadAndVerifyInvoice();
    });

  it('Verify chat option should be visible', () => {
    dashboard.clickDashboard();     //team chat box at top-left
    dashboard.verifyChaticon();
  });
  
  it('Verify Chat icon should open chat window', () => {
    dashboard.clickResourceCenterIcon();
    dashboard.clickCustomerChat();
    dashboard.clickBatchDialerSupport('BatchDialer');
    dashboard.verifyChatPopUp();      //customer support window
  });

  it('Verify Admin is able to Switch to Agents Account', () => {
    dashboard.clickCloseSoftphoneBtn();
    dashboard.clickLoginAs();
    dashboard.clickLoginAsPlusIcon();
    dashboard.clickAgentOrSupervisor(testData.agent);
    ignoreSpeedTestPopup();
    dashboard.verifyUserDashboardName(testData.agent);
    dashboard.clickBackToAdmin();
    ignoreSpeedTestPopup();
    dashboard.verifyUserDashboardName(testData.AdminName);
  });

  it('verify Admin is able to switch to Supervisor Account', () => {
    dashboard.clickLoginAs();
    dashboard.clickLoginAsPlusIcon();
    dashboard.clickAgentOrSupervisor(testData.supervisor);
    dashboard.verifyUserDashboardName(testData.supervisor);
    dashboard.clickBackToAdmin();
    ignoreSpeedTestPopup();
    dashboard.verifyUserDashboardName(testData.AdminName);
  });

  it('Verify that Next Billing date is displayed in the BILLING INFO section', () => {
    dashboard.clickUserProfile();
    dashboard.clickBilling();
    dashboard.verifyBillingCycle();
  });

  it('Verify that the authorized user is able to cancel the account states other than CA, NY, OR', () => {
    dashboard.clickCancelAccount();
    dashboard.clickProceedWithCancel();
    dashboard.chooseCancelAccountReason('It Costs Too Much');
    dashboard.EnterConfirmCancelAccount('DELETE');
    dashboard.selectState('AZ');
    dashboard.clickProceedWithCancel();
    dashboard.clickCancelImmediately();
    dashboard.verifyContactSupportWindow(
      'Your Cancellation Request has been successfully submitted.'// Please reach out to your Account Manager to finalize request'
    );
    dashboard.clickDialogCloseButton();
    dashboard.clickBillingNotificationBtn('Renew Subscription');
    dashboard.verifySuccessMsg('Your subscription has been renewed');
  });
  
  it('Verify that the authorized user is able to cancel the account states CA, NY OR', () => {
    dashboard.clickCancelAccount();
    dashboard.clickProceedWithCancel()
    dashboard.chooseCancelAccountReason('It Costs Too Much');
    dashboard.EnterConfirmCancelAccount('DELETE');
    dashboard.selectState('CA');  //NY OR
    dashboard.clickProceedWithCancel();
    dashboard.clickCancelImmediately();
    dashboard.verifyContactSupportWindow(
      'Thank you for your feedback, your account has been set to cancel on '+ date[0]
    );
    dashboard.clickDialogCloseButton();
  });
  
  it('Verify the functionality of PAUSE INSTEAD button in the Cancelled notification', () => {
    dashboard.clickBillingNotificationBtn('Pause Instead');
    dashboard.ClickSubscriptionOnHoldBtn();
    dashboard.verifySuccessMsg('Your account pause has been scheduled');
    cy.reload();
    ignoreSpeedTestPopup();
  });
  
  it('Verify the functionality of RENEW SUBSCRIPTION in the Cancelled Notification', () => {
    dashboard.clickBillingNotificationBtn('Renew Subscription');
    dashboard.verifySuccessMsg('Your subscription has been renewed');
  });
  
  it('Verify that authorized user is able to downgrade number of Seats', () => {
    cy.wait(5000)
    dashboard.clickOnButton('Upgrade');
    dashboard.clickOnAgentPlusMinusIcon('-');
    dashboard.clickOnDowngradeBtn();
    dashboard.verifyDowngradeButton('Selected Plan');
    dashboard.clickOnButton('Continue');
    cy.wait(1000);
    dashboard.clickOnButton('CONTINUE');
    dashboard.verifySuccessMsg('Scheduling the plan change, please wait');
    dashboard.verifyAlertNotification('1 Agent seat will be cancelled on '+ date[1]);
  });

  it('Verify the functionality of DO NOT CANCEL in the Downgrade notification', () => {
    dashboard.clickBillingNotificationBtn('Do Not Cancel');
    dashboard.verifySuccessMsg('Your seats cancelation stopped');
    dashboard.verifyAlertMsgNotExist();
  });
});

  

  