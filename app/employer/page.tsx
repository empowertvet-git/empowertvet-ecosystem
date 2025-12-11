import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Briefcase, Users, Search, Settings, LogOut, Bell, Plus, MapPin } from 'lucide-react'

export default function EmployerPage() {
    const jobs = [
        {
            id: 1,
            title: 'Solar Technician Intern',
            applicants: 12,
            posted: '2 days ago',
            status: 'Active',
            location: 'Banjul'
        },
        {
            id: 2,
            title: 'Junior Electrician',
            applicants: 8,
            posted: '1 week ago',
            status: 'Active',
            location: 'Serrekunda'
        }
    ]

    const candidates = [
        {
            name: 'Fatou Jallow',
            role: 'Solar Installer',
            skills: ['PV Systems', 'Safety', 'Wiring'],
            available: 'Immediately'
        },
        {
            name: 'Lamin Ceesay',
            role: 'Construction Supervisor',
            skills: ['Project Mgmt', 'Masonry', 'CAD'],
            available: 'In 2 weeks'
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
                        <span className="text-xl font-medium text-muted-foreground">| Employer Portal</span>
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
                        <Link href="/employer" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                            <Briefcase className="size-4" />
                            Job Postings
                        </Link>
                        <Link href="/employer/candidates" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <Search className="size-4" />
                            Find Talent
                        </Link>
                        <Link href="/employer/apprentices" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <Users className="size-4" />
                            Apprentices
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="mb-2 text-3xl font-bold">Employer Dashboard</h1>
                                <p className="text-muted-foreground">Manage your job listings and find top talent</p>
                            </div>
                            <Button>
                                <Plus className="mr-2 size-4" />
                                Post New Job
                            </Button>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Jobs Column */}
                            <div className="space-y-6 lg:col-span-2">
                                <h2 className="text-xl font-semibold">Active Listings</h2>
                                <div className="space-y-4">
                                    {jobs.map((job) => (
                                        <Card key={job.id}>
                                            <CardContent className="flex items-center justify-between p-6">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">{job.title}</h3>
                                                        <Badge variant="secondary">{job.status}</Badge>
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="size-3" />
                                                            {job.location}
                                                        </span>
                                                        <span>Posted {job.posted}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold">{job.applicants}</div>
                                                        <div className="text-xs text-muted-foreground">Applicants</div>
                                                    </div>
                                                    <Button variant="outline">View</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Candidates Column */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recommended Candidates</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {candidates.map((candidate, i) => (
                                                <div key={i} className="rounded-lg border p-3">
                                                    <div className="mb-2 flex items-start justify-between">
                                                        <div>
                                                            <p className="font-medium">{candidate.name}</p>
                                                            <p className="text-sm text-muted-foreground">{candidate.role}</p>
                                                        </div>
                                                        <Badge variant="outline" className="text-[10px]">{candidate.available}</Badge>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {candidate.skills.map(skill => (
                                                            <span key={skill} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <Button size="sm" variant="ghost" className="mt-2 w-full text-xs">View Profile</Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="link" className="mt-2 w-full">Search All Candidates</Button>
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
