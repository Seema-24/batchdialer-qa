const DashboardMenu = 'a[title="Dashboard"]';
const CallSummery = 'Calls Summary';
const Responsiveness = 'Responsiveness';
const Agents = 'Agents';
const TotalCalls = 'Total Calls';
const CallResults = 'Call Results';
const CallLocations = 'Calls Locations';
const AverageCallDuration = 'Average Call Duration';
const ButtonLoginAs = '//button[text()="Login As"]';
const StatusDropDown = 'div#navbarSupportedContent div.ss-select';
const Dialer = 'img[src*="softphone.svg"]';
const Task = 'a[href="/tasks/"]';
const UserProfile = '.profile_name';
const LoginSearchBox = 'form[class="search"] input';
const SearchedUser = 'automation testing2';
const SelectStatus = '.ss-select-group-items';
const ContinueButton = '//button[text()="Continue"]';
const DialPad = '.stg-softphone-wrapper';
const DialpadNumber9 = "//div[text()='9']";
const DialpadCallButton = '.stg-softphone-callbutton';
const CallTimerContactButton = '.stg-softphone-contact';
const AnsweringMachine = "//div[text()='Busy']";
const calander = '.calendar';
const UserProfileOptions = '.dropdown-menu.show';
const UserSettingOptions = '.profile-buttons';
const SettingsButton = "//span[text()='Settings']";
const UserSettingProfileFields = (val) => "input[name='" + val + "']";
const ProfileFirstname = "input[name='firstname']";
const ProfileLastname = "input[name='lastname']";
const ProfileEmail = "input[name='email']";
const ProfileAddress = "input[name='address']";
const ProfileCity = "input[name='city']";
const ProfileZip = "input[name='zip']";
const ProfilePhone = "input[name='phone']";
const ProfilePhone2 = "input[name='phone2']";
const ProfileState = "//span[text()='State']";
const ProfileTimezone = "//div[label[text()='Timezone']]/div";
const ProfilePasswordChangeButton = "//div[label[text()='Password']]/button";
const ProfileAgentFeaturesEnable =
  "//div[label[text()='Agent Features']]//label[text()='Enable']";
const ProfileAgentFeaturesDisable =
  "//div[label[text()='Agent Features']]//label[text()='Disable']";

export default class Dashboard {
  clickDashboard() {
    cy.get(DashboardMenu).click({ force: true });
  }

  verifyDashboardElements() {
    cy.contains(CallSummery).should('be.visible');
    cy.contains(Responsiveness).should('be.visible');
    cy.contains(Agents).should('be.visible');
    cy.contains(TotalCalls).should('be.visible');
    cy.contains(CallResults).should('be.visible');
    cy.contains(CallLocations).should('be.visible');
    cy.contains(AverageCallDuration).should('be.visible');
  }

  verifyDashboardHeaderElement() {
    cy.xpath(ButtonLoginAs).should('be.visible');
    cy.get(StatusDropDown).should('be.visible');
    cy.get(Dialer).should('be.visible');
    cy.get(Task).should('be.visible');
    cy.get(UserProfile).should('be.visible');
  }

  clickLoginAs() {
    cy.xpath(ButtonLoginAs).click();
  }

  searchUser(user) {
    cy.get(LoginSearchBox).type(user);
  }

  verifySearchedUser() {
    cy.contains(SearchedUser).should('be.visible');
  }

  clickStatusButton() {
    cy.get(StatusDropDown).click();
  }

  selectAvailable(Status) {
    cy.get(SelectStatus)
      .contains(Status)
      .then((option) => {
        option[0].click();
      });
    cy.contains('FirstCampaign').click();
  }

  clickContinue() {
    cy.xpath(ContinueButton).click();
  }

  clickDialer() {
    cy.get(Dialer).click();
  }

  verifyDialPad() {
    cy.get(DialPad).should('be.visible');
  }

  dialNumber() {
    for (let i = 0; i < 10; i++) {
      cy.xpath(DialpadNumber9).click();
      cy.wait(1000);
    }
  }

  clickCallButton() {
    cy.get(DialpadCallButton).click();
  }

  verifyCallStarted() {
    cy.get(CallTimerContactButton).should('be.visible');
  }

  clickAnsweringMachine() {
    cy.xpath(AnsweringMachine).click();
  }

  clickTaskButton() {
    cy.get(Task).click();
  }

  verifyTask() {
    cy.get(calander).should('be.visible');
  }

  clickUserProfile() {
    cy.get(UserProfile).click();
  }

  verifyUserProfileOptions() {
    cy.get(UserProfileOptions).should('be.visible');
  }

  clickBilling() {
    cy.get(UserSettingOptions).contains('Billing').click();
  }

  verifyUserSettingOptions(element) {
    for (let i = 0; i < element.length; i++) {
      cy.get(UserSettingOptions).should('contain.text', element[i]);
    }
  }

  clickSettingsButton() {
    cy.xpath(SettingsButton).click();
  }

  verifyUserSettingsProfileFields(val) {
    for (let i = 0; i < val.length; i++) {
      cy.get(UserSettingProfileFields(val[i])).should('be.visible');
    }
  }

  verifyProfileState() {
    cy.xpath(ProfileState).should('be.visible');
  }

  verifyProfileTimeZone() {
    cy.xpath(ProfileTimezone).should('be.visible');
  }

  verifyProfilePasswordChangeButton() {
    cy.xpath(ProfilePasswordChangeButton).should('be.visible');
  }

  verifyProfileAgentFeaturesEnable() {
    cy.xpath(ProfileAgentFeaturesEnable).should('be.visible');
  }

  verifyProfileAgentFeaturesDisable() {
    cy.xpath(ProfileAgentFeaturesDisable).should('be.visible');
  }
}
