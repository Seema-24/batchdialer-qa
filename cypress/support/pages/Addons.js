const menu = (menuName) => `li:not(.subitem) a[title="${menuName}"]`;
const btn = (btn) => `//button[text()="${btn}"]`;
const switchBtn = (title) => `//div[div[contains(@class,"card-title")][text()="${title}"]]//span[normalize-space(@class)="switch"]`;

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
}