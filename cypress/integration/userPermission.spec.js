import User from '../support/pages/User';
import UserPermission from '../support/pages/UserPermission';
import { handlePoorConnectionPopup, ignoreSpeedTestPopup } from '../support/Utils';

const permission = new UserPermission();
const user = new User();
let testData;
let agentFirstName, agentLastName;
let supervisorFirstName, supervisorLastName;

describe('User Permission Costumization Flow for Agent Role', () => {
  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
      [agentFirstName, agentLastName] = data.agent.split(' ');
    });
    cy.visit('/', { failOnStatusCode: false });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });
  beforeEach(() => {
    handlePoorConnectionPopup();
  })

  // after(() => {
  //   selectAgentStatus('Offline');
  //   cy.Logout();
  // });

  it('Should Login', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin is able to enable and disable the permissions For agent', () => {
    user.clickingOnUserOption();
    cy.reload();
    ignoreSpeedTestPopup();
    user.clickAddNewUserButton();
    permission.clickUserPermissionExpander();
    permission.verifyUserPermissionsVisible();
    user.clickOnButton('CANCEL');
  });

  it('Verify that when user enabled the permission manage phone number then it should enabled the Phone number page and funtionality for the agent user', () => {
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Manage Phone Numbers');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.verifyPhoneSystemMenu();
    permission.clickBackToAdminBtn();
  });

  it('Verify that when user disabled the permission MANAGE PHONE NUMBER then phone number page should not appear for Agent user', () => {
    ignoreSpeedTestPopup();
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Manage Phone Numbers');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.verifyPhoneSystemMenuNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enabled the permission VIEW CONTACT LISTS then user should be able to view contact lists', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.verifyContactsPage();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enabled the permission EDIT CONTACT then user should be able to edit the contact', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Contact');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.clickContactName();
    permission.verifyContactEditBtn();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disabled the permission EDIT CONTACT then Agent user should be unable to edit the contact', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Contact');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.clickContactName();
    permission.verifyContactEditBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enabled the permission EDIT CALL RESULT & NOTE then Agent user should be able to edit the Call result and note', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Call Result & Note');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.clickCallResultEditBtn();
    permission.verifyCallDispositionModal();
    user.clickOnButton('Cancel');
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disabled the permission EDIT CALL RESULT & NOTE then Agent user should not able to edit the Call result and note', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Call Result & Note');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyCallResultBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that User is Enable the permission of View/Export Recent Contacts and It Reflect on Agent Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Recent Contacts');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.verifyRecentContactsExportBtnExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that User is Enable the permission of View/Export Recent Contacts and It Reflect on Agent Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Recent Contacts');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.verifyRecentContactsExportBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disabled the permission View Contact Lists then user should saw only assign list', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.verifyToastMessage(
      `You don't have sufficient rights to run this action!`
    );
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View/Export Do-Not-Call then Agent user should able to see DNC page', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Do-Not-Call');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Phone System');
    permission.verifyDncPageVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disabled the permission View/Export Do-Not-Call then Agent user should not able to see DNC page', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Do-Not-Call');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.verifyPhoneSystemMenuNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission Export Contact Lists then Agent user should able to export contact list', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Export Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    permission.verifyFileDownloadBtnVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disabled the permission Export Contact Lists then Agent user should not able to export contact list', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Export Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    cy.wait(2000);
    permission.verifyFileDownloadBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission Upload Contacts Lists then Agent user should able to upload contact list ', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Upload Contacts Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    permission.verifyContactsImportBtnVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables  the permission Upload Contacts Lists then Agent user should not able to upload contact list ', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Upload Contacts Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    cy.wait(2000);
    permission.verifyContactsImportBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission Listen Audio then Agent user should able to listen Audio', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Listen Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyListenIconVisible();
    permission.clickListenIcon();
    permission.verifyPlayerModalVisible();
    permission.clickPlayerCloseIcon();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission Download Audio then Agent user should able to download Audio', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Download Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyListenIconVisible();
    permission.clickListenIcon();
    permission.verifyPlayerModalVisible();
    permission.verifyPlayerDownloadBtnVisible();
    permission.clickPlayerCloseIcon();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables the permission Download Audio then Agent user should not able to download Audio', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Download Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyListenIconVisible();
    permission.clickListenIcon();
    permission.verifyPlayerModalVisible();
    permission.verifyPlayerDownloadBtnNotExist();
    permission.clickPlayerCloseIcon();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables the permission Listen Audio then Agent user should not able to listen Audio', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Listen Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    permission.chooseDateToFilter();
    cy.wait(2000);
    permission.verifyListenIconNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View All Agents Tasks then Agent user should able to View all agent tasks', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Agents Tasks');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickTasksIcon();
    cy.wait(2000);
    user.clickOnButton('Past');
    user.clickOnButton('Future');
    permission.verifyAllAssignedAgents(testData.AdminName);
    cy.wait(2000);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user Disable the permission View All Agents Tasks then Agent user should able to View all agent tasks', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Agents Tasks');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickTasksIcon();
    cy.wait(2000);
    user.clickOnButton('Past');
    user.clickOnButton('Future');
    permission.verifyAssignedAgentName(testData.agent);
    cy.wait(2000);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View All Campaigns then Agent user should able to View All Campaigns', () => {
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.getUserCampaignCount(testData.agent);
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      permission.verifyAllCampaignsAccess(data.campaignCount);
    });
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission Create & Edit Campaigns then Agent user should able to Create & Edit Campaigns', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Create & Edit Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyNewCampaignBtnVisible();
    permission.verifyCampaignEditIconVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disable the permission Create & Edit Campaigns then Agent user should able to Create & Edit Campaigns', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Create & Edit Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyNewCampaignBtnNotExist();
    permission.verifyCampaignEditIconNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission Pause/Activate Campaign then Agent user should able to Pause/Activate Campaign', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Pause/Activate Campaign');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyActivePauseEnabled();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables the permission Pause/Activate Campaign then Agent user should able to Pause/Activate Campaign', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Pause/Activate Campaign');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyActivePauseDisabled();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables the permission View All Campaigns then Agent user should able to View All Campaigns', () => {
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.getUserCampaignCount(testData.agent);
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      permission.verifyAllCampaignDenial(data.campaignCount);
    });
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View All Reports then Agent user should able to View All Reports', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Reports');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Reports');
    cy.wait(2000);
    permission.verifySubMenuExist([
      'Live',
      'Recent Contacts',
      'Campaigns',
      'Agents',
      'Numbers',
      'Heat Map',
      'Floor Map',
    ]);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View Recent Contacts of All Agents then Agent user should able to View Recent Contacts of All Agents', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Recent Contacts of All Agents');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    cy.wait(2000);
    permission.verifyAgentsHeaderAvailable();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables the permission View Recent Contacts of All Agents then Agent user should able to View Recent Contacts of All Agents', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Recent Contacts of All Agents');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    cy.wait(2000);
    permission.verifyAgentsHeaderNotAvailable();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user Disable the permission View All Reports then Agent user should able to View All Reports', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Reports');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.AgentEmail);
    ignoreSpeedTestPopup();
    permission.clickOnMenu('Recent Contacts');
    cy.wait(2000);
    permission.verifySubMenuNotExist([
      'Live',
      'Campaigns',
      'Agents',
      'Numbers',
      'Heat Map',
      'Floor Map',
    ]);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Agent user is not able to access some permissions', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.verifyNoAccessPermissions([
      'Manage Billing',
      'Assign/Remove Agents',
      'Manage User Permissions',
      'Add User',
      'Edit User',
      'Delete User',
      'Add User to the Group',
      'Remove User from the Group',
    ]);
    user.clickOnButton('CANCEL');
  });
});

