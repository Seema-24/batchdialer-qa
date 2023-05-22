import Campaign from '../../support/pages/Campaigns';
import Contacts from '../../support/pages/Contacts';
import Dialer from '../../support/pages/Dialer';
import Report from '../../support/pages/Report';
import Setup from '../../support/pages/Setup';
import {
  call,
  callWithHangup,
  closeDialogBox,
  covertNumberToNormal,
  handlePoorConnectionPopup,
  ignoreSpeedTestPopup,
  selectAgentStatus,
  verifyCloseApp,
} from '../../support/Utils';

let testData;
const Dial = new Dialer();
const setup = new Setup();
const contact = new Contacts();
const camp = new Campaign();
const report = new Report();

describe('Inbound Call Scenarios', () => {
  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })
  describe('Inbound Calls with Call Connect type of Auto Answer mode', () => {
    const campaignName = 'Auto Answer Campaign';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('create new Predictive Dialer Campaign with Auto Answer Mode', () => {
      setup.assignNumberToAgent(testData.Number, testData.AdminName);
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Change status to Available', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // Dial.selectStatus('Available');
          // Dial.verifySelectCampaignBoxHeading();
          // Dial.clickSelectCampaignDropdown();
          // Dial.selectCampaign(campaignName);
          // Dial.clickConfirmButton();
          // Dial.verifySoftPhoneOpen();
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Verify that calls are Auto Answering if Agent is Unavailable', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // call(callNumber, +15202010331);
          // Dial.verifySoftphone();
          // Dial.verifyContactViewPage();
          // cy.wait(5000);
          // Dial.clickEndCallButton();
          // Dial.verifyCallDispositionWindow();
          // Dial.selectCallDisposition('No Answer');
          // Dial.clickOnButton('Done');
          // Dial.verifyCallEnd('No Answer');
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Verify the Dials and Answered Count in Reports Campaign Page', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // Dial.clickReportsMenu();
          // Dial.clickOnSubMenu('Campaigns');
          // cy.reload();
          // ignoreSpeedTestPopup();
          // report.clickCampaignCalanderDropdown();
          // report.clickDateBtnLinks('Today');
          // report.clickStatusDropdown();
          // report.selectCampaignStatus('Active')
          // Dial.verifyCampaignDialsCount(campaignName, 1);
          // Dial.verifyCampaignAnsweredCount(campaignName, 1);
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Archive the Created Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });
  });

  describe('Inbound Calls Call connect type with Ringing Sound mode', () => {
    const campaignName = 'Ringing Sound Campaign';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('create new Predictive Dialer Campaign with Ringing Sound Mode', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'Disconnected Number',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Manual Answer');
      cy.wait(1000);
      Dial.clickOnRadioButton('Ringing Sound');
      // Dial.clickNextButton();
      // Dial.clickOnRadioButton('Individual Agents');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Change status to Available', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          Dial.selectStatus('Available');
          Dial.verifySelectCampaignBoxHeading();
          Dial.clickSelectCampaignDropdown();
          Dial.selectCampaign(campaignName);
          Dial.clickConfirmButton();
          Dial.verifySoftPhoneOpen();
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Verify that incoming call give popup to accept or reject with ringing sound if Agent is Available', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // call(callNumber, +15202010331);
          // Dial.verifySoftphone();
          // Dial.verifyContactViewPage();
          // Dial.clickAcceptCallButton();
          // cy.wait(5000);
          // Dial.clickEndCallButton();
          // Dial.verifyCallDispositionWindow();
          // Dial.selectCallDisposition('No Answer');
          // Dial.clickOnButton('Done');
          // Dial.verifyCallEnd('No Answer');
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Verify the Dials and Answered Count in Reports Campaign Page', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // Dial.clickOnMenu('Dashboard');
          // cy.wait(1000);
          // Dial.clickReportsMenu();
          // Dial.clickOnSubMenu('Campaigns');
          // Dial.clickOnMenu('Dashboard');
          // cy.wait(1000);
          // Dial.clickReportsMenu();
          // Dial.clickOnSubMenu('Campaigns');
          // cy.reload();
          // ignoreSpeedTestPopup();
          // report.clickCampaignCalanderDropdown();
          // report.clickDateBtnLinks('Today');
          // report.clickStatusDropdown();
          // report.selectCampaignStatus('Active')
          // Dial.verifyCampaignDialsCount(campaignName, 1);
          // Dial.verifyCampaignAnsweredCount(campaignName, 1);
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Archive the Created Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });
  });

  describe('Inbound Calls for the Queue System', () => {
    const campaignName = 'Queue Campaign';
    const queueName = 'Testing Queue';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a campaign for the Queue', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      //Dial.clickOnRadioButton('Individual Numbers');
      //Dial.clickNumbersDropdown();
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      // Dial.clickNextButton();
      Dial.enterCampaignName(campaignName);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'Disconnected Number',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      //Dial.clickNextButton();
      //Dial.clickOnRadioButton('Individual Agents');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a Queue for verifying Inbound Calls', () => {
      Dial.clickOnMenu('Phone System');
      Dial.clickOnSubMenu('Inbound Calls');
      Dial.clickOnButton('NEW QUEUE');
      Dial.enterQueueName(queueName);
      Dial.chooseAssignCampaign(campaignName);
      Dial.chooseExtension(testData.Number);
      Dial.chooseAssignAgents(testData.AdminName);
      Dial.selectTimeoutDestination('Queue');
      Dial.clickOnButton('CREATE QUEUE');
      Dial.verifySuccessToastMessage('Saved');
      cy.reload();
      ignoreSpeedTestPopup();
    });

    it('Verify that if agent is in offline status then call should appear in reports live section as Inqueue call', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // selectAgentStatus('Offline');
          // callWithHangup(callNumber, +15202010331);
          // Dial.clickDashboardMenu();
          // Dial.verifyInqueueCall('5202010331');
          // cy.wait(1000);
        } else {
          cy.log('Inbound calls are not working in QA');
        }
      });
    });

    it('Verify that if Agent is in Available status then agent should recieve call', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          // selectAgentStatus('Available');
          // Dial.verifySelectCampaignBoxHeading();
          // Dial.clickSelectCampaignDropdown();
          // Dial.selectCampaign(campaignName);
          // Dial.clickConfirmButton();
          // Dial.verifySoftPhoneOpen();
          // cy.reload();
          // ignoreSpeedTestPopup();
          // call(callNumber, +15202010331);
          // Dial.verifySoftphone();
          // Dial.verifyContactViewPage();
          // cy.wait(5000);
          // Dial.clickEndCallButton();
          // Dial.verifyCallDispositionWindow();
          // Dial.selectCallDisposition('No Answer');
          // Dial.clickOnButton('Done');
        } else {
          cy.log('Inbound calls are not working in QA');
        }
      });
    });

    it('Delete the Created Campaign and Queue', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
      Dial.clickOnMenu('Phone System');
      Dial.clickOnSubMenu('Inbound Calls');
      Dial.clickDeleteQueueButton(queueName);
      Dial.verifySuccessToastMessage('Queue deleted');
    });
  });

  describe('Phone Number Destinations', () => {
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('change the Destination of the Number to Hangup', () => {
      Dial.clickOnMenu('Phone System');
      setup.clickPhoneEditButton(testData.Number);
      setup.selectNumberGroup('None');
      setup.chooseDestination('Hangup');
      Dial.clickOnButton('SAVE');
    });

    it('Verify if the Number is destinationed to Hangup then call should show as Abandoned in Recent Contacts', () => {
      cy.url().then((url) => {
        if(url.includes('app.batchdialer.com')) {
          // call(callNumber, +15202010331);
          // cy.wait(3000);
          // Dial.clickOnMenu('Reports');
          // Dial.clickOnSubMenu('Recent Contacts');
          // Dial.verifyRecentContactDisposition('Abandoned');
        } else {
          cy.log('Inbound calls are not working in QA');
        }
      })
    });
  });
});

