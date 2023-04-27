import { ignoreSpeedTestPopup } from '../Utils';
import Contacts from './Contacts';
import Dashboard from './Dashboard';
import Dialer from './Dialer';
import PhoneNum from './PhoneNum';
import User from './User';

const campaignsMenu = 'a[title="Campaigns"]';
const addCampaign = '//button[text()="NEW CAMPAIGN"]';
const inputName = '.active input[name="name"]';
const switchBar = 'span.switch';
const radioBtn = (mode) =>
  "//label[input[@type='radio']][contains(.,'" +
  mode +
  "')]//span[@class='checkmark']";
const callerIdDropdown =
  "//label[text()='Caller ID']/ancestor::div[contains(@class,'row')]//div[contains(@class,'ss-select-control')]";
const nextArrow = '.collapse.show .btn-primary.circle';
const callerIdDrpdwn =
  '//div[contains(text(),"individual numbers")]/following-sibling::div/div[contains(@class,"ss-select")]';
const agentsDrpdwn =
  '//div[contains(@class,"ss-select-control")]/span[contains(text(),"Agents")]';
const createCampBtn = '//button[contains(text(),"SAVE")]';
const statusDrpdwn = (status) => '.campaignForm span[title="' + status + '"]';
const dropdownOptions = '.ss-select-group-items';
const pausedDrpdwn = '.campaignForm span[title="Paused"]';
const campaignHeader = '.campaignsTop';
const searchBox = '.search-box';
const Agent = 'span[title="Agent"]';
const contactsCountSlider = '.slider-control';
const campaignHeadings = '.resizable-table-thead .tr .th';
const archiveCampaignButton =
  "//div[contains(@class,'show')]//a[text()='Archive']";
const statusArchived = "//div[text()='Archived']";
const recycleMenu = "a[title='Recycle']";
const timeZoneDropDown = "span[title*='Eastern Time']";
const maxLine = "//label[text()='Max Lines Per Agent']/parent::div//input";
const callTypeAutoAnswer = "//label[text()='Auto Answer']";
const callTypeBeepOnce = "//label[text()='Beep Once']";
const callTypeRingingSound = "//label[text()='Ringing Sound']";
const AbandonmentTimeout =
  "//label[text()='Abandonment Timeout']/parent::div/div";
const callOptions = (option) => "//label[text()='" + option + "']//span";
const AnswerMachineDetectionDisable =
  "//label[text()='Answering Machine Detection']/parent::div/following-sibling::div/label[text()='Disable']/span";
const callRecordingEnable =
  "//label[text()='Call Recording']/parent::div/following-sibling::div/label[text()='Enable']/span";
const callRecordingDisable =
  "//label[text()='Call Recording']/parent::div/following-sibling::div/label[text()='Disable']/span";
const callerIDGroup = '.row-callerid .ss-select:not(.multiple)';
const callerIDNumber = '.row-callerid .multiple';
const callingHours = `//label[text()="Calling Hours"]/following-sibling::div`;
const MaxAttempts = "//label[text()='Max Attempts Per Record']/parent::div/div";
const simultaneousDials =
  "//label[text()='Simultaneous Dials Per Agent']/parent::div/div";
const RetryTime =
  "//label[text()='Retry Time']/parent::div/following-sibling::div";
const AgentScript = '//label[text()="Agent Script"]/ancestor::div[@class="row"]';
const AgentScriptCreateNew = '.row-agentscript button';
const contactLists = "//label[text()='Contact Lists']/parent::div/div";
const assignAgent =
  "//label[text()='Assign Agents']/ancestor::div[@class='row']/following-sibling::div";
const FedralDNCYES =
  "//label[text()='Scrub Federal DNC']/parent::div/following-sibling::div/label[text()='Yes']/input";
const FedralDNCNo =
  "//label[text()='Scrub Federal DNC']/parent::div/following-sibling::div/label[text()='No']/input";
const companyDNCYES =
  "//label[text()='Scrub Company DNC']/parent::div/following-sibling::div/label[text()='Yes']/input";
const companyDNCNO =
  "//label[text()='Scrub Company DNC']/parent::div/following-sibling::div/label[text()='No']/input";
const CancelButton = "//button[text()=' CANCEL']";
const RecStartEndDate = `//label[text()="Start and End Date"]/following-sibling::div//div[@class="date-picker"]`;
const RecEndDate = "//label[text()='End Date']/parent::div/div";
const RecCallResult = `//label[text()="Call Results"]/following-sibling::div[contains(@class,"ss-select")]`;
const RecUseList = "//label[text()='Use Lists From']/parent::div/div";
const RecCampaignName = "input[name='newcampaignname']";
const RecSkipLeadsCheckbox = "input[name='skip_leads']";
const RecSkipContacts = "input[name='skip_dnr']";
const RecSaveCampaign = "//button[contains(text(),'SAVE CAMPAIGN')]";
const Alert = '.alert';
const PauseStatus = "//div[text()='Paused']";
const ActiveStatus = "//div[text()='Active']";
const ErrorMessage = '.error-msg';
const scheduleTable = '.schedule-table';
const scheduleCancelButton =
  "//div[@class='modal-footer']//button[text()=' CANCEL']";
const scheduleCheckmark = `//label[text()="Sunday"]//span[@class="checkmark"]`;
const schedule = `//label[text()='Sunday']/ancestor::div[contains(@class,"row")]//div[contains(@class,'ss-select') and not(contains(@class,'fakeinput'))]`;
const checkSelectAll =
  "//div[@class='schedule-table']//div[contains(@class,'ss-select') and not(contains(@class,'fakeinput'))]";
const selectAllCheckbox =
  "//label[text()='Select All']/parent::div//span[@class='checkmark']";
const applyToAll = "//span[text()='Apply to All']";
const checkApply = "//strong[text()='Sun']";
const applyButton = "//button[text()=' APPLY']";
const newScriptPopUp = '.modal-body';
const contactListDropdown = '.ss-select-dropdown';
const campaignSetting = '.tr .dropdown img';
const campaignSettingOptions = '.show .dropdown-item';
const FirstCampaignMenuButton =
  '//span[text()="FirstCampaign"]/ancestor::div[@class="tr"]/descendant::img[@alt="Menu"]';
