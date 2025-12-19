import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { GraduationCap, Heart, Users, Target, HandHeart, Globe, Award, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react'
import { db } from '@/lib/db'

import { getLandingStats } from '@/lib/actions/stats'

import { FoundationNavbar } from '@/components/layout/FoundationNavbar'
import { PartnersSection } from '@/components/home/PartnersSection'

export default async function FoundationPage() {
  const stats = await getLandingStats()

  const impactStats = [
    { icon: Users, label: 'Scholarships Awarded', value: `${stats.scholarshipsCount}+` },
    { icon: Heart, label: 'Donors & Supporters', value: `${stats.donorsCount}+` },
    { icon: Target, label: 'Communities Reached', value: `${stats.communitiesCount}+` },
    { icon: Award, label: 'Lives Transformed', value: `${stats.studentsTrained.toLocaleString()}+` }
  ]

  // Helper to calculate funding percentage (capped at 100 for UI safety)
  const calcFunded = (raised: number, goal: number) => Math.min(100, Math.round((raised / goal) * 100))

  const programs = [
    {
      title: 'Full Scholarships',
      description: 'Cover 100% of tuition, materials, and living expenses for underprivileged youth',
      beneficiaries: `${stats.scholarshipsCount} students`,
      funded: calcFunded(stats.programFunding.scholarships, 225000),
      goal: '$225,000'
    },
    {
      title: 'Women Empowerment Fund',
      description: 'Dedicated support for young women entering vocational training',
      beneficiaries: `${stats.womenParticipants || 200} women`, // Fallback for 0
      funded: calcFunded(stats.programFunding.women, 180000),
      goal: '$180,000'
    },
    {
      title: 'Rural Outreach Program',
      description: 'Bring vocational training to underserved rural communities',
      beneficiaries: `${stats.communitiesCount || 12} villages`,
      funded: calcFunded(stats.programFunding.outreach, 150000),
      goal: '$150,000'
    }
  ]

  const causes = await db.donation.findMany({
    take: 3,
    orderBy: {
      date: 'desc'
    },
    include: {
      donor: true
    }
  })



  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <FoundationNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-20 text-primary-foreground lg:py-28">
        <div className="absolute inset-0 bg-[url('/african-youth-vocational-training-gambia.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Non-Profit Organization
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold lg:text-6xl">
              Transforming Lives Through Education
            </h1>
            <p className="mb-8 text-pretty text-lg opacity-90 lg:text-xl">
              The EmpowerTVET Foundation provides scholarships and support to underprivileged youth, removing barriers to quality vocational education
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2">
                <Heart className="size-4" />
                Make a Donation
              </Button>
              <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 border-none">
                Our Impact Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-7 text-primary" />
                    </div>
                    <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Mission Section */}
      <section id="mission" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Mission of the Foundation</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  To empower youths, women, and vulnerable groups through skills development, climate action, environmental education, and sustainable livelihood initiatives while complementing national and global development agendas aimed at reducing unemployment, poverty, and climate vulnerability.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Vision of the Foundation</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  A skilled, resilient, and environmentally conscious society where youths and communities thrive socially, economically, and ecologically.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  'Provide full scholarships to deserving students',
                  'Expand training to underserved rural communities',
                  'Support women and girls in vocational education',
                  'Build sustainable community training centers'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <img
                  src="/african-youth-vocational-training-gambia.jpg"
                  alt="Students in training"
                  className="size-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src="/african-students-learning-coding-computer-lab.jpg"
                    alt="ICT training"
                    className="size-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src="/african-fashion-designer-tailoring-workshop.jpg"
                    alt="Fashion training"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Our Programs</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Strategic initiatives designed to maximize impact and create lasting change
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Beneficiaries</span>
                    <span className="font-semibold">{program.beneficiaries}</span>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-semibold">{program.funded}%</span>
                    </div>
                    <Progress value={program.funded} />
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-sm text-muted-foreground">Goal</span>
                    <span className="text-lg font-bold text-primary">{program.goal}</span>
                  </div>
                  <Button className="w-full">Support This Program</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section id="donate" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Ways to Give</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Every contribution, no matter the size, creates opportunity and transforms lives
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {causes.map((donation, index) => {
              return (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <Heart className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{donation.cause || 'General Donation'}</CardTitle>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Donation by {donation.donor.name}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <div className="mb-4 rounded-lg bg-muted/50 p-4">
                      <div className="mb-1 text-sm text-muted-foreground">Status</div>
                      <div className="font-medium capitalize">{donation.status}</div>
                    </div>
                    <div className="mb-4 flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">${donation.amount}</span>
                      <span className="text-sm text-muted-foreground">donated</span>
                    </div>
                    <Button className="mt-auto w-full gap-2">
                      <Heart className="size-4" />
                      Donate Similar
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-muted-foreground">Prefer a different amount? Every contribution helps.</p>
            <Button size="lg" variant="outline">
              Custom Donation Amount
            </Button>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Be Part of the Change</h2>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg opacity-90">
            Your donation creates opportunity, builds skills, and transforms communities across The Gambia
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="gap-2">
              <Heart className="size-4" />
              Make a One-Time Gift
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              Become a Monthly Donor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src="/foundation-logo.png"
                  alt="EmpowerTVET Foundation"
                  width={500}
                  height={150}
                  className="h-32 w-auto"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A 501(c)(3) non-profit organization dedicated to empowering Gambian youth through education
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Get Involved</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#donate" className="hover:text-foreground">Donate</Link></li>
                <li><Link href="/foundation/volunteer" className="hover:text-foreground">Volunteer</Link></li>
                <li><Link href="/foundation/corporate" className="hover:text-foreground">Corporate Giving</Link></li>
                <li><Link href="/foundation/legacy" className="hover:text-foreground">Legacy Giving</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/foundation/mission" className="hover:text-foreground">Our Mission</Link></li>
                <li><Link href="/foundation/team" className="hover:text-foreground">Our Team</Link></li>
                <li><Link href="/foundation/impact" className="hover:text-foreground">Impact Report</Link></li>
                <li><Link href="/foundation/financials" className="hover:text-foreground">Financials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Banjul, The Gambia</li>
                <li>foundation@empowertvet.com</li>
                <li>+220 9111117</li>
                <li>Tax ID: XX-XXXXXXX</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 EmpowerTVET Foundation. All rights reserved. 501(c)(3) Non-Profit Organization.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
