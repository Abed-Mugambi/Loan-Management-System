describe('Login Test', () => {
  it('successfully logs in', () => {
    cy.visit('http://localhost:3000/login'); // Adjust URL to your app
    cy.get('input[name="username"]').type('abed');
    cy.get('input[name="password"]').type('abed123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home'); // Verify login success
  });
});

