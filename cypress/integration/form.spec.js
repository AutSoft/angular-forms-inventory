/// <reference types="Cypress" />
import { fixCypressSpec } from '../support'

describe('Inventory tests', () => {
  beforeEach(() => {
    return fetch('https://autsoftangulare2e.azurewebsites.net/api/Inventory/resetDatabase?password=123');
  });

  beforeEach(fixCypressSpec(__filename));

  it('should delete first item', () => {
    cy.visit('/');

    cy.get('table tbody tr').then(prevList => {
      cy.get(`[mattooltip="Delete"]`)
        .first()
        .click();
      cy.get(`table tbody tr`).should("have.length", prevList.length - 1);
    });
  });

  it('should add new item', () => {
    cy.visit('/');

    cy.get('table tbody tr').then(prevList => {
      cy.contains('New item').click();

      cy.get('[placeholder=Name]').type('MacBook Pro 2018');
      cy.get('[placeholder=Type]').type('laptop');
      cy.get('[placeholder=Description]').type('MacBook Pro with Retina display');

      cy.contains('Details').click();

      cy.get('[placeholder=Count]').type(3);
      cy.get(`[placeholder='Count Date']`)
        .clear()
        .type('2020/01/13');
      cy.contains('Dimension data').click();
      cy.get('[placeholder=Width]')
        .clear()
        .type(20);
      cy.get('[placeholder=Height]')
        .clear()
        .type(30);
      cy.get('[placeholder=Depth]')
        .clear()
        .type(0.5);
      cy.get('[placeholder=Price]').type(10);
      cy.get('[name=Currency]').click();
      cy.contains('USD').click();

      cy.contains('Save').click();

      cy.get(`table tbody tr`).should('have.length', prevList.length + 1);
    });
  });

  it('should list items', () => {
    cy.visit('/');

    cy.wait(500);

    cy.document().toMatchImageSnapshot({
      imageConfig: { threshold: 0.05, thresholdType: 'percent' }
    });
  });
});
