"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    subject: z.string().min(5, {
        message: "Subject must be at least 5 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

export default function ContactPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // This would typically send data to an API
        console.log(values)
        alert("Message sent! (This is a demo)")
        form.reset()
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
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
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                            Home
                        </Link>
                        <Link href="/#programs" className="text-sm font-medium transition-colors hover:text-primary">
                            Programs
                        </Link>
                        <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Button asChild className="bg-primary hover:bg-primary/90">
                            <Link href="/signup">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </header >

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Contact Us</h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Have questions about our programs or want to partner with us? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Get in Touch</CardTitle>
                                <CardDescription>
                                    Fill out the form and our team will get back to you within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="your.email@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="What is this regarding?" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="How can we help you?"
                                                            className="min-h-[120px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full">Send Message</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>
                                    Visit our campus or reach out directly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="mt-1 size-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Main Campus</h3>
                                        <p className="text-muted-foreground">
                                            123 Independence Drive<br />
                                            Banjul, The Gambia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="mt-1 size-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-muted-foreground">
                                            info@empowertvet.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="mt-1 size-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-muted-foreground">
                                            +220 9111117
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31026.87706368856!2d-16.5917!3d13.4549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe94ad4444444445%3A0x4444444444444444!2sBanjul%2C%20The%20Gambia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}
