/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        openHomePage(): Chainable<null>;
        loginToApplication(): Chainable<null>;
    }
}