describe('Outbound Calling Scenarios', () => {
  beforeEach(() => {
    handlePoorConnectionPopup();
    closeDialogBox();
  })

  describe('Preview Campaign Dialing', () => {
    const campaignName = 'Preview Campaign';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      cy.reload();
      ignoreSpeedTestPopup();
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create the New Preview Dialer', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Preview Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Add the New Contact for the Outbound call', () => {
      contact.clickingOnContactOption();
      contact.clickAddNewContactButton();
      contact.verifyContactExisting('5103256012')
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5103256012');
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
    });

    it('Dial the Added Number', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickContactName('Twilio', 'Test');
      Dial.clickContactPhoneNumber();
      Dial.clickAcceptCallButton();
    });

    it('Verify that Agent status should be On Call', () => {
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Twilio Test');
    });

    it('End the Call and select the Disposition', () => {
      Dial.endCallAtTime('0:20');
      Dial.verifyCallDispositionWindow();
      Dial.selectCallDisposition('No Answer');
      Dial.clickOnButton('Done');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Twilio', 'Test');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      Dial.clickSoftphoneButton();
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });
  });

  describe('Predictive Campaign Dialing', () => {
    const campaignName = 'Predictive Campaign 1';
    const listName = 'twilio.csv';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.enterSimultaneousDialsPerAgent('3');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(listName);
      contact.clickImportContacts();
      contact.uploadFileForContact(listName);
      cy.wait(2000);
      Dial.selectMappingFields([
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
    });

    it('Assign the Imported List to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListAssignToCampaign(listName);
      Dial.verifyModalTitle('Assign To Campaign');
      Dial.chooseCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('List has been assigned to the campaigns');
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      Dial.verifySoftphoneLinesNumber(3);
    });

    it('Verify that Agent status should be On Call and End the Call and select the Disposition', () => {
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Test Number');
      Dial.endCallAtTime('0:20');
      Dial.verifyCallDispositionWindow();
      Dial.selectCallDisposition('No Answer');
      Dial.clickOnButton('Done');
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Delete the Uploaded List', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListDeleteButton(listName);
      contact.handleAlertForDelete();
      Dial.verifySuccessToastMessage('List deleted');
    });
  });

  describe('Predictive campaign with simultaneous dials per agent of 1', () => {
    const campaignName = 'Predictive Campaign 2';
    const listName = 'twilio.csv';
    let callNumber = '+1'; 
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.enterSimultaneousDialsPerAgent('1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(listName);
      contact.clickImportContacts();
      contact.uploadFileForContact(listName);
      cy.wait(2000);
      Dial.selectMappingFields([
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
      contact.verifyImportContactCompleteToast();
    });

    it('Assign the Imported List to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListAssignToCampaign(listName);
      Dial.verifyModalTitle('Assign To Campaign');
      Dial.chooseCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('List has been assigned to the campaigns');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(1000);
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      //Dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify that Agent status should be On Call and End the Call and select the Disposition', () => {
      Dial.disconnectAvailableCall();
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Test Number');
      Dial.endCallAtTime('0:20');
      Dial.verifyCallDispositionWindow();
      Dial.selectCallDisposition('No Answer');
      Dial.clickOnButton('Done');
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Delete the Uploaded List', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListDeleteButton(listName);
      contact.handleAlertForDelete();
      Dial.verifySuccessToastMessage('List deleted');
    });
  });

  describe('Predictive campaign with simultaneous dials per agent of 1 and max attempt per record of 3', () => {
    const campaignName = 'Predictive Dialer Campaign';
    const listName = 'twilio.csv';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.enterSimultaneousDialsPerAgent('1');
      Dial.enterMaxAttemptPerRecord('3');
      Dial.enterRetryTime('4');
      Dial.selectRetryTimeDropdown('sec');
      Dial.clickOnButton('Got it')
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a New Contact for Campaign', () => {
      contact.clickingOnContactOption();
      contact.verifyContactExisting('5103256012');
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5103256012');
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Assign the Added Contact to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickContactThreeDotMenu('Twilio', 'Test');
      Dial.clickOnDropdownItem('Add to Campaign');
      Dial.verifyModalTitle('Select campaign');
      Dial.selectCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('Contacts added to campaign');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(1000);
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      //Dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify that Agent status should be On Call', () => {
      Dial.clickOnMenu('Dashboard');
      Dial.verifySimultaneousDial(
        ['Twilio Test'],
          'On Call',
          '0:20',
          'No Answer'
      );
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Twilio', 'Test');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      Dial.clickSoftphoneButton();
    });
  });

  describe.skip('Predictive Dialer with the Ring time duration of 15 seconds', () => {
    const campaignName = 'Predictive Dialer ring';
    const listName = 'twilio.csv';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.enterSimultaneousDialsPerAgent('1');
      Dial.enterMaxAttemptPerRecord('1');
      Dial.enterRetryTime('1');
      Dial.enterRingTimeDuration('15');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a New Contact for Campaign', () => {
      contact.clickingOnContactOption();
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Test');
      contact.enterLastName('Number');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5202777603');
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Assign the Added Contact to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickContactThreeDotMenu('Test', 'Number');
      Dial.clickOnDropdownItem('Add to Campaign');
      Dial.verifyModalTitle('Select campaign');
      Dial.selectCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('Contacts added to campaign');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(10000);
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      Dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify the ringing Time duration of 15 sec and call should be marked as No Answer', () => {
      Dial.verifySoftphoneLineContactName(['Test Number1']);
      cy.wait(15000);
      Dial.verifySoftphoneLineStatus('OFF');
      contact.clickToCloseSoftphone();
      Dial.clickOnMenu('Reports');
      Dial.clickOnSubMenu('Recent Contacts');
      Dial.verifyRecentContactDisposition('No Answer');
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Test', 'Number');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      Dial.clickSoftphoneButton();
    });
  });

  describe('Predictive Dialer with the Abandoned Time Out of 15 seconds', () => {
    const campaignName = 'Predictive Dialer Abandon';
    const listName = 'twilio.csv';
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
        testData.flag = false;
        cy.writeFile(
          'cypress/fixtures/testData.json',
          JSON.stringify(testData)
        );
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Manual Answer');
      cy.wait(1000);
      Dial.clickOnRadioButton('Ringing Sound'); //Beep Once'
      Dial.clickOnCheckboxButton('Answering Machine Detection');
      Dial.enterSimultaneousDialsPerAgent('3');
      Dial.enterMaxAttemptPerRecord('3');
      Dial.enterRetryTime('1');
      Dial.selectRetryTimeDropdown('sec');
      Dial.clickOnButton('Got it')
      Dial.enterAbandonmentDuration('30');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(listName);
      contact.clickImportContacts();
      contact.uploadFileForContact(listName);
      cy.wait(2000);
      Dial.selectMappingFields([
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
      cy.wait(2000)
      contact.clickNextButton();
      contact.clickSubmitButton();
      contact.verifyImportStartedToast();
      contact.verifyImportContactCompleteToast();
    });

   it('Assign the Imported List to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListAssignToCampaign(listName);
      Dial.verifyModalTitle('Assign To Campaign');
      Dial.chooseCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('List has been assigned to the campaigns');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(1000);
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      Dial.verifySoftphoneLinesNumber(3);
    });

    it('​Verify the ringing icon animation when system start dialing', () => {
      Dial.verifyPhoneRingingIcon();
    })

    it('Verify the Abandoned Time Out of 15 sec and call should be marked as Abandoned', () => {
      Dial.verifyAbandonedCall(); 
      Dial.verifyAgentStatus('Auto Pause'); 
      for (let i = 0; i < 4; i++) {
        cy.readFile('cypress/fixtures/testData.json').then((data) => {
          if (data.flag === true) {
            cy.log('Call Already Abandoned');
          } else {
            cy.wait(12000); 
            Dial.clickOnMenu('Reports');
            Dial.clickOnSubMenu('Recent Contacts');
            cy.reload();
            ignoreSpeedTestPopup();
            Dial.verifyRecentContactDisposition('Abandoned');
          }
        });
        
      }
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Delete the Uploaded List', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListDeleteButton(listName);
      contact.handleAlertForDelete();
      Dial.verifySuccessToastMessage('List deleted');
    });
  });

  describe('Campaign - Call Recording Feature', () => {
    const campaignWithRecording = 'Campaign with call recording';
    const campaignWithoutRecording = 'Campaign without Call Recording';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Preview Campaign with Call Recording Feature', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignWithRecording);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Preview Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignWithRecording);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'Disconnected Number',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a new Preview Campaign without the Call Recording Feature', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignWithoutRecording);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Preview Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignWithoutRecording);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'Do Not Call',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.disableCallRecording();
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a New Contact for Campaign', () => {
      contact.clickingOnContactOption();
      contact.verifyContactExisting('5103256012');
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5103256012');//5202010331 //8586515050
      contact.clickSaveButton();
      contact.verifySuccessToast();
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignWithRecording);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
    });

    it('Dial the Added Number', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickContactName('Twilio', 'Test');
      Dial.clickContactPhoneNumber();
      Dial.clickAcceptCallButton();
    });

    it('Verify that Agent status should be On Call', () => {
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Twilio Test');
    });

    it('End the Call and select the Disposition', () => {
      Dial.endCallAtTime('0:25');
      Dial.verifyCallDispositionWindow();
      Dial.selectCallDisposition('No Answer');
      Dial.clickOnButton('Done');
      cy.reload();
      ignoreSpeedTestPopup();
    });

    it('verify that Call recording should be available in Recent Contacts', () => {
      Dial.clickOnMenu('Reports');
      Dial.clickOnSubMenu('Recent Contacts');
      cy.reload();
      ignoreSpeedTestPopup();
      Dial.verifyCallRecordingIcon(campaignWithRecording,true);
    });

    it('Verify that costumer is able to play the recording', () => {
      Dial.closeRecordingDialog();
      Dial.clickCallRecordingIcon('Twilio', 'Test', campaignWithRecording);
      Dial.verifyRecordingPlayerWindow();
      Dial.verifyPlayerCampaignName(campaignWithRecording);
      Dial.clickPlayPauseButton();
      Dial.verifyPlayerCurrentTime('0:05');
      Dial.clickPlayPauseButton();
      Dial.clickForwardButton();
      Dial.verifyPlayerCurrentTime('0:15');
      Dial.clickBackwardButton();
      Dial.verifyPlayerCurrentTime('0:05');
      Dial.clickPlayerCloseButton();
    });

    it('Change status to Available', () => {
      Dial.closeRecordingDialog();
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignWithoutRecording);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
    });

    it('Dial the Added Number', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickContactName('Twilio', 'Test');
      Dial.clickContactPhoneNumber();
      Dial.clickAcceptCallButton();
    });

    it('Verify that Agent status should be On Call', () => {
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Twilio Test');
    });

    it('End the Call and select the Disposition', () => {
      Dial.endCallAtTime('0:15');
      Dial.verifyCallDispositionWindow();
      Dial.selectCallDisposition('No Answer');
      Dial.clickOnButton('Done');
    });

    it('verify that Call recording should not be available in Recent Contacts', () => {
      Dial.clickOnMenu('Reports');
      Dial.clickOnSubMenu('Recent Contacts');
      Dial.verifyCallRecordingIcon(campaignWithoutRecording,false);
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignWithRecording);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
      Dial.clickThreeDotMenuBtn(campaignWithoutRecording);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Should delete the added Contact', () => {
      contact.clickToCloseSoftphone();
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Twilio', 'Test');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
      Dial.clickSoftphoneButton();
    });
  });

  describe('Predictive campaign with Daily Connects Limit of 1', () => {
    const campaignName = 'Daily Connect Campaign';
    const listName = 'twilio.csv';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        data.flag = false;
        cy.writeFile('cypress/fixtures/testData.json', JSON.stringify(data));
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      cy.reload();
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'Busy',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.enterSimultaneousDialsPerAgent('3');
      Dial.selectRetryTimeDropdown('sec');
      Dial.clickOnButton('Got it')
      Dial.enterRetryTime('10');
      Dial.enterMaxAttemptPerRecord('3');
      Dial.enterDailyConnectsLimit('1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(listName);
      contact.clickImportContacts();
      contact.uploadFileForContact(listName);
      cy.wait(2000);
      Dial.selectMappingFields([
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
      contact.clickNextButton();
      contact.clickSubmitButton();
      contact.verifyImportStartedToast();
      contact.verifyImportContactCompleteToast();
    });

    it('Assign the Imported List to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListAssignToCampaign(listName);
      Dial.verifyModalTitle('Assign To Campaign');
      Dial.chooseCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('List has been assigned to the campaigns');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(1000);
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      Dial.verifySoftphoneLinesNumber(3);
      cy.wait(2000);
    });

    it('Attempting to Call the imported numbers and marking it as Successful sale', () => {
      Dial.verifyCallConnectForCampaign(
        ['Test Number'],
        '0:20',
        'Successful Sale'
      );
      cy.wait(4000);
    });

    it('Verifying that the campaign status should be Connects Limit Reached', () => {
      Dial.clickOnMenu('Dashboard');
      cy.reload();
      ignoreSpeedTestPopup();
      cy.wait(2000);
      Dial.clickOnMenu('Campaigns');
      camp.verifyCampaignStatus(campaignName, 'Connects Limit Reached');
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    it('Delete the Uploaded List', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListDeleteButton(listName);
      contact.handleAlertForDelete();
      Dial.verifySuccessToastMessage('List deleted');
    });
  });

  describe('Verify Predictive Campaign dialing with campaign status', () => {
    const campaignName = 'New Leads Campaign';
    const list1 = 'twilio.csv';

    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });

    after(() => {
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a new Predictive Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      Dial.enterCampaignName(campaignName);
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickOnRadioButton('Automatic Answer');
      Dial.enterSimultaneousDialsPerAgent('2');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(list1);
      contact.clickImportContacts();
      contact.uploadFileForContact(list1);
      cy.wait(2000);
      Dial.selectMappingFields([
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
    });

    it('Assign the Imported list to the Created Campaign', () => {
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      Dial.clickListAssignToCampaign(list1);
      Dial.verifyModalTitle('Assign To Campaign');
      Dial.chooseCampaignToAssign(campaignName);
      Dial.clickOnButton('Continue');
      Dial.verifySuccessToastMessage('List has been assigned to the campaigns');
    });

    it('Verify the campaign status before agent start dialing campaign type predictive dialer', () => {
      Dial.clickOnMenu('Campaigns');
      camp.verifyCampaignStatus(campaignName,'No Active Agents');
    });

    it('Verify the Campaign status (No Active Agents)when no agents are logged in for that campaign (campaign type Predictive dialer)', () => {
      Dial.verifyAgentStatus('PrepWork');
      camp.verifyCampaignStatus(campaignName,'No Active Agents');
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
      Dial.verifySoftphoneLinesNumber(3);
    });

    it('Verify the campaign status when the agent make the status available and start dialing a campaign of type predictive dialer', () => {
      Dial.clickOnMenu('Dashboard');
      Dial.clickOnMenu('Campaigns');
      camp.verifyCampaignStatus(campaignName,'Dialing');
    });

    it('Verify that system dial contacts if there are new leads present in Campaign', () => {
      Dial.disconnectAvailableCall();
      Dial.verifyPhoneRingingIcon();
    });

    it('Verify the Campaign status (Inter dialing pause) when an agent starts dialing a campaign type Predictive dialer', () => {
      Dial.clickOnMenu('Dashboard');
      Dial.clickOnMenu('Campaigns');
      camp.verifyCampaignStatus(campaignName,'Interdialing Pause'); //when leads or timeout over then Interdialing pause show
    });

    it('Delete the Created Campaign', () => {
      Dial.disconnectAvailableCall();
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
    });

    // it('Delete the Uploaded List', () => {
    //   Dial.clickOnMenu('Contacts');
    //   Dial.clickOnSubMenu('Contact Lists');
    //   Dial.clickListDeleteButton(list1);
    //   contact.handleAlertForDelete();
    //   Dial.verifySuccessToastMessage('List deleted');
    // });
  });

  describe('Verify Preview Campaign dialing with campaign status', () => {
    const contactList = 'twilio';
    const campaignName = 'Manual Dialing';
    const random = Math.floor(Math.random() * 100);
    before(() => {
      cy.visit('/');
      Cypress.Cookies.defaults({
        preserve: (cookies) => {
          return true;
        },
      });
    });
    beforeEach(() => {
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
      });
    })

    after(() => {
      cy.reload();
      ignoreSpeedTestPopup();
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      verifyCloseApp();
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create the New Preview Dialer', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.verifyCampaignExisting(campaignName);
      Dial.clickOnButton('NEW CAMPAIGN');
      Dial.clickOnRadioButton('Preview Dialer');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.selectPhoneNumber(testData.Number);
      camp.selectContactLists(contactList);
      Dial.enterCampaignName(campaignName); 
      cy.wait(1000);
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Answering Machine',
        'No Answer',
        'Successful sale'
      ]);
      Dial.clickAdvanceConfiguration();
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickTermsConditionsCheckbox();
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
    });

    it('Verify that View Contact page is displayed when Click on NEXT CONTACT in the Dialpad during manual mode of dialing (Preview Dialer)', () => {
      camp.verifyNextLeadBtn();
      camp.clickSoftphoneNextLead();       //BAT-T1174
      cy.wait(2000)
      camp.verifyDialPadNumber();
      Dial.verifyContactViewPage();
    });

    it('Verify that the  contact number along with type of the call  is displayed in the header of the view Contact page when dialing', () => {
      Dial.clickAcceptCallButton();
      Dial.verifyPhoneHeaderValue(testData.dialNumber,'Outbound');
    });

    it('Verify that authorized agent user is able to edit the contact info while engaged on a call', () => {
      contact.enterFirstName('Testing'+random);
      contact.enterLastName('-edited');
      Dial.verifyCallEnd();
      contact.clickSaveButton();
      contact.verifySuccessToast();
      Dial.verifyCallEnd();
      contact.clickingOnContactOption();
      contact.verifyAddedContacts('Testing' +random , '-edited');
    });

    it('Delete the Created Campaign', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickThreeDotMenuBtn(campaignName);
      Dial.clickOnDropdownItem('Archive');
      Dial.verifySuccessToastMessage('Campaign Archived');
      Dial.clickOnMenu('Contacts');
      Dial.clickOnSubMenu('Contact Lists');
      contact.verifyListExisting(contactList+'.csv');
    }); 
  });

});

