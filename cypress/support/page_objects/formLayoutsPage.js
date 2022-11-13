export class formLayoutsPage {
    submitInlineFormWithNameAndEmail(_name = 'bla', _email = 'bla@gmail.com') {
        cy.contains('nb-card', 'Inline form')
            .find('form')
            .then((form) => {
                cy.wrap(form).find('[placeholder="Jane Doe"]').type(_name);
                cy.wrap(form).find('[placeholder="Email"]').type(_email);
                cy.wrap(form).find('[type="checkbox"]').check({ force: true });
                cy.wrap(form).submit();
            });
    }

    submitBasicFormWithNameAndEmail(
        _email = 'ramsar7002@gmail.com',
        _password = '12345'
    ) {
        cy.contains('nb-card', 'Basic form')
            .find('form')
            .then((form) => {
                cy.wrap(form).find('[placeholder="Email"]').type(_email);
                cy.wrap(form).find('[placeholder="Password"]').type(_password);
                cy.wrap(form).find('[type="checkbox"]').check({ force: true });
                cy.wrap(form).submit();
            });
    }
}

export const onFormLayoutsPage = new formLayoutsPage();
