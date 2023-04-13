import { clickCallFunction } from "../Utils";
import Dashboard from "./Dashboard";

const campaignsMenu = 'a[title="Campaigns"]';
const campaign = (camp) =>
  `//span[@class="campaign-name-table"][text()="${camp}"]`;
const accessDenied =
  "//div[contains(@class,'card-title') and (text()='Access Denied')]";
const statusDropdown = '.nav-item .ss-select';
const selectCampaignBox = '.modal-content .select__campaign__select';
const continueBtn = "//button[text()='Confirm & Transfer']";
const doneBtn = "//button[text()='Done']";
const recentContact = 'a[title="Recent Contacts"]';
const recentContactPage = '.reportCdrsForm.agent';
const editContact = 'span[title="Edit"]';
const callResultText = '.td .cursor_pointer span.d-inline-block';
const dispositionWindow = '.show .call-disposition div.position-absolute.overlay-content';
const callResults = '.show .call-disposition main span.d-inline-block';
const editCallResult = '.main_sec .call-disposition main span.d-inline-block';
const softphoneCloseBtn = '.softphone-close-button .cursor_pointer';
const softphone = '.stg-softphone-wrapper .softphone-body-height-for-dialer';
const contactsMenu = 'a[title="Contacts"]';
const contact = '.contacts__name';
const phoneNumber = '.phone__a-wrapper span';
const callTransferBtn = '//span[text()="transfer"]';
const callBtn = (btn) => `[src*=softphone_phone_${btn}]`;
const callResultWindow = '.call-disposition div.position-absolute.overlay-content';
const cancelBtn = '//button[contains(text(),"Cancel")]';
const confirmButton = '//button[contains(text(),"Confirm")]';
const searchBox = '.search-box';
const averageFieldBox = (text) => '//div[div[text()="' + text + '"]]';
const callFieldBox = (text) => `//div[span[text()="${text}"]]`;
const graphBox = (text) =>
  `//span[text()="${text}"]/ancestor::div[contains(@class,"col")]`;
const activeCampaignCount =
  '//span[text()="Active Campaigns"]/preceding-sibling::span[not(@class="icon")]';
const dashboard = 'a[title="Dashboard"]';
const totalCallsCount =
  '//span[text()="Total Calls"]/preceding-sibling::span[not(@class="icon")]';
const followUpCall = '.contact-view__calendar-btn';
const contactName = (firstName, lastname) =>
  `//span[@class="contacts__name"][text()="${firstName}"][text()="${lastname}"]`;
const month = '.month-selector .title';
const nextButton = '.fa-chevron-right';
const day = `div.day .title`;
const saveBtn = 'button svg[data-icon="save"]';
const savedScheduledCall = '.day .item';
const closeBtn = '//button[contains(text(),"Close")]';
const notesBtn = '//button[text()="Notes"]';
const addNewNoteBtn =
  "//span[contains(text(),'Add New Note')]/ancestor::button";
const noteTextField = 'div.ProseMirror';
const deleteNoteBtn = (note) =>
  '//div[contains(@class,"comment-item-body") and span[p[text()="' +
  note +
  '"]]]/parent::div/preceding-sibling::div//span//*[name()="svg"][@data-icon="trash"]';
const selectAgent =
  "//label[text()='Assign Agents']/ancestor::div[@class='card-body']//span[text()='Agents']";
const clickAgent = "//div[text()='automation testing']";
const RecentContactInboundOutbound = "span[title='Inbound+Outbound']";
const RecentContactTableHeader = '.resizable-table-thead .tr .th';
const timeInStatus = "//a[text()='Time In Status']";
const TISCalender = '.date-picker';
const TISExport = "//button[text()='Export']";
const TISTableHeader = '.resizable-table-thead';
const TISTableData = '.resizable-table-tbody';
const clickContact = "[viewBox='0 0 45 45']";
const searchBoxOnContact = "[placeholder='Search...']";
const roundBtns = '.checkmark';
const selectSelfMadeOnly =
  '//div[@class="modal-filter-body"]//label[text()="Sale Made Only"]/span';
const selectAppointmentMadeOnly =
  '//div[@class="modal-filter-body"]//label[text()="Appointment Made Only"]/span';
const allBtn =
  '//div[@class="modal-filter-body"]//label[@class="radio_cstm" and text()="All"]/span';
