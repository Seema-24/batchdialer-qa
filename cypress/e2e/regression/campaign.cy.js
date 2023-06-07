import Campaign from '../../support/pages/Campaigns';
import Dialer from '../../support/pages/Dialer';
import Report from '../../support/pages/Report';
import { closeDialogBox, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus, verifyCloseApp } from '../../support/Utils';

let fixtureData;
let testData;
var today = new Date();
today = String(today.getMonth() + 1).padStart(2,'0') + '-' +
  String(today.getDate()).padStart(2,'0') + '-' + 
  String(today.getFullYear()).slice(-2);
let randNum = Math.floor(Math.random() * 1000);
const addCamp = new Campaign();
const Dial = new Dialer();
const report = new Report();

describe('Add Campaign flow', () => {
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
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Campaign header element should visible', function () {
    addCamp.clickCampaignMenu();
    addCamp.verifyCampaignHeaderElement([
      'Active Campaigns',
      'Paused Campaigns',
      'Completed Campaigns',
      'Archived Campaigns',
    ]);
  });

  it('Search box and Dropdowns on Campaign page', function () {
    addCamp.verifySearchBox();
    addCamp.verifyStatusBox('Status');
    addCamp.verifyAgentBox();
    addCamp.verifyContactsCountSlider();
    addCamp.verifyAddCompaignButton();
  });

  it('Verify campaign headings', function () {
    addCamp.verifyCampaignHeaderHedings([
      'Name',
      'Mode',
      'Status',
      'Total Leads',
      'Pending Dials',
      'Pending Redials',
      'Deals',
      'Answered',
      'Voicemail',
      'Abandon',
      'Agents',
      'DNC',
      'DNR',
      'Created',
    ]);
  });

  it('Verify that user should be able to create campaign', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randNum.toString());
    addCamp.selectCallResults([
      'Answering Machine',
      'No Answer',
      'Successful Sale',
      'Voicemail',
    ]);
    addCamp.clickAdvancedConfiguration();
    addCamp.selectCallsOrder('adaptive'); //highestfirst //lowestfirst
    addCamp.selectCallConnectType('Automatic Answer'); //Manual Answer
    addCamp.enterSimultaneousDials(3);
    // addCamp.enterRingTimeDuration(15);
    
    addCamp.enterRetryTime(5);
    // addCamp.selectRetryTimeUnit('sec');
    // addCamp.clickOnButton('Got it');
    addCamp.enterMaxAttempts('Max Attempts Per Record', 2);
    addCamp.enterAbandonedTimeout(15);
    Dial.clickCallingHoursDropdown();
    Dial.selectFromTime('12:00 am');
    Dial.selectToTime('11:59 pm');
    Dial.clickApplyToAllButton();
    Dial.clickOnButton('APPLY');
    Dial.clickTermsConditionsCheckbox()
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Created');
  });

  it('Should show added Campaign in table', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyAddedCampaign(fixtureData.campaignName + randNum.toString());
  });

  it('Verify that status should be Out of Leads', () => {
    addCamp.verifyCampaignStatus(
      fixtureData.campaignName + randNum.toString(),
      'Out of Leads'
    );
  });

  it('Verify that authorized user is able to view the Change log for each campaign', () => {
    addCamp.clickEditCampaign(fixtureData.campaignName + randNum.toString());
    addCamp.clickDropdownItem('Changelog');
    addCamp.verifyDialogOpen();
    addCamp.verifyModalTitle(
      `Change Log ${fixtureData.campaignName + randNum.toString()}`
    );
    cy.wait(1000);
    addCamp.verifyChangeLogItemsText(
      `${fixtureData.campaignName + randNum.toString()} Created by ${
        testData.AdminName
      }`
    );
    addCamp.clickModalCloseBtn();
  });

  it('Verify Campaign Status is applied correctly', () => {
    addCamp.clickCampaignMenu();
    addCamp.changesCampaignStatus(
      fixtureData.campaignName + randNum.toString(),
      'active'
    );
    addCamp.clickToSelectPasused('Status');
    addCamp.changeCampaignStatusByDrpdwn('Paused');
    addCamp.verifyAddedCampaign(fixtureData.campaignName + randNum.toString());
    addCamp.changesCampaignStatus(
      fixtureData.campaignName + randNum.toString(),
      'paused'
    );
    addCamp.clickToSelectActive();
    addCamp.changeCampaignStatusByDrpdwn('Active');
    addCamp.verifyAddedCampaign(fixtureData.campaignName + randNum.toString());
    cy.reload();
    ignoreSpeedTestPopup();
  });

  it('Edit the Campaign in Normal Mode', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(fixtureData.campaignName + randNum.toString());
    addCamp.clickEditBtn();
    cy.wait(1000);
    addCamp.waitForLoader();
    addCamp.enterName('-edited');
    //addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Saved');
  });

  it('Verify that edit values of the campaign page in normal mode reflects in the Change log', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickDropdownItem('Changelog');
    addCamp.verifyDialogOpen();
    addCamp.verifyModalTitle(
      `Change Log ${fixtureData.campaignName + randNum.toString()}-edited`
    );
    cy.wait(1000);
    addCamp.verifyChangeLogItemsText(
      `Campaign Name Been Changed from ${
        fixtureData.campaignName + randNum.toString()
      } to ${fixtureData.campaignName + randNum.toString()}-edited by ${
        testData.AdminName
      }`
    );
    addCamp.clickModalCloseBtn();
  });

  it('Edit the Added Campaign in Advance Mode', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickEditBtn();
    addCamp.verifyCallResultValues(8);
    addCamp.deleteCallResults([
      'Answering Machine',
      'No Answer',
      'Successful Sale',
      'Voicemail',
    ]);
    addCamp.selectCallResults([
      'Voicemail',
      'Unknown',
      'No Answer',
      'Successful Sale',
    ]);
    addCamp.clickAdvancedConfiguration();
    addCamp.enterRetryTime(2);
    //addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Saved');
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickEditBtn();
    addCamp.verifyCallResultValues(8);
    addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
  });

  it('Verify that edit values of the campaign page in advanced mode reflects in the Change log', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickDropdownItem('Changelog');
    addCamp.verifyDialogOpen();
    addCamp.verifyModalTitle(
      `Change Log ${fixtureData.campaignName + randNum.toString()}-edited`
    );
    cy.wait(1000);
    addCamp.verifyChangeLogItemsText(
      `Retry Time Been Changed from 8 hours to 10 hours by ${testData.AdminName}`
    );
    addCamp.clickModalCloseBtn();
  });

  it('Archive Created Campaign', function () {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    addCamp.verifyArchivedCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited',
      'not.exist'
    );
  });

  it('Verify User is able to Unarchive the Archived Campaign', () => {
    addCamp.clickToSelectStatus('Status');
    addCamp.clickStatusArchived();
    addCamp.searchCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    cy.wait(1000);
    addCamp.clickUnarchiveCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickToSelectStatus('Archived');
    addCamp.clickStatus();
    addCamp.verifyUnarchievedCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
  });

  it('Should Add Preview Dialer New Campaign ', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Preview');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    // addCamp.selectContactLists();
    addCamp.enterCampaignName(
      fixtureData.campaignName + randNum.toString() + '1'
    );
    addCamp.selectCallResults([
      'Answering Machine',
      'No Answer',
      'Successful Sale',
      'Voicemail',
    ]);
    addCamp.clickAdvancedConfiguration();
    addCamp.selectCallsOrder('adaptive'); //highestfirst //lowestfirst
    // addCamp.enterRingTimeDuration(15);
    addCamp.enterRetryTime(10);
    addCamp.enterMaxAttempts('Max Attempts Per Record', 2);
    addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Created');
  });

  it('Should show added Preview Dialer Campaign in table', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyAddedCampaign(
      fixtureData.campaignName + randNum.toString() + '1'
    );
  });

  it('verify that campaign status should be Manual Mode for Preview Dialer', () => {
    addCamp.verifyCampaignStatus(
      fixtureData.campaignName + randNum.toString() + '1',
      'Manual Mode'
    );
  });

  it('Verify that it should give error on clicking Next Contact if there is no new lead', () => {
    Dial.selectStatus('Available');
    Dial.verifySelectCampaignBoxHeading();
    Dial.clickSelectCampaignDropdown();
    Dial.selectCampaign(fixtureData.campaignName + randNum.toString() + '1');
    Dial.clickConfirmButton();
    Dial.verifySoftPhoneOpen();
    addCamp.clickSoftphoneNextLead();
    addCamp.verifyToast('No available contacts found, please try later');
    addCamp.clickSoftphoneIcon();
  });

  it('Archive Created Preview Dialer Campaign', function () {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '1'
    );
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    cy.wait(1000);
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    addCamp.verifyArchivedCampaign(
      fixtureData.campaignName + randNum.toString() + '1',
      'not.exist'
    );
  });

  it('Verify status dropdown is showing Archived Campaign', function () {
    addCamp.clickToSelectStatus('Status');
    addCamp.clickStatusArchived();
    addCamp.verifyArchivedCampaign(
      fixtureData.campaignName + randNum.toString() + '1',
      'be.visible'
    );
  });

  it('Verify search button functionality', function () {
    addCamp.searchCampaign(fixtureData.campaignName + randNum.toString() + '1');
    addCamp.verifyArchivedCampaign(
      fixtureData.campaignName + randNum.toString() + '1',
      'be.visible'
    );
  });

  it('Verify elements on New Campaign Page', function () {
    addCamp.clickCampaignMenu();
    cy.wait(3000);
    addCamp.clickAddNewCampaign();
    addCamp.verifyDialingMode();
    addCamp.selectDialingMode('Predictive');
    addCamp.verifyAgentToAssignDropdown();
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.verifyPhoneNumberToAssignDropdown();
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.verifyContactListDropdown();
    addCamp.verifyCampaignNameField();
    addCamp.verifyCallResultsDropdown();
    addCamp.clickAdvancedConfiguration();
    addCamp.verifyCallsOrder();
    addCamp.verifyCallConnectType();
   // addCamp.verifySimultaneousDialsField();
    // addCamp.verifyRingTimeDuration();
    addCamp.verifyAbandonedTimeout();
    addCamp.verifyRetryTime();
    addCamp.verifyRetryTimeUnitDropdown();
    addCamp.verifyMaxAttempts();
    addCamp.verifyMaxCallsPerDay();
    addCamp.clickOnButton('Cancel');
  });

  it('Verify Elements present in Recycle page', function () {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    addCamp.verifyRecStartEndDate();
    addCamp.verifyRecCallResult();
    addCamp.verifyRecUseList();
    addCamp.verifyRecCampaignName();
    addCamp.verifyRecSkipLeads();
    addCamp.verifyRecSkipContact();
    addCamp.verifyRecSaveCampaignButton();
    addCamp.verifyCancelButton();
  });

  it('On click on campaign name it should open edit campaign page', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickCampaignName(testData.campaign);
    addCamp.verifyCampaignNameField();
  });

  it('Verify all combination of filter are working properly', () => {
    addCamp.clickCampaignMenu();
    addCamp.searchCampaign(testData.campaign);
    addCamp.clickToSelectStatus('Status');
    addCamp.clickActiveStatus();
    addCamp.verifyAddedCampaign(testData.campaign);
  });

  it('It should open schedule window when user click on calling hours', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randNum.toString());
    addCamp.selectCallResults([
      'Answering Machine',
      'No Answer',
      'Successful Sale',
      'Voicemail',
    ]);
    addCamp.clickAdvancedConfiguration();
    addCamp.clickCallingHours();
  });

  it('Verify From and To field get disable whenever user unselect check box', () => {
    addCamp.clickScheduleCheckmark();
    addCamp.verifyScheduleCheckbox('have.attr');
  });

  it('Verify From and To field get enable whenever user select check box', () => {
    addCamp.clickScheduleCheckmark();
    addCamp.verifyScheduleCheckbox('not.have.attr');
    addCamp.clickScheduleCancelButton();
  });

  it('Verify Select All, Apply All, Apply, Cancel Button Functionality on schedule window', () => {
    addCamp.clickCallingHours();
    addCamp.clickSelectAllCheckbox();
    addCamp.verifySelectAll('have.attr');
    addCamp.clickSelectAllCheckbox();
    addCamp.clickScheduleCheckmark();
    addCamp.clickApplyToAllButton();
    addCamp.verifySelectAll('have.attr');
    addCamp.clickScheduleCheckmark();
    addCamp.clickApplyButton();
    addCamp.VerifyApplyFunctionality();
    addCamp.clickCallingHours();
    addCamp.clickScheduleCancelButton();
    addCamp.verifyScheduleTableNotVisible();
  });

  it('Verify contact list dropdown should show lists dropdown', () => {
    addCamp.clickListDropdown('Contact Lists');
    addCamp.verifyContactListDropdown();
  });

  it('Verify Campaign Setting Options', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyRecycleCamapignDelete();
    addCamp.clickCampaignSetting();
    addCamp.verifyCampaignSettingOptions([
      'Edit Campaign',
      'Recycle',
      'Call Again',
      'Import Contacts',
      'Archive',
      'Reports',
      'Changelog',
    ]);
  });

  it('Verify functionality of edit Campaign button', () => {
    addCamp.clickCampaignMenu();
    // addCamp.clickFirstCampaignMenuButton();
    // addCamp.clickEditCampaignNew();
    addCamp.clickOnCampName(testData.campaign);
    cy.wait(5000)
    addCamp.selectDialingMode('Predictive');
    cy.wait(1000);
    //addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
    addCamp.verifyCampaignChange('Predictive Dialer');
    addCamp.clickFirstCampaignMenuButton();
    addCamp.clickEditCampaignNew();
    addCamp.selectDialingMode('Preview');
    //addCamp.clickTermsConditionsCheckbox();
    addCamp.clickOnButton('Save');
    addCamp.verifyCampaignChange('Preview Dialer');
  });

  it('Verify the tool tip for Start and end Date field in the Recycle campaign set up screen', () => {
    cy.reload();
    ignoreSpeedTestPopup();
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    addCamp.mouseOverOnQuestionToolTip('Start and End Date');
    addCamp.verifyQuestionTooltipText('Campaign will only include the contacts that were called within this date range.');
  });

  it('Verify the default date range is set to All Time for start and end date field in the Recycled campaign setup screen.', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    addCamp.verifyDefaultDateRange('All Time')
  });

  it('Verify the Auto generated Name of Recycled campaign for First Recycle of Initial campaign', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    addCamp.verifyDefaultRecycleCampaignName(testData.campaign + ' - 1');
  });

  it('Create the Recycle Campaign', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    // addCamp.selectRecycleCallResult('Busy');
    // addCamp.enterNewCampaignName('RecycledCampaign');
    addCamp.removeCheckBox();
    addCamp.clickRecycleSaveCampaign();
    addCamp.verifyToast('Recycled campaign created');
    addCamp.verifyAddedRecycleCampaign(testData.campaign + ' - 1');
  });

  it('Verify the Auto generated Name of Recycled campaign for Second Recycle of Initial campaign', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    addCamp.removeCheckBox();
    addCamp.verifyDefaultRecycleCampaignName(testData.campaign + ' - 1');
    addCamp.clickRecycleSaveCampaign();
    addCamp.verifyToast('Duplicate campaign name');
  });

  it('Verify that when a campaign is recycled first time new campaign is having recycle icon is displayed in the campaign page.', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyRecycleIconWithCount(testData.campaign + ' - 1', 1)
  });

  it('Verify that when hovering on the recycle icon tooltip is displayed indicating the source campaign.', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifySourceCampaign(testData.campaign, testData.campaign + ' - 1');
  });

  it('Verify that Change log for the Reycled campaign is updated', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickRecycleCampaignMenuBtn(testData.campaign + ' - 1');
    addCamp.clickDropdownItem('Changelog');
    addCamp.verifyDialogOpen();
    addCamp.verifyModalTitle(
      `Change Log ${testData.campaign + ' - 1'}`
    );
    cy.wait(1000);
    addCamp.verifyChangeLogItemsText(
      `${testData.campaign + ' - 1'} Recycled by ${
        testData.AdminName
      } based on ${
        testData.campaign
      }`
    );
    addCamp.clickModalCloseBtn();
  });

  it('Verify that if the same campaign is Recycled multiple times count inside the Recycle icon is remains the same.', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(testData.campaign);
    addCamp.clickRecycleOption();
    cy.wait(500);
    addCamp.enterNewCampaignName('RecycledCampaign'); 
    addCamp.removeCheckBox();
    addCamp.clickRecycleSaveCampaign();
    addCamp.verifyToast('Recycled campaign created');
    addCamp.verifyAddedRecycleCampaign('RecycledCampaign');
    addCamp.verifyRecycleIconWithCount('RecycledCampaign', 1)  //recycle count will be 1 for first recycle but name will be different
    addCamp.archiveRecycledCampaign('RecycledCampaign');
  });

  it('Verify that REPORTS-->CAMPAIGN page is updated with the Recycled icon along with the counts', () => {
    report.clickReportMenu();  
    report.clickReportsHeader('Campaigns');
    report.clickCampaignCalanderDropdown();
    report.clickDateBtnLinks('Today');
    report.clickStatusDropdown();
    report.selectCampaignStatus('Active')
    report.verifyRecycleIconWithCount(testData.campaign + ' - 1', 1)
  });

  it('Verify the Auto generated Name of Recycled campaign for First Recycle of Recycled Campaign', () => {
    addCamp.CallFromRecycleCampaign(testData.campaign + ' - 1');
    cy.reload();
    ignoreSpeedTestPopup();
    addCamp.clickCampaignMenu();
    addCamp.clickRecycleCampaignMenuBtn(testData.campaign + ' - 1');
    addCamp.clickDropdownItem('Recycle');
    addCamp.verifyDefaultRecycleCampaignName(testData.campaign + ' - 2'); 
    addCamp.clickRecycleSaveCampaign();
    addCamp.verifyToast('Recycled campaign created');
    addCamp.verifyAddedRecycleCampaign(testData.campaign + ' - 2');
  });

  it('Verify the Auto generated Name of Recycled campaign for Second Recycle of Recycled Campaign', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickRecycleCampaignMenuBtn(testData.campaign + ' - 1');
    addCamp.clickDropdownItem('Recycle');
    addCamp.verifyDefaultRecycleCampaignName(testData.campaign + ' - 2'); 
    addCamp.clickRecycleSaveCampaign();
    addCamp.verifyToast('Duplicate campaign name');
  });

  it('Verify the Auto generated Name of Recycled campaign for First Recycle of Recycled Recycled Campaign third Recycle', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickRecycleCampaignMenuBtn(testData.campaign + ' - 2');
    addCamp.clickDropdownItem('Recycle');
    addCamp.verifyDefaultRecycleCampaignName(testData.campaign + ' - 3'); 
  });

  it('Archieve the Created Recycle Campaign', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickRecycleCampaignMenuBtn(testData.campaign + ' - 1');
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    addCamp.verifyArchivedCampaign(testData.campaign + ' - 1', 'not.exist');
  });

  it('Verify that default Campaign name should be in the format of (New Campaign - MM-DD-YY, unless changed)', () => {
    addCamp.getProfileTimezone();
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.verifyDefaultCampaignName('New Campaign - ' + today);
  });

  it('Verify default value in all fields in Create New Campaign page', () => {
    addCamp.verifyDefaultCampaignName('New Campaign - ' + today);
    cy.url().then((url) => {
      if(url.includes('app.batchdialer.com')) {
        addCamp.verifyCallResultsOption([
          'Abandoned',
          'Answering Machine',
          'Call Back',
          'Do Not Call',
          'No Answer',
          'Not Interested',
          'Successful Sale',
          'Voicemail',
        ]);
      } else {
        addCamp.verifyCallResultsOption([
          'Abandoned',
          'Busy',
          'Default 1',
          'Do Not Call',
          'No Answer',
          'Successful Sale',
          'Voicemail',
        ]);
      }
    });
    addCamp.verifyDefaultValue('Agent Script', 'Default');
    addCamp.clickAdvancedConfiguration();
    addCamp.VerifyDefaultRadioBtn('Smart Local Presence ','Enabled');         // BAT-T1128
    addCamp.VerifyDefaultRadioBtn('Call Connect Type','Automatic Answer');
    addCamp.verifyDialingBehavior('Max Calls per Day', 0);
    addCamp.verifyDialingBehavior('Max Attempts Per Record', 3);
    //addCamp.verifyDialingBehavior('Simultaneous Dials p/Agent', 2);
    addCamp.verifyDefaultCheckbox('Call Recording','enable');                 
    addCamp.verifyDefaultCheckbox('Suppress System Do Not Contact','enable');      
    addCamp.verifyDefaultCheckbox('Answering Machine Detection','disable');
    addCamp.verifyDefaultCheckbox('Suppress Federal Do Not Call', 'disable');    
    addCamp.verifyDefaultCheckbox('Suppress Wireless Contacts', 'disable');      // BAT-T1207 
    addCamp.verifyDefaultCheckbox('Suppress Litigator Contacts', 'disable');
    addCamp.verifyDefaultValue('Calling Hours', 'Sun-Sat: 8:00 am-9:00 pm');
    cy.readFile('cypress/fixtures/testData.json').then((data) => 
      addCamp.verifyDefaultValue('Time Zone', data.timeZone)
    );
  });

  it('Verify the tool tip displayed on the Campaign element', () => {
    addCamp.mouseOverOnQuestionToolTip('Agents');
    addCamp.verifyQuestionTooltipText('Assign which agents or group can join this campaign');
    addCamp.mouseOutOnQuestionToolTip('Agents');

    addCamp.mouseOverOnQuestionToolTip('Phone Numbers');
    addCamp.verifyQuestionTooltipText('Phone numbers are used to dial outbound calls to customers.');
    addCamp.mouseOutOnQuestionToolTip('Phone Numbers');

    addCamp.mouseOverOnQuestionToolTip('Contact Lists');
    addCamp.verifyQuestionTooltipText('The selected lists will be automatically added to the campaign.');
    addCamp.mouseOutOnQuestionToolTip('Contact Lists');

    addCamp.mouseOverOnQuestionToolTip('Campaign Name');
    addCamp.verifyQuestionTooltipText('The campaign name is used for internal campaign identification and tracking');
    addCamp.mouseOutOnQuestionToolTip('Campaign Name');

    addCamp.mouseOverOnQuestionToolTip('Call Results');
    addCamp.verifyQuestionTooltipText('The call outcomes you select here will be available for agents to select from once the call has ended. You will be able to view');
    addCamp.mouseOutOnQuestionToolTip('Call Results');

    addCamp.mouseOverOnQuestionToolTip('Agent Script');
    addCamp.verifyQuestionTooltipText('The predefined script that agents will see in real time upon successful connection');
    addCamp.mouseOutOnQuestionToolTip('Agent Script');

    addCamp.mouseOverOnQuestionToolTip('Max Calls per Day');
    addCamp.verifyQuestionTooltipText('User can enter up to 10 digits, maximum value is 2147483647');
    addCamp.mouseOutOnQuestionToolTip('Max Calls per Day');

    addCamp.mouseOverOnQuestionToolTip('Max Attempts Per Record');
    addCamp.verifyQuestionTooltipText('The number of times the system will attempt to dial a phone number before a connection is established');
    addCamp.mouseOutOnQuestionToolTip('Max Attempts Per Record');

   addCamp.mouseOverOnQuestionToolTip('Simultaneous Dials p/Agent');
   addCamp.verifyQuestionTooltipText('The maximum channels (phone lines) agents will be allowed to dial simultaneously on outbound campaigns. High number will lead to higher abandon rate, lower number will lead to more agent wait times between calls. Desired abandon rate < 10%.');
   addCamp.mouseOutOnQuestionToolTip('Simultaneous Dials p/Agent');

    addCamp.mouseOverOnQuestionToolTip('Retry Time');
    addCamp.verifyQuestionTooltipText('After an unsuccessful attempt to connect to a phone number, the system will retry to dial the phone number/lead after the specified time');
    addCamp.mouseOutOnQuestionToolTip('Retry Time');

    addCamp.mouseOverOnQuestionToolTip('Abandonment Timeout, sec');
    addCamp.verifyQuestionTooltipText('Abandonment Timeout');
    addCamp.mouseOutOnQuestionToolTip('Abandonment Timeout, sec');

    addCamp.mouseOverOnQuestionToolTip('Lead Sheet');
    addCamp.verifyQuestionTooltipText('Assign leadsheet');
    addCamp.mouseOutOnQuestionToolTip('Lead Sheet');

    addCamp.mouseOverOnQuestionToolTip('Calling Hours');
    addCamp.verifyQuestionTooltipText('You can pre-configure campaign calling hours to match the timezone and location you are dialing. Agents will only be allowed to join this campaign during allowed hours. TCPA allows calls to be made between 8 A.M. and 9 P.M. in the local timezone');
    addCamp.mouseOutOnQuestionToolTip('Calling Hours');
    
    addCamp.mouseOverOnQuestionToolTip('Time Zone');
    addCamp.verifyQuestionTooltipText('Setting the correct timezone for a campaign will allow agents to start and end calls at specified times');
    addCamp.mouseOutOnQuestionToolTip('Time Zone');
  });

  it('Verify the tool tip displayed on the Smart Local Presence section', () => {
    addCamp.mouseOverOnCampTitle('Smart Local Presence');
    addCamp.verifyQuestionTooltipText('Allows you to select Outbound Calling Number which is closest match to the area code, city or state that you are dialing. Other numbers will be used, if not available.');
    addCamp.clickOnButton('Cancel');
  });

  it('Verify that warning message is displayed whenMax Attempts Per Record is set above the default value (3) for Campaign type preview dialer', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Preview');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.clickAdvancedConfiguration();
    addCamp.enterMaxAttempts('Max Attempts Per Record', 4);
    addCamp.verifyMaxAttemptWarningMsg(
      'Increasing the Max Attempts per record above 3 will result in lower connection rates due to increased phone number spam detection and blocking by carriers. The recommended setting is 3 attempts per record per day. Please refer to our help desk for more information.'
    );
    addCamp.clickOnButton('Got it')
  });

  it('Verify that warning message is displayed when retry time is set below the default value (3 hours) for Campaign type preview dialer', () => {
    addCamp.enterMaxAttempts('Retry Time', 1);
    addCamp.verifyMaxAttemptWarningMsg(
      'Decreasing the Retry Time under 3 hours will result in lower connection rates due to increased phone number spam detection and blocking by carriers. The recommended setting is 3+ hours. Please refer to our help desk for more information.'
    );
  });

  it('Verify that warning message is displayed whenMax Attempts Per Record is set above the default value (3) for Campaign type preview dialer', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.clickAdvancedConfiguration();
    addCamp.enterMaxAttempts('Max Attempts Per Record', 4);
    addCamp.verifyMaxAttemptWarningMsg(
      'Increasing the Max Attempts per record above 3 will result in lower connection rates due to increased phone number spam detection and blocking by carriers. The recommended setting is 3 attempts per record per day. Please refer to our help desk for more information.'
    );
    addCamp.clickOnButton('Got it')
  });

  it('Verify that warning message is displayed when retry time is set below the default value (3 hours) for Campaign type preview dialer', () => {
    addCamp.enterMaxAttempts('Retry Time', 1);
    addCamp.verifyMaxAttemptWarningMsg(
      'Decreasing the Retry Time under 3 hours will result in lower connection rates due to increased phone number spam detection and blocking by carriers. The recommended setting is 3+ hours. Please refer to our help desk for more information.'
    );
  });

  it('Verify that User can select the agent and agents groups from agent dropdown in campaign creation page', () => {
    addCamp.getAgentList();
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.clickListDropdown('Agents');
    addCamp.verifyListInCampDropdown('Agents');
  });

  it('Verify that User can Create agent from campaign creation page by clicking on (+ Create Agents)', () => {
    let AgentName = fixtureData.userFirstname +' '+fixtureData.userLastname; 
    addCamp.createAgentViaCampaignCreation(
      AgentName,
      'demo'+randNum.toString()+'@email.com',
      '1234567890', 
      'Fleek@2016'
    );
    addCamp.verifyCreatedCampCardInField('Agents',AgentName);
    addCamp.deleteAgent(AgentName);
  });

  it('Verify that User can select the Contact lists from the contact list dropdown in campaign creation page', () => {
    addCamp.getContactList();
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.clickListDropdown('Contact Lists');
    addCamp.verifyListInCampDropdown('Contact Lists');
  });
  
  it('Verify that user can upload contact list from campaign creation page by clicking on (upload contacts)', () => {
    addCamp.uploadContactViaCampaignCreation('contact-sample.csv');
    addCamp.verifyCreatedCampCardInField('Contact Lists', 'contact-sample.csv');
    addCamp.verifyFileInContactList('contact-sample.csv');
  });

  it('Verify that User can select the phone number from phone number dropdown in campaign creation page', () => {
    addCamp.getPhoneNumberList();
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.clickListDropdown('Phone Numbers');
    addCamp.verifyListInCampDropdown('Phone Numbers');
  });

  it('Verify that User can Buy phone number from campaign creation page by clicking on (Buy Phone Numbers) button', () => {
    addCamp.buyPhoneNumberViaCampaignCreation();
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      addCamp.verifyCreatedCampCardInField('Phone Numbers', data.BuyNumber);
      addCamp.deletePhoneNumber(data.BuyNumber);
    });
  });

  it('Verify that user can go back to completed steps but cannot go forward for incomplete steps in Wizard and all the wizards icon are clickable (if steps are already completed)', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.verifyIncompleteCampWizard('Agents');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randNum.toString() + '2');
    addCamp.clickOnCampaignWizard('Dialing Mode');
    addCamp.verifyDialingMode();
    addCamp.clickAdvancedConfiguration();
    addCamp.clickOnCampaignWizard('Call Results');
    addCamp.verifyCallResultsDropdown();
    addCamp.clickOnCampaignWizard('Agent Script');
    addCamp.clickOnCampaignWizard('Agents');
    addCamp.verifyAgentToAssignDropdown();
    addCamp.verifyPhoneNumberToAssignDropdown();
  });

  it('Verify that when user click on eye icon its should open the selected agent script which is not editable', () => {
    addCamp.verifyAgentScript();
    addCamp.verifyAgentScriptEyeBtn('be.visible');
    addCamp.clickAgentScriptEyeBtn();
    addCamp.verifyDialogOpen();
    addCamp.verifyAgentScriptOpen();
  });
  
  it('Verify that when no script selected then eye icon should not be available', () => {
    addCamp.selectAgentScriptDropdown('None');
    addCamp.verifyAgentScriptEyeBtn('not.exist');
  });

  it('Verify that Accept Terms and Conditions is visible', () => {
    addCamp.verifyTermsAndConditionsAcknowlegde(
      'You acknowledge that you have read, understand and accept our terms of service (link) as well as all TCPA, TSR and applicable state specific regulations including but not limited to:' + 
      'You must have documented consent or another exemption to call numbers on State/Fed DNC lists.' + 
      'You must have documented consent or another exemption to call wireless numbers using a dialer. We do not certify that our system is not an auto dialer.' +
      'It is illegal to market to individuals who have asked you to stop. No marketing to individuals/numbers who have requested that calls stop, or otherwise revoked consent.' +
      'No delivery of pre-recorded messages or artificial voices without well documented written consent.' +
      'Certain states require consent for call recording/monitoring. You acknowledge proper disclosures are in place at the beginning of every call.' 
    );
  });

  it('Verify that without Accepting terms and Condition save option is disable', () => {
    addCamp.verifyTermConditionCheckbox('disabled'); //checkbox before click
    addCamp.verifySaveButtonVisiblity('disabled');
  });

  it('Verify that user is able to Accept terms and Condition on Campaign page', () => {
    addCamp.clickTermsConditionsCheckbox();
    addCamp.verifyTermConditionCheckbox('enabled');  //checkbox after click
  });

  it('Verify that after Accepting Terms And Condition User is able to Save Campaign', () => {
    addCamp.verifySaveButtonVisiblity('enabled');
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Created');
    addCamp.clickEditCampaign(fixtureData.campaignName + randNum.toString() + '2');
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    cy.wait(1000);
    addCamp.verifyArchivedCampaign(fixtureData.campaignName + randNum.toString() + '2', 'not.exist');
  })

  it('Verify that all the required fields are filled up: Atleast 1 agent, Atleast 1 phone number then save button should be enabled', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.clickTermsConditionsCheckbox();
    addCamp.verifySaveButtonVisiblity('enabled');
  });

  it('Verify that Advanced Configuration is hidden by default and when user clicks on (+) icon then its shows the Advanced Configuration', () => {
    addCamp.verifyActiveCampLength(5);
    addCamp.clickAdvancedConfiguration();
    addCamp.verifyActiveCampLength(12);
  });

  it('Verify that if any one of the field - Agent and Phone number is not filled then Save button should disabled', () => {
    addCamp.clickSelectedItem(testData.AdminName);
    addCamp.verifySaveButtonVisiblity('disabled');
    addCamp.clickOnButton('Cancel');
  });

  it('Verify that when user create preview campaign then some fields should not shown', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Preview');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.clickAdvancedConfiguration();
    addCamp.verifyCallConnectType('not.exist');
    //addCamp.verifySimultaneousDialsField('not.exist');
    addCamp.verifyCheckboxField('Answering Machine Detection','not.exist');
  });

  it('Verify that by default Smart Local Presence is enabled while creating a campaign of type preview dialer', () => {
    addCamp.VerifyDefaultRadioBtn('Smart Local Presence ','Enabled'); 
    addCamp.clickOnButton('Cancel');
  });

  it('Verify that user can add campaign in the draft by clicking on (Save to Draft) button', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyDraftCampDelete();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Preview');
    addCamp.clickOnButton('Save to draft');
    addCamp.verifyToast('Campaign Saved as Draft');
  });

  it('Verify that when user save campaign as draft its should show in the campaign table', () => {
    addCamp.clickCampaignMenu();
    addCamp.verifyAddedCampaign('New Campaign - '+ today);
  });

  it('Verify that draft campaign should always show on the top of the campaign list', () => {
    addCamp.verifyDraftAtTop();
  });

  it('Verify that when user save campaign as draft and again open new campaign then its should open from the scratch', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.verifyDialingMode();
    addCamp.verifyAgentToAssignDropdown('not.exist');
    addCamp.clickOnButton('Cancel');
  });

  it('Verify that when user edit the draft campaign then it should open from where user left the campaign', () => { 
    addCamp.clickOnDraftIcon();
    addCamp.verifyDialingMode();
    addCamp.verifyAgentToAssignDropdown();
    addCamp.verifyPhoneNumberToAssignDropdown('not.exist');
  });

  it('Verify that when user edit the already created campaign then the same layout as campaign creation flow should open',() => {
    addCamp.verifyPhoneNumberToAssignDropdown('not.exist');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.verifyPhoneNumberToAssignDropdown();
    addCamp.verifyCampaignNameField('not.exist');
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.verifyCampaignNameField();
  });

  it('Verify that user can can save the draft as a draft again and the data will get updated',() => {
    addCamp.enterCampaignName('Draft Campaign-edited');
    addCamp.clickOnButton('Save to draft');
    addCamp.verifyToast('Campaign Saved as Draft');
    addCamp.verifyAddedCampaign('Draft Campaign-edited'); //edit campaign visible
  });

  it('Verify that user can delete the draft campaign', () => {  //BAT-T647
    addCamp.clickEditCampaign('Draft Campaign-edited');
    addCamp.clickDropdownItem('Delete');
    addCamp.verifyToast('Draft Deleted');
  });

  it('Verify that in call order > in Adaptive user click on (Lead score setting here) it should open the lead score section', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.clickAdvancedConfiguration();
    addCamp.clickOnLeadScore();
    addCamp.verifyLeadScoreHeading();
  });

  it('Verify that when user add 1 phone number during creating or editing campaign it shows a message below', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.clickListDropdown('Phone Numbers');
    addCamp.selectDropdownValue();
    addCamp.verifyPhoneNumberMsg('Based on industry best practices, recommended dials per phone number per day is 150. You will be able to make 150 calls with 1 phone number.');
  });

  it('Verify that when user add 2 phone number during creating or editing campaign it shows a message below',() => {
    addCamp.selectDropdownValue();
    addCamp.verifyPhoneNumberMsg('Based on industry best practices, recommended dials per phone number per day is 150. You will be able to make 300 calls with 2 phone number.');
  });

});
