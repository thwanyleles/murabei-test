import React from 'react';
import { Book } from '@/models/Book';
import { deleteBook } from '@/services/bookService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BookItemProps {
    book: Book;
    onDelete: (id: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteBook(book.id);
            onDelete(book.id);
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };

    return (
        <Card
            className="mb-4 p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: `rgb(var(--card-bg))`, color: `rgb(var(--card-text))` }}
        >
            <h2 className="text-xl font-bold text-center mb-2">{book.title}</h2>
            <div className="flex justify-between items-end mb-2">
                <p className="text-left mb-0">{book.author}</p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            aria-label="delete"
                            className="bg-red-700 hover:bg-red-800 text-white flex items-center justify-center w-10 h-10 rounded-full border border-gray-300"
                            variant="destructive"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-transparent dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg p-6"> {/* Alterado para bg-transparent */}
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the book and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-between">
                            <AlertDialogCancel className="border border-gray-300 text-gray-700 dark:text-white rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800">
                                <Button aria-label="continue-delete" onClick={handleDelete}>
                                    Continue
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Card>
    );
};

export default BookItem;