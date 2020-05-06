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
});
