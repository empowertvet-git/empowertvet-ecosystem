"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Home, BookOpen, Info, BarChart, Heart, Users, Mail, BookText, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/#programs", label: "Programs", icon: BookOpen },
        { href: "/#about", label: "About", icon: Info },
        { href: "/#impact", label: "Impact", icon: BarChart },
        { href: "/foundation", label: "Foundation", icon: Heart },
        { href: "/partners", label: "Partners", icon: Users },
        { href: "/blog", label: "Blog", icon: BookText },
        { href: "/contact", label: "Contact", icon: Phone },
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
                            <div className="flex flex-col gap-6 mt-6">
                                <nav className="flex flex-col gap-1">
                                    {navLinks.map((link) => {
                                        const Icon = link.icon
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="flex items-center gap-4 py-4 text-lg font-medium transition-colors hover:text-primary border-b border-muted/50 last:border-0"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Icon className="h-5 w-5 text-muted-foreground" />
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                </nav>
                                <div className="flex flex-col gap-3 mt-auto">
                                    <Button variant="ghost" asChild className="justify-start px-4 h-11 text-base border">
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild className="bg-primary hover:bg-primary/90 w-full h-11 text-base">
                                        <Link href="/signup">Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
