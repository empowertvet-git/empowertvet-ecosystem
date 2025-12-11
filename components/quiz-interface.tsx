'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Clock, Award } from 'lucide-react'

interface QuizQuestion {
  id: string
  questionText: string
  options: { id: string; text: string; isCorrect: boolean }[]
  explanation?: string
}

interface QuizInterfaceProps {
  quiz: {
    id: string
    title: string
    description: string
    passingScore: number
    timeLimit?: number
    questions: QuizQuestion[]
  }
  onComplete: (score: number, passed: boolean) => void
}

export function QuizInterface({ quiz, onComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId })
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0
    quiz.questions.forEach((question) => {
      const selectedAnswer = answers[question.id]
      const correctOption = question.options.find(o => o.isCorrect)
      if (selectedAnswer === correctOption?.id) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / quiz.questions.length) * 100
    const passed = score >= quiz.passingScore
    setShowResults(true)
    onComplete(score, passed)
  }

  const getResults = () => {
    let correctAnswers = 0
    quiz.questions.forEach((question) => {
      const selectedAnswer = answers[question.id]
      const correctOption = question.options.find(o => o.isCorrect)
      if (selectedAnswer === correctOption?.id) {
        correctAnswers++
      }
    })
    return {
      correct: correctAnswers,
      total: quiz.questions.length,
      score: (correctAnswers / quiz.questions.length) * 100
    }
  }

  if (showResults) {
    const results = getResults()
    const passed = results.score >= quiz.passingScore

    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className={`flex size-20 items-center justify-center rounded-full ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <Award className="size-12 text-green-600" />
              ) : (
                <XCircle className="size-12 text-red-600" />
              )}
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold">
            {passed ? 'Congratulations!' : 'Keep Practicing'}
          </h2>
          <p className="mb-6 text-muted-foreground">
            {passed 
              ? 'You have passed the assessment!' 
              : `You need ${quiz.passingScore}% to pass. Try again to improve your score.`
            }
          </p>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">{results.score.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Your Score</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">{results.correct}/{results.total}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">{quiz.passingScore}%</div>
              <div className="text-sm text-muted-foreground">Passing Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Answer Review</h3>
            {quiz.questions.map((question, index) => {
              const selectedAnswer = answers[question.id]
              const correctOption = question.options.find(o => o.isCorrect)
              const selectedOption = question.options.find(o => o.id === selectedAnswer)
              const isCorrect = selectedAnswer === correctOption?.id

              return (
                <div key={question.id} className="rounded-lg border p-4 text-left">
                  <div className="mb-2 flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="mt-1 size-5 shrink-0 text-red-600" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">Question {index + 1}</div>
                      <div className="text-sm">{question.questionText}</div>
                    </div>
                  </div>
                  <div className="ml-7 space-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">Your answer: </span>
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {selectedOption?.text || 'Not answered'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="text-muted-foreground">Correct answer: </span>
                        <span className="text-green-600">{correctOption?.text}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {!passed && (
            <Button className="mt-6" onClick={() => window.location.reload()}>
              Retake Assessment
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{quiz.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
            </div>
            {timeRemaining !== null && (
              <Badge variant="outline" className="gap-1">
                <Clock className="size-4" />
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span className="font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold">{currentQuestion.questionText}</h3>

          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {Object.keys(answers).length} of {quiz.questions.length} answered
        </div>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== quiz.questions.length}
          >
            Submit Assessment
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next Question
          </Button>
        )}
      </div>
    </div>
  )
}
