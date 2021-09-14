import { covertNumberToNormal } from '../Utils';

const statusDropdown = '.nav-item.auth__agent-presence .ss-select';
const statusNames = `.ss-select-group-items .ss-select-option .agent__presence-name`;
const selectCampaignHeading = '.select__campaign-title';
const selectCampaignDropdown = '.modal-content .select__campaign__select';
const campaignNames = '.ss-select-option span + span';
const confirmButton = '.modal-content button';
const menu = (menuName) => `li:not(.subitem) a[title="${menuName}"]`;
const advanceSwitch = '.campaign-wizard .switch';
const nameField = 'input[name="name"]';
const radioButtons = (radioButtonName) =>
  `//label[@class="radio_cstm"][contains(.,"${radioButtonName}")]//span[@class="checkmark"]`;
const nextButton = '.collapse.show button.circle';
const numbersDropdown = `//label[text()="Caller ID"]/ancestor::div[contains(@class,"row")]//div[contains(@class,"ss-select-control")]`;
const options = '.ss-select-option';
const callingHours = `//label[text()="Calling Hours"]/following-sibling::div/div`;
const countIncreasingFields = `//label[text()="Simultaneous Dials Per Agent"]/following-sibling::div//div[@class="input-group-append"]//span[text()="+"]`;
const callResultsDropdown = '.row-calldisposition .ss-select-control';
const agentsDropdown =
  '//div[contains(@class,"ss-select-control")]/span[contains(text(),"Agents")]';
const successToastMessage = `.Toastify__toast-body`;
const threeDotMenuBtn = (CampName) =>
  `//tr[td[.="${CampName}"]]//div[contains(@class,"dropdown")]`;
const dropdownItems = '.show .dropdown-item';
const warningTitle = '.warning__modal .modal-content .warning__modal-title';
const warningGotItBtn = '.warning__modal .modal-content button';
const simultaneousDialsPerAgent = `//label[text()="Simultaneous Dials Per Agent"]/parent::div//div[contains(@class,"number-editor")]//input[@type="text"]`;
const questionToolTip = '.question-tooltip';
const contactProfile = '.contact-view-wrapper';
const softphone = '.stg-softphone-wrapper .stg-softphone';
const endCallButton = '.stg-softphone-callbutton img[src*="phone-red"]';
const acceptCallButton = '.stg-softphone-callbutton img[src*="phone-green"]';
const callDispositionWindow = '.call-disposition-modal .modal-content';
const callDispositions = '.disposition-cell .disposition';
const campaignDialsCount = (campaignName) =>
  `//tr[td[text()="${campaignName}"]]//td[3]`;
const campaignAnsweredCount = (campaignName) =>
  `//tr[td[text()="${campaignName}"]]//td[4]`;
const reportsMenu = 'a[title="Reports"]';
const subMenu = (subMenuName) => `.subitem a[title="${subMenuName}"]`;
const softPhoneOpen = '.stg-softphone-wide';
const inqueuePhoneNumber = `//div[@class="table-responsive"]//tr[td[text()="INQUEUE"]]//td[3]`;
const callingHoursDropdown = `//label[text()="Calling Hours"]/following-sibling::div//div`;
const timeFromDropdown = `(//div[text()="Sunday"]/following-sibling::div//div[contains(@class,"ss-select-control")])[1]`;
const timeToDropdown = `(//div[text()="Sunday"]/following-sibling::div//div[contains(@class,"ss-select-control")])[2]`;
const applyToAllButton = `//span[text()="Apply to all"]`;
const assignCampaignDropdown = `//span[text()="Select Campaign"]/parent::div[contains(@class,"ss-select-control")]`;
const extensionsDropdown = `//span[text()="Select Extension"]/parent::div[contains(@class,"ss-select-control")]`;
const assignAgentsDropdown = `//span[text()="Agents"]/parent::div[contains(@class,"ss-select-control")]`;
const queueDeleteButton = (queueName) =>
  `//tr[td[.="${queueName}"]]//td//img[contains(@src,"delete")]`;
const recentContactsDisposition = '.disposition';
const contactName = (firstName, lastName) =>
  `//span[@class="contacts__name" and text()="${firstName}" and text()="${lastName}"]`;
const contactPhoneNumber = '.phone__a-wrapper';
const agentStatus = '.agent__presence-name';
const softphoneTitle = '.stg-softphone-title';
const callTime = '.stg-softphone-time';
const softphoneButton = '.softphone-icon';
const mappingFields = (fieldName) =>
  `//div[input[@title="${fieldName}"]]/following-sibling::div/div[contains(@class,"ss-select")]`;
const listThreeDotMenuBtn = (listName) =>
  `//tr[td[text()="${listName}"]]//td//div[contains(@class,"dropdown")]`;
const modalTitle = '.modal-content .modal-title';
const modalDropdown = '.modal-content .ss-select';
const listDeleteBtn = (listName) =>
  `//tr[td[text()="${listName}"]]//td//span/*[name()="svg"][@data-icon="trash-alt"]`;
const softphoneLines = '.stg-softphone-line';

