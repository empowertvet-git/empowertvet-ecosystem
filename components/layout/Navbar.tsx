"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: "/#programs", label: "Programs" },
        { href: "/#about", label: "About" },
        { href: "/#impact", label: "Impact" },
        { href: "/foundation", label: "Foundation" },
        { href: "/partners", label: "Partners" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="EmpowerTVET"
                        width={400}
                        height={120}
                        className="h-24 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left">Menu</SheetTitle>
                                <SheetDescription className="text-left sr-only">
                                    Navigation menu
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="flex flex-col gap-3 mt-4">
                                    <Button variant="ghost" asChild className="justify-start px-0">
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild className="bg-primary hover:bg-primary/90 w-full">
                                        <Link href="/signup">Get Started</Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
