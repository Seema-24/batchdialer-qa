const userTreeDropdown = '.profile_drop.dropdown';
const resellerUserTree = (user) =>
  `//div[@class="group-row__center__title" and text()="${user}"]/parent::div[@class="group-row__center"]/preceding-sibling::div`;
const reseller = `//div[@class="group-row-role__left__title"][contains(text(),"First Tenant Reseller 1")]`;
const clientsMenu = 'a[title="Clients"]';
const searchBox = 'input[placeholder*="Search"]';
const deleteUserButton = 'img[src*="delete"]';
const profileDropdown = '.profile_drop';
const dropdownItems = '.show .dropdown-item';
const profilePage = '.profile-page';
const toastMessage = '.Toastify__toast-body';
const profileFields = (fieldName) => `input[name="${fieldName}"]`;
const menu = (menuName) => `li:not(.subitem) a[title="${menuName}"]`;
const subMenu = (menuName) => `.subitem a[title="${menuName}"]`;
const searchInputField = 'input[placeholder*="Search"]';
const searchResult = (searchQuery) =>
  `//div[contains(@class,"resizable-table-tbody")]//div[@class="td"]//div[contains(.,"${searchQuery}")]`;
const accountStatus = (status) =>
  `.tr .td:nth-of-type(4) img[src*="${status}"]`;
const menuBtn = (searchQuery) =>
  `//div[@class="td"][contains(.,"${searchQuery}")]/following-sibling::div//img[@alt="Menu"]`;
const accountEditBtn = 'img[src*="edit"]';
const generalTabLabel = '#tabs-reseller-edit-tabpane-general label';
const inputFields = (inputField) => `input[name="${inputField}"]`;
const editClientTabs = (tabName) => `#tabs-reseller-edit-tab-${tabName}`;
const editClientTabContent = (tabName) =>
  `.tab-content #tabs-reseller-edit-tabpane-${tabName}.active`;
const labels = `.active label`;
const stateDropdown = 'select[name="state"]';
const addIcon = (cardTitle) =>
  `//div[contains(@class,"card-title")][span[strong[text()="${cardTitle}"]]]//img[contains(@src,"add")]`;
const ipAddressInputField = 'input[placeholder="IP address"]';
const IPDeleteButton = (IPAddress) =>
  `//div[@class="item"][span[text()="${IPAddress}"]]//img[contains(@src,"delete")]`;
const domainNameField = 'input[placeholder="Domain Name"]';
const refererDeleteBtn = (domainName) =>
  `//div[@class="item"][span[text()="test.com"]]//img[contains(@src,"delete")]`;
const cancelAccountNowRadioBtn =
  '//label[text()="Cancel the account now (fraud etc.)"]//span[@class="checkmark"]';
const cancelAccountAtEndRadioBtn =
  '//label[text()="Cancel the account in the end of current billing cycle"]//span[@class="checkmark"]';
const trialButton = '.resizable-table-tbody :nth-of-type(11)';
const modalDialog = '.modal-dialog .modal-content';
const disableTrialReadioBtn =
  '//label[text()="Disable Trial"]//span[@class="checkmark"]';
const changeTrialRadioBtn =
  '//label[text()="Change Trial Period to"]//span[@class="checkmark"]';
const trialDays = 'input[name="days"]';
const noOfTrialDays = '.resizable-table-tbody :nth-of-type(11) span';
const tableHeader = '.resizable-table-thead .th';
const clientNameData = '.tr .td:nth-of-type(2)';
const billingEditIcon = '.billing-card-title button';
const billingInfoEditBtn = '.billing-user-info__wrapper .billing-user-info__edit.btn';
const selectAdd = (key) => `//label[text() ="${key}"]/parent::div/child::div//span[contains(@class,"ss-select-value-label single")]`;
const userDropdown =(option) => `//div[@class="user__dropdown" and text()="${option}"]`;
const statusIcon = '.tr .td:nth-of-type(4)';
const billingButton = '.billing-user-info__balance .btn-default';

export default class Reseller {
  clickUserTreeDropdown(option) {
    cy.get(userTreeDropdown).click();
    cy.xpath(userDropdown(option)).click();
  }

  clickOnUser(user) {
    cy.xpath(resellerUserTree(user)).click();
  }

  clickOnResellerUser() {
    cy.xpath(reseller).click();
  }

  handleAlertWindow() {
    cy.on('	window:alert', (str) => {});
    cy.on('window:confirm', () => true);
  }

  clickClientsMenu() {
    cy.get(clientsMenu).click({ force: true });
  }

  enterUserToSearch(user) {
    cy.get(searchBox).type(user);
  }

  clickDeleteUserButton() {
    cy.get(deleteUserButton).click();
  }

