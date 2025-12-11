import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Heart, DollarSign, FileText, Settings, LogOut, Bell, TrendingUp, Download } from 'lucide-react'

export default function DonorDashboardPage() {
    const donations = [
        {
            id: 'D-1023',
            date: 'Nov 15, 2025',
            amount: '$500.00',
            cause: 'Scholarship Fund',
            status: 'Completed'
        },
        {
            id: 'D-0988',
            date: 'Oct 01, 2025',
            amount: '$1,200.00',
            cause: 'Solar Lab Equipment',
            status: 'Completed'
        }
    ]

    const impactStats = [
        { label: 'Students Supported', value: '5', icon: Heart },
        { label: 'Total Contributed', value: '$1,700', icon: DollarSign },
        { label: 'Projects Funded', value: '2', icon: TrendingUp }
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
                        <span className="text-xl font-medium text-muted-foreground">| Donor Portal</span>
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
                        <Link href="/donate/dashboard" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                            <TrendingUp className="size-4" />
                            Impact Dashboard
                        </Link>
                        <Link href="/donate/history" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <DollarSign className="size-4" />
                            Donation History
                        </Link>
                        <Link href="/donate/reports" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            <FileText className="size-4" />
                            Reports & Tax
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h1 className="mb-2 text-3xl font-bold">Thank you, John!</h1>
                            <p className="text-muted-foreground">Your generosity is transforming lives in The Gambia.</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="mb-8 grid gap-4 sm:grid-cols-3">
                            {impactStats.map((stat, index) => {
                                const Icon = stat.icon
                                return (
                                    <Card key={index}>
                                        <CardContent className="flex items-center gap-4 p-6">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                                                <Icon className="size-6 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Impact Stories Column */}
                            <div className="space-y-6 lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Impact in Action</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="rounded-lg border p-4">
                                            <h3 className="mb-2 font-semibold">Scholarship Fund Progress</h3>
                                            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                                                <span>Goal: $5,000</span>
                                                <span>Raised: $3,200</span>
                                            </div>
                                            <Progress value={64} className="h-2" />
                                            <p className="mt-3 text-sm text-muted-foreground">
                                                Your contribution helped sponsor 5 students in the Solar Energy program this semester.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="mb-4 font-semibold">Recent Donations</h3>
                                            <div className="space-y-4">
                                                {donations.map((donation) => (
                                                    <div key={donation.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                                        <div>
                                                            <div className="font-medium">{donation.cause}</div>
                                                            <div className="text-sm text-muted-foreground">{donation.date}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold">{donation.amount}</div>
                                                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                                                <Download className="mr-1 size-3" /> Receipt
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions Column */}
                            <div className="space-y-6">
                                <Card className="bg-primary text-primary-foreground">
                                    <CardHeader>
                                        <CardTitle>Make a New Donation</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-sm opacity-90">
                                            Continue supporting our mission. Every contribution makes a difference.
                                        </p>
                                        <Button variant="secondary" className="w-full">
                                            Donate Now
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Annual Report</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <div className="flex size-12 items-center justify-center rounded bg-muted">
                                                <FileText className="size-6 text-muted-foreground" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">2024 Impact Report</div>
                                                <div className="text-xs text-muted-foreground">PDF • 4.2 MB</div>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <Download className="size-4" />
                                            </Button>
                                        </div>
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
