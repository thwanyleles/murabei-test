import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const NavigationBar = () => (
    <header className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-10 py-4">
            <div className="text-lg font-bold">Book Library</div>
            <NavigationMenu className="flex space-x-8">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/" className="hover:text-gray-400 transition">
                            Home
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/books/create" className="hover:text-gray-400 transition">
                            New Book
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/books/searchTitle" className="hover:text-gray-400 transition">
                            Search by Title
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/books/searchAuthor" className="hover:text-gray-400 transition">
                            Search by Author
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenu>
            <ModeToggle />
        </div>
    </header>
);

export default NavigationBar;