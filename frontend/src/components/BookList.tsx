import React from 'react';
import { Book } from '@/models/Book';
import BookItem from './BookItem';

interface BookListProps {
    books: Book[];
    onBookDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books = [], onBookDelete }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 book-list">
            {books.length > 0 ? (
                books.map((book) => (
                    <BookItem key={book.id} book={book} onDelete={onBookDelete} />
                ))
            ) : (
                <p className="text-center" style={{ color: `rgb(var(--card-text))` }}>
                    No books available.
                </p>
            )}
        </div>
    );
};

export default BookList;