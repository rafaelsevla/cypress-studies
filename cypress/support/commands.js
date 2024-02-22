Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Peter')
  cy.get('#lastName').type('Parker')
  cy.get('#email').type('peter.parker@gmail.com')
  cy.get('#open-text-area').type('Vai teia!')
  cy.get('button[type="submit"]').click()
})