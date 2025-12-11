import {
    Lightbulb,
    Leaf,
    DollarSign,
    Zap,
    Rocket,
    BookOpen,
    Code,
    Users,
    PenTool
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const services = [
    {
        title: "Skills & TVET Consulting",
        icon: Lightbulb,
        description: "Expert guidance on curriculum development and vocational training strategies."
    },
    {
        title: "Climate & Environment",
        icon: Leaf,
        description: "Sustainable practices and environmental impact assessments."
    },
    {
        title: "Sustainable Finance",
        icon: DollarSign,
        description: "Strategies for green financing and long-term economic sustainability."
    },
    {
        title: "Energy & Green Industry",
        icon: Zap,
        description: "Consulting on renewable energy solutions and industrial greening."
    },
    {
        title: "Entrepreneurship & MSMEs",
        icon: Rocket,
        description: "Support for startups and small to medium enterprise growth."
    },
    {
        title: "Research & Policy",
        icon: BookOpen,
        description: "Data-driven research and policy formulation for development sectors."
    },
    {
        title: "Digital Innovation",
        icon: Code,
        description: "Leveraging technology for business transformation and efficiency."
    },
    {
        title: "Training & Capacity Building",
        icon: Users,
        description: "Workshops and programs to enhance organizational skills and capacity."
    },
    {
        title: "Project Design & Donor Advisory",
        icon: PenTool,
        description: "Designing impactful projects and advising on donor requirements."
    }
]

export function ConsultationServices() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold lg:text-5xl">Consultation Services</h2>
                    <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                        Professional expertise to drive sustainable growth and innovation across key sectors.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <Link key={index} href="/services" className="block h-full">
                            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <CardContent className="flex flex-col items-center p-8 text-center h-full">
                                    <div className="mb-6 rounded-full bg-primary/10 p-4">
                                        <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {service.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
