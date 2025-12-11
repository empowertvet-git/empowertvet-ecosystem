'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { VideoPlayer } from '@/components/video-player'
import { QuizInterface } from '@/components/quiz-interface'
import { AssignmentInterface } from '@/components/assignment-interface'
import { ChevronLeft, ChevronRight, CheckCircle2, Lock, Play, FileText, ClipboardList, Download } from 'lucide-react'

export default function LearnPage({ params }: { params: { id: string } }) {
  const [currentLessonId, setCurrentLessonId] = useState('1-1')

  const course = {
    id: params.id,
    title: 'Solar Energy Installation',
    progress: 35,
    modules: [
      {
        id: '1',
        title: 'Introduction to Solar Energy',
        lessons: [
          { id: '1-1', title: 'What is Solar Energy?', duration: '15 min', type: 'video', completed: true, locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { id: '1-2', title: 'Types of Solar Systems', duration: '20 min', type: 'video', completed: true, locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: '1-3', title: 'Solar Industry Overview', duration: '10 min', type: 'document', completed: false, locked: false },
          { id: '1-4', title: 'Module 1 Quiz', duration: '10 min', type: 'quiz', completed: false, locked: false }
        ]
      },
      {
        id: '2',
        title: 'Electrical Fundamentals',
        lessons: [
          { id: '2-1', title: 'Basic Electrical Principles', duration: '25 min', type: 'video', completed: false, locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { id: '2-2', title: 'Circuit Analysis', duration: '30 min', type: 'video', completed: false, locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: '2-3', title: 'Safety Procedures', duration: '20 min', type: 'video', completed: false, locked: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: '2-4', title: 'Hands-on Lab Assignment', duration: '60 min', type: 'assignment', completed: false, locked: false }
        ]
      },
      {
        id: '3',
        title: 'Solar Panel Installation',
        lessons: [
          { id: '3-1', title: 'Site Assessment', duration: '35 min', type: 'video', completed: false, locked: true },
          { id: '3-2', title: 'Mounting Systems', duration: '40 min', type: 'video', completed: false, locked: true },
          { id: '3-3', title: 'Wiring and Connections', duration: '45 min', type: 'video', completed: false, locked: true },
          { id: '3-4', title: 'Installation Project', duration: '120 min', type: 'assignment', completed: false, locked: true }
        ]
      }
    ]
  }

  const sampleQuiz = {
    id: '1',
    title: 'Module 1 Quiz: Introduction to Solar Energy',
    description: 'Test your understanding of basic solar energy concepts',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        questionText: 'What is the primary source of solar energy?',
        options: [
          { id: 'a1', text: 'The sun', isCorrect: true },
          { id: 'a2', text: 'Wind', isCorrect: false },
          { id: 'a3', text: 'Water', isCorrect: false },
          { id: 'a4', text: 'Nuclear reactions', isCorrect: false }
        ]
      },
      {
        id: 'q2',
        questionText: 'Which type of solar system is connected to the electrical grid?',
        options: [
          { id: 'b1', text: 'Off-grid system', isCorrect: false },
          { id: 'b2', text: 'Grid-tied system', isCorrect: true },
          { id: 'b3', text: 'Hybrid system', isCorrect: false },
          { id: 'b4', text: 'Stand-alone system', isCorrect: false }
        ]
      },
      {
        id: 'q3',
        questionText: 'What component converts DC power from solar panels to AC power?',
        options: [
          { id: 'c1', text: 'Battery', isCorrect: false },
          { id: 'c2', text: 'Charge controller', isCorrect: false },
          { id: 'c3', text: 'Inverter', isCorrect: true },
          { id: 'c4', text: 'Transformer', isCorrect: false }
        ]
      },
      {
        id: 'q4',
        questionText: 'What is the typical lifespan of modern solar panels?',
        options: [
          { id: 'd1', text: '5-10 years', isCorrect: false },
          { id: 'd2', text: '10-15 years', isCorrect: false },
          { id: 'd3', text: '25-30 years', isCorrect: true },
          { id: 'd4', text: '50+ years', isCorrect: false }
        ]
      },
      {
        id: 'q5',
        questionText: 'Which factor does NOT affect solar panel efficiency?',
        options: [
          { id: 'e1', text: 'Temperature', isCorrect: false },
          { id: 'e2', text: 'Angle of installation', isCorrect: false },
          { id: 'e3', text: 'Color of nearby buildings', isCorrect: true },
          { id: 'e4', text: 'Shading', isCorrect: false }
        ]
      }
    ]
  }

  const sampleAssignment = {
    id: '1',
    title: 'Hands-on Lab: Basic Electrical Circuit',
    description: 'Build and document a simple electrical circuit',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxScore: 100,
    instructions: `In this assignment, you will apply what you've learned about electrical principles.

Tasks:
1. Build a simple series circuit with a battery, switch, and LED
2. Measure the voltage and current using a multimeter
3. Document your process with photos
4. Write a brief report (500 words) explaining:
   - The components used
   - Voltage and current readings
   - What you learned from this exercise
   - Any challenges you encountered

Submission Requirements:
- Photos of your circuit setup
- Measurement data
- Written report in PDF or Word format

Grading Criteria:
- Circuit construction (30 points)
- Accurate measurements (30 points)
- Report quality (30 points)
- Overall presentation (10 points)`
  }

  const currentLesson = course.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === currentLessonId)

  const allLessons = course.modules.flatMap(m => m.lessons)
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId)
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Play
      case 'document':
        return FileText
      case 'quiz':
      case 'assignment':
        return ClipboardList
      default:
        return Play
    }
  }

  const handleLessonProgress = (progress: number) => {
    console.log('[v0] Lesson progress:', progress)
  }

  const handleLessonComplete = () => {
    console.log('[v0] Lesson completed:', currentLessonId)
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    console.log('[v0] Quiz completed:', { score, passed })
  }

  const handleAssignmentSubmit = async (text: string, file?: File) => {
    console.log('[v0] Assignment submitted:', { text, file: file?.name })
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <ChevronLeft className="size-5" />
            <Image
              src="/logo.png"
              alt="EmpowerTVET"
              width={160}
              height={48}
              className="h-24 w-auto"
              priority
            />
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <div className="text-sm">
              <div className="font-medium">{course.title}</div>
              <div className="text-muted-foreground">{course.progress}% Complete</div>
            </div>
            <div className="w-32">
              <Progress value={course.progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Course Content */}
        <aside className="hidden w-80 border-r bg-background lg:block overflow-y-auto">
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Course Content</h2>
            <Accordion type="single" collapsible defaultValue="1" className="w-full">
              {course.modules.map((module) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex-1">
                      <div className="font-medium">{module.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {module.lessons.filter(l => l.completed).length} / {module.lessons.length} completed
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const Icon = getLessonIcon(lesson.type)
                        const isActive = lesson.id === currentLessonId
                        return (
                          <li key={lesson.id}>
                            <button
                              onClick={() => !lesson.locked && setCurrentLessonId(lesson.id)}
                              disabled={lesson.locked}
                              className={`flex w-full items-center gap-2 rounded-lg p-3 text-left text-sm transition-colors ${isActive
                                ? 'bg-primary/10 text-primary'
                                : lesson.locked
                                  ? 'cursor-not-allowed opacity-50'
                                  : 'hover:bg-muted'
                                }`}
                            >
                              <Icon className="size-4 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="truncate font-medium">{lesson.title}</div>
                                <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                              </div>
                              {lesson.completed && <CheckCircle2 className="size-4 shrink-0 text-green-600" />}
                              {lesson.locked && <Lock className="size-4 shrink-0" />}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-6">
            {currentLesson?.type === 'video' && currentLesson.videoUrl ? (
              <Card className="mb-6 overflow-hidden">
                <VideoPlayer
                  videoUrl={currentLesson.videoUrl}
                  title={currentLesson.title}
                  onProgress={handleLessonProgress}
                  onComplete={handleLessonComplete}
                  lastWatchedPosition={0}
                />
              </Card>
            ) : currentLesson?.type === 'document' ? (
              <Card className="mb-6 overflow-hidden">
                <div className="aspect-video w-full bg-muted p-8">
                  <div className="flex size-full flex-col items-center justify-center">
                    <FileText className="mb-4 size-16 text-muted-foreground" />
                    <p className="mb-2 text-lg font-medium">Document Lesson</p>
                    <p className="mb-4 text-sm text-muted-foreground">{currentLesson.title}</p>
                    <div className="max-w-2xl rounded-lg border bg-background p-6">
                      <h3 className="mb-4 text-xl font-semibold">Solar Industry Overview</h3>
                      <div className="prose prose-sm">
                        <p className="mb-4">
                          The solar energy industry has experienced tremendous growth over the past decade,
                          driven by technological advances, cost reductions, and increasing environmental awareness.
                        </p>
                        <p className="mb-4">
                          As a solar installation professional, you'll be part of one of the fastest-growing
                          sectors in renewable energy. This lesson covers the current state of the industry,
                          key players, and future opportunities.
                        </p>
                        <h4 className="mb-2 mt-6 font-semibold">Key Points:</h4>
                        <ul className="list-disc space-y-2 pl-6">
                          <li>Global solar capacity continues to grow exponentially</li>
                          <li>Cost of solar panels has decreased by over 90% since 2010</li>
                          <li>Job opportunities in solar installation are increasing</li>
                          <li>Government incentives support solar adoption</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : currentLesson?.type === 'quiz' ? (
              <QuizInterface
                quiz={sampleQuiz}
                onComplete={handleQuizComplete}
              />
            ) : currentLesson?.type === 'assignment' ? (
              <AssignmentInterface
                assignment={sampleAssignment}
                onSubmit={handleAssignmentSubmit}
              />
            ) : null}

            {/* Lesson Info */}
            {(currentLesson?.type === 'video' || currentLesson?.type === 'document') && (
              <>
                <div className="mb-6">
                  <h1 className="mb-2 text-2xl font-bold">{currentLesson?.title}</h1>
                  <p className="text-muted-foreground">
                    Learn the fundamentals and best practices in this comprehensive lesson.
                  </p>
                </div>

                <Separator className="my-6" />
              </>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                disabled={!prevLesson}
                onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
              >
                <ChevronLeft className="mr-2 size-4" />
                Previous
              </Button>

              <Button
                onClick={() => {
                  if (nextLesson && !nextLesson.locked) {
                    setCurrentLessonId(nextLesson.id)
                  }
                }}
                disabled={nextLesson?.locked}
              >
                {nextLesson ? (
                  <>
                    {currentLesson?.completed ? 'Next Lesson' : 'Mark Complete & Continue'}
                    <ChevronRight className="ml-2 size-4" />
                  </>
                ) : (
                  'Complete Course'
                )}
              </Button>
            </div>

            {/* Additional Content */}
            {(currentLesson?.type === 'video' || currentLesson?.type === 'document') && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Lesson Resources</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="size-5 text-primary" />
                        <div>
                          <div className="font-medium">Lesson Notes</div>
                          <div className="text-sm text-muted-foreground">PDF, 2.3 MB</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 size-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="size-5 text-primary" />
                        <div>
                          <div className="font-medium">Additional Reading</div>
                          <div className="text-sm text-muted-foreground">PDF, 1.8 MB</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 size-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