const campaignEditButton = "//a[text()='Edit Campaign']";
const campaignChange =
  '//span[text()="FirstCampaign"]/ancestor::div[@class="td"]/following-sibling::div[1]';
const callerIdError = '.ss-select.error';
const campaign = '.main_sec .ss-select:not(.multiple)';
const options = '.ss-select-option';
const recycleCallResult =
  '//label[text()="Call Results"]/following-sibling::div[contains(@class,"ss-select")]';
const questionIcon = 'img[src*="question"]';
const useListsFrom =
  '//label[text()="Use Lists From"]/following-sibling::div[contains(@class,"ss-select")]';
const newCampaignName = 'input[name="newcampaignname"]';
const saveCampaign = '.wizard-buttons button[type="submit"]';
const toast = '.Toastify__toast-body';
const campaignTable = '.resizable-table-tbody';
const callresultValues =
  '//div[label[text()="Call Results"]]//following-sibling::div//span[@class="ss-select-value"]';
const delCallResult = (callResultName) =>
  `//span[span[text()="${callResultName}"]]/following-sibling::span[@class="ss-select-value-delete"]`;
const status =
  '//div[contains(@class,"expanded")]/following-sibling::div//div[text()="Status"]';
const recycleOption = '//a[@class="dropdown-item" and text()="Recycle"]';
const recycleCampaignMenuBtn = (campaignName) =>
  `//span[text()="${campaignName}"]/ancestor::div[@class="tr"]//div[@class="dropdown"]//img`;
const leadSheetDropdown = `//div[label[@class="form-label" and text()="Lead Sheet"]]/following-sibling::div[div[contains(.,"Select Lead Sheet")]]`;
const tableRefreshBtn = 'span[title="Refresh"]';
const campaignStatus = (campaignName) =>
  `//span[text()="${campaignName}"]//ancestor::div[@class="tr"]//div[contains(@class,"progress-status")]/following-sibling::span`;
const softphoneNextLead = 'Next Lead';
const softphoneIcon = '.nav-item .softphone-icon';
const dropdownItem = '.show.dropdown-menu .dropdown-item';
const modalTitle = '.modal-content .modal-title';
const modal = '.modal-content';
const modalCloseBtn = '.modal-content .close_icon';
const changeLogItems = '.change-log__campaign-item .change-log__campaign-title';
const ringTimeDurationDropdown = `//label[text()="Ring Time Duration"]/following-sibling::div//div[contains(@class,"ss-select-control")]`;

const dialingMode = (modeName) =>
  `//h2[@class="campaign-card__radio-block__title"][text()="${modeName} Dialer"]/ancestor::label//span[@class="checkmark"]`;
const cardDropdowns = (cardName) =>
  `//div[@class="campaign-card active"]/h2[@class="campaign-card__title"][text()="${cardName}"]/ancestor::div[contains(@class,"campaign-card")]//div[contains(@class,"ss-select-control")]`;
const callResultsDropdown = `//label[text()="Call Results"]/ancestor::div[@class="row"]//div[contains(@class,"ss-select-control")]`;
const advanceConfiguration = '.campaign-expander';
const callOrder = (order) =>
  `//h2[@class="campaign-card__title"][text()="Calls Order"]/following-sibling::div//input[@value="${order}"]`;
const callConnectType = (type) =>
  `//h2[@class="campaign-card__title"][text()="Call Connect Type"]/following-sibling::div//h2[contains(.,"${type}")]`;
const dialingBehaviour = (fieldName) =>
  `//label[text()="${fieldName}"]//following-sibling::div[contains(@class,"number-editor")]//input`;
const retryTimeInput =
  '//label[text()="Retry Time"]//following-sibling::div//div[contains(@class,"number-editor")]//input';
const retryTimeplusIcon =
  '//label[text()="Retry Time"]//following-sibling::div//div[contains(@class,"number-editor")]//img[@src="/img/number-editor-plus.svg"]';
const retryTimeDropdown =
  '//label[text()="Retry Time"]//following-sibling::div//div[contains(@class,"ss-select-control")]';
const tooltip = '.question-tooltip';
const recycleIcon = (recycleCamp)  => `//span[text()="${recycleCamp}"]/preceding-sibling::*[@class="recycle-icon-svg"]`;
const recycleTooltip = '//div[@class="tooltip-inner"]//div[@class="text-start text-nowrap"]';
const campToolTip = (name) => `//label[text()="${name}"]/parent::*//span[contains(@class,"question-tooltip")]/img`;
const LabelDropdown = (label) => `//label[text()="${label}"]/following-sibling::div//span`;
const campaignCardRadioBtn = (campCard,radioBtn) => `//div[h2[@class="campaign-card__title"][text()="${campCard}"]]//div[h2[text()="${radioBtn}"]]/following-sibling::span`;
const campaignCardCheckbox = (campCard) => `//div[h2[@class="campaign-card__checkbox-block__title"][text()="${campCard}"]]/following-sibling::span`;
const campaignName = (name) => `//span[@class="campaign-name-table"][text()="${name}"]`;
const dialPadNumber = '.keyPad-digits-display input';
const tableList = (index) => `.resizable-table-tbody div.td:nth-of-type(${index})`;
const deleteSelectedDropdown = (value) => `//span[text()="${value}"]/following-sibling::span[@class="ss-select-value-delete"]`;
const activeCampCard = '.campaign-card.active';
const termCondition = '//label[text()="Accept Terms and Conditions "]/span[@class="checkmark"]';
const draftIcon = '.progress-status.draft';

const addUser = new User();
const dial = new Dialer();
const dash = new Dashboard();
const addCont = new Contacts();
const addNum = new PhoneNum();
let arrList = [];

export default class Campaign {
  clickCampaignMenu() {
    cy.get(campaignsMenu).first().click({ force: true });
  }

  clickAddNewCampaign() {
    cy.xpath(addCampaign).click({force:true});
  }

