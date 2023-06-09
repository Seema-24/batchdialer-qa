import { covertNumberToNormal, ignoreSpeedTestPopup, clickCallFunction, handlePoorConnectionPopup } from '../Utils';
import Contacts from './Contacts';
import Dashboard from './Dashboard';

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
  `//h2[@class="campaign-card__radio-block__title"][contains(.,"${radioButtonName}")]/ancestor::label//span[@class="checkmark"]`;
const checkboxButtons = (checkboxButtonName) =>
  `//h2[@class="campaign-card__checkbox-block__title"][contains(.,"${checkboxButtonName}")]/ancestor::label//span[@class="checkmark"]`;
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
  `//span[text()="${CampName}"]/ancestor::div[@class="tr"]//div[@class="dropdown"]//img`;
const dropdownItems = '.show .dropdown-item';
const warningTitle = '.warning__modal .modal-content .warning__modal-title';
const warningGotItBtn = '.warning__modal .modal-content button';
const simultaneousDialsPerAgent = `//label[text()="Simultaneous Dials p/Agent"]//following-sibling::div[contains(@class,"number-editor")]//input`;
const questionToolTip = '.question-tooltip';
const contactProfile = '.contact-view-wrapper';
const incomingCall = '.softphone-body-height-for-incoming-call-ringing';
const endCallButton = '[src*=softphone_phone_red]';
const acceptCallButton = '[src*=softphone_phone_green]';
const callDispositionWindow = '.show .call-disposition div.position-absolute.overlay-content';
const callDispositions = '.show .call-disposition main span.d-inline-block';
const campaignDialsCount = (campaignName) =>
  `(//div[contains(.,"${campaignName}")]/following-sibling::div)[2]`;
const campaignAnsweredCount = (campaignName) =>
  `(//div[contains(.,"${campaignName}")]/following-sibling::div)[3]`;
const reportsMenu = 'a[title="Reports"]';
const subMenu = (subMenuName) => `.subitem a[title="${subMenuName}"]`;
const softPhoneOpen = '.stg-softphone-wrapper .softphone-body-height-for-dialer';
const softphone = '.stg-softphone-wrapper';
const inqueuePhoneNumber = `(//span[text()="In Queue"]/parent::div/following-sibling::div)[3]`;
const callingHoursDropdown = `//label[text()="Calling Hours"]/following-sibling::div`;
const timeFromDropdown = `(//label[text()="Sunday"]/ancestor::div/following-sibling::div//div[contains(@class,"ss-select-control")])[1]`;
const timeToDropdown = `(//label[text()="Sunday"]/ancestor::div/following-sibling::div//div[contains(@class,"ss-select-control")])[2]`;
const applyToAllButton = `//span[text()="Apply to All"]`;
const assignCampaignDropdown = `//span[text()="Select Campaign"]/parent::div[contains(@class,"ss-select-control")]`;
const extensionsDropdown = `//span[text()="Select Extension"]/parent::div[contains(@class,"ss-select-control")]`;
const assignAgentsDropdown = `//span[text()="Agents"]/parent::div[contains(@class,"ss-select-control")]`;
const queueDeleteButton = (queueName) =>
  `//div[contains(@class,"resizable-table-tbody")]//div[.="${queueName}"]/following-sibling::div//img[contains(@src,"delete")]`;
const recentContactsDisposition = '.disposition';
const contactName = (firstName, lastName) =>
  `//span[@class="contacts__name" and text()="${firstName}" and text()="${lastName}"]`;
const contactPhoneNumber = '.phone__a-wrapper';
const agentStatus = '.auth__agent-presence';
const softphoneTitle = '.softphone-body-height-for-dialer header span.d-block';
const callTime = '.call-time';
const softphoneButton = '.softphone-icon';
const mappingFields = (fieldName) =>
  `//div[input[@title="${fieldName}"]]/following-sibling::div/div[contains(@class,"ss-select")]`;
const listThreeDotMenuBtn = (listName) =>
  `//div[text()="${listName}"]/parent::div/child::div//img[@alt="Menu"]`;
