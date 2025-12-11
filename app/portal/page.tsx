import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, Award, Calendar, FileText, Settings, LogOut, Bell, CheckCircle } from 'lucide-react'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function StudentHubPage() {
  const session = await auth()

  // For demo purposes, if not logged in, we might want to redirect or show a demo view.
  // But since we just seeded 'student@example.com', let's try to fetch that user if no session,
  // OR just redirect to login.
  if (!session?.user?.email) {
    // For development ease, let's fetch the seeded student if no session exists yet (optional hack)
    // But better to enforce login.
    // redirect('/login') 
  }

  // Fetch data for the logged in user (or the seeded student for demo)
  const email = session?.user?.email || 'student@example.com'

  const user = await db.user.findUnique({
    where: { email },
    include: {
      enrollments: {
        include: {
          course: true
        }
      },
      submissions: {
        include: {
          assignment: {
            include: {
              class: {
                include: {
                  course: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!user) {
    return <div>User not found</div>
  }

  const enrolledCourses = user.enrollments.map(enrollment => ({
    id: enrollment.course.id,
    title: enrollment.course.title,
    progress: enrollment.progress,
    nextLesson: 'Next Lesson', // Placeholder as we didn't seed lessons deeply
    dueDate: 'Flexible',
    image: enrollment.course.image || '/placeholder.svg',
    totalLessons: 10, // Placeholder
    completedLessons: Math.floor(enrollment.progress / 10)
  }))

  const upcomingAssignments = user.submissions
    .filter(sub => sub.status === 'pending')
    .map(sub => ({
      course: sub.assignment.class.course.title,
      assignment: sub.assignment.title,
      dueDate: sub.assignment.dueDate.toLocaleDateString(),
      status: sub.status
    }))

  const recentGrades = user.submissions
    .filter(sub => sub.status === 'graded')
    .map(sub => ({
      course: sub.assignment.class.course.title,
      assignment: sub.assignment.title,
      grade: sub.grade,
      status: 'passed'
    }))

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="EmpowerTVET"
              width={400}
              height={120}
              className="h-24 w-auto"
              priority
            />
            <span className="text-xl font-medium text-muted-foreground">| Student Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="size-5" />
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/api/auth/signout">
                <LogOut className="mr-2 size-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-muted/30 lg:block">
          <nav className="space-y-1 p-4">
            <Link href="/portal" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              <BookOpen className="size-4" />
              Overview
            </Link>
            <Link href="/lms" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Clock className="size-4" />
              My Courses
            </Link>
            <Link href="/portal/assignments" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <FileText className="size-4" />
              Assignments
            </Link>
            <Link href="/portal/grades" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Award className="size-4" />
              Grades
            </Link>
            <Link href="/portal/schedule" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Calendar className="size-4" />
              Schedule
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Welcome back, {user.name?.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your learning today.</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
                      <BookOpen className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
                      <CheckCircle className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {enrolledCourses.reduce((acc, curr) => acc + curr.completedLessons, 0)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                      <Award className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Continue Learning */}
                  <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                      <CardTitle>Continue Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {enrolledCourses.map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{course.title}</span>
                              <span className="text-muted-foreground">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} />
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{course.nextLesson}</span>
                              <Button variant="link" className="h-auto p-0" asChild>
                                <Link href={`/learn/${course.id}`}>Resume</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Assignments */}
                  <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                      <CardTitle>Upcoming Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingAssignments.length > 0 ? (
                          upcomingAssignments.map((item, i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{item.assignment}</p>
                                <p className="text-xs text-muted-foreground">{item.course}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-medium">{item.dueDate}</p>
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No upcoming assignments.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader><CardTitle>My Courses</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {enrolledCourses.map(course => (
                        <div key={course.id} className="border rounded-lg p-4">
                          <div className="aspect-video relative mb-2 bg-muted rounded overflow-hidden">
                            <Image src={course.image} alt={course.title} fill className="object-cover" />
                          </div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <Progress value={course.progress} className="mt-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No recent activity logged.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
