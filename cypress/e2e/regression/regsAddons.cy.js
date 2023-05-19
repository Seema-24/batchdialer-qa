import { closeDialogBox, handlePoorConnectionPopup, ignoreSpeedTestPopup, verifyCloseApp } from "../../support/Utils";
import Addons from "../../support/pages/Addons";
import Contacts from "../../support/pages/Contacts";
import Dashboard from "../../support/pages/Dashboard";
import PhoneNum from "../../support/pages/PhoneNum";
import Register from "../../support/pages/Register";


let testData, date, count = 0;
const addon = new Addons();
const cont = new Contacts();
const dash = new Dashboard();
const regs = new Register();
const phone = new PhoneNum();

describe('Add-ons Flow', () => {
    before(() => {
        cy.visit('/', {failOnStatusCode:false});
       cy.fixture('testData').then((data) => {
        testData = data;
       });
      
        Cypress.Cookies.defaults({
            preserve : (Cookies) => {
                return  true;
            }
        });
        const dayjs = require("dayjs");
        date = dayjs().add(1,"months").format("MM/DD/YYYY");
    });

    beforeEach(() => {
        handlePoorConnectionPopup();
        closeDialogBox();
    });

    after(() => {
        cy.Logout();
    });

    it('Login To Application', () => {
        cy.Login(Cypress.env('username'), Cypress.env('password'));
        ignoreSpeedTestPopup();
      });

    it('verify that Add-ons should be display in Bottom', () => {
        addon.verifyBottomMenu('Add-ons');
    });

    it('Verify Information, Description and Elements of Free and Paid ADD-ONS Card', () => {
        addon.clickOnMenu('Add-ons');
        addon.verifyPriceVisible(['FREE', '$49per bundle of 15 numbers']);
        addon.verifySwitchVisible();
        addon.verifyCardTitle(['Property Details', 'Advanced Phone Reputation']);
        addon.verifyDescription([
            'We offer the most robust and most comprehensive property data in the industry, including: address, parcel, building and other property related information.',
            'Advanced phone reputation monitors your BatchDialer phone numbers across the major carriers, call blocking apps and other phone reputation aggregators.'
        ]);
    });

    it('verify that user should be able to deactivate Add-ons', () => {
        addon.clickOnMenu('Add-ons');
        addon.clickAddonSwitch('Property Details');
        addon.verifyModalTitle('Deactivate Property Details Add-on');
        cont.clickOnButton('Proceed');
        cont.verifySuccessToastMessage('Property Details add-on is successfully deactivated'); //BAT-940
    });

    it('verify that when user Disable Property Add-ons property Details Tab should not shown in Contact edit page', () => {
        cont.clickingOnContactOption();
        cont.enterSearch(testData.Contact);
        cont.clickContactName(testData.Contact);
        addon.verifyPropertyTab('Invisible');
    });

    it('Verify that when User Disable property related add ons it should display on billing page under Recommended section', () => {
        dash.clickUserProfile();
        dash.clickBilling();
        dash.verifyRecommendedAddons('Property Details');
    });

    it('verify that user should be able to enable Add -ons for Property Details', () => {
        addon.clickOnMenu('Add-ons');
        addon.clickAddonSwitch('Property Details');
        cy.wait(3000);
        cont.verifySuccessToastMessage('Property Details add-on is successfully activated'); //BAT-T939
    });

    it('verify that when user Enable Property Details Add-ons Property Details Tab should be Display in contact edit page', () => {
        cont.clickingOnContactOption();
        cont.enterSearch(testData.Contact);
        cont.clickContactName(testData.Contact);
        addon.verifyPropertyTab();
    });

    it('verify that when user enable property Add-ons it should show on Billing page in Active product section', () => {
        dash.clickUserProfile();
        dash.clickBilling();
        dash.verifyAddonInActiveProduct('Property Details');
    });       

    it('Verify that Advanced Phone Reputation Add on is available on ADD-ONS store', () => {
        dash.verifyRecommendedAddons('Advanced Phone Reputation');
    });

    it('Verify that BUY SUBSCRIPTION modal being poped up when click on the toggle button in the advanced phone reputation ADD-ON', () =>{
        addon.clickOnMenu('Add-ons');
        addon.clickAddonSwitch('Advanced Phone Reputation');
        addon.verifyModalTitle('BUY SUBSCRIPTION');
    });

    it('Elements on Advanced Phone Reputation', () => {
        addon.verifyAddonSubscriptionText([
            'Advanced Phone Reputation',
            '$49',
            '/mo',
            'per bundle of 15 numbers',
            'Phone numbers',
            'Advanced phone reputation monitors your BatchDialer phone numbers across the major carriers, call blocking apps and other phone reputation aggregators.'
        ]);
        addon.verifyInputSpinner();
        addon.verifyAddonAmt('$49');
        dash.verifyButtonsVisible('Cancel');
        dash.verifyButtonsVisible('Confirm');
    });

    it('Verify that when click on -/+ in the BUY SUBSCRIPTION modal the prices are changing accordingly', () => {
        const clickToAdd = 3; 
        const increseBudle = clickToAdd;
        const clickToMinus = 1; 
        const decreseBundle = clickToAdd - clickToMinus;
        addon.clickOnPlusMinusIcon('+', clickToAdd);  
        addon.VerifyPriceAndPhoneBundle(increseBudle);   

        addon.clickOnPlusMinusIcon('-', clickToMinus);
        addon.VerifyPriceAndPhoneBundle(decreseBundle);
    });

    it('Verify the CANCEL button functionality in the BUY SUBSCRIPTION modal in the ADD-ON store', () => {
        cont.clickOnButton('Cancel');
        addon.verifyModalTitle('BUY SUBSCRIPTION','notExist');
    });

    it('Verify that More info modal is being poped up when click on the arrow icon in the Advanced phone reputation ADD-ON', () => {
        addon.clickOnArrow();
        addon.verifyModalHeading('Advanced Phone Reputation');
        addon.verifyModalContent([
            'Take control of your reputation!',
            'This add-on helps you manage your reputation by monitoring the health of your outbound calls and call connections, pulling information from multiple sources, including call centers, carriers, and third-party apps.',
            'This feature includes:',
            'Phone number reputation pre-screening.',
            'Daily Monitoring of phone number spam score rating.',
            'Auto-replacement of phone numbers that are marked as spam.'
        ]);
    });

    it('Verify the functionality of Close in the more info pop up', () => {
        addon.clickCloseModal();
        addon.verifyModalHeading('Advanced Phone Reputation', 'notExist');
    });

    it('Verify the Phone Number page phone reputation column if the ADD-ON is not activated', () => {
        phone.clickPhoneNumberMenu();
        phone.verifyPhoneReputationShieldIcon();
        phone.mouseOverOnShield();
        phone.verifyTooltipText([
            'Subscribe to Monitor Phone Number Reputations',
            "Advanced Phone Reputation provides comprehensive health monitoring of your company's outbound phone calls and call connections."
        ]);
        phone.clickOnShieldIcon();
        addon.verifyModalTitle('BUY SUBSCRIPTION');
    });

    it('Verify the functionality of Monitor Reputation menu item when advanced phone reputation add-on is not enabled', () => {
        phone.clickPhoneNumberMenu();
        phone.clickPhoneMenuDropdown(testData.Number);
        cy.wait(1000);
        phone.clickDropdownItem('Monitor Reputation');
        addon.verifyModalTitle('BUY SUBSCRIPTION');
    });

    it('Verify the tool tip on Reputation column heading', () => {
        phone.clickPhoneNumberMenu();
        phone.mouseOverOnReputationQuest();
        phone.verifyTooltipText(['0-2 flags', '3-5 flags', '6+ flags']);
    });

    // Dependent on Registration Page ( new user register )
    it('Verify that a user is able to purchase Advanced Phone Reputation ADD-ON', () => {
        cy.url().then((url) => {
            if(url.includes('qa.int.batchdialer.com')) {
                verifyCloseApp();
                cy.Login(testData.registerEmail, 'Test@123');
                ignoreSpeedTestPopup();
                addon.clickOnMenu('Add-ons');
                addon.clickAddonSwitch('Advanced Phone Reputation');
                addon.verifyModalTitle('BUY SUBSCRIPTION');
                cont.clickOnButton('Confirm');
                cont.verifySuccessToastMessage('Advanced Phone Reputation add-on is successfully activated');
            }
        });
    });

    it('Verify that Active Products section in the Billing page is updated when advanced phone reputation is activated', () => {
        cy.url().then((url) => {
            if(url.includes('qa.int.batchdialer.com')) {
                dash.clickUserProfile();
                dash.clickBilling();
                dash.verifyAddonInActiveProduct('Advanced Phone Reputation');
            }
        });
    });
    
    it('Verify that a user is able to deactivate the Advanced Phone reputation ADD-ON from ADD-ONS page', () => {
        cy.url().then((url) => {
            if(url.includes('qa.int.batchdialer.com')) {
                addon.clickOnMenu('Add-ons');
                addon.clickAddonSwitch('Advanced Phone Reputation');
                addon.verifyModalTitle('Deactivate Advanced Phone Reputation Add-on');
                cont.clickOnButton('Proceed');
                cont.verifySuccessToastMessage('Advanced Phone Reputation add-on deactivation scheduled'); 
                dash.verifyAlertNotification('Add-on Advanced Phone Reputation will be cancelled on '+ date + '.');
                dash.clickUserProfile();
                dash.clickBilling();
                dash.verifyAlertNotification('Add-on Advanced Phone Reputation will be cancelled on '+ date + '.');
            }
        });
    });

    it('Verify that an authorized user is able to cancel the scheduled de activation', () => {
        cy.url().then((url) => {
            if(url.includes('qa.int.batchdialer.com')) {
                dash.clickBillingNotificationBtn('Do Not Cancel');
                dash.verifySuccessMsg('Your add-on downgrade stopped');
                dash.verifyAlertMsgNotExist();
            }
        });
    });

    it('Verify that an authorized user is able to enable monitoring of a phone number', () => {
        cy.url().then((url) => {
            if(url.includes('qa.int.batchdialer.com')) {
                phone.clickPhoneNumberMenu();
                addon.clickPhoneNumberMenuDropdown();
                cy.wait(1000);
                phone.clickDropdownItem('Monitor Reputation');
                cont.verifySuccessToastMessage('Success added to Monitoring');
                phone.verifyAddedReputation('await');
                phone.verifyUsageReputationCount(++count);
                phone.verifyKpiUpdateCount(
                    ['Clean Numbers', 'Flagged', 'Flagged in Past 24h', 'Flagged in Past 7 days'], count 
                );
                cy.Logout();
            }
        });
    });


    it('Delete account from the Super Admin Panel', () => {
        cy.url().then((url) => {
            if (url.includes('qa.int.batchdialer.com')) {
                verifyCloseApp();
                cy.Login('god', 'god');
                ignoreSpeedTestPopup();
                regs.clickUserTreeDropdown('Switch Account');
                regs.clickOnUser('First Tenant');
                regs.clickOnUser('Reseller 1');
                regs.clickOnResellerUser();
                regs.handleAlertWindow();
                ignoreSpeedTestPopup();
                regs.clickClientsMenu();
                regs.enterUserToSearch(testData.registerEmail);
                regs.clickDeleteUserButton();
                regs.clickCancelNowRadioBtn();
                regs.clickOnButton('Continue');
            }
        });
    });
});