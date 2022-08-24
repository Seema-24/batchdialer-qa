import { handlePoorConnectionPopup } from '../Utils';
import Campaign from './Campaigns';
import Contacts from './Contacts';
import Dashboard from './Dashboard';
import PhoneNum from './PhoneNum';
import User from './User';

const dropdownOptions = '.ss-select-group-items .ss-select-option';
const agentsDrpdwn =
  '//div[contains(@class,"ss-select-control")]/span[contains(text(),"Agents")]';
const radioBtn = (mode) =>
  "//label[input[@type='radio']][contains(.,'" +
  mode +
  "')]//span[@class='checkmark']";
const userEditBtn = (firstName, lastName) =>
  `//div[@class="tr"][div[@class="td"][text()="${firstName} ${lastName}"]]//div[@class="dropdown"]`;
const emailField = 'input[name="email"]';
const cancelBtn = '//button[contains(text(),"CANCEL")]';
const passwordChangeBtn = '.changebt';
const passwordField = 'input[name="password"]';
const saveBtn = '//button[contains(text(),"SAVE")]';
const listSaveBtn =
  '//div[@class="modal-dialog"]//button[contains(text(),"SAVE")]';
const addNewbTN = '//button[contains(text(),"ADD NEW")]';
const nameField = 'input[name="name"]';
const phoneEditButton = (number) =>
  `//div[@class="tr"][div[@class="td"][text()="${number}"]]//div[@class="dropdown"]`;
const numberGroupDropdown = `//div[label[text()="Number Group"]]/following-sibling::div//div[contains(@class,"ss-select-control")]`;
const options = '.ss-select-option';
const destinationDropdown = `//div[label[text()="Destination"]]/following-sibling::div[1]//div[contains(@class,"ss-select-control")]`;
const assignDropdown = `//div[label[text()="Destination"]]/following-sibling::div[2]//div[contains(@class,"ss-select-control")]`;
const dropdownItems = '.show .dropdown-item';
const userPermissionExpander = '.user-permissions-expander';
const disabledPermissions = '.user-permission-checkbox[alt="Disabled"]';
const enabledPermissions = '.user-permission-checkbox[alt="Enabled"]';
const permissionHeading = '.user-permission-col';
const enablePermission = (permit) => `//div[@class="user-permission-col" ][text()="${permit}"] //img[@alt="Enabled"]`;
const permissionCheckbox = (index) => `.user-permissions div:nth-child(${index}) img[alt="Enabled"]`;

const dashboard = new Dashboard();
const campaign = new Campaign();
const phone = new PhoneNum();
const user = new User();
const contact = new Contacts();
const permit = ['Upload Contacts Lists','View Recent Contacts of All Agents'];
const index = [9,25] ;

export default class Setup {
  clickCampaignMenu() {
    campaign.clickCampaignMenu();
  }

