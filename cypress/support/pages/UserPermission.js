const userPermissionExpander = '.user-permissions-expander';
const permissions = '.user-permissions';
const checkPermission = (permissionName) =>
  `//div[@class="user-permission-col"][text()="${permissionName}"]//div[contains(@class,"user-permission-checkbox-wrapper")]`;
const menu = (menuName) => `a[title="${menuName}"] svg`;
const toast = '.Toastify__toast-body';
const contactsPage = '.right_cntnt .search_bar';
const userTreeDropdown = '.dropdown-usertree';
const userTreeExpander = '.group-client img[alt="Expander"]';
const userRoleEmail = '.group-row-role .group-row-role__left__email';
const backToAdmin = '.user__dropdown-logout';
const contactEditBtn = '.contact__custom-input__edit';
const contactName = '.contacts__name';
const datePickerDropdown = '.date-picker';
const timeSpans = '.dropdown-menu.show .links button';
const callResultEditBtn = '.reports-calls-buttons svg.fa-pencil-alt';
const callDispositionModal = '.call-disposition-modal';
const recentContactsExportBtn = '.reportCdrs__button';
const dncPage = '.dnc.card';
const fileDownloadBtn = '.resizable-table-tbody .tr .td img[src*="csv"]';
const subMenu = (subMenuName) => `.subitem a[title="${subMenuName}"]`;
const contactImportBtn = '//button[text()="IMPORT CONTACTS"]';
const listenIcon = '.reports-calls-buttons img[alt="Listen"]';
const playerModal = '.contacts-player';
const playerCloseIcon = '.contacts-player .fa-times';
const playerDownloadBtn = '.contacts-player__download';
const profileDowndown = '.profile_drop';
const dropdownItem = '.dropdown-item';
const tasksIcon = '.nav-item a[href*="tasks"]';
const assignedAgent = '.datefield + td .overflowed__td';
const userCampaignCount = '.pager-total-items strong';
const noOfCampaigns = '.resizable-table .resizable-table-tbody .tr';
const dropdown = '.ss-select-value-label';
const dropdownOptions = '.ss-select-option';
const campaignEditIcon = '.dropdown img[src*="edit"]';
const noAccessPermission = (permissionName) =>
  `//div[@class="user-permission-col"][text()="${permissionName}"]//div[contains(@class,"user-permission-checkbox-wrapper")]//img[@alt="No Access"]`;
const activePausedisabled = '.progress-status[style="cursor: not-allowed;"]';
const activePauseEnabled =
  '.progress-status:not([style="cursor: not-allowed;"])';
const tableHeader = '.resizable-table-thead .th';
const profileDropdownItem = '.show .dropdown-item .user__dropdown';
const totalCampaignCount = '.pager-total-items strong';
const campaignName = '.campaign-name-table';
const assignAgentDropdown =
  '//div[h2[text()="Agents"]]//div[contains(@class,"ss-select-control")]';
const removeAgentBtn = (agentName) =>
  `.ss-select-value-label[title="${agentName}"] + .ss-select-value-delete`;
const userAddNewBtn = '//button[text()="ADD NEW"]';
const userMenuBtn = '.dropdown img[src*="edit"]';
const userEditBtn = '//a[@class="dropdown-item"][text()="Edit"]';
const userDeleteBtn = '//a[@class="dropdown-item"][text()="Delete"]';
const userGroupDropdown = `//label[text()="User Group"]/following-sibling::div[contains(@class,"ss-select")]`;
const agentUserMenuBtn =
  '//div[contains(text(),"Agent")]/parent::div//div[@class="dropdown"]';
const userPermissionBtn = '//button[text()="User Permissions"]';
const enabledPermissions = (permissionName) =>
  `//div[@class="user-permission-col"][text()="${permissionName}"][div[contains(@class,"user-permission-checkbox-wrapper")]//img[@alt="Enabled"]]`;
const permissionCounter = '.user-permissions-counter';
const firstPermission = '.user-permission-checkbox';
const agentTitle = (agentName) =>
  `//div[@class="tr"][div[text()="${agentName}"]]`;
