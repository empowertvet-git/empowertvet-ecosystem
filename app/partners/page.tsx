import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, TrendingUp, Users, DollarSign, Target, Handshake, BarChart3, Award, ArrowRight, CheckCircle2, Building2 } from 'lucide-react'

import { getLandingStats } from '@/lib/actions/stats'

export default async function PartnersPage() {
  const stats = await getLandingStats()

  // Format revenue helper
  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`
    return `$${amount}`
  }

  const impactMetrics = [
    { icon: Users, label: 'Youth Trained', value: `${stats.studentsTrained.toLocaleString()}+`, growth: '+45% YoY' },
    { icon: Building2, label: 'Businesses Launched', value: `${stats.graduateStartups}+`, growth: '+62% YoY' },
    { icon: DollarSign, label: 'Revenue Generated', value: formatRevenue(stats.totalRevenue), growth: '+78% YoY' },
    { icon: TrendingUp, label: 'Employment Rate', value: `${stats.employmentRate}%`, growth: '+12% YoY' }
  ]

  const investmentOpportunities = [
    {
      title: 'Seed Funding Pool',
      description: 'Direct investment in graduate startups with revenue-sharing model',
      minInvestment: '$50,000',
      expectedROI: '12-18%',
      term: '3-5 years',
      impact: 'Fund 20-30 startups'
    },
    {
      title: 'Infrastructure Development',
      description: 'Build new training facilities and equipment',
      minInvestment: '$100,000',
      expectedROI: '8-12%',
      term: '5-7 years',
      impact: 'Train 500+ additional students'
    },
    {
      title: 'Program Expansion',
      description: 'Launch new vocational programs in high-demand sectors',
      minInvestment: '$75,000',
      expectedROI: '10-15%',
      term: '4-6 years',
      impact: 'Create 3 new programs'
    }
  ]

  const partnershipModels = [
    {
      title: 'CSR Collaboration',
      description: 'Corporate social responsibility partnerships with brand visibility',
      benefits: ['Brand recognition', 'Tax benefits', 'Impact reporting', 'Employee engagement']
    },
    {
      title: 'Revenue-Sharing',
      description: 'Invest in graduate businesses with equity or revenue share',
      benefits: ['Direct ROI', 'Portfolio diversification', 'Social impact', 'Exit opportunities']
    },
    {
      title: 'Donor Funding',
      description: 'Philanthropic support for scholarships and capacity building',
      benefits: ['Tax deduction', 'Naming rights', 'Impact measurement', 'Legacy building']
    }
  ]

  const successStories = [
    {
      company: 'Solar Solutions Gambia',
      founder: 'Fatou Jallow',
      sector: 'Renewable Energy',
      investment: '$5,000',
      currentRevenue: '$42,000/year',
      roi: '210%'
    },
    {
      company: 'TechHub Banjul',
      founder: 'Modou Ceesay',
      sector: 'ICT Services',
      investment: '$8,000',
      currentRevenue: '$62,400/year',
      roi: '195%'
    },
    {
      company: "Awa's Fashion House",
      founder: 'Awa Sanneh',
      sector: 'Fashion & Design',
      investment: '$3,500',
      currentRevenue: '$33,600/year',
      roi: '240%'
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
            <span className="text-xl font-medium text-muted-foreground">| Partners</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#impact" className="text-sm font-medium transition-colors hover:text-primary">
              Impact
            </Link>
            <Link href="#opportunities" className="text-sm font-medium transition-colors hover:text-primary">
              Opportunities
            </Link>
            <Link href="#models" className="text-sm font-medium transition-colors hover:text-primary">
              Partnership Models
            </Link>
            <Link href="#portfolio" className="text-sm font-medium transition-colors hover:text-primary">
              Portfolio
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button asChild>
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?key=bgpattern')] bg-cover bg-center opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Impact Investment Opportunity
            </Badge>
            <h1 className="mb-6 text-balance text-4xl font-bold lg:text-6xl">
              Invest in Youth, Generate Returns, Create Impact
            </h1>
            <p className="mb-8 text-pretty text-lg opacity-90 lg:text-xl">
              Partner with EmpowerTVET to reduce youth unemployment while earning measurable financial and social returns
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2">
                Schedule a Meeting
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                Download Investment Deck
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section id="impact" className="border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Our Impact by the Numbers</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Measurable results that demonstrate the effectiveness of our model
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className="mb-1 text-3xl font-bold">{metric.value}</div>
                    <div className="mb-2 text-sm text-muted-foreground">{metric.label}</div>
                    <Badge variant="secondary" className="text-xs">
                      {metric.growth}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section id="opportunities" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Investment Opportunities</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Multiple pathways to invest with competitive returns and measurable social impact
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {investmentOpportunities.map((opportunity, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="secondary">Investment</Badge>
                    <span className="text-sm text-muted-foreground">{opportunity.term}</span>
                  </div>
                  <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {opportunity.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Min. Investment</span>
                      <span className="font-semibold">{opportunity.minInvestment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Expected ROI</span>
                      <span className="font-semibold text-primary">{opportunity.expectedROI}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Social Impact</span>
                      <span className="text-sm font-medium">{opportunity.impact}</span>
                    </div>
                  </div>
                  <Button className="mt-auto w-full">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section id="models" className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Partnership Models</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Flexible engagement models designed to meet your organizational goals
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {partnershipModels.map((model, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Handshake className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{model.title}</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {model.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {model.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Performance */}
      <section id="portfolio" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Portfolio Performance</h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Real businesses, real returns, real impact on The Gambian economy
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <Card key={index}>
                <CardHeader>
                  <Badge className="mb-2 w-fit">{story.sector}</Badge>
                  <CardTitle className="text-xl">{story.company}</CardTitle>
                  <p className="text-sm text-muted-foreground">Founded by {story.founder}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Initial Investment</span>
                      <span className="font-semibold">{story.investment}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Revenue</span>
                      <span className="font-semibold">{story.currentRevenue}</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-sm font-medium">Total ROI</span>
                      <span className="text-xl font-bold text-primary">{story.roi}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Ready to Make an Impact?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg opacity-90">
            Join leading organizations investing in Gambian youth and generating competitive returns
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="gap-2">
              Schedule a Call
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              Download Prospectus
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
                  src="/logo.png"
                  alt="EmpowerTVET"
                  width={400}
                  height={110}
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Investing in Gambian youth for sustainable economic growth
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">For Investors</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#impact" className="hover:text-foreground">Impact Metrics</Link></li>
                <li><Link href="#opportunities" className="hover:text-foreground">Investment Opportunities</Link></li>
                <li><Link href="#portfolio" className="hover:text-foreground">Portfolio</Link></li>
                <li><Link href="#contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/partners/reports" className="hover:text-foreground">Impact Reports</Link></li>
                <li><Link href="/partners/case-studies" className="hover:text-foreground">Case Studies</Link></li>
                <li><Link href="/partners/faq" className="hover:text-foreground">FAQ</Link></li>
                <li><Link href="/partners/legal" className="hover:text-foreground">Legal Documents</Link></li>
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
