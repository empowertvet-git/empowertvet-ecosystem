import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { GraduationCap, Clock, Users, Star, Play, FileText, CheckCircle2, Award } from 'lucide-react'

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = {
    id: params.id,
    title: 'Solar Energy Installation',
    description: 'Learn solar panel installation, maintenance, and renewable energy systems for residential and commercial applications. This comprehensive program covers everything from basic electrical principles to advanced solar system design and installation.',
    category: 'Renewable Energy',
    price: 5000,
    duration: '6 months',
    students: 145,
    rating: 4.8,
    instructor: {
      name: 'Dr. Alieu Manjang',
      bio: 'PhD in Renewable Energy with 15+ years of experience in solar installations',
      avatar: '/placeholder.svg'
    },
    thumbnailUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qGeEMd2f4iJBSVLH8jsDa5jdeCr91m.png',
    level: 'Beginner',
    modules: [
      {
        title: 'Introduction to Solar Energy',
        lessons: [
          { title: 'What is Solar Energy?', duration: '15 min', type: 'video', isFree: true },
          { title: 'Types of Solar Systems', duration: '20 min', type: 'video', isFree: true },
          { title: 'Solar Industry Overview', duration: '10 min', type: 'document', isFree: false },
          { title: 'Module 1 Quiz', duration: '10 min', type: 'quiz', isFree: false }
        ]
      },
      {
        title: 'Electrical Fundamentals',
        lessons: [
          { title: 'Basic Electrical Principles', duration: '25 min', type: 'video', isFree: false },
          { title: 'Circuit Analysis', duration: '30 min', type: 'video', isFree: false },
          { title: 'Safety Procedures', duration: '20 min', type: 'video', isFree: false },
          { title: 'Hands-on Lab Assignment', duration: '60 min', type: 'assignment', isFree: false }
        ]
      },
      {
        title: 'Solar Panel Installation',
        lessons: [
          { title: 'Site Assessment', duration: '35 min', type: 'video', isFree: false },
          { title: 'Mounting Systems', duration: '40 min', type: 'video', isFree: false },
          { title: 'Wiring and Connections', duration: '45 min', type: 'video', isFree: false },
          { title: 'Installation Project', duration: '120 min', type: 'assignment', isFree: false }
        ]
      },
      {
        title: 'System Maintenance & Troubleshooting',
        lessons: [
          { title: 'Preventive Maintenance', duration: '25 min', type: 'video', isFree: false },
          { title: 'Common Issues', duration: '30 min', type: 'video', isFree: false },
          { title: 'Customer Service Skills', duration: '20 min', type: 'document', isFree: false },
          { title: 'Final Assessment', duration: '45 min', type: 'quiz', isFree: false }
        ]
      }
    ],
    outcomes: [
      'Install and maintain solar panel systems',
      'Conduct site assessments and system design',
      'Troubleshoot common solar system issues',
      'Understand electrical safety procedures',
      'Start your own solar installation business'
    ],
    requirements: [
      'Basic reading and writing skills',
      'Interest in renewable energy',
      'Physical fitness for installation work',
      'No prior technical experience required'
    ]
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const totalDuration = course.modules.reduce(
    (acc, module) => acc + module.lessons.reduce((sum, lesson) => sum + parseInt(lesson.duration), 0),
    0
  )

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="size-8 text-primary" />
            <span className="text-xl font-bold">EmpowerTVET</span>
          </Link>
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

      {/* Course Hero */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight">{course.title}</h1>
              <p className="mb-6 text-pretty text-lg text-muted-foreground">
                {course.description}
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <FileText className="size-4" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar || "/placeholder.svg"}
                  alt={course.instructor.name}
                  className="size-10 rounded-full bg-muted"
                />
                <div>
                  <div className="text-sm font-medium">{course.instructor.name}</div>
                  <div className="text-xs text-muted-foreground">{course.instructor.bio}</div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <Card className="h-fit">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={course.thumbnailUrl || "/placeholder.svg"}
                  alt={course.title}
                  className="size-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="mb-1 text-3xl font-bold">GMD {course.price.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">One-time payment</div>
                </div>
                <Button className="mb-3 w-full" size="lg" asChild>
                  <Link href={`/enroll/${course.id}`}>Enroll Now</Link>
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Play className="mr-2 size-4" />
                  Preview Course
                </Button>
                <div className="mt-6 space-y-3 border-t pt-6 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lessons</span>
                    <span className="font-medium">{totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificate</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="curriculum" className="flex-1">Curriculum</TabsTrigger>
                <TabsTrigger value="outcomes" className="flex-1">Learning Outcomes</TabsTrigger>
                <TabsTrigger value="requirements" className="flex-1">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {course.modules.map((module, moduleIndex) => (
                        <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-semibold">{module.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {module.lessons.length} lessons
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-3">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center justify-between border-b pb-3 last:border-0">
                                  <div className="flex items-center gap-3">
                                    {lesson.type === 'video' && <Play className="size-4 text-primary" />}
                                    {lesson.type === 'document' && <FileText className="size-4 text-primary" />}
                                    {lesson.type === 'quiz' && <CheckCircle2 className="size-4 text-primary" />}
                                    {lesson.type === 'assignment' && <Award className="size-4 text-primary" />}
                                    <span className="text-sm">{lesson.title}</span>
                                    {lesson.isFree && (
                                      <Badge variant="outline" className="text-xs">Free Preview</Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="outcomes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {course.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 size-1.5 shrink-0 rounded-full bg-foreground" />
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
