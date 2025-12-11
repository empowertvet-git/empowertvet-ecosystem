import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/hero-bg.png)' }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="container relative mx-auto px-4 py-20 lg:py-32">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-balance mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-1000 drop-shadow-lg text-white">
                        From Skills to Startups
                    </h1>
                    <p className="text-pretty mb-8 text-xl leading-relaxed opacity-100 lg:text-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-md font-medium text-white">
                        Empowering Gambian youth with practical vocational training, seed funding, and business support to launch successful enterprises
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
                        <Button size="lg" asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg border-2 border-transparent">
                            <Link href="/signup">
                                Join us Now
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" asChild className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg border-2 border-transparent">
                            <Link href="#programs">
                                <Play className="mr-2 size-4" />
                                Explore Programs
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)' }} />
        </section >
    )
}
