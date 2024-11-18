import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookList from '@/components/BookList';
import { Book } from '@/models/Book';

describe('BookList Component', () => {
    const mockBooks: Book[] = [
        {
            id: 1,
            title: 'Book One',
            author: 'Author One',
            author_slug: 'author-one',
            author_bio: 'Bio One',
            authors: 'Author One',
            publisher: 'Publisher One',
            synopsis: 'Synopsis One',
            biography: 'Biography One',
        },
        {
            id: 2,
            title: 'Book Two',
            author: 'Author Two',
            author_slug: 'author-two',
            author_bio: 'Bio Two',
            authors: 'Author Two',
            publisher: 'Publisher Two',
            synopsis: 'Synopsis Two',
            biography: 'Biography Two',
        },
    ];

    const mockOnBookDelete = jest.fn();

    it('renders a list of books', () => {
        render(<BookList books={mockBooks} onBookDelete={mockOnBookDelete} />);

        mockBooks.forEach(book => {
            expect(screen.getByText(book.title)).toBeInTheDocument();
            expect(screen.getByText(book.author)).toBeInTheDocument();
        });
    });

    it('renders a message when no books are available', () => {
        render(<BookList books={[]} onBookDelete={mockOnBookDelete} />);

        expect(screen.getByText('No books available.')).toBeInTheDocument();
    });
});