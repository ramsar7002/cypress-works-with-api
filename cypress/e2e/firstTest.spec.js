///<reference types="cypress"/>

describe('Test with backend', () => {
    beforeEach('User login', () => {
        cy.intercept(
            { method: 'GET', path: 'tags' },
            {
                fixture: 'tags.json'
            }
        );
        cy.loginToApplication();
    });

    it('should be logged in', () => {
        cy.get('nav')
            .find('[href="/profile/CY%20Tester"]')
            .contains(' CY Tester ');
    });

    it('verify correct request and response', () => {
        cy.intercept('POST', `${Cypress.env('apiUrl')}/articles/`).as(
            'postArticles'
        );
        const uniqueId = Math.random().toString(36).substr(2, 9);

        cy.get('nav').find('[routerlink="/editor"]').click();

        cy.get('form').then((form) => {
            cy.wrap(form)
                .find('[placeholder="Article Title"]')
                .type(`Atricle title_${uniqueId}`);
            cy.wrap(form)
                .find(`[placeholder="What's this article about?"]`)
                .type('Atricle about');
            cy.wrap(form)
                .find('[placeholder="Write your article (in markdown)"]')
                .type('Atricle body');
            cy.wrap(form)
                .find('[placeholder="Enter tags"]')
                .type('Atricle tags');

            cy.contains('Publish Article').click();

            cy.wait('@postArticles').then((xhr) => {
                expect(xhr.response.statusCode).to.equal(200);
                expect(xhr.request.body.article.body).to.equal('Atricle body');
                expect(xhr.response.body.article.description).to.equal(
                    'Atricle about'
                );
            });
        });
    });

    it('intercepting and modifying the request and response', () => {
        // cy.intercept(
        //     'POST',
        //     `${Cypress.env('apiUrl')}/articles/`,
        //     (req) => {
        //         req.body.article.description = 'this is a description 2';
        //     }
        // ).as('postArticles');

        cy.intercept('POST', `${Cypress.env('apiUrl')}/articles/`, (res) => {
            expect(res.body.article.description).to.equal('Atricle about');
            res.body.article.description = 'this is a description 2';
        }).as('postArticles');
        const uniqueId = Math.random().toString(36).substr(2, 9);

        cy.get('nav').find('[routerlink="/editor"]').click();

        cy.get('form').then((form) => {
            cy.wrap(form)
                .find('[placeholder="Article Title"]')
                .type(`Atricle title_${uniqueId}`);
            cy.wrap(form)
                .find(`[placeholder="What's this article about?"]`)
                .type('Atricle about');
            cy.wrap(form)
                .find('[placeholder="Write your article (in markdown)"]')
                .type('Atricle body');
            cy.wrap(form)
                .find('[placeholder="Enter tags"]')
                .type('Atricle tags');

            cy.contains('Publish Article').click();

            cy.wait('@postArticles').then((xhr) => {
                expect(xhr.response.statusCode).to.equal(200);
                expect(xhr.request.body.article.body).to.equal('Atricle body');
                expect(xhr.response.body.article.description).to.equal(
                    'this is a description 2'
                );
            });
        });
    });

    it('verify popular tags are displayed', () => {
        cy.log('we logged in');
        cy.get('.tag-list')
            .should('contain', 'cypress')
            .and('contain', 'testing')
            .and('contain', 'animation');
    });

    it('verify global feeds likes count', () => {
        cy.intercept('GET', `${Cypress.env('apiUrl')}/articles/feed*`, {
            articles: [],
            articlesCount: 0
        });
        cy.intercept('GET', `${Cypress.env('apiUrl')}/articles*`, {
            fixture: 'articles.json'
        });

        cy.contains('[class="nav-link"]', ' Global Feed ').click();
        cy.get('app-article-list')
            .find('app-favorite-button')
            .then((buttons) => {
                expect(buttons[0]).to.contain('1');
                expect(buttons[1]).to.contain('5');

                // cy.wrap(buttons).eq(1).find('button').click({ force: true });
                // cy.wrap(buttons).eq(1).should('contain', '6');
            });

        cy.fixture('articles.json').then((file) => {
            console.log(file);
            const articleLink = file.articles[1].slug;
            file.articles[1].favoritesCount = 6;
            cy.intercept(
                'POST',
                `${Cypress.env('apiUrl')}/articles/${articleLink}/favorite`,
                file
            );

            cy.get('app-article-list button')
                .eq(1)
                .click()
                .should('contain', 6);
        });
    });

    it('api requests - delete an article', () => {
        const userCred = {
            user: {
                email: 'artem.bondar16@gmail.com',
                password: 'CypressTest1'
            }
        };

        const article = {
            article: {
                tagList: [],
                title: 'my article15',
                description: 'dsfdsfds',
                body: 'fdsdfs'
            }
        };
        cy.get('@token').then((token) => {
            let slug;

            cy.request({
                url: `${Cypress.env('apiUrl')}/articles/`,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: article
            }).then((res) => {
                expect(res.status).to.equal(200);
                console.log(res.body.article.slug);
                slug = res.body.article.slug;

                cy.contains('Global Feed').click();
                cy.get('app-article-preview')
                    .eq(0)
                    .find('h1')
                    .should('contain', article.article.title);

                cy.request({
                    method: 'DELETE',
                    url: `${Cypress.env('apiUrl')}/articles/${slug}`,
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    expect(res.status).to.equal(204);
                    cy.reload();
                });
            });
        });

        // cy.get('app-article-preview').eq(0);
        // cy.get('app-article-preview').eq(0).find('.preview-link').click();
        // cy.contains('button', ' Delete Article ').click();
        // cy.contains('Global Feed').click();
        // cy.get('app-article-preview')
        //     .eq(0)
        //     .find('h1')
        //     .should('not.contain', article.article.title);
    });
});
