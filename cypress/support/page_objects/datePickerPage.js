export class DatePickerPage {
    findMonth(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        cy.get('nb-calendar-pageable-navigation')
            .find('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then((attr) => {
                if (!attr.includes(month) || !attr.includes(year)) {
                    cy.get('nb-calendar-pageable-navigation')
                        .find('[data-name="chevron-right"]')
                        .click();
                    this.findMonth(daysFromNow);
                } else {
                    cy.get('nb-calendar-day-picker')
                        .contains('.ng-star-inserted', day)
                        .click();
                }
            });
    }
    selectCommonDatePickerFromToday(days = 200) {
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then((input) => {
                cy.wrap(input).click();
                this.findMonth(days);
            });
    }
    selectDatePickerWithRange(start = 0, end = 200) {
        cy.contains('nb-card', 'Datepicker With Range')
            .find('input')
            .then((input) => {
                cy.wrap(input).click();
                this.findMonth(start);
                this.findMonth(end);
            });
    }

    selectDatepickerWithDisabledMinMaxValues(date = 0) {
        cy.contains('nb-card', 'Datepicker With Disabled Min Max Values')
            .find('input')
            .then((input) => {
                cy.wrap(input).click();
                this.findMonth(date);
            });
    }
}

export const onDatePickerPage = new DatePickerPage();
