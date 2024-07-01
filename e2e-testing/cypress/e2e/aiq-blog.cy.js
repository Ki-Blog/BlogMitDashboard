require('cypress-slow-down/commands');

describe('visit  AIQ-Blog Homepage', () => {
  
  it('shows posts', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('http://localhost:5173/'),
    cy.get('.font-medium > :nth-child(5) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.wait(3000)
    cy.slowDownEnd();
  })

  it('shows ueber uns', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('http://localhost:5173/'),
    cy.get('.font-medium > :nth-child(3) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.slowDownEnd();
  })

  it('shows start Seite', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('http://localhost:5173/'),
    cy.get('.font-medium > :nth-child(1) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.slowDownEnd();
  })

  it('shows start Seite with Logo', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('http://localhost:5173/'),
    cy.get('.space-x-3 > .flex > .h-11').click()
    cy.slowDownEnd();
  })

})


