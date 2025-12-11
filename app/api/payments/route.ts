import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, paymentMethod, phoneNumber, studentId, courseId, enrollmentId } = body

    // Validate required fields
    if (!amount || !paymentMethod || !studentId || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Process payment based on method
    let result
    switch (paymentMethod) {
      case 'wave':
        result = await PaymentService.initiateWavePayment({
          amount,
          currency: currency || 'GMD',
          paymentMethod,
          phoneNumber,
          studentId,
          courseId,
          enrollmentId
        })
        break
      case 'qmoney':
        result = await PaymentService.initiateQMoneyPayment({
          amount,
          currency: currency || 'GMD',
          paymentMethod,
          phoneNumber,
          studentId,
          courseId,
          enrollmentId
        })
        break
      case 'afrimoney':
        result = await PaymentService.initiateAfrimoneyPayment({
          amount,
          currency: currency || 'GMD',
          paymentMethod,
          phoneNumber,
          studentId,
          courseId,
          enrollmentId
        })
        break
      case 'bank_transfer':
        result = await PaymentService.initiateBankTransfer({
          amount,
          currency: currency || 'GMD',
          paymentMethod,
          studentId,
          courseId,
          enrollmentId
        })
        break
      default:
        return NextResponse.json(
          { error: 'Invalid payment method' },
          { status: 400 }
        )
    }

    // TODO: Save payment record to database
    // await db.payments.create({ ... })

    return NextResponse.json(result)
  } catch (error) {
    console.error('[v0] Payment error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('transactionId')

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID required' },
        { status: 400 }
      )
    }

    const isVerified = await PaymentService.verifyPayment(transactionId)

    return NextResponse.json({ verified: isVerified })
  } catch (error) {
    console.error('[v0] Payment verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}
