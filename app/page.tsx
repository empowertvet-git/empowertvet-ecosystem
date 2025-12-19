import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
// import { SuccessStoriesSection } from '@/components/home/SuccessStoriesSection'
import { ConsultationServices } from '@/components/home/ConsultationServices'
import { UniqueModelStats } from '@/components/home/UniqueModelStats'
import { PartnersSection } from '@/components/home/PartnersSection'

import { Navbar } from '@/components/layout/Navbar'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Navbar />

      <HeroSection />
      <StatsSection />

      {/* Value Proposition */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6 text-4xl font-bold lg:text-5xl">Our Unique Model</h2>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                We don't just train students—we transform them into successful entrepreneurs. Our integrated approach combines quality vocational education with startup incubation and ongoing business support.
              </p>
              <ul className="space-y-4">
                {[
                  'Industry-certified practical training',
                  'Seed funding and micro-loans for graduates',
                  'Shared business services (legal, accounting, marketing)',
                  'Mentorship from professionals and diaspora entrepreneurs',
                  'Revenue-sharing model for sustainable growth'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/partners">
                    Become a Partner
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <UniqueModelStats />
          </div>
        </div>
      </section>

      <ProgramsSection />
      {/* <SuccessStoriesSection /> */}
      <ConsultationServices />
      <PartnersSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-[#0d9488] py-20 text-primary-foreground">
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">Ready to Transform Your Future?</h2>
          <p className="mx-auto mb-10 max-w-3xl text-pretty text-xl opacity-95">
            Join thousands of successful graduates who turned their skills into thriving businesses
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="gap-2 bg-secondary hover:bg-secondary/90 transition-all hover:scale-105">
              <Link href="/signup">
                Enroll Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 transition-all hover:scale-105" asChild>
              <Link href="/partners">Become a Partner</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Image
                src="/logo.png"
                alt="EmpowerTVET"
                width={400}
                height={110}
                className="mb-4 h-24 w-auto"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Empowering Gambian youth through skills and entrepreneurship
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/lms" className="hover:text-foreground">Learning Platform</Link></li>
                <li><Link href="/portal" className="hover:text-foreground">Student Portal</Link></li>
                <li><Link href="/partners" className="hover:text-foreground">Partner Portal</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Programs</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/lms" className="hover:text-foreground">Solar Energy</Link></li>
                <li><Link href="/lms" className="hover:text-foreground">ICT Training</Link></li>
                <li><Link href="/lms" className="hover:text-foreground">Construction</Link></li>
                <li><Link href="/lms" className="hover:text-foreground">Hospitality</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Banjul, The Gambia</li>
                <li>info@empowertvet.com</li>
                <li>+220 9111117</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EmpowerTVET. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