  BuyNewPhoneNumber(agent) {
    this.clickCampaignMenu();
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find('.alert-warning').length) {
        cy.get('.alert-warning').should('be.visible');
        phone.clickPhoneNumberMenu();
        phone.clickBuyDidButton();
        phone.selectStateModeOption('Colorado');
        phone.clickSearchButton();
        phone.verifysearchStartedToast();
        phone.selectPhoneNumber();
        phone.assignAgentUser(agent);
        phone.getFirstPhoneNumber();
        phone.clickOrderNowButton();
        phone.closingDialog();
      }
    });
  }

  getFirstPhoneNumber() {
    cy.get('.number', { timeout: 30000 })
      .first({ timeout: 30000 })
      .then((el) => {
        cy.readFile('cypress/fixtures/testData.json', (err, data) => {
          if (err) {
            return console.error(err);
          }
        }).then((data) => {
          data.BuyNumber = el.text().trim();
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      });
  }

  getPhoneNumber() {
    cy.get('a[title="Phone System"]').click({ force: true });
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find('.dids-twopane .resizable-table-tbody .tr').length) {
        cy.xpath(
          '(//div[@class="resizable-table-tbody"]//div[@class="tr"]//div[@class="td"][3])[1]'
        ).then((el) => {
          const number = el.text().trim();
          cy.readFile('cypress/fixtures/testData.json', (err, data) => {
            if (err) {
              return console.error(err);
            }
          }).then((data) => {
            data.Number = number;
            cy.writeFile(
              'cypress/fixtures/testData.json',
              JSON.stringify(data)
            );
          });
        });
      }
    });
  }

  createCampaign(name, callResults, phone, agentName) {
    cy.wait(2000);
    this.clickCampaignMenu();
    cy.get('.resizable-table-tbody').then((table) => {
      if (table.find('.resizable-table-nodata').length) {
        this.createNewCampaign(name, callResults, phone, agentName);
      } else {
        cy.xpath(
          '//div[@class="resizable-table-tbody"]//div[@class="td"]//span[contains(@class,"campaign-name-table")]'
        ).then((el) => {
          if (el.text().trim().includes(name)) {
            cy.log('Campaign already exist');
          } else {
            this.createNewCampaign(name, callResults, phone, agentName);
          }
        });
      }
    });
  }

  createNewCampaign(name, callResults, phone, agentName) {
    campaign.clickAddNewCampaign();
    //campaign.enableAdvancedSwitchBar();
    //cy.wait(2000);
    campaign.selectDialingModeOption('Predictive Dialer');
    // campaign.clickNextCircleArrow();
    // campaign.selectCallResultsOption(callResults);
    // campaign.clickNextCircleArrow();
    this.selectAgentsDrpdwn(agentName);
    campaign.selectCallerId(phone);
    campaign.enterName(name);
    campaign.clickCreateCampButton();
  }

  selectAgentsDrpdwn(name) {
    //cy.xpath(radioBtn(agentMode)).click();
    cy.xpath(agentsDrpdwn).click();
    cy.get(dropdownOptions).then((agent) => {
      for (let i = 0; i < name.length; i++) {
        for (let j = 0; j < agent.length; j++) {
          if (agent[j].textContent.trim() === name[i]) {
            agent[j].click({force:true});
            break;
          }
        }
      }
    });
  }

  getAdminName() {
    user.clickingOnUserOption();
    cy.xpath(
      '//div[@class="tr"]//div[@class="td"][text()="Administrator"]/preceding-sibling::div/div[not(@class="users-no-calling-permissions")][not(contains(@class,"mic"))][not(contains(@class,"mos"))]/parent::div[@class="td"]/following-sibling::div[1]'
    ).then((el) => {
      const adminName = el[0].textContent.trim();
      cy.readFile('cypress/fixtures/testData.json', (err, data) => {
        if (err) {
          return console.error(err);
        }
      }).then((data) => {
        data.AdminName = adminName;
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  addNewAgent(firstName, lastName, email, password, phone) {
    user.clickingOnUserOption();
    cy.wait(3000);
    cy.get('.table-responsive .resizable-table-tbody .tr').then((el) => {
      cy.log(el.text().trim());
      if (
        el
          .text()
          .trim()
          .includes(firstName + ' ' + lastName)
      ) {
        cy.log('Agent already exist');
        handlePoorConnectionPopup();
        cy.xpath(userEditBtn(firstName, lastName)).click();
        this.clickDropdownItem('Edit');
        cy.get(emailField).then((el) => {
          const value = el.val();
          cy.readFile('cypress/fixtures/testData.json', (err, data) => {
            if (err) {
              return console.error(err);
            }
          }).then((data) => {
            data.AgentEmail = value;
            cy.writeFile(
              'cypress/fixtures/testData.json',
              JSON.stringify(data)
            );
          });
        });
        cy.get(passwordChangeBtn).click();
        cy.get(passwordField).type(password);
        this.clickUserPermissionExpander();
        this.enableAgentDefaultPermissions();
        cy.xpath(saveBtn).click({force:true});
      } else {
        user.clickAddNewUserButton();
        // user.clickAddAgent();
        user.enterFirstName(firstName);
        user.enterLastName(lastName);
        user.enterEmail(email);
        user.enterPassword(password);
        user.enterPhoneNumber(phone);
        this.clickUserPermissionExpander();
        this.enableAgentDefaultPermissions();
        user.clickSaveButton();
        user.verifySuccessToast();
        cy.readFile('cypress/fixtures/testData.json', (err, data) => {
          if (err) {
            return console.error(err);
          }
        }).then((data) => {
          data.AgentEmail = email;
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      }
    });
  }

  addNewSupervisor(firstName, lastName, email, password, phone) {
    cy.wait(1000);
    user.clickingOnUserOption();
    cy.wait(3000);
    cy.get('.table-responsive .resizable-table-tbody .tr').then((el) => {
      if (
        el
          .text()
          .trim()
          .includes(firstName + ' ' + lastName)
      ) {
        cy.log('Supervisor already exist');
        handlePoorConnectionPopup();
        cy.xpath(userEditBtn(firstName, lastName)).click();
        this.clickDropdownItem('Edit');
        cy.get(emailField).then((el) => {
          const value = el.val();
          cy.readFile('cypress/fixtures/testData.json', (err, data) => {
            if (err) {
              return console.error(err);
            }
          }).then((data) => {
            data.SupervisorEmail = value;
            cy.writeFile(
              'cypress/fixtures/testData.json',
              JSON.stringify(data)
            );
          });
        });
        cy.get(passwordChangeBtn).click();
        cy.get(passwordField).type(password);
        this.clickUserPermissionExpander();
        this.enableSupervisorDefaultPermissions();
        cy.xpath(saveBtn).click({force:true});
      } else {
        user.clickAddNewUserButton();
        user.chooseUserRole('Supervisor');
        user.enterFirstName(firstName);
        user.enterLastName(lastName);
        user.enterEmail(email);
        user.enterPassword(password);
        user.enterPhoneNumber(phone);
        this.clickUserPermissionExpander();
        this.enableSupervisorDefaultPermissions();
        user.clickSaveButton();
        user.verifySuccessToast();
        cy.readFile('cypress/fixtures/testData.json', (err, data) => {
          if (err) {
            return console.error(err);
          }
        }).then((data) => {
          data.SupervisorEmail = email;
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      }
    });
  }

  addNewAdminWithoutCalling(firstName, lastName, email, password, phone) {
    cy.wait(1000);
    user.clickingOnUserOption();
    cy.wait(3000);
    cy.get('.table-responsive .resizable-table-tbody .tr').then((el) => {
      if (
        el
          .text()
          .trim()
          .includes(firstName + ' ' + lastName)
      ) {
        cy.log('Admin already exist');
        handlePoorConnectionPopup();
        cy.xpath(userEditBtn(firstName, lastName)).click();
        this.clickDropdownItem('Edit');
        cy.get(emailField).then((el) => {
          const value = el.val();
          cy.readFile('cypress/fixtures/testData.json', (err, data) => {
            if (err) {
              return console.error(err);
            }
          }).then((data) => {
            data.adminWithoutCallingEmail = value;
            cy.writeFile(
              'cypress/fixtures/testData.json',
              JSON.stringify(data)
            );
          });
        });
        cy.get(passwordChangeBtn).click();
        cy.get(passwordField).type(password);
        cy.xpath(saveBtn).click();
      } else {
        user.clickAddNewUserButton();
        user.clickAddAdmin();
        user.enterFirstName(firstName);
        user.enterLastName(lastName);
        user.enterEmail(email);
        user.enterPassword(password);
        user.enterPhoneNumber(phone);
        user.clickSaveButton();
        user.verifySuccessToast();
        cy.readFile('cypress/fixtures/testData.json', (err, data) => {
          if (err) {
            return console.error(err);
          }
        }).then((data) => {
          data.adminWithoutCallingEmail = email;
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      }
    });
  }

  addNewContact(firstName, lastName) {
    contact.clickingOnContactOption();
    cy.wait(2000);
    cy.get('.resizable-table-tbody').then((el) => {
      if (el.find('.contacts__name').length) {
        cy.get('.contacts__name').then(($el) => {
          const text = $el.text().trim().replace(/\s+/g, ' ');
          if (text.includes(firstName + ' ' + lastName)) {
            cy.log('Contact already exist');
          } else {
            cy.log('1');
            contact.clickAddNewContactButton();
            contact.selectUploadFileOption();
            this.uploadFileForContact();
            cy.wait(2000);
            contact.selectFirstNameDropdown();
            contact.selectLastNameDropdown();
            contact.selectEmailDropdown();
            contact.selectPhoneDropdown();
            contact.clickNextButton();
            contact.clickSubmitButton();
            contact.verifyImportStartedToast();
            contact.verifyImportContactCompleteToast();
            cy.wait(3000);
          }
        });
      } else {
        cy.log('2');
        contact.clickAddNewContactButton();
        contact.selectUploadFileOption();
        this.uploadFileForContact();
        cy.wait(2000);
        contact.selectFirstNameDropdown();
        contact.selectLastNameDropdown();
        contact.selectEmailDropdown();
        contact.selectPhoneDropdown();
        contact.clickNextButton();
        contact.clickSubmitButton();
        contact.verifyImportStartedToast();
        contact.verifyImportContactCompleteToast();
        cy.wait(3000);
      }
    });
  }

  uploadFileForContact() {
    cy.get('.dropbox input').attachFile('testing.csv');
  }

  clickPhoneEditButton(number) {
    handlePoorConnectionPopup();
    cy.xpath(phoneEditButton(number)).click();
    this.clickDropdownItem('Edit Number');
  }

  selectNumberGroup(numberGroup) {
    cy.xpath(numberGroupDropdown).click({force:true});
    cy.get(options).then((opt) => {
      for (let i = 0; i < opt.length; i++) {
        if (opt[i].textContent.trim() === numberGroup) {
          opt[i].click({force:true});
          break;
        }
      }
    });
  }

  chooseDestination(destination) {
    cy.xpath(destinationDropdown).click();
    cy.get(options).then((opt) => {
      for (let i = 0; i < opt.length; i++) {
        if (opt[i].textContent.trim() === destination) {
          opt[i].click({force:true});
          break;
        }
      }
    });
  }

  chooseAssignee(assignee) {
    cy.xpath(assignDropdown).click();
    cy.get(options).then((opt) => {
      for (let i = 0; i < opt.length; i++) {
        if (opt[i].textContent.trim() === assignee) {
          opt[i].click({force:true});
          break;
        }
      }
    });
  }

  clickOnButton(btnName) {
    cy.get('button').then((btn) => {
      for (let i = 0; i < btn.length; i++) {
        if (btn[i].textContent.trim() === btnName) {
          btn[i].click();
          break;
        }
      }
    });
  }

  assignNumberToAgent(number, agentName) {
    phone.clickPhoneNumberMenu();
    this.clickPhoneEditButton(number);
    this.selectNumberGroup('None');
    this.chooseDestination('Agent');
    this.chooseAssignee(agentName);
    this.clickOnButton('SAVE');
  }

  clickDropdownItem(itemName) {
    cy.get(dropdownItems).then((items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.trim() === itemName) {
          cy.get(items[i]).click({force:true});
          break;
        }
      }
    });
  }

  clickUserPermissionExpander() {
    cy.get(userPermissionExpander).click();
  }

  enableAgentDefaultPermissions() {
    cy.get('body').then((body) => {
      if (body.find(enabledPermissions).length) {
        cy.get(enabledPermissions).then((el) => {
          for (let i = 0; i < el.length; i++) {
            cy.get(el[i]).scrollIntoView().click({ force: true });
            cy.wait(500);
          }
        });
      }
    });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View Contact Lists')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Edit Call Result & Note')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View/Export Recent Contacts')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Listen Audio')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Download Audio')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View All Campaigns')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
  }

  enableSupervisorDefaultPermissions() { 
    cy.contains(permit[1]).scrollIntoView();
    cy.get('body').then((body) => {
      for (let i = 0; i < permit.length; i++) {
        if(body.find(permissionCheckbox(index[i])).length) {
          cy.xpath(enablePermission(permit[i])).should('be.visible').click();
        }
      }

      if (body.find(enabledPermissions).length) {
        cy.get(enabledPermissions).then((el) => {
          for (let i = 0; i < el.length; i++) {
            cy.get(el[i]).scrollIntoView().click({ force: true });
            cy.wait(500);
          }
        });
      }
    });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View Contact Lists')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Edit Contact')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Edit Call Result & Note')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View/Export Recent Contacts')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Listen Audio')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Download Audio')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View All Campaigns')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View All Agents Tasks')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View All Reports')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('View Recent Contacts of All Agents')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
    cy.get(disabledPermissions)
      .parents(permissionHeading)
      .contains('Upload Contacts Lists')
      .children('div')
      .children(disabledPermissions)
      .scrollIntoView()
      .click({ force: true });
  }
}
