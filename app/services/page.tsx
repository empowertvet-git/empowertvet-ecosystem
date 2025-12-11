import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    Lightbulb,
    Leaf,
    DollarSign,
    Zap,
    Rocket,
    BookOpen,
    Code,
    Users,
    PenTool,
    ArrowRight
} from 'lucide-react'

const services = [
    {
        title: "Skills & TVET Consulting",
        icon: Lightbulb,
        description: "Expert guidance on curriculum development and vocational training strategies.",
        details: "We help institutions design industry-relevant curricula that bridge the gap between education and employment. Our approach ensures that training programs meet current market demands and international standards."
    },
    {
        title: "Climate & Environment",
        icon: Leaf,
        description: "Sustainable practices and environmental impact assessments.",
        details: "Our team provides comprehensive environmental assessments and strategies to minimize ecological footprints. We help organizations integrate sustainability into their core operations."
    },
    {
        title: "Sustainable Finance",
        icon: DollarSign,
        description: "Strategies for green financing and long-term economic sustainability.",
        details: "Unlock potential with our sustainable finance advisory. We assist in structuring green bonds, impact investing frameworks, and financial models that prioritize long-term value creation."
    },
    {
        title: "Energy & Green Industry",
        icon: Zap,
        description: "Consulting on renewable energy solutions and industrial greening.",
        details: "Transition to a low-carbon future with our energy consulting. We specialize in renewable energy integration, energy efficiency audits, and creating green industrial parks."
    },
    {
        title: "Entrepreneurship & MSMEs",
        icon: Rocket,
        description: "Support for startups and small to medium enterprise growth.",
        details: "From incubation to scaling, we provide mentorship, access to markets, and business development services tailored for startups and MSMEs in The Gambia."
    },
    {
        title: "Research & Policy",
        icon: BookOpen,
        description: "Data-driven research and policy formulation for development sectors.",
        details: "We conduct rigorous research to inform policy decisions. Our reports and policy briefs help government and NGOs shape effective development interventions."
    },
    {
        title: "Digital Innovation",
        icon: Code,
        description: "Leveraging technology for business transformation and efficiency.",
        details: "Embrace digital transformation. We help businesses adopt modern technologies, automate processes, and implement digital tools to boost productivity and competitiveness."
    },
    {
        title: "Training & Capacity Building",
        icon: Users,
        description: "Workshops and programs to enhance organizational skills and capacity.",
        details: "Empower your workforce with our customized training programs. We offer workshops on leadership, technical skills, and soft skills to build a robust and capable team."
    },
    {
        title: "Project Design & Donor Advisory",
        icon: PenTool,
        description: "Designing impactful projects and advising on donor requirements.",
        details: "Secure funding and deliver impact with our project design services. We specialize in proposal writing, logical framework analysis, and meeting complex donor compliance standards."
    }
]

export default function ServicesPage() {
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
                            <Link href="/contact">Book Consultation</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="bg-muted/30 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="mb-6 text-4xl font-bold lg:text-6xl">Our Consultation Services</h1>
                        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                            We provide specialized expertise to drive sustainable growth, innovation, and capacity building across key economic sectors in The Gambia.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service, index) => (
                                <Card key={index} className="flex flex-col transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="mb-4 w-fit rounded-full bg-primary/10 p-3">
                                            <service.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                                        <CardDescription className="text-base mt-2">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-1 flex-col justify-between">
                                        <p className="mb-6 text-muted-foreground leading-relaxed">
                                            {service.details}
                                        </p>
                                        <Button asChild variant="outline" className="w-full mt-auto hover:bg-primary hover:text-primary-foreground group">
                                            <Link href={`/contact?subject=${encodeURIComponent(service.title)}`}>
                                                Book Consultation
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-primary py-20 text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Ready to Transform Your Organization?</h2>
                        <p className="mx-auto mb-10 max-w-2xl text-xl opacity-90">
                            Partner with us to access world-class expertise tailored to the local context.
                        </p>
                        <Button size="lg" variant="secondary" asChild className="text-white hover:scale-105 transition-transform">
                            <Link href="/contact">
                                Get Started Today
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="border-t bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 EmpowerTVET. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
