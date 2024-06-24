describe('login in  AIQ-Blog ', () => {
    it('tests login', () => {
      cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/'),
      cy.get('a > .group > .items-stretch').click(),
      cy.get('#email-desktop').type('ons123@hotmail.com'),
      cy.get('#password-desktop').type('123456'),
      cy.get('.mt-12 > .flex-col > .from-purple-600 > .items-stretch').click()

    })

    it('shows posts', () => {
      cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
      cy.get('.font-medium > :nth-child(5) > .py-1', {timeout:6000}).click({force: true , multiple: true})

    })
})

describe('visit  AIQ-Blog Homepage', () => {
  
  it('shows posts', () => {
    cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.get('.font-medium > :nth-child(5) > .py-1', {timeout:6000}).click({force: true , multiple: true})

  })

  it('shows ueber uns', () => {
    cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/')
    cy.get('.font-medium > :nth-child(3) > .py-1', {timeout:6000}).click({force: true , multiple: true})

  })

  it('shows start Seite', () => {
    cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/'),
    cy.get('.font-medium > :nth-child(1) > .py-1', {timeout:6000}).click({force: true , multiple: true})

  })

  it('shows start Seite with Logo', () => {
    cy.visit('http://aiq-frontend.s3-website.eu-central-1.amazonaws.com/'),
    cy.get('.space-x-3 > .flex > .h-11').click()
  })

})