const dialedBtn =
  '//div[@class="modal-filter-body"]//label[@class="radio_cstm" and text()="Dialed"]/span';
const undialedBtn =
  '//div[@class="modal-filter-body"]//label[@class="radio_cstm" and text()="Undialed"]/span';
const contactTable = '.resizable-table-thead .tr .th';
const refreshBtn = "";
const allListBtn = `//span[text()="All Lists"]/ancestor::div[contains(@class,"ss-select-control")]`;
const equityBox = '.equity_box';
const statusBtn = "[title='Status']";
const agentBtn = "[title='Agent']";
const campaignTableHeader = '.resizable-table-thead .tr .th';
const viewContactHeader = '.contact-view-address-bar';
const contactNameImg = "[src='/img/contact-details.svg']";
const scoreImg = '.score-small-value';
const callsInfo = "[alt='Calls']";
const voiceMailInfo = "[alt='Voicemail']";
const leadInfoBtn = ".btn-primary[type='button']";
const propertyDetailsBtn =
  "//*[@id='root']/section/div/div/div/div[2]/div[1]/div/div/div[1]/button[2]";
const activitiesBtn =
  "//*[@id='root']/section/div/div/div/div[2]/div[1]/div/div/div[1]/button[3]";
const campaignsBtn =
  "//*[@id='root']/section/div/div/div/div[2]/div[1]/div/div/div[1]/button[4]";
const editFormOnViewContact = '.contact-field';
// const saveBtn = '.contact__save-btn';
const contactCalengerViewBtn = '.contact-view__calendar-btn';
const gooleMapsBtn = "[alt='Google Maps']";
const zillowBtn = "[alt='Zillow']";
const scriptBody = '.card-body';
const scriptMinimizeBtn = '.script__hide-btn';
const agentProfileDropDown = '.profile_drop';
const agentProfile = "[href='/profile/']";
const agentProfilepage = '.profile-content';
const agentFirstName = "[name='firstname']";
const agentLastName = "[name='lastname']";
const agentEmail = "[name='email']";
const agentAddress = "[name='address']";
const agentCity = "[name='city']";
const agentStateDropDown =
  "//*[@id='root']/section/div/div/div[1]/div[3]/div[3]/div/div";
const agentZipCodeInputBox = "[name='zip']";
const agentMobileNumber = "[name='phone']";
const agentLandLineNumber = "[name='phone2']";
const agentTimeZone = "[title='(GMT-05:00) Eastern Time']";
const agentProfilePicChangeBtn =
  "//*[@id='root']/section/div/div/div[1]/div[5]/div/div/button";
const agentPasswordChangeBtn =
  "//*[@id='root']/section/div/div/div[1]/div[6]/div[1]/button";
const changeCampaignBtn =
  "//*[@id='navbarSupportedContent']/ul/li[6]/div/div/a[1]";
const changeCampaignBody = '.modal-content';
const confirmBtnOnChangeCamp = "//button[contains(text(),'Confirm')]";
const calenderBtn = ".nav-link[href='/tasks/']";
const dateChangeBar = `//div[@class="DayPicker"]//span[@class=" fakelink"]`;
const verifyCalaenderDays = (day) => `abbr[title="${day}"]`;
const DashboardBtn = "//*[@id='root']/div[1]/div[2]/ul/li[1]/a/span";
const calenderOnDashBoard =
  "//div[@class='fakeinput inverted fakeinput__overflow']";
const calenderSideBar = '.links';
const calenderFromDateToDate = "[placeholder='MM/DD/YYYY']";
const daysOfCalender = '.DayPicker-WeekdaysRow';
const monthChangeBnts = '.svg-stroke';
const monthYearStatusBar = '.daypicker__month-select';
const agentDetailsPlusBtn = "[data-icon='plus']";
const agentCallDetails = '.reports-agents__summary';
const campaignBtnOnViewContact =
  "//*[@id='root']/section/div/div/div/div[2]/div[1]/div/div/div[1]/button[4]";
const viewContactCampaignTableHeader = '.table thead';
const notesBtnOnViewContact =
  "//*[@id='root']/section/div/div/div/div[2]/div[1]/div/div/div[1]/button[5]";
