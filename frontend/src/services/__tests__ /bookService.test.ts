import axios from 'axios';
import { fetchBooks, createBook, deleteBook, fetchBooksByTitle, fetchBooksByAuthor } from '@/services/bookService';
import MockAdapter from 'axios-mock-adapter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

const mock = new MockAdapter(axios);

describe('Book Service', () => {
    afterEach(() => {
        mock.reset();
    });

    test('fetchBooks should throw error when request fails', async () => {
        mock.onGet(`${API_BASE_URL}/books`).reply(500);

        await expect(fetchBooks(1)).rejects.toThrow('Failed to fetch books. Please try again later.');
    });

    test('createBook should throw error when request fails', async () => {
        mock.onPost(`${API_BASE_URL}/books`).reply(500);

        await expect(createBook({ title: 'Test Book', author: 'Test Author', author_slug: '', author_bio: '', authors: '', publisher: '', synopsis: '', biography: '' })).rejects.toThrow('Failed to create book. Please check your input and try again.');
    });

    test('deleteBook should throw error when request fails', async () => {
        mock.onDelete(`${API_BASE_URL}/books/1`).reply(500);

        await expect(deleteBook(1)).rejects.toThrow('Failed to delete book. Please try again later.');
    });

    test('fetchBooksByTitle should throw error when request fails', async () => {
        mock.onGet(`${API_BASE_URL}/books/title/Test Book`).reply(500);

        await expect(fetchBooksByTitle('Test Book', 1)).rejects.toThrow('Failed to fetch books by title. Please try again later.');
    });

    test('fetchBooksByAuthor should throw error when request fails', async () => {
        mock.onGet(`${API_BASE_URL}/books/author/Test Author`).reply(500);

        await expect(fetchBooksByAuthor('Test Author', 1)).rejects.toThrow('Failed to fetch books by author. Please try again later.');
    });
});