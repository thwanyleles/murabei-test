import './globals.css';
import React, { ReactNode } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { ThemeProvider } from '@/components/theme-provider';

interface LayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => (
    <html lang="en" suppressHydrationWarning>
    <head>
        <title>Book Library</title>
        <meta name="description" content="Generated by create next app" />
    </head>
    <body className="flex min-h-screen bg-transparent text-foreground">
    <ThemeProvider>
        <div className="flex flex-col w-full">
            <NavigationBar />
            <main className="flex-grow flex justify-center items-center p-8">
                <div className="w-full max-w-6xl bg-transparent">
                    {children}
                </div>
            </main>
            <footer className="bg-gray-900 text-white p-4 text-center flex-shrink-0">
                © {new Date().getFullYear()} Book Library
            </footer>
        </div>
    </ThemeProvider>
    </body>
    </html>
);

export default RootLayout;