  enterName(name) {
    cy.get(inputName).wait(500).scrollIntoView().type(name, { delay: 2000, force:true });
  }

  enterCampaignName(name) {
    cy.get(inputName)
      .wait(500)
      .clear({force:true})
      .scrollIntoView()
      .type(name, { delay: 2000 });
      cy.get('body').then(($body) => {
        if($body.find('#pendo-guide-container').length) {
          cy.contains('Next').click();
        }
      })
  }

  verifyCampaignNameField(cond) {
    if('not.exist' === cond) {
      cy.get(inputName).should(cond);
    } else {
      cy.get(inputName).should('be.visible');
    }
  }

  enableAdvancedSwitchBar() {
    cy.get(switchBar).click();
  }

  selectDialingModeOption(dialMode) {
    cy.xpath(radioBtn(dialMode)).click();
  }

  clickNextCircleArrow() {
    cy.get(nextArrow).click({ force: true });
  }

  selectCallerId(number) {
    //cy.xpath(radioBtn(callerMode)).click();
    cy.xpath(callerIdDropdown).click();
    cy.get('.ss-select-option').then((el) => {
      for (let i = 0; i < el.length; i++) {
        if (el[i].textContent.trim().endsWith(number)) {
          cy.get(el[i]).click({ force: true });
          break;
        }
      }
    });
  }

  selectAgentsDrpdwn(agentMode, agnts) {
    cy.xpath(radioBtn(agentMode)).click();
    cy.xpath(agentsDrpdwn).click();
    cy.get(dropdownOptions)
      .contains(agnts)
      .then((option) => {
        option[0].click();
      });
  }

  selectCallResultsOption(callRslts) {
    cy.get('.row-calldisposition .ss-select').click();
    cy.get(options).then((option) => {
      for (let i = 0; i < callRslts.length; i++) {
        for (let j = 0; j < option.length; j++) {
          if (option[j].textContent.trim() === callRslts[i]) {
            cy.log(option[j].textContent.trim());
            option[j].click();
            break;
          }
        }
      }
    });
    cy.get('.row-calldisposition .ss-select').click();
  }

  clickCreateCampButton() {
    cy.xpath(createCampBtn).click({ force: true });
  }

  verifyAddedCampaign(camp) {
    cy.xpath(`//span[text()="${camp}"]//ancestor::div[@class="tr"]`, {
      timeout: 10000,
    })
      .scrollIntoView()
      .should('be.visible');
  }

  verifyUnarchievedCampaign(camp) {
    cy.reload();
    ignoreSpeedTestPopup();
    cy.xpath(`//span[text()="${camp}"]//ancestor::div[@class="tr"]`, {
      timeout: 10000,
    }).should('be.visible');
  }

  clickToSelectPasused(val) {
    cy.get(statusDrpdwn(val)).click({force:true});
  }

  verifyLeadSheetDropdown() {
    cy.xpath(leadSheetDropdown).should('be.visible');
  }

  clickToSelectActive() {
    cy.get(pausedDrpdwn).click({force:true});
  }

  clickToSelectStatus(val) {
    cy.get(statusDrpdwn(val)).click({force:true});
  }

  changeCampaignStatusByDrpdwn(status) {
    cy.get(dropdownOptions)
      .contains(status)
      .then((option) => {
        option[0].click();
      });
  }

  changesCampaignStatus(campName, status) {
    cy.xpath(
      `//span[text()="${campName}"]/ancestor::div[@class="tr"]//div[contains(@class,"${status}")]`,
      { timeout: 30000 }
    )
      .scrollIntoView()
      .click({force:true});
  }

  verifyCampaignNotVisible(camp) {
    cy.xpath(
      '//table[contains(@class,"table")]//td[contains(.,"' + camp + '")]',
      { timeout: 5000 }
    ).should('not.be.visible');
  }

