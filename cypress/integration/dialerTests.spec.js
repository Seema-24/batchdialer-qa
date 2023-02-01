import Campaign from '../support/pages/Campaigns';
import Contacts from '../support/pages/Contacts';
import Dialer from '../support/pages/Dialer';
import Report from '../support/pages/Report';
import Setup from '../support/pages/Setup';
import {
  call,
  callWithHangup,
  closeDialogBox,
  covertNumberToNormal,
  handlePoorConnectionPopup,
  ignoreSpeedTestPopup,
  selectAgentStatus,
  verifyCloseApp,
} from '../support/Utils';

let testData;
const Dial = new Dialer();
const setup = new Setup();
const contact = new Contacts();
const camp = new Campaign();
const report = new Report();

describe('Inbound Call Scenarios', () => {
  beforeEach(() => {
    closeDialogBox();
    handlePoorConnectionPopup();
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
      Dial.selectQueueCallMusicDropdown('Music 1');
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

    it('Verify that calls are Auto Answering if Agent is Unavailable', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          call(callNumber, +15202010331);
          Dial.verifySoftphone();
          Dial.verifyContactViewPage();
          cy.wait(5000);
          Dial.clickEndCallButton();
          Dial.verifyCallDispositionWindow();
          Dial.selectCallDisposition('No Answer');
          Dial.clickOnButton('Done');
          Dial.verifyCallEnd('No Answer');
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Verify the Dials and Answered Count in Reports Campaign Page', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          Dial.clickReportsMenu();
          Dial.clickOnSubMenu('Campaigns');
          cy.reload();
          ignoreSpeedTestPopup();
          report.clickCampaignCalanderDropdown();
          report.clickDateBtnLinks('Today');
          report.clickStatusDropdown();
          report.selectCampaignStatus('Active')
          Dial.verifyCampaignDialsCount(campaignName, 1);
          Dial.verifyCampaignAnsweredCount(campaignName, 1);
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
      Dial.selectQueueCallMusicDropdown('Music 1');
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
          call(callNumber, +15202010331);
          Dial.verifySoftphone();
          Dial.verifyContactViewPage();
          Dial.clickAcceptCallButton();
          cy.wait(5000);
          Dial.clickEndCallButton();
          Dial.verifyCallDispositionWindow();
          Dial.selectCallDisposition('No Answer');
          Dial.clickOnButton('Done');
          Dial.verifyCallEnd('No Answer');
        } else {
          cy.log('Inbound Calls are not working in QA');
        }
      });
    });

    it('Verify the Dials and Answered Count in Reports Campaign Page', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          Dial.clickOnMenu('Dashboard');
          cy.wait(1000);
          Dial.clickReportsMenu();
          Dial.clickOnSubMenu('Campaigns');
          Dial.clickOnMenu('Dashboard');
          cy.wait(1000);
          Dial.clickReportsMenu();
          Dial.clickOnSubMenu('Campaigns');
          cy.reload();
          ignoreSpeedTestPopup();
          report.clickCampaignCalanderDropdown();
          report.clickDateBtnLinks('Today');
          report.clickStatusDropdown();
          report.selectCampaignStatus('Active')
          Dial.verifyCampaignDialsCount(campaignName, 1);
          Dial.verifyCampaignAnsweredCount(campaignName, 1);
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      //Dial.clickNextButton();
      //Dial.clickOnRadioButton('Individual Agents');
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
          selectAgentStatus('Offline');
          callWithHangup(callNumber, +15202010331);
          Dial.clickDashboardMenu();
          Dial.verifyInqueueCall('5202010331');
          cy.wait(1000);
        } else {
          cy.log('Inbound calls are not working in QA');
        }
      });
    });

    it('Verify that if Agent is in Available status then agent should recieve call', () => {
      cy.url().then((url) => {
        if (url.includes('app.batchdialer.com')) {
          selectAgentStatus('Available');
          Dial.verifySelectCampaignBoxHeading();
          Dial.clickSelectCampaignDropdown();
          Dial.selectCampaign(campaignName);
          Dial.clickConfirmButton();
          Dial.verifySoftPhoneOpen();
          cy.reload();
          ignoreSpeedTestPopup();
          call(callNumber, +15202010331);
          Dial.verifySoftphone();
          Dial.verifyContactViewPage();
          cy.wait(5000);
          Dial.clickEndCallButton();
          Dial.verifyCallDispositionWindow();
          Dial.selectCallDisposition('No Answer');
          Dial.clickOnButton('Done');
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
      contact.clickingOnContactOption();
      contact.deleteAddedContacts('Unknown', 'Contact');
      contact.handleAlertForDelete();
      contact.verifyDeletedToast();
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
          call(callNumber, +15202010331);
          cy.wait(3000);
          Dial.clickOnMenu('Reports');
          Dial.clickOnSubMenu('Recent Contacts');
          Dial.verifyRecentContactDisposition('Abandoned');
        } else {
          cy.log('Inbound calls are not working in QA');
        }
      })
    });
  });
});