// const addNewNoteBtn = "//button[text()='Add New Note']";
const addNewNotePage = '.modal-content';
const addNoteCloseBtn = "//button[contains(text(),' Close')]";
const activitiesPage = '.userSedit';
const filterButton = 'button.modal-filter-btn';
const notesField = '.show .call-disposition textarea[placeholder*="Add notes"]';
const notesContent = '.comment-item .comment-item-body span';
const moods = (value) => `.show .call-disposition .justify-content-between span:nth-of-type(${value})`;
const selectedMood = '//div[@class="tr"]//div[@class="td"][7]';
const visibleMood = (mood) => `img[src*="mood-${mood}"]`;
const activityText = '.activity-title';
const tableFirstRow = 'tbody tr:nth-child(1)';
const addressBook = '.overflow-y-auto.position-relative .cursor_pointer';
const backCursor = (title) => `//span[text()="${title}"]/preceding-sibling::span`;

const dash = new Dashboard();

export default class Agent {
  clickCampaignMenu() {
    cy.get(campaignsMenu).click({ force: true });
  }

  selectCampaignName(campaignName) {
    cy.xpath(campaign(campaignName)).click();
  }

  verifyAccessDeniedMsg() {
    cy.xpath(accessDenied, { timeout: 5000 }).should('be.visible');
  }

  selectAgentStatus(status) {
    clickCallFunction();
    cy.get(statusDropdown,{timeout:60000}).click().contains(status).click().wait(1000);
    dash.clickUserProfile();
    dash.clickOnChangeCampaign();
    
  }

  verifySelectCampaignBox() {
    cy.get(selectCampaignBox).should('be.visible');
  }

  selectCampaign(campaign) {
    cy.get('.modal-body .ss-select').click();
    cy.get('.ss-select-option', { timeout: 5000 }).then((el) => {
      for (let i = 0; i < el.length; i++) {
        if (el[i].textContent.trim() === campaign) {
          cy.get(el[i]).click();
          break;
        }
      }
    });
  }

  clickContinueBtn() {
    cy.xpath(doneBtn).last().click({force:true});
  }

  verifyConfirmTransferBtn() {
    cy.xpath(continueBtn).should('be.visible');
  }

  clickRecentContact() {
    cy.get(recentContact).first().click({ force: true });
  }

  verifyRecentContactPage() {
    cy.get(recentContactPage).should('be.visible');
  }

  clickEditRecentContact(firstName, lastName) {
    cy.get(editContact).first().click({ force: true });
  }

  verifyCallResult(result) {
    cy.get(callResultText)
      .first()
      .then((el) => {
        expect(el.text()).to.equal(result);
      });
  }

  verifyCallResultWindow() {
    cy.get(dispositionWindow).should('be.visible');
  }

  selectCallResult(result) {
    cy.get(callResults, { timeout: 40000 }).then(($el) => {
      for (let i = 0; i < $el.length; i++) {
        if ($el[i].textContent === result) {
          $el[i].click();
          break;
        }
      }
    });
  }

  ChooseCallResult(result) {
    cy.wait(3000);
    cy.get('body').then(($body) => {
      if ($body.find(callResults).length) {
        this.selectCallResult(result);
        this.clickContinueBtn();
      }
    });
  }

  chooseEditCallResult(result) {
    cy.get(editCallResult, { timeout: 40000 }).then(($el) => {
      for (let i = 0; i < $el.length; i++) {
        if ($el[i].textContent === result) {
          $el[i].click();
          break;
        }
      }
    });
  }

  clickCloseSoftphoneBtn() {
    cy.get(softphoneCloseBtn, { timeout: 30000 }).click({force:true});
  }

  enterSearch(search) {
    cy.get(searchBox).clear({force:true}).type(search,{force:true});
    cy.wait(1000);
  }

  clickConfirmButton() {
    cy.xpath(confirmButton).click();
  }

  verifySoftphoneOpen() {
    cy.wait(1000).get('body').then(($body) => {
      if($body.find(softphone).length){
        cy.log("Dial Pad exist");
      }else {
        cy.get('img[src*="softphone.svg"]').click();
      }
    })
    cy.get(softphone, { timeout: 20000 }).should('be.visible');
  }

  clickingOnContactOption() {
    cy.get(contactsMenu).click({ force: true });
  }

  clickContactName() {
    cy.get(contact).first().click({ force: true });
  }

