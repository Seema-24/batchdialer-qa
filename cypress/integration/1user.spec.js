import User from '../support/pages/User';
import Dashboard from '../support/pages/Dashboard';
import { ignoreSpeedTestPopup, selectAgentStatus } from '../support/Utils';

let fixtureData;
let testData;
let randNum = Math.floor(Math.random() * 100000);
const addUser = new User();
var count;
const Dash = new Dashboard();

describe('Login Successfully and Add User', () => {
  before(() => {
    cy.readFile('cypress/fixtures/constants.json', (err, data) => {
      if (err) {
        return console.error(err);
      }
    }).then((data) => {
      data.randNum = randNum;
      cy.writeFile('cypress/fixtures/constants.json', JSON.stringify(data));
    });

    cy.fixture('testData').then((data) => (testData = data));

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

  after(() => {
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
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
    addUser.enterLastName(fixtureData.userLastname + randNum.toString());
    addUser.enterEmail(
      fixtureData.userEmail.replace(
        'automation',
        'automation' + randNum.toString()
      )
    );
    addUser.enterPassword(fixtureData.userPassword);
    addUser.enterPhoneNumber('0123456789');
    addUser.clickSaveButton();
    addUser.verifySuccessToast();
  });

  it('Should show added user in table', () => {
    addUser.clickingOnUserOption();
    addUser.searchUser(
      fixtureData.userFirstname +
        ' ' +
        fixtureData.userLastname +
        randNum.toString()
    );
    cy.wait(2000);
    addUser.verifyAddedUser(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
    );
  });

  it('Verify that Logout and Change presence icons are visible in USERS page', () => {
    addUser.verifyChangePresenceVisible(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
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

  it('Verify that admin user is able to Logout the Agent user from USERS page', () => {
    addUser.clickUserLogoutIcon(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
    );
    addUser.handleWindowAlert('Do you want to log the user out?');
  });

  it('Verify that admin user is able to enable/disble Edit contact info feature for the agent user', () => {
    addUser.clickingOnUserOption();
    addUser.searchUser(
      fixtureData.userFirstname +
        ' ' +
        fixtureData.userLastname +
        randNum.toString()
    );
    cy.wait(2000);
    addUser.clickUserEditButton(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
    );
    addUser.clickAgentContactEditAccess();
    addUser.clickOnButton('SAVE');
    addUser.verifyToastMessage('Saved');
    cy.wait(1000);
    addUser.clickUserEditButton(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
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
        randNum.toString()
    );
    cy.wait(2000);
    addUser.deleteAddedContact(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
    );
    addUser.handleWindowAlert('Delete user?');
    addUser.verifyDeletedToast();
  });

  it('Verify Search Box is visible', function () {
    addUser.verifySearchBox();
  });

  it('Verify the Search Functionality', function () {
    addUser.clickingOnUserOption();
    addUser.searchUser('supervisor automation');
    addUser.verifySearchedUser('supervisor automation');
  });

  it('verify Dropdowns present on user page', function () {
    addUser.verifyRoleDropdown();
    addUser.verifyGroupsDropdown();
    addUser.verifyAddNewUserButton();
  });

  it('Role dropdown should show the selected role', function () {
    addUser.clickRoleDropdown();
    addUser.clickAdminstratorRole('Administrators');
  });

  it('verify Agent Statuses Heading and All Statuses', function () {
    addUser.clickingOnUserOption();
    addUser.verifyAgentStatusesHeading();
    addUser.verifyAgentStatusesType([
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

  it('verify Add New Agent Page Element', function () {
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Agent');
    addUser.verifyFirstName();
    addUser.verifyLastName();
    addUser.verifyRoleDropdownNewUser();
    addUser.verifyEmailField();
    addUser.verifyPasswordField();
    addUser.verifyPhoneNumber();
    addUser.verifyAssignToGroup();
    addUser.verifyCancelButton();
    addUser.verifySaveButton();
    addUser.verifySecondPhoneField();
    addUser.clickCancelButton();
  });

  it('verify Add New Supervisor Page Element', function () {
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Supervisor');
    addUser.verifyFirstName();
    addUser.verifyLastName();
    // addUser.verifyRoleDropdownNewUser();
    addUser.verifyEmailField();
    addUser.verifyPasswordField();
    addUser.verifyPhoneNumber();
    addUser.verifyCancelButton();
    addUser.verifySaveButton();
    addUser.verifySecondPhoneField();
    addUser.clickCancelButton();
  });

  it('Verify Elements of table headers', function () {
    addUser.verifyUserTableHeadings([
      'Name',
      'Status',
      'Role',
      'Group',
      'Campaigns',
      'Added',
      'Connection',
    ]);
  });

  it('Verify User Edit and Delete Button', function () {
    addUser.verifyUserEditButton();
    addUser.verifyUserDeleteButton();
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

  it('Verify that Agent Status name has character limit of 15', () => {
    addUser.enterNameMoreThan15Char('t');
    addUser.verifyMaxChar();
    addUser.clickAgentStatusCrossBtn();
  });

  it('Should add a new Agent Status', () => {
    addUser.clickingOnUserOption();
    addUser.clickAddAgentStatus();
    addUser.enterAgentStatusName('Working');
    addUser.clickOnAgentStatusSaveBtn();
    addUser.verifyAddedAgentStatus('Working');
  });

  it('Verify that Agent Status actions are combined in the menu : Edit, Change colour, delete', () => {
    addUser.clickingOnUserOption();
    addUser.clickOnAgentStatusMenu('Working');
    addUser.verifyAgentStatusActionMenu(['Rename', 'Change Color', 'Delete']);
  });

  it('Verify that while colour picker is active then user click outside of it, will close and apply color to status', () => {
    addUser.clickingOnUserOption();
    addUser.clickAgentStatusColorIcon('Working');
    addUser.verifyColorPickerVisible();
    addUser.clickAgentStatusHeading();
    addUser.verifyColorPickerNotVisible();
  });

  it('verify that user should change the status colour by clicking the left side of status and 3 dot submenu icon change colour', () => {
    addUser.clickingOnUserOption();
    addUser.clickAgentStatusColorIcon('Working');
    addUser.verifyColorPickerVisible();
    addUser.clickOnAgentStatusMenu('Working');
    addUser.clickOnDropdownItem('Change Color');
    addUser.verifyColorPickerVisible();
  });

  it('Verify that user should be able to edit the agent status', () => {
    addUser.clickingOnUserOption();
    addUser.clickOnAgentStatusMenu('Working');
    addUser.clickOnDropdownItem('Rename');
    addUser.enterAgentStatusName('-edited');
    addUser.clickOnAgentStatusSaveBtn();
    addUser.verifyAddedAgentStatus('Working-edited');
  });

  it('verify that user clicks on Delete it should open a confirmation popup', () => {
    cy.wait(1000);
    addUser.clickingOnUserOption();
    addUser.clickAgentStatusDeleteMenu('Working-edited');
    addUser.verifyDialogOpen();
    addUser.verifyModalHeader('DELETE AGENT STATUS');
  });

  it('Remove the Added Agent Status', () => {
    addUser.clickOnButton('Delete');
    addUser.verifyToastMessage('Status was successfully deleted');
    addUser.verifyRemovedAgentStatus('Working-edited');
  });

  it('Verify that error message is displayed when try to save a Group keeping Name left blank', () => {
    addUser.clickingOnUserOption();
    addUser.clickAddAgentGroup();
    addUser.clickOnAgentGroupSaveBtn();
    addUser.verifyToastMessage('Minimum 3 characters long');
  });

  it('Verify the maximum number of characters for the Group Name', () => {
    addUser.clickingOnUserOption();
    addUser.clickAddAgentGroup();
    addUser.enterNameMoreThan15Char('t');
    addUser.verifyMaxChar();
    addUser.clickUserGroupCrossBtn();
  });

  it('Verify the minimum number of characters for the Group Name', () => {
    addUser.clickingOnUserOption();
    addUser.clickAddAgentGroup();
    addUser.enterAgentGroupName('to');
    addUser.clickOnAgentGroupSaveBtn();
    addUser.verifyToastMessage('Minimum 3 characters long');
  });

  it('Should add a new Agent Group', () => {
    addUser.clickingOnUserOption();
    addUser.clickAddAgentGroup();
    addUser.enterAgentGroupName('Working');
    addUser.clickOnAgentGroupSaveBtn();
    addUser.verifyAddedAgentGroup('Working');
  });

  it('Verify that the number of agents is displayed along with group name', () => {
    const [agentFirstName, agentLastName] = testData.agent.split(' ');
    addUser.clickingOnUserOption();
    addUser.clickUserThreeDotMenu(agentFirstName, agentLastName);
    addUser.clickOnDropdownItem('Edit');
    addUser.clickUserGroupDropdown();
    addUser.selectOption('Working');
    addUser.clickOnButton('SAVE');
    addUser.verifyToastMessage('Saved');
    addUser.verifyGroupWithAgentNumber('Working', '1');
  });

  it('Verify that authorized user is able to Rename the existing Group', () => {
    addUser.clickingOnUserOption();
    addUser.clickUserGroupMenuBtn('Working');
    addUser.clickOnDropdownItem('Rename');
    addUser.enterAgentGroupName('-edited');
    addUser.clickOnAgentGroupSaveBtn();
    addUser.verifyAddedAgentGroup('Working-edited');
  });

  it('Remove the Added Agent Group', () => {
    addUser.clickingOnUserOption();
    addUser.removeAddedAgentGroup('Working-edited');
    addUser.verifyToastMessage('User Group was successfully deleted');
    addUser.verifyRemovedAgentGroup('Working-edited');
  });

  it('Agent count should increase when admin add agent', async () => {
    Dash.clickUserProfile();
    Dash.clickBilling();
    count = await addUser.getTotalAgentCount();
    cy.log(count);
  });

  it('Create Agent and Verify count', () => {
    addUser.clickingOnUserOption();
    cy.wait(3000);
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Agent');
    addUser.enterFirstName(fixtureData.userFirstname);
    addUser.enterLastName(fixtureData.userLastname + randNum.toString());
    addUser.enterEmail(
      fixtureData.userEmail.replace(
        'automation',
        'automation' + randNum.toString()
      )
    );
    addUser.enterPassword(fixtureData.userPassword);
    addUser.enterPhoneNumber('0123456789');
    addUser.clickSaveButton();
    addUser.verifySuccessToast();
    Dash.clickUserProfile();
    Dash.clickBilling();
    addUser.verifyAgentCount(count);
  });

  it('Verify Validation on fields on Add new user page', () => {
    addUser.clickingOnUserOption();
    cy.wait(3000);
    addUser.searchUser(
      fixtureData.userFirstname +
        ' ' +
        fixtureData.userLastname +
        randNum.toString()
    );
    cy.wait(2000);
    addUser.deleteAddedContact(
      fixtureData.userFirstname,
      fixtureData.userLastname + randNum.toString()
    );
    addUser.clickAddNewUserButton();
    addUser.chooseUserRole('Agent');
    addUser.clickSaveButton();
    addUser.verifyFieldValidation([
      'Enter First Name',
      'Enter Last Name',
      'Enter Password',
      'Enter Email',
      'Enter Phone',
    ]);
    addUser.clickCancelBtn();
  });
});
