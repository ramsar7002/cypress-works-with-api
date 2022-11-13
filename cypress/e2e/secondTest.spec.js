describe('Test log out', () => {
    beforeEach('Login to app', () => {
        cy.loginToApplication();
    });

    it('Verify user can log out successfully', { retries: 1 }, () => {
        cy.contains('.nav-item', 'Settings').click();
        cy.contains('button', ' Or click here to logout. ').click();
        cy.get('.navbar-nav').should('contain', 'Sign up');
    });
});