const modalTitle = '.modal-content .modal-title';
const modalDropdown = '.modal-content .ss-select';
const listDeleteBtn = (listName) =>
  `//div[text()="${listName}"]/parent::div/child::div//*[name()="svg"][@data-icon="trash-can"]`;
const softphoneLines = '.softphone-body-height-for-dialer [id*="softphone-line"]';
const retryTime = (editBtn) =>
  `//label[text()="Retry Time"]//following-sibling::div//div[contains(@class,"number-editor")]//img[contains(@src,"${editBtn}")]`;
const maxAttemptPerRecord =
  '//label[text()="Max Attempts Per Record"]/following-sibling::div//input';
const contactThreeDotMenu = (firstName, lastName) =>
  `//span[@class="contacts__name" and text()="${firstName}" and text()="${lastName}"]/ancestor::div[@class="tr"]//div[@class="dropdown"]`;
const softphoneLineStatus = '.stg-softphone-line-status';
const softphoneLineContactName = '.multiline-panel.show div.position-relative';
const ringTimeDuration = `//label[text()="Ring Time Duration"]/following-sibling::div//input`;
const abandonmentTimeout = `//label[text()="Abandonment Timeout, sec"]/following-sibling::div//input`;
const callRecordingCheckbox = 'input[name="callrecording"]';
const callRecordingIcon = (firstName, lastName, camp) =>
  `//div[div[text()="${firstName} ${lastName}"] and div[text()="${camp}"]]//img[contains(@src,"volume-up-fill")]`;
const playerCampaignName = '.contacts-player__top-campaign';
const playerWindow = '.contacts-player .modal-content';
const playerControlButton = (no) =>
  `.contacts-player__controls svg:nth-of-type(${no})`;
const playerCurrentTime = '.progress-bar__current-time';
const playerCloseButton = '.modal-content .fa-times';
const dailyConnectsLimit = `//label[text()="Max Calls per Day"]/parent::div//input`;
const campBehviorDropdown = (dropdown) => `//div[label[text()="${dropdown}"]]/parent::div//div[contains(@class,"ss-select-control")]`;
const softphoneIcon = '.softphone-icon';
const listenIcon = (camp) => `//div[text()="${camp}"]/parent::div/child::div//img[@src="/img/volume-up-fill.svg"]`;
const tableRefreshBtn = 'span[title="Refresh"]';
const phoneRingning = '.Phone.is-animating';
const cardDropdowns = (cardName) =>
  `//h2[@class="campaign-card__title"][text()="${cardName}"]/ancestor::div[contains(@class,"campaign-card")]//div[contains(@class,"ss-select-control")]`;
const dashboard = 'a[title="Dashboard"]';
const closeSoftBtn = '.softphone-close-button .cursor_pointer';
const timeoutDestination = '//label[text()="Timeout Destination"]/ancestor::div[contains(@class,"col")]/descendant::span[contains(@class,"ss-select-value")][1]';
const PhoneValue = (key) => `//div[@class="key"][text()="${key}"]/parent::div/child::div[@class="value"]`
const contactLineCursor = (pos) => `svg[data-icon="angle-${pos}"]`
const SoftphonePresenceHeader = '.softphone-header-height .agent-presence >div >div';
const softphoneBottomSwitchTab = (tab) => `//footer//li/span[text()="${tab}"]/preceding-sibling::span[contains(@class,"cursor_pointer")]`;
const softphoneDialerModeIcon = '//ul[contains(@class,"campaigns-list")]/li//div[contains(@class,"icon")]//*[name()="svg"]';
const softphoneCampName = (classVal) => `//ul[contains(@class,"campaigns-list")]/li//span[contains(@class,"${classVal}")]`;
const statusChangeWindow = '.status-change-window.show';
const softphoneSettingHeader= (header) => `//div[span[text()="${header}"]]/following-sibling::div//*`;
const softphoneSearchbox = '[placeholder="Search Campaign"]';
const campList = '.campaigns-list';
const callMenu = '.call-menus .d-inline-block';
const campListName = '.campaigns-list .text-truncate';


