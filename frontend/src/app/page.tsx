"use client";

import React, { useEffect, useState } from 'react';
import { fetchBooks } from '@/services/bookService';
import BookList from '@/components/BookList';
import { Book } from '@/models/Book';
import CustomPagination from '@/components/CustomPagination';

const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const { data, total } = await fetchBooks(currentPage);
                setBooks(data);
                setTotalPages(Math.max(Math.ceil(total / 9), 1));
            } catch (error) {
                console.error('Failed to load books:', error);
            }
        };

        loadBooks();
    }, [currentPage]);

    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto px-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-center" style={{ color: `rgb(var(--primary))` }}>Welcome to the Book Library</h1>
                    <p className="text-center" style={{ color: `rgb(var(--foreground))` }}>Explore our collection of books and find your next read.</p>
                </header>
                <main>
                    <BookList books={books} onBookDelete={(id) => setBooks(books.filter((book) => book.id !== id))} />
                    {totalPages > 1 && (
                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default BooksPage;