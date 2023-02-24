const reportHeader = '.reports-top-bar';
const reportMenu = "a[title='Reports']";
const reportLive = '.report-live-buttons-left';
const tableHeader = '.resizable-table-thead .th';
const ReportContactsDropdowns = '.modal-filter-body .ss-select';
const reportsHeader = (header) => '.subitem a[title="' + header + '"]';
const ReportContactButton = "//div[text()='Recent Contacts']";
const campaignDropdown = '.reportCampaignsForm';
const reportCampaignsButton = "//div[text()='Campaigns']";
const agentsDropdown = '.reportAgentsForm';
const AgentButton = "//div[text()='Agents']";
const NumberButton = "//div[text()='Numbers']";
const numberDropdown = '.reportNumbersForm';
const searchBox = '.search-box';
const table = '.resizable-table';
const campaignStatusDropdown =
  "//span[text()='All Statuses']/ancestor::div[contains(@class,'inverted')]";
const campaignCalander = '.dropdown-menu';
const campCalanderDropdown = '.date-picker .fakeinput__overflow';
const campCalanderTimeline = '.links';
const calenderMonthDropdown = '.DayPicker-Caption';
const calenderDays = '.DayPicker-Weekdays';
const calenderDate = '.DayPicker-Body';
const tableBody = '.resizable-table-tbody';
const dialerNumber = '.table-responsive tbody tr td:nth-child(4)';
const exportbtn = "//button[text()='Export']";
const agentHeatMap = "//div[text()='Agents Heat Map']";
const heatMapDropdown = "span[title='All Groups']";
const heatMapRadioButtons = (radio) => "//label[text() = '" + radio + "']";
const heatMapWeekButton = "input[value='week']";
const heatMapMonthRadioButton = "input[value='month']";
const heatMapDatePicker = '.datepicker__col';
const heatMapStatus = '.reports-heat__statuses';
const FloorMap = "//div[text()='Floormap']";
const FloorViewDropdown = "//label[text()='Floor View']/parent::div//button";
const addNewFloor = "//button[contains(text(),' Add New Floor')]";
const filtersButton = '.modal-filter-btn';
const rowsData = '.resizable-table .resizable-table-tbody .tr';
const recycleIcon = (name) => `//div[text()="${name}"]/*[@class="recycle-icon-svg"]`
const dropdownOptions = '.ss-select-group-items';
const statusdropdown = 'All Statuses';
const floorView = '.dropdown-toggle.btn.btn-default';
const agentCard = '.avail-agent-card.react-draggable';
const floorCanvas = '.floor-map--canvas';
const floorMapItem = '.floor-map--item ';


export default class Report {
  clickReportMenu() {
    cy.get(reportMenu).click({ force: true });
  }