const enabledPermission = '.user-permission-checkbox[alt="Enabled"]';
const enablePermission = (permit) => `//div[@class="user-permission-col"][text()="${permit}"] //img[@alt="Enabled"]`;
const permissionCheckbox = (index) => `.user-permissions div:nth-child(${index}) img[alt="Enabled"]`;

const permit = ['Upload Contacts Lists','View Recent Contacts of All Agents'];
const index = [9,25] ;

export default class UserPermission {
  clickUserPermissionExpander() {
    cy.get(userPermissionExpander).click();
  }

  verifyUserPermissionsVisible() {
    cy.get(permissions)
    .parent()
    .scrollIntoView()
    .should('be.visible');
  }

  enablePermission(permissionName) {
    cy.xpath(`//div[@class="user-permission-col"][text()="${permissionName}"]`).within(($ele) => { 
      if($ele.find('[alt="Disabled"]').length) {
        cy.xpath(checkPermission(permissionName)).click();
      }
    })
  }

  disablePermission(permissionName) {
    cy.xpath(`//div[@class="user-permission-col"][text()="${permissionName}"]`).within(($ele) => { 
      if($ele.find('[alt="Enabled"]').length) {
        cy.xpath(checkPermission(permissionName)).click();
      }
    })
  }

  verifyPhoneSystemMenu() {
    cy.get(menu('Phone System')).should('be.visible');
  }

  verifyPhoneSystemMenuNotExist() {
    cy.get(menu('Phone System')).should('not.exist');
  }

  verifyToastMessage(message) {
    cy.get(toast,{timeout:60000}).should('contain.text', message);
    cy.wait(1000);
  }

  clickOnMenu(menuName) {
    cy.get(menu(menuName),{timeout:60000}).click({force:true});
  }

  verifyContactsPage() {
    cy.get(contactsPage).should('be.visible');
  }

  clickUserTreeDropdown() {
    cy.get(userTreeDropdown).click();
  }

  clickUserTreeExpander() {
    cy.get(userTreeExpander).click({force:true});
  }

  clickUserRoleEmail(email) {
    cy.get(userRoleEmail).contains(email).click();
  }

  loginWithUser(userEmail) {
    this.clickProfileDropdown();
    this.clickOnDropdownItem('Switch Account');
    this.clickUserTreeExpander();
    this.clickUserRoleEmail(userEmail);
  }

  clickBackToAdminBtn() {
    this.clickProfileDropdown();
    cy.get(backToAdmin).click({force:true});
  }

  verifyContactEditBtn() {
    cy.get(contactEditBtn).should('be.visible');
  }

  clickContactName() {
    cy.get(contactName,{timeout:60000}).first().click();
  }

  verifyContactEditBtnNotExist() {
    cy.get(contactEditBtn).should('not.exist');
  }

  chooseDateToFilter() {
    cy.get(datePickerDropdown).click();
    cy.get(timeSpans).contains('Last 12 Months').click();
    cy.get('body').then((body) => {
      if (body.find(timeSpans).length) {
        cy.get(datePickerDropdown).click();
      }
    });
  }

  clickCallResultEditBtn() {
    cy.get(callResultEditBtn).first().click({force:true});
  }

  verifyCallDispositionModal() {
    cy.get(callDispositionModal).should('be.visible');
  }

  verifyCallResultBtnNotExist() {
    cy.get(callResultEditBtn).should('not.exist');
  }

  verifyRecentContactsExportBtnExist() {
    cy.get(recentContactsExportBtn).should('be.visible');
  }

  verifyRecentContactsExportBtnNotExist() {
    cy.get(recentContactsExportBtn).should('not.exist');
  }

  verifyDncPageVisible() {
    cy.get(dncPage).should('be.visible');
  }

  verifyFileDownloadBtnVisible() {
    cy.get(fileDownloadBtn).should('be.visible');
  }

  verifyFileDownloadBtnNotExist() {
    cy.get(fileDownloadBtn).should('not.exist');
  }

  clickOnSubMenu(subMenuName) {
    cy.get(subMenu(subMenuName)).click();
  }

