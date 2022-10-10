import { covertNumberToNormal, ignoreSpeedTestPopup, clickCallFunction } from '../Utils';

const statusDropdown = '.nav-item.auth__agent-presence .ss-select';
const statusNames = `.ss-select-group-items .ss-select-option .agent__presence-name`;
const selectCampaignHeading = '.select__campaign-title';
const selectCampaignDropdown = '.modal-content .select__campaign__select';
const campaignNames = '.ss-select-option span + span';
const confirmButton = '.modal-content button';
const menu = (menuName) => `li:not(.subitem) a[title="${menuName}"]`;
const advanceConfiguration = '.campaign-expander';
const nameField = 'input[name="name"]';
const radioButtons = (radioButtonName) =>
  `//h2[@class="campaign-card__radio-block__title"][text()="${radioButtonName}"]/ancestor::label//span[@class="checkmark"]`;
const nextButton = '.collapse.show button.circle';
const numbersDropdown = `//label[text()="Caller ID"]/ancestor::div[contains(@class,"row")]//div[contains(@class,"ss-select-control")]`;
const options = '.ss-select-option';
const callingHours = `//label[text()="Calling Hours"]/following-sibling::div/div`;
const countIncreasingFields = `//label[text()="Simultaneous Dials Per Agent"]/following-sibling::div//div[@class="input-group-append"]//span[text()="+"]`;
const callResultsDropdown = '//label[text()="Call Results"]/ancestor::div[@class="row"]//div[contains(@class,"ss-select-control")]';
const agentsDropdown =
  '//div[contains(@class,"ss-select-control")]/span[contains(text(),"Agents")]';
const successToastMessage = `.Toastify__toast-body`;
const threeDotMenuBtn = (CampName) =>
  `//span[text()="${CampName}"]/ancestor::div[@class="tr"]//div[@class="dropdown"]`;
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
const applyToAllButton = `//span[text()="Apply to All"]`;
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
const retryTime =
  '//label[text()="Retry Time"]/parent::div/following-sibling::div//input';
const maxAttemptPerRecord =
  '//label[text()="Max Attempts Per Record"]/following-sibling::div//input';
const contactThreeDotMenu = (firstName, lastName) =>
  `//td[span[span[@class="contacts__name" and text()="${firstName}" and text()="${lastName}"]]]/parent::tr//td//img[contains(@src,"edit")]`;
const softphoneLineStatus = '.stg-softphone-line-status';
const softphoneLineContactName = '.stg-softphone-line-contact';
const ringTimeDuration = `//label[text()="Ring Time Duration"]/following-sibling::div//input`;
const abandonmentTimeout = `//label[text()="Abandonment Timeout"]/following-sibling::div//input`;
const callRecordingCheckbox = 'input[name="callrecording"]';
const callRecordingIcon = (firstName, lastName) =>
  `//tr[td[text()="${firstName}" and text()="${lastName}"]]//img[contains(@src,"icon-listen")]`;
const playerCampaignName = '.contacts-player__top-campaign';
const playerWindow = '.contacts-player .modal-content';
const playerControlButton = (no) =>
  `.contacts-player__controls svg:nth-of-type(${no})`;
const playerCurrentTime = '.progress-bar__current-time';
const playerCloseButton = '.modal-content .fa-times';
const dailyConnectsLimit = `//label[text()="Daily Connects Limit"]/parent::div//input`;
const retryTimeDropdown = `//div[label[text()="Retry Time"]]/parent::div//div[contains(@class,"ss-select-control")]`;
const softphoneIcon = '.softphone-icon';
const dialedNumberOptions = 'tbody tr:nth-of-type(1) td:nth-of-type(11) span';
const tableRefreshBtn = 'span[title="Refresh"]';
const phoneRingning = '.Phone.is-animating';
const cardDropdowns = (cardName) =>
  `//h2[@class="campaign-card__title"][text()="${cardName}"]/ancestor::div[contains(@class,"campaign-card")]//div[contains(@class,"ss-select-control")]`;

export default class Dialer {
 
