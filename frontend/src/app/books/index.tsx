import React from 'react';
import { Book } from '@/models/Book';
import BookItem from "@/components/BookItem";


interface BookListProps {
    books: Book[];
    onBookDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onBookDelete }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
                <BookItem key={book.id} book={book} onDelete={onBookDelete} />
            ))}
        </div>
    );
};

export default BookList;