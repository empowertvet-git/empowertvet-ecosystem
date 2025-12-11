'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, CreditCard, Smartphone, Building2, Banknote } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function EnrollmentPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'qmoney' | 'afrimoney' | 'bank'>('wave')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const course = {
    title: 'Solar Energy Installation',
    price: 15000,
    currency: 'GMD',
    duration: '6 months'
  }

  const paymentMethods = [
    { id: 'wave', name: 'Wave', icon: Smartphone, description: 'Pay with Wave mobile money' },
    { id: 'qmoney', name: 'QMoney', icon: Smartphone, description: 'Pay with QMoney' },
    { id: 'afrimoney', name: 'Afrimoney', icon: Smartphone, description: 'Pay with Afrimoney' },
    { id: 'bank', name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer' }
  ]

  const handleEnrollment = async () => {
    if (!phoneNumber && paymentMethod !== 'bank') {
      toast({
        variant: 'destructive',
        title: 'Phone number required',
        description: 'Please enter your phone number for mobile money payment.',
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: 'Enrollment successful!',
        description: 'Welcome to the course. Redirecting to your dashboard...',
      })

      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Payment failed',
        description: 'There was an error processing your payment. Please try again.',
      })
    } finally {
      setIsProcessing(false)
    }
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
          </Link>
          <Link href={`/lms/courses/${params.id}`}>
            <Button variant="ghost">Cancel</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex size-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {step > 1 ? <CheckCircle2 className="size-5" /> : '1'}
              </div>
              <span className="hidden sm:inline">Review</span>
            </div>
            <Separator className="w-12" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex size-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Enrollment</CardTitle>
                    <CardDescription>
                      Confirm your course details before proceeding to payment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="mb-3 font-semibold">Course Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Course Name</span>
                          <span className="font-medium">{course.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-medium">{course.currency} {course.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <CheckCircle2 className="size-4" />
                      <AlertDescription>
                        This is a one-time payment for lifetime access to the course, including all future updates and materials.
                      </AlertDescription>
                    </Alert>

                    <Button onClick={() => setStep(2)} className="w-full" size="lg">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Choose your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                      <div className="grid gap-4">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon
                          return (
                            <Label
                              key={method.id}
                              htmlFor={method.id}
                              className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border'
                                }`}
                            >
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Icon className="size-6" />
                              <div className="flex-1">
                                <p className="font-semibold">{method.name}</p>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                            </Label>
                          )
                        })}
                      </div>
                    </RadioGroup>

                    {paymentMethod !== 'bank' && (
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+220 XXX XXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the phone number linked to your {paymentMethods.find(m => m.id === paymentMethod)?.name} account
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <Alert>
                        <Building2 className="size-4" />
                        <AlertDescription>
                          Bank transfer details will be provided after you confirm. Please allow 1-2 business days for verification.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3">
                      <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handleEnrollment} disabled={isProcessing} className="flex-1">
                        {isProcessing ? 'Processing...' : 'Complete Enrollment'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Price</span>
                      <span>{course.currency} {course.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span>Free</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{course.currency} {course.price.toLocaleString()}</span>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold">What's included:</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3" />
                        Lifetime course access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3" />
                        Certification upon completion
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3" />
                        Business incubation support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3" />
                        Access to seed funding
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