  reportHeaderElement(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(reportHeader).should('contain.text', element[i]);
    }
  }

  verifyReportLiveElements(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(reportLive).should('contain.text', element[i]);
    }
  }

  verifyReportTableHeaderElements(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(tableHeader).should('contain.text', element[i]);
    }
  }

  clickReportsHeader(header) {
    cy.get(reportsHeader(header)).click({ force: true });
  }

  verifyRecentContactsDropdown(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(ReportContactsDropdowns).should('contain.text', element[i]);
    }
  }

  clickRecentContactButton() {
    cy.xpath(ReportContactButton).click();
  }

  VerifyDropdownsReportCampaign(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(campaignDropdown).should('contain.text', element[i]);
    }
  }

  clickReportCampaignsButton() {
    cy.xpath(reportCampaignsButton).click();
  }

  verifyAgentsDropdowns(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(agentsDropdown).should('contain.text', element[i]);
    }
  }

  clickAgentButton() {
    cy.xpath(AgentButton).click();
  }

  clickNumberButton() {
    cy.xpath(NumberButton).click();
  }

  verifyReportNumbersDropdowns(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(numberDropdown).should('contain.text', element[i]);
    }
  }

  verifyNumbersSearchBox() {
    cy.get(searchBox).should('be.visible');
  }

  searchNumber(num) {
    let number = '';
    for (let i = 0; i < num.length; i++) {
      if (num[i] != '(' && num[i] != ')' && num[i] != ' ' && num[i] != '-') {
        number += num[i];
      }
    }
    cy.get(searchBox).type(number);
  }

  searchContactName(contact) {
    cy.get(searchBox).type(contact);
  }

  verifySearchedNumber(number) {
    cy.get(table).should('contain.text', number);
  }

  clickCampaignStatusDropdown() {
    cy.xpath(campaignStatusDropdown).click();
  }

  verifyStatusDropdownElements(element) {
    for (let i = 0; i < element.length; i++) {
      cy.xpath(campaignStatusDropdown).should('contain.text', element[i]);
    }
  }

  clickCampaignCalanderDropdown() {
    cy.get(campCalanderDropdown).click({force:true});
  }

  verifyCalender() {
    cy.get(campaignCalander).should('be.visible');
  }

  verifyCalenderTimeline(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(campCalanderTimeline).should('contain.text', element[i]);
    }
  }

  verifyCalenderMonthDropdown() {
    cy.get(calenderMonthDropdown).should('be.visible');
  }
  verifyCalenderDays() {
    cy.get(calenderDays).should('be.visible');
  }

  verifyCalenderDates() {
    cy.get(calenderDate).should('be.visible');
  }

  clickActiveStatus() {
    cy.get(campaignDropdown).contains('Active').click();
  }

  verifyStatusVisible(status) {
    cy.get(tableBody).should('contain.text', status);
  }

  verifyStatusNotVisible(status) {
    cy.get(tableBody).contains(status).should('not.exist');
  }

  clickExportBtn() {
    cy.xpath(exportbtn).click();
  }

  getDialedContactNumbers() {
    cy.get(dialerNumber).then((el) => {
      cy.log(el);
      for (let i = 0; i < el.length; i++) {
        cy.log(el[i].innerText);
      }
    });
  }

  clickAgentHeatMap() {
    cy.xpath(agentHeatMap).click();
  }

  verifyAgentHeatMapDropdown() {
    cy.get(heatMapDropdown).should('be.visible');
  }

  verifyHeatMapRadioButtons(button) {
    for (let i = 0; i < button.length; i++) {
      cy.xpath(heatMapRadioButtons(button[i])).should('be.visible');
    }
  }

  verifyHeatMapDatePicker() {
    cy.get(heatMapDatePicker).should('be.visible');
  }

  verifyHeatMapStatus(ele) {
    for (let i = 0; i < ele.length; i++) {
      cy.get(heatMapStatus).should('contain.text', ele[i]);
    }
  }

  clickFloorMap() {
    cy.xpath(FloorMap).click();
  }

  verifyFloorMapViewDropdown() {
    cy.xpath(FloorViewDropdown).should('be.visible');
  }

  verifyAddNewFloorButton() {
    cy.xpath(addNewFloor).should('be.visible');
  }

  clickFilterButton() {
    cy.get(filtersButton).click();
  }

  verifyRowsData(data) {
    cy.get(rowsData).should('contain.text', data);
  }

  verifyRecycleIconWithCount(name, count) {
    cy.xpath(recycleIcon(name)).should('be.visible');
    cy.xpath(recycleIcon(name)+'/*[@class="recycle-icon-text"]').first().should('have.text', count);
  }

  clickDateBtnLinks(dateBtn) {
    cy.get('.links .btn.btn-link')
      .contains(dateBtn)
      .scrollIntoView()
      .click();
  }

  clickStatusDropdown() {
    cy.contains(statusdropdown).click({force:true});
  }

  selectCampaignStatus(status) {
    cy.get(dropdownOptions)
      .contains(status)
      .then((option) => {
        option[0].click();
      });
  }

  clickFloorViewDropdown() {
    cy.get(floorView).click();
  }

  selectFloorViewDropdown(floor) {
    this.clickFloorViewDropdown();
    cy.get('.dropdown-item').then(el => {
      for (let i = 0; i < el.length; i++) {
        if(el[i].textContent.trim() === floor) {
          el[i].click();
          break;
        }
      }
    })
  }

  verifyFloorMapItem(item) {
    cy.get(floorMapItem).should('have.length', item);
  }

  clickOnButton(Btn) {
    cy.get('button').then((btn) => {
      for (let i = 0; i < btn.length; i++) {
        if (btn[i].textContent.trim() === Btn) {
          cy.get(btn[i]).click();
          break;
        }
      }
    });
  }

  enterFloorMap(name) {
    cy.get('.form-control').type(name);
  }

  verifyErrorMsg(msg) {
    cy.get('.Toastify__toast-body').should('contain.text', msg)
  }

  verifyAgentGroupName(name) {
    for (let i = 0; i < name.length; i++) {
      cy.get('.agent-info .fullname').contains(name[i])
    } 
  }

  dragAndDropAgentCard() {
    cy.get(agentCard).first()
      .drag(floorCanvas, {
        target: { position: 'center' },
        force: true 
    })
  }

  verifyFloorMapAgentName(item) {
    cy.get(floorMapItem +'.employee-name').should('contain', item);
  }

  verifyFloorMapProfilePic() {
    cy.get(floorMapItem).should('contain.html','img class="avatar"');
  }

  verifyFloorMapStatus() {
    cy.get(floorMapItem + '.employee-presence').should('be.visible');
  }

  verifyFloorMapStatusTimer() {
    cy.get(floorMapItem + '.employee-last-presence').first().should('not.be.empty');
  }

  verifyFloorMapStatusColor() {
    cy.get(floorMapItem + '[style*="background: rgb"]').should('be.visible');
  }
}
