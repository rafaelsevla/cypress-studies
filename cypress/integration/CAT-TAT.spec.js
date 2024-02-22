/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste!'

    cy.get('#firstName').type('Peter')
    cy.get('#lastName').type('Parker')
    cy.get('#email').type('peter.parker@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Peter')
    cy.get('#lastName').type('Parker')
    cy.get('#email').type('peter.parker gmail.com')
    cy.get('#open-text-area').type('Vai teia!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('digitar um texto no campo de telefone e continuar vazio', () => {
    cy.get('#phone').type('Estou digitando um texto aqui e vejo que nao altera pq sera deve ser pq é um telefone nao é mesmo hahahaha eu me divirto com esse diario', { delay: 0 }).should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Peter')
    cy.get('#lastName').type('Parker')
    cy.get('#email').type('peter.parker.gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Vai teia!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Peter')
      .should('have.value', 'Peter')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Parker')
      .should('have.value', 'Parker')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('peter.parker.gmail.com')
      .should('have.value', 'peter.parker.gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
})