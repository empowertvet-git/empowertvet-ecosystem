import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
    console.log('Testing SMTP connection using environment variables...')

    console.log('Environment variables found in process.env:')
    const keys = Object.keys(process.env).sort()
    keys.forEach(key => {
        // Only log keys that might be relevant or user-defined to avoid cluttering with system envs
        if (key === 'SMTP_PASS' || key === 'SMTP_HOST' || key === 'SMTP_USER' || key === 'SMTP_PORT' || key === 'SMTP_SECURE' || key === 'DATABASE_URL' || key === 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') {
            console.log(`- ${key}: ${process.env[key] ? 'PRESENT (length: ' + process.env[key]?.length + ')' : 'EMPTY'}`)
        }
    })

    // Log the first 10 keys that don't look like standard Windows keys
    console.log('First few non-standard keys:')
    keys.filter(k => k !== k.toUpperCase() || k.length < 5).slice(0, 20).forEach(k => console.log(`- ${k}`))

    const host = process.env.SMTP_HOST || "mail.gandi.net"
    const port = 587
    const secure = false
    const user = process.env.SMTP_USER || "info@empowertvet.com"
    const pass = process.env.SMTP_PASS

    console.log(`Configuration: host=${host}, port=${port}, secure=${secure}, user=${user}`)
    if (!pass) {
        console.error('ERROR: SMTP_PASS is not set in environment variables!')
        return
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    try {
        console.log('Verifying transporter...')
        await transporter.verify()
        console.log('Transporter is ready to take our messages')

        console.log('Sending test email...')
        const info = await transporter.sendMail({
            from: '"SMTP Test" <info@empowertvet.com>',
            to: "info@empowertvet.com",
            subject: "SMTP Test Execution",
            text: "This is a test email to verify SMTP configuration.",
            html: "<b>This is a test email to verify SMTP configuration.</b>",
        })

        console.log('Message sent: %s', info.messageId)
    } catch (error) {
        console.error('SMTP Error:', error)
    }
}

main().catch(console.error)