const dash = new Dashboard();
const contact = new Contacts();
export default class Dialer {
 
  selectStatus(statusName) {
    clickCallFunction();
    cy.get(statusDropdown, {timeout:60000}).click();
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
    const calling = 'Start Calling';
    cy.wait(2000);
    cy.get('body').then($body => {
      if($body.text().includes(calling)) {
        cy.get(selectCampaignHeading).should('have.text', calling);
      }else{
        dash.clickUserProfile();
        dash.clickOnChangeCampaign();
        cy.get(selectCampaignHeading).should('have.text', calling);
      }
    })
    
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
          cy.get(Btn[i]).click({force:true});
          break;
        }
      }
    });
  }

  clickAdvanceConfiguration() {
    cy.get(advanceConfiguration).click({force:true});
  }

  enterCampaignName(name) {
    cy.get(nameField).clear({force:true}).type(name);
  }

  clickOnRadioButton(radioButtonName) {
    cy.get('object.loader').should('not.exist');
    cy.xpath(radioButtons(radioButtonName))
    .should('be.visible')
    .click({force:true});
  }

  clickOnCheckboxButton(checkboxButton) {
    cy.xpath(checkboxButtons(checkboxButton)).click();
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
        if (number[i].textContent.trim() === num || number[i].textContent.trim().includes(num)) {
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
    this.closeSoftCloseBtn();
    cy.xpath(threeDotMenuBtn(campName)).click({force:true});
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
    cy.xpath(simultaneousDialsPerAgent).clear({force:true}).type(number);
  }

  verifyContactViewPage() {
    cy.get(contactProfile, { timeout: 60000 }).should('be.visible');
  }

  verifyAbandonedCall() {
    //this.verifyPhoneRingingIcon();
    cy.get(contactProfile,{timeout:60000}).should('be.visible');
    // cy.get('body').then(($body) => {
      // if ($body.find(contactProfile).length) {
        this.verifySoftphone();
        cy.readFile('cypress/fixtures/testData.json').then((data) => {
          data.flag = false;
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      // } else {
      //   cy.reload();
      //   ignoreSpeedTestPopup();
      //   this.clickToOpenSoftphone();
      // }
    //});
  }

  verifySimultaneousDial(names, status, time, disposition) {
    this.verifySoftphoneLineContactName(names);
    cy.wait(5000);
    cy.get('body').then(($body) => {
      if ($body.find(contactProfile).length) {
        this.verifyAgentStatus(status);
        this.verifySoftphoneTitle(names);
        this.endCallAtTime(time);
        this.verifyCallDispositionWindow();
        this.selectCallDisposition(disposition);
        this.clickOnButton('Done');
      } else {
        cy.reload();
        ignoreSpeedTestPopup();
        this.clickToOpenSoftphone();
      }
    });
  }

  verifySoftphone() {
    cy.get(incomingCall, { timeout: 60000 }).should('be.visible');
  }

  clickEndCallButton() {
    cy.wait(2000);
    cy.get('body').then(($body) => {
      if ($body.find(endCallButton).length) {
        cy.get(endCallButton).click({force:true});
      }
    });
  }

  clickAcceptCallButton() {
    cy.get(acceptCallButton).click();
  }

  verifyCallDispositionWindow() {
    handlePoorConnectionPopup();
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
    cy.wait(1500);
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
    cy.xpath(inqueuePhoneNumber, { timeout: 10000 }).then((phoneNumber) => {
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
    cy.get(recentContactsDisposition).first().then((dispositionName) => {
      if(dispositionName.text().includes(disposition)) {
        expect(dispositionName.text()).to.equal(disposition);
        cy.readFile('cypress/fixtures/testData.json').then((data) => {
          data.flag = true;
          cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
        });
      }
      
    });
  
  }

  clickContactName(firstName, lastName) {
    cy.xpath(contactName(firstName, lastName)).click({force:true});
  }

  clickContactPhoneNumber() {
    cy.get(contactPhoneNumber).first().click();
  }

  verifyAgentStatus(status) {
    cy.get(agentStatus, { timeout: 80000 }).should('contain.text', status);
  }

  verifySoftphoneTitle(name) {
    cy.get(softphoneTitle).then((title) => {
      expect(title.text()).to.contain(name);
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
    cy.xpath(listThreeDotMenuBtn(listName)).click({force:true});
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
    cy.xpath(listDeleteBtn(listName)).first().click({force:true});
  }

  verifySoftphoneLinesNumber(no) {
    cy.get(softphoneLines).should('have.length', no);
  }

  verifyCallingStart() {
    cy.get(softphoneLines + '.bg-yellow',{timeout:60000}).should('be.visible');
  }

  enterRetryTime(time) {
    for (let i = 0; i < time; i++) {
      cy.xpath(retryTime('plus')).click({force:true});
      this.clickOnButton('Got it');
    }
   
  }

  enterMaxAttemptPerRecord(attemptNo) {
    cy.xpath(maxAttemptPerRecord).clear({force:true}).type(attemptNo);
  }

  clickContactThreeDotMenu(firstName, lastName) {
    cy.xpath(contactThreeDotMenu(firstName, lastName)).click();
  }

  clickContactLineCursor(pos) {
    cy.get(contactLineCursor(pos),{timeout:40000}).click({force:true});
  }

  verifyNumberDialing() {
    cy.get(softphoneLineContactName, { timeout: 40000 }).should('be.visible');
  }

  verifySoftphoneLineContactName(contactName) {
    cy.get('.contact-view-wrapper',{timeout:60000}).should('be.visible')
    this.clickContactLineCursor('right');
    cy.get(softphoneLineContactName, { timeout: 40000 }).then((lineText) => {
      for (let i = 0; i < lineText.length; i++) {
        if(lineText[i].textContent == contactName) {
          expect(lineText[i].textContent.trim()).to.contains(contactName);
        }
      }
    });
    cy.wait(2000);
    this.clickContactLineCursor('left');
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

  verifyCallRecordingIcon(campaignName, status) {
    cy.reload();
    ignoreSpeedTestPopup();
    cy.wait(1000);
    if (status === true) {
      cy.xpath(listenIcon(campaignName)).first().should('be.exist');
    } else if (status === false) {
      cy.xpath(listenIcon(campaignName)).should('not.exist');
    }
  }

  clickCallRecordingIcon(firstName, lastName, campaignName) {
    cy.xpath(callRecordingIcon(firstName, lastName,campaignName)).first().click({force:true});
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
    cy.xpath(dailyConnectsLimit).clear({force:true}).type(limit);
  }

  selectRetryTimeDropdown(unit) {
    cy.xpath(campBehviorDropdown('Retry Time')).click({force:true});
    this.selectOption(unit);
  }

  verifyCallConnectForCampaign(names, time, disposition) {
    for (let i = 0; i < 3; i++) {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        if (data.flag === true) {
          cy.log('Completed');
        } else {
          this.verifySoftphoneLineContactName(names);
          cy.wait(5000)
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
    cy.get(softphoneIcon,{timeout:60000}).click();
    cy.get(softphoneIcon).trigger('mouseout');
  }

  clickTableRefreshButton() {
    cy.get(tableRefreshBtn).click();
  }

  verifyPhoneRingingIcon() {
    dash.clickDialer();
    cy.get(phoneRingning, { timeout: 50000 }).should('be.visible');
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

  clickDashboardMenu() {
    cy.get(dashboard).click({ force: true });
  }

  closeSoftCloseBtn() {
    cy.wait(1000);
    cy.get('body').then($body => {
      if($body.find(softPhoneOpen).length) {
        cy.get(closeSoftBtn).click({force:true});
      }
    })
  }

  selectTimeoutDestination(destination) {
    cy.xpath(timeoutDestination).click();
    this.selectOption(destination);
  }

  closeRecordingDialog() {
    cy.get('body').then(($body) => {
      if($body.find(playerCampaignName).length) {
        this.clickPlayerCloseButton();
      }
    })
  }

  disconnectAvailableCall() {
    cy.wait(1000);
    cy.get(agentStatus).then((status) => {
      if(status.text().includes('On Call')){
        this.clickEndCallButton();
        this.verifyCallDispositionWindow
        this.selectCallDisposition('No Answer');
        this.clickOnButton('Done');
      }
    })
  }

  verifyPhoneHeaderValue(num, callType) {
    const number = '(' + num.substring(0,3)+ ') ' + num.substr(3,3) +'-'+ num.substr(-4);
    cy.xpath(PhoneValue('Phone')).should('contain.text', number);
    cy.xpath(PhoneValue('Phone')).should('contains.text', callType);
  }

  verifyCampaignExisting(camp) {
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if($body.text().includes(camp)) {
        this.clickThreeDotMenuBtn(camp);
        this.clickOnDropdownItem('Archive');
        this.verifySuccessToastMessage('Campaign Archived');
      }
    })
  }

  clickTermsConditionsCheckbox() {
    cy.xpath('//label[text()="Accept Terms and Conditions "]/span[@class="checkmark"]').click();
  }

  verifySoftphonePresenceLight() {
    cy.get(SoftphonePresenceHeader +' .agent__presence-light').should('be.visible');
  }

  verifySoftphonePresenceName(name) {
    cy.get(SoftphonePresenceHeader +' .agent__presence-name').should('contain.text', name);
  }

  verifySoftphonePresenceTime(time) {
    cy.get(SoftphonePresenceHeader).last().should('contain.text', time);
  }

  verifySoftphoneSwitchTab(tabs) {
    for (let i = 0; i < tabs.length; i++) {
      cy.xpath(softphoneBottomSwitchTab(tabs[i])).should('be.visible');
    }
  }

  verifySoftphoneCampSearchbox() {
    cy.get(softphoneSearchbox).should('be.visible');
  }

  searchCampaign(camp) {
    cy.get(softphoneSearchbox).realHover().clear().type(camp);
  }

  verifySoftphoneCampaignList() {
    cy.get(campList).should('be.visible');
  }

  verifySoftphoneCampaignBtn(btn) {
    cy.get(campList +' button').contains(btn).should('be.visible');
  }

  clickCampaignBtn(btn) {
    cy.get(campList +' button').contains(btn).click();
  }

  verifySoftphoneDialerModeIcon() {
    cy.xpath(softphoneDialerModeIcon).should('be.visible');
  }

  verifySoftphoneCampaignName() {
    cy.xpath(softphoneCampName('text-truncate')).should('be.visible');
  }

  verifyCampaignName(camp) {
    cy.xpath(softphoneCampName('text-truncate')).should('have.text', camp);
  }

  verifyContactAndDateIcon() {
    cy.xpath(softphoneCampName('light-grey-text me-1') + '/*[name()="svg"]').should('be.visible');
  }

  verifySoftphoneCampLeadsCount() {
    cy.xpath(softphoneCampName('light-grey-text me-2')).should('be.visible');
  }
  verifySoftphoneCampDate(text) {
    cy.xpath(softphoneCampName('light-grey-text font')).should('be.visible').and('contain.text', text);
  }

  clickSoftphoneAgentPresence() {
    cy.get(SoftphonePresenceHeader+ ' [data-icon="angle-down"]').first().click({force:true});
  }

  verifyStatusChangeWindow(cond) {
    if(cond == 'notExist') {
      cy.get(statusChangeWindow).should('not.exist');
    } else {
      cy.get(statusChangeWindow).should('be.visible');
    }
  }

  verifyAgentStatusList(list) {
    for (let i = 0; i < list.length; i++) {
      cy.get(options).then((status) => {
        for (let i = 0; i < status.length; i++) {
          if(status[i].textContent === list[i]) {
            cy.contains(list[i]).scrollIntoView().should('be.visible');
          }
        }
      });
    }
  }

  clickSoftphoneSwitchTab(tab) {
    cy.xpath(softphoneBottomSwitchTab(tab)).click({force:true});
  }

  ClickBackFromStatusChangeWindow() {
    cy.get('.rounded-top .cursor_pointer').click();
  }

  verifySoftphoneSettingVisible() {
    cy.get('.softphone-settings').should('be.visible');
  }

  verifyCallRingtoneDropdown(header) {
    cy.xpath(softphoneSettingHeader(header) + '[contains(@class,"ss-select ")]').should('be.visible');
  }

  verifySpeakerIcon(header) {
    cy.xpath(softphoneSettingHeader(header)+ '[@data-icon="volume-high"]').should('be.visible');
  }

  verifyPlayConnectToggleSwitch(header) {
    cy.xpath(softphoneSettingHeader(header) + '[@class="switch disabled"]').should('be.visible');
  }
  
  verifySoundTrackingEnabled(header) {
    cy.xpath(softphoneSettingHeader(header) + '[@class="checked-track"]').should('be.visible');
  }

  selectCallRingtone(header, opt) {
    cy.xpath(softphoneSettingHeader(header)+ '[contains(@class,"ss-select ")]').click();
    this.selectOption(opt);
  }

  clickOnRingtoneSpeaker(header) {
    cy.xpath(softphoneSettingHeader(header)+ '[@data-icon="volume-high"]').click();
  }

  verifyDisabledStatus(status) {
    cy.get(statusChangeWindow + ' .agent__presence-name').contains(status).should('have.class','disabled')
  }

  clickDialerBackspace(back) {
    for (let i = 0; i < back; i++) {
      cy.get('[data-icon="delete-left"]').click();
    }
  }

  UploadFileUsingCampaign(file) {
    this.clickOnButton('Upload Contacts');
    contact.uploadFileForContact(file);
    this.selectMappingFields([
      'Phone Number',
      'First Name',
      'Last Name',
      'Email',
      'Zip',
      'Address',
      'Country',
      'State',
      'City',
    ]);
    cy.wait(1000)
    contact.clickNextButton();
    contact.clickSubmitButton();
    contact.verifyImportStartedToast();
    cy.wait(1000)
    contact.verifyImportContactCompleteToast();
    this.clickOnButton('Save');
    this.verifySuccessToastMessage('Campaign Saved');
    cy.reload();
    ignoreSpeedTestPopup();
  }

  mouseoverOnCampaignType() {
    cy.xpath(softphoneDialerModeIcon).realHover();
  }

  mouseoverOnLongCampaignName(tab) {
    if(tab === 'PhoneTab') {
      cy.get('.bg-light-blue .d-inline-block').last().realHover();
    } else {
      cy.xpath(softphoneCampName('text-truncate')).realHover();
    }
  }

  verifyTooltip(tooltip) {
    cy.get('.tooltip-inner').contains(tooltip).should('be.visible');
  }

  scrollSoftphoneCampaign(name) {
    cy.get(campList).scrollTo('bottom');
  }

  CampaignNameVisiblity(name, cond) {
    if('Invisible' === cond) {
      cy.get(campListName).contains(name).should('not.be.visible');
    } else {
      cy.get(campListName).contains(name).should('be.visible');
    }
  }

  verifyCallMenus(name) {
    cy.get(callMenu).contains(name).should('be.visible');
  }

  clickOnOutsideElement() {
    cy.get(SoftphonePresenceHeader).realClick({force:true});
  }

  mouseHoverOnSoftphoneDialer() {
    cy.get(SoftphonePresenceHeader).realHover({force:true});
  }

  verifySoftphoneCloseCursor() {
    cy.get(closeSoftBtn).should('be.visible');
  }

  verifySoftphoneVisibility(cond) {
    if(cond === 'Invisible') {
      cy.get(softphone).should('not.be.visible');
    } else {
      cy.get(softphone).should('be.visible');
    }
  }

  closeSoftphone() {
    cy.get(closeSoftBtn).click({force:true});
  }

  verify_MyCaller_ID() {
    cy.get('footer .white-space-pre').should('be.visible');
  }

  verifyCallerIdNumber(number) {
    cy.get('footer .white-space-pre').last().should('have.text', number); 
  }

}
