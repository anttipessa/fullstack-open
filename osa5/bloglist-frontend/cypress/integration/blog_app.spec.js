describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'mluukkai logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('auth')
      cy.get('#url').type('url')
      cy.contains('save').click()

      cy.contains('a note created by cypress')

    })

    it('A blog can be liked', function () {
      cy.createBlog({ title: 'first blog', author: 'blogger', url: 'www.google.com' })
      cy.contains('show').click()
      cy.contains('like').click()
      cy.get('html').should('contain', '1')
    })

    it('A blog can be removed', function () {
      cy.createBlog({ title: 'first blog', author: 'blogger', url: 'www.google.com' })
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'first blog')
      cy.get('.success') .should('contain', 'Blog succesfully deleted!')
    })
  })
})