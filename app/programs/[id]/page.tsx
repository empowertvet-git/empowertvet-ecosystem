import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, Calendar, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { programs } from '@/lib/constants'

interface ProgramPageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateStaticParams() {
    return programs.map((program) => ({
        id: program.id,
    }))
}

export default async function ProgramPage({ params }: ProgramPageProps) {
    const { id } = await params
    const program = programs.find((p) => p.id === id)

    if (!program) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header with Logo */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-20 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="EmpowerTVET"
                            width={400}
                            height={120}
                            className="h-24 w-auto"
                            priority
                        />
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                        <Link href="/" className="text-sm font-medium hover:text-primary">
                            Home
                        </Link>
                        <Link href="/#programs" className="text-sm font-medium hover:text-primary">
                            Programs
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary">
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href="/signup">Apply Now</Link>
                        </Button>
                    </div>
                </div>
            </header >

            {/* Hero Section */}
            < div className="relative h-[400px] w-full overflow-hidden" >
                <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground">
                        {program.category}
                    </span>
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{program.title}</h1>
                    <div className="flex items-center gap-6 text-lg">
                        <div className="flex items-center gap-2">
                            <Clock className="size-5" />
                            <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="size-5" />
                            <span>Next Intake: Jan 2026</span>
                        </div>
                    </div>
                </div>
            </div >

            <div className="container mx-auto px-4 py-12">
                <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
                    <Link href="/#programs">
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Programs
                    </Link>
                </Button>

                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="mb-6 text-3xl font-bold text-primary">Program Overview</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {program.details}
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-6 text-3xl font-bold text-primary">What to Expect</h2>
                            <Card className="bg-muted/30 border-none">
                                <CardContent className="pt-6">
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {program.expectations}
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="mb-6 text-3xl font-bold text-primary">Career Prospects & Startup Path</h2>
                            <div className="rounded-xl bg-primary/5 p-8 border border-primary/10">
                                <div className="flex items-start gap-4">
                                    <Briefcase className="mt-1 size-8 text-primary" />
                                    <div>
                                        <h3 className="mb-2 text-xl font-semibold">Future Opportunities</h3>
                                        <p className="text-lg text-muted-foreground">
                                            {program.prospects}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card className="sticky top-32 overflow-hidden border-2 border-primary/10 shadow-lg">
                            <div className="bg-primary p-6 text-primary-foreground">
                                <h3 className="text-2xl font-bold">Program Details</h3>
                            </div>
                            <CardContent className="space-y-6 p-6">
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Duration</span>
                                    <p className="text-lg font-semibold">{program.duration}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Certification</span>
                                    <p className="text-lg font-semibold">National TVET Certificate</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Schedule</span>
                                    <p className="text-lg font-semibold">Full-time (Mon-Fri)</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                                    <p className="text-lg font-semibold">Main Campus, Banjul</p>
                                </div>

                                <div className="pt-6">
                                    <Button size="lg" className="w-full text-lg" asChild>
                                        <Link href="/signup">Apply for this Program</Link>
                                    </Button>
                                    <p className="mt-4 text-center text-sm text-muted-foreground">
                                        Limited spots available for the next intake.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}
