import Dashboard from '../../support/pages/Dashboard';
import { closeDialogBox, getDate, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus, verifyRoleTitle } from '../../support/Utils';
import Contacts from '../../support/pages/Contacts';
import Campaign from '../../support/pages/Campaigns';
import PhoneNum from '../../support/pages/PhoneNum';

const Dash = new Dashboard();
const addCont = new Contacts();
const camp = new Campaign();
const addNum = new PhoneNum();
var date=[];
let fixtureData;
let testData;
let cardLast4Digit;
let randNum = Math.floor(Math.random() * 100000);
const message = (user) => `This is a testing message from ${user}`;

describe('Dashboard Elements', () => {
  before(() => {
    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
    cy.fixture('constants')
      .then((data) => (fixtureData = data))
      .then(() => {
        cy.visit('/', { failOnStatusCode: false });
        cardLast4Digit = fixtureData.cardNumber.slice(
          fixtureData.cardNumber.length - 4
        );
    });
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        date = getDate(8);
      } else{
        date = getDate(14);
      }
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
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Verify the Status Timer is Visible Against the Status', () => {
    Dash.verifyStatusTimerVisible();
  });

  it('Verify the Call Graph Elements', () => {
    Dash.clickHardwareTestButton();
    Dash.verifyCallGraph();
    Dash.verifyButtonsVisible('Test Network');
    Dash.verifyButtonsVisible('Test Microphone');
  });

  it('Verify the Speed Test Functionality', () => {
    Dash.clickOnButton('Test Network');
    Dash.verifyModalTitle('SPEED TEST');
    Dash.clickOnButton('Start test');
    Dash.verifySpeedTestCompletion();
  });

  it('Verify the Microphone test Functionality', () => {
    Dash.clickOnButton('Test Microphone');
    Dash.verifyModalTitle('MICROPHONE TEST');
    Dash.clickMicTestStartButton();
    Dash.verifyMicTestCompletion();
    Dash.clickOnButton('Done');
    Dash.clickCallGraphCloseBtn();
  });

  it('Verify that user is able to open Main Dashboard Page', () => {
    Dash.clickDashboard();
    Dash.clickOnMainTab();
    Dash.verifyPage('dashboard/main');
  });

  it('verify elements in Dashboard', () => {
    Dash.verifyDashboardElements();
    Dash.verifyDashboardCardboxElement([
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
      'Voicemails Reached'
    ]);
  });

  it('Verify that when user click on (+/-) icon its should expand the roles', () => {
    Dash.clickLoginAs();
    Dash.clickClientPlusIcon();
    Dash.verifyGroupExpended();
  });

  it('Verify that when user click on the user id it should copy the user id and shows success message COPIED', () => {
    Dash.clickClientUserId();
    Dash.verifyToastMessage('Copied!');
  });

  it('Verify that live status of the agent should appear', () => {
    Dash.verifyAgentRoleLiveStatusVisible();
  });

  it('Verify that status should not show for supervisor role', () => {
    Dash.verifySupervisorStatusNotVisible();
  });

  it('Verify that Search can be done by First Name/Last Name/ID/Email', () => {
    const [agentFirstName, agentLastName] = testData.agent.split(' ');
    const [supervisorFirstName, supervisorLastName] =
      testData.supervisor.split(' ');
    Dash.enterUserToSearch(agentFirstName);
    Dash.verifySearchedUserName(testData.agent);
    Dash.enterUserToSearch(agentLastName);
    Dash.verifySearchedUserName(testData.agent);
    Dash.enterUserToSearch(supervisorFirstName);
    Dash.verifySearchedUserName(testData.supervisor);
    Dash.enterUserToSearch(supervisorLastName);
    Dash.verifySearchedUserName(testData.supervisor);
    Dash.enterUserToSearch(testData.AgentEmail);
    Dash.verifySearchedUserName(testData.agent);
    Dash.enterUserToSearch(testData.SupervisorEmail);
    Dash.verifySearchedUserName(testData.supervisor);
  });

  it('Verify that user can sort by role by using ALL Roles dropdown', () => {
    Dash.verifyRolesDropdownVisible();
  });

  it('Verify that when user select any role from ALL Roles dropdown then result should appear as per selected role', () => {
    Dash.selectRoleToFilter('Agent');
    Dash.verifyUserRoleName('Agent');
  });

  it('Verify that clicking anywhere outside of the dropdown box will close it and act as CANCEL', () => {
    Dash.clickUserProfile();
    Dash.verifyUserTreeNotVisible();
  });

  it('Login As Button Functionality', () => {
    Dash.clickLoginAs();
    Dash.enterUserToSearch('automation');
    Dash.verifySearchedUser();
    Dash.clickUserProfile();
  });

  it('Change Admin Status', () => {
    Dash.clickStatusButton();
    Dash.selectAvailable('Available', testData.campaign);
    Dash.clickConfirmButton();
  });

  it('verify elements in Dashboard Header', () => {
    Dash.verifyDashboardHeaderElement();
  });

  it('Verify functionality of Dialer button', () => {
    Dash.clickDialer();
    Dash.verifyDialPad();
  });

  it('Verify that call quality chart is being plotted when an agent is on a call', () => {
    addCont.dialPhoneNumber('6029227636');
    addCont.clickDialerCallButton();
    Dash.verifyCallStarted();
    cy.wait(3000);
    Dash.clickHardwareTestButton();
    Dash.verifyCallQualityChart();
    addCont.clickEndCallButton();
    addCont.selectCallResult('No Answer');
    addCont.clickContinueBtn();
    Dash.clickCallGraphCloseBtn();
  })

  it('Verify user is able to make call using dialer button', () => {
    Dash.clickDialer();
    Dash.dialNumber();
    Dash.clickCallButton('green');
    Dash.verifyCallStarted();
    cy.wait(3000);
    Dash.clickCallButton('red');
    Dash.clickAnsweringMachine();
    Dash.clickOnDoneButton();
  });

  it('Verify Task Button Functionality', () => {
    Dash.clickTaskButton();
    Dash.verifyTodayButton();
    Dash.verifyPastButton();
    Dash.verifyFutureButton();
    Dash.verifyCompletedCheckbox();
    Dash.verifyCalendarEventTypesBox();
    Dash.verifyAddEventTypeButton();
    Dash.verifyCalendarMonthPickerBox();
  });

  it('Add New Event Type in Tasks', () => {
    Dash.clickAddEventTypeButton();
    Dash.typeEventTypeName('Test');
    Dash.clickSaveEventTypeNameField();
    Dash.verifyAddedEventTypeName('Test');
  });

  it('Verify that Duplicate Event Type give Error', () => {
    Dash.clickAddEventTypeButton();
    Dash.typeEventTypeName('Test');
    Dash.clickSaveEventTypeNameField();
    Dash.verifyErrorMessage('Duplicate task type name');
  });

  it('Delete the Added Event Type', () => {
    Dash.clickDeleteEventTypeBtn('Test');
    Dash.verifyDeletedEventTypeName('Test');
  });

  it('create a new Today Event for a Contact', () => {
    Dash.clickTaskAddNewButton();
    Dash.enterEventTitle('Test');
    Dash.chooseContactToAddEvent(testData.Contact);
    Dash.enterEventDescription('For Testing');
    Dash.selectEventTime();
    Dash.clickEventSaveButton();
  });

  it('Verify that when click on the dates on the Calender,events of that specific date is displayed in the list view', () => {
    Dash.clickOnCalendarDate();
    Dash.verifyCalendarDateFilterTask();
  });

  it('Edit the created Event for a Contact', () => {
    Dash.clickEventThreeDotMenuBtn(testData.Contact);
    Dash.selectDropdownItemToClick('Edit Event');
    Dash.enterEventDescription(' Edited');
    Dash.clickEventSaveButton();
  });

  it('Verify that tasks of TODAY is displayed by default on page load', () => {
    Dash.clickDashboard();
    Dash.clickTaskButton();
    Dash.verifyTodayButtonIsSelected();
    Dash.verifyPastButtonNotSelected();
    Dash.verifyFutureButtonNotSelected();
  });

  it('Mark the created event Completed', () => {
    Dash.clickEventStatusCheckbox('Unknown Contact', 'Pending');
  });

  it('Verify that if event is marked as completed then it should disappear from list', () => {
    Dash.verifyCompletedEventDisappear('Unknown Contact');
  });

  it('Mark the Completed Event as Pending Event', () => {
    Dash.clickCompletedCheckbox();
    Dash.clickEventStatusCheckbox('Unknown Contact', 'Completed');
  });

  it('Delete the Added Event', () => {
    Dash.clickEventThreeDotMenuBtn(testData.Contact);
    Dash.selectDropdownItemToClick('Delete Event');
    Dash.clickEventThreeDotMenuBtn('Unknown Contact');
    Dash.selectDropdownItemToClick('Delete Event');
  });

  it('If TODAY,PAST,FUTURE and Completed are set by user,verify that those settings are kept throughout the current session', () => {
    Dash.clickPastButton();
    Dash.clickFutureButton();
    cy.wait(1000);
    cy.reload();
    ignoreSpeedTestPopup();
    //verify current session should maintained
    Dash.verifyTodayButton();
    Dash.verifyPastButton();
    Dash.verifyFutureButton();
    Dash.verifyCompletedCheckboxChecked();
  })

  it('Verify that authorized user is able to Filter the events by Event types in the list view', () => {
    Dash.clickAllEventTypesDropdown();
    Dash.selectEventTypes('Follow Up Call');
    Dash.verifyEventType('Follow Up Call');
  })

  it('Verify on click user profile show options', () => {
    Dash.clickUserProfile();
    Dash.verifyUserProfileOptions();
    Dash.clickUserProfile();
  });

  it('Verify User setting option should show these options', () => {
    Dash.clickUserProfile();
    Dash.clickSettingsButton();
    Dash.verifyUserSettingOptions([
      'Address Book',
      'Voicemail',
      'Billing',
      'Integrations',
      'Lead Score',
      'Agent Scripts',
      'Audio Library',
      'Lead Sheets',
    ]);
  });

  it('Verify User Setting Profile Elements', () => {
    Dash.clickUserProfile();
    Dash.clickProfile();
    Dash.verifyUserSettingsProfileFields([
      'firstname',
      'lastname',
      'email',
      'address',
      'city',
      'zip',
      'phone',
      'phone2',
    ]);
    Dash.verifyProfileState();
    Dash.verifyProfileTimeZone();
    Dash.verifyProfilePasswordChangeButton();
    Dash.verifyProfileAgentFeaturesEnable();
    Dash.verifyProfileAgentFeaturesDisable();
  });

  it('Verify User settings Billing Elements', () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.verifyCurrentBillingCard();
    Dash.verifyUsageStatus();
    Dash.verifyPaymentMethod();
    Dash.verifyBillingAddress();
    Dash.verifyPauseAccount();
    Dash.verifyCancelAccount();
    Dash.verifyInvoice();
  });

  it('Verify that when user Add a Credit/debit card opens a popup', () => {
    Dash.closeCreditCardPopup();
    Dash.clickCardEditBtn();
    Dash.verifyPopUpHeader('Credit card management');
  });

  it('Add New Credit Card', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        Dash.closeCreditCardPopup();
        Dash.clickUserProfile();
        Dash.clickBilling();
        Dash.clickCardEditBtn();
        Dash.clickAddNewCard();
        Dash.enterCardName(Cypress.env('CardName'));
        Dash.enterCardNumber(Cypress.env('CardNumber'));
        Dash.enterExpiryDate(Cypress.env('ExpiryDate'));
        Dash.enterCVC(Cypress.env('CVC'));
        Dash.chooseCountry(Cypress.env('Country'));
        Dash.enterBillingZip(Cypress.env('BillingZip'));
        Dash.clickContinue();
        Dash.verifyAddedCard(
          Cypress.env('CardNumber')
          .slice(Cypress.env('CardNumber')
          .length - 4)
        );
      } else {
        Dash.closeCreditCardPopup();
        Dash.clickUserProfile();
        Dash.clickBilling();
        Dash.clickCardEditBtn();
        Dash.clickAddNewCard();
        Dash.enterCardName(fixtureData.cardHolderName);
        Dash.enterCardNumber(fixtureData.cardNumber);
        Dash.enterExpiryDate(fixtureData.cardExpiryDate);
        Dash.enterCVC(fixtureData.cardCVC);
        Dash.chooseCountry('United States');
        Dash.enterBillingZip('43256');
        Dash.clickContinue();
        Dash.verifyAddedCard(cardLast4Digit);
      }
    })
  });

  it('Verify that when user click on the star will make the card primary and there should tooltip present', () => {
    Dash.mouseHoverOnStar();
    Dash.verifyTooltipText('Make as primary');
  });

  it('Verify that Cards should not be edited, only deleted', () => {
    Dash.verifyDeleteIcon();
  })

  it('Verify the Default Credit Card Functionality', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        Dash.closeCreditCardPopup();
        Dash.clickCardEditBtn();
        Dash.clickCardDefaultBtn(
          Cypress.env('CardNumber')
          .slice(Cypress.env('CardNumber')
          .length - 4)
        );
        Dash.verifyCardDefault(
          Cypress.env('CardNumber')
          .slice(Cypress.env('CardNumber')
          .length - 4)
        );
        Dash.clickCardDefaultBtn('8192');
        Dash.verifyCardDefault('8192');
      } else {
        Dash.closeCreditCardPopup();
        Dash.clickCardEditBtn();
        Dash.clickCardDefaultBtn(cardLast4Digit);
        Dash.verifyCardDefault(cardLast4Digit);
        Dash.clickCardDefaultBtn('5100');
        Dash.verifyCardDefault('5100');
      }
    })
  });

  it('Delete the Added New Credit Card', () => {
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        Dash.closeCreditCardPopup();
        Dash.clickCardEditBtn();
        Dash.clickDeleteCardBtn(
          Cypress.env('CardNumber')
          .slice(Cypress.env('CardNumber')
          .length - 4)
        );
        Dash.verifyCardDelete();
      } else {
        Dash.closeCreditCardPopup();
        Dash.clickCardEditBtn();
        Dash.clickDeleteCardBtn(cardLast4Digit);
        Dash.verifyCardDelete();
      }
    })
  });

  it('Verifies monthly total should be greater when keeping phone', () => {
    Dash.closeCreditCardPopup();
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.clickPauseAccountBtn();
    cy.wait(2000);
    Dash.compareBaseAndTotalPrice('keep phone');
    Dash.clickClosePauseSubscriptionBox();
  });

  it('Verifies monthly total should be equal when not keeping phone', () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.clickPauseAccountBtn();
    cy.wait(2000);
    Dash.clickKeepPhoneCheckbox();
    Dash.compareBaseAndTotalPrice('dont keep phone');
    Dash.clickClosePauseSubscriptionBox();
  });

  it('Pause Account while keeping the Phone Number', () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.clickPauseAccountBtn();
    cy.wait(2000);
    Dash.clickPutSubscriptionOnHold();
    //Dash.clickStartBtn();
    Dash.verifyAccountPauseMessage();
    Dash.clickBillingNotificationBtn('Renew Subscription');
    Dash.verifyPauseAccount();
  });

  it('Pause Account while not keeping the Phone Number', () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.clickPauseAccountBtn();
    cy.wait(2000);
    Dash.clickKeepPhoneCheckbox();
    Dash.clickPutSubscriptionOnHold();
    //Dash.clickStartBtn();
    Dash.verifyAccountPauseMessage();
    Dash.clickBillingNotificationBtn('Renew Subscription');
    Dash.verifyPauseAccount();
  });

  it('Verify User settings Address Boook elements', () => {
    Dash.clickUserProfile();
    Dash.clickSettingsButton();
    Dash.clickAddressBook();
    Dash.verifyAddressBookingHeading();
    Dash.verifyAddressBookNewContactButton();
    Dash.verifyAddressBookTableHeaderElement([
      'Name',
      'Description',
      'Phone Number',
      'Created',
    ]);
  });

  it('Add a New Contact', () => {
    Dash.closeModalTitle();
    Dash.clickAddressBook();
    Dash.clickAddNewContact();
    Dash.enterContactName('Testing');
    Dash.enterPhoneNumber('9999999999');
    Dash.enterDescription('This is a Testing contact');
    Dash.clickOnButton('SAVE');
    Dash.verifyAddedContact('Testing');
  });

  it('Fails to Add a Duplicate Contact', () => {
    Dash.closeModalTitle();
    Dash.clickAddressBook();
    Dash.clickAddNewContact();
    Dash.enterContactName('Testing');
    Dash.enterPhoneNumber('9999999999');
    Dash.enterDescription('This is a Testing contact');
    Dash.clickOnButton('SAVE');
    Dash.verifyErrorMessage('Duplicate contact name');
    Dash.clickCancelBtn();
  });

  it('Edit the Existing contact', () => {
    Dash.closeModalTitle();
    Dash.clickAddressBook();
    Dash.clickEditBtn('Testing');
    Dash.enterContactName('DemoTesting');
    Dash.enterPhoneNumber('9999999999');
    Dash.enterDescription('This is the edited Contact');
    Dash.clickOnButton('SAVE');
    Dash.verifyAddedContact('DemoTesting');
  });

  it('Delete the Contact', () => {
    Dash.closeModalTitle();
    Dash.clickAddressBook();
    Dash.clickDeletebtn('DemoTesting');
    Dash.verifyContactDelete('DemoTesting');
  });

  it('Verify User Setting Lead Sheet Elements', () => {
    Dash.clickUserProfile();
    Dash.clickSettingsButton();
    Dash.clickLeadSheets();
    Dash.verifysearchBox();
    Dash.VerifyRadioBtn(['All', 'Active', 'Inactive']);
    Dash.verifyAddNewLeadSheetBtn();
  });

  it('Verify the Table Headings of Lead Sheet', () => {
    Dash.verifyLeadSheetTableHeadings(['Form Name', 'State', 'Added']);
    Dash.verifyRefreshBtn();
  });

  it('Add a New Lead sheets', () => {
    Dash.closeModalTitle();
    Dash.clickAddNewLeadSheet();
    Dash.clickLeadSheetName();
    cy.wait(1000);
    Dash.enterLeadSheetName('Testing');
    Dash.clickSaveFieldBtn();
    Dash.selectLeadItem('Text');
    Dash.clickLeadItemsNameField('text');
    Dash.enterLeadItemsName('Test');
    Dash.clickSaveFieldBtn();
    Dash.clickLeadSaveBtn();
    Dash.verifyAddedLeadSheet('Testing');
  });

  it('Give error when enter the Duplicate Leadsheet name', () => {
    Dash.closeModalTitle();
    Dash.clickAddNewLeadSheet();
    Dash.clickLeadSheetName();
    Dash.enterLeadSheetName('Testing');
    Dash.clickSaveFieldBtn();
    Dash.selectLeadItem('Text');
    Dash.clickLeadItemsNameField('text');
    Dash.enterLeadItemsName('Test');
    Dash.clickSaveFieldBtn();
    Dash.clickLeadSaveBtn();
    Dash.verifyErrorMessage('Duplicate leadsheet name');
    Dash.clickOnButton('CANCEL');
  });

  it('Verify the search functionality for LeadSheet', () => {
    Dash.closeModalTitle();
    Dash.enterNameToSearch('Testing');
    Dash.verifyAddedLeadSheet('Testing');
  });

  it('Delete the added Lead Sheet', () => {
    Dash.clickDeleteLeadSheet('Testing');
    Dash.verifyDeletedLeadSheet('Testing');
  });

  it('Verify that default label is maintained if no lable name is provided when creating a new  leadsheet', () => {
    Dash.verifyLeadSheetExistOrNot('TestingLeadSheet');
    Dash.clickAddNewLeadSheet();
    Dash.clickLeadSheetName();
    cy.wait(1000);
    Dash.enterLeadSheetName('TestingLeadSheet');
    Dash.clickSaveFieldBtn();
    Dash.selectLeadItem('Text');
    Dash.selectLeadItem('Email');
    Dash.selectLeadItem('Phone');
    Dash.selectLeadItem('Rating');
    Dash.clickLeadsheetCheckbox('email');
    Dash.clickLeadSaveBtn();
    Dash.verifySuccessMsg('Saved');
    Dash.clickEditLeadSheet('TestingLeadSheet');
    Dash.verifyCustomLabel(['Text','Email','Phone','Rating']);
    Dash.clickCancelBtn();
  });

  it('Verify that lead sheet created is reflected in the create campaign page', () => {
    camp.clickCampaignMenu(); 
    camp.clickAddNewCampaign();
    camp.selectDialingMode('Predictive');
    camp.selectAgentToAssign(testData.AdminName);
    camp.selectPhoneNumberToAssign(testData.Number);
    camp.clickAdvancedConfiguration();
    camp.verifyLeadSheets('TestingLeadSheet');
  });

  it('Verify that field marked as required is validated when agent filling the lead sheet form', () => {
    Dash.clickStatusButton();
    Dash.selectAvailable('Available', testData.campaign);
    Dash.clickConfirmButton();
    camp.clickCampaignMenu(); 
  Dash.clickCloseSoftphoneBtn();
    camp.clickEditCampaign(testData.campaign);
    camp.clickEditBtn();
    camp.clickAdvancedConfiguration();
    cy.wait(3000)
    camp.selectLeadSheetDropdown('TestingLeadSheet');
    camp.clickOnButton('Save');
    camp.verifyToast('Campaign Saved');
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    addCont.clickContactName(testData.Contact);
    addCont.verifyContactViewPageVisible();
    addCont.clickOnButton('Lead Sheets');
    addCont.clickLeadsheetSaveBtn();
    addCont.verifyErrorMsg('This field is required');
  });

  it('Verify that email field is getting validated when agent filling the lead sheet form', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    addCont.clickContactName(testData.Contact);
    addCont.verifyContactViewPageVisible();
    addCont.clickOnButton('Lead Sheets');
    addCont.enterLeadSheetField('email','abcd');
    addCont.verifyErrorMsg('Enter valid email');
  })

  it('Verify that agent user is able to fill the lead sheet in the View contact-->Leadsheet tab', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    addCont.clickContactName(testData.Contact);
    addCont.verifyContactViewPageVisible();
    addCont.clickOnButton('Lead Sheets');
    addCont.enterLeadSheetDetails('Hello!','abc@tezt.com','9999999999',3);
    addCont.clickLeadsheetSaveBtn();
    addCont.verifySuccessToastMessage('Success');
    Dash.clickUserProfile();
    Dash.clickSettingsButton();
    Dash.clickLeadSheets();
    Dash.clickDeleteLeadSheet('TestingLeadSheet');
    Dash.verifyDeletedLeadSheet('TestingLeadSheet');
  })

  it('Verify User Setting Voicemail Elements', () => {
    Dash.clickVoicemail();
    Dash.verifyVoicemailHeading();
    Dash.verifyNewMailButton();
    Dash.verifyVoicemailTableHeading([
      'Voicemail',
      'Email',
      'Audio',
      'Created',
    ]);
  });

  it('Verify that user is able to add Voicemail', () => {
    Dash.closeModalTitle();
    Dash.clickVoicemail();
    Dash.clickOnButton('NEW VOICEMAIL');
    Dash.enterRecordingName('Testing');
    Dash.enterEmailForDelivery(testData.email);
    Dash.selectRecording('Recording');
    Dash.clickOnButton('Save');
    Dash.verifySearchResult('Testing');
  });

  it('Verify that user can edit the Voicemail', () => {
    Dash.closeModalTitle();
    Dash.clickVoicemail();
    Dash.clickEditBtn('Testing');
    Dash.enterRecordingName('DemoTesting');
    Dash.enterEmailForDelivery(testData.AgentEmail);
    Dash.clickOnButton('Save');
    Dash.verifySearchResult('DemoTesting');
    Dash.verifySearchResult(testData.AgentEmail);
  });

  it('User is able to delete the Voicemail', () => {
    Dash.closeModalTitle();
    Dash.clickVoicemail();
    Dash.clickDeleteRecordingBtn('DemoTesting');
    Dash.verifyDeletedRecording('DemoTesting');
    Dash.verifySuccessMsg('Mailbox deleted');
  });

  it('Verify User Setting Lead Score elements', () => {
    Dash.clickLeadScore();
    Dash.verifyLeadScoreHeading();
    Dash.verifyLeadScoringTable();
    Dash.verifyNewRulerButton();
    Dash.verifyLeadScoreExample();
  });

  it('Add a New Lead Rule', () => {
    Dash.clickLeadScore();
    Dash.clickNewRuleBtn();
    Dash.clickOnButton('Save');
    Dash.verifyAddedRule('Email');
  });

  it('Remove the added Lead Rule', () => {
    Dash.clickLeadScore();
    Dash.clickRuleRemoveBtn('Email');
    Dash.clickOnButton('Save');
    Dash.verifyRuleRemoved('Email');
  });

  it('Verify User Setting Agent Scripts Elements', () => {
    Dash.clickAgentScripts();
    Dash.verifyAgentScriptHeading();
    Dash.verifyNewAgentScriptButton();
    Dash.verifyAgentScriptTableHeading(['Script Name', 'Created']);
  });

  it('Add a New Agent Script', () => {
    Dash.closeModalTitle();
    Dash.clickAgentScripts();
    Dash.clickNewAgentScriptBtn();
    Dash.enterScriptName('Testing');
    Dash.enterScriptText('This is a testing Script');
    Dash.clickOnButton('SAVE');
    Dash.verifyAddedScript('Testing');
  });

  it('Add a New Agent Script with duplicate name', () => {
    Dash.closeModalTitle();
    Dash.clickAgentScripts();
    Dash.clickNewAgentScriptBtn();
    Dash.enterScriptName('Testing');
    Dash.enterScriptText('This is a testing Script');
    Dash.clickOnButton('SAVE');
    Dash.verifyErrorMessage('Duplicate agent script name');
    Dash.clickCancelBtn();
  });

  it('Edit the Agent Script', () => {
    Dash.closeModalTitle();
    Dash.clickAgentScripts();
    Dash.clickEditBtn('Testing');
    Dash.enterScriptName('DemoTesting');
    Dash.enterScriptText('This is the Edited Agent Script');
    Dash.clickOnButton('SAVE');
    Dash.verifyEditScript('DemoTesting');
  });

  it('verify that user is able to add tags', () => {
    Dash.closeModalTitle();
    Dash.clickAgentScripts();
    Dash.clickEditBtn('DemoTesting');
    Dash.clickEditorTag(['First Name','Last Name','Address','Email']);
    Dash.verifyScriptTag(['First Name','Last Name','Address','Email']);
  });

  it('verify that user is able to select the element on toolbar', () => {
    Dash.verifyToolbar();
    Dash.verifyToolbarListOrder();
  });

  it('Remove the Added Agent Script', () => {
    Dash.closeModalTitle();
    Dash.clickAgentScripts();
    Dash.clickDeletebtn('DemoTesting');
    Dash.verifyScriptDelete('DemoTesting');
  });

  it('verify that user should not be able to save agent Script without entering Script name and Script Text', () => {
     Dash.closeModalTitle();
    Dash.clickAgentScripts();
    Dash.clickNewAgentScriptBtn();
    Dash.clickOnButton('SAVE');
    Dash.verifyErrorMsg(['Enter script name','Enter script text']);
    Dash.clickCancelBtn();
  });

  it('Verify User Setting Audio Library Elements', () => {
    Dash.clickUserProfile();
    Dash.clickSettingsButton();
    Dash.clickAudioLibrary();
    Dash.verifyAudioLibraryNewRecording();
    Dash.verifyAudioLibrarySearchBox();
    Dash.verifyAudioLibraryTableHeading([
      'Recording Name',
      'File Name',
      'Audio Type',
      'Created',
    ]);
    Dash.verifyAudioLibraryRecordings();
  });

  it('Add a new Recording using Upload File', () => {
    Dash.clickAudioLibrary();
    Dash.clickAddNewRecording();
    Dash.uploadFile('preview.mp3');
    Dash.enterRecordingName('preview' + randNum.toString());
    Dash.clickRecordingSaveButton();
    Dash.enterNameToSearch('preview' + randNum.toString());
    Dash.verifyRecording('preview' + randNum.toString());
  });

  it('Add a new recording using Text to Speech', () => {
    Dash.clickAudioLibrary();
    Dash.clickAddNewRecording();
    Dash.clickTextToSpeech();
    Dash.enterRecordingName('TextSpeech' + randNum.toString());
    Dash.enterRecordingText('Hey How Are You');
    Dash.clickGenerateButton();
    Dash.clickRecordingSaveButton();
    Dash.enterNameToSearch('TextSpeech' + randNum.toString());
    Dash.verifyRecording('TextSpeech' + randNum.toString());
  });

  it('Verifies the Search functionality', () => {
    Dash.clickAudioLibrary();
    Dash.enterNameToSearch('preview' + randNum.toString());
    Dash.verifySearchResult('preview' + randNum.toString());
    Dash.clickSearchClearBtn();
    Dash.enterNameToSearch('TextSpeech' + randNum.toString());
    Dash.verifySearchResult('TextSpeech' + randNum.toString());
    Dash.clickSearchClearBtn();
  });

  it('Delete the Recording', () => {
    Dash.clickAudioLibrary();
    Dash.enterNameToSearch('preview' + randNum.toString());
    Dash.clickDeleteRecordingBtn('preview' + randNum.toString());
    Dash.enterNameToSearch('preview' + randNum.toString());
    Dash.verifyDeletedRecording('preview' + randNum.toString());
    Dash.enterNameToSearch('TextSpeech' + randNum.toString());
    Dash.clickDeleteRecordingBtn('TextSpeech' + randNum.toString());
    Dash.enterNameToSearch('TextSpeech' + randNum.toString());
    Dash.verifyDeletedRecording('TextSpeech' + randNum.toString());
  });

  it('Call feature should disable for admin if Agent Feature is Disable', () => {
    Dash.clickUserProfile();
    Dash.clickProfile();
    Dash.clickAgentFeatureDisable();
    Dash.clickSaveButton();
    Dash.verifyDialerNotVisible();
  });

  it('Call feature should enable for admin if Agent Feature is Enable', () => {
    Dash.clickUserProfile();
    Dash.clickProfile();
    Dash.clickAgentFeatureEnable();
    Dash.clickSaveButton();
    Dash.verifyDialerVisible();
  });

  //In affiliate page changes has been done
  it.skip('Send Email to add a New Lead', () => {
    Dash.clickUserProfile();
    Dash.clickSettingsButton();
    Dash.clickAffiliateBtn();
    Dash.enterLeadEmail('testing@email.com');
    Dash.clickLeadSubmitBtn();
    Dash.VerifyLeadSendMessage();
  });

  it('download invoice and Verify', () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.downloadAndVerifyInvoice();
  });

  it('Verify that Column data (Paid change and Billing period) columns should be merged in BILLING PERIOD', () => {
    Dash.verifyBillingTableHeader([
      'Invoice',
      'Status',
      'Amount',
      'Created',
      'Billing Period'
    ]);
  });

  it('Verify that Subscription modification should be triggered', () => {
    Dash.clickBillingEditBtn();
    Dash.clickOnAgentPlusMinusIcon('-');  //downgrade agent seat in current plan
    Dash.clickOnDowngradeBtn();         
    Dash.verifyDowngradeButton('Selected Plan');
    Dash.clickOnAgentPlusMinusIcon('+'); 
    Dash.clickOnDowngradeBtn();          //downgrade plan SLD 
    Dash.verifyDowngradeButton('Selected Plan');
    Dash.clickOnAgentPlusMinusIcon('+');   //upgrade seat in current plan
    Dash.clickOnUpgradeBtn();           
    Dash.verifyUpgradeButton('Selected Plan');
    Dash.clickOnButton('Cancel');
  });

  it('Verify that (Amount and Created table) in Invoice table sorting option should be present', () => {
    Dash.verifyTableHeaderSorting('Amount');
    Dash.verifyTableHeaderSorting('Created');
  });

  it('Verify that Right panel should have: Billing Information, Billing date, Payment Methods, Pause/Cancelling', () => {
    Dash.verifyBillingInfoHeader('Billing Information');
    Dash.verifyBillingAddress();
    Dash.verifyPaymentMethod();
    Dash.verifyBillingPeriod();
    Dash.verifyPauseAccount();
    Dash.verifyCancelAccount();
  });

  it('Verify chat option should be visible', () => {
    Dash.clickDashboard();     //team chat box at top-left
    Dash.verifyChaticon();
  });

  it('Verify Chat icon should open chat window', () => {
    Dash.clickResourceCenterIcon();
    Dash.clickCustomerChat();
    Dash.clickBatchDialerSupport('BatchDialer');
    Dash.verifyChatPopUp();      //customer support window
  });

  it('Verify user is able to enter chat in chat box', () => {
    Dash.enterEmailInBox(testData.email, 'Hello');
    Dash.enterChatInBox('Hello, I am testing the application');
    Dash.verifyMessageSent('Hello, I am testing the application');
  });

  it('Verify chat pop up Elements', () => {
    Dash.verifyChatTitle('BatchDialer');
    Dash.verifyAttachmentIcon();
    Dash.verifyEmojiIcon();
    Dash.verifyCloseButton();
  });

  it('When admin select status as available it should show start calling in popup', () => {
    Dash.clickStatusButton();
    Dash.selectAvailable('Available', testData.campaign);
    Dash.verifyPopUpHeader('Start Calling');
    Dash.clickConfirmButton();
  });

  // Fixed according to the BAT-747
  it('Verify Admin is able to Switch to Agents Account', () => {
    Dash.clickCloseSoftphoneBtn();
    Dash.clickLoginAs();
    Dash.clickLoginAsPlusIcon();
    Dash.clickAgentOrSupervisor(testData.agent);
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.agent);
    Dash.clickBackToAdmin();
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.AdminName);
  });

  // Fixed according to the BAT-747
  it('verify Admin is able to switch to Supervisor Account', () => {
    Dash.clickLoginAs();
    Dash.clickLoginAsPlusIcon();
    Dash.clickAgentOrSupervisor(testData.supervisor);
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.supervisor);
    Dash.clickBackToAdmin();
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.AdminName);
  });

  it('Verify on Click of Home Button Admin should Redirect to Dashboard', () => {
    addCont.clickingOnContactOption();
    Dash.clickHomeButton();
    Dash.verifyDashboardLiveCalls();
  });

  it('Verify that Chat Box should open when click on Chat Icon', () => {
    Dash.clickDashboard();
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
  });

  it('Verify that clicking the close button should close the chat window', () => {
    Dash.clickChatCloseButton();
    Dash.verifyChatBoxClose();
  });

  it('Verify that one can not send blank message', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.clickStartChatButton();
    Dash.selectUserToSendMessage([testData.agent]);
    Dash.VerifySendMessageButton('be.disabled');
    Dash.clickChatCloseButton();
  });

  it('Verify the limit of message that user can not send more than 160 words', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.clickStartChatButton();
    Dash.enterMessageMoreThan160Words('b');
    Dash.verifyMessageLimit();
  });

  it('Verify that Emoji Window should open when click Emoji Icon', () => {
    Dash.clickEmojiIcon();
    Dash.verifyEmojiWindow();
  });

  it('Verify user can Search emoji in Emoji window', () => {
    Dash.enterEmojiName('cake');
    Dash.verifySearchedEmoji('cake');
    Dash.clickEmojiIcon();
    Dash.clickChatCloseButton();
  });

  it('Send message to the agent', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.clickStartChatButton();
    Dash.selectUserToSendMessage([testData.agent]);
    Dash.enterMessage(message('Admin'));
    Dash.clickSendMessageButton();
    Dash.clickChatCloseButton();
  });

  it('Verify that the Agent receive the message', () => {
    Dash.clickLoginAs();
    Dash.clickLoginAsPlusIcon();
    Dash.clickAgentOrSupervisor(testData.agent);
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.agent);
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.selectChat(testData.AdminName);
    Dash.verifyMessageText(message('Admin'));
    Dash.enterMessage(message('Agent'));
    Dash.clickSendMessageButton();
    Dash.clickChatCloseButton();
    Dash.clickBackToAdmin();
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.AdminName);
  });

  it('Verify that the admin have recieved the message from Agent', () => {
    verifyRoleTitle();
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.selectChat(testData.agent);
    Dash.verifyMessageText(message('Agent'));
    Dash.clickChatCloseButton();
  });

  it('Send message to the supervisor', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.clickStartChatButton();
    Dash.selectUserToSendMessage([testData.supervisor]);
    Dash.enterMessage(message('Admin'));
    Dash.clickSendMessageButton();
    Dash.clickChatCloseButton();
  });

  it('Verify that the supervisor have receive message from Admin', () => {
    Dash.clickLoginAs();
    Dash.clickLoginAsPlusIcon();
    Dash.clickAgentOrSupervisor(testData.supervisor);
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.supervisor);
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.selectChat(testData.AdminName);
    Dash.verifyMessageText(message('Admin'));
  });

  it('Verify that supervisor can send message to Admin', () => {
    Dash.enterMessage(message('Supervisor'));
    Dash.clickSendMessageButton();
    Dash.clickChatCloseButton();
    Dash.clickBackToAdmin();
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.AdminName);
  });

  it('Verify that Admin have received message from Supervisor', () => {
    verifyRoleTitle();
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.selectChat(testData.supervisor);
    Dash.verifyMessageText(message('Supervisor'));
    Dash.clickChatCloseButton();
  });

  it('Verify that one can search other user chat using search box', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.enterChatToSearch(testData.agent);
    Dash.verifySearchedChatName(testData.agent);
    Dash.clickChatCloseButton();
  });

  it('Verify that admin can send message to another admin', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    Dash.clickStartChatButton();
    Dash.selectUserToSendMessage([testData.adminWithoutCalling]);
    Dash.enterMessage(message('Admin'));
    Dash.clickSendMessageButton();
    Dash.clickChatCloseButton();
  });

  it('Verify that user can create group and send message', () => {
    Dash.clickMessageIcon();
    Dash.verifyChatBox();
    cy.wait(1000);
    Dash.clickStartChatButton();
    Dash.selectUserToSendMessage([testData.agent, testData.supervisor]);
    Dash.enterMessage(message('Admin'));
    Dash.clickSendMessageButton();
    Dash.clickChatCloseButton();
  });

  it('Verify that Next Billing date is displayed in the BILLING INFO section', () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    Dash.verifyBillingCycle();
  });

  it('Verify that Billing section should be as a part of Settings Menu', () => {
    Dash.verifyPage('billing');
  });

  it('Verify that in billing page at the top panel billing sumarry details should be available', () => {
    Dash.verifyBillingPlan('Multi-Line Dialer');
    Dash.verifyBillingPrice('$');
  });

  it('Verify that State name is prefilled in the feedback form  If the state info is present in the Billing profile', () => {
    Dash.clickCancelAccount();
    Dash.clickProceedWithCancel();
    Dash.chooseCancelAccountReason('It Costs Too Much');
    Dash.EnterConfirmCancelAccount('DELETE');
    Dash.verifyState('NY');
    Dash.clickDialogCloseButton();
  });

  it('Verify that the authorized user is able to cancel the account states other than CA, NY, OR', () => {
    Dash.clickCancelAccount();
    Dash.clickProceedWithCancel();
    Dash.chooseCancelAccountReason('It Costs Too Much');
    Dash.EnterConfirmCancelAccount('DELETE');
    Dash.selectState('AZ');
    Dash.clickProceedWithCancel();
    Dash.clickCancelImmediately();
    Dash.verifyContactSupportWindow(
      'Your Cancellation Request has been successfully submitted.If you have additional questions or would like to revert your cancellation, please call (844) 933-3984.After '+ date[0] + 
      ', you will no longer be able to access your saved data and account.'
    );
    Dash.clickDialogCloseButton();
    Dash.clickBillingNotificationBtn('Renew Subscription');
    Dash.verifySuccessMsg('Your subscription has been renewed');
  });

  it('Verify that the authorized user is able to cancel the account states CA, NY OR', () => {
    Dash.clickCancelAccount();
    Dash.clickProceedWithCancel()
    Dash.chooseCancelAccountReason('It Costs Too Much');
    Dash.EnterConfirmCancelAccount('DELETE');
    Dash.selectState('CA');  //NY OR
    Dash.clickProceedWithCancel();
    Dash.clickCancelImmediately();
    Dash.verifyContactSupportWindow(
      'Thank you for your feedback, your account has been set to cancel on ' + date[0] + '.If you have additional questions or would like to revert your cancellation, please call (844) 933-3984.After '
      + date[0] + ', you will no longer be able to access your saved data and account.'
    );
    Dash.clickDialogCloseButton();
  });

  it('Verify the functionality of PAUSE INSTEAD button in the Cancelled notification', () => {
    Dash.clickBillingNotificationBtn('Pause Instead');
    Dash.ClickSubscriptionOnHoldBtn();
    Dash.verifySuccessMsg('Your account pause has been scheduled');
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Verify the functionality of RENEW SUBSCRIPTION in the Cancelled Notification', () => {
    Dash.clickBillingNotificationBtn('Renew Subscription');
    Dash.verifySuccessMsg('Your subscription has been renewed');
  });

  it('Verify that authorized user is able to downgrade number of Seats', () => {
    cy.wait(5000)
    Dash.clickOnButton('Upgrade');
    Dash.clickOnAgentPlusMinusIcon('-');
    Dash.clickOnDowngradeBtn();
    Dash.verifyDowngradeButton('Selected Plan');
    Dash.clickOnButton('Continue');
    cy.wait(1000);
    Dash.clickOnButton('CONTINUE');
    Dash.verifySuccessMsg('Scheduling the plan change, please wait');
    Dash.verifyAlertNotification('1 Agent seat will be cancelled on '+ date[1]);
  });

  it('Verify the functionality of DO NOT CANCEL in the Downgrade notification', () => {
    Dash.clickBillingNotificationBtn('Do Not Cancel');
    Dash.verifySuccessMsg('Your seats cancelation stopped');
    Dash.verifyAlertMsgNotExist();
  });

  it('Verify that number of seats cannot be downgraded to a number that is lower, than the number of current agents', () => { //BAT-T908
    Dash.verifyDowngradeAgentSeatCount();
    Dash.verifyAlertNotification('You cannot downgrade to a lower number seat unless agent is removed'); 
    Dash.clickOnButton('Cancel');
  });

  it('Verify that user can Upgrade/Downgrade plan and Upgrade/Downgrade seat', () => {
    Dash.closeModalTitle();
    Dash.clickBillingEditBtn();
    Dash.clickOnDowngradeBtn();          //downgrade plan SLD 
    Dash.verifyDowngradeButton('Selected Plan');
    Dash.clickOnButton('Continue');
    cy.wait(1000);
    Dash.verifyPopUpHeader('Order forSingle Line Dialer');
    Dash.verifyModalBody('Your plan will be downgraded to Single Line Dialer on ' + date[1] + 
    '. You will be able to renew your subscription before the date.');
    Dash.clickOnButton('CONTINUE');
    Dash.verifySuccessMsg('Scheduling the plan change, please wait');
    Dash.verifyAlertNotification('Your plan is paid until '+ date[1] + '. After that, your plan Multi-Line Dialer (monthly) will be downgraded to Single Line Dialer (monthly)');
    Dash.clickBillingNotificationBtn('Renew Subscription');
    Dash.verifySuccessMsg('Your subscription has been renewed');
    
    Dash.clickBillingEditBtn();
    Dash.clickOnAgentPlusMinusIcon('+');   //upgrade seat in current plan
    Dash.clickOnUpgradeBtn();           
    Dash.verifyUpgradeButton('Selected Plan');
    Dash.clickOnButton('Continue');
    cy.wait(1000);
    Dash.verifyPaymentPricePlan();
    Dash.clickOnButton('Cancel');
  });

  it('Verify that Billing date change will be done in calendar control displaying a current month', () => {
    Dash.clickBillingPeriodBtn();
    Dash.changeBillingDate();
    Dash.clickOnButton('SAVE');
    Dash.verifyAlertNotification('Your billing cycle will be changed to 5th of each month and change will take effect during next billing date.');
    Dash.clickBillingPeriodBtn();
    Dash.verifyToastMessage('Billing cycle reset canceled');
  });

  it('Verify the elements in the INTEGRATIONS page', () => {
    Dash.clickIntegrationsBtn();
    Dash.clickIntegrationsTab('Integration Keys');
    Dash.verifyIntegrationTitle();
    Dash.verifyAlertMsg('Separate API key should be used per each integration to avoid leads to be missing');
    Dash.verifyIntegrationKeyBtn();
    Dash.verifyTableHeadings(['Name','Key','Created By','Last Updated']);
    Dash.verifyIconVisible('edit');
    Dash.verifyIconVisible('delete');
  });

  it('Verify that authorized user is able to generate API key', () => {
    Dash.clickAddIntegrationKeyBtn();
    Dash.verifyModalTitle('Add New Integration Key');
    Dash.verifyApiKeyField();
  });

  it('Verify user is able to ADD new integration key', () => {
    Dash.enterName('Testing');
    Dash.clickSaveButton();
    Dash.verifySuccessMsg('Created Successfully');
    Dash.verifyAddedData('Testing');
  });

  it('Verify user unable to create duplicate integration key with same Name', () => {
    Dash.clickAddIntegrationKeyBtn();
    Dash.enterName('Testing');
    Dash.clickSaveButton();
    Dash.verifyToastMessage('Create Failed');
  });

  it('verify that user is click on cancel tab', () => {
    Dash.clickOnButton('Cancel');
  });

  it('Verify user is able to EDIT integration key', ()  => {
    Dash.clickOnIconBtn('Testing', 'edit');
    Dash.enterName('Testing-edited');
    Dash.clickSaveButton();
    Dash.verifySuccessMsg('Updated Successfully');
    Dash.verifyAddedData('Testing-edited');
  });

  it('Verify user is able to click on EYE_ICON', () => {
    Dash.verifyApiKeyVisibility('Testing-edited', '****');
    Dash.clickOnIconBtn('Testing-edited','view_gray');
    Dash.verifyApiKeyVisibility('Testing-edited');
  });

  it('Verify user is able to copy API KEY', () => {
    cy.wait(1000);
    Dash.clickOnIconBtn('Testing-edited', 'copy');
    Dash.verifySuccessMsg('Copied Successfully');
  });

  it('Verify user is able to click on sorting tab', ()  => {
    Dash.clickTableHeaderSort('Name');
    Dash.verifySorting(1);
    Dash.clickOnEyeBtn();
    Dash.clickTableHeaderSort('Key');
    Dash.verifySorting(2);
    Dash.clickTableHeaderSort('Created By');
    Dash.verifySorting(4); 
  });

  it('Verify user is able to DELETE integration key', () => {
    Dash.clickOnIconBtn('Testing-edited', 'delete');
    Dash.verifyModalTitle('Delete Integration Key');
    Dash.clickOnButton('Delete');
    Dash.verifySuccessMsg('Deleted Successfully');
  });

  it('Verify that when user enter the space in name of an API then the error message should be shown', () => {
    Dash.clickAddIntegrationKeyBtn();
    Dash.enterName(' ');
    camp.verifyQuestionTooltipText('This field is required');
    Dash.clickOnButton('Cancel');
  });

  it('Verify that user should able to purchase number by billing page', () => {
    Dash.clickBillingBtn();
    Dash.clickPhonePlusIcon();
    addNum.enterAreaCode('720');
    addNum.verifySearchNumber('720');
    addNum.selectPhoneNumber();
    addNum.getFirstPhoneNumber();
    addNum.clickOrderNowButton();
    Dash.verifySuccessMsg('Ordering started, please wait');
    addNum.closingDialog();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      addNum.clickPhoneNumberMenu();
      addNum.deleteAddedPhoneNumber(data.BuyNumber);
      addNum.handleAlertForDelete();
    });
    addNum.verifyDeletedToast();
  });

  it('verify that calendar filter is visible in Main dashboard', () => {
    Dash.clickDashboard();
    Dash.clickOnMainTab();
    Dash.verifyDashboardCalandar();
  });

  it('Verify Calendar Month Left Arrow Functionality', () => {
    Dash.clickDashboardCalendar();
    var month = Dash.getLastMonth();
    Dash.clickTaskLeftArrow();
    Dash.verifyMonth(month);
  });

  it('Verify Admin a Able to use Filter on Dashboard', () => {
    Dash.EnterFilterStartAndEndDate('1', 'DayPicker-Day--start');
    Dash.EnterFilterStartAndEndDate('25', 'DayPicker-Day--end');
    Dash.clickDashboardCalendar();
  });

  it('verify Calendar filter on Dashboard', () => {
    let filterDate;
    Dash.clickDashboardCalendar();
    filterDate = Dash.clickOnTimeSpan('Today');
    Dash.verifyFilterDate(filterDate);
    filterDate = Dash.clickOnTimeSpan('Last 7 Days');
    Dash.verifyFilterDate(filterDate);
    filterDate = Dash.clickOnTimeSpan('Last 4 Weeks');
    Dash.verifyFilterDate(filterDate);
    filterDate = Dash.clickOnTimeSpan('Last 3 Months');
    Dash.verifyFilterDate(filterDate);
    filterDate = Dash.clickOnTimeSpan('Last 12 Months');
    Dash.verifyFilterDate(filterDate);
    filterDate = Dash.clickOnTimeSpan('Month to Date');
    Dash.verifyFilterDate(filterDate);
     filterDate = Dash.clickOnTimeSpan('Quarter to Date');
    Dash.verifyFilterDate(filterDate);
    filterDate = Dash.clickOnTimeSpan('Year to Date');
    Dash.verifyFilterDate(filterDate);
  });

  it('verify that Data is sorted as according to Calendar', () => {  //BAT-T1039
    Dash.clickOnTimeSpan('Last 12 Months');
    cy.wait(2000)
    Dash.clickDashboardCalendar();
    Dash.verifyDashCallsResult('Outbound Calls'); 
    Dash.verifyDashCallsResult('Connected Calls');
  });

  it('Verify call details should display in main card section', () => { 
    Dash.verifyDashCallsResult('Outbound Calls'); 
    Dash.verifyDashCallsResult('Connected Calls');
    Dash.verifyDashCallsResult('Avg. Call Duration', 'time');
    Dash.verifyDashCallsResult('Avg. Agent Wait Time', 'time');
    Dash.verifyDashCallsResult('Abandon Rate', 'rate');
    Dash.verifyDashCallsResult('Leads Generated');
    Dash.verifyDashCallsResult('Connect Rate', 'rate');
    Dash.verifyDashCallsResult('Dialing Time', 'time');
    Dash.verifyDashCallsResult('Avg. CPA(Calls Per Agent)');
    Dash.verifyDashCallsResult('Calls Per Connect');
    Dash.verifyDashCallsResult('Voicemails Reached');
  });

  it('verify that User is able to see Agent or Campaign Filter ', () => {
    Dash.verifyFilterDropdown('Agents');
    Dash.verifyFilterDropdown('Campaigns');
  });

  it('Verify that user is able to select Agent in Agent Filter', () => {
    Dash.clickFilterDropdown('Agents', testData.agent);
    Dash.verifyTableResult('Agent Analytics', testData.agent);
    Dash.removeSelectChecbox('Agents');
  });

  it('Verify that user is able to select Campaign using Campaign Filter', () => {
    Dash.clickFilterDropdown('Campaigns', testData.campaign);
    Dash.verifyTableResult('Campaign Analytics', testData.campaign);
    Dash.removeSelectChecbox('Campaigns');
  });

  it('Verify that when user applies the Agent filter then dasboard details should be as per agent filter', () => {
    Dash.clickFilterDropdown('Agents', testData.adminWithoutCalling);
    cy.wait(4000);
    Dash.verifyDashCallsResult('Outbound Calls', 'no calls')
    Dash.verifyDashCallsResult('Avg. CPA(Calls Per Agent)', 'no calls');
    Dash.clickFilterDropdown('Agents', testData.agent);
    cy.wait(4000);
    Dash.verifyDashCallsResult('Outbound Calls');
    Dash.verifyDashCallsResult('Connected Calls');
    Dash.verifyDashCallsResult('Avg. CPA(Calls Per Agent)');
    Dash.removeSelectChecbox('Agents');
  });

  it('Verify that when user applies the Campaign filter then dasboard details should be as per Campaign filter', () => {
    Dash.clickFilterDropdown('Campaigns', 'Test Camp');
    cy.wait(4000);
    Dash.verifyDashCallsResult('Outbound Calls', 'no calls')
    Dash.verifyDashCallsResult('Avg. CPA(Calls Per Agent)', 'no calls');
    Dash.clickFilterDropdown('Campaigns', testData.agent);
    cy.wait(4000);
    Dash.verifyDashCallsResult('Outbound Calls');
    Dash.verifyDashCallsResult('Connected Calls');
    Dash.verifyDashCallsResult('Avg. CPA(Calls Per Agent)');
  });

  it('Verify Tables and Charts in Main dashboard page', () => {
    Dash.verifyMainDashboardTableOrChart('Calls Summary');
    Dash.verifyMainDashboardTableOrChart('Call Results');
    Dash.verifyMainDashboardTableOrChart('Responsiveness');
    Dash.verifyMainDashboardTableOrChart('Avg. Agent Talk Time');
    Dash.verifyMainDashboardTableOrChart('Agent Analytics');
    Dash.verifyMainDashboardTableOrChart('Best Time to Call');
    Dash.verifyMainDashboardTableOrChart('Campaign Analytics');
  });

  it('Verify that user are able to see the hourly, daily and Weekly in call summary table', () => {
    Dash.clickTimeFilterRadioBtn('CallSummary', 'Daily');
    Dash.VerifyEquityBoxRadioBtn('CallSummary', 'Daily');
    Dash.clickTimeFilterRadioBtn('CallSummary', 'Hourly');
    Dash.VerifyEquityBoxRadioBtn('CallSummary', 'Hourly');
    Dash.clickTimeFilterRadioBtn('CallSummary', 'Weekly');
    Dash.VerifyEquityBoxRadioBtn('CallSummary', 'Weekly');
  });

  it('Verify that user are able to see the hourly, daily and Weekly in Avg Agent Talk Time table', () => {
    Dash.clickTimeFilterRadioBtn('AvgAgentTalkTime', 'Daily');
    Dash.VerifyEquityBoxRadioBtn('AvgAgentTalkTime', 'Daily');
    Dash.clickTimeFilterRadioBtn('AvgAgentTalkTime', 'Hourly');
    Dash.VerifyEquityBoxRadioBtn('AvgAgentTalkTime', 'Hourly');
    Dash.clickTimeFilterRadioBtn('AvgAgentTalkTime', 'Weekly');
    Dash.VerifyEquityBoxRadioBtn('AvgAgentTalkTime', 'Weekly');
  });

  it('Verify Agent Analytics table column should be shown', () => {
    Dash.verifyTableHeadings([
      'Agent',
      'Outbound Calls',
      'Inbound Calls',
      'Connect Rate %',
      'Voice Mails Reached',
      'Leads Generated',
      'Connects Per Lead',
      'Total Call Duration',
      'Avg. Call Duration',
      'Avg. Handle Time'
    ]);
    Dash.TableHeaderSettingIcon('Agent Analytics');
  });

  it('Verify Campaign Analytics table columns should be shown', () => {
    Dash.verifyTableHeadings([
      'Campaign Name',
      'Agents in Campaign',
      'Remaining Calls',
      'Leads',
      'Voicemails Reached',
      'Abandon Rate',
      'Connect Rate %'
    ]);
    Dash.TableHeaderSettingIcon('Campaign Analytics');
  });

  it('Verify that Barge, Listen and Whispering Icon Display on Live dashboard for Admin', () => {
    Dash.clickStatusButton();
    Dash.selectAvailable('Available', testData.campaign);
    Dash.clickConfirmButton();
    addCont.dialPhoneNumber('6029227636');
    addCont.clickDialerCallButton();
    Dash.verifyCallStarted();
    Dash.clickDashboard();
    Dash.verifyCallMonitoringIcon('Listen');   // Admin can Listen both Agent & Cust (but can't talk to them)
    Dash.verifyCallMonitoringIcon('Barge In'); // All three can talk (like conference)
    Dash.verifyCallMonitoringIcon('whisper');  //Admin & agent can talk (cust can't hear)
  });

  it('Verify that Listen Icon Display on Live dashboard for Supervisor account', () => {
    Dash.clickLoginAs();
    Dash.clickLoginAsPlusIcon();
    Dash.clickAgentOrSupervisor(testData.supervisor);
    Dash.verifyUserDashboardName(testData.supervisor);
    Dash.verifyCallMonitoringIcon('Listen');   // Supervisor can Listen both Agent & Cust
    Dash.verifyCallMonitoringIcon('Barge In', 'NoAccess'); 
    Dash.verifyCallMonitoringIcon('whisper', 'NoAccess');  
    ignoreSpeedTestPopup();
    Dash.clickBackToAdmin();
    ignoreSpeedTestPopup();
    Dash.verifyUserDashboardName(testData.AdminName);
  });

  it('Verify that all the campaign is present in that account there data should be shown in the table', () => {
    verifyRoleTitle();
    camp.getCampaignList();
    Dash.clickDashboard();
    Dash.clickOnMainTab();
    camp.verifyDashCampaignAnalyticsList();
  });

  it('Verify that data should be shown in Agent Analytics as per the agent whose involve in calling', () => {
    Dash.verifyTableResultLength('Agent Analytics');
  });

  it('Verify that when user hover on the block in Best time to call chart then its shows tooltip', () => {
    Dash.clickDashboardCalendar();
    Dash.clickOnTimeSpan('Last 7 Days');
    cy.wait(1000)
    Dash.mouseOverOnChart('Best Time to Call','center');
    Dash.verifyChartTooltip(['Wednesday 11:00 am - 12:00 pm', 'Avg Answered Calls:', '%']);
  });

  it('Verify that when user hover on the doughnut chart then in tooltip call result name with percentage value should be shown', () => {
    Dash.clickDashboardCalendar();
    Dash.clickOnTimeSpan('Last 4 Weeks');
    cy.wait(1000);
    Dash.mouseOverOnChart('Call Results',{ clientX: 200, clientY: 300 });
    Dash.verifyChartTooltip(['Calls', '%']);
  });

  it('Verify the tool tip displayed on the main card section', () => { 
    Dash.mouseOverOnMainCard('Outbound Calls'); 
    Dash.verifyTooltipText('Calls that are initiated outward to a contact');
    Dash.mouseOutOnMainCardToolTip('Outbound Calls');

    Dash.mouseOverOnMainCard('Connected Calls');
    Dash.verifyTooltipText('The number of outbound calls a contact answered.');
    Dash.mouseOutOnMainCardToolTip('Connected Calls');

    Dash.mouseOverOnMainCard('Avg. Call Duration', 'time');
    Dash.verifyTooltipText('The average amount of time an agent spent in a call.');
    Dash.mouseOutOnMainCardToolTip('Avg. Call Duration', 'time');

    Dash.mouseOverOnMainCard('Avg. Agent Wait Time', 'time');
    Dash.verifyTooltipText('The average amount of time an agent spent in a call.');
    Dash.mouseOutOnMainCardToolTip('Avg. Agent Wait Time', 'time');

    Dash.mouseOverOnMainCard('Abandon Rate', 'rate');
    Dash.verifyTooltipText('The percent of all abandoned calls that hangs up before the system routes the call to an available agent, or the system fails to route the call to an available agent.');
    Dash.mouseOutOnMainCardToolTip('Abandon Rate', 'rate');

    Dash.mouseOverOnMainCard('Active Campaigns');
    Dash.verifyTooltipText('Number of Campaigns that are operating to service Outbound calls.');
    Dash.mouseOutOnMainCardToolTip('Active Campaigns');

    Dash.mouseOverOnMainCard('Leads Generated');
    Dash.verifyTooltipText('Disposition generated through successful customer prospect.');
    Dash.mouseOutOnMainCardToolTip('Leads Generated');

    Dash.mouseOverOnMainCard('Connect Rate', 'rate');
    Dash.verifyTooltipText('The percent of all numbers dialed that connected to a contact.');
    Dash.mouseOutOnMainCardToolTip('Connect Rate', 'rate');

    Dash.mouseOverOnMainCard('Dialing Time', 'time');
    Dash.verifyTooltipText("The time between the dialer sending the request to the phone network and the respondent's phone starting to ring.");
    Dash.mouseOutOnMainCardToolTip('Dialing Time', 'time');

    Dash.mouseOverOnMainCard('Avg. CPA(Calls Per Agent)');
    Dash.verifyTooltipText('The average calls an agent had per day.');
    Dash.mouseOutOnMainCardToolTip('Avg. CPA(Calls Per Agent)');

    Dash.mouseOverOnMainCard('Calls Per Connect');
    Dash.verifyTooltipText('Number of calls that are connected to a live contact.');
    Dash.mouseOutOnMainCardToolTip('Calls Per Connect');

    Dash.mouseOverOnMainCard('Voicemails Reached');
    Dash.verifyTooltipText('Calls that were not connected to a live contact and went to voicemail.');
    Dash.mouseOutOnMainCardToolTip('Voicemails Reached');
  });

});