describe('User Permission Costumization Flow for Supervisor Role', () => {
  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
      [supervisorFirstName, supervisorLastName] = data.supervisor.split(' ');
    });
    cy.visit('/', { failOnStatusCode: false });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  // after(() => {
  //   selectAgentStatus('Offline');
  //   cy.Logout();
  // });

  it('Should Login', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Enable and Disable the Permission Of Supervisor(user)', () => {
    user.clickingOnUserOption();
    cy.reload();
    ignoreSpeedTestPopup();
    user.clickAddNewUserButton();
    permission.clickUserPermissionExpander();
    permission.verifyUserPermissionsVisible();
    user.clickOnButton('CANCEL');
  });

  it('Verify that Admin(User)is able to Enable the Permission of Manage Phone Numbers and It Reflect on Supervisor Account', () => {
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Manage Phone Numbers');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.verifyPhoneSystemMenu();
    permission.clickBackToAdminBtn();
  });

  it('Verify that Admin(User)is able to Disable the Permission of Manage Phone Numbers and It Reflect on Supervisor Account', () => {
    ignoreSpeedTestPopup();
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Manage Phone Numbers');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.verifyPhoneSystemMenuNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(user)is enable the permission of View Contact Lists and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.verifyContactsPage();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Enable the permission of Edit Contact and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Contact');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.clickContactName();
    permission.verifyContactEditBtn();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Disable  the permission of Edit Contact and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Contact');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.clickContactName();
    permission.verifyContactEditBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Enable the permission of Edit Call Result & Note and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Call Result & Note');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.clickCallResultEditBtn();
    permission.verifyCallDispositionModal();
    user.clickOnButton('Cancel');
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Disable the permission of Edit Call Result & Note and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit Call Result & Note');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyCallResultBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is Enable the permission of View/Export Recent Contacts and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Recent Contacts');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.verifyRecentContactsExportBtnExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('verify that Admin(User) is Disable the permission of View/Export Recent Contacts and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Recent Contacts');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.verifyRecentContactsExportBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(user)is Disable the permission of View Contact Lists and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.verifyToastMessage(
      `You don't have sufficient rights to run this action!`
    );
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Enable the Permission of View/Export Do-Not-Call and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Do-Not-Call');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Phone System');
    permission.verifyDncPageVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Disable the Permission of View/Export Do-Not-Call and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View/Export Do-Not-Call');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.verifyPhoneSystemMenuNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Enable the Permission of Export Contact Lists and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Export Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    permission.verifyFileDownloadBtnVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Disable the Permission of Export Contact Lists and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Export Contact Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    cy.wait(2000);
    permission.verifyFileDownloadBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Enable the Permission of Upload Contacts Lists and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Upload Contacts Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    permission.verifyContactsImportBtnVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is Disable the Permission of Upload Contacts Lists and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Upload Contacts Lists');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Contacts');
    permission.clickOnSubMenu('Contact Lists');
    cy.wait(2000);
    permission.verifyContactsImportBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(user)is able to Enable the permission Of Listen Audio and It Reflect on Supervisor Account.', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Listen Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyListenIconVisible();
    permission.clickListenIcon();
    permission.verifyPlayerModalVisible();
    permission.clickPlayerCloseIcon();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Enable the permission of Download Audio and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Download Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyListenIconVisible();
    permission.clickListenIcon();
    permission.verifyPlayerModalVisible();
    permission.verifyPlayerDownloadBtnVisible();
    permission.clickPlayerCloseIcon();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Disable the permission of Download Audio and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Download Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.chooseDateToFilter();
    permission.verifyListenIconVisible();
    permission.clickListenIcon();
    permission.verifyPlayerModalVisible();
    permission.verifyPlayerDownloadBtnNotExist();
    permission.clickPlayerCloseIcon();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(user)is able to Disable the permission Of Listen Audio and It Reflect on Supervisor Account.', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Listen Audio');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    permission.chooseDateToFilter();
    cy.wait(2000);
    permission.verifyListenIconNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is Enable the Permission of Manage Billing and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Manage Billing');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickProfileDropdown();
    permission.verifyBillingPageExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is Enable the Permission of Manage Billing and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Manage Billing');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickProfileDropdown();
    permission.verifyBillingPageNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('verify that Admin(User) is able to Enable View All Agents Tasks and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Agents Tasks');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickTasksIcon();
    cy.wait(2000);
    user.clickOnButton('Past');
    user.clickOnButton('Future');
    permission.verifyAllAssignedAgents(testData.AdminName);
    cy.wait(2000);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('verify that Admin(User) is able to Disable View All Agents Tasks and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Agents Tasks');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickTasksIcon();
    cy.wait(2000);
    user.clickOnButton('Past');
    user.clickOnButton('Future');
    permission.verifyAssignedAgentName(testData.supervisor);
    cy.wait(2000);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Enable the permission of View All Campaigns and It Reflects on Supervisor Account', () => {
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.getTotalCampaignCount();
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    cy.readFile('cypress/fixtures/testData.json').then((data) => {
      permission.verifyTotalCampaignCount(data.totalCampaignCount);
    });
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Enable Edit and Create Campaign and it Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Create & Edit Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyNewCampaignBtnVisible();
    permission.verifyCampaignEditIconVisible();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Enable the permission of Assign/Remove Agents and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Assign/Remove Agents');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.editCampaign();
    permission.selectAgentToAssign(testData.agent);
    user.clickOnButton('Save');
    permission.verifyToastMessage('Campaign Saved');
    permission.editCampaign();
    permission.removeAssignedAgent(testData.agent);
    user.clickOnButton('Save');
    permission.verifyToastMessage('Campaign Saved');
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Enable the permission of Pause/Activate Campaign and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Pause/Activate Campaign');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyActivePauseEnabled();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Disable the permission of Pause/Activate Campaign and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Pause/Activate Campaign');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyActivePauseDisabled();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Disable the permission of Assign/Remove Agents and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Assign/Remove Agents');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.editCampaign();
    permission.selectAgentToAssign(testData.agent);
    user.clickOnButton('Save');
    permission.verifyToastMessage(
      `You don't have sufficient rights to run this action!`
    );
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Disabled Edit and Create Campaign and it Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Create & Edit Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Campaigns');
    cy.wait(2000);
    permission.verifyNewCampaignBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User)is able to Disable the permission of View All Campaigns and It Reflects on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Campaigns');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.verifyCampaignMenuNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Enable the permission of Add User and it Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Add User');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.verifyUsersMenuExist();
    permission.clickOnMenu('Users');
    permission.verifyUserAddNewBtn();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Enable the permission of Edit User and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit User');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Users');
    permission.verifyUserEditBtnExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that user(Admin) is able to Enable permission for Delete User and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Delete User');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Users');
    permission.verifyUserDeleteBtnExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that user(Admin) is able to enable permission of Add User to the Group and It Reflect in Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Add User to the Group');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Users');
    permission.clickUserMenuBtn();
    permission.clickUserEditBtn();
    permission.verifyAddUserToGroupEnable();
    user.clickOnButton('CANCEL');
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that user(Admin) is able to Disable permission of Add User to the Group and It Reflect in Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Add User to the Group');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Users');
    permission.clickUserMenuBtn();
    permission.clickUserEditBtn();
    permission.verifyAddUserToGroupNotEnable();
    user.clickOnButton('CANCEL');
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that user(Admin) is able to Disable permission for Delete User and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Delete User');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Users');
    cy.wait(2000);
    permission.verifyUserDeleteBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Disable the permission of Edit User and It Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Edit User');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.clickOnMenu('Users');
    cy.wait(2000);
    permission.verifyUserEditBtnNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that Admin(User) is able to Disable the permission of Add User and it Reflect on Supervisor Account', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('Add User');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    cy.wait(1000);
    permission.verifyUsersMenuNotExist();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View All Reports then Agent user should able to View All Reports', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Reports');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    permission.clickOnMenu('Reports');
    cy.wait(2000);
    permission.verifySubMenuExist([
      'Live',
      'Recent Contacts',
      'Campaigns',
      'Agents',
      'Numbers',
      'Heat Map',
      'Floor Map',
    ]);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user enables the permission View Recent Contacts of All Agents then Agent user should able to View Recent Contacts of All Agents', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Recent Contacts of All Agents');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    cy.wait(2000);
    permission.verifyAgentsHeaderAvailable();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user disables the permission View Recent Contacts of All Agents then Agent user should able to View Recent Contacts of All Agents', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View Recent Contacts of All Agents');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    permission.clickOnMenu('Reports');
    permission.clickOnSubMenu('Recent Contacts');
    cy.wait(2000);
    permission.verifyAgentsHeaderNotAvailable();
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });

  it('Verify that when user Disable the permission View All Reports then Agent user should able to View All Reports', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.enablePermission('View All Reports');
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    permission.loginWithUser(testData.SupervisorEmail);
    permission.clickOnMenu('Recent Contacts');
    cy.wait(2000);
    permission.verifySubMenuNotExist([
      'Live',
      'Campaigns',
      'Agents',
      'Numbers',
      'Heat Map',
      'Floor Map',
    ]);
    permission.clickBackToAdminBtn();
    ignoreSpeedTestPopup();
  });
});

