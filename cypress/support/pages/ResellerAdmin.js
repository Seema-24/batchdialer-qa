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
const accountStatus = (status) =>
  `//tbody/tr[contains(.,"anil.kumar+1@fleekitsolutions.com")][contains(.,"${status}")]`;

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
    cy.on('	window:alert', (str) => {
      expect(str).to.equal('Login?');
    });
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

  verifyAccountStatus(status) {
    cy.xpath(accountStatus(status)).should('be.visible');
  }
}
