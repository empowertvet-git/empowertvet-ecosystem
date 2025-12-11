
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Starting cleanup...")

    // 1. Rename Construction Course
    console.log("Renaming Construction course...")
    await prisma.course.updateMany({
        where: {
            title: {
                contains: 'Sustainable Construction'
            }
        },
        data: {
            title: 'Construction & Technical Trades'
        }
    })

    // 2. Fetch all courses to identify duplicates
    const allCourses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            enrollments: true,
            modules: true,
            classes: true
        }
    })

    console.log(`Found ${allCourses.length} total courses.`)

    const seenTitles = new Set()
    const duplicates = []

    for (const course of allCourses) {
        if (seenTitles.has(course.title)) {
            duplicates.push(course)
        } else {
            seenTitles.add(course.title)
        }
    }

    console.log(`Found ${duplicates.length} duplicates to remove.`)

    // 3. Delete duplicates (cascade delete relations first if manually needed, but strict delete might work if relations allow or we delete them)
    for (const dup of duplicates) {
        console.log(`Deleting duplicate: ${dup.title} (${dup.id})`)

        // Delete related data first to avoid constraint errors
        await prisma.enrollment.deleteMany({ where: { courseId: dup.id } })
        // Need to delete lessons before modules
        const modules = await prisma.module.findMany({ where: { courseId: dup.id } })
        for (const mod of modules) {
            await prisma.lesson.deleteMany({ where: { moduleId: mod.id } })
        }
        await prisma.module.deleteMany({ where: { courseId: dup.id } })
        // Delete Classes hierarchy (Submissions -> Assignments -> Classes)
        const classes = await prisma.class.findMany({ where: { courseId: dup.id } })
        for (const cls of classes) {
            const assignments = await prisma.assignment.findMany({ where: { classId: cls.id } })
            for (const ass of assignments) {
                await prisma.submission.deleteMany({ where: { assignmentId: ass.id } })
                await prisma.assignment.delete({ where: { id: ass.id } })
            }
            await prisma.class.delete({ where: { id: cls.id } })
        }

        // finally delete course
        await prisma.course.delete({ where: { id: dup.id } })
    }

    console.log("Cleanup complete.")

    // Log final state
    const finalCourses = await prisma.course.findMany()
    console.log("Final Course List:")
    finalCourses.forEach(c => console.log(`- ${c.title}`))
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
