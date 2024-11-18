import { z } from "zod";

export const bookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    author_slug: z.string().min(1, { message: "Author Slug is required" }),
    author_bio: z.string().min(1, { message: "Author Bio is required" }),
    authors: z.string().min(1, { message: "Authors is required" }),
    publisher: z.string().min(1, { message: "Publisher is required" }),
    synopsis: z.string().min(1, { message: "Synopsis is required" }),
});

export type BookFormValues = z.infer<typeof bookSchema>;