describe('Outbound Calling Scenarios', () => {
  beforeEach(() => {
    closeDialogBox();
    handlePoorConnectionPopup();
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Add the New Contact for the Outbound call', () => {
      contact.clickingOnContactOption();
      contact.clickAddNewContactButton();
      contact.verifyContactExisting('5703870000')
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5703870000');
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
      Dial.endCallAtTime('0:10');
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
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
      cy.wait(1000)
    });

    it('Verify that Agent status should be On Call and End the Call and select the Disposition', () => {
      //Dial.verifyPhoneRingingIcon();
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Test Number');
      Dial.endCallAtTime('0:10');
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
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
      Dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify that Agent status should be On Call and End the Call and select the Disposition', () => {
      //Dial.verifyPhoneRingingIcon();
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle('Test Number');
      Dial.endCallAtTime('0:10');
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
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
      Dial.verifySoftphoneLinesNumber(1);
    });

    it('Verify that Agent status should be On Call', () => {
      Dial.clickOnMenu('Dashboard');
      Dial.verifySimultaneousDial(
        ['Twilio Test'],
          'On Call',
          '0:10',
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
      Dial.clickOnRadioButton('Ringing Sound');
      Dial.clickOnCheckboxButton('Answering Machine Detection');
      Dial.enterSimultaneousDialsPerAgent('3');
      Dial.enterMaxAttemptPerRecord('3');
      Dial.enterRetryTime('1');
      Dial.selectRetryTimeDropdown('min');
      Dial.clickOnButton('Got it')
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickQueueCheckbox();
      Dial.enterAbandonmentDuration('15');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    // it('Create a New Contact for Campaign', () => {
    //   contact.clickingOnContactOption();
    //   contact.verifyContactExisting('6029227636'); 
    //   contact.clickAddNewContactButton();
    //   contact.selctCreateNewContactOption();
    //   contact.enterFirstName('Twilio');
    //   contact.enterLastName('Number');
    //   contact.enterAddress('anyAddress');
    //   contact.enterCity('Tucson');
    //   contact.selectState('Arizona');
    //   contact.enterZipCode('85701');
    //   contact.enterEmail('test@test.com');
    //   contact.enterPhoneNumber('6029227636'); //5103256012
    //   contact.clickSaveButton();
    //   contact.verifySuccessToast();
    // });

    // it('Assign the Added Contact to the Created Campaign', () => {
    //   Dial.clickOnMenu('Contacts');
    //   Dial.clickContactThreeDotMenu('Twilio', 'Number');
    //   Dial.clickOnDropdownItem('Add to Campaign');
    //   Dial.verifyModalTitle('Select campaign');
    //   Dial.selectCampaignToAssign(campaignName);
    //   Dial.clickOnButton('Continue');
    //   Dial.verifySuccessToastMessage('Contacts added to campaign');
    //   cy.reload();
    //   ignoreSpeedTestPopup();
    //   cy.wait(2000);
    // });

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

    // it('Should delete the added Contact', () => {
    //   contact.clickToCloseSoftphone();
    //   contact.clickingOnContactOption();
    //   contact.deleteAddedContacts('Twilio', 'Number');
    //   contact.handleAlertForDelete();
    //   contact.verifyDeletedToast();
    //   Dial.clickSoftphoneButton();
    // });
  });

  describe('Campaign - Call Recording Feature', () => {
    const campaignWithRecording = 'Campaign with call recording';
    const campaignWithoutRecording = 'Campaign without Call Recording';
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

    it('Create a new Preview Campaign with Call Recording Feature', () => {
      Dial.clickOnMenu('Campaigns');
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickOnButton('Save');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Create a new Preview Campaign without the Call Recording Feature', () => {
      Dial.clickOnMenu('Campaigns');
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.disableCallRecording();
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
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
    });

    it('verify that Call recording should be available in Recent Contacts', () => {
      Dial.clickOnMenu('Reports');
      Dial.clickOnSubMenu('Recent Contacts');
      Dial.verifyCallRecordingIcon(campaignWithRecording,true);
    });

    it('Verify that costumer is able to play the recording', () => {
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
      //camp.clickTableRefreshBtn();
      Dial.verifyCallRecordingIcon(campaignWithoutRecording,false);
    });

    it('Delete the Created Campaign', () => {
      // contact.clickToCloseSoftphone();
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
    let callNumber = '+1';
    before(() => {
      cy.visit('/');
      cy.readFile('cypress/fixtures/testData.json').then((data) => {
        testData = data;
        callNumber = callNumber + covertNumberToNormal(testData.Number);
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
      Dial.selectQueueCallMusicDropdown('Music 1');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
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
        ['Test Number1'],
        '0:30',
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
      //camp.clickTableRefreshBtn();
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
});