export default class Dialer {
  selectStatus(statusName) {
    cy.get(statusDropdown).click();
    cy.get(statusNames).then((names) => {
      for (let i = 0; i < names.length; i++) {
        if (names[i].textContent.trim() === statusName) {
          cy.get(names[i]).click();
          break;
        }
      }
    });
  }

  verifySelectCampaignBoxHeading() {
    cy.get(selectCampaignHeading).should('have.text', 'Start Calling');
  }

  clickSelectCampaignDropdown() {
    cy.get(selectCampaignDropdown).click();
  }

  selectCampaign(campaignName) {
    cy.get(campaignNames).then((Names) => {
      for (let i = 0; i < Names.length; i++) {
        if (Names[i].textContent.trim() === campaignName) {
          cy.get(Names[i]).click();
          break;
        }
      }
    });
  }

  clickConfirmButton() {
    cy.get(confirmButton).click();
  }

  clickOnMenu(menuName) {
    cy.get(menu(menuName)).click({ force: true });
  }

  clickOnButton(buttonName) {
    cy.get('button').then((Btn) => {
      for (let i = 0; i < Btn.length; i++) {
        if (Btn[i].textContent.trim() === buttonName) {
          cy.get(Btn[i]).click();
          break;
        }
      }
    });
  }

  clickAdvanceSwitch() {
    cy.get(advanceSwitch).click();
  }

  enterCampaignName(name) {
    cy.get(nameField).type(name);
  }

  clickOnRadioButton(radioButtonName) {
    cy.xpath(radioButtons(radioButtonName)).click();
  }

  clickNextButton() {
    cy.get(nextButton).click();
  }

  clickNumbersDropdown() {
    cy.xpath(numbersDropdown).click();
  }

  selectPhoneNumber(num) {
    cy.get(options).then((number) => {
      for (let i = 0; i < number.length; i++) {
        if (number[i].textContent.trim() === num) {
          cy.get(number[i]).click();
          break;
        }
      }
    });
    this.clickNumbersDropdown();
  }

  clickCallingHours() {
    cy.xpath(callingHours).click();
  }

  clickCallResultsDropdown() {
    cy.get(callResultsDropdown).click();
  }

  selectCallResults(callResults) {
    cy.get(options).then((results) => {
      for (let i = 0; i < callResults.length; i++) {
        for (let j = 0; j < results.length; j++) {
          if (results[j].textContent.trim() === callResults[i]) {
            results[j].click();
          }
        }
      }
    });
  }

  selectAgentToAssign(agentName) {
    cy.xpath(agentsDropdown).click();
    cy.get(options).then((AgentNames) => {
      for (let i = 0; i < AgentNames.length; i++) {
        if (AgentNames[i].textContent.trim() === agentName) {
          cy.get(AgentNames[i]).click();
        }
      }
    });
    // cy.xpath(agentsDropdown).click();
  }

  verifySuccessToastMessage(message) {
    cy.get(successToastMessage)
      .should('be.visible')
      .should('contain.text', message);
  }

