import axios from 'axios';
import { Book } from '@/models/Book';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Função para buscar livros
export const fetchBooks = async (page: number = 1): Promise<{ data: Book[]; total: number }> => {
    try {
        const response = await axios.get<{ books: Book[]; total: number }>(`${API_BASE_URL}/books`, {
            params: { page, page_size: 9 },
        });
        return {
            data: response.data.books,
            total: response.data.total,
        };
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw new Error('Failed to fetch books. Please try again later.');
    }
};

// Função para criar um livro
export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
    try {
        const response = await axios.post<Book>(`${API_BASE_URL}/books`, book);
        return response.data;
    } catch (error) {
        console.error('Failed to create book:', error);
        throw new Error('Failed to create book. Please check your input and try again.');
    }
};

// Função para deletar um livro
export const deleteBook = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/books/${id}`);
    } catch (error) {
        console.error('Failed to delete book:', error);
        throw new Error('Failed to delete book. Please try again later.');
    }
};

// Função para buscar livros por título
export const fetchBooksByTitle = async (title: string, page: number = 1): Promise<{ data: Book[]; total: number }> => {
    try {
        const response = await axios.get<{ books: Book[]; total: number }>(`${API_BASE_URL}/books/title/${title}`, {
            params: { page, page_size: 9 },
        });
        return {
            data: response.data.books,
            total: response.data.total,
        };
    } catch (error) {
        console.error('Failed to fetch books by title:', error);
        throw new Error('Failed to fetch books by title. Please try again later.');
    }
};

// Função para buscar livros por autor
export const fetchBooksByAuthor = async (author: string, page: number = 1): Promise<{ data: Book[]; total: number }> => {
    try {
        const response = await axios.get<{ books: Book[]; total: number }>(`${API_BASE_URL}/books/author/${author}`, {
            params: { page, page_size: 9 },
        });
        return {
            data: response.data.books,
            total: response.data.total,
        };
    } catch (error) {
        console.error('Failed to fetch books by author:', error);
        throw new Error('Failed to fetch books by author. Please try again later.');
    }
};