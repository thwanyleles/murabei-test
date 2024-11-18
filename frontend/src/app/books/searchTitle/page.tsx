"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { fetchBooksByTitle } from '@/services/bookService';
import BookList from '@/components/BookList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Book } from '@/models/Book';
import CustomPagination from '@/components/CustomPagination';

const SearchByTitlePage = () => {
    const [title, setTitle] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearch = useCallback(
        async (page = 1) => {
            try {
                const { data, total } = await fetchBooksByTitle(title, page);
                setBooks(data);
                setTotalPages(Math.max(Math.ceil(total / 9), 1));
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        },
        [title]
    );

    useEffect(() => {
        if (title) {
            handleSearch(currentPage);
        }
    }, [currentPage, title, handleSearch]);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-semibold mb-6 text-center">Search by Title</h1>
            <div className="flex justify-center mb-8">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                    className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                />
                <Button onClick={() => handleSearch()} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition">
                    Search
                </Button>
            </div>
            <BookList books={books} onBookDelete={(id) => setBooks(books.filter((book) => book.id !== id))} />
            {totalPages > 1 && (
                <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
        </div>
    );
};

export default SearchByTitlePage;