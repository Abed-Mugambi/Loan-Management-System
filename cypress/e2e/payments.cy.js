describe('Authentication and Navigation Tests', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('navigates to loans page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').type('abed');
    cy.get('input[name="password"]').type('abed123');
    cy.get('button[type="submit"]').click();
   

    // Wait for dashboard to fully render
    cy.contains('WELCOME abed murithi').should('be.visible');

    // Then try clicking Payments
    cy.get('li').contains('Payments').click();
    cy.url().should('eq', 'http://localhost:3000/payments');
  });

});
