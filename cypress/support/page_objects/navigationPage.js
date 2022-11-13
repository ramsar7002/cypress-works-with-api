export class NavigationPage {
    openMenuIdNeeded(item) {
        cy.contains('a', item).then((menu) => {
            cy.wrap(menu)
                .find('.expand-state g g')
                .invoke('attr', 'data-name')
                .then((attr) => {
                    if (attr.includes('left')) {
                        cy.wrap(menu).click();
                    }
                });
        });
    }

    formLayoutsPage() {
        this.openMenuIdNeeded('Forms');
        cy.contains('Form Layouts').click();
    }

    formDatePickerPage() {
        this.openMenuIdNeeded('Forms');
        cy.contains('Datepicker').click();
    }

    formToastrPage() {
        this.openMenuIdNeeded('Modal & Overlays');
        cy.contains('Toastr').click();
    }

    formSmartTablePage() {
        this.openMenuIdNeeded('Tables & Data');
        cy.contains('Smart Table').click();
    }

    formTooltipPage() {
        this.openMenuIdNeeded('Modal & Overlays');
        cy.contains('Tooltip').click();
    }
}

export const navigateTo = new NavigationPage();
