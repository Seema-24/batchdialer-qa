import { closeDialogBox, getDate, handlePoorConnectionPopup, ignoreSpeedTestPopup, verifyCloseApp } from "../../support/Utils";
import Addons from "../../support/pages/Addons";
import Contacts from "../../support/pages/Contacts";
import Dashboard from "../../support/pages/Dashboard";
import Register from "../../support/pages/Register";


let testData;
let date = [];
const addon = new Addons();
const cont = new Contacts();
const dash = new Dashboard();
const regs = new Register();

describe('', () => {
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
        date = getDate(14);
    });

    beforeEach(() => {
        handlePoorConnectionPopup();
        closeDialogBox();
    });

    after(() => {
        cy.Logout();
    })

    it('Login To Application', () => {
        cy.Login(Cypress.env('username'), Cypress.env('password'));
        ignoreSpeedTestPopup();
      });

    it('verify that Add-ons should be display in Bottom', () => {
        addon.verifyBottomMenu('Add-ons');
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

    it('Verify that Advanced Phone Reputation Add on is available on ADD-ONS store', () => {
        dash.verifyRecommendedAddons('Advanced Phone Reputation');
    });

    it('Verify that BUY SUBSCRIPTION modal being poped up when click on the toggle button in the advanced phone reputation ADD-ON', () =>{
        addon.clickOnMenu('Add-ons');
        addon.clickAddonSwitch('Advanced Phone Reputation');
        addon.verifyModalTitle('BUY SUBSCRIPTION');
    });

    it('Verify the CANCEL button functionality in the BUY SUBSCRIPTION modal in the ADD-ON store', () => {
        cont.clickOnButton('Cancel');
        addon.verifyModalTitle('BUY SUBSCRIPTION','notExist');
    });






    // it('Verify that a user is able to purchase Advanced Phone Reputation ADD-ON', () => {
    //     cy.url().then((url) => {
    //       if(url.includes('qa.int.batchdialer.com')) {
    //         cy.Login(testData.registerEmail, 'Test@123');
    //         ignoreSpeedTestPopup();
    //         addon.clickOnMenu('Add-ons');
    //         addon.clickAddonSwitch('Advanced Phone Reputation');
    //         addon.verifyModalTitle('BUY SUBSCRIPTION');
    //         cont.clickOnButton('Confirm');
    //         cont.verifySuccessToastMessage('Advanced Phone Reputation add-on is successfully activated');
    //         dash.clickUserProfile();
    //         dash.clickBilling();
    //         dash.verifyAddonInActiveProduct('Advanced Phone Reputation');
    //       }
    //     })
    //   });
    
    //   it('', () => {
    //     cy.url().then((url) => {
    //       if(url.includes('qa.int.batchdialer.com')) {
    //         addon.clickOnMenu('Add-ons');
    //         addon.clickAddonSwitch('Advanced Phone Reputation');
    //         addon.verifyModalTitle('Deactivate Advanced Phone Reputation Add-on');
    //         cont.clickOnButton('Proceed');
    //         cont.verifySuccessToastMessage('Advanced Phone Reputation add-on deactivation scheduled'); 
    //         dash.verifyAlertNotification('Add-on Advanced Phone Reputation will be cancelled on '+ date[1] + '.');
    //         cy.Logout();
    //       }
    //     })
    //   });


    // it('Delete account from the Super Admin Panel', () => {
    //     cy.url().then((url) => {
    //       if (url.includes('qa.int.batchdialer.com')) {
    //         cy.Login('god', 'god');
    //         regs.clickUserTreeDropdown('Switch Account');
    //         regs.clickOnUser('First Tenant');
    //         regs.clickOnUser('Reseller 1');
    //         regs.clickOnResellerUser();
    //         regs.handleAlertWindow();
    //         regs.clickClientsMenu();
    //         regs.enterUserToSearch(testData.registerEmail);
    //         regs.clickDeleteUserButton();
    //         regs.clickCancelNowRadioBtn();
    //         regs.clickOnButton('Continue');
    //         cy.Logout();
    //       }
    //     });
    //   });
    
});