describe('Verify Softphone Re-Design Scenerios', () => {
  before(() => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      testData = data;
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
  });

  after(() => {
    cy.Logout();
  });

  it('Login To Application', () => {
    verifyCloseApp();
    cy.Login(Cypress.env('username'), Cypress.env('password'));
    ignoreSpeedTestPopup();
  });

  it('Verify Elements of Softphone Dialer', () =>{
    Dial.clickToOpenSoftphone();
    Dial.verifySoftphonePresenceLight();
    Dial.verifySoftphonePresenceName('PrepWork');
    Dial.verifySoftphonePresenceTime('00:');
    Dial.verifySoftphoneSwitchTab(['Campaigns','Phone','Settings']);
  });

  it('Verify campaign tab from softphone', () => { //BAT-T1176
    Dial.verifySoftphoneCampSearchbox();
    Dial.verifySoftphoneCampaignList();
    Dial.verifySoftphoneDialerModeIcon();
    Dial.verifyContactAndDateIcon();
    Dial.verifySoftphoneCampaignName();
    Dial.verifySoftphoneCampLeadsCount();
    Dial.verifySoftphoneCampDate('/20');
    Dial.verifySoftphoneCampaignBtn('Join');
  });

  it('Verify Status icon', () => {
    Dial.clickSoftphoneAgentPresence();
    Dial.verifyStatusChangeWindow();
    Dial.verifyAgentStatusList([
      'Available',
      'Break',
      'Lunch',
      'In training',
      'Out of desk',
      'Offline',
      'In Meeting',
      'PrepWork',
      'After Call'
    ]);
  });

  it('Verify that user can go back by using back icon and by the clicking remainng area of the from Status page', () => {
    Dial.ClickBackFromStatusChangeWindow();
    Dial.verifyStatusChangeWindow('notExist');
    Dial.clickSoftphoneAgentPresence();      //go to status window again
    Dial.verifyStatusChangeWindow();
    Dial.clickSoftphoneAgentPresence(); // come back from status page when click any outside element from status page
    Dial.verifyStatusChangeWindow('notExist');
  });

  it('Verify that user can select any status', () => {
    Dial.clickSoftphoneAgentPresence();
    Dial.selectOption('Break');
    Dial.verifySoftphonePresenceName('Break');
    Dial.verifyAgentStatus('Break');

    Dial.clickSoftphoneAgentPresence();
    Dial.selectOption('Lunch');
    Dial.verifySoftphonePresenceName('Lunch');
    Dial.verifyAgentStatus('Lunch');

    Dial.clickSoftphoneAgentPresence();
    Dial.selectOption('In training');
    Dial.verifySoftphonePresenceName('In training');
    Dial.verifyAgentStatus('In training');

    Dial.clickSoftphoneAgentPresence();
    Dial.selectOption('Out of desk');
    Dial.verifySoftphonePresenceName('Out of desk');
    Dial.verifyAgentStatus('Out of desk');

    Dial.clickSoftphoneAgentPresence();
    Dial.selectOption('In Meeting');
    Dial.verifySoftphonePresenceName('In Meeting');
    Dial.verifyAgentStatus('In Meeting');
  });

  it('Verify that user not able to select After Call status and its only shows when call is getting disconnected', () => {
    Dial.clickSoftphoneAgentPresence();
    Dial.verifyDisabledStatus('After Call'); //call disconnect testcase shown below with status 
  });

  it('Verify that time spent by agent in the current status is displayed in the top bar', () => {
    Dial.selectOption('PrepWork');
    Dial.verifySoftphonePresenceTime('00:00:0');
    Dial.verifyAgentStatus('00:00:0');
  });

  it('Verify that A user with Agent feature is able to open the Settings tab in the Softphone', () => { 
    Dial.clickSoftphoneSwitchTab('Settings');
    Dial.verifySoftphoneSettingVisible();
  });

  it('Verify the Elements in the Settings tab in the softphone',() => { // BAT-1178
    Dial.verifyCallRingtoneDropdown('Inbound Call Ringtone');
    Dial.verifySpeakerIcon('Inbound Call Ringtone');
    Dial.verifyPlayConnectToggleSwitch('Play Connecting Sound');
    Dial.verifySoftphonePresenceName('PrepWork');
  });

  it('Verify the Play Connecting sound toggle switch is enabled always', () => {
    Dial.verifySoundTrackingEnabled('Play Connecting Sound');
  });

  it('Verify that a user is able to play back the ringtone from the dropdown', () => {
    Dial.selectCallRingtone('Inbound Call Ringtone','Modern Ringtone 1');
    Dial.clickOnRingtoneSpeaker('Inbound Call Ringtone');
    cy.wait(2000);
  });

  it('Verify that user cannot click on phone tab without join a campaign', () => {
    Dial.clickSoftphoneSwitchTab('Phone'); 
    contact.verifyErrorToastMessage('Please select the campaign first.');
  })

  it('Verify Search Campaign Functionality', () => {
    Dial.searchCampaign(testData.campaign);
    Dial.verifyCampaignName(testData.campaign);
  });

  it('Verify join and leave tab', () => {
    Dial.verifySoftphoneCampaignBtn('Join');          
    Dial.clickCampaignBtn('Join');
    Dial.clickSoftphoneSwitchTab('Campaigns');  //BAT-T1179
    Dial.verifySoftphoneCampaignBtn('Leave');      
  });

  it('Verify phone tab', () => {
    Dial.clickSoftphoneSwitchTab('Phone');  
    Dial.verifySoftPhoneOpen();
  });

  it('Verify that user can dial number manually', () => {
    contact.dialPhoneNumber('1234567890');
    contact.verifyDialPadNumber('1234567890');
    Dial.clickDialerBackspace(10);
  });

  it('Verify that user can use their computer keyboard to enter the digits 0 - 9 and the * and # characters', () => {
    contact.dialPhoneNumber('##＊#＊#');
    contact.verifyDialPadNumber('##*#*#');
  })






});
