import promisify from 'cypress-promise';
import { ignoreSpeedTestPopup } from '../Utils';

const userMenu = 'a[title="Users"]';
const addNewUser = '//button[contains(text(),"ADD NEW")]';
const firstName = 'input[name="firstname"]';
const lastName = 'input[name="lastname"]';
const roleDropdown =
  '//label[contains(.,"Role")]/following-sibling::div[contains(@class,"ss-select")]';
const inputEmail = 'input[name="email"]';
const inputPassword = 'input[name="password"]';
const inputPhone = 'input[name="phone"]';
const saveButton = '//button[contains(text(),"SAVE")]';
const addedToast =
  '//div[@class="Toastify__toast-body"]//div[contains(text(),"Saved")]';
const deleteToast =
  '//div[@class="Toastify__toast-body"]//div[contains(text(),"User deleted")]';
const dropdownOptions = '.ss-select-group-items';
const searchBox = '.search_bg';
const rolesDropdown = "span[title='All Roles']";
const groupsDropdown = "span[title='All Groups']";
const AdminstratorRole = "//span[div[text()='Administrators']]";
const Adminstrator = '//div[@class="td"][text()="Administrator"]';
const Agent = '//div[@class="td"][text()="Agent"]';
const AgentStatuses = `//div[@class="users-narrow-header"]//span[text()='Agent Statuses']`;
const AssignToGroup = `//label[text()="User Group"]//following-sibling::div`;
const CancelButton = "//button[text()=' CANCEL']";
const cancelBtn = "//button[contains(text(),'CANCEL')]";
const SecondPhone = 'input[name=phone2]';
const userTableHeading = '.resizable-table-thead .tr .th';
const userEditButton = '//a[@class="dropdown-item"][text()="Edit"]';
const userDeleteButton = '//a[@class="dropdown-item"][text()="Delete"]';
const addAgentStatus = `//div[@class="users-narrow-header"][span[text()='Agent Statuses']]//img[contains(@src,"add")]`;
const agentStatusName = 'input.inline-input';
const agentStatusSaveBtn =
  '.align-items-baseline .align-items-center svg:nth-of-type(1)'; //'div[class*="inline-buttons"] svg:nth-of-type(1)'
const agentStatusCrossBtn =
  '.align-items-baseline .align-items-center svg:nth-of-type(2)';
const agentStatusRemoveBtn = (status) =>
  "//tr[td[input[@value='" + status + "']]]//img[contains(@src,'remove')]";
const agentGroupName = 'input.inline-input';
const agentGroupMenuBtn = (group) =>
  `//div[div[contains(@class,"user-editing")]//div[contains(@class,"inline-input-label")][text()="${group}"]]//div[@class="dropdown"]`;
const addAgentGroup =
  "//div[@class='users-narrow-header'][span[text()='User Groups']]//img[contains(@src,'add')]";
const addAgent = 'div.show a.dropdown-item';
const addSupervisor = 'a[data-key="supervisor"]';
const agentCount = '.usage-stats-counter strong';
const newUserWindow = '.modal-content';
const addAdmin = 'a[data-key="admin"]';
const changePresenceIcon =
  '//a[@class="dropdown-item"][text()="Change Status"]';
const userLogoutIcon = '//a[@class="dropdown-item"][text()="Force Logout"]';
const modalTitle = '.modal-content .modal-title';
const modal = '.modal-content';
const statusDropdown = '.modal-content .ss-select-control';
const statusOptions = '.ss-select-option span';
const toast = '.Toastify__toast-body';
const contactEditAccess = `input[name="contacteditaccess"] + span.checkmark`;
const userThreeDotMenu = (firstName, lastName) =>
  `//div[@class="tr"][div[@class="td"][text()="${firstName} ${lastName}"]]//div[@class="dropdown"]`;
const dropdownItems = '.show .dropdown-item';
const searchedUser = (fstName, lstName) =>
  `//div[@class="resizable-table-tbody"]//div[@class="tr"]//div[@class="td"][text()="${fstName} ${lstName}"]`;
const defaultAgentStatuses = (statusName) =>
  `//div[@class="users-narrow-body"]//div[contains(@class,"agent-editing")]//span[text()="${statusName}"]`;
const customAgentStatuses = (statusName) =>
  `//div[@class="users-narrow-body"]//div[contains(@class,"agent-editing")]//div[contains(@class,"inline-input-label")][text()="${statusName}"]`;
const agentStatusMenu = (statusName) =>
  `//div[div[contains(@class,"agent-editing")]//div[contains(@class,"inline-input-label")][text()="${statusName}"]]//div[@class="dropdown"]`;
