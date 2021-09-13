import Contacts from '../support/pages/Contacts';
import Dialer from '../support/pages/Dialer';
import Setup from '../support/pages/Setup';
import {
  call,
  callWithHangup,
  covertNumberToNormal,
  ignoreSpeedTestPopup,
  selectAgentStatus,
} from '../support/Utils';

let testData;
const Dial = new Dialer();
const setup = new Setup();
const contact = new Contacts();

describe('Inbound Call Scenarios', () => {
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
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('create new Predictive Dialer Campaign with Auto Answer Mode', () => {
      setup.assignNumberToAgent(testData.Number, testData.AdminName);
      Dial.clickOnMenu('Campaigns');
      Dial.clickOnButton('CREATE NEW CAMPAIGN');
      Dial.clickAdvanceSwitch();
      Dial.enterCampaignName(campaignName);
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.clickOnRadioButton('Individual Numbers');
      Dial.clickNumbersDropdown();
      Dial.selectPhoneNumber(testData.Number);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Auto Answer');
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Abandoned',
        'Answering Machine',
        'Busy',
        'Call Back',
        'Disconnected Number',
        'Do Not Call',
        'No Answer',
        'Not Interested',
        'Successful sale',
        'Unknown',
        'Voicemail',
      ]);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Individual Agents');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.clickOnButton('SAVE');
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
          cy.log('Inbound Calls not working in QA');
        }
      });
    });

    it('Verify that calls are Auto Answering if Agent is Available', () => {
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
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('create new Predictive Dialer Campaign with Auto Answer Mode', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickOnButton('CREATE NEW CAMPAIGN');
      Dial.clickAdvanceSwitch();
      Dial.enterCampaignName(campaignName);
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.clickOnRadioButton('Individual Numbers');
      Dial.clickNumbersDropdown();
      Dial.selectPhoneNumber(testData.Number);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Ringing Sound');
      cy.wait(1000);
      Dial.clickOnRadioButton('Ringing Sound');
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Abandoned',
        'Answering Machine',
        'Busy',
        'Call Back',
        'Disconnected Number',
        'Do Not Call',
        'No Answer',
        'Not Interested',
        'Successful sale',
        'Unknown',
        'Voicemail',
      ]);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Individual Agents');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.clickOnButton('SAVE');
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
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create a campaign for the Queue', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickOnButton('CREATE NEW CAMPAIGN');
      Dial.clickAdvanceSwitch();
      Dial.enterCampaignName(campaignName);
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.clickOnRadioButton('Individual Numbers');
      Dial.clickNumbersDropdown();
      Dial.selectPhoneNumber(testData.Number);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Auto Answer');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Abandoned',
        'Answering Machine',
        'Busy',
        'Call Back',
        'Disconnected Number',
        'Do Not Call',
        'No Answer',
        'Not Interested',
        'Successful sale',
        'Unknown',
        'Voicemail',
      ]);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Individual Agents');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.clickOnButton('SAVE');
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
          Dial.clickOnMenu('Reports');
          Dial.verifyInqueueCall('5202010331');
          cy.wait(8000);
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
          cy.wait(5000);
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
      call(callNumber, +15202010331);
      Dial.clickOnMenu('Reports');
      Dial.clickOnSubMenu('Recent Contacts');
      Dial.verifyRecentContactDisposition('Abandoned');
    });
  });
});

describe('Outbound Calling Scenarios', () => {
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
      selectAgentStatus('Offline');
      cy.Logout();
    });

    it('Login To Application', () => {
      cy.Login(Cypress.env('username'), Cypress.env('password'));
      ignoreSpeedTestPopup();
    });

    it('Create the New Preview Dialer', () => {
      Dial.clickOnMenu('Campaigns');
      Dial.clickOnButton('CREATE NEW CAMPAIGN');
      Dial.clickAdvanceSwitch();
      Dial.enterCampaignName(campaignName);
      Dial.clickOnRadioButton('Preview Dialer');
      cy.wait(1000);
      Dial.clickOnRadioButton('Preview Dialer');
      Dial.clickOnRadioButton('Individual Numbers');
      Dial.clickNumbersDropdown();
      Dial.selectPhoneNumber(testData.Number);
      Dial.clickNextButton();
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Abandoned',
        'Answering Machine',
        'Busy',
        'Call Back',
        'Disconnected Number',
        'Do Not Call',
        'No Answer',
        'Not Interested',
        'Successful sale',
        'Unknown',
        'Voicemail',
      ]);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Individual Agents');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.clickOnButton('SAVE');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Add the New Contact for the Outbound call', () => {
      contact.clickingOnContactOption();
      contact.clickAddNewContactButton();
      contact.selctCreateNewContactOption();
      contact.enterFirstName('Twilio');
      contact.enterLastName('Test');
      contact.enterAddress('anyAddress');
      contact.enterCity('Tucson');
      contact.selectState('Arizona');
      contact.enterZipCode('85701');
      contact.enterEmail('test@test.com');
      contact.enterPhoneNumber('5202010331');
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
      Dial.verifySoftphoneTitle(['Twilio Test']);
    });

    it('End the Call and select the Disposition', () => {
      Dial.endCallAtTime('0:50');
      Dial.verifyCallDispositionWindow();
      Dial.selectCallDisposition('No Answer');
      Dial.clickOnButton('Done');
    });

    it('Should delete the added Contact', () => {
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

  describe.only('Predictive Campaign Dialing', () => {
    const campaignName = 'Predictive Campaign';
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
      Dial.clickOnButton('CREATE NEW CAMPAIGN');
      Dial.clickAdvanceSwitch();
      Dial.enterCampaignName(campaignName);
      Dial.clickOnRadioButton('Predictive Dialer');
      Dial.clickOnRadioButton('Individual Numbers');
      Dial.clickNumbersDropdown();
      Dial.selectPhoneNumber(testData.Number);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Auto Answer');
      Dial.clickCallingHoursDropdown();
      Dial.selectFromTime('12:00 am');
      Dial.selectToTime('11:30 pm');
      Dial.clickApplyToAllButton();
      Dial.clickOnButton('APPLY');
      Dial.clickCallResultsDropdown();
      Dial.selectCallResults([
        'Abandoned',
        'Answering Machine',
        'Busy',
        'Call Back',
        'Disconnected Number',
        'Do Not Call',
        'No Answer',
        'Not Interested',
        'Successful sale',
        'Unknown',
        'Voicemail',
      ]);
      Dial.clickNextButton();
      Dial.clickOnRadioButton('Individual Agents');
      Dial.selectAgentToAssign(testData.AdminName);
      Dial.clickOnButton('SAVE');
      Dial.verifySuccessToastMessage('Campaign Created');
    });

    it('Upload the List of Contacts', () => {
      Dial.clickOnMenu('Contacts');
      contact.clickAddNewContactButton();
      contact.selectUploadFileOption();
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
    });

    it('Change status to Available', () => {
      Dial.selectStatus('Available');
      Dial.verifySelectCampaignBoxHeading();
      Dial.clickSelectCampaignDropdown();
      Dial.selectCampaign(campaignName);
      Dial.clickConfirmButton();
      Dial.verifySoftPhoneOpen();
    });

    it('Verify that Agent status should be On Call', () => {
      Dial.verifyAgentStatus('On Call');
      Dial.verifySoftphoneTitle([
        'Test Number1',
        'Test Number2',
        'Test Number3',
      ]);
    });

    it('End the Call and select the Disposition', () => {
      Dial.endCallAtTime('0:30');
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
});
