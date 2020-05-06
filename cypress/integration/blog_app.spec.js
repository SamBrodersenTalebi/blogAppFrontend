describe('Note app', function () {
  beforeEach(function () {
    //clear database
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Sam Brodersen',
      username: 'sam',
      password: '123',
    };
    //create user
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login from is shown', function () {
    cy.get('.toggle-button').click();
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    beforeEach(function () {
      cy.get('.toggle-button').click();
    });

    it('Successful login', function () {
      cy.contains('Log in to application');
      cy.get('input:first').type('sam');
      cy.get('input:last').type('123');
      cy.get('#login-button').click();
      cy.contains('Sam Brodersen logged in');
    });

    it('Login fail with wrong credentials', function () {
      cy.contains('Log in to application');
      cy.get('input:first').type('sam');
      cy.get('input:last').type('1236');
      cy.get('#login-button').click();
      cy.contains('Invalid user or password');
    });
  });
});
