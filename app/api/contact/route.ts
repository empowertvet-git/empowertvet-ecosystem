
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json()

        console.log('Received contact form submission:', { name, email, subject })

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: "mail.gandi.net",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "info@empowertvet.com",
                pass: "EmpowerTVET@11117",
            },
        })

        // Send the email
        await transporter.sendMail({
            from: '"EmpowerTVET Contact" <info@empowertvet.com>',
            to: "info@empowertvet.com",
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        })

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to send email' },
            { status: 500 }
        )
    }
}
