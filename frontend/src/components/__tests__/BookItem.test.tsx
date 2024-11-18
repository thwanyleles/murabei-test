import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'jest';
import BookItem from '@/components/BookItem';
import { deleteBook } from '@/services/bookService';
import { Book } from '@/models/Book';

jest.mock('@/services/bookService');

describe('BookItem Component', () => {
    const mockBook: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        author_slug: 'test-author',
        author_bio: 'Test Author Bio',
        authors: 'Test Author',
        publisher: 'Test Publisher',
        synopsis: 'Test Synopsis',
        biography: 'Test Biography',
    };

    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the book item correctly', () => {
        render(<BookItem book={mockBook} onDelete={mockOnDelete} />);

        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Test Author')).toBeInTheDocument();
    });

    it('opens the confirmation dialog on delete button click', async () => {
        render(<BookItem book={mockBook} onDelete={mockOnDelete} />);

        const deleteButton = screen.getByLabelText(/delete/i);
        userEvent.click(deleteButton);

        expect(await screen.findByText(/are you absolutely sure/i)).toBeInTheDocument();
    });

    it('calls deleteBook and onDelete when confirming deletion', async () => {
        (deleteBook as jest.Mock).mockResolvedValueOnce(true);

        render(<BookItem book={mockBook} onDelete={mockOnDelete} />);

        const deleteButton = screen.getByLabelText(/delete/i);
        userEvent.click(deleteButton);

        const continueButton = await screen.findByLabelText(/continue-delete/i);
        userEvent.click(continueButton);

        await waitFor(() => {
            expect(deleteBook).toHaveBeenCalledWith(mockBook.id);
            expect(mockOnDelete).toHaveBeenCalledWith(mockBook.id);
        });
    });
});