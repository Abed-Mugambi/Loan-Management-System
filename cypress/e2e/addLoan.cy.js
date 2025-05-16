describe('Add Loan Test', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('logs in, navigates to loans page, adds a new loan', () => {
    cy.visit('http://localhost:3000/login');

    // Login
    cy.get('input[name="username"]').type('abed');
    cy.get('input[name="password"]').type('abed123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/home');

    // Navigate to Loans
    cy.contains('Loans').click();

    // Click Add Loan button
    cy.contains('Add Loan').click();
    cy.url().should('include', '/addLoan');

    // Fill in the form
    cy.get('input[placeholder="Client ID"]').type('1');

    // Select the "Approved" option from the Status dropdown
    cy.get('select[name="status"]').select('Approved');
    // cy.get('select').eq(0).select('Approved'); // Status dropdown
    
    cy.get('input[placeholder="Balance"]').type('5000');

    // Select the "1 Month" option from the Terms dropdown
    cy.get('select[name="terms"]').select('1 Month');
    // cy.get('select').eq(1).select('1 Month'); // Terms dropdown
    
    // Use the name attribute for the Maturity Date input with YYYY-MM-DD format
    cy.get('input[name="maturity_date"]').type('2026-05-16');

    // Select the "Personal Loan" option from the Type of Loan dropdown
    cy.get('select[name="type"]').select('Personal Loan');
    // cy.get('select').eq(2).select('Personal Loan'); // Type of Loan dropdown
    
    cy.get('input[placeholder="Gross Loan"]').type('10000');
    cy.get('input[placeholder="Amortization"]').type('500');
    
    // For the Date Released input, assuming it has a similar structure but with a different name
    // If the name is "date_released" (likely based on your form structure):
    cy.get('input[name="date_released"]').type('2025-02-15T12:00:00');
    
    // If that doesn't work, you could try using the placeholder:
    // cy.get('input[placeholder="Date Released"]').type('05/15/2025');
    
    // As a last resort, you could use the complex CSS selector you provided:
    // cy.get('#root > div > div > div > div.w-full.h-\\[900px\\].mx-auto.px-8.py-8.mb-4.border.bg-white.shadow-md.rounded > form > div:nth-child(9) > input').type('05/15/2025');

    // cy.contains('Add New Loan').click();
    // cy.get('button[type="submit"]').click();
    cy.contains('button', 'Add New Loan').click();

  });
});