const userGroupMenuBtn = (groupName) =>
  `//div[div[contains(@class,"user-editing")]//div[contains(@class,"inline-input-label")][text()="${groupName}"]]//div[@class="dropdown"]`;
const modalHeader = '.usergroup-delete-modal .modal-content .modal-header';
const agentStatusColorIcon = (statusName) =>
  `//div[contains(@class,"inline-input-label")][text()="${statusName}"]/preceding-sibling::span[@class="agent-status-circle"]`;
const colorPicker = '.users-narrow-color-wheel #colour-picker';
const agentNumberInGroup = (groupName, no) =>
  `//div[contains(@class,"user-editing")]//div[contains(@class,"inline-input-label")][text()="${groupName}"][strong[text()="${no}"]]`;
const userGroupDropdown = `//label[@class="form-label"][text()="User Group"]/following-sibling::div//div[contains(@class,"ss-select-control")]`;
const options = '.ss-select-option';
const userRoleDropdown = `//label[text()="User Role"]/following-sibling::div`;

export default class User {
  clickingOnUserOption() {
    cy.get(userMenu).click({ force: true });
  }

  clickAddNewUserButton() {
    cy.xpath(addNewUser).click();
  }

  chooseUserRole(role) {
    cy.xpath(userRoleDropdown).click();
    this.selectOption(role);
  }

  clickAddSupervisor() {
    cy.get(addSupervisor).click();
  }

  clickAddAdmin() {
    cy.get(addAdmin).click();
  }

  enterFirstName(fstName) {
    cy.get(firstName).type(fstName);
  }
  enterLastName(lstName) {
    cy.get(lastName).type(lstName);
  }
  selectROle(role) {
    cy.xpath(roleDropdown).click();
    // cy.xpath(
    //   '//div[@class="ss-select-dropdown"]//div[contains(text(),"' + role + '")]'
    // ).click();
    cy.get(dropdownOptions)
      .contains(role)
      .then((option) => {
        option[0].click();
      });
  }
  enterEmail(email) {
    cy.get(inputEmail).type(email);
  }
  enterPassword(pswd) {
    cy.get(inputPassword).type(pswd);
  }
  enterPhoneNumber(num) {
    cy.get(inputPhone).type(num);
  }
  clickSaveButton() {
    cy.xpath(saveButton).click();
  }
  verifySuccessToast() {
    cy.xpath(addedToast, { timeout: 5000 }).should('be.visible');
  }

  verifyAddedUser(fstaName, lstName) {
    cy.xpath(searchedUser(fstaName, lstName), { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible');
  }

  deleteAddedContact(fstaName, lstName) {
    cy.xpath(userThreeDotMenu(fstaName, lstName))
      .first()
      .scrollIntoView()
      .click();
    this.clickOnDropdownItem('Delete');
  }

  clickUserThreeDotMenu(firstName, lastName) {
    cy.xpath(userThreeDotMenu(firstName, lastName)).first().click();
  }

  clickOnDropdownItem(itemName) {
    cy.get(dropdownItems).then((items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.trim() === itemName) {
          cy.get(items[i]).click();
          break;
        }
      }
    });
  }

  handleWindowAlert(text) {
    cy.on('window:alert', (str) => {
      expect(str).to.equal(text);
    });
    cy.on('window:confirm', () => true);
  }

  verifyDeletedToast() {
    cy.xpath(deleteToast).should('be.visible');
  }

  verifySearchBox() {
    cy.get(searchBox).scrollIntoView().should('be.visible');
  }

  searchUser(user) {
    cy.get(searchBox).clear().type(user);
  }

  clearSearch() {
    cy.get(searchBox).clear();
  }

  verifyRoleDropdown() {
    cy.get(rolesDropdown).should('be.visible');
  }

  verifyGroupsDropdown() {
    cy.get(groupsDropdown).should('be.visible');
  }

  clickRoleDropdown() {
    this.clearSearch();
    cy.get(rolesDropdown).click();
  }

  clickAdminstratorRole(role) {
    cy.get(dropdownOptions)
      .contains(role)
      .then((option) => {
        option[0].click();
      });

    cy.xpath(Adminstrator).should('be.visible');
    cy.xpath(Agent).should('not.exist');
  }

  verifySearchedUser(user) {
    const [firstName, lastName] = user.split(' ');
    cy.xpath(searchedUser(firstName, lastName), {
      timeout: 15000,
    }).should('be.visible');
  }

  verifyAgentStatusesHeading() {
    cy.xpath(AgentStatuses).should('be.visible');
  }

  clickAgentStatusHeading() {
    cy.xpath(AgentStatuses).scrollIntoView().click();
  }

