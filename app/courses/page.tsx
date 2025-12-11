import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Clock, Users, Star } from 'lucide-react'

export default function CoursesPage() {
  const categories = [
    { name: 'All Programs', value: 'all' },
    { name: 'Technology', value: 'technology' },
    { name: 'Renewable Energy', value: 'renewable' },
    { name: 'Construction', value: 'construction' },
    { name: 'Agriculture', value: 'agriculture' },
    { name: 'Hospitality', value: 'hospitality' },
    { name: 'Creative Arts', value: 'creative' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Solar Energy Installation',
      description: 'Learn solar panel installation, maintenance, and renewable energy systems for residential and commercial applications.',
      category: 'Renewable Energy',
      price: 5000,
      duration: '6 months',
      students: 145,
      rating: 4.8,
      instructor: 'Dr. Alieu Manjang',
      thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qGeEMd2f4iJBSVLH8jsDa5jdeCr91m.png',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'ICT & Digital Skills',
      description: 'Master programming, web development, digital marketing, and essential computer skills for the modern workplace.',
      category: 'Technology',
      price: 6000,
      duration: '8 months',
      students: 312,
      rating: 4.9,
      instructor: 'Muhammed Sarr',
      thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qGeEMd2f4iJBSVLH8jsDa5jdeCr91m.png',
      level: 'Beginner'
    },
    {
      id: 3,
      title: 'Construction & Masonry',
      description: 'Professional training in building construction, masonry techniques, and project management for construction sites.',
      category: 'Construction',
      price: 4500,
      duration: '7 months',
      students: 98,
      rating: 4.7,
      instructor: 'Lamin Bojang',
      thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qGeEMd2f4iJBSVLH8jsDa5jdeCr91m.png',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Hospitality & Culinary Arts',
      description: 'Culinary skills, hotel management, and customer service excellence for the hospitality industry.',
      category: 'Hospitality',
      price: 3500,
      duration: '5 months',
      students: 167,
      rating: 4.6,
      instructor: 'Fatou Ceesay',
      thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRBYGNUdUNEY28wyruibgoAAIzdUWN.png',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Fashion & Tailoring',
      description: 'Fashion design, tailoring, and garment production techniques for creating professional clothing.',
      category: 'Creative Arts',
      price: 3000,
      duration: '6 months',
      students: 203,
      rating: 4.8,
      instructor: 'Awa Jallow',
      thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRBYGNUdUNEY28wyruibgoAAIzdUWN.png',
      level: 'Beginner'
    },
    {
      id: 6,
      title: 'Agri-Processing & Food Tech',
      description: 'Food processing, packaging, and agricultural value chain management for sustainable agriculture.',
      category: 'Agriculture',
      price: 4000,
      duration: '6 months',
      students: 89,
      rating: 4.5,
      instructor: 'Omar Touray',
      thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRBYGNUdUNEY28wyruibgoAAIzdUWN.png',
      level: 'Intermediate'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="size-8 text-primary" />
            <span className="text-xl font-bold">EmpowerTVET</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/courses" className="text-sm font-medium text-primary">
              Courses
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Explore Our Programs
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Industry-certified vocational training designed to launch your career and business
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={category.value === 'all' ? 'default' : 'outline'}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {courses.length} programs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={course.thumbnailUrl || "/placeholder.svg"}
                    alt={course.title}
                    className="size-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold leading-tight">
                    {course.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {course.description}
                  </p>

                  <div className="mb-4 flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-amber-500 text-amber-500" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">
                      ({course.students} students)
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="size-4" />
                      <span>{course.instructor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-2xl font-bold">GMD {course.price.toLocaleString()}</span>
                    </div>
                    <Button asChild>
                      <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