  clickProfileDropdown() {
    cy.get(profileDropdown).click();
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

  verifyProfilePageVisible() {
    cy.get(profilePage).should('be.visible');
  }

  verifyToastMessage(message) {
    cy.get(toastMessage,{timeout:60000}).should('be.visible').should('contain.text', message);
  }

  enterProfileFieldValue(fieldName, value) {
    cy.get(profileFields(fieldName)).clear().type(value);
  }

  verifyProfileFieldValue(fieldName, value) {
    cy.get(profileFields(fieldName)).should('have.value', value);
  }

  clickOnButton(btnName) {
    cy.get('button').then((btn) => {
      for (let i = 0; i < btn.length; i++) {
        if (btn[i].textContent.trim() === btnName) {
          cy.get(btn[i]).click();
          break;
        }
      }
    });
  }

  clickOnMenu(menuName) {
    cy.get(menu(menuName)).click({ force: true });
  }

  clickOnSubMenu(menuName) {
    cy.get(subMenu(menuName)).click({ force: true });
  }

  enterSearchQuery(searchText) {
    cy.get(searchInputField).clear({force:true}).type(searchText);
  }

  verifySearchResult(searchQuery) {
    cy.xpath(searchResult(searchQuery)).should('be.visible');
  }

  clearSearchField() {
    cy.get(searchInputField).clear();
  }

  verifyAccountStatus(status) {
    cy.get(accountStatus(status)).should('be.visible');
  }

  clickClientDeleteButton(searchQuery) {
    cy.xpath(menuBtn(searchQuery)).click();
    cy.contains('Delete').click();
  }

  clickAccountEditButton() {
    cy.get(accountEditBtn).first().click();
    cy.contains('Edit').click();
  }

  verifyGeneralTabLabels(labels) {
    for (let i = 0; i < labels.length; i++) {
      cy.get(generalTabLabel).should('contain.text', labels[i]);
    }
  }

  verifyGeneralTabInputFields(inputField) {
    for (let i = 0; i < inputField.length; i++) {
      cy.get(inputFields(inputField[i])).should('be.visible');
    }
  }

  clickOnTab(tabName) {
    cy.get(editClientTabs(tabName)).click();
  }

  verifyEditClientTabContent(tabName) {
    cy.get(editClientTabContent(tabName)).should('be.visible');
  }

  verifyLabels(label) {
    cy.get(labels).should('contain.text', label);
  }

  enterBillToName(name) {
    cy.get(inputFields('billto')).clear().type(name);
  }

  verifyBillToName(name) {
    cy.get(inputFields('billto')).should('have.value', name);
  }

  enterAddress(address) {
    cy.get(inputFields('address')).clear().type(address);
  }

  verifyAddress(address) {
    cy.get(inputFields('address')).should('have.value', address);
  }

  enterZip(zip) {
    cy.get(inputFields('zip')).clear().type(zip);
  }

  verifyZip(zip) {
    cy.get(inputFields('zip')).should('have.value', zip);
  }

  enterCity(city) {
    cy.get(inputFields('city')).clear().type(city);
  }

  verifyCity(city) {
    cy.get(inputFields('city')).should('have.value', city);
  }

  enterPhone(phone) {
    cy.get(inputFields('phone')).clear().type(phone);
  }

  verifyPhone(phone) {
    cy.get(inputFields('phone')).should('have.value', phone);
  }

  selectState(state) {
    cy.get('body').then(($body) => {
      if($body.find(stateDropdown).length) {
        cy.get(stateDropdown).select(state);
      } else {
        cy.xpath(selectAdd('State')).click();
        cy.get(searchBox).type(state).click();
      }
    })
  }

  clickIPAddIcon() {
    cy.xpath(addIcon('IP')).click();
  }

  enterIPAddress(IPAddress) {
    cy.get(ipAddressInputField).type(IPAddress);
  }

  clickIPDeleteButton(IPAddress) {
    cy.xpath(IPDeleteButton(IPAddress)).click();
  }

  clickRefererAddIcon() {
    cy.xpath(addIcon('Referer')).click();
  }

  enterDomainName(domainName) {
    cy.get(domainNameField).type(domainName);
  }

  clickRefererDeleteBtn(domainName) {
    cy.xpath(refererDeleteBtn(domainName)).click();
  }

  clickCancelAccountNowRadioBtn() {
    cy.xpath(cancelAccountNowRadioBtn).click();
  }

  clickCancelAccountAtEndRadioBtn() {
    cy.xpath(cancelAccountAtEndRadioBtn).click();
  }

  clickTrialButton() {
    cy.wait(1000);
    cy.get(trialButton).click();
  }

  verifyModalDialogOpen() {
    cy.get(modalDialog).should('be.visible');
  }

  clickDisableTrialRadioBtn() {
    cy.xpath(disableTrialReadioBtn).click();
  }

  clickChangeTrialRadioBtn() {
    cy.xpath(changeTrialRadioBtn).click();
  }

  verifyDefualtTrialPeriodValue(value) {
    cy.get(trialDays).should('have.value', value);
  }

  enterTrialDays(days) {
    cy.get(trialDays).clear().type(days);
  }

  verifyNoOfTrialDays(days) {
    cy.wait(1000);
    cy.get(noOfTrialDays).should('have.text', `${days}days`);
  }

  verifySearchFieldVisible() {
    cy.get(searchInputField).should('be.visible');
  }

  verifyTableHeaderNames(headerName) {
    for (let i = 0; i < headerName.length; i++) {
      cy.get(tableHeader).should('contain.text', headerName[i]);
    }
  }

  verifyClientName(name) {
    cy.get(clientNameData).should('contain.text', name);
  }

  clickBillingDetailsEditIcon() {
    cy.get(billingInfoEditBtn).click();
  }

  clickOnStatusIcon() {
    cy.get(statusIcon).click();
  }

  clickDialogBox() {
    cy.get('body').then($body => {
      if($body.find(modalDialog).length) {
        cy.contains('CANCEL').click();
      }
    })
  }

  verifyBillingBtn(btn) {
    cy.get(billingButton).should('be.visible').and('have.text', btn);
  }
}
