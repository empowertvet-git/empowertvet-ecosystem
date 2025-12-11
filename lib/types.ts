// Core type definitions for the LMS

export type UserRole = 'student' | 'instructor' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  durationMonths: number
  price: number
  thumbnailUrl?: string
  instructorId?: string
  instructor?: User
  isPublished: boolean
  enrollmentCount?: number
  modules?: CourseModule[]
  createdAt: string
  updatedAt: string
}

export interface CourseModule {
  id: string
  courseId: string
  title: string
  description?: string
  orderIndex: number
  lessons?: Lesson[]
  createdAt: string
}

export type LessonType = 'video' | 'document' | 'quiz' | 'assignment'

export interface Lesson {
  id: string
  moduleId: string
  title: string
  content?: string
  lessonType: LessonType
  videoUrl?: string
  durationMinutes?: number
  orderIndex: number
  isFreePreview: boolean
  progress?: LessonProgress
  assessment?: Assessment
  assignment?: Assignment
  createdAt: string
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  course?: Course
  enrollmentDate: string
  completionPercentage: number
  status: 'active' | 'completed' | 'suspended'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
}

export interface LessonProgress {
  id: string
  enrollmentId: string
  lessonId: string
  completed: boolean
  lastWatchedPosition: number
  completedAt?: string
  createdAt: string
}

export interface Assessment {
  id: string
  lessonId: string
  title: string
  description?: string
  passingScore: number
  timeLimitMinutes?: number
  maxAttempts?: number
  questions?: AssessmentQuestion[]
  createdAt: string
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'

export interface AssessmentQuestion {
  id: string
  assessmentId: string
  questionText: string
  questionType: QuestionType
  points: number
  orderIndex: number
  options?: QuestionOption[]
  createdAt: string
}

export interface QuestionOption {
  id: string
  questionId: string
  optionText: string
  isCorrect: boolean
  orderIndex: number
}

export interface AssessmentAttempt {
  id: string
  assessmentId: string
  studentId: string
  score?: number
  passed: boolean
  startedAt: string
  submittedAt?: string
  attemptNumber: number
  answers?: StudentAnswer[]
}

export interface StudentAnswer {
  id: string
  attemptId: string
  questionId: string
  selectedOptionId?: string
  answerText?: string
  isCorrect?: boolean
  pointsEarned: number
}

export interface Assignment {
  id: string
  lessonId: string
  title: string
  description: string
  dueDate?: string
  maxScore: number
  createdAt: string
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  submissionText?: string
  fileUrl?: string
  submittedAt: string
  score?: number
  feedback?: string
  gradedAt?: string
  gradedBy?: string
}

export type PaymentMethod = 'wave' | 'qmoney' | 'afrimoney' | 'bank_transfer' | 'cash'

export interface Payment {
  id: string
  enrollmentId: string
  studentId: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  paymentProvider: string
  transactionId?: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentDate: string
  metadata?: Record<string, any>
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  read: boolean
  link?: string
  createdAt: string
}
