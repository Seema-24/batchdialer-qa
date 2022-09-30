import Campaign from '../support/pages/Campaigns';
import Dialer from '../support/pages/Dialer';
import Report from '../support/pages/Report';
import { clickCallFunction, closeDialogBox, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus } from '../support/Utils';

let fixtureData;
let testData;
let randNum = Math.floor(Math.random() * 1000);
let AgentName = 'demoTest automation';
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
    addCamp.enterAbandonedTimeout(15);
    addCamp.enterRetryTime(5);
    // addCamp.selectRetryTimeUnit('sec');
    // addCamp.clickOnButton('Got it');
    addCamp.enterMaxAttempts(2);
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
    addCamp.enterName('-edited');
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
    // addCamp.enterRingTimeDuration(10);
    addCamp.enterRetryTime(2);
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Saved');
    addCamp.clickEditCampaign(
      fixtureData.campaignName + randNum.toString() + '-edited'
    );
    addCamp.clickEditBtn();
    addCamp.verifyCallResultValues(8);
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
    addCamp.enterMaxAttempts(2);
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
    clickCallFunction();
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
    addCamp.verifySimultaneousDialsField();
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

  //old testcase, validation on req field not working
  it.skip('Verify Validation on required field of new campaign page', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.enableAdvancedSwitchBar();
    addCamp.clickNextCircleArrow();
    addCamp.verifyErrorMessage('Enter Campaign Name');
    addCamp.verifyCallerIdError();
    addCamp.enterName(fixtureData.campaignName + randNum.toString());
    addCamp.selectCallerId('Individual Numbers', testData.Number);
    addCamp.clickNextCircleArrow();
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
    addCamp.clickContactListDropdown();
    addCamp.verifyContactListDropdown();
  });

  it('Verify Campaign Setting Options', () => {
    addCamp.clickCampaignMenu();
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
    addCamp.clickFirstCampaignMenuButton();
    addCamp.clickEditCampaignNew();
    addCamp.selectDialingMode('Predictive');
    cy.wait(1000);
    addCamp.clickOnButton('Save');
    addCamp.verifyCampaignChange('Predictive Dialer');
    addCamp.clickFirstCampaignMenuButton();
    addCamp.clickEditCampaignNew();
    addCamp.selectDialingMode('Preview');
    addCamp.clickOnButton('Save');
  });

  it('Verify the tool tip for Start and end Date field in the Recycle campaign set up screen', () => {
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
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.verifyDefaultCampaignName('New Campaign');
  });

  it('Verify that User can Create agent from campaign creation page by clicking on (+ Create Agents)', () => {
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.createAgentViaCampaignCreation(
      AgentName,
      'demo'+randNum.toString()+'@email.com',
      '1234567890', 
      'Fleek@2016'
    );
    addCamp.verifyCreatedAgentsInField(AgentName);
    addCamp.deleteAgent(AgentName);
  });

});
