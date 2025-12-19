
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json()

        console.log('Received contact form submission:', { name, email, subject })

        // Create a transporter using environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "mail.gandi.net",
            port: parseInt(process.env.SMTP_PORT || "465"),
            secure: process.env.SMTP_SECURE !== "false", // Default to true
            auth: {
                user: process.env.SMTP_USER || "info@empowertvet.com",
                pass: process.env.SMTP_PASS,
            },
        })

        if (!process.env.SMTP_PASS) {
            console.error('SMTP_PASS is not set in environment variables')
        }

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
