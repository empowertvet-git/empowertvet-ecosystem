'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { GraduationCap, CreditCard, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/hooks/use-toast'
import type { PaymentMethod } from '@/lib/types'

export default function EnrollPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wave')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const course = {
    id: params.id,
    title: 'Solar Energy Installation',
    price: 5000,
    duration: '6 months'
  }

  const paymentMethods = [
    { 
      id: 'wave', 
      name: 'Wave', 
      icon: Smartphone, 
      description: 'Pay with Wave mobile money',
      instructions: 'Enter your Wave phone number to receive a payment prompt'
    },
    { 
      id: 'qmoney', 
      name: 'QMoney', 
      icon: Smartphone, 
      description: 'Pay with QMoney',
      instructions: 'Enter your QMoney phone number to receive a payment prompt'
    },
    { 
      id: 'afrimoney', 
      name: 'Afrimoney', 
      icon: Smartphone, 
      description: 'Pay with Afrimoney',
      instructions: 'Enter your Afrimoney phone number to receive a payment prompt'
    },
    { 
      id: 'bank_transfer', 
      name: 'Bank Transfer', 
      icon: CreditCard, 
      description: 'Direct bank transfer',
      instructions: 'You will receive bank details via email'
    }
  ]

  const selectedPaymentInfo = paymentMethods.find(m => m.id === paymentMethod)
  const requiresPhoneNumber = ['wave', 'qmoney', 'afrimoney'].includes(paymentMethod)

  const handleEnrollment = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please log in',
        description: 'You need to be logged in to enroll in a course.',
      })
      router.push(`/login?redirect=/enroll/${params.id}`)
      return
    }

    if (requiresPhoneNumber && !phoneNumber) {
      toast({
        variant: 'destructive',
        title: 'Phone number required',
        description: 'Please enter your phone number to proceed.',
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: course.price,
          currency: 'GMD',
          paymentMethod,
          phoneNumber: requiresPhoneNumber ? phoneNumber : undefined,
          studentId: user.id,
          courseId: course.id,
          enrollmentId: `ENR-${Date.now()}`
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Payment failed')
      }

      setPaymentSuccess(true)
      
      toast({
        title: 'Payment successful!',
        description: `Transaction ID: ${result.transactionId}`,
      })

      // Wait a moment to show success message
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('[v0] Payment error:', error)
      toast({
        variant: 'destructive',
        title: 'Payment failed',
        description: error instanceof Error ? error.message : 'There was an error processing your payment. Please try again.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-4 flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="size-10 text-green-600" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
            <p className="mb-6 text-muted-foreground">
              You have been enrolled in {course.title}. Redirecting to your dashboard...
            </p>
            <div className="mx-auto size-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="size-8 text-primary" />
            <span className="text-xl font-bold">EmpowerTVET</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold">Complete Your Enrollment</h1>
              <p className="text-muted-foreground">Choose your payment method to get started</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              {/* Payment Method Selection */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Payment Method</CardTitle>
                    <CardDescription>
                      Choose how you'd like to pay for your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon
                          return (
                            <div
                              key={method.id}
                              className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Label
                                htmlFor={method.id}
                                className="flex flex-1 cursor-pointer items-center gap-3"
                              >
                                <Icon className="size-5 text-primary" />
                                <div className="flex-1">
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {method.description}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {selectedPaymentInfo && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertCircle className="size-4" />
                        <AlertDescription>
                          {selectedPaymentInfo.instructions}
                        </AlertDescription>
                      </Alert>

                      {requiresPhoneNumber && (
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="+220 XXX XXXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                          <p className="text-sm text-muted-foreground">
                            You will receive a payment prompt on this number
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'bank_transfer' && (
                        <Alert>
                          <AlertDescription>
                            After confirming, you will receive bank transfer details via email. 
                            Your enrollment will be activated once payment is confirmed.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Full access to all course materials',
                        'Pre-recorded video lessons',
                        'Hands-on projects and assignments',
                        'Quizzes and assessments',
                        'Certificate upon completion',
                        'Lifetime access to course content',
                        'Instructor support'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="h-fit lg:sticky lg:top-20">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-1 font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.duration} program</div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Course price</span>
                        <span>GMD {course.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Processing fee</span>
                        <span>GMD 0</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold">GMD {course.price.toLocaleString()}</span>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleEnrollment}
                      disabled={isProcessing || (requiresPhoneNumber && !phoneNumber)}
                    >
                      {isProcessing ? 'Processing Payment...' : 'Complete Enrollment'}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By enrolling, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