  verifyCampaignHeaderElement(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(campaignHeader).should('contain.text', element[i]);
    }
  }

  verifySearchBox() {
    cy.get(searchBox).should('be.visible');
  }

  verifyStatusBox(val) {
    cy.get(statusDrpdwn(val)).should('be.visible');
  }

  verifyAgentBox() {
    cy.get(Agent).should('be.visible');
  }

  verifyContactsCountSlider() {
    cy.get(contactsCountSlider).should('be.visible');
  }

  verifyAddCompaignButton() {
    cy.xpath(addCampaign).should('be.visible');
  }

  verifyCampaignHeaderHedings(element) {
    cy.get(campaignHeadings).then((headings) => {
      for (let i = 0; i < element.length; i++) {
        expect(headings.text().replace(/\s+/g, ' ')).to.contains(element[i]);
      }
    });
  }

  clickTableRefreshBtn() {
    cy.get(tableRefreshBtn).click();
  }

  clickEditCampaign(campaignName) {
    cy.xpath(
      `//span[text()="${campaignName}"]/ancestor::div[@class="tr"]//div[@class="dropdown"]//img`
    ).click({force:true});
  }

  clickRecycleCampaignMenuBtn(name) {
    cy.xpath(recycleCampaignMenuBtn(name)).click({force:true});
  }

  clickRecycleOption() {
    // cy.xpath(recycleOption).first().click();
    cy.get('.dropdown-menu.show .dropdown-item').then((el) => {
      for (let i = 0; i < el.length; i++) {
        if (el[i].textContent.trim() === 'Recycle') {
          el[i].click();
        }
      }
    });
  }

  clickEditBtn() {
    cy.xpath(campaignEditButton).click();
  }

  clickArchiveCampaignButton() {
    cy.wait(500).xpath(archiveCampaignButton).first().click();
  }

  handleAlertForDelete() {
    cy.on('	window:alert', (str) => {
      expect(str).to.equal('Delete user?');
    });
    cy.on('window:confirm', () => true);
  }

  verifyArchivedCampaign(campaignName, check) {
    cy.xpath('//*[text()="' + campaignName + '"]').should(check);
  }

  clickStatusArchived() {
    cy.xpath(statusArchived).click();
  }

  clickRecycleMenu() {
    cy.get(recycleMenu).click({ force: true });
  }

  searchCampaign(campname) {
    cy.get(searchBox).clear({force:true}).type(campname);
  }

  verifyDialModeDropdown() {
    cy.xpath(radioBtn('Preview Dialer')).should('be.visible');
    cy.xpath(radioBtn('Predictive Dialer')).should('be.visible');
  }

  newCampaignDropdown(dropdownName) {
    for (let i = 0; i < dropdownName.length; i++) {
      cy.xpath(
        "//label[text()='" + dropdownName[i] + "']/parent::div/div"
      ).should('be.visible');
    }
  }

  verifyCallTypeAutoAnswer() {
    cy.xpath(callTypeAutoAnswer).scrollIntoView().should('be.visible');
  }

  verifyCallTypeBeepOnce() {
    cy.xpath(callTypeBeepOnce).should('be.visible');
  }

  verifyCallTypeRingingSound() {
    cy.xpath(callTypeRingingSound).scrollIntoView().should('be.visible');
  }

  verifyCallerIdError() {
    cy.get(callerIdError).should('be.visible');
  }

  verifyCallOptions(options) {
    for (let i = 0; i < options.length; i++) {
      cy.xpath(callOptions(options[i])).should('be.visible');
    }
  }

  verifyAnswerMachineDisableButton() {
    cy.xpath(AnswerMachineDetectionDisable).should('be.visible');
  }

  verifyCallRecordingEnable() {
    cy.xpath(callRecordingEnable).should('be.visible');
  }

  verifyCallRecordingDisable() {
    cy.xpath(callRecordingDisable).should('be.visible');
  }

  verifyCallerID(caller) {
    for (let i = 0; i < caller.length; i++) {
      cy.xpath(radioBtn(caller[i])).should('be.visible');
    }
  }

  verifyCallerIDNumber() {
    cy.get(callerIDNumber).should('be.visible');
  }

  verifyCallingHours() {
    cy.xpath(callingHours).should('be.visible');
  }

  verifyMaxAttempts() {
    cy.xpath(MaxAttempts).should('be.visible');
  }

  verifyRetryTime() {
    cy.xpath(RetryTime).should('be.visible');
  }

  verifySimulataneousDials() {
    cy.xpath(simultaneousDials).should('be.visible');
  }

  verifyAgentScript() {
    cy.xpath(AgentScript).should('be.visible');
  }

  verifyAgentScriptCreateNewButton() {
    cy.get(AgentScriptCreateNew).should('be.visible');
  }

  verifyContactList() {
    cy.xpath(contactLists).should('be.visible');
  }

  verifyCallOrder(order) {
    for (let i = 0; i < order.length; i++) {
      cy.xpath(callOptions(order[i])).should('be.visible');
    }
  }

  verifyAssignAgent() {
    cy.xpath(assignAgent).should('be.visible');
  }

  verifyFedralDNCYes() {
    cy.xpath(FedralDNCYES).should('exist');
  }

  verifyFedralDNCNo() {
    cy.xpath(FedralDNCNo).should('exist');
  }

  verifyCompanyDNCYes() {
    cy.xpath(companyDNCYES).should('exist');
  }

  verifyCompanyDNCNo() {
    cy.xpath(companyDNCNO).should('exist');
  }

  verifyCancelButton() {
    cy.xpath(CancelButton).should('exist');
  }

  verifyRecStartEndDate() {
    cy.xpath(RecStartEndDate).should('be.visible');
  }

  verifyRecCallResult() {
    cy.xpath(RecCallResult).should('be.visible');
  }

  verifyRecUseList() {
    cy.xpath(RecUseList).should('be.visible');
  }

  verifyRecCampaignName() {
    cy.get(RecCampaignName).should('be.visible');
  }

  verifyRecSkipLeads() {
    cy.get(RecSkipLeadsCheckbox).should('exist');
  }

  verifyRecSkipContact() {
    cy.get(RecSkipContacts).should('exist');
  }

  verifyRecSaveCampaignButton() {
    cy.xpath(RecSaveCampaign).should('be.visible');
  }

  verifyAlert() {
    cy.get(Alert).should('be.visible');
  }

  clickCampaignName(camp) {
    cy.xpath(`//span[text()="${camp}"]`).click();
  }

  clickPauseStatus() {
    cy.xpath(PauseStatus).click();
  }

  clickActiveStatus() {
    cy.xpath(ActiveStatus).click();
  }

  verifyErrorMessage(text) {
    cy.get(ErrorMessage).should('contain.text', text);
  }

  clickCallingHours() {
    cy.xpath(callingHours).click({force:true});
  }

  verifyScheduleTable() {
    cy.get(scheduleTable).should('be.visible');
  }

  clickScheduleCancelButton() {
    cy.xpath(scheduleCancelButton).click({force:true});
  }

  clickScheduleCheckmark() {
    cy.xpath(scheduleCheckmark).click();
  }

  verifyScheduleCheckbox(attr) {
    cy.xpath(schedule).first().should(attr, 'readonly');
  }

  clickSelectAllCheckbox() {
    cy.xpath(selectAllCheckbox).click();
  }

  verifySelectAll(attr) {
    cy.wait(1000);
    cy.xpath(checkSelectAll).should(attr, 'readonly');
  }

  clickApplyToAllButton() {
    cy.xpath(applyToAll).click();
  }

  VerifyApplyFunctionality() {
    cy.xpath(checkApply).should('be.visible');
  }

  clickApplyButton() {
    cy.xpath(applyButton).click();
  }

  verifyScheduleTableNotVisible() {
    cy.get(scheduleTable).should('not.exist');
  }

  clickAgentScriptCreateNewButton() {
    cy.get(AgentScriptCreateNew).click();
  }

  verifyAgentScriptPopUp() {
    cy.get(newScriptPopUp).should('be.visible');
  }

  verifyContactListDropdown() {
    cy.get(contactListDropdown).should('be.visible');
  }

  clickListDropdown(cardName) {
    cy.xpath(cardDropdowns(cardName)).click({force:true});
  }

  clickCampaignSetting() {
    cy.get(campaignSetting).first().click();
  }

  verifyCampaignSettingOptions(option) {
    for (let i = 0; i < option.length; i++) {
      cy.get(campaignSettingOptions).should('contain.text', option[i]);
    }
  }

  clickSaveCampaign() {
    cy.xpath(RecSaveCampaign).click();
  }

  clickFirstCampaignMenuButton() {
    cy.xpath(FirstCampaignMenuButton, {timeout:60000}).click();
  }

  clickEditCampaignNew() {
    cy.xpath(campaignEditButton).first().click({force:true});
  }

  verifyCampaignChange(mode) {
    cy.xpath(campaignChange, {timeout:60000}).trigger('mouseover');
    cy.xpath(`//div[@class="tooltip-inner"][text()="${mode}"]`).should('be.visible');
  }

  selectLeadSheetDropdown(leadsheet) {
    cy.xpath(cardDropdowns('Lead Sheet')).scrollIntoView().click({force:true});
    this.selectOptions(leadsheet);
  }

  verifyLeadSheets(optionName) {
    cy.xpath(cardDropdowns('Lead Sheet')).scrollIntoView().click({force:true});
    cy.get(options).then((opt) => {
      for (let i = 0; i < opt.length; i++) {
        if ((opt[i].textContent.trim() === optionName)) {
          expect((opt[i].textContent.trim())).to.equal(optionName);
          break;
        }
      }
    });
  }

  selectOptions(optionName) {
    cy.get(options).then((opt) => {
      for (let i = 0; i < opt.length; i++) {
        if (
          (opt[i].textContent.trim() === optionName)
        || (opt[i].textContent.trim().includes(optionName))
        ) {
          cy.get(opt[i]).click({ force: true });
          break;
        }
      }
    });
  }

  selectCamapignToRecycle(campaignName) {
    cy.get(campaign).click();
    this.selectOptions(campaignName);
  }

  selectRecycleCallResult(callResult) {
    cy.xpath(recycleCallResult).click();
    //this.selectOptions(callResult);
    this.clickQuestionIcon();
  }

  clickQuestionIcon() {
    cy.get(questionIcon).first().click();
  }

  selectUseListsFrom(listName) {
    cy.xpath(useListsFrom).click();
    this.selectOptions(listName);
    this.clickQuestionIcon();
  }

  enterNewCampaignName(name) {
    cy.get(newCampaignName).wait(1000).clear({force:true}).type(name);
  }

  removeCheckBox() {
    cy.get('.checkmark').then((el) => {
      for (let i = 0; i < el.length; i++) {
        el[i].click();
        cy.wait(1000);
      }
    });
  }

  clickRecycleSaveCampaign() {
    cy.get(saveCampaign, { timeout: 20000 }).should('be.enabled').click();
  }

  verifyToast(message) {
    cy.get(toast,{timeout:60000}).should('contain.text', message);
  }

  verifyAddedRecycleCampaign(campaignName) {
    cy.get(campaignTable,{timeout:30000}).should('contain.text', campaignName);
  }

  verifyCallResultValues(value) {
    cy.xpath(callresultValues).should('have.length', value);
  }

  deleteCallResults(callRslt) {
    for (let i = 0; i < callRslt.length; i++) {
      cy.xpath(delCallResult(callRslt[i])).scrollIntoView().click();
    }
  }

  clickUnarchiveCampaign(arc) {
    cy.xpath(
      `//span[text()="${arc}"]/ancestor::div[@class="tr"]//*[name()="svg"][@data-icon="undo"]`
    )
      .first()
      .scrollIntoView()
      .click({ force: true });
  }

  clickStatus() {
    cy.xpath(status).click();
  }

  verifyCampaignStatus(campaignName, status) {
    cy.xpath(campaignStatus(campaignName), { timeout: 10000 }).should(
      'contain.text',
      status
    );
  }

  clickSoftphoneNextLead() {
    cy.get('.dialer-keypad-digit-display').contains(softphoneNextLead).click();
    //cy.get(softphoneNextLead).click();
  }

  clickSoftphoneIcon() {
    cy.get(softphoneIcon).click();
  }

  clickDropdownItem(itemName) {
    cy.get(dropdownItem).then((items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent.trim() === itemName) {
          cy.get(items[i]).click();
          break;
        }
      }
    });
  }

  verifyDialogOpen() {
    cy.get(modal).should('be.visible');
  }

  verifyModalTitle(title) {
    cy.get(modalTitle).should('have.text', title);
  }

  clickModalCloseBtn() {
    cy.get(modalCloseBtn).click();
  }

  verifyChangeLogItemsText(changeLog) {
    cy.get(changeLogItems).then((itemText) => {
      expect(itemText.text().trim().replace(/\s+/g, ' ')).to.contain(changeLog);
    });
  }

  clickRingTimeDurationDropdown() {
    cy.xpath(ringTimeDurationDropdown).click();
  }

  waitForLoader() {
    cy.get('object.loader').should('not.exist');
  }
  selectDialingMode(modeName) {
    this.waitForLoader();
    cy.wait(1000);
    cy.xpath(dialingMode(modeName)).click({force:true});
  }

  verifyDialingMode() {
    cy.xpath(dialingMode('Predictive')).should('be.visible');
    cy.xpath(dialingMode('Preview')).should('be.visible');
  }

  selectAgentToAssign(agentName) {
    cy.xpath(cardDropdowns('Agents')).click();
    this.selectOptions(agentName);
  }

  verifyAgentToAssignDropdown(cond) {
    if('not.exist' === cond) {
      cy.xpath(cardDropdowns('Agents')).should(cond);
    } else {
      cy.xpath(cardDropdowns('Agents')).should('be.visible');
    }
  }

  selectPhoneNumberToAssign(phoneNumber) {
    cy.xpath(cardDropdowns('Phone Numbers')).click({force:true});
    this.selectOptions(phoneNumber);
  }

  verifyPhoneNumberToAssignDropdown(cond) {
    if('not.exist' === cond) {
      cy.xpath(cardDropdowns('Phone Numbers')).should(cond);
    } else {
      cy.xpath(cardDropdowns('Phone Numbers')).should('be.visible');
    }
  }

  selectContactLists(listName) {
    cy.xpath(cardDropdowns('Contact Lists')).click();
    //cy.get('body').type('{enter}');
    //cy.xpath(cardDropdowns('Contact Lists')).click();
    this.selectOptions(listName);
  }

  verifyContactListDropdown() {
    cy.xpath(cardDropdowns('Contact Lists')).should('be.visible');
  }

  selectCallResults(callResults) {
    cy.xpath(callResultsDropdown).click({force:true});
    cy.get(options).then((option) => {
      for (let i = 0; i < callResults.length; i++) {
        for (let j = 0; j < option.length; j++) {
          if (option[j].textContent.trim() === callResults[i]) {
            cy.log(option[j].textContent.trim());
            cy.contains(option[j].textContent.trim()).click();
            break;
          }
        }
      }
    });
    // cy.xpath(callResultsDropdown).click();
    this.clickQuestionTooltip();
  }

  verifyCallResultsDropdown() {
    cy.xpath(callResultsDropdown).should('be.visible');
  }

  clickAdvancedConfiguration() {
    cy.get(advanceConfiguration).click({force:true});
  }

  selectCallsOrder(order) {
    cy.xpath(callOrder(order)).click({ force: true });
  }

  verifyCallsOrder() {
    cy.xpath(callOrder('adaptive')).should('exist');
    cy.xpath(callOrder('highestfirst')).should('exist');
    cy.xpath(callOrder('lowestfirst')).should('exist');
  }

  selectCallConnectType(type) {
    cy.xpath(callConnectType(type)).click({force:true});
  }

  verifyCallConnectType(cond) {
    if(cond === 'not.exist') {
      cy.xpath(callConnectType('Automatic Answer')).should(cond);
      cy.xpath(callConnectType('Manual Answer')).should(cond);
    } else {
      cy.xpath(callConnectType('Automatic Answer')).should('be.visible');
      cy.xpath(callConnectType('Manual Answer')).should('be.visible');
    }
  }

  enterSimultaneousDials(no) {
    cy.xpath(dialingBehaviour('Simultaneous Dials p/Agent')).clear({force:true}).type(no);
  }

  verifySimultaneousDialsField(cond) {
    if(cond === 'not.exist') {
      cy.xpath(dialingBehaviour('Simultaneous Dials p/Agent')).should(cond);
    } else {
      cy.xpath(dialingBehaviour('Simultaneous Dials p/Agent')).should('be.visible');
    }
  }

  enterRingTimeDuration(time) {
    cy.xpath(dialingBehaviour('Ring Time Duration, sec')).clear().type(time);
  }

  verifyRingTimeDuration() {
    cy.xpath(dialingBehaviour('Ring Time Duration, sec')).should('be.visible');
  }

  enterAbandonedTimeout(time) {
    cy.xpath(dialingBehaviour('Abandonment Timeout, sec')).clear({force:true}).type(time);
  }

  verifyAbandonedTimeout() {
    cy.xpath(dialingBehaviour('Abandonment Timeout, sec')).should('be.visible');
  }

  enterMaxCallsPerDay(no) {
    cy.xpath(dialingBehaviour('Max Calls per Day')).clear().type(no);
  }

  verifyMaxCallsPerDay() {
    cy.xpath(dialingBehaviour('Max Calls per Day')).should('be.visible');
  }

  enterMaxAttempts(field, no) {
    if(field === 'Max Attempts Per Record') {
      cy.xpath(dialingBehaviour(field)).clear({force:true}).type(no);
    } else {
      cy.xpath(`//label[text()="${field}"]//following-sibling::div//div[contains(@class,"number-editor")]//input`).clear({force:true}).type(no,{force:true});
    }
  }

  verifyMaxAttempts() {
    cy.xpath(dialingBehaviour('Max Attempts Per Record')).should('be.visible');
  }

  enterRetryTime(duration,) {
    for (let i = 0; i < duration; i++) {
      cy.xpath(retryTimeplusIcon).click({force:true});
      this.clickOnButton('Got it');
    }
  }

  verifyRetryTime() {
    cy.xpath(retryTimeInput).should('be.visible');
  }

  selectRetryTimeUnit(unit) {
    cy.xpath(retryTimeDropdown).click();
    this.selectOptions(unit);
  }

  verifyRetryTimeUnitDropdown() {
    cy.xpath(retryTimeDropdown).should('be.visible');
  }

  clickOnButton(btnName) {
    cy.get('button').then((btns) => {
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].textContent.trim() === btnName) {
          cy.get(btns[i]).click({force:true});
          break;
        }
      }
    });
  }

  clickQuestionTooltip() {
    cy.get(tooltip).last().click({ force: true });
  }

  verifyDefaultCampaignName(name) {
    cy.xpath('//label[text()="Campaign Name"]/parent::div/child::input[@name="name"]')
      .should('have.value', name);
  }

  verifyDefaultRecycleCampaignName(val) {
    cy.get(RecCampaignName).should('have.value', val);
  }
   
  createAgentViaCampaignCreation(name,email,phone,password) {
    const [agentFirstName, agentlastName] = name.split(' ');

    cy.get('body').then(($body) => {
      if($body.find('#pendo-guide-container').length) {
        cy.contains('Next').click();
      }
      cy.contains('Create agents').click();
      if($body.find('#pendo-guide-container').length) {
        cy.contains('×').click();
      }
      addUser.enterFirstName(agentFirstName);
      addUser.enterLastName(agentlastName);
      addUser.enterEmail(email);
      addUser.enterPhoneNumber(phone);
      addUser.chooseUserRole('Agent');
      addUser.enterPassword(password);
      addUser.clickSaveButton();
      addUser.verifySuccessToast();
    })
  }

  verifyCreatedCampCardInField(cardName, value) {
    cy.xpath(cardDropdowns(cardName)+'//span[contains(@class,"multiple")]').should('contain.text',value);
  }

  deleteAgent(agent) {
    const [agentFirstName, agentlastName] = agent.split(' ');
    addUser.clickingOnUserOption();
    cy.wait(3000);
    addUser.searchUser(agent);
    cy.wait(2000);
    addUser.deleteAddedContact(agentFirstName,agentlastName);
  }

  verifyRecycleIconWithCount(name, count) {
    cy.xpath(recycleIcon(name)).should('be.visible');
    cy.xpath(recycleIcon(name)+'/*[@class="recycle-icon-text"]').should('have.text', count);
  }

  verifySourceCampaign(srcCamp, recycleCamp) {
    cy.xpath(recycleIcon(recycleCamp)).trigger('mouseover',{force:true});
    cy.xpath(recycleTooltip).first().should('have.text', srcCamp);
    cy.get('[src*="arrow-forward"]').should('be.visible');
    cy.xpath(recycleTooltip).last().should('contain', recycleCamp);
  }

  archiveRecycledCampaign(camp) {
    this.clickRecycleCampaignMenuBtn(camp);
    this.clickArchiveCampaignButton();
    this.handleAlertForDelete();
    this.verifyArchivedCampaign(camp, 'not.exist');
  }

  CallFromRecycleCampaign(RecycledCampaign) {
    dial.selectStatus('Available');
    dial.verifySelectCampaignBoxHeading();
    dial.clickSelectCampaignDropdown();
    dial.selectRecycledCampaign(RecycledCampaign);
    dial.clickConfirmButton();
    addCont.dialPhoneNumber('6029227636'); 
    dash.clickCallButton('green');
    dash.verifyCallStarted();
    cy.wait(8000);
    dash.clickCallButton('red');
    dash.clickAnsweringMachine();
    dash.clickOnDoneButton();
    cy.wait(1000);
    dash.clickCloseSoftphoneBtn();
  }

  mouseOverOnQuestionToolTip(name) {
    cy.xpath(campToolTip(name)).trigger('mouseover',{force:true});
  }

  mouseOutOnQuestionToolTip(name) {
    cy.xpath(campToolTip(name)).wait(500).trigger('mouseout',{force:true})
  }

  mouseOverOnCampTitle(title) {
    cy.xpath(`//h2[text()="${title} "]/span[@class=" question-tooltip"]/img`).trigger('mouseover',{force:true});
  }

  verifyQuestionTooltipText(ToolTipText) {
    cy.get('.tooltip-inner').should('have.text', ToolTipText);
  }
  
  verifyDefaultDateRange(time) {
    cy.get('a[href="#0"] div').should('have.text', time).should('be.visible')
  }
  
  verifyMaxAttemptWarningMsg(msg) {
    msg
    this.verifyDialogOpen();
    this.verifyModalTitle('Warning');
    cy.contains(msg).should('be.visible')
  }

  verifyRecycleCamapignDelete() {
    cy.wait(1500);
    cy.get('body').then(($ele) => {
      const recyCamp = $ele.find('.recycle-icon-svg').length;
      if(recyCamp) {
        for (let i = 0; i < recyCamp; i++) {
          cy.xpath(
            '//*[name()="svg"][@class="recycle-icon-svg"]/ancestor::div[@class="tr"]//div[@class="dropdown"]//img'
          )
          .eq(i).click({force:true});
          this.clickArchiveCampaignButton();
          this.handleAlertForDelete();
          cy.wait(1000);
        }
        cy.get('.recycle-icon-svg').should('not.exist');
      }
    })
  }

  verifyDraftCampDelete() {
    cy.wait(1500);
    cy.get('body').then(($ele) => {
      const draft = $ele.find(draftIcon).length;
      if(draft) {
        for (let i = 0; i < draft; i++) {
          cy.xpath('//div[contains(@class,"draft")]/ancestor::div[@class="tr"]//div[@class="dropdown"]//img')
            .eq(i).click({force:true});
            this.clickDropdownItem('Delete');
            cy.wait(1000);
        }
        cy.get(draftIcon).should('not.exist');
      }
    })
  }

  verifyCallResultsOption(callRslts) {
    cy.get('.ss-select-value-label.multiple span').then((option) => {
      for (let i = 0; i < callRslts.length; i++) {
        for (let j = 0; j < option.length; j++) {
          if (option[j].textContent.trim() === callRslts[i]) {
            expect(option[j].textContent).to.equal(callRslts[i]);
            break;
          }
        }
      }
    });
  }

  verifyDefaultValue(label, value) {
    if(label == 'Agent Script') {
      cy.xpath('//div[label[text()="Agent Script"]]/following-sibling::div//span[contains(@class,"value-label")]')
        .should('have.text', value)
    } else {
      cy.xpath(LabelDropdown(label)).should('contain.text', value)
    }
    
  }

  getProfileTimezone() {
    dash.clickUserProfile();
    dash.clickProfile();
    dash.getTimeZone();
  }

  verifyDialingBehavior(behavior,expectVal) {
    cy.xpath(dialingBehaviour(behavior)).invoke('val').then((ActualVal) => {
      expect(expectVal).to.equal(parseInt(ActualVal));
    })
  }

  VerifyDefaultRadioBtn(campCard, type) {
    cy.xpath(campaignCardRadioBtn(campCard, type))
    .scrollIntoView()
    .then(($el) => {
      cy.window().then((win) => {
        let before = win.getComputedStyle($el[0], '::after')
        const bgColor = before.getPropertyValue('background-color');
    
        expect(bgColor).to.equal('rgb(54, 131, 188)');
      })
    })
  }

  verifyDefaultCheckbox(campCard, checkbox) {
    if(checkbox == 'disable') {
      cy.xpath(campaignCardCheckbox(campCard))
        .should('have.css', 'background-color', 'rgb(228, 234, 240)'); // white or disable
    } else {
      cy.xpath(campaignCardCheckbox(campCard))
        .should('have.css', 'background-color', 'rgb(54, 131, 188)');  //blue color or enable
    }
  }

  verifyCheckboxField(campCard, cond) {
    if('not.exist' === cond) {
      cy.xpath(campaignCardCheckbox(campCard)).should(cond);
    }
  }

  clickOnCampName(name) {
    cy.xpath(campaignName(name)).click();
  }

  verifyDialPadNumber() {
    cy.get(dialPadNumber).invoke('val').then((number) => {
      expect(10).to.equal(number.length);
      cy.readFile('cypress/fixtures/testData.json').then(data => {
        data.dialNumber = number;
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  uploadContactViaCampaignCreation(file) {
    cy.contains('Upload Contacts').click({force:true});
    addCont.uploadFileForContact(file);
    cy.wait(2000);
    addCont.selectFirstNameDropdown();
    addCont.selectLastNameDropdown();
    addCont.selectEmailDropdown();
    addCont.selectPhoneDropdown();
    cy.wait(2000);
    addCont.clickNextButton();
    addCont.clickSubmitButton();
    addCont.verifyImportStartedToast();
    addCont.verifyImportContactCompleteToast();
  }

  verifyFileInContactList(file) {
    addCont.clickingOnContactOption();
    dial.clickOnSubMenu('Contact Lists');
    addCont.verifyListExisting(file);
  }

  captureArrayList(index) {
    cy.get(tableList(index)).then($ele => {
      arrList = Array.from($ele, el => el.innerText);
    });
  }

  captureGroup() {
    cy.get(tableList(5)).then($ele => {
      for (let i = 0; i < $ele.length; i++) {
        if($ele[i].textContent.trim() !== '-') {
        arrList.push('Group'+$ele[i].textContent.trim());
        }
      }
    });
  }

  getContactList() {
    addCont.clickingOnContactOption();
    dial.clickOnSubMenu('Contact Lists');
    this.captureArrayList(2);
  }

  getPhoneNumberList() {
    addNum.clickPhoneNumberMenu();
    this.captureArrayList(3);
    this.captureGroup();
  }

  getAgentList() {
    addUser.clickingOnUserOption();
    this.captureArrayList(2);
    this.captureGroup();
  }

  verifyListInCampDropdown(cardName) {
    cy.get('body').then(arr => {
      cy.log(arrList.length)
      for (let i = 0; i < arrList.length; i++) {
        cy.get(options).then((opt) => {
          for (let j = 0; j < opt.length; j++) {
            const option = opt[j].textContent.trim();
            if (option.includes(arrList[i])) {
              expect(option).to.contain(arrList[i])
              break;
            }
          }
        });
      }
      this.selectOptions(arrList[0]);
      this.verifyCreatedCampCardInField(cardName, arrList[0]);
    });
  }

  buyPhoneNumberViaCampaignCreation() {
    cy.contains('BUY NEW NUMBERS').click({force:true});
    addNum.selectStateModeOption('Colorado');
    addNum.selectPhoneNumber();
    addNum.getFirstPhoneNumber();
    addNum.clickOrderNowButton();
    cy.xpath('//button[text()=" Cancel"]', { timeout: 120000 }).should('be.enabled').click();
  }

  deletePhoneNumber(num) {
    addNum.clickPhoneNumberMenu();
    addNum.deleteAddedPhoneNumber(num);
    addNum.handleAlertForDelete();
    addNum.verifyDeletedToast();
  }

  clickOnCampaignWizard(name) {
    cy.get('.campaign-wizard__body span',{timeout:30000}).contains(name).click();
  }

  verifyIncompleteCampWizard(name) {
    cy.get('.campaign-wizard__body span',{timeout:30000}).should('not.contain.text',name)
  }

  clickTermsConditionsCheckbox() {
    cy.xpath(termCondition).click();
  }

  verifyAgentScriptEyeBtn(condition) {
    cy.xpath(AgentScript + '//img[@alt="View"]').should(condition)
  }
  
  clickAgentScriptEyeBtn() {
    cy.xpath(AgentScript + '//img[@alt="View"]').click({force:true});
  }

  verifyAgentScriptOpen() {
    cy.xpath(AgentScript+ '/descendant::span[@class="ss-select-value"]/span').then((script) => {
      this.verifyModalTitle(script.text());
      cy.get(modal).should('not.contain.html','class*="editor"');
      cy.get('.close-button').click();
    })
  }

  selectAgentScriptDropdown(opt) {
    cy.xpath(AgentScript+ '/descendant::span[@class="ss-select-value"]').click({force:true});
    this.selectOptions(opt);
  }

  verifySaveButtonVisiblity(condition) {
    cy.xpath('//button[text()="Save"]').should(`be.${condition}`);
  }

  clickSelectedItem(name) {
    cy.xpath(deleteSelectedDropdown(name)).click({force:true});
  }

  verifyActiveCampLength(length) {
    cy.get(activeCampCard).should('have.length.at.least',length)
  }

  verifyTermConditionCheckbox(checkbox) {
    if(checkbox === 'disabled') {
      cy.xpath(termCondition)
        .should('have.css', 'background-color', 'rgb(228, 234, 240)'); // white or disable
    } else {
      cy.xpath(termCondition)
        .should('have.css', 'background-color', 'rgb(54, 131, 188)');  //blue color or enable
    }
  }

  verifyTermsAndConditionsAcknowlegde(text) {
    cy.get('.campaign-terms').should('have.text',text);
  }

  clickOnDraftIcon() {
    cy.get(draftIcon).first().click();
  }

  verifyDraftAtTop() {
    cy.get(tableList(4)).first().should('contain.text','Draft');
  }

  verifyPhoneNumberMsg(msg) {
    cy.get('#phonenumbers p').should('have.text', msg)
  }

  selectDropdownValue() {
    cy.get('.ss-select-option').then((el) => {
      for (let i = 0; i < el.length; i++) {
        cy.get(el[i]).click({ force: true });
        break;
      }
    });
  }

  clickOnLeadScore() {
    cy.get('a.bat-link[href*="leadscore"]').invoke('removeAttr','target').click({force:true});
  }

  verifyLeadScoreHeading() {
    cy.xpath('//label[text()="Lead Scoring"]').should('be.visible');
  }
}