describe('User Permission Costumization Flow for Admin Role', () => {
  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
      [supervisorFirstName, supervisorLastName] = data.supervisor.split(' ');
      [agentFirstName, agentLastName] = data.agent.split(' ');
    });
    cy.visit('/', { failOnStatusCode: false });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  it('Should Login', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
  });

  it('Verify that user permission customization button is available in the Users page of the admin user', () => {
    user.clickingOnUserOption();
    permission.verifyUserPermissionBtnExist();
  });

  it('Verify the permissions Not applicable for Supervisor Roles for Custom permission', () => {
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.verifyNoAccessPermissions([
      'View/Export Contacts from assigned Campaigns',
      'Manage User Permissions',
    ]);
    user.clickOnButton('CANCEL');
  });

  it('Verify the permissions Not applicable for Agent Roles (Custom permission)', () => {
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.verifyNoAccessPermissions([
      'Manage Billing',
      'Assign/Remove Agents',
      'Add User',
      'Manage User Permissions',
      'Edit User',
      'Delete User',
      'Add User to the Group',
      'Remove User from the Group',
    ]);
    user.clickOnButton('CANCEL');
  });

  it('Verify the default permissions for users in Agent role', () => {
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.verifyDefaultPermissions([
      'View Contact Lists',
      'Edit Call Result & Note',
      'View/Export Recent Contacts',
      'Listen Audio',
      'Download Audio',
      'View All Campaigns',
    ]);
    user.clickOnButton('CANCEL');
  });

  it('Verify the default permissions for users in Supervisor role', () => {
    user.searchUser(testData.supervisor);
    cy.wait(4000);
    user.clickUserEditButton(supervisorFirstName, supervisorLastName);
    permission.clickUserPermissionExpander();
    permission.verifyDefaultPermissions([
      'View Contact Lists',
      'Edit Contact',
      'View/Export Recent Contacts',
      'Edit Call Result & Note',
      'Listen Audio',
      'Download Audio',
      'View All Campaigns',
      'View Recent Contacts of All Agents',
      'View All Reports',
      'View All Agents Tasks',
    ]);
    user.clickOnButton('CANCEL');
  });

  it('Verify that the number of Permissions given to a user is displayed in Edit User pop up', () => {
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.verifyUserPermissionCounterVisible();
    user.clickOnButton('CANCEL');
  });

  it('Verify that If users role is having Custom permission word Custom is added against the Role in Users page list view', () => {
    user.clickingOnUserOption();
    user.searchUser(testData.agent);
    cy.wait(4000);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.checkUncheckFirstPermission();
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
    user.searchUser(testData.agent);
    cy.wait(2000);
    permission.verifyAgentTitle(testData.agent);
    user.clickUserEditButton(agentFirstName, agentLastName);
    permission.clickUserPermissionExpander();
    permission.checkUncheckFirstPermission();
    user.clickOnButton('SAVE');
    permission.verifyToastMessage('Saved');
  });
});
