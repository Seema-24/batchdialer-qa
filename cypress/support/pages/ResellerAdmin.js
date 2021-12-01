const userTreeDropdown = '.dropdown-usertree';
const resellerUserTree = (user) =>
  `//span[@class="role-title"][text()="${user}"]/following-sibling::span//*[name()="svg"][@data-icon="plus"]`;
const reseller = `//span[@class="roletitle"][contains(text(),"First Tenant Reseller 1")]`;
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
  `//tbody/tr[contains(.,"${searchQuery}")]`;
const accountStatus = (searchQuery, status) =>
  `//tbody/tr[contains(.,"${searchQuery}")][contains(.,"${status}")]`;
const clientDeleteBtn = (searchQuery) =>
  `//tr[td[div[text()="${searchQuery}"]]]//img[contains(@src,"delete")]`;
const accountEditBtn = 'img[src*="edit"]';
const generalTabLabel = '#tabs-reseller-edit-tabpane-general label';
const inputFields = (inputField) => `.active input[name="${inputField}"]`;
const editClientTabs = (tabName) => `#tabs-reseller-edit-tab-${tabName}`;
const editClientTabContent = (tabName) =>
  `.tab-content #tabs-reseller-edit-tabpane-${tabName}.active`;
const labels = `.active label`;
const stateDropdown = '.active select[name="state"]';
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
const trialButton = 'span[title="Click to edit trial"]';
const modalDialog = '.modal-dialog .modal-content';
const disableTrialReadioBtn =
  '//label[text()="Disable Trial"]//span[@class="checkmark"]';
const changeTrialRadioBtn =
  '//label[text()="Change Trial Period to"]//span[@class="checkmark"]';
const trialDays = 'input[name="days"]';
const noOfTrialDays = 'span[title="Click to edit trial"] .badge-warning';
const tableHeader = '.resizable-table-thead .th';
const clientNameData = '.tr .td:nth-of-type(1)';

export default class Reseller {
  clickUserTreeDropdown() {
    cy.get(userTreeDropdown).click();
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
    cy.get(toastMessage).should('be.visible').should('contain.text', message);
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
    cy.get(searchInputField).clear().type(searchText);
  }

  verifySearchResult(searchQuery) {
    cy.xpath(searchResult(searchQuery)).should('be.visible');
  }

  clearSearchField() {
    cy.get(searchInputField).clear();
  }

  verifyAccountStatus(searchQuery, status) {
    cy.xpath(accountStatus(searchQuery, status)).should('be.visible');
  }

  clickClientDeleteButton(searchQuery) {
    cy.xpath(clientDeleteBtn(searchQuery)).click();
  }

  clickAccountEditButton() {
    cy.get(accountEditBtn).first().click();
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

  enterAddress(address) {
    cy.get(inputFields('address')).clear().type(address);
  }

  enterZip(zip) {
    cy.get(inputFields('zip')).clear().type(zip);
  }

  enterCity(city) {
    cy.get(inputFields('city')).clear().type(city);
  }

  enterPhone(phone) {
    cy.get(inputFields('phone')).clear().type(phone);
  }

  selectState(state) {
    cy.get(stateDropdown).select(state);
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
    cy.get(noOfTrialDays).should('have.text', `${days} days`);
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
}
