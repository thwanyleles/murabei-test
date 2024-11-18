import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useTheme } from 'next-themes';
import { ModeToggle } from '@/components/mode-toggle';

jest.mock('next-themes', () => ({
    useTheme: jest.fn(),
}));

describe('ModeToggle Component', () => {
    const mockSetTheme = jest.fn();

    beforeEach(() => {
        (useTheme as jest.Mock).mockReturnValue({
            setTheme: mockSetTheme,
        });
        jest.clearAllMocks();
    });

    it('renders the toggle button', () => {
        render(<ModeToggle />);
        expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    });

    it('closes the dropdown menu when the button is clicked again', () => {
        render(<ModeToggle />);
        const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
        fireEvent.click(toggleButton);

        fireEvent.click(toggleButton);

        expect(screen.queryByText('Light')).not.toBeInTheDocument();
        expect(screen.queryByText('Dark')).not.toBeInTheDocument();
        expect(screen.queryByText('System')).not.toBeInTheDocument();
    });

    it('closes the dropdown menu when a click outside the dropdown menu', () => {
        render(<ModeToggle />);
        const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
        fireEvent.click(toggleButton);

        fireEvent.click(document.body);

        expect(screen.queryByText('Light')).not.toBeInTheDocument();
        expect(screen.queryByText('Dark')).not.toBeInTheDocument();
        expect(screen.queryByText('System')).not.toBeInTheDocument();
    });

    it('closes the dropdown menu when the escape key is pressed', () => {
        render(<ModeToggle />);
        const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
        fireEvent.click(toggleButton);

        fireEvent.keyDown(document.body, { key: 'Escape' });

        expect(screen.queryByText('Light')).not.toBeInTheDocument();
        expect(screen.queryByText('Dark')).not.toBeInTheDocument();
        expect(screen.queryByText('System')).not.toBeInTheDocument();
    });
});