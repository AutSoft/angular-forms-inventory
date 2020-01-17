/// <reference types="Cypress" />

describe('Inventory tests', () => {
  beforeEach(() => {
    fetch('https://autsoftangulare2e.azurewebsites.net/api/Inventory/resetDatabase?password=123');
  });

  it('should delete first item', () => {
    cy.visit('/');

    cy.get('table tbody tr').then(prevList => {
      cy.get(`[mattooltip="Delete"]`)
        .first()
        .click();
      cy.get(`table tbody tr`).should("have.length", prevList.length - 1);
    });
  });
});
