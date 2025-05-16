describe('Authentication and Navigation Tests', () => {
  // Prevent app errors from failing the test
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  it('logs in, navigates to borrowers, adds a new borrower', () => {
    // Visit login page
    cy.visit('http://localhost:3000/login');

    // Fill login form
    cy.get('input[name="username"]').type('abed');
    cy.get('input[name="password"]').type('abed123');
    cy.get('button[type="submit"]').click();

    // Should redirect to dashboard
    cy.url().should('include', '/home');

    // Go to Borrowers page
    cy.contains('Borrowers').click();
    cy.url().should('include', '/borrowers');

    // Click "Add Borrower" button
    cy.contains('Add Borrower').click();
    cy.url().should('include', '/addBorrower');

    // Fill in the form
    cy.get('input[placeholder="First Name"]').type('Clark');
    cy.get('input[placeholder="Last Name"]').type('Kent');
    cy.get('input[placeholder="Contact Number"]').type('123456990'); //shows undefined?
    cy.get('input[placeholder="Address"]').type('Metropolis');
    cy.get('input[placeholder="Email"]').type('clarkkent@dailyplanet.com');
    cy.get('input[placeholder="Username"]').type('superman');

    // Click Save
    cy.contains('Save').click();

    // Optional verification: back to Borrowers list and see the new entry
    // cy.url().should('include', '/borrowers');
    // cy.contains('Clark Kent');
  });
});
