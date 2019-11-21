/// <reference types="Cypress" />

describe('The "STARTING" stage', () => {
  it('displays the stage name', () => {
    cy.visit('/')
    cy.contains('#builder-canvas', 'STARTING')
  })

  it('displays buttons to change to other stages', () => {
    cy.contains('#builder-controls button', 'Add segments')
    cy.contains('#builder-controls button', 'Edit segments')
    cy.contains('#builder-controls button', 'Preview')

    cy.percySnapshot()
  })

  // TODO: add tests for coming back to this stage after doing stuff in other stages
})
