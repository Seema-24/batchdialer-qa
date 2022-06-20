import UserPermission from "./pages/UserPermission";

const statusDropdown = '.nav-item .ss-select';
const speedTestPopup = '.modal-dialog div.modal-content';
const speedtestIgnoreButton = '.modal-dialog div.modal-content button';
const accountSID = Cypress.env('twilioSID');
const authToken = Cypress.env('twilioAuthToken');
const quickStartGuidePopUp = '#pendo-guide-container';
const callFunction = 'Takeover Call Functions';
const permit = new UserPermission();

export function selectAgentStatus(status) {
  handlePoorConnectionPopup();
  clickCallFunction();
  cy.get(statusDropdown)
    .invoke('show')
    .click()
    .contains(status)
    .scrollIntoView()
    .click();
}

export function ignoreSpeedTestPopup() {
  cy.get(speedtestIgnoreButton, { timeout: 40000 }).first().click({force:true});
}

export function skipTourGuidePopup() {
  cy.get('body').then(($body) => {
    if($body.find(quickStartGuidePopUp).length) {
      cy.contains('Skip Tour').click();
    }else {
      ignoreSpeedTestPopup();
    }
  })
}

export function call(toNumber, fromNumber) {
  cy.wait(2000);
  cy.request({
    method: 'POST',
    url: `https://api.twilio.com/2010-04-01/Accounts/${accountSID}/Calls.json`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      To: toNumber,
      From: fromNumber,
      Twiml:
        '<Response><Say voice="man" >Hello, how may i help you. this call is only for testing purpose. Enjoy the music</Say>' +
        '<Play>http://demo.twilio.com/docs/classic.mp3</Play> </Response>',
    },
    auth: {
      username: accountSID,
      password: authToken,
    },
  });
}

export function callWithHangup(toNumber, fromNumber) {
  cy.wait(2000);
  cy.request({
    method: 'POST',
    url: `https://api.twilio.com/2010-04-01/Accounts/${accountSID}/Calls.json`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      To: toNumber,
      From: fromNumber,
      Twiml:
        '<Response><Say voice="man" >Hello, how may i help you. this call is only for testing purpose. Enjoy the music</Say>' +
        '<Pause length="8"/> <Hangup/> </Response>',
    },
    auth: {
      username: accountSID,
      password: authToken,
    },
  });
}

export function covertNumberToNormal(num) {
  const number = num;
  let convertedNumber = '';
  for (let i = 0; i < number.length; i++) {
    if (
      number[i] !== '(' &&
      number[i] !== ')' &&
      number[i] !== ' ' &&
      number[i] !== '-'
    ) {
      convertedNumber = convertedNumber + number[i];
    }
  }
  return convertedNumber;
}

export function clickCallFunction() {
  cy.wait(1000);
  cy.get('body').then(($body) => {
    if($body.text().includes(callFunction)) {
      cy.contains(callFunction).click();
    }
  })
}

export function handlePoorConnectionPopup() {
  cy.get('body').then(($body) => {
    if($body.text().includes('Poor Connection')) {
      cy.contains('Got it').click();
    }
  })
}

export function verifyRoleTitle() {
  cy.get('.profile_drop').then((profile) => {
    if(profile.text().includes('Agent')) {
      permit.clickBackToAdminBtn();
      ignoreSpeedTestPopup();
    } else if(profile.text().includes('Supervisor')) {
      permit.clickBackToAdminBtn();
      ignoreSpeedTestPopup();
    }
  })
}
