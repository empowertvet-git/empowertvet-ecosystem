import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Calendar, MessageSquare, Settings, LogOut, Bell, Search, MapPin } from 'lucide-react'

export default function AlumniPage() {
    const events = [
        {
            id: 1,
            title: 'Annual Alumni Networking Gala',
            date: 'Dec 15, 2025',
            location: 'Kairaba Beach Hotel',
            attendees: 120
        },
        {
            id: 2,
            title: 'Workshop: Scaling Your Business',
            date: 'Jan 10, 2026',
            location: 'EmpowerTVET Campus',
            attendees: 45
        }
    ]

    const mentors = [
        {
            name: 'Awa Sanneh',
            role: 'Fashion Entrepreneur',
            company: "Awa's Fashion House",
            expertise: ['Design', 'Marketing', 'Retail']
        },
        {
            name: 'Modou Ceesay',
            role: 'Tech CEO',
            company: 'TechHub Banjul',
            expertise: ['Software Dev', 'Startups', 'Fundraising']
        }
    ]

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="EmpowerTVET"
                            width={300}
                            height={90}
                            className="h-24 w-auto"
                            priority
                        />
                        <span className="text-xl font-medium text-muted-foreground">| Alumni Network</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon">
                            <Bell className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="size-5" />
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/">
                                <LogOut className="mr-2 size-4" />
                                Logout
                            </Link>
                        </Button>
                    </div>
                </div >
            </header >

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="hidden w-64 border-r bg-muted/30 lg:block">
                    <nav className="space-y-1 p-4">
                        <Link href="/alumni" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                            <Users className="size-4" />
                            Network
                        </Link>
                        <Link href="/alumni/events" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <Calendar className="size-4" />
                            Events
                        </Link>
                        <Link href="/alumni/mentorship" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <MessageSquare className="size-4" />
                            Mentorship
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h1 className="mb-2 text-3xl font-bold">Alumni Community</h1>
                            <p className="text-muted-foreground">Connect, mentor, and grow with fellow graduates</p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Events Column */}
                            <div className="space-y-6 lg:col-span-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Upcoming Events</h2>
                                    <Button variant="outline" size="sm">View Calendar</Button>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {events.map((event) => (
                                        <Card key={event.id}>
                                            <CardHeader className="pb-2">
                                                <div className="mb-1 text-sm text-primary font-medium">{event.date}</div>
                                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="size-4" />
                                                        {event.location}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="size-4" />
                                                        {event.attendees} Attending
                                                    </div>
                                                </div>
                                                <Button className="mt-4 w-full">RSVP Now</Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <h2 className="mb-4 text-xl font-semibold">Find Classmates</h2>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Search by name, year, or program..."
                                            />
                                        </div>
                                        <Button>Search</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Mentorship Column */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Featured Mentors</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {mentors.map((mentor, i) => (
                                                <div key={i} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                                                        {mentor.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{mentor.name}</p>
                                                        <p className="text-xs text-muted-foreground">{mentor.role} at {mentor.company}</p>
                                                        <div className="mt-2 flex flex-wrap gap-1">
                                                            {mentor.expertise.map(skill => (
                                                                <span key={skill} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <Button size="sm" variant="outline" className="mt-2 w-full text-xs">Request Mentorship</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="ghost" className="mt-4 w-full">Become a Mentor</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}
