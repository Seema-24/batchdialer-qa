import Dashboard from '../support/pages/Dashboard';
import { closeDialogBox, getDate, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus } from '../support/Utils';
import Contacts from '../support/pages/Contacts';
import Campaign from '../support/pages/Campaigns';

const Dash = new Dashboard();
const addCont = new Contacts();
const camp = new Campaign();
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
        date = getDate(19);
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

  it('verify elements in Dashboard', () => {
    Dash.clickDashboard();
    Dash.clickOnMainTab();
    Dash.verifyDashboardElements();
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

  //it can't be automated bcuz username is in smaller letter shows in HTML page
  it.skip('Verify that username is capitalized only', () => {
    Dash.verifyUserNameCapitalized();
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
    addCont.dialPhoneNumber('8586515050');
    addCont.clickDialerCallButton();
    Dash.verifyCallStarted();
    cy.wait(8000);
    Dash.clickHardwareTestButton();
    Dash.verifyCallQualityChart();
    addCont.clickDialerCallButton();
    addCont.selectCallResult('No Answer');
    addCont.clickContinueBtn();
  })

  it('Verify user is able to make call using dialer button', () => {
    Dash.clickCallGraphCloseBtn();
    Dash.clickDialer();
    Dash.dialNumber();
    Dash.clickCallButton();
    Dash.verifyCallStarted();
    cy.wait(3000);
    Dash.clickCallButton();
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
    Dash.clickEventStatusCheckbox(testData.Contact, 'Pending');
  });

  it('Verify that if event is marked as completed then it should disappear from list', () => {
    Dash.verifyCompletedEventDisappear(testData.Contact);
  });

  it('Mark the Completed Event as Pending Event', () => {
    Dash.clickCompletedCheckbox();
    Dash.clickEventStatusCheckbox(testData.Contact, 'Completed');
  });

  it('Delete the Added Event', () => {
    Dash.clickEventThreeDotMenuBtn(testData.Contact);
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
      'Affiliate',
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
    Dash.clickAgentScripts();
    Dash.clickNewAgentScriptBtn();
    Dash.enterScriptName('Testing');
    Dash.enterScriptText('This is a testing Script');
    Dash.clickOnButton('SAVE');
    Dash.verifyAddedScript('Testing');
  });

  it('Add a New Agent Script with duplicate name', () => {
    Dash.clickAgentScripts();
    Dash.clickNewAgentScriptBtn();
    Dash.enterScriptName('Testing');
    Dash.enterScriptText('This is a testing Script');
    Dash.clickOnButton('SAVE');
    Dash.verifyErrorMessage('Duplicate agent script name');
    Dash.clickCancelBtn();
  });

  it('Edit the Agent Script', () => {
    Dash.clickAgentScripts();
    Dash.clickEditBtn('Testing');
    Dash.enterScriptName('DemoTesting');
    Dash.enterScriptText('This is the Edited Agent Script');
    Dash.clickOnButton('SAVE');
    Dash.verifyEditScript('DemoTesting');
  });

  it('Remove the Added Agent Script', () => {
    Dash.clickAgentScripts();
    Dash.clickDeletebtn('DemoTesting');
    Dash.verifyScriptDelete('DemoTesting');
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

  it('Verify Calendar Month Left Arrow Functionality', () => {
    Dash.clickDashboard();
    Dash.clickOnMainTab();
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
      'Your Cancellation Request has been successfully submitted. Please reach out to your Account Manager to finalize request.'
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
      'Thank you for your feedback, your account has been set to cancel on '+ date[0]
    );
    Dash.clickDialogCloseButton();
  });

  it('Verify the functionality of PAUSE INSTEAD button in the Cancelled notification.', () => {
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
    Dash.clickBillingNotificationBtn('Do Not Cancel');
  })

  it('Verify that authorized user is able to Renew the API key generated for Zapier integration.', () => {
    Dash.clickIntegrationsBtn();
    Dash.clickOnSyncBtn('zapier');
    Dash.checkIntegrationSetup();
    Dash.verifyRenewAPIKey();
    Dash.clickOnButton('CLOSE');
  })

  it('Verify that authorized user is able to Remove the API integration for Zapier', () => {
    Dash.clickIntegrationsBtn();
    Dash.clickOnSyncBtn('zapier');
    Dash.clickOnRemoveIntegration();
    Dash.handleAlertForDelete('Delete API key?');
    Dash.verifySuccessMsg('Deleted');
  });


});
