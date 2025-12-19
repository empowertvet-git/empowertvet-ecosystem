"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { useState } from "react"

export function FoundationNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: "#mission", label: "Our Mission" },
        { href: "#programs", label: "Programs" },
        { href: "#impact", label: "Impact" },
        { href: "#donate", label: "Donate" },
    ]

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/foundation-logo.png"
                        alt="EmpowerTVET Foundation"
                        width={320}
                        height={96}
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
                        <Link href="/">Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href="#donate">Donate Now</Link>
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
                                        <Link href="/">Home</Link>
                                    </Button>
                                    <Button asChild className="w-full">
                                        <Link href="#donate">Donate Now</Link>
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