  clickThreeDotMenuBtn(campName) {
    cy.xpath(threeDotMenuBtn(campName)).click();
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

  verifyWarningTitle() {
    cy.get(warningTitle).should('be.visible').should('have.text', 'Warning');
  }

  clickWarningGotItBtn() {
    cy.get(warningGotItBtn).click();
  }

  enterSimultaneousDialsPerAgent(number) {
    cy.xpath(simultaneousDialsPerAgent).clear().type(number);
  }

  verifyContactViewPage() {
    cy.get(contactProfile, { timeout: 60000 }).should('be.visible');
  }

  verifySoftphone() {
    cy.get(softphone, { timeout: 60000 }).should('be.visible');
  }

  clickEndCallButton() {
    cy.get(endCallButton).click();
  }

  clickAcceptCallButton() {
    cy.get(acceptCallButton).click();
  }

  verifyCallDispositionWindow() {
    cy.get(callDispositionWindow).should('be.visible');
  }

  selectCallDisposition(disposition) {
    cy.get(callDispositions).then((Dispositions) => {
      for (let i = 0; i < Dispositions.length; i++) {
        if (Dispositions[i].textContent.trim() === disposition) {
          Dispositions[i].click();
          break;
        }
      }
    });
  }

  getCampaignDialsCount(campaignName) {
    cy.xpath(campaignDialsCount(campaignName)).then((dial) => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.dialCount = dial.text();
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  getCampaignAnsweredCount(campaignName) {
    cy.xpath(campaignAnsweredCount(campaignName)).then((dial) => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.answeredCount = dial.text();
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  verifyCampaignDialsCount(campaignName, value) {
    cy.xpath(campaignDialsCount(campaignName)).should('have.text', value);
  }

  verifyCampaignAnsweredCount(campaignName, value) {
    cy.xpath(campaignAnsweredCount(campaignName)).should('have.text', value);
  }

  clickReportsMenu() {
    cy.get(reportsMenu).click({ force: true });
  }

  clickOnSubMenu(subMenuName) {
    cy.get(subMenu(subMenuName)).click({ force: true });
  }

  verifySoftPhoneOpen() {
    cy.get(softPhoneOpen, { timeout: 30000 }).should('be.visible');
  }

  verifyCallEnd(disposition) {
    cy.wait(3000);
    cy.get('body').then(($body) => {
      if ($body.find(endCallButton).length) {
        cy.get(endCallButton).click();
      }
      if ($body.find(callDispositionWindow).length) {
        this.selectCallDisposition(disposition);
        this.clickOnButton('Done');
      }
    });
  }

  verifyInqueueCall(num) {
    cy.xpath(inqueuePhoneNumber, { timeout: 120000 }).then((phoneNumber) => {
      const number = covertNumberToNormal(phoneNumber.text());
      expect(number).to.equal(num);
    });
  }

  clickCallingHoursDropdown() {
    cy.xpath(callingHoursDropdown).click();
  }

  selectOption(option) {
    cy.get(options).then((Opt) => {
      for (let i = 0; i < Opt.length; i++) {
        if (Opt[i].textContent.trim() === option) {
          Opt[i].click();
          break;
        }
      }
    });
  }

  selectFromTime(time) {
    cy.xpath(timeFromDropdown).click();
    this.selectOption(time);
  }

  selectToTime(time) {
    cy.xpath(timeToDropdown).click();
    this.selectOption(time);
  }

  clickApplyToAllButton() {
    cy.xpath(applyToAllButton).click();
  }

  enterQueueName(name) {
    cy.get(nameField).type(name);
  }

  chooseAssignCampaign(campaign) {
    cy.xpath(assignCampaignDropdown).click();
    this.selectOption(campaign);
  }

  chooseExtension(no) {
    cy.xpath(extensionsDropdown).click();
    this.selectOption(no);
    this.clickQuestionTooltip();
  }

  chooseAssignAgents(agentName) {
    cy.xpath(assignAgentsDropdown).click();
    this.selectOption(agentName);
    this.clickQuestionTooltip();
  }

  clickDeleteQueueButton(queueName) {
    cy.xpath(queueDeleteButton(queueName)).click();
  }

  clickQuestionTooltip() {
    cy.get(questionToolTip).first().click();
  }

  verifyRecentContactDisposition(disposition) {
    cy.get(recentContactsDisposition)
      .first()
      .then((dispositionName) => {
        expect(dispositionName.text()).to.equal(disposition);
      });
  }

  clickContactName(firstName, lastName) {
    cy.xpath(contactName(firstName, lastName)).click();
  }

  clickContactPhoneNumber() {
    cy.get(contactPhoneNumber).first().click();
  }

  verifyAgentStatus(status) {
    cy.get(agentStatus, { timeout: 30000 }).should('have.text', status);
  }

  verifySoftphoneTitle(name) {
    let Names = '';
    for (let i = 0; i < name.length; i++) {
      Names = Names + ' ' + name[i];
    }
    cy.get(softphoneTitle).then((title) => {
      expect(Names).to.contain(title.text());
    });
  }

  endCallAtTime(time) {
    cy.get(callTime, { timeout: 60000 }).should('have.text', time);
    this.clickEndCallButton();
  }

  clickSoftphoneButton() {
    cy.get(softphoneButton).click();
  }

  selectMappingFields(fieldNames) {
    for (let i = 0; i < fieldNames.length; i++) {
      cy.xpath(mappingFields(fieldNames[i])).click();
      if (fieldNames[i] === 'Phone Number') {
        cy.get(options).then((Opt) => {
          for (let i = 0; i < Opt.length; i++) {
            if (Opt[i].textContent.trim() === 'Phone Number 1*') {
              Opt[i].click();
              break;
            }
          }
        });
      } else if (fieldNames[i] === 'First Name') {
        cy.get(options).then((Opt) => {
          for (let i = 0; i < Opt.length; i++) {
            if (Opt[i].textContent.trim() === 'First Name*') {
              Opt[i].click();
              break;
            }
          }
        });
      } else if (fieldNames[i] === 'Last Name') {
        cy.get(options).then((Opt) => {
          for (let i = 0; i < Opt.length; i++) {
            if (Opt[i].textContent.trim() === 'Last Name*') {
              Opt[i].click();
              break;
            }
          }
        });
      } else if (fieldNames[i] === 'Zip') {
        cy.get(options).then((Opt) => {
          for (let i = 0; i < Opt.length; i++) {
            if (Opt[i].textContent.trim() === 'Zip Code') {
              Opt[i].click();
              break;
            }
          }
        });
      } else {
        this.selectOption(fieldNames[i]);
      }
    }
  }

  clickListAssignToCampaign(listName) {
    cy.xpath(listThreeDotMenuBtn(listName)).click();
    this.clickOnDropdownItem('Assign To Campaign');
  }

  verifyModalTitle(title) {
    cy.get(modalTitle).should('have.text', title);
  }

  chooseCampaignToAssign(campaignName) {
    cy.get(modalDropdown).click();
    this.selectOption(campaignName);
    cy.get(modalDropdown).click();
  }

  clickListDeleteButton(listName) {
    cy.xpath(listDeleteBtn(listName)).click();
  }

  verifySoftphoneLinesNumber(no) {
    cy.get(softphoneLines).should('have.length', no);
  }
}
