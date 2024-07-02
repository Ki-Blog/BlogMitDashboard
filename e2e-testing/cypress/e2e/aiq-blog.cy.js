require('cypress-slow-down/commands');

describe('visit  AIQ-Blog Homepage', () => {
  
  it('shows posts', () => {
    cy.slowDown(100000);
    cy.visit('https://www.aiq-blog.de/')
    // cy.visit('http://localhost:5173/'),
    cy.get('.font-medium > :nth-child(5) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.wait(3000)
    cy.slowDownEnd();
  })

  it('shows ueber uns', () => {
    cy.slowDown(100000);
    cy.visit('https://www.aiq-blog.de/')
    // cy.visit('http://localhost:5173/'),
    cy.get('.font-medium > :nth-child(3) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.slowDownEnd();
  })

  it('shows start Seite', () => {
    cy.slowDown(100000);
    cy.visit('https://www.aiq-blog.de/')
    // cy.visit('http://localhost:5173/'),
    cy.get('.font-medium > :nth-child(1) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.slowDownEnd();
  })

  it('shows start Seite with Logo', () => {
    cy.slowDown(100000);
    cy.visit('https://www.aiq-blog.de/')
    // cy.visit('http://localhost:5173/'),
    cy.get('.space-x-3 > .flex > .h-11').click()
    cy.slowDownEnd();
  })

})

describe('visit  AIQ-Blog Homepage', () => {
  
  it('shows posts', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('https://www.aiq-blog.de/'),
    cy.get('.font-medium > :nth-child(5) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.wait(3000)
    cy.slowDownEnd();
  })

  it('shows ueber uns', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('https://www.aiq-blog.de/'),
    cy.get('.font-medium > :nth-child(3) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.slowDownEnd();
  })

  it('shows start Seite', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('https://www.aiq-blog.de/'),
    cy.get('.font-medium > :nth-child(1) > .py-1', {timeout:6000}).click({force: true , multiple: true})
    cy.slowDownEnd();
  })

  it('shows start Seite with Logo', () => {
    cy.slowDown(100000);
    // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.visit('https://www.aiq-blog.de/'),
    cy.get('.space-x-3 > .flex > .h-11').click()
    cy.slowDownEnd();
  })

})

require('cypress-slow-down/commands');

describe('test Admin user in  AIQ-Blog ', () => {
    it('shows Admin functions', () => {
      cy.slowDown(100000);
      // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/'),
      cy.visit('https://www.aiq-blog.de/'),
      cy.get('a > .group > .items-stretch').click(),
      cy.get('#email-desktop').type('ons123@hotmail.com'),
      cy.get('#password-desktop').type('123456789'),
      cy.get('.mt-12 > .flex-col > .from-purple-600 > .items-stretch').click()
    //   cy.wait(20000)
      cy.get('[data-testid="flowbite-avatar-img"]', { timeout: 10000 }).should('be.visible').click(),
      cy.get('a > li > .flex').click(),
      cy.get('[href="/dashboard?tab=dash"] > .flex').click(),
      cy.get('[data-testid="flowbite-avatar-img"]').click(),
      cy.get('a > li > .flex').click(),
      cy.get('[href="/dashboard?tab=users"] > .flex').click()
    })
  })
