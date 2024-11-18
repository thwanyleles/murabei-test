describe('SearchByTitlePage', () => {
    beforeEach(() => {
        cy.visit('/books/searchTitle');
    });

    it('should load the search by title page', () => {
        cy.get('h1').should('contain', 'Search by Title');
        cy.get('input[placeholder="Enter book title"]').should('be.visible');
        cy.get('button').should('contain', 'Search');
    });

    it('should display a message if no books are found', () => {
        cy.intercept('GET', '/api/v1/books/title/Unknown*', {
            statusCode: 200,
            body: {
                data: [],
                total: 0,
            }
        }).as('fetchNoBooks');

        cy.get('input[placeholder="Enter book title"]').type('Unknown');
        cy.contains('Search').click();
        cy.wait('@fetchNoBooks');

        cy.contains('No books available.').should('be.visible');
    });
});