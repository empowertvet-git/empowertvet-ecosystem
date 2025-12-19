import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // 1. Create Users
    const password = await hash('password123', 12)

    const student = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            email: 'student@example.com',
            name: 'Lamin Jallow',
            password,
            role: 'student',
            image: '/placeholder-user.jpg'
        },
    })

    const instructor = await prisma.user.upsert({
        where: { email: 'instructor@example.com' },
        update: {},
        create: {
            email: 'instructor@example.com',
            name: 'Fatou Ceesay',
            password,
            role: 'instructor',
            image: '/placeholder-user.jpg'
        },
    })

    const employer = await prisma.user.upsert({
        where: { email: 'employer@example.com' },
        update: {},
        create: {
            email: 'employer@example.com',
            name: 'Gambia Solar Solutions',
            password,
            role: 'employer',
            image: '/placeholder-user.jpg'
        },
    })

    const alumni = await prisma.user.upsert({
        where: { email: 'alumni@example.com' },
        update: {},
        create: {
            email: 'alumni@example.com',
            name: 'Isatou Touray',
            password,
            role: 'alumni',
            image: '/placeholder-user.jpg'
        },
    })

    const donor = await prisma.user.upsert({
        where: { email: 'donor@example.com' },
        update: {},
        create: {
            email: 'donor@example.com',
            name: 'John Smith',
            password,
            role: 'donor',
            image: '/placeholder-user.jpg'
        },
    })

    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'System Admin',
            password,
            role: 'admin',
            image: '/placeholder-user.jpg'
        },
    })

    // 2. Create Courses
    const solarCourse = await prisma.course.create({
        data: {
            title: 'Solar Energy Installation',
            description: 'Learn to design and install solar PV systems.',
            image: '/african-student-installing-solar-panels-gambia.jpg',
            price: 5000,
            category: 'Energy',
            published: true,
            modules: {
                create: [
                    { title: 'Introduction to Solar', lessons: { create: [{ title: 'What is Solar Energy?' }] } },
                    { title: 'System Design', lessons: { create: [{ title: 'Sizing Components' }] } }
                ]
            }
        }
    })

    const ictCourse = await prisma.course.create({
        data: {
            title: 'ICT & Digital Skills',
            description: 'Master computer literacy and digital tools.',
            image: '/african-students-learning-coding-computer-lab.jpg',
            price: 3000,
            category: 'Technology',
            published: true
        }
    })

    // New Courses for Gambia Context (Agri & Construction)
    const agriProcessingCourse = await prisma.course.create({
        data: {
            title: 'Cashew & Fruit Processing Masterclass',
            description: 'Learn modern preservation techniques for mangos, cashew, and other local produce. Focus on value addition and export quality standards.',
            image: '/african-agriculture-food-processing-facility.jpg',
            price: 4500,
            category: 'Agriculture',
            level: 'Intermediate',
            duration: '6 Weeks',
            published: true,
            modules: {
                create: [
                    { title: 'Food Safety Standards', lessons: { create: [{ title: 'HACCP Basics' }] } },
                    { title: 'Processing Techniques', lessons: { create: [{ title: 'Solar Drying' }, { title: 'Packaging' }] } }
                ]
            }
        }
    })

    const smartFarmingCourse = await prisma.course.create({
        data: {
            title: 'Smart Urban Farming & Hydroponics',
            description: 'Innovative farming techniques for urban spaces. Learn hydroponics, vertical farming, and water conservation.',
            image: '/african-agriculture-food-processing.jpg',
            price: 5500,
            category: 'Agriculture',
            level: 'Advanced',
            duration: '8 Weeks',
            published: true
        }
    })

    const constructionCourse = await prisma.course.create({
        data: {
            title: 'Sustainable Construction & Solar Trades',
            description: 'Comprehensive training in compressed earth blocks, welding, and integrating solar systems into buildings.',
            image: '/construction-technical-trades.jpg',
            price: 6000,
            category: 'Construction',
            level: 'Beginner to Intermediate',
            duration: '3 Months',
            published: true
        }
    })

    // 3. Enroll Student
    await prisma.enrollment.create({
        data: {
            userId: student.id,
            courseId: solarCourse.id,
            progress: 65,
            status: 'active'
        }
    })

    // 4. Create Classes & Assignments (Instructor)
    const solarClass = await prisma.class.create({
        data: {
            name: 'Solar Batch A - 2025',
            courseId: solarCourse.id,
            instructorId: instructor.id,
            room: 'Workshop A',
            schedule: 'Mon/Wed 10:00 AM'
        }
    })

    const assignment = await prisma.assignment.create({
        data: {
            title: 'System Design Project',
            classId: solarClass.id,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        }
    })

    await prisma.submission.create({
        data: {
            assignmentId: assignment.id,
            studentId: student.id,
            status: 'pending',
            submittedAt: new Date()
        }
    })

    // 5. Create Jobs (Employer)
    await prisma.job.create({
        data: {
            title: 'Solar Technician Intern',
            company: 'Gambia Solar Solutions',
            location: 'Banjul',
            type: 'Internship',
            description: 'Assist with solar installations.',
            postedById: employer.id
        }
    })

    // 6. Create Events (Alumni)
    await prisma.event.create({
        data: {
            title: 'Annual Alumni Networking Gala',
            date: new Date('2025-12-15'),
            location: 'Kairaba Beach Hotel',
            attendees: 120
        }
    })

    // 7. Create Donations (Donor)
    await prisma.donation.create({
        data: {
            amount: 500,
            cause: 'Scholarship Fund',
            donorId: donor.id,
            status: 'completed'
        }
    })

    // 8. Create Products (Marketplace)
    await prisma.product.create({
        data: {
            title: 'Handcrafted Wooden Desk',
            description: 'Solid wood desk made by construction students.',
            price: 4500,
            category: 'Furniture',
            sellerId: student.id,
            image: '/placeholder.svg?key=desk',
            rating: 4.8
        }
    })

    console.log('Seed data created successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
