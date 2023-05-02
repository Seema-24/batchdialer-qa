import Contacts from '../../support/pages/Contacts';
import { closeDialogBox, handlePoorConnectionPopup, ignoreSpeedTestPopup, selectAgentStatus } from '../../support/Utils';
import Dashboard from '../../support/pages/Dashboard';
import Dialer from '../../support/pages/Dialer';

let fixtureData;
let testData;
let randNum = Math.floor(Math.random() * 1000);
const addCont = new Contacts();
const dashboard = new Dashboard();
const Dial = new Dialer();

describe('Add Contact flow', () => {
  before(() => {
    cy.exec('del /q "cypress\\fixtures\\Download\\*.*"', { log: true, failOnNonZeroExit: false })
    cy.exec('rm cypress/fixtures/Download/*', { log: true, failOnNonZeroExit: false })

    cy.readFile('cypress/fixtures/testData.json').then(
      (data) => (testData = data)
    );
    cy.fixture('constants')
      .then((data) => (fixtureData = data))
      .then(() => {
        cy.visit('/', { failOnStatusCode: false });
      });
    Cypress.Cookies.defaults({
      preserve: (cookies) => {
        return true;
      },
    });
  });

  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  after(() => {
    cy.reload();
    ignoreSpeedTestPopup();
    selectAgentStatus('Offline');
    cy.Logout();
  });

  it('Should Login', () => {
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    cy.reload();
    ignoreSpeedTestPopup();
  });

  //fixed test case on 5 March according to BAT-635
  it('Verifies All Elements', () => {
    addCont.clickingOnContactOption();
    cy.wait(1000);
    addCont.verifySearchBox();
    addCont.verifyAllListDropdown();
    addCont.clickFilterButton();
    addCont.verifyDialedRadioBtn(['All', 'Dialed', 'Undialed']);
    addCont.verifyDialedCountSlider();
    addCont.verifyLeadScoreSlider();
    addCont.verifyNewContactBtn();
    addCont.verifySaleMadeCheckbox();
    addCont.verifyAppointmentMadeCheckbox();
    addCont.clickFilterButton();
    addCont.verifySelectionCountCheckbox();
    addCont.verifyActionsDropdown();
    addCont.verifyContactListHeaderElements([
      'Full Name',
      'Score',
      'Phone Number',
      'Dialed',
      'Lists',
      'Last Contact',
      'Created',
      'Address',
      'Email',
      'Notes'         //BAT-T1069
    ]);
  });

  it('Verifies Search Functionality', () => {
    addCont.clickingOnContactOption();
    addCont.enterKeywordToSearch('random');
    addCont.verifySearchResult('random');
  });

  it('Verifies Create New Contact Elements', () => {
    addCont.clickingOnContactOption();
    cy.wait(3000);
    addCont.clickAddNewContactButton();
    addCont.selctCreateNewContactOption();
    addCont.verifyContactListDropdown();
    addCont.verifyFirstNameField();
    addCont.verifyLastNameField();
    addCont.verifyEmailField();
    addCont.verifyPhoneNumberFields();
    addCont.verifyAddressField();
    addCont.verifyCityField();
    addCont.verifyStateDropdown();
    addCont.verifyZipField();
    addCont.verifyMailingAddressField();
    addCont.verifyMailingCityField();
    addCont.verifyMailingStateDropdown();
    addCont.verifyMailingZipField();
    addCont.verifySaveBtn();
    addCont.verifyCancelBtn();
  });

  it('verifies Import Contact Elements', () => {
    addCont.clickingOnContactOption();
    addCont.clickAddNewContactButton();
    addCont.selectUploadFileOption();
    addCont.verifyImportContactsHeader([
      'Upload Your File',
      'Map Destination Fields',
      'Skip Unwanted Contacts',
    ]);
    addCont.verifyImportContactDropboxUpload();
    addCont.uploadFileForContact('contact-sample.csv');
    addCont.verifyImportContactFirstName();
    addCont.verifyImportContactLastName();
    addCont.verifyImportContactPhone();
    addCont.verifyImportContactEmail();
    addCont.verifyImportContactBackBtn();
    addCont.verifyImportContactNextBtn();
    addCont.selectFirstNameDropdown();
    addCont.selectLastNameDropdown();
    addCont.selectEmailDropdown();
    addCont.selectPhoneDropdown();
    addCont.clickNextButton();
    addCont.verifyImportContactListName();
    addCont.verifyImportContactSelectCompaignDropdown();
    addCont.verifyImportContactOptionsCheckbox([
      //'Scrub Against Existing Contacts',
      'Remove Duplicates In List',
      'Scrub Federal DNC',
      'Scrub Company DNC',
      'Scrub Mobile',
      'Scrub Litigator List',
    ]);
    addCont.verifyImportContactCancelButton();
    addCont.verifyImportContactSubmitButton();
  });

  it('Should Add Contact using Create New option', () => {
    addCont.clickingOnContactOption();
    cy.wait(3000);
    addCont.verifyContactExisting('9999999999');
    addCont.clickAddNewContactButton();
    addCont.selctCreateNewContactOption();
    addCont.enterFirstName(fixtureData.userFirstname);
    addCont.enterLastName(fixtureData.contactLastname + randNum.toString());
    addCont.enterAddress('anyAddress');
    addCont.enterCity('Tucson');
    addCont.selectState('Arizona');
    addCont.enterZipCode('85701');
    addCont.enterEmail(
      fixtureData.contactEmail.replace(
        'automation-contact',
        'automation-contact' + randNum.toString()
      )
    );
    addCont.enterPhoneNumber('9999999999');
    addCont.clickSaveButton();
    addCont.verifySuccessToast();
  });

  it('Should show added contacts in table', () => {
    addCont.clickingOnContactOption();
    addCont.verifyAddedContacts(
      fixtureData.userFirstname,
      fixtureData.contactLastname + randNum.toString()
    );
  });

  it('Should delete the added Contact', () => {
    addCont.clickingOnContactOption();
    addCont.deleteAddedContacts(
      fixtureData.userFirstname,
      fixtureData.contactLastname + randNum.toString()
    );
    addCont.handleAlertForDelete();
    addCont.verifyDeletedToast();
  });

  it('Verify functionality of a. Activities b. Campaigns c. Notes button', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    addCont.clickContactName(testData.Contact);
    addCont.verifyContactViewPageVisible();
    addCont.clickOnButton('Activities');
    addCont.verifyActivityTabOpen();
    addCont.clickOnButton('Campaigns');
    addCont.verifyCampaignTabOpen();
    addCont.clickOnButton('Notes');
    addCont.verifyNotesTabOpen();
  });

  it('Verify that sample upload file can be downloaded from Import contacts page', () => {
    addCont.clickingOnContactOption();
    addCont.clickAddNewContactButton();
    addCont.selectUploadFileOption();
    addCont.downloadSampleUploadFile();
    addCont.verifyDownloadedFile('sample.csv');
  });

  it('Should add contact using upload file', () => {
    addCont.clickingOnContactOption();
    Dial.clickOnSubMenu('Contact Lists');
    addCont.verifyListExisting('contact-sample.csv');
    Dial.clickOnSubMenu('Contacts');
    addCont.clickAddNewContactButton();
    addCont.selectUploadFileOption();
    addCont.uploadFileForContact('contact-sample.csv');
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
    cy.wait(3000);
  });

  it('Should show added contacts in table', () => {
    addCont.clickingOnContactOption();
    addCont.verifyAddedContacts('Automation', 'CSV1');
  });

  it('Verify that a Follow up call event created through Contacts page is reflected in TASKS page', () => {
    addCont.clickContactName('Automation CSV1');
    addCont.clickFollowUpCall();
    addCont.selectDateForFollowUpCall();
    dashboard.selectEventTime();
    addCont.clickSavebtn();
    cy.wait(1000);
    addCont.verifyFollowUpCall('Automation CSV1');
    addCont.clickCloseBtn();
    dashboard.clickTaskButton();
    dashboard.verifyEventContact('Automation CSV1');
    dashboard.verifyEventTitle('Call Back to Automation CSV1');
  });

  it('Should delete the added Contact', () => {
    addCont.clickingOnContactOption();
    addCont.deleteAddedContacts('Automation', 'CSV1');
    addCont.handleAlertForDelete();
    addCont.verifyDeletedToast();
    Dial.clickOnSubMenu('Contact Lists');
    Dial.clickListDeleteButton('contact-sample.csv');
    addCont.handleAlertForDelete();
    Dial.verifySuccessToastMessage('List deleted');
  });

  it('Verify that if a contact is deleted all the Events created for that contact is removed from the Tasks', () => {
    dashboard.clickTaskButton();
    dashboard.clickPastButton();
    dashboard.clickFutureButton();
    dashboard.verifyEventContactNotExist('Automation CSV1');
    dashboard.verifyEventTitleNotExist('Call Back to Automation CSV1');
  });

  it('Verify Dialed Undialed Radio Button Functionality', () => {
    addCont.clickingOnContactOption();
    addCont.clickFilterButton();
    addCont.clickDialedUndialedButton('Dialed');
    addCont.clickFilterButton();
    addCont.verifyContact('Testing', 'User', 'not.exist');
    addCont.verifyContact('Automation', 'Contact', 'be.visible');
    addCont.clickFilterButton();
    addCont.clickDialedUndialedButton('Undialed');
    addCont.clickFilterButton();
    addCont.verifyContact('Testing', 'User', 'be.visible');
    addCont.verifyContact('Automation', 'Contact', 'not.exist');
    addCont.clickFilterButton();
    addCont.clickDialedUndialedButton('All');
  });

  it('Select List from Dropdown', () => {
    addCont.clickListDropdown();
    addCont.selectContactList(testData.ListName);
    cy.wait(1000);
    addCont.verifyContact('random', 'Contact', 'be.visible');
  });

  it('Verify User is able to Add contact to campaign using action button', () => {
    addCont.clickLists();
    addCont.clickingOnContactOption();
    addCont.clickContactCheckbox(['1', '2']);
    addCont.clickAction();
    addCont.clickActionAddToCampaign();
    addCont.selectCampaignForContact();
    addCont.clickContinueButton();
    addCont.verifyAddedCampaign();
  });

  it('Verify List elements of contact', () => {
    addCont.clickLists();
    addCont.verifySearchBox();
    addCont.verifyContactCountSlider();
    addCont.verifyListImportContactButton();
  });

  it('Verify List Header Element', () => {
    addCont.verifyContactListHeaderElements([
      'ID',
      'Name',
      'Status',
      'Total Contacts',
      'Mobile',
      'Landline',
      'Litigator',
      'DNC',
      'Campaigns',
      'Health',
      'Age',
      'Round',
      'Created',
      'File',
    ]);
  });

  it('verify Lists table', () => {
    addCont.verifyListsTable();
  });

  it('Verify Pause and Delete Button of Lists', () => {
    addCont.verifyListPauseButton();
    addCont.verifyListDeleteButton();
  });

  it('Verify Pause Button Functionality', () => {
    addCont.clickPauseButton();
    addCont.verifyStatus();
  });

  it('User is able to import contact from list section', () => {
    addCont.verifyListExisting('contact-sample.csv');
    addCont.clickImportContacts();
    addCont.uploadFileForContact('contact-sample.csv');
    cy.wait(2000);
    addCont.selectFirstNameDropdown();
    addCont.selectLastNameDropdown();
    addCont.selectEmailDropdown();
    addCont.selectPhoneDropdown();
    addCont.clickNextButton();
    addCont.clickSubmitButton();
    addCont.verifyImportStartedToast();
    addCont.verifyImportContactCompleteToast();
    cy.wait(3000);
  });

  it('Should show Imported contact in table', () => {
    addCont.clickingOnContactOption();
    addCont.verifyAddedContacts('Automation', 'CSV1');
  });

  it('User is able to delete Imported Contact', () => {
    addCont.clickingOnContactOption();
    addCont.deleteAddedContacts('Automation', 'CSV1');
    addCont.handleAlertForDelete();
    addCont.verifyDeletedToast();
  });

  it('User is able to delete imported list from list section', () => {
    Dial.clickOnMenu('Contacts');
    Dial.clickOnSubMenu('Contact Lists');
    Dial.clickListDeleteButton('contact-sample.csv');
    addCont.handleAlertForDelete();
    Dial.verifySuccessToastMessage('List deleted');
  });

  it('check validation on required fields of new contact', () => {
    addCont.clickingOnContactOption();
    addCont.clickAddNewContactButton();
    addCont.selctCreateNewContactOption();
    addCont.enterLastName('test');
    addCont.clickSaveButton();
    addCont.verifyErrorMessage('Enter First Name');
    addCont.enterFirstName('demo');
    addCont.clickSaveButton();
    addCont.verifyErrorToastMessage('Please enter at least one valid phone number');
  });

  it('verify error message on fields of new contact', () => {
    addCont.enterZipCode('demo');
    addCont.verifyErrorMessage('Enter Valid Postal Code');
    addCont.enterZipCode('85306');
    addCont.enterEmail('demo@test');
    addCont.verifyErrorMessage('Enter Valid Email');
    addCont.enterEmail('demo@test.com');
    addCont.enterPhoneNumber('999999');
    addCont.clickSaveButton();
    addCont.verifyErrorToastMessage('Invalid phone number: Phone Number 1');
  });

  it('Download and Verify the Contact List', () => {
    addCont.clickingOnContactOption();
    addCont.clickLists();
    addCont.enterSearch(testData.ListName);
    addCont.downloadAndVerifyContactList(testData.ListName);
  });

  it('Schedule a Follow Up Call', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    cy.wait(1000);
    addCont.clickContactName(testData.Contact);
    addCont.clickFollowUpCall();
    addCont.selectDateForFollowUpCall();
    dashboard.selectEventTime();
    addCont.clickSavebtn();
    cy.wait(1000);
    addCont.verifyFollowUpCall(testData.Contact);
    addCont.clickCloseBtn();
  });

  it('Verify Cancel button should close the notes window', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    cy.wait(1000);
    addCont.clickContactName('random Contact');
    addCont.clickNotes();
    addCont.clickAddNewNotes();
    addCont.clickCloseBtn();
    addCont.verifyNotesWindowNotVisible();
  });

  it('Change status to Available', () => {
    Dial.selectStatus('Available');
    Dial.verifySelectCampaignBoxHeading();
    Dial.clickSelectCampaignDropdown();
    Dial.selectCampaign(testData.campaign);
    Dial.clickConfirmButton();
    Dial.verifySoftPhoneOpen();
    addCont.clickToCloseSoftphone();
  });

  it('Verify Admin is able to add notes in Contacts', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    cy.wait(1000);
    addCont.clickContactName('random Contact');
    addCont.clickNotes();
    addCont.clickAddNewNotes();
    addCont.enterNotes('Testing note for Contact');
    addCont.clickNotesBullets();
    cy.wait(3000);
    addCont.clickSavebtn();
    addCont.verifyAddedNote();
  });

  it('Verify that the authorized user is able to play or pause the recorded call', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    addCont.clickContactName(testData.Contact);
    addCont.clickContactPhoneNumber();
    addCont.clickDialerCallButton();
    cy.wait(5000);
    addCont.clickEndCallButton();
    addCont.selectCallResult('No Answer');
    addCont.clickContinueBtn();
    addCont.clickContactsCamapign();
    cy.reload();
    ignoreSpeedTestPopup();
    addCont.clickContactsCamapign();
    addCont.clickRecordingIcon();
    addCont.clickPlayerPlayBtn();
    cy.wait(1000);
    addCont.clickPlayerPauseBtn();
  });

  //failed test case --> BAT-2346
  it('Verify that the authorized user is able to Forward or Rewind the recorded call', () => {
    addCont.clickPlayerForwardBtn();
    cy.wait(1000);
    addCont.clickPlayerRewindBtn();
  });

  //failed test case--> BAT-2346
  it('Verify the Elements of Recording Player', () => {
    addCont.verifyPlayerCampaignName(testData.campaign);
    addCont.verifyPlayerControlBtns();
    addCont.verifyPlayerVolumeBar();
    addCont.verifyPlayerProgressBar();
    addCont.verifyPlayerDownloadBtn();
  });

  //failed test case --> BAT-2346
  it('Verify that the authorized user is able to play back the call recordings at lower and faster speeds', () => {
    addCont.selectPlaySpeed('0.5x');
    addCont.clickPlayerPlayBtn();
    cy.wait(2000);
    addCont.clickPlayerPauseBtn();
    addCont.verifyCurrentPlayTime(['0:01','0:02']);
    addCont.clickPlayerRewindBtn();
    addCont.selectPlaySpeed('2x');
    addCont.clickPlayerPlayBtn();
    cy.wait(2000);
    addCont.clickPlayerPauseBtn();
    addCont.verifyCurrentPlayTime(['0:04','0:05','0:06']);
  });

  it('Verify that the authorized user is able to download the call recording', () => {
    addCont.downloadRecording();
  });

  it('Verify that agent user is able to dial a valid phone number which is not in the contacts', () => {
    addCont.verifyContactExisting('6029227636');
    dashboard.clickDashboard();
    addCont.ClickToOpenSoftphone();
    addCont.dialPhoneNumber('6029227636');  
    addCont.clickDialerCallButton();
    cy.wait(10000);
    addCont.clickEndCallButton();
    addCont.selectCallResult('Successful Sale');
    addCont.clickContinueBtn();
    addCont.clickingOnContactOption();
    dashboard.closeUserProfile();
    addCont.deleteAddedContacts('Unknown','Contact');
    addCont.handleAlertForDelete();
    addCont.verifyDeletedToast();
    addCont.clickToCloseSoftphone();
  });

  it('Verify the Assign to Campaign Option for Lists', () => {
    addCont.clickingOnContactOption();
    addCont.clickLists();
    addCont.clickListMenuIcon();
    addCont.verifyAssignToCampaignBtn();
    addCont.clickOnDropdownItem('Assign To Campaign');
    addCont.verifyModalOpen();
    addCont.verifyModalTitle('Assign To Campaign');
  });

  it('Verify the Cancel button when Assign to Campaign Window', () => {
    addCont.clickOnButton('Cancel');
    addCont.verifyModalClose();
  });

  it('Verify that when click on the Notes icon Notes Tab should be opened', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    cy.wait(1000);
    addCont.clickNotesImg();
    addCont.verifyTab('Notes');
  });

  it('Verify the Notes icon if there is no Notes present', () => {
    addCont.clickingOnContactOption();
    addCont.verifyNotesImg('disable');
    addCont.verifyNotesCount('disable');
  });

  it('Verify the Notes icon if there are Notes present', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch(testData.Contact);
    addCont.verifyNotesImg('active');
    addCont.verifyNotesCount();
  });

  it('Verify that a user is able to search the contents in notes within contacts', () => {
    addCont.clickingOnContactOption();
    addCont.enterSearch('Testing note for Contact');
    cy.wait(1000);
    addCont.verifyNotesImg('active');
    addCont.clickNotesImg();
    addCont.verifyTab('Notes');
    addCont.verifyNotesContent('Testing note for Contact');
  });

  it('Verify that notes column is sortable based on the number of notes in the contacts', () => {
    addCont.clickingOnContactOption();
    addCont.clickTableHeaderSort('Notes');
    addCont.verifySortingTable(11);
    addCont.clickHeaderSortCaret('Notes');
    addCont.verifySortingTable(11,'Desc');
  });

  it('Verify that user is able to slide till unlimited or 2 million', () => {
    addCont.clickingOnContactOption();
    Dial.clickOnSubMenu('Contact Lists');
    addCont.verifyContactSliderText(['0','Unlimited']);
    addCont.slideContactCountFromStart(2, 'right');
    addCont.slideContactCountFromEnd(3,'left')
  });

  it('verify that the Blue Color in Source Field is Represent the Particular Field is auto prefilled', () => {
    addCont.clickingOnContactOption();
    Dial.clickOnSubMenu('Contact Lists');
    addCont.verifyListExisting('contact-sample.csv');
    addCont.clickImportContacts();
    addCont.uploadFileForContact('contact-sample.csv');
    cy.wait(2000);
    addCont.verifyPrefilledSourceFields();
  });

  it('Verify that user is able to create Custom Field in Destination Field', () =>{
    addCont.clickCustomField();
    addCont.verifyModalTitle('Add Custom Field');
    addCont.addCustomFieldName('TestingField');
    addCont.clickOnButton('Save');
    addCont.verifyCustomField('TestingField');
  });

  it('Verify that Remove Duplicates In List and Scrub Litigator List bydefault checked in Contact Import Page', () => {
    addCont.clickNextButton();
    addCont.verifyCheckboxCheckedBydefault(['removeduplicates','scrublitigator']);
  });

  it('Verify that Scrub Federal DNC, Scrub Mobile, Scrub Company DNC not checked bydefault', ()=> {
    addCont.verifyUncheckedCheckbox(['scrubfederal','scrubcompany','scrubmobile']);
  });

  it('Verify that import behavior should be present with (Keep old) selected by default', () => {
    addCont.verifyDuplicateNumberData('Keep Old');
    addCont.verifyDuplicateNumberTextInfo('Newly imported numbers that already exist in the system will remain as part of the old contact.');
  });

  it('Verify that in import behavior user is able to select (Reject) in the dropdown', () => {
    addCont.clickOnDropdown('Duplicate Phone Numbers');
    addCont.selectOption('Reject')
    addCont.verifyDuplicateNumberData('Reject');
    addCont.verifyDuplicateNumberTextInfo('This option will reject new import record if there is a matching contact/phone already in system.');
  });

  it('Verify that in import behavior user is able to select (Keep new) in the dropdown', () => {
    addCont.clickOnDropdown('Duplicate Phone Numbers');
    addCont.selectOption('Keep New')
    addCont.verifyDuplicateNumberData('Keep New');
    addCont.verifyDuplicateNumberTextInfo('Numbers that are found to be duplicate will be part of the newly uploaded contact and will be removed from existing contact.');
  });

  it('Verify That the User is able to assign a Campaign', () =>{
    addCont.clickOnDropdown('Assign to Campaign (optional)');
    addCont.selectOption(testData.campaign)
    addCont.clickSubmitButton();
    addCont.verifyImportStartedToast();
    addCont.verifyImportContactCompleteToast();
    cy.wait(3000);
    addCont.clickLists();
    addCont.clickListMenuIcon();
    addCont.verifyAssignToCampaignBtn();
    addCont.clickOnDropdownItem('Assign To Campaign');
    addCont.verifyModalOpen();
    addCont.verifyModalTitle('Assign To Campaign');
    addCont.verifyAssignCampaignInModal(testData.campaign);
    addCont.clickOnButton('Cancel');
    addCont.verifyModalClose();
    Dial.clickListDeleteButton('contact-sample.csv');
    addCont.handleAlertForDelete();
    Dial.verifySuccessToastMessage('List deleted');
  }); 
});