  verifyContactsImportBtnVisible() {
    cy.xpath(contactImportBtn).should('be.visible');
  }

  verifyContactsImportBtnNotExist() {
    cy.xpath(contactImportBtn).should('not.exist');
  }

  verifyListenIconVisible() {
    cy.get(listenIcon).should('be.visible');
  }

  verifyListenIconNotExist() {
    cy.get(listenIcon).should('not.exist');
  }

  clickListenIcon() {
    cy.get(listenIcon).first().click();
  }

  verifyPlayerModalVisible() {
    cy.get(playerModal).should('be.visible'); 
  }

  clickPlayerCloseIcon() {
    cy.get(playerCloseIcon).click();
  }

  verifyPlayerDownloadBtnVisible() {
    cy.get(playerDownloadBtn).should('be.visible');
  }

  verifyPlayerDownloadBtnNotExist() {
    cy.get(playerDownloadBtn).should('not.exist');
  }

  clickProfileDropdown() {
    cy.get(profileDowndown).click();
  }

  clickOnDropdownItem(itemName) {
    cy.get(dropdownItem).then((items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.trim() === itemName) {
          cy.get(items[i]).click({force:true});
          break;
        }
      }
    });
  }

  clickTasksIcon() {
    cy.get(tasksIcon).click();
  }

  verifyAssignedAgentName(name) {
    cy.get(assignedAgent).then((agents) => {
      for (let i = 0; i < agents.length; i++) {
        expect(agents[i].textContent.trim()).to.equal(name);
      }
    });
  }

  verifyAllAssignedAgents(name) {
    cy.get(assignedAgent).should('contain.text', name);
  }

  getUserCampaignCount(user) {
    cy.get(dropdown).contains('Agent').click();
    cy.get(dropdownOptions).contains(user).click();
    cy.wait(2000);
    cy.get(userCampaignCount).then((count) => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.campaignCount = count.text();
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  verifyAllCampaignsAccess(count) {
    cy.get(noOfCampaigns).then((no) => {
      expect(no.length).to.greaterThan(parseInt(count));
    });
  }

  verifyAllCampaignDenial(count) {
    cy.get(noOfCampaigns).then((no) => {
      expect(no.length).to.equal(parseInt(count));
    });
  }

  verifyNewCampaignBtnVisible() {
    cy.get('button').contains('NEW CAMPAIGN').should('be.visible');
  }

  verifyNewCampaignBtnNotExist() {
    cy.get('button').contains('NEW CAMPAIGN').should('not.exist');
  }

  verifyCampaignEditIconVisible() {
    cy.get(campaignEditIcon).first().click();
    cy.get('.custom_drop_menu2').should('contain.text','Edit')
  }

  verifyCampaignEditIconNotExist() {
    cy.get(campaignEditIcon).first().click();
    cy.get('.custom_drop_menu2').should('not.contain.text','Edit');
  }

  verifyNoAccessPermissions(permissions) {
    for (let i = 0; i < permissions.length; i++) {
      cy.xpath(noAccessPermission(permissions[i]))
        .scrollIntoView()
        .should('be.visible');
    }
  }

  verifyActivePauseDisabled() {
    cy.get(activePausedisabled).should('be.visible');
  }

  verifyActivePauseEnabled() {
    cy.get(activePauseEnabled).should('be.visible');
  }

  verifySubMenuExist(subMenuName) {
    for (let i = 0; i < subMenuName.length; i++) {
      cy.get(subMenu(subMenuName[i])).should('exist');
    }
  }

  verifySubMenuNotExist(subMenuName) {
    for (let i = 0; i < subMenuName.length; i++) {
      cy.get(subMenu(subMenuName[i])).should('not.exist');
    }
  }

  verifyAgentsHeaderAvailable() {
    cy.get(tableHeader).should('contain.text', 'Agent');
  }

  verifyAgentsHeaderNotAvailable() {
    cy.get(tableHeader).should('not.contain.text', 'Agent');
  }

  verifyBillingPageExist() {
    cy.get(profileDropdownItem).contains('Billing').should('be.visible');
  }

  verifyBillingPageNotExist() {
    cy.get(profileDropdownItem).contains('Billing').should('not.exist');
  }

  getTotalCampaignCount() {
    cy.get(totalCampaignCount).then((count) => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.totalCampaignCount = count.text();
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  verifyTotalCampaignCount(campaignCount) {
    cy.get(totalCampaignCount).should('have.text', campaignCount);
  }

  verifyCampaignMenuNotExist() {
    cy.get(menu('Campaigns')).should('not.exist');
  }

  editCampaign() {
    cy.get(campaignName).first().click();
  }

  selectAgentToAssign(agentName) {
    cy.xpath(assignAgentDropdown).click();
    this.chooseOption(agentName);
  }

  chooseOption(optionName) {
    cy.get(dropdownOptions).then((options) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i].textContent.trim() === optionName) {
          cy.get(options[i]).click();
          break;
        }
      }
    });
  }

  removeAssignedAgent(agentName) {
    cy.get(removeAgentBtn(agentName)).click();
  }

  verifyUsersMenuExist() {
    cy.get(menu('Users')).should('be.visible');
  }

  verifyUsersMenuNotExist() {
    cy.get(menu('Users')).should('not.exist');
  }

  verifyUserAddNewBtn() {
    cy.xpath(userAddNewBtn).should('be.visible');
  }

  verifyUserEditBtnExist() {
    cy.get(userMenuBtn).first().click();
    cy.xpath(userEditBtn).should('be.visible');
  }

  verifyUserEditBtnNotExist() {
    cy.get(userMenuBtn).first().click()
    cy.xpath(userEditBtn).should('not.exist');
  }

  clickUserMenuBtn() {
    cy.xpath(agentUserMenuBtn).first().click();
  }

  clickUserEditBtn() {
    cy.xpath(userEditBtn).click();
  }

  verifyUserDeleteBtnExist() {
    cy.get(userMenuBtn).first().click();
    cy.xpath(userDeleteBtn).should('be.visible');
  }

  verifyUserDeleteBtnNotExist() {
    cy.get(userMenuBtn).first().click();
    cy.xpath(userDeleteBtn).should('not.exist');
  }

  verifyAddUserToGroupEnable() {
    cy.xpath(userGroupDropdown).should('not.have.attr', 'readonly');
  }

  verifyAddUserToGroupNotEnable() {
    cy.xpath(userGroupDropdown).should('have.attr', 'readonly');
  }

  verifyUserPermissionBtnExist() {
    cy.xpath(userPermissionBtn).should('be.visible');
  }

  clickUserPermissionBtnExist() {
    cy.xpath(userPermissionBtn).click();
  }

  verifyDefaultPermissions(permissions) {
    for (let i = 0; i < permissions.length; i++) {
      cy.xpath(enabledPermissions(permissions[i]))
        .scrollIntoView()
        .should('be.visible');
    }
  }

  verifyUserPermissionCounterVisible() {
    cy.get(permissionCounter).should('be.visible');
  }

  checkUncheckFirstPermission() {
    cy.get(firstPermission).first().click();
  }

  verifyAgentTitle(agentName) {
    cy.xpath(agentTitle(agentName)).should('contain.text', 'Agent (Custom)');
  }

  disableDefaultPermission() {
    
    cy.contains(permit[1]).scrollIntoView();
    cy.get('body').then((body) => {
      for (let i = 0; i < permit.length; i++) {
        if(body.find(permissionCheckbox(index[i])).length) {
          cy.xpath(enablePermission(permit[i])).should('be.visible').click();  
        } 
      }

      if (body.find(enabledPermission).length) {
        cy.get(enabledPermission).then((el) => {
          for (let i = 0; i < el.length; i++) {
            cy.get(el[i]).scrollIntoView().click({ force: true });
            cy.wait(500);
          }
        });
      }
    });
  }

  verifyReportsMenuNotExist() {
    cy.get(menu('Reports')).should('not.exist');
  }

  verifyPermissionDisabled(permission) {
    cy.xpath(enablePermission(permission)).should('not.exist');
  }

  verifyPermissionEnabled(permission) {
    cy.xpath(enablePermission(permission)).should('exist');
  }
  
}
