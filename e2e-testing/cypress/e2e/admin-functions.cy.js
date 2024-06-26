require('cypress-slow-down/commands');

describe('test Admin user in  AIQ-Blog ', () => {
    it('shows Admin functions', () => {
      cy.slowDown(100000);
      // cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/'),
      cy.visit('http://localhost:5173/'),
      cy.get('a > .group > .items-stretch').click(),
      cy.get('#email-desktop').type('ons123@hotmail.com'),
      cy.get('#password-desktop').type('123456789'),
      cy.get('.mt-12 > .flex-col > .from-purple-600 > .items-stretch').click()
    //   cy.wait(20000)
      cy.get('[data-testid="flowbite-avatar-img"]', { timeout: 15000 }).should('be.visible').click(),
      cy.get('a > li > .flex').click(),
      cy.get('[href="/dashboard?tab=dash"] > .flex').click(),
      cy.get('[data-testid="flowbite-avatar-img"]').click(),
      cy.get('a > li > .flex').click(),
      cy.get('[href="/dashboard?tab=users"] > .flex').click()
      // cy.get('.overflow-x-auto > .text-lg').click()
      cy.visit('http://localhost:5173/dashboard?tab=comments'),
      cy.get('[href="/dashboard?tab=comments"] > .flex').click() 
      cy.get('[href="/dashboard?tab=profile"] > .flex').click()
      cy.get('a > .group > .items-stretch').click(),
      cy.get('#title').type('new post for test'),
    //   cy.wait(1000);
      cy.get('.flex-col > .lg\\:inline', { timeout: 10000 }).should('be.visible').select('Canva')
      cy.get('.ql-editor').type('my new Post')
      cy.get('[type="submit"] > .items-stretch').click()
      cy.get('[data-testid="flowbite-avatar-img"]').click(),
      cy.get('a > li > .flex').click()
      cy.get('[href="/dashboard?tab=posts"] > .flex').click()
      cy.get('.bg-\\[\\#b8bfd71e\\] > :nth-child(6)').click()
      cy.get('#title').clear().type('updated post for test')
      cy.get('[type="submit"] > .items-stretch').click()
      cy.get('[data-testid="flowbite-avatar-img"]').click(),
      cy.get('a > li > .flex').click()
      cy.get('[href="/dashboard?tab=posts"] > .flex').click()
      cy.get('[href="/dashboard?tab=posts"] > .flex').click()
      cy.get('.bg-\\[\\#b8bfd71e\\] > :nth-child(5)').click()
      cy.get('.gap-4 > .border-transparent > .flex').click()
      cy.slowDownEnd();
    
    })
  
  
  })