  clickPhoneNumber() {
    cy.get(phoneNumber).first().click({force:true});
  }

  clickCallTransferBtn() {
    cy.xpath(callTransferBtn).click();
  }

  clickCallBtn() {
    cy.get(callBtn('green')).click({force:true});
  }

  clickEndCallBtn() {
    cy.get(callBtn('red')).click({force:true});
  }

  verifyCallResultWindow() {
    cy.get(callResultWindow, { timeout: 10000 }).should('be.visible');
  }

  verifyCancelBtn() {
    cy.xpath(cancelBtn).should('be.visible');
  }

  clickBackCursor(title) {
    cy.xpath(backCursor(title)).click();
  }

  verifyAverageCallDurationBox() {
    cy.xpath(averageFieldBox('Average Call Duration')).should('be.visible');
  }

  verifyAverageWaitTimeBox() {
    cy.xpath(averageFieldBox('Average Wait Time')).should('be.visible');
  }

  verifyAverageAbandonTimeBox() {
    cy.xpath(averageFieldBox('Average Abandon Time')).should('be.visible');
  }

  verifyTalkingTimeBox() {
    cy.xpath(callFieldBox('Talking Time')).should('be.visible');
  }

  verifyActiveCampaignsBox() {
    cy.xpath(callFieldBox('Active Campaigns')).should('be.visible');
  }

  verifyTotalCallsBox() {
    cy.xpath(callFieldBox('Total Calls')).should('be.visible');
  }

  verifyRemainingLeadsBox() {
    cy.xpath(callFieldBox('Remaining Leads')).should('be.visible');
  }

  verifyCallsSummaryBox() {
    cy.xpath(graphBox('Calls Summary')).should('be.visible');
  }

  verifyCallResultsBox() {
    cy.xpath(graphBox('Call Results')).should('be.visible');
  }

  verifyTotalCallsGraph() {
    cy.xpath(graphBox('Total Calls')).should('be.visible');
  }

  verifyAverageCallDurationGraph() {
    cy.xpath(graphBox('Average Call Duration')).should('be.visible');
  }

  verifyCallsLocationGraph() {
    cy.xpath(graphBox('Calls Locations')).should('be.visible');
  }

  selectAgent() {
    cy.xpath(selectAgent).click();
  }

  ClickAgent() {
    cy.xpath(clickAgent).click();
  }

  verifyCampaign(cmpname) {
    cy.xpath(campaign(cmpname)).should('be.visible');
  }

  verifyAverageCallDuration() {
    cy.xpath(averageCallDuration).should('be.visible');
  }

  verifyAverageWaitTime() {
    cy.xpath(averageWaitTime).should('be.visible');
  }

  verifyRecentContactDropdown(cont) {
    for (let i = 0; i < cont.length; i++) {
      cy.get(recentContactPage).should('contain.text', cont[i]);
    }
  }

  verifyTableHeaderElements(ele) {
    for (let i = 0; i < ele.length; i++) {
      cy.get(RecentContactTableHeader).should('contain.text', ele[i]);
    }
  }

  clickTimeInStatusButton() {
    cy.xpath(timeInStatus).click();
  }

  verifyTableInStatusCalender() {
    cy.get(TISCalender).should('be.visible');
  }

  verifyTableInStatusExport() {
    cy.xpath(TISExport).should('be.visible');
  }

  verifyTableInStatusTableHeader(head) {
    for (let i = 0; i < head.length; i++)
      cy.get(TISTableHeader).should('contain.text', head[i]);
  }

