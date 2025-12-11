import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, Users, Star, CheckCircle2, PlayCircle, FileText, Award, ArrowLeft, Calendar } from 'lucide-react'
import { db } from '@/lib/db'

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = await db.course.findUnique({
    where: { id },
    include: {
      modules: {
        include: {
          lessons: true
        }
      },
      _count: {
        select: { enrollments: true }
      }
    }
  })

  if (!course) {
    notFound()
  }

  // Mock instructor for now as schema doesn't enforce one-to-one
  const instructor = {
    name: 'EmpowerTVET Expert',
    title: 'Senior Instructor',
    experience: '10+ years'
  }

  // Mock benefits if not in DB (schema doesn't have benefits list)
  const benefits = [
    'Industry-recognized certification',
    'Hands-on practical training',
    'Business startup support',
    'Access to seed funding',
    'Lifetime course access',
    'Job placement assistance'
  ]

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
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/lms">
                <ArrowLeft className="mr-2 size-4" />
                Back to Courses
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Course Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Badge className="mb-4">{course.category || 'General'}</Badge>
              <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
              <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                {course.description}
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-muted-foreground">(25 reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Users className="size-4" />
                  <span>{course._count.enrollments} students enrolled</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{course.duration || 'Self-paced'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-semibold">{instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{instructor.experience} experience</p>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="size-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {course.price === 0 ? 'Free' : `GMD ${course.price.toLocaleString()}`}
                    </span>
                    <span className="text-sm text-muted-foreground">one-time payment</span>
                  </div>
                  <div className="space-y-3">
                    <Button size="lg" className="w-full" asChild>
                      <Link href={`/lms/courses/${course.id}/enroll`}>Enroll Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      <PlayCircle className="mr-2 size-4" />
                      Preview Course
                    </Button>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-3">
                    <h3 className="font-semibold">This course includes:</h3>
                    <ul className="space-y-2 text-sm">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold">Course Curriculum</h2>
            <div className="space-y-4">
              {course.modules.length > 0 ? (
                course.modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            Module {index + 1}: {module.title}
                          </CardTitle>
                          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <FileText className="size-4" />
                              <span>{module.lessons.length} lessons</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">Module {index + 1}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground">Course content is being updated. Check back soon!</p>
                </div>
              )}
            </div>

            <Card className="mt-8 bg-muted/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Award className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Certification & Career Support</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Upon completion, receive an industry-recognized certificate and access to our incubation program with seed funding opportunities, business mentorship, and job placement support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Image
              src="/logo.png"
              alt="EmpowerTVET"
              width={500}
              height={150}
              className="h-24 w-auto"
              priority
            />
            <p className="text-sm text-muted-foreground">&copy; 2025 EmpowerTVET. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
