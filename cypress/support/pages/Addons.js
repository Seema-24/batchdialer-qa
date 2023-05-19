import PhoneNum from "./PhoneNum";

const menu = (menuName) => `li:not(.subitem) a[title="${menuName}"]`;
const btn = (btn) => `//button[text()="${btn}"]`;
const switchBtn = (title) => `//div[div[contains(@class,"card-title")][text()="${title}"]]//span[normalize-space(@class)="switch"]`;
const modal = '.modal-content';

const addNum = new PhoneNum();

export default class Addons {

    verifyBottomMenu(menu) {
        cy.get('.side_menu-list a').last().should('have.attr', 'title', menu)
    }

    clickOnMenu(menuName) {
        cy.get(menu(menuName)).click({ force: true });
    } 
    
    clickAddonSwitch(title) {
        cy.xpath(switchBtn(title), {timeout:60000})
          .click({force:true});
    }

    verifyModalTitle(title, cond) {
        if('notExist' === cond) {
            cy.get('.modal-header').should('not.exist');
        } else {
            cy.get('.modal-header').should('have.text', title);
        }
    }

    verifyPropertyTab(cond) {
        if(cond == 'Invisible') {
            cy.xpath(btn('Property Details')).should('not.exist');
        } else {
            cy.xpath(btn('Property Details')).should('be.visible');
        }   
    }

    verifyAddonSubscriptionText(ele) {
        for (let i = 0; i < ele.length; i++) {
            cy.get(modal+ ' .addon_subscribe').should('contain.text', ele[i]); 
        }
    }

    verifyAddonAmt(amt)  {
        cy.get('.addon_subscribe__amount .total').should('have.text', amt)
    }

    verifyInputSpinner() {
        cy.get('.input-spinner').should('be.visible');
    }

    verifyPriceVisible(price) {
        for (let i = 0; i < price.length; i++) {
            cy.get('.price').should('contain.text', price[i])
        }
    }

    verifySwitchVisible() {
        cy.get('.switch').should('be.visible').and('have.length', 2);
    }

    verifyCardTitle(title) {
        for (let i = 0; i < title.length; i++) {
            cy.get('.card-title').should('be.visible').and('contain.text',title[i]);
        }
    }

    verifyDescription(desc) {
        for (let i = 0; i < desc.length; i++) {
            cy.get('.card-discription').should('contain.text',desc[i])   
        }
    }

    clickOnPlusMinusIcon (btn, val) {
        for (let i = 0; i < val; i++) {
            if(btn === '+') {
                cy.get('[data-icon="plus"]').first().click();
            } else {
                cy.get(`[data-icon="minus"]`).first().click();
            }
        }
    }

    verifyInputValue(expVal) {
        cy.get('.input-spinner input').invoke('val')
          .then((actVal) => {
          expect(expVal).to.equals(parseInt(actVal)); 
        })
    }

    verifyAmount(expVal) {
        cy.get('.total').then((value) => {
            let actVal = value.text();
            expect(expVal).to.equals(actVal); 
      })
    }

    VerifyPriceAndPhoneBundle(val) {
        const phoneBundle = 15*(val+1);
        const Amount = '$' + 49*(val+1);
        this.verifyInputValue(phoneBundle);
        this.verifyAmount(Amount);
    }

    clickOnArrow() {
        cy.get('[src*="arrow"]').click();
    }

    verifyModalContent(desc) {
        for (let i = 0; i < desc.length; i++) {
            cy.get(modal+ ' p').should('contain.text',desc[i])   
        }
    }
    
    verifyModalHeading(title, cond) {
        if('notExist' === cond) {
            cy.get('.modal-heading').should('not.exist');
        } else {
            cy.get('.modal-heading').should('have.text', title);
        }
    }

    clickCloseModal() {
        cy.get('.cross').click();
    }

    clickPhoneNumberMenuDropdown() {
        cy.wait(2000).get('.resizable-table-container').then(($table) => {
            if($table.find('[src*="nodatatable"]').length) {
                addNum.clickBuyDidButton();
                addNum.selectStateModeOption('Colorado');
                addNum.selectNumberOneByOne(3);
                addNum.clickOrderNowButton();
                addNum.closingDialog();
                cy.wait(2000);
                this.clickReputaionPhoneDropdown();
            } else {
                this.clickReputaionPhoneDropdown(); 
            }
        });
    }

    clickReputaionPhoneDropdown() {
        cy.wait(2000).xpath(`//div[div[@class="td"][4][text()="-"]]//div[@class="dropdown"]//img`,{ timeout: 5000 })
        .first()
        .scrollIntoView({force:true})
        .click({force:true});
    }

    



}