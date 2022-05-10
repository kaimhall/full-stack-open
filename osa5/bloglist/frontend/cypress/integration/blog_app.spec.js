describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('Succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#loginBtn').click()
    })

    it('Fails with incorrect credentials', function() {
      cy.contains('logout').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()

      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        .and('contain', 'wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#loginBtn').click()
    })

    it.only('A blog can be created', function() {
      cy.contains('create').click()
      cy.get('#blogtitle').type('blog from cy')
      cy.get('#blogauthor').type('cypress')
      cy.get('#blogurl').type('www.cypress.com')
      cy.get('#blogcreate').click()
      cy.contains('a new blog blog from cy by cypress added')
      cy.contains('blog from cy cypress')
    })
  })
})