  selectStatus(statusName) {
    clickCallFunction();
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
          cy.get(Names[i]).click({force:true});
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

  clickAdvanceConfiguration() {
    cy.get(advanceConfiguration).click({force:true});
  }

  enterCampaignName(name) {
    cy.get(nameField).clear().type(name);
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
    cy.xpath(cardDropdowns('Phone Numbers')).click({force:true});
    cy.get(options).then((number) => {
      for (let i = 0; i < number.length; i++) {
        if (number[i].textContent.trim() === num) {
          cy.get(number[i]).click({force:true});
          break;
        }
      }
    });
    //this.clickNumbersDropdown();
  }

  clickCallingHours() {
    cy.xpath(callingHours).click();
  }

  clickCallResultsDropdown() {
    cy.xpath(callResultsDropdown).click({force:true});
  }

  selectCallResults(callResults) {
    cy.get(options).then((results) => {
      for (let i = 0; i < callResults.length; i++) {
        for (let j = 0; j < results.length; j++) {
          if (
            results[j].textContent.trim().toLowerCase() ===
            callResults[i].toLowerCase()
          ) {
            results[j].click();
            break;
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
  }

  verifySuccessToastMessage(message) {
    cy.get(successToastMessage,{time:30000})
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

  verifyAbandonedCall() {
    // this.verifyPhoneRingingIcon();
    cy.wait(30000);
    cy.get('body').then(($body) => {
      if ($body.find(contactProfile).length) {
        this.verifySoftphone();
        cy.readFile('cypress/fixtures/testData.json').then((data) => {
          data.flag = true;
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      } else {
        cy.reload();
        ignoreSpeedTestPopup();
        this.clickToOpenSoftphone();
      }
    });
  }

  verifySimultaneousDial(names, status, time, disposition) {
    this.verifySoftphoneLineContactName(names);
    cy.wait(15000);
    cy.get('body').then(($body) => {
      if ($body.find(contactProfile).length) {
        this.verifyAgentStatus(status);
        this.verifySoftphoneTitle(names);
        this.endCallAtTime(time);
        this.verifyCallDispositionWindow();
        this.selectCallDisposition(disposition);
        this.clickOnButton('Done');
        cy.wait(2000);
      } else {
        cy.reload();
        ignoreSpeedTestPopup();
        this.clickToOpenSoftphone();
      }
    });
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
      cy.log(number);
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
    cy.get(agentStatus, { timeout: 80000 }).should('have.text', status);
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

  selectCampaignToAssign(campaignName) {
    cy.get(modalDropdown).click();
    this.selectOption(campaignName);
  }

  clickListDeleteButton(listName) {
    cy.xpath(listDeleteBtn(listName)).click();
  }

  verifySoftphoneLinesNumber(no) {
    cy.get(softphoneLines).should('have.length', no);
  }

  enterRetryTime(time) {
    cy.xpath(retryTime).clear().type(time);
  }

  enterMaxAttemptPerRecord(attemptNo) {
    cy.xpath(maxAttemptPerRecord).clear().type(attemptNo);
  }

  clickContactThreeDotMenu(firstName, lastName) {
    cy.xpath(contactThreeDotMenu(firstName, lastName)).click();
  }

  verifySoftphoneLineContactName(names) {
    let contactName = '';
    for (let i = 0; i < names.length; i++) {
      contactName = contactName + names[i] + ' ';
    }
    cy.get(softphoneLineContactName, { timeout: 40000 }).then((lineText) => {
      for (let i = 0; i < lineText.length; i++) {
        expect(contactName).to.contains(lineText[i].textContent.trim());
      }
    });
  }

  verifySoftphoneLineStatus(status) {
    cy.get(softphoneLineStatus).should('have.text', status);
  }

  enterRingTimeDuration(duration) {
    cy.xpath(ringTimeDuration).clear().type(duration);
  }

  enterAbandonmentDuration(duration) {
    cy.xpath(abandonmentTimeout).clear().type(duration);
  }

  enableCallRecording() {
    cy.get(callRecordingCheckbox).then((checkBox) => {
      if (checkBox[0].hasAttribute('checked')) {
        cy.log('Already checked');
      } else {
        cy.get(callRecordingCheckbox).check({ force: true });
      }
    });
  }

  disableCallRecording() {
    cy.get(callRecordingCheckbox).uncheck({ force: true });
  }

  verifyCallRecordingIcon(status) {
    cy.reload();
    ignoreSpeedTestPopup();
    cy.wait(8000);
    this.clickTableRefreshButton();
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if (status === true) {
        expect($body.find(dialedNumberOptions).length).to.equal(2);
      } else if (status === false) {
        expect($body.find(dialedNumberOptions).length).to.equal(1);
      }
    });
  }

  clickCallRecordingIcon(firstName, lastName) {
    cy.xpath(callRecordingIcon(firstName, lastName)).first().click();
  }

  verifyPlayerCampaignName(campaignName) {
    cy.get(playerCampaignName).should('contain.text', campaignName);
  }

  verifyRecordingPlayerWindow() {
    cy.get(playerWindow).should('be.visible');
  }

  clickPlayPauseButton() {
    cy.get(playerControlButton(2)).click();
  }

  clickForwardButton() {
    cy.get(playerControlButton(3)).click();
  }

  clickBackwardButton() {
    cy.get(playerControlButton(1)).click();
  }

  verifyPlayerCurrentTime(time) {
    cy.get(playerCurrentTime, { timeout: 10000 }).should('have.text', time);
  }

  clickPlayerCloseButton() {
    cy.get(playerCloseButton).click();
  }

  enterDailyConnectsLimit(limit) {
    cy.xpath(dailyConnectsLimit).clear().type(limit);
  }

  selectRetryTimeDropdown(unit) {
    cy.xpath(retryTimeDropdown).click();
    this.selectOption(unit);
  }

  verifyCallConnectForCampaign(names, time, disposition, loopCount) {
    for (let i = 0; i < loopCount; i++) {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        if (data.flag === true) {
          cy.log('Completed');
        } else {
          this.verifySoftphoneLineContactName(names);
          cy.wait(20000);
          cy.get('body').then((body) => {
            if (body.find(contactProfile).length) {
              this.endCallAtTime(time);
              this.verifyCallDispositionWindow();
              this.selectCallDisposition(disposition);
              this.clickOnButton('Done');
              cy.readFile('cypress/fixtures/testData.json').then((data) => {
                data.flag = true;
                cy.writeFile(
                  'cypress/fixtures/testData.json',
                  JSON.stringify(data)
                );
              });
              this.selectStatus('Offline');
            } else {
              cy.reload();
              ignoreSpeedTestPopup();
              this.clickToOpenSoftphone();
            }
          });
        }
      });
    }
  }

  clickToOpenSoftphone() {
    cy.get(softphoneIcon).click();
  }

  clickTableRefreshButton() {
    cy.get(tableRefreshBtn).click();
  }

  verifyPhoneRingingIcon() {
    cy.get(phoneRingning, { timeout: 30000 }).should('be.visible');
  }

  selectRecycledCampaign(campaignName) {
    cy.get(campaignNames).then((Names) => {
      for (let i = 0; i < Names.length; i++) {
        if (Names[i].textContent.trim() == '♺ '+ campaignName) {
          cy.get(Names[i]).click({force:true});
          break;
        }
      }
    });
  }
  
}
