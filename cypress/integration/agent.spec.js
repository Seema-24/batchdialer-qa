import Agent from '../support/pages/Agent';
import Campaign from '../support/pages/Campaigns';
import Contacts from '../support/pages/Contacts';
import Dialer from '../support/pages/Dialer';
import { closeDialogBox, handlePoorConnectionPopup, ignoreSpeedTestPopup, verifyCloseApp } from '../support/Utils';

let testData;
let randNum = Math.floor(Math.random() * 100000);
const agent = new Agent();
const addCamp = new Campaign();
const dialer = new Dialer();
const contact = new Contacts();
let fixtureData;
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

  it('Verify Recent Contact dropdowns should be visible', () => {
    agent.clickRecentContact();
    agent.clickFilterButton();
    agent.verifyRecentContactDropdown([
      'All Calls',
      'Call Results',
      'Campaigns',
      'All Durations',
      'Mood',
    ]);
  });

  it('Verify Recent Contact Table Header Element', () => {
    agent.verifyTableHeaderElements([
      'Call Type',
      'Date/Time',
      'Call From',
      'Customer Number',
      'Customer Name',
      'Campaign',
      'Call Result',
      'Duration',
    ]);
  });

  it('Verify Table In Header Calender and Export should be Visible', () => {
    agent.clickTimeInStatusButton();
    agent.verifyTableInStatusCalender();
    agent.verifyTableInStatusExport();
  });

  it('Verify Table In Status Table Header Elements', () => {
    agent.verifyTableInStatusTableHeader([
      'Agent',
      'Logged Time',
      'Calls',
      'Answered',
      'Abandon',
      'Abandon Rate',
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

  it('Verify Table In Status Table Data should be visible', () => {
    agent.verifyTableInStatusTableData();
  });

  it('Verify Elements On Contact Page', () => {
    agent.clickOnContactButton();
    agent.verifySearchBox();
    agent.clickFilterButton();
    agent.checkRoundAndCheckBtns();
    agent.selectAllRoundBtn();
    agent.clickOnAppointmentMadeOnlyBtn();
    agent.clickOnSelfMadeButton();
  });

  it('Verify Table In Contact Table Header Elements', () => {
    agent.veirifyConatactTableHeader([
      'Full Name',
      'Score',
      'Phone Number',
      'Dialed',
      'Last Contact',
      'Address',
      'Email',
      'Lists',
      'Created',
    ]);
  });
  it('Verify Refersh Button On Contact Page Table Header', () => {
    agent.verifyRefreshBtn();
  });
  it('Verify All List Button On Contact Page Table', () => {
    agent.verifyListButton();
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
  it('Verify The Table On Campaign Table Header Element', () => {
    agent.verfyCampaignTableHeader([
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
      'DNC',
      'DNR',
      'Created',
    ]);
  });
  it('Verify The Elements On The Page Of View Contact On Contact Page', () => {
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.vierifyTheHeaderOfViewContact(['Address', 'Phone']);
    agent.verifyContactViewBtn();
    agent.verifyZillowBtn();
    agent.verifyGoogleMapsBtn();
    agent.verifyLeadInfoBtn();
    agent.verifyCallsInfoInHeder();
    agent.verifyVoiceMailInfo();
    agent.verifyPropertyDetailsBtn();
    agent.verifyCampaignBtn();
    agent.verifyNotesBtn();
  });
  it('Verify The Elements On Edit Form Of View Contact', () => {
    agent.verifyEdiitFormOnViewContact([
      'First name',
      'Last name',
      'Address',
      'City',
      'State',
      'Postal Code',
      'Mailing Address',
      'Mailing City',
      'Mailing State',
      'Mailing Postal Code',
      'Contact List',
    ]);
    //agent.verifySaveBtn();
  });
  it('Verify The Script Body On View Contact Page', () => {
    agent.verifyScriptBody();
  });
  it('Verify the Script Minimize Button On contact View Page', () => {
    agent.VerifyscriptMinimizeBtn();
  });
  it('Verify Activities Page On View Contact Page', () => {
    agent.clickOnactivitiesBtn();
    agent.verifyActivitiesPage('Recent Activities');
  });

  it('Verify The Campaign Page On View Contact Of Contacts', () => {
    agent.clickOnCampaignBtnOnViewContact();
    agent.verifyViewContactCampaignTableHeader([
      'Campaign',
      'Call From',
      'Agent',
      'Disposition',
      'Date',
    ]);
  });
  it('Verify Note Page Is Opening On the View Contact', () => {
    agent.clickOnNotesBtnOnViewContact();
    agent.clickOnAddNewNoteBtn();
    agent.verifyAddNewNotePage();
    agent.clickOnAddNoteCloseBtn();
  });
  it('Verify the Text On Agent Profile', () => {
    agent.clickOnAgentProfileDropDown();
    agent.clickOnagentProfile();
    agent.verifyElementsOfAgentProfile([
      'First Name',
      'Last Name',
      'Email',
      'Address',
      'City',
      'State',
      'Zip Code',
      'Mobile Phone',
      'Landline',
      'Timezone',
      'Profile Photo',
      'Password',
    ]);
  });
  it('Verify The Elements On Agent Profile', () => {
    agent.verifyAgentFirstNameInputBox();
    agent.verifyAgentLastNameInputBox();
    agent.verifyAgentEmailInputBox();
    agent.verifyAgentAddressInputBox();
    agent.verifyAgentCityInputBox();
    agent.verifyAgentStateDropDown();
    agent.verifyAgentZipCodeInputBox();
    agent.verifyAgentMobileNumberInputBox();
    agent.verifyAgentLandLineNumberInputBox();
    agent.verifyAgentTimeZoneDropDown();
    agent.verifyAgentProfilePicChangeBtn();
    agent.verifyAgentPasswordChangeBtn();
  });

  it('Verify The Header Of Calender', () => {
    agent.openCalender();
    agent.verifyDateChangeBar();
    agent.verifyDaysOfcalender([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
  it('Verify Elements Of Calendar On Dashboard', () => {
    agent.clickDashboardMenu();
    agent.openCalenderOnDashBoard();
    agent.verifyCalenderSideBar([
      'Today',
      'Last 7 days',
      'Last 4 weeks',
      'Last 3 months',
      'Last 12 months',
      'Month to date',
      'Quarter to date',
      'Year to date',
    ]);
    agent.verifyCalenderFromDateToDate();
    agent.verifyDaysOfCalender([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
    agent.verifyMonthChangeBnts();
    agent.verifyMonthYearStatusBar();
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
    agent.clickCloseSoftphoneBtn();
  });

  it('Verify The Change Campaign Page Elements', () => {
    agent.clickOnAgentProfileDropDown();
    agent.clickOnChangeCampaignBtn();

    agent.verifyTesxtOnChangeCampaignPage('Start Calling');
    agent.verifyConfirmBtnOnChangeCamp();
  });

  it('Verify the Active Campaign count when Agent become available', () => {
    agent.clickingOnContactOption();
    cy.wait(500);
    agent.clickDashboardMenu();
    cy.wait(1500);
    agent.verifyActiveCampaignCount();
  });

  it('Verify it Open the Dialing Keypad when we click on Phone number in Contact View Page', () => {
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.clickPhoneNumber();
    agent.verifySoftphoneOpen();
    agent.clickCloseSoftphoneBtn();
  });

  it('Open the Call Result Window when Agent disconnect the Call', () => {
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.clickPhoneNumber();
    agent.clickCallBtn();
    cy.wait(5000);
    agent.clickEndCallBtn();
    cy.wait(1000);
    agent.verifyCallResultWindow();
    agent.selectCallResult('No Answer');
    agent.clickContinueBtn();
  });

  it('Verify the Recent Contacts Page Landing', () => {
    agent.clickRecentContact();
    agent.verifyRecentContactPage();
  });

  it('Verifies the Edit button functionality for Recent Contacts', () => {
    agent.clickRecentContact();
    agent.clickEditRecentContact();
    agent.verifyCallResultWindow();
  });

  // Fixed Test case on 5 March accordint to BAT-750
  it('Edit the Call Result of Recent Contacts', () => {
    agent.clickRecentContact();
    agent.clickEditRecentContact();
    agent.verifyCallResultWindow();
    agent.selectCallResult('Busy');
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
    agent.verifyContinueBtn();
    agent.verifyCancelBtn();
    agent.clickCancelBtn();
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
    //agent.selectCallResult('No Answer');
    agent.enterDispositionNote('testing note');
    agent.selectMood('neutral'); // good and bad
    // agent.clickContinueBtn();
    // agent.ChooseCallResult('No Answer');
  });

  it('Verify that Disposition can be set by double tap on the disposition in the call result window', () => {
    agent.doubleTapOnDisposition('No Answer');
  })

  it('Verify that note added in the Call Results window is reflected in the CONTACTS--Notes Section', () => {
    agent.ChooseCallResult('No Answer');
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    agent.clickNotesBtn();
    agent.verifyNotesContent('testing note');
  });

  it('Verify that Outbound call details are updated in View Contacts ACTIVITIES Tab', () => {
    agent.clickingOnContactOption();
    agent.enterSearch('random Contact');
    agent.clickContactName();
    cy.wait(2000);
    agent.clickOnButton('Activities');
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      agent.verifyActivityText(
        `Outbound Call from ${data.campaign} campaign to ${data.contactNumber} No Answer`
      );
    });
  });

  it('Verify that Outbound call details are updated in View Contacts CAMPAIGN Tab', () => {
    agent.clickOnButton('Campaigns');
    cy.wait(1000);
    agent.verifyContactCallData(testData.campaign, testData.agent, 'No Answer');
  });

  it('Verify that Call mood added is reflected in Reports--Recent Contacts', () => {
    dialer.clickOnMenu('Recent Contacts');
    agent.verifySelectedMood('neutral');
  });

  it('Verify set disposition by double tap in Recent contacts Edit call results', () => {
    agent.clickEditRecentContact();
    agent.verifyCallResultWindow();
    cy.wait(2000);
    agent.doubleTapOnDisposition('Busy');
    //agent.selectCallResult('Busy')
    cy.wait(2000);
    agent.verifyCallResult('Busy');
    cy.Logout();
  });

  it('Verify When Admin Assign Campaign to user it should show in agent Profile', () => {
    verifyCloseApp();
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
    addCamp.clickCampaignMenu();
    addCamp.clickAddNewCampaign();
    addCamp.selectDialingMode('Predictive');
    addCamp.selectAgentToAssign(testData.AdminName);
    addCamp.selectPhoneNumberToAssign(testData.Number);
    addCamp.enterCampaignName(fixtureData.campaignName + randNum.toString());
    addCamp.selectCallResults([
      'Answering Machine',
      'Busy',
      'Call Back'
    ]);
    addCamp.clickAdvancedConfiguration();
    addCamp.selectQueueCallMusicDropdown('None');
    addCamp.clickOnButton('Save');
    addCamp.verifyToast('Campaign Created');
    cy.Logout();
    cy.wait(1000);
    cy.visit('/', { failOnStatusCode: false });
    cy.Login(testData.AgentEmail, testData.password);
    agent.clickCampaignMenu();
    agent.verifyCampaign(fixtureData.campaignName + randNum.toString());
    cy.Logout();
    cy.wait(1000);
    cy.visit('/', { failOnStatusCode: false });
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    addCamp.clickCampaignMenu();
    addCamp.clickEditCampaign(fixtureData.campaignName + randNum.toString());
    addCamp.clickArchiveCampaignButton();
    addCamp.handleAlertForDelete();
    addCamp.verifyArchivedCampaign(
      fixtureData.campaignName + randNum.toString(),
      'not.exist'
    );
  });
});