  verifyTableInStatusTableData() {
    cy.get(TISTableData).should('be.visible');
  }
  clickOnContactButton() {
    cy.get(clickContact).click();
  }
  verifySearchBox() {
    cy.get(searchBoxOnContact).should('be.visible');
  }
  checkRoundAndCheckBtns() {
    cy.get(roundBtns).click({ multiple: true, force:true}).should('be.visible');
  }
  clickOnSelfMadeButton() {
    cy.xpath(selectSelfMadeOnly).click();
  }
  clickOnAppointmentMadeOnlyBtn() {
    cy.xpath(selectAppointmentMadeOnly).click();
  }
  selectAllRoundBtn() {
    cy.xpath(allBtn).click();
  }
  veirifyConatactTableHeader(contactHeader) {
    for (let i = 0; i < contactHeader.length; i++)
      cy.get(contactTable).should('contain.text', contactHeader[i]);
  }
  verifyRefreshBtn() {
    cy.contains('Reset').should('be.visible');
  }
  verifyListButton() {
    cy.xpath(allListBtn).should('be.visible');
  }
  verifyEquityBox(eqBox) {
    for (let i = 0; i < eqBox.length; i++)
      cy.get(equityBox).should('contain.text', eqBox[i]);
  }
  verifySearchBoxOnCampaign() {
    cy.get(searchBox).should('be.visible');
  }
  veriffyStatusBtn() {
    cy.get(statusBtn).should('be.visible');
  }
  verifyAgentBtn() {
    cy.get(agentBtn).should('be.visible');
  }
  verfyCampaignTableHeader(CampHeader) {
    cy.get(campaignTableHeader).then((heading) => {
      for (let i = 0; i < CampHeader.length; i++) {
        expect(heading.text().replace(/\s+/g, ' ')).to.contain(CampHeader[i]);
      }
    });
  }
  vierifyTheHeaderOfViewContact(headViewCon) {
    for (let i = 0; i < headViewCon.length; i++) {
      cy.get(viewContactHeader).should('contain.text', headViewCon[i]);
    }
    cy.get(contactNameImg).should('be.visible');
    cy.get(scoreImg).should('be.visible');
  }
  verifyContactViewBtn() {
    cy.get(contactCalengerViewBtn).should('be.visible');
  }
  verifyZillowBtn() {
    cy.get(zillowBtn).should('be.visible');
  }
  verifyGoogleMapsBtn() {
    cy.get(gooleMapsBtn).should('be.visible');
  }
  verifyLeadInfoBtn() {
    cy.get(leadInfoBtn).should('be.visible');
  }
  verifyCallsInfoInHeder() {
    cy.get(callsInfo).should('be.visible');
  }
  verifyVoiceMailInfo() {
    cy.get(voiceMailInfo).should('be.visible');
  }
  verifyPropertyDetailsBtn() {
    cy.xpath(propertyDetailsBtn).should('be.visible');
  }
  verifyActivitiesBtn() {
    cy.xpath(activitiesBtn).should('be.visible');
  }
  verifyCampaignBtn() {
    cy.xpath(campaignsBtn).should('be.visible');
  }
  verifyNotesBtn() {
    cy.xpath(notesBtn).should('be.visible');
  }
  verifyEdiitFormOnViewContact(editForm) {
    for (let i = 0; i < editForm.length; i++) {
      cy.get(editFormOnViewContact).should('contain.text', editForm[i]);
    }
  }
  verifySaveBtn() {
    cy.get(saveBtn).should('be.visible');
  }
  verifyScriptBody() {
    cy.get(scriptBody).should('be.visible');
  }
  VerifyscriptMinimizeBtn() {
    cy.get(scriptMinimizeBtn).should('be.visible');
  }
  clickOnAgentProfileDropDown() {
    cy.get(agentProfileDropDown).click();
  }
  clickOnagentProfile() {
    cy.get(agentProfile).click();
  }
  verifyElementsOfAgentProfile(profileElement) {
    for (let i = 0; i < profileElement.length; i++) {
      cy.get(agentProfilepage).should('contain.text', profileElement[i]);
    }
  }
  verifyAgentFirstNameInputBox() {
    cy.get(agentFirstName).should('be.visible');
  }
  verifyAgentLastNameInputBox() {
    cy.get(agentLastName).should('be.visible');
  }
  verifyAgentEmailInputBox() {
    cy.get(agentEmail).should('be.visible');
  }
  verifyAgentAddressInputBox() {
    cy.get(agentAddress).should('be.visible');
  }
  verifyAgentCityInputBox() {
    cy.get(agentCity).should('be.visible');
  }
  verifyAgentStateDropDown() {
    cy.xpath(agentStateDropDown).should('be.visible');
  }
  verifyAgentZipCodeInputBox() {
    cy.get(agentZipCodeInputBox).should('be.visible');
  }
  verifyAgentMobileNumberInputBox() {
    cy.get(agentMobileNumber).should('be.visible');
  }
  verifyAgentLandLineNumberInputBox() {
    cy.get(agentLandLineNumber).should('be.visible');
  }
  verifyAgentTimeZoneDropDown() {
    cy.get(agentTimeZone).should('be.visible');
  }
  verifyAgentProfilePicChangeBtn() {
    cy.xpath(agentProfilePicChangeBtn).should('be.visible');
  }
  verifyAgentPasswordChangeBtn() {
    cy.xpath(agentPasswordChangeBtn).should('be.visible');
  }
  clickOnChangeCampaignBtn() {
    cy.get('.dropdown-item').contains('Change Campaign').click();
  }
  verifyTesxtOnChangeCampaignPage(campText) {
    cy.get(changeCampaignBody).should('contain.text', campText);
  }
  verifyConfirmBtnOnChangeCamp() {
    cy.xpath(confirmBtnOnChangeCamp).should('be.visible').click();
  }
  openCalender() {
    cy.get(calenderBtn).click();
  }
  verifyDateChangeBar() {
    cy.xpath(dateChangeBar).should('be.visible');
  }
  verifyDaysOfcalender(days) {
    for (let i = 0; i < days.length; i++) {
      cy.get(verifyCalaenderDays(days[i])).should('be.visible');
    }
  }
  clickOnDashboardBtn() {
    cy.xpath(DashboardBtn).click();
  }
  openCalenderOnDashBoard() {
    cy.xpath(calenderOnDashBoard).should('be.visible').click({force:true});
  }
  verifyCalenderSideBar(sideBar) {
    for (let i = 0; i < sideBar.length; i++) {
      cy.get(calenderSideBar).should('be.visible', sideBar[i]);
    }
  }
  verifyCalenderFromDateToDate() {
    cy.get(calenderFromDateToDate).should('be.visible');
  }
  verifyDaysOfCalender(days) {
    for (let i = 0; i < days.length; i++) {
      cy.get(daysOfCalender).should('contain.text', days[i]);
    }
  }
  verifyMonthChangeBnts() {
    cy.get(monthChangeBnts).should('be.visible').should('have.length', 2);
  }
  verifyMonthYearStatusBar() {
    cy.get(monthYearStatusBar).should('be.visible');
  }
  clickOnAgentDetailsPlusBtn(agent_Details) {
    cy.get(agentDetailsPlusBtn).click({force:true});
    for (let i = 0; i < agent_Details.length; i++) {
      cy.get(agentCallDetails).should('contain.text', agent_Details[i]);
    }
  }
  clickOnCampaignBtnOnViewContact() {
    cy.xpath(campaignBtnOnViewContact).click({force:true});
  }
  verifyViewContactCampaignTableHeader(headerElements) {
    for (let i = 0; i < headerElements.length; i++) {
      cy.get(viewContactCampaignTableHeader).should(
        'contain.text',
        headerElements[i]
      );
    }
  }
  clickOnNotesBtnOnViewContact() {
    cy.xpath(notesBtnOnViewContact).click({force:true});
  }
  clickOnAddNewNoteBtn() {
    cy.xpath(addNewNoteBtn).click();
  }
  verifyAddNewNotePage() {
    cy.get(addNewNotePage)
      .should('be.visible')
      .should('contain.text', 'New Note');
  }
  clickOnAddNoteCloseBtn() {
    cy.xpath(addNoteCloseBtn).click({ force: true });
  }
  clickOnactivitiesBtn() {
    cy.xpath(activitiesBtn).click({force:true});
  }
  verifyActivitiesPage(activityText) {
    cy.get(activitiesPage).should('contain.text', activityText);
  }
  verifyActiveCampaignCount() {
    cy.xpath(activeCampaignCount).then((el) => {
      expect(parseInt(el.text().trim())).to.equal(1);
    });
  }

