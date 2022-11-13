export class smartTablesPage {
    updatePageByFirstName(name, age) {
        cy.get('tbody').then((table) => {
            cy.wrap(table)
                .contains('tr', name)
                .then((tr) => {
                    cy.wrap(tr).find('.nb-edit').click();
                    cy.wrap(tr).find('[placeholder="Age"]').clear().type(age);
                    cy.wrap(tr).find('.nb-checkmark').click();
                    cy.wrap(tr).find('td').eq(6).should('contain', age);
                });
        });
    }

    createRowByFirstAndLastName(firstName = 'Ram', lastName = 'Sarfian') {
        cy.get('thead').then((thead) => {
            cy.wrap(thead).find('.ng2-smart-action-add-add').click();
            cy.wrap(thead)
                .find('tr')
                .then((tr) => {
                    cy.wrap(tr)
                        .eq(2)
                        .then((specTr) => {
                            cy.wrap(specTr)
                                .find('[placeholder="First Name"]')
                                .type(firstName);

                            cy.wrap(specTr)
                                .find('[placeholder="Last Name"]')
                                .type(lastName);
                            cy.wrap(specTr).find('.nb-checkmark').click();
                        });
                });
        });
    }

    deleteUserByIndex(index) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('.nb-trash')
            .eq(index)
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                    'Are you sure you want to delete?'
                );
            });
    }
}

export const onSmartTables = new smartTablesPage();
