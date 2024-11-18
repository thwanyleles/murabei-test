import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeProviderProps as NextThemesProviderProps } from 'next-themes';

jest.mock('next-themes', () => ({
    ThemeProvider: ({ children }: NextThemesProviderProps) => <div data-testid="next-themes-provider">{children}</div>,
}));

describe('ThemeProvider Component', () => {
    it('renders children correctly', () => {
        render(
            <ThemeProvider>
                <div data-testid="child">Child Component</div>
            </ThemeProvider>
        );

        expect(screen.getByTestId('next-themes-provider')).toBeInTheDocument();

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});