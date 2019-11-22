/// <reference types="Cypress" />

describe('The "ADDING" stage', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=adding-button]')
      .click()
  })

  it('enters adding stage', () => {
    cy.contains('#builder-canvas', 'ADDING')
    cy.contains('button', 'Exit segment creation')
  })

  it('displays grid', () => {
    cy.get('.grid')
      .find('circle')
      .its('length')
      .should('be.gte', 160)
    cy.get('.grid circle')
      .first()
      .should('have.attr', 'fill', 'red')
  })

  describe('adding', () => {
    it('adds a curve', () => {
      cy.get('.grid circle:nth(58)')
        .click()

      cy.get('#next-segment--type-curve').click()
      cy.get('#next-segment--radius')
        .click()
        .clear()
        .type('2')
      cy.get('#next-segment--direction-down-right').click()
      cy.get('#next-segment--type-ccw').click()
      cy.get('[data-cy=place-segment-button]').click()
      cy.get('.labyrinth svg path')
        .should('have.attr', 'd', 'M 640,192 a 128,128 0 0,0 128,128')
    })

    it('adds a line', () => {
      cy.get('.grid circle:nth(82)')
        .click()

      cy.get('#next-segment--type-line').click()
      cy.get('#next-segment--width')
        .click()
        .clear()
        .type('2')
      cy.get('#next-segment--direction-right').click()
      cy.get('[data-cy=place-segment-button]').click()
      cy.get('.labyrinth svg path')
        .should('have.attr', 'd', 'M 128,320 l 128,0')

      cy.percySnapshot()
    })
  })

  describe('editing', () => {

  })
})
