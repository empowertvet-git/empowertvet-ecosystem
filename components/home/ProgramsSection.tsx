import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock } from 'lucide-react'
import { db } from '@/lib/db'

export async function ProgramsSection() {
    // Fetch top 3 published courses
    const courses = await db.course.findMany({
        where: {
            published: true
        },
        take: 6,
        // orderBy: {
        //     createdAt: 'desc'
        // }
    })

    return (
        <section id="programs" className="bg-muted/30 py-20 lg:py-28">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold lg:text-5xl">Training Programs</h2>
                    <p className="mx-auto max-w-3xl text-pretty text-lg text-muted-foreground">
                        Industry-certified vocational courses designed for real-world success in high-demand sectors
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course.id} className="group overflow-hidden transition-all hover:shadow-xl border-0 flex flex-col">
                            <div className="aspect-video w-full overflow-hidden bg-muted">
                                <img
                                    src={course.image || "/placeholder.svg"}
                                    alt={course.title}
                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <CardContent className="p-6 flex flex-col flex-1">
                                <div className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">
                                    {course.category || 'General'}
                                </div>
                                <h3 className="mb-3 text-2xl font-bold line-clamp-2">{course.title}</h3>
                                <div className="mt-auto flex items-center justify-between border-t pt-4">
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                        <Clock className="size-3" />
                                        {course.duration || 'Self-paced'}
                                    </span>
                                    <Button variant="link" className="h-auto p-0 text-primary group-hover:translate-x-1 transition-transform" asChild>
                                        <Link href={`/lms/courses/${course.id}`}>
                                            Learn More <ArrowRight className="ml-1 size-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {courses.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground p-8">
                            No programs currently available. Please check back later.
                        </div>
                    )}
                </div>
                <div className="mt-12 text-center">
                    <Button size="lg" asChild className="hover:scale-105 transition-transform">
                        <Link href="/lms">View All Programs</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
