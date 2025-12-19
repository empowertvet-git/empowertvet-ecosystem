import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { GraduationCap, Search, Calendar, Clock, User, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: 'EmpowerTVET Launches New Solar Energy Program with EU Partnership',
    excerpt: 'We are excited to announce our new solar energy installation program, developed in partnership with the European Union to train 300 Gambian youth in renewable energy skills.',
    category: 'Program Launch',
    author: 'Admin Team',
    date: 'February 15, 2025',
    readTime: '5 min read',
    image: '/african-student-installing-solar-panels-gambia.jpg'
  }

  const posts = [
    {
      id: 2,
      title: 'Success Story: From Student to Solar Entrepreneur',
      excerpt: 'Meet Fatou Jallow, who transformed her solar training into a thriving business serving over 50 homes in Banjul.',
      category: 'Success Stories',
      author: 'Sarah Johnson',
      date: 'February 12, 2025',
      readTime: '4 min read',
      image: '/professional-african-woman-solar-business-owner.jpg'
    },
    {
      id: 3,
      title: 'Introducing: Sustainable Construction & Solar Trades',
      excerpt: 'We are thrilled to announce our upcoming program focused on sustainable building practices and solar integration. Enrollment opens soon for this comprehensive hands-on training.',
      category: 'Program Launch',
      author: 'Program Director',
      date: 'February 10, 2025',
      readTime: '3 min read',
      image: '/construction-technical-trades.jpg'
    },
    {
      id: 4,
      title: 'Coming Soon: Smart Urban Farming & Hydroponics',
      excerpt: 'Revolutionize agriculture in urban spaces. Our new Smart Farming course will teach hydroponics and vertical farming techniques to maximize yield in small areas.',
      category: 'Program Launch',
      author: 'Agri-Tech Team',
      date: 'February 8, 2025',
      readTime: '4 min read',
      image: '/african-agriculture-food-processing.jpg'
    },
    {
      id: 5,
      title: 'New Feature: Expert Consultation Platform',
      excerpt: 'Need advice on Agriculture, Climate Change, or Sustainable Finance? EmpowerTVET now connects you directly with industry experts for personalized consultation.',
      category: 'New Feature',
      author: 'Tech Team',
      date: 'February 5, 2025',
      readTime: '2 min read',
      image: '/young-african-tech-entrepreneur-office.jpg'
    },
    {
      id: 6,
      title: "Women in Construction: Breaking Barriers in The Gambia",
      excerpt: 'Our construction program is empowering women to enter and excel in traditionally male-dominated trades.',
      category: 'Impact',
      author: 'Diversity Team',
      date: 'February 1, 2025',
      readTime: '5 min read',
      image: '/african-construction-workers.jpg'
    },
    {
      id: 7,
      title: 'Partnership Announcement: Collaboration with Local Businesses',
      excerpt: 'New partnerships will provide internships and job placements for our graduates in key industries.',
      category: 'Partnerships',
      author: 'Partnership Team',
      date: 'January 28, 2025',
      readTime: '4 min read',
      image: '/african-youth-vocational-training-gambia.jpg'
    }
  ]

  const categories = [
    'All Posts',
    'Success Stories',
    'Program Launch',
    'New Feature',
    'Events',
    'Partnerships',
    'Impact',
    'Incubation'
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
            <span className="text-xl font-medium text-muted-foreground">| Blog</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/lms" className="text-sm font-medium transition-colors hover:text-primary">
              Courses
            </Link>
            <Link href="/partners" className="text-sm font-medium transition-colors hover:text-primary">
              Partners
            </Link>
            <Link href="/foundation" className="text-sm font-medium transition-colors hover:text-primary">
              Foundation
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/portal">Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">News & Updates</h1>
            <p className="mb-6 text-pretty text-lg text-muted-foreground">
              Stories of impact, program updates, and insights from our vocational training and incubation ecosystem
            </p>
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="h-12 pl-10 pr-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold">Featured Story</h2>
          <Card className="overflow-hidden lg:flex">
            <div className="lg:w-1/2">
              <div className="aspect-video w-full overflow-hidden bg-muted lg:aspect-auto lg:h-full">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <CardHeader className="lg:p-8">
                <Badge className="mb-4 w-fit">{featuredPost.category}</Badge>
                <h3 className="mb-4 text-2xl font-bold lg:text-3xl">{featuredPost.title}</h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="size-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read Full Story
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardHeader>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Recent Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="size-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <Badge variant="secondary" className="mb-3 w-fit">{post.category}</Badge>
                  <h3 className="mb-3 text-xl font-semibold">{post.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardHeader>
                <CardContent className="border-t pt-4">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="link" className="h-auto p-0" asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read More <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="mb-6 text-pretty text-muted-foreground">
              Subscribe to our newsletter for the latest news, success stories, and program updates
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12"
              />
              <Button size="lg">Subscribe</Button>
            </div>
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
                  width={500}
                  height={150}
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Empowering Gambian youth through skills and entrepreneurship
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li><Link href="/lms" className="hover:text-foreground">Courses</Link></li>
                <li><Link href="/portal" className="hover:text-foreground">Portal</Link></li>
                <li><Link href="/partners" className="hover:text-foreground">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog?category=success" className="hover:text-foreground">Success Stories</Link></li>
                <li><Link href="/blog?category=programs" className="hover:text-foreground">Programs</Link></li>
                <li><Link href="/blog?category=events" className="hover:text-foreground">Events</Link></li>
                <li><Link href="/blog?category=impact" className="hover:text-foreground">Impact</Link></li>
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
            <p>&copy; 2025 EmpowerTVET Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
