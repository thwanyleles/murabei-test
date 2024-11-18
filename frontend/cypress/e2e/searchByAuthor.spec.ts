describe('SearchByAuthorPage', () => {
  beforeEach(() => {
    // Visit the search by author page
    cy.visit('/books/searchAuthor'); // Ensure the URL is correct
  });

  it('should search for books by author "Yvonne" and display results', () => {
    // Intercept the GET request and mock the response
    cy.intercept('GET', '/api/v1/books/author/Yvonne*', {
      statusCode: 200,
      body: {
        data: [
          { id: 1, title: "Opening Spaces: An Anthology of Contemporary African Women's Writing", author: 'Yvonne' },
          { id: 2, title: 'Another Book by Yvonne', author: 'Yvonne' }
        ],
        total: 2,
      }
    }).as('fetchBooksByAuthor');

    // Type the author's name in the search field
    cy.get('input[placeholder="Enter author name"]').type('Yvonne');

    // Click the search button
    cy.contains('Search').click();

    // Wait for the intercepted request
    cy.wait('@fetchBooksByAuthor').then((interception) => {
      // Debugging: Check if the API call was successful
      console.log(interception.response?.body);
    });

    // Verify that the books are displayed in the list
    cy.get('.book-list', { timeout: 15000 }).should('exist').within(() => {
      cy.contains("Opening Spaces: An Anthology of Contemporary African Women's Writing").should('be.visible');
      cy.contains('Another Book by Yvonne').should('be.visible');
    });
  });
});