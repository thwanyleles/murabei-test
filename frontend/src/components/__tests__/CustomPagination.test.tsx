import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomPagination from '@/components/CustomPagination';

describe('CustomPagination Component', () => {
    const setup = (currentPage: number, totalPages: number) => {
        const mockOnPageChange = jest.fn();
        render(<CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
        return { mockOnPageChange };
    };

    it('renders correct number of page links', () => {
        setup(3, 10);
        const pageLinks = screen.getAllByText(/^[0-9]+$/);
        expect(pageLinks.length).toBe(5);
    });

    it('calls onPageChange with correct page number when a page link is clicked', () => {
        const { mockOnPageChange } = setup(3, 10);
        const pageLink = screen.getByText('4');
        fireEvent.click(pageLink);
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('calls onPageChange with correct page number when previous button is clicked', () => {
        const { mockOnPageChange } = setup(3, 10);
        const previousButton = screen.getByLabelText(/previous/i);
        fireEvent.click(previousButton);
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange with correct page number when next button is clicked', () => {
        const { mockOnPageChange } = setup(3, 10);
        const nextButton = screen.getByLabelText(/next/i);
        fireEvent.click(nextButton);
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('does not display ellipsis when startPage is 1', () => {
        setup(1, 10);
        const ellipsisLeft = screen.queryByText('...');
        expect(ellipsisLeft).not.toBeInTheDocument();
    });

    it('does not display ellipsis when endPage is totalPages', () => {
        setup(10, 10);
        const ellipsisRight = screen.queryByText('...');
        expect(ellipsisRight).not.toBeInTheDocument();
    });

    it('does not display ellipsis when totalPages is less than maxPagesToShow', () => {
        setup(1, 3);
        const ellipsisLeft = screen.queryByText('...');
        const ellipsisRight = screen.queryByText('...');
        expect(ellipsisLeft).not.toBeInTheDocument();
        expect(ellipsisRight).not.toBeInTheDocument();
    });
});