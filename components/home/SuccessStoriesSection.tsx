import { Card, CardContent } from '@/components/ui/card'
import { successStories } from '@/lib/constants'

export function SuccessStoriesSection() {
    return (
        <section id="impact" className="py-20 lg:py-28">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold lg:text-5xl">Graduate Success Stories</h2>
                    <p className="mx-auto max-w-3xl text-pretty text-lg text-muted-foreground">
                        Real graduates building real businesses and creating jobs in The Gambia
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {successStories.map((story, index) => (
                        <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-square w-full overflow-hidden bg-muted">
                                <img
                                    src={story.image || "/placeholder.svg"}
                                    alt={story.name}
                                    className="size-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="mb-2 text-2xl font-bold">{story.name}</h3>
                                <p className="mb-4 text-base font-semibold text-primary">{story.business}</p>
                                <p className="mb-6 leading-relaxed text-muted-foreground">{story.description}</p>
                                <div className="flex items-center justify-between border-t pt-4">
                                    <span className="text-sm font-medium text-muted-foreground">Monthly Revenue</span>
                                    <span className="text-2xl font-bold text-primary">{story.revenue}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
