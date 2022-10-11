import promisify from 'cypress-promise';
import Campaign from '../support/pages/Campaigns';
import Contacts from '../support/pages/Contacts';
import Dashboard from '../support/pages/Dashboard';
import Dialer from '../support/pages/Dialer';
import PhoneNum from '../support/pages/PhoneNum';
import { closeDialogBox, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus } from '../support/Utils';

let fixtureData;
let testData;
let num;
let phone;
const addNum = new PhoneNum();
const addCont = new Contacts();
const addCamp = new Campaign();
const dashboard = new Dashboard();
const Dial = new Dialer();
let randNum = Math.floor(Math.random() * 100000);

describe('Add Phone Number flow', () => {
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
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Verify that user is able to make bulk and single-row selection by using checkbox', () => {
    addNum.clickPhoneNumberMenu();
    addNum.selectPhoneNumberCheckbox(1);
    addNum.verifyActionsDropdownVisible();
    addNum.verifySelectedCount('1/');
  });

  it('Verfiy that user is able to select all phone numbers in the list by selecting check box in the table header', () => {
    addNum.clickPhoneNumberMenu();
    addNum.getTotalNumbersAvailable();
    addNum.clickSelectAllCheckbox();
    addNum.verifyActionsDropdownVisible();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      addNum.verifySelectedCount(`${data.numbersCount}/${data.numbersCount}`);
    });
  });

  it('Should Buy Phone number successfully', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickBuyDidButton();
    addNum.selectStateModeOption('Colorado');
    // addNum.clickSearchButton();
    // addNum.verifysearchStartedToast();
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
    addNum.enterAreaCode('520');
    // addNum.clickSearchButton();
    addNum.verifySearchNumber('520');
    addNum.closingDialog();
  });

  it('Verifies IVR Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickIvrAttendent();
    addNum.verifySearchBox();
    addNum.verifyNewIVRBtn();
    addNum.verifyTableHeaderName(['Name', 'Description', 'Modified']);
  });

  it('Verifies Add New IVR Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickIvrAttendent();
    addNum.clickNewIvr();
    addNum.verifyNameField();
    addNum.verifyDescriptionField();
    addNum.verifyExtensionsDropdown('Select Extension');
    // addNum.verifyExtensionsDropdown('Select Numbers');
    addNum.verifyAssignCampaignDropdown('Select Campaign');
    addNum.verifyIVRDropdown('After Hours', 'Hangup');
    addNum.verifyIVRDropdown('Timeout', 'Hangup');
    addNum.verifyNewDigitBtn();
    addNum.verifyWelcomePromptDropdown('Select Recording');
    addNum.verifyAddNewBtn();
    addNum.verifySaveBtn();
    addNum.verifyCancelBtn();
  });

  it('Upload a welcome prompt audio file', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickIvrAttendent();
    addNum.clickNewIvr();
    addNum.enterName('Testing' + randNum.toString());
    addNum.enterDescription('New Ivr');
    addNum.selectCampaign();
    addNum.selectNumber(testData.Number);
    addNum.clickAddNewWelcomePrompt();
    addNum.uploadFile('preview.mp3');
    addNum.enterRecordingName('preview' + randNum.toString());
    addNum.clickRecordingSaveButton();
    addNum.verifyUploadedWelcomePrompt('preview' + randNum.toString());
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

  it('Should Add New IVR', function () {
    addNum.clickPhoneNumberMenu();
    addNum.clickIvrAttendent();
    addNum.clickNewIvr();
    addNum.enterName('Testing' + randNum.toString());
    addNum.enterDescription('New Ivr');
    addNum.selectCampaign();
    addNum.selectNumber(testData.Number);
    addNum.clickAddNewWelcomePrompt();
    addNum.clickTextToSpeech();
    addNum.enterRecordingName('Test' + randNum.toString());
    addNum.enterRecordingText('Hey How Are You');
    addNum.clickGenerateButton();
    addNum.clickRecordingSaveButton();
    addNum.clickIvrSaveButton();
    addNum.verifySaved();
  });

  it('Edit the Existing IVR', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickIvrAttendent();
    addNum.clickeditIVR('Testing' + randNum.toString());
    addNum.verifyEditIVRPage();
    addNum.enterName('-edited');
    addNum.clickIvrSaveButton();
    addNum.verifySaved();
  });

  it('Should delete IVR', function () {
    addNum.deleteIVR('Testing' + randNum.toString() + '-edited');
    addNum.handleAlertForDelete();
    addNum.verifyDeletedIvr();
  });

  it('Verifies Inbound Call Menu Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickInboundCallMenu();
    addNum.verifySearchBox();
    addNum.verifyNewQueueBtn();
    addNum.verifyTableHeaderName(['Name', 'Campaign', 'Agents', 'Modified']);
  });

  it('Verifies New Queue Form Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickInboundCallMenu();
    addNum.clickNewQueueBtn();
    addNum.verifyNameField();
    // addNum.verifyDescriptionField();
    addNum.verifyExtensionsDropdown('Select Extension');
    // addNum.verifyExtensionsDropdown('Select Numbers');
    addNum.verifyAssignAgent('Agents');
    addNum.verifyAssignCampaignDropdown('Select Campaign');
    addNum.verifyRingStrategy(['Round Robin', 'Ring All']);
    addNum.verifyWrapupTimeoutDropdown();
    addNum.verifyRingTimeDurationDropdown();
    addNum.verifyTimeoutDestinationDropdown();
    addNum.verifyAfterHourDestinationDropdown();
  });

  it('Fill Form to Create New Queue', () => {
    addNum.enterName('Demotesting');
    // addNum.enterDescription('testing');
    addNum.selectExtensionDropdown('Select Extension', fixtureData.Number);
    addNum.selectAssignAgent('Agents', 'Anil');
    addNum.selectAssignCampaignDropdown('Select Campaign', 'FirstCampaign');
    addNum.clickCreateQueueBtn();
    addNum.verifySaved();
  });

  it('Edit the Existing Queue', () => {
    addNum.clickeditQueue('Demotesting');
    addNum.verifyEditQueuePage();
    addNum.enterName('-edited');
    addNum.clickSaveQueueBtn();
    addNum.verifySaved();
  });

  it('Delete the Created Queue', () => {
    addNum.clickDeleteBtn('Demotesting-edited');
    addNum.handleAlertForDelete();
  });

  it('Verifies the DNC Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    addNum.verifyDncCards();
    addNum.verifyDncCardTitle(['DNC NUMBERS', 'DNC Area Codes', 'DNC States']);
    addNum.verifySearchBox();
    addNum.verifyDncUploadFileBtn();
    addNum.verifyDncTableHeader([
      'File Name',
      'Total Records',
      'Failed',
      'Valid',
      'Created',
    ]);
  });

  it('Verifies Elements and Add DNC Number', () => {
    addNum.clickAddBtn('DNC NUMBERS');
    addNum.verifyNumberField();
    addNum.verifyAddMoreBtn();
    addNum.verifySaveBtn();
    addNum.verifyCancelBtn();
    addNum.enterDncNumber('9999999999');
    addNum.clickSaveBtn();
    cy.wait(1000);
    addNum.verifyAddedValue('(999) 999-9999');
  });

  it('Delete Added DNC Number', () => {
    addNum.clickDeleteDncValue('DNC NUMBERS', '(999) 999-9999');
    addNum.handleAlertForDelete();
  });

  it('Verifies Elements and Add DNC Area Codes', () => {
    addNum.clickAddBtn('DNC Area Codes');
    addNum.verifyNumberField();
    addNum.verifyAddMoreBtn();
    addNum.verifySaveBtn();
    addNum.verifyCancelBtn();
    addNum.enterDncNumber('999');
    addNum.clickSaveBtn();
    addNum.verifyAddedValue('999');
  });

  it('Delete Added DNC Area Code', () => {
    addNum.clickDeleteDncValue('Area', '999');
    addNum.handleAlertForDelete();
  });

  it('Verifies Elements and Add DNC States', () => {
    addNum.clickAddBtn('DNC States');
    addNum.verifySelectStateDropdown();
    addNum.verifyAddMoreBtn();
    addNum.verifySaveBtn();
    addNum.verifyCancelBtn();
    addNum.selectState('Colorado');
    addNum.clickSaveBtn();
    addNum.verifyAddedValue('Colorado');
  });

  it('Delete Added DNC States', () => {
    addNum.clickDeleteDncValue('States', 'Colorado');
    addNum.handleAlertForDelete();
  });

  it('Verifies Elements of Call Result Page', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.verifyAddNewCallResultBtn();
    addNum.verifyAddNewGroupBtn();
    addNum.verifyCallResultTableHeader([
      'Call Results',
      'Group Name',
      'Campaign',
      'Created',
    ]);
    addNum.clickOpenCallResultGroup('UNGROUPED');
    addNum.verifyDefaultCallResults([
      'Abandoned',
      'Answering Machine',
      'Busy',
      'Disconnected Number',
      'No Answer',
      'Not Interested',
      'Successful Sale',
      'Voicemail',
    ]);
  });

  it('Verifies Add New Call Result Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickAddNewCallResultBtn();
    addNum.verifyNameField();
    addNum.verifyActiveInactive('Active');
    addNum.verifyActiveInactive('Inactive');
    addNum.verifyNumberGroupDropdown();
    addNum.verifyButtonColorBox();
    addNum.verifyAssignCampaignDropdown('Select Number Group');
    addNum.verifyShowOnNewCompaignPage('Yes');
    addNum.verifyShowOnNewCompaignPage('No');
    addNum.verifyAddNewRuleBtn();
    addNum.verifyRules([
      'Do Not Redial Contact',
      'Do Not Redial Number',
      'Add Contact to DNC',
      'Add Number to DNC',
      'Mark as Lead',
      'Send to Email',
    ]);
    addNum.verifyCallResultCancelBtn();
    addNum.verifyCallResultSaveBtn();
  });

  it('Add New Call Result Group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    cy.wait(1000);
    addNum.clickAddNewGroupBtn();
    addNum.enterCallResutlGroupName('Testing');
    addNum.clickSaveFieldIcon();
    addNum.VerifyAddedGroupName('Testing');
  });

  it('Add call results in the Call results group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    cy.wait(1000);
    addNum.clickOpenCallResultGroup('Testing');
    addNum.selectCallResultsFromDropdown('Busy');
  });

  it('Verify that Created call result group is reflecting while creating new Campaign', () => {
    addCamp.clickCampaignMenu();
    cy.wait(3000);
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randNum.toString());
    addNum.verifyCreatedCallResultGroup('Testing');
  });

  it('Verify that Admin can Edit the Call Result Group Name', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    cy.wait(1000);
    addNum.clickEditCallResultGroupIcon('Testing');
    addNum.enterCallResutlGroupName('-edited');
    addNum.clickSaveFieldIcon();
    addNum.VerifyAddedGroupName('Testing-edited');
  });

  it('Delete the Added Call Result Group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    cy.wait(1000);
    addNum.clickDeleteCallResultGroupIcon('Testing-edited');
    addNum.VerifyDeleteGroup('Testing-edited');
  });

  it('Add New Call Result', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickAddNewCallResultBtn();
    addNum.enterName('DemoTesting');
    addNum.chooseActiveInactive('Active');
    addNum.selectCallResultCampaignDropdown(testData.campaign);
    addNum.clickCallResultSaveBtn();
    addNum.verifyToastMessage('Saved');
  });

  it('Verify that create a call result without selecting Call Result Group is moved to Ungrouped group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickCallResultMenu();
    addNum.clickOpenCallResultGroup('UNGROUPED');
    addNum.verifyCallResultAvailableInUngrouped('DemoTesting');
  });

  it('Verify that the created call results is reflected in the create new campaign page Call Result', () => {
    const addCamp = new Campaign();
    addCamp.clickCampaignMenu();
    cy.wait(3000);
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randNum.toString());
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
    Dial.selectStatus('Available');
    Dial.verifySelectCampaignBoxHeading();
    Dial.clickSelectCampaignDropdown();
    Dial.selectCampaign(testData.campaign);
    Dial.clickConfirmButton();
    Dial.verifySoftPhoneOpen();
  });

  it('Verify that Events created through call result Schedule a call back is reflected in the TASKS page', () => {
    addCont.dialPhoneNumber('8586515050');
    addCont.clickDialerCallButton();
    cy.wait(5000);
    addCont.clickDialerCallButton();
    addCont.selectCallResult('A CALL BACK'); 
    addCont.clickContinueBtn();
    dashboard.clickTaskButton();
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
    addNum.clickCallResultDeleteBtn();
    addNum.handleDeleteAlert('Delete call result?');
    addNum.verifyCallResultDelete('DemoTesting');
  });

  it('Verifies Number Group Elements', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickAddPhoneGroup();
    addNum.verifyNameField();
    addNum.verifyDestinationDropdown();
    addNum.verifySaveBtn();
    addNum.verifyCancelBtn();
  });

  it('Add a Number Group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickAddPhoneGroup();
    addNum.enterName('DemoTesting');
    addNum.SelectDestination('Agent');
    addNum.clickSaveBtn();
  });

  it('Verifies Added Phone Group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.verifyAddedPhoneGroup('DemoTesting');
  });

  it('Verify that authorized user is able to perform bulk action Add to Group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.getTotalNumbersAvailable();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      addNum.selectPhoneNumberCheckbox(parseInt(data.numbersCount));
    });
    addNum.clickActionsButton();
    addNum.clickDropdownItem('Add To Group');
    addNum.verifyModalWindowOpen();
    addNum.clickSelectGroupDropdown();
    addNum.selectDropdownOption('DemoTesting');
    addNum.clickOnButton('Save');
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      addNum.verifyToastMessage(`Number Group Changed: ${data.numbersCount}`);
    });
  });

  it('Delete Added Phone Group', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDeletePhoneGroup('DemoTesting');
    addNum.handleDeleteAlert('Delete?');
    addNum.verifyToastMessage('Phone group deleted');
  });

  it('Upload DNC File', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    addNum.clickUploadFileBtn();
    addNum.uploadFile('contact-sample.csv');
    addNum.clickUploadBtn();
    addNum.clickCloseBtn();
  });

  it('Verifies Upload DNC File', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    addNum.verifyUploadDncFile('contact-sample.csv');
  });

  it('Verifies the Search Results', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    addNum.enterFileNameToSearch('contact');
    addNum.verifySearchResult('contact');
  });

  it('Verifies the File Download Button', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    addNum.verifyDncFileDownloadBtn('contact-sample.csv');
  });

  it('Delete the Upload DNC File', () => {
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    addNum.clickDeleteDncFile('contact-sample.csv');
    addNum.handleDeleteAlert('Delete?');
  });

  it('Add a contact Phone to DNC', async () => {
    addCont.clickingOnContactOption();
    addCont.enterKeywordToSearch('random');
    cy.wait(1000);
    phone = await promisify(addCont.getPhoneNumber());
  });

  it('Check for Added contact in DNC Page', () => {
    addNum.clickContactMenu('random', 'Contact');
    addNum.clickAddToDNC();
    addNum.clickPhoneNumberMenu();
    addNum.clickDncMenu();
    cy.wait(1000);
    addNum.verifyAddedDNCNumber(phone);
  });
  it('Search phone number using search box', () => {
    addNum.clickPhoneNumberMenu();
    addNum.enterPhoneToSearchKeyword(testData.Number);
    addNum.verifySearchedNumber(testData.Number);
    addNum.verifyNumberNotVisible();
  });
});