  verifyAgentStatusesType(statuses) {
    for (let i = 0; i < statuses.length; i++) {
      cy.xpath(defaultAgentStatuses(statuses[i]))
        .scrollIntoView()
        .should('be.visible');
    }
  }

  verifyFirstName() {
    cy.get(firstName).should('be.visible');
  }

  verifyLastName() {
    cy.get(lastName).should('be.visible');
  }

  verifyRoleDropdownNewUser() {
    cy.xpath(roleDropdown).should('be.visible');
  }

  clickCancelBtn() {
    cy.xpath(cancelBtn).click();
  }

  verifyEmailField() {
    cy.get(inputEmail).should('be.visible');
  }

  verifyPasswordField() {
    cy.get(inputPassword).should('be.visible');
  }

  verifyPhoneNumber() {
    cy.get(inputPhone).should('be.visible');
  }

  verifyAssignToGroup() {
    cy.xpath(AssignToGroup).should('be.visible');
  }

  verifyCancelButton() {
    cy.xpath(CancelButton).should('be.visible');
  }

  clickCancelButton() {
    cy.xpath(CancelButton).click();
  }

  verifySaveButton() {
    cy.xpath(saveButton).should('be.visible');
  }

  verifySecondPhoneField() {
    cy.get(SecondPhone).should('be.visible');
  }

  verifyAddNewUserButton() {
    cy.xpath(addNewUser).should('be.visible');
  }

  verifyUserTableHeadings(heading) {
    for (let i = 0; i < heading.length; i++) {
      cy.get(userTableHeading).should('contain.text', heading[i]);
    }
  }

  verifyUserEditButton() {
    cy.reload();
    ignoreSpeedTestPopup();
    cy.get('.resizable-table-tbody .dropdown').first().click();
    cy.xpath(userEditButton).should('be.visible');
  }

  verifyUserDeleteButton() {
    cy.xpath(userDeleteButton).should('be.visible');
  }

  clickAddAgentStatus() {
    cy.xpath(addAgentStatus, { timeout: 5000 }).click();
  }

  enterAgentStatusName(name) {
    cy.get(agentStatusName).type(name);
  }

  clickOnAgentStatusSaveBtn() {
    cy.get(agentStatusSaveBtn).click();
  }

  verifyAddedAgentStatus(name) {
    cy.xpath(customAgentStatuses(name)).scrollIntoView().should('be.visible');
  }

  clickOnAgentStatusMenu(name) {
    cy.xpath(agentStatusMenu(name), { timeout: 5000 }).scrollIntoView().click();
  }

  verifyAgentStatusActionMenuNotExist(statusName) {
    for (let i = 0; i < statusName.length; i++) {
      cy.xpath(agentStatusMenu(statusName[i])).should('not.exist');
    }
  }

  verifyAgentStatusNameField() {
    cy.get(agentStatusName).should('be.visible');
  }

  clickModalHeader() {
    cy.get(modalHeader).scrollIntoView().click();
  }

  verifyColorPickerNotVisible() {
    cy.get(colorPicker).should('not.exist');
  }

  verifyAgentStatusSaveBtn() {
    cy.get(agentStatusSaveBtn).should('be.visible');
  }

  verifyAgentStatusCrossBtn() {
    cy.get(agentStatusCrossBtn).should('be.visible');
  }

  clickAgentStatusDeleteMenu(name) {
    this.clickOnAgentStatusMenu(name);
    this.clickOnDropdownItem('Delete');
  }

  enterNameMoreThan15Char(char) {
    let nameChar = '';
    for (let i = 0; i < 16; i++) {
      nameChar = char + nameChar;
    }
    cy.get(agentStatusName).type(nameChar);
  }

  verifyMaxChar() {
    cy.get(agentStatusName).then((statusName) => {
      expect(statusName.attr('value').length).to.equal(15);
    });
  }

  verifyAgentStatusActionMenu(actionName) {
    for (let i = 0; i < actionName.length; i++) {
      cy.get(dropdownItems).then((actions) => {
        expect(actions.text()).to.contains(actionName[i]);
      });
    }
  }

  clickAgentStatusCrossBtn() {
    cy.get(agentStatusCrossBtn).click();
  }

  clickUserGroupCrossBtn() {
    cy.get(agentStatusCrossBtn).click();
  }

  clickUserGroupMenuBtn(groupName) {
    cy.xpath(userGroupMenuBtn(groupName)).click();
  }

  verifyRemovedAgentStatus(name) {
    cy.xpath(customAgentStatuses(name)).should('not.exist');
  }

