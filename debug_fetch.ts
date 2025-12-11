
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const COURSE_ID = "cmigcfp7c000avrm24osvp8x9" // From screenshot

async function main() {
    console.log(`Attempting to fetch course: ${COURSE_ID}`)

    try {
        const course = await prisma.course.findUnique({
            where: { id: COURSE_ID },
            include: {
                modules: {
                    include: {
                        lessons: true
                    }
                },
                _count: {
                    select: { enrollments: true }
                }
            }
        })

        if (!course) {
            console.log("Course NOT FOUND in DB.")
        } else {
            console.log("Course FOUND!")
            console.log("Title:", course.title)
            console.log("Modules:", course.modules.length)
            console.log("Enrollments:", course._count.enrollments)
        }
    } catch (error) {
        console.error("FATAL DB ERROR:", error)
    }
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
