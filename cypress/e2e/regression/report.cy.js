import Report from '../../support/pages/Report';
import { handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus } from '../../support/Utils';

const report = new Report();
let fixtureData;
let testData;

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
  })

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
  });

  //Report --> Live elements move to Dashboard page
  it.skip('verify report live elements', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Live');
    report.verifyReportLiveElements([
      'Talking Time',
      'Active Calls',
      'Active Campaigns',
      'Missed Calls',
      'Abandoned Calls',
      'Remaining Redials',
      'Online Agents',
      'Remaining Leads',
      'In Queue',
      'Paused Agents',
      'Dialing Ratio',
      'Average Agent Wait Time',
    ]);
  });

  //report--> live page also move to dashboard page
  it.skip('verify report Live table header element', () => {
    report.verifyReportTableHeaderElements([
      'Agent',
      'Phone Number',
      'Phone Type',
      'Contact',
      'Campaign',
      'Duration',
      'Status',
    ]);
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

  it('verify report table header element for Recent Contact', () => {
    report.verifyReportTableHeaderElements([
      'Call Type',
      'Date/Time',
      'Call From',
      'Customer Number',
      'Customer Name',
      'Agent',
      'Campaign',
      'Call Result',
      'Duration',
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

  it('verify Dropdowns on Report Campaign', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Campaigns');
    report.VerifyDropdownsReportCampaign([
      'All Statuses',
      'All Agents',
      'Export',
    ]);
  });

  it('verify report table header element for Report Campaign', () => {
    report.verifyReportTableHeaderElements([
      'Campaign',
      'Status',
      'Dials',
      'Answered',
      'NA',
      'Agents',
      'Contacts',
      'Completed',
    ]);
  });

  it('Verify dropdowns of Report Agent', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Agents');
    report.verifyAgentsDropdowns(['Departments', 'All Campaigns', 'Export']);
  });

  it('verify report table header element for Report Agent', () => {
    report.verifyReportTableHeaderElements([
      'Agent',
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
      'Logged Time',
      'Calls',
      'Answered',
      'Abandon',
      'Abandon Rate',
    ]);
  });

  it('verify report table header element for Report Agent', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Numbers');
    report.verifyReportTableHeaderElements([
      'Phone Number',
      'Destination',
      'Inbound',
      'Outbound',
      'Added',
    ]);
  });

  it('Verify Functionality of search Button and Designation Dropdown', () => {
    report.searchNumber(testData.Number);
    report.verifySearchedNumber(testData.Number);
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

  it('verify Calender Elements', () => {
    report.verifyCalenderTimeline([
      'Today',
      'Last 7 Days',
      'Last 4 Weeks',
      'Last 3 Months',
      'Last 12 Months',
      'Month to Date',
      'Quarter to Date',
      'Year to Date',
    ]);
    report.verifyCalenderMonthDropdown();
    report.verifyCalenderDates();
    report.verifyCalenderDays();
  });

  it('Verify Status Dropdown Functionality', () => {
    report.clickCampaignStatusDropdown();
    report.clickActiveStatus();
    report.verifyStatusVisible('active');
    report.verifyStatusNotVisible('paused');
  });

  //it can't be verified Export data in CSV file
  it('Verifies the Export Functionality of Recent Contact', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Recent Contacts');
    report.getDialedContactNumbers();
    report.clickExportBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify Agent Heat Map Elements', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Heat Map');
    report.verifyAgentHeatMapDropdown();
    report.verifyHeatMapRadioButtons(['Day', 'Week', 'Month']);
    report.verifyHeatMapDatePicker();
  });

  it('Verify Floor Map Elements', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Floor Map');
    report.verifyAddNewFloorButton();
  });

  it('Verify that authorized user is able to view the Floor map by selecting the Floor Name', () => {
    report.clickReportMenu();
    report.clickReportsHeader('Floor Map');
    report.selectFloorViewDropdown('Test Floor');
    report.verifyFloorMapItem(2);
  });

  it('​Verify that Timer,Profile Pic ,Status color,Status,Agent Name is displayed for each element in the floor map for logged in users', () => {
    report.verifyFloorMapProfilePic();
    report.verifyFloorMapAgentName(testData.AdminName);
    report.verifyFloorMapStatus();
    report.verifyFloorMapStatusTimer();
    report.verifyFloorMapStatusColor();
  });

  it('Verify that Floor map with duplicate name can not be created', () => {
    report.clickOnButton('Add New Floor');
    report.enterFloorMap('Test Floor');
    report.clickOnButton('Save');
    report.verifyErrorMsg('Floor Map with the same name already exists');
    report.clickOnButton('Cancel');
  });

  it('Verify the User groups drop down in Create or Edit Floor map', () => {
    cy.wait(2000);
    report.clickOnButton('Add New Floor');
    report.verifyAgentGroupName([
      testData.adminWithoutCalling,
      testData.AdminName,
      testData.agent
    ]);
    report.dragAndDropAgentCard();
    report.verifyFloorMapAgentName(testData.adminWithoutCalling);
  });

  it('Verify the Clear All button in Create or Edit page', () => {
    report.verifyFloorMapItem(1);
    report.clickOnButton('Clear All');
    report.verifyFloorMapItem(0);
  });

});