  enterAgentGroupName(name) {
    cy.get(agentGroupName).type(name);
  }

  clickOnAgentGroupSaveBtn() {
    cy.get(agentStatusSaveBtn).click();
  }

  verifyAddedAgentGroup(group) {
    cy.xpath(agentGroupMenuBtn(group)).should('be.visible');
  }

  removeAddedAgentGroup(group) {
    cy.xpath(agentGroupMenuBtn(group)).click();
    this.clickOnDropdownItem('Delete');
    this.clickOnButton('Delete');
  }

  verifyRemovedAgentGroup(group) {
    cy.xpath(agentGroupMenuBtn(group)).should('not.exist');
  }

  clickAddAgentGroup() {
    cy.xpath(addAgentGroup).click();
  }

  async getTotalAgentCount() {
    return await promisify(
      cy.get(agentCount).then((count) => {
        return count.text();
      })
    );
  }

  verifyAgentCount(count) {
    cy.get(agentCount).then((newcount) => {
      const newcount1 = newcount.text();
      expect(parseInt(newcount1)).to.equal(parseInt(count) + 1);
    });
  }

  verifyFieldValidation(ele) {
    for (let i = 0; i < ele.length; i++) {
      cy.get(newUserWindow).should('contain.text', ele[i]);
    }
  }

  getPhoneNumber() {
    cy.get('a[title="Phone System"]').click({ force: true });
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find('.dispositions.table tbody tr td').length > 1) {
        cy.xpath(
          '(//td[span[contains(@class,"reputation")]]/preceding-sibling::td[1])[1]'
        ).then((el) => {
          const number = el.text().trim();
          cy.readFile('cypress/fixtures/constants.json', (err, data) => {
            if (err) {
              return console.error(err);
            }
          }).then((data) => {
            data.Number = number;
            cy.writeFile(
              'cypress/fixtures/constants.json',
              JSON.stringify(data)
            );
          });
        });
      }
    });
  }

  clickChangePresenceIcon() {
    cy.xpath(changePresenceIcon).click();
  }

  verifyChangePresenceVisible(firstName, lastName) {
    cy.xpath(userThreeDotMenu(firstName, lastName)).first().click();
    cy.xpath(changePresenceIcon).should('be.visible');
  }

  clickUserLogoutIcon(firstName, lastName) {
    cy.xpath(userThreeDotMenu(firstName, lastName)).first().click();
    cy.xpath(userLogoutIcon).click();
  }

  verifyUserLogoutIconVisible() {
    cy.xpath(userLogoutIcon).should('be.visible');
  }

  verifyDialogOpen() {
    cy.get(modal).should('be.visible');
  }

  verifyModalTitle(title) {
    cy.get(modalTitle).should('have.text', title);
  }

  verifyModalHeader(title) {
    cy.get(modalHeader).should('have.text', title);
  }

  clickStatusDropdown() {
    cy.get(statusDropdown).click();
  }

  selectStatusOption(option) {
    cy.get(statusOptions).then((Opt) => {
      for (let i = 0; i < Opt.length; i++) {
        if (Opt[i].textContent.trim() === option) {
          cy.get(Opt[i]).click();
          break;
        }
      }
    });
  }

  verifyToastMessage(message) {
    cy.get(toast).should('contain.text', message);
  }

  clickOnButton(btnName) {
    cy.get('button').then((button) => {
      for (let i = 0; i < button.length; i++) {
        if (button[i].textContent.trim() === btnName) {
          cy.get(button[i]).click();
          break;
        }
      }
    });
  }

  clickAgentContactEditAccess() {
    cy.get(contactEditAccess).click();
  }

  clickUserEditButton(userFirstName, userLastName) {
    cy.xpath(userThreeDotMenu(userFirstName, userLastName))
      .scrollIntoView()
      .click();
    this.clickOnDropdownItem('Edit');
  }

  clickAgentStatusColorIcon(statusName) {
    cy.xpath(agentStatusColorIcon(statusName)).click();
  }

  verifyColorPickerVisible() {
    cy.get(colorPicker).should('be.visible');
  }

  verifyGroupWithAgentNumber(groupName, num) {
    cy.xpath(agentNumberInGroup(groupName, num))
      .scrollIntoView()
      .should('be.visible');
  }

  clickUserGroupDropdown() {
    cy.xpath(userGroupDropdown).click();
  }

  selectOption(optionName) {
    cy.get(options).then((Opts) => {
      for (let i = 0; i < Opts.length; i++) {
        if (Opts[i].textContent.trim() === optionName) {
          cy.get(Opts[i]).click();
          break;
        }
      }
    });
  }
}
