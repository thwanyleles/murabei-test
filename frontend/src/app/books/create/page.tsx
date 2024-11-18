"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook } from '@/services/bookService';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const CreateBookPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        author_slug: '',
        author_bio: '',
        biography: '',
        authors: '',
        publisher: '',
        synopsis: '',
    });
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBook(formData);
            setAlert({ message: 'Book created successfully!', type: 'success' });
            setFormData({
                title: '',
                author: '',
                author_slug: '',
                author_bio: '',
                biography: '',
                authors: '',
                publisher: '',
                synopsis: '',
            });
        } catch (error) {
            console.error('Failed to create book:', error);
            setAlert({ message: 'Failed to create book.', type: 'error' });
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <Card className="p-6 max-w-lg mx-auto my-8 rounded-lg shadow-md bg-card-bg">
            {alert.message && (
                <Alert className="mb-4">
                    <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
            )}
            <h2 className="text-xl font-bold mb-6 text-center">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <Input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
                <Input name="author_slug" placeholder="Author Slug" value={formData.author_slug} onChange={handleChange} required />
                <textarea name="author_bio" placeholder="Author Bio" value={formData.author_bio} onChange={handleChange} required className="w-full p-2 border rounded-md h-24" />
                <textarea name="biography" placeholder="Biography" value={formData.biography} onChange={handleChange} required className="w-full p-2 border rounded-md h-24" />
                <Input name="authors" placeholder="Authors" value={formData.authors} onChange={handleChange} required />
                <Input name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleChange} required />
                <textarea name="synopsis" placeholder="Synopsis" value={formData.synopsis} onChange={handleChange} required className="w-full p-2 border rounded-md h-32" />
                <div className="flex justify-between mt-4">
                    <Button type="button" onClick={handleCancel} className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        Cancel
                    </Button>
                    <Button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Add Book
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default CreateBookPage;