  clickDashboardMenu() {
    cy.get(dashboard).click({ force: true });
  }

  getTotalCallsCount() {
    cy.wait(2000);
    cy.xpath(totalCallsCount).then((count) => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.TotalCallsCount = count.text().trim();
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  verifyTotalCallsCount(count) {
    cy.wait(2000);
    cy.xpath(totalCallsCount).then((el) => {
      expect(parseInt(el.text().trim())).greaterThan(parseInt(count));
    });
  }

  clickOnContactName(contact) {
    const [firstName, lastName] = contact.split(' ');
    cy.xpath(contactName(firstName, lastName)).click({force:true});
  }

  clickFollowUpCall() {
    cy.get(followUpCall).click({force:true});
  }

  selectDateToFollowUpCall() {
    const today = new Date();
    const date = today.getDate();
    const Month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const monthYear = `${Month} ${year}`;
    cy.get('.modal-content').should('be.visible');
    cy.log(monthYear);
    cy.log(date);
    for (let i = 0; i < 36; i++) {
      cy.get(month).then(($month) => {
        for (let i = 0; i < $month.length; i++) {
          if ($month[i].textContent.trim() != monthYear) {
            cy.get(nextButton).click();
            break;
          }
        }
      });
    }
    cy.get(day).then((AllDate) => {
      for (let i = 0; i < AllDate.length; i++) {
        if (AllDate[i].textContent.trim() === date.toString()) {
          cy.get(AllDate[i]).click();
          break;
        }
      }
    });
  }

  clickSaveButton() {
    cy.get(saveBtn).click();
  }

  verifyScheduledFollowUpCall(contact) {
    cy.get(savedScheduledCall).should(
      'contain.text',
      `Call Back to ${contact}`
    );
  }

  clickCloseButton() {
    cy.xpath(closeBtn).click();
  }

  clickNotesBtn() {
    cy.xpath(notesBtn).click({force:true});
  }

  clickAddNewNoteBtn() {
    cy.xpath(addNewNoteBtn).click({force:true});
  }

  enterNote(note) {
    cy.get(noteTextField).type(note);
  }

  clickDeletNoteBtn(note) {
    cy.wait(500);
    cy.get('.card-text .comment-item-body').then(($ele) => {
      if($ele.text().includes(note)) {
        cy.xpath(deleteNoteBtn(note)).click({ multiple: true });
      }
    })
  }

  verifyAddedNote(note, condition) {
    cy.wait(1000);
    cy.xpath(deleteNoteBtn(note)).should(condition);
  }

  clickFilterButton() {
    cy.get(filterButton).contains('FILTER').click({force:true});
  }

  enterDispositionNote(note) {
    cy.get(notesField).clear().type(note);
  }

  clickOnButton(btnName) {
    cy.get('button').then((Btn) => {
      for (let i = 0; i < Btn.length; i++) {
        if (Btn[i].textContent.trim() === btnName) {
          cy.get(Btn[i]).click({force:true});
          break;
        }
      }
    });
  }

  verifyNotesContent(note) {
    cy.get(notesContent).first().should('have.text', note);
  }

  selectMood(mood) {
    if (mood === 'good') {
      cy.get(moods(1)).click();
    } else if (mood === 'bad') {
      cy.get(moods(3)).click();
    } else if (mood === 'neutral') {
      cy.get(moods(2)).click();
    }
  }

  verifySelectedMood(mood) {
    cy.xpath(selectedMood)
      .first()
      .within(() => {
        cy.get(visibleMood(mood)).should('be.visible');
      });
  }

  verifyDispositionNoteText(text) {
    cy.get(notesField).should('have.text', text);
  }

  verifyDispositionWindowVisible() {
    cy.get(dispositionWindow, { timeout: 40000 }).should('be.visible');
  }

  verifyActivityText(text) {
    cy.get(activityText).then((Activities) => {
      expect(Activities.text().replace(/\s+/g, ' ')).to.contains(text);
    });
  }

  getContactPhoneNumber() {
    cy.get(phoneNumber).then((no) => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.contactNumber = no.text();
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
    });
  }

  verifyContactCallData(campaignName, agent, disposition) {
    cy.get(tableFirstRow).within((rowData) => {
      expect(rowData.find('td:nth-child(1)').text().trim()).to.equal(
        campaignName
      );
      expect(rowData.find('td:nth-child(3)').text().trim()).to.equal(agent);
      expect(rowData.find('td:nth-child(4)').text().trim()).to.equal(
        disposition
      );
    });
  }

  doubleTapOnDisposition(result, title) {
    let path;
    if(title == 'edit') {
      path = editCallResult;
    } else {
      path = callResults;
    }
    cy.get(path, { timeout: 40000 }).then(($el) => {
      for (let i = 0; i < $el.length; i++) {
        if ($el[i].textContent === result) {
          cy.get(path).contains(result).dblclick()
          break;
        }
      }
    });
  }

  selectAddressBook() {
    cy.get(addressBook).should('be.visible').first().click();

  }
}
