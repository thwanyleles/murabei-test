describe('CreateBookPage', () => {
    beforeEach(() => {
        // Visita a página de criação de livro
        cy.visit('/books/create'); // Certifique-se de que a URL está correta
    });

    it('should successfully submit the form and display a success alert', () => {
        // Preencher o formulário
        cy.get('input[name="title"]').type('Sample Title');
        cy.get('input[name="author"]').type('Sample Author');
        cy.get('input[name="author_slug"]').type('sample-author');
        cy.get('textarea[name="author_bio"]').type('Bio');
        cy.get('textarea[name="biography"]').type('Biography');
        cy.get('input[name="authors"]').type('Authors');
        cy.get('input[name="publisher"]').type('Publisher');
        cy.get('textarea[name="synopsis"]').type('Synopsis');

        // Interceptar a requisição POST e mockar a resposta
        cy.intercept('POST', '/api/v1/books', (req) => {
            req.reply({
                statusCode: 201,
                body: {},
            });
        }).as('createBook');

        // Submeter o formulário
        cy.get('button[type="submit"]').click();

        // Esperar pela requisição interceptada
        cy.wait('@createBook');

        // Verificar se o alerta de sucesso é exibido
        cy.get('.alert-success').contains('Book created successfully!').should('be.visible');
    });

    it('should display an error alert if submission fails', () => {
        // Preencher o formulário com dados de exemplo
        cy.get('input[name="title"]').type('Sample Title');

        // Interceptar a requisição POST e mockar uma falha
        cy.intercept('POST', '/api/v1/books', {
            statusCode: 500,
            body: { message: 'Failed to create book' },
        }).as('createBookFail');

        // Submeter o formulário
        cy.get('button[type="submit"]').click();

        // Esperar pela requisição interceptada
        cy.wait('@createBookFail');

        // Verificar se o alerta de erro é exibido
        cy.get('.alert-error').contains('Failed to create book.').should('be.visible');
    });
});