import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import NavigationBar from '@/components/NavigationBar';
import React from 'react';

describe('NavigationBar', () => {
    beforeEach(() => {
        render(<NavigationBar />);
    });

    test('should render NavigationBar component', () => {
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });

    test('should render title', () => {
        const titleElement = screen.getByText(/Book Library/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('should render navigation links with correct hrefs', () => {
        const homeLinkElement = screen.getByText(/Home/i);
        const newBookLinkElement = screen.getByText(/New Book/i);
        const searchByTitleLinkElement = screen.getByText(/Search by Title/i);
        const searchByAuthorLinkElement = screen.getByText(/Search by Author/i);

        expect(homeLinkElement.closest('a')).toHaveAttribute('href', '/');
        expect(newBookLinkElement.closest('a')).toHaveAttribute('href', '/books/create');
        expect(searchByTitleLinkElement.closest('a')).toHaveAttribute('href', '/books/searchTitle');
        expect(searchByAuthorLinkElement.closest('a')).toHaveAttribute('href', '/books/searchAuthor');
    });

    test('should render ModeToggle component', () => {
        const modeToggleElement = screen.getByRole('button');
        expect(modeToggleElement).toBeInTheDocument();
    });
});