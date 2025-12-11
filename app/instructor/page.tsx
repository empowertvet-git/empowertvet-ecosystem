import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, Calendar, FileText, Settings, LogOut, Bell, CheckCircle, Clock } from 'lucide-react'

export default function InstructorPage() {
    const classes = [
        {
            id: 1,
            title: 'Solar Energy Installation',
            students: 24,
            nextSession: 'Today, 2:00 PM',
            room: 'Workshop A',
            status: 'Active'
        },
        {
            id: 2,
            title: 'Advanced PV Systems',
            students: 18,
            nextSession: 'Tomorrow, 10:00 AM',
            room: 'Lab 3',
            status: 'Active'
        }
    ]

    const recentSubmissions = [
        {
            student: 'Modou Lamin',
            assignment: 'System Design Project',
            submitted: '10 mins ago',
            status: 'Pending Review'
        },
        {
            student: 'Isatou Touray',
            assignment: 'Safety Protocol Quiz',
            submitted: '1 hour ago',
            status: 'Graded'
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
                        <span className="text-xl font-medium text-muted-foreground">| Instructor Portal</span>
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
                        <Link href="/instructor" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                            <BookOpen className="size-4" />
                            My Classes
                        </Link>
                        <Link href="/instructor/students" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <Users className="size-4" />
                            Students
                        </Link>
                        <Link href="/instructor/gradebook" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <CheckCircle className="size-4" />
                            Gradebook
                        </Link>
                        <Link href="/instructor/schedule" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <Calendar className="size-4" />
                            Schedule
                        </Link>
                        <Link href="/instructor/resources" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <FileText className="size-4" />
                            Resources
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="mb-2 text-3xl font-bold">Instructor Dashboard</h1>
                                <p className="text-muted-foreground">Manage your classes and track student progress</p>
                            </div>
                            <Button>
                                <Calendar className="mr-2 size-4" />
                                Schedule Session
                            </Button>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Classes Column */}
                            <div className="space-y-6 lg:col-span-2">
                                <h2 className="text-xl font-semibold">Active Classes</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {classes.map((cls) => (
                                        <Card key={cls.id}>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-start justify-between">
                                                    <Badge>{cls.status}</Badge>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <Settings className="size-4" />
                                                    </Button>
                                                </div>
                                                <CardTitle className="text-lg">{cls.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="size-4" />
                                                        {cls.students} Students
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="size-4" />
                                                        {cls.nextSession}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="size-4" />
                                                        {cls.room}
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <Button size="sm" className="w-full" variant="outline">Attendance</Button>
                                                    <Button size="sm" className="w-full">View Class</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Column */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Submissions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentSubmissions.map((sub, i) => (
                                                <div key={i} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                                        {sub.student.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-sm font-medium leading-none">{sub.student}</p>
                                                        <p className="text-xs text-muted-foreground">{sub.assignment}</p>
                                                        <div className="flex items-center justify-between pt-1">
                                                            <span className="text-xs text-muted-foreground">{sub.submitted}</span>
                                                            <Badge variant="outline" className="text-[10px]">{sub.status}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="ghost" className="mt-4 w-full text-xs">View All Submissions</Button>
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
