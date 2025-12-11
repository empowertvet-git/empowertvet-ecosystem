'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AssignmentInterfaceProps {
  assignment: {
    id: string
    title: string
    description: string
    dueDate?: string
    maxScore: number
    instructions: string
  }
  onSubmit: (text: string, file?: File) => void
  previousSubmission?: {
    submissionText?: string
    fileUrl?: string
    submittedAt: string
    score?: number
    feedback?: string
  }
}

export function AssignmentInterface({ assignment, onSubmit, previousSubmission }: AssignmentInterfaceProps) {
  const [submissionText, setSubmissionText] = useState(previousSubmission?.submissionText || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please select a file smaller than 10MB',
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!submissionText.trim() && !selectedFile) {
      toast({
        variant: 'destructive',
        title: 'Missing submission',
        description: 'Please provide either text or upload a file',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(submissionText, selectedFile || undefined)
      toast({
        title: 'Assignment submitted!',
        description: 'Your assignment has been submitted successfully',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission failed',
        description: 'There was an error submitting your assignment',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDaysUntilDue = () => {
    if (!assignment.dueDate) return null
    const dueDate = new Date(assignment.dueDate)
    const now = new Date()
    const diff = dueDate.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  const daysUntilDue = getDaysUntilDue()
  const isOverdue = daysUntilDue !== null && daysUntilDue < 0

  return (
    <div className="space-y-6">
      {/* Assignment Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="mb-2">{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </div>
            {assignment.dueDate && (
              <Badge variant={isOverdue ? 'destructive' : 'outline'} className="gap-1">
                <Clock className="size-4" />
                {isOverdue 
                  ? `${Math.abs(daysUntilDue!)} days overdue` 
                  : `${daysUntilDue} days left`
                }
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Instructions</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {assignment.instructions}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Max Score: </span>
                <span className="font-medium">{assignment.maxScore} points</span>
              </div>
              {assignment.dueDate && (
                <div>
                  <span className="text-muted-foreground">Due: </span>
                  <span className="font-medium">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Submission */}
      {previousSubmission && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              Previous Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Submitted: </span>
              <span className="text-sm font-medium">
                {new Date(previousSubmission.submittedAt).toLocaleString()}
              </span>
            </div>

            {previousSubmission.score !== undefined && (
              <div>
                <span className="text-sm text-muted-foreground">Score: </span>
                <span className="text-lg font-bold">
                  {previousSubmission.score} / {assignment.maxScore}
                </span>
              </div>
            )}

            {previousSubmission.feedback && (
              <Alert>
                <AlertDescription>
                  <strong>Instructor Feedback:</strong>
                  <p className="mt-2">{previousSubmission.feedback}</p>
                </AlertDescription>
              </Alert>
            )}

            {previousSubmission.submissionText && (
              <div>
                <h4 className="mb-2 text-sm font-semibold">Your Submission:</h4>
                <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                  {previousSubmission.submissionText}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {previousSubmission ? 'Resubmit Assignment' : 'Submit Assignment'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="submission">Your Answer</Label>
            <Textarea
              id="submission"
              placeholder="Type your answer here..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              rows={10}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              {submissionText.length} characters
            </p>
          </div>

          <div className="space-y-2">
            <Label>Upload File (Optional)</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                type="button"
              >
                <Upload className="mr-2 size-4" />
                Choose File
              </Button>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="size-4 text-primary" />
                  <span>{selectedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <p className="text-sm text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
            </p>
          </div>

          {isOverdue && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>
                This assignment is overdue. Late submissions may receive reduced scores.
              </AlertDescription>
            </Alert>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting || (!submissionText.trim() && !selectedFile)}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
