import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Users, Star, Search, Filter } from 'lucide-react'
import { db } from '@/lib/db'

export default async function LMSPage() {
  const courses = await db.course.findMany({
    where: {
      published: true
    },
    include: {
      _count: {
        select: { enrollments: true }
      }
    }
  })

  // Fetch unique categories for the filter
  const categories = await db.course.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ['category']
  })

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="EmpowerTVET"
              width={180}
              height={54}
              className="h-24 w-auto"
              priority
            />
            <span className="text-sm font-medium text-muted-foreground">| LMS</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/lms" className="text-sm font-medium text-primary">
              Courses
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              My Learning
            </Link>
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Learn Skills, Build Your Future</h1>
            <p className="mb-6 text-pretty text-lg text-muted-foreground">
              Industry-certified vocational courses with real-world application and startup support
            </p>
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for courses..."
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
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="size-4" />
              Filter
            </Button>
            <Badge variant="secondary" className="cursor-pointer">All Courses</Badge>
            {categories.map((c) => (
              <Badge key={c.category} variant="outline" className="cursor-pointer hover:bg-secondary">
                {c.category || 'Uncategorized'}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Available Courses</h2>
            <p className="text-sm text-muted-foreground">{courses.length} courses</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No courses available at the moment. Check back soon!</p>
              </div>
            ) : (
              courses.map((course) => (
                <Card key={course.id} className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="size-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="secondary">{course.category || 'General'}</Badge>
                      {course.level && <Badge variant="outline">{course.level}</Badge>}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 mt-auto">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{course.duration || 'Self-paced'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="size-4" />
                        <span>{course._count?.enrollments || 0} students</span>
                      </div>
                      {/* Removed fake rating as per accuracy requirement */}
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs h-5 px-1.5 font-normal">New</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <span className="text-lg font-bold text-primary">{formatPrice(course.price)}</span>
                      <Button asChild>
                        <Link href={`/lms/courses/${course.id}`}>Enroll Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Not Sure Where to Start?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-pretty opacity-90">
            Speak with our career counselors to find the perfect program for your goals
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/lms/consultation">Schedule Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Image
              src="/logo.png"
              alt="EmpowerTVET"
              width={400}
              height={110}
              className="h-24 w-auto"
            />
            <p className="text-sm text-muted-foreground">&copy; 2025 EmpowerTVET. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:text-primary">Home</Link>
              <Link href="/portal" className="hover:text-primary">Portal</Link>
              <Link href="/partners" className="hover:text-primary">Partners</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
