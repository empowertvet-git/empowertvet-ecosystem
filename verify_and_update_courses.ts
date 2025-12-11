
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Checking courses...")
    const courses = await prisma.course.findMany()
    console.log(`Found ${courses.length} courses.`)

    if (courses.length === 0) {
        console.log("No courses found! Seeding likely failed or hasn't been run.")
    } else {
        courses.forEach(c => console.log(`- ${c.title} (Published: ${c.published})`))
    }

    // Update the solar course name
    console.log("\nUpdating 'Solar Energy Installation'...")
    const updateResult = await prisma.course.updateMany({
        where: {
            title: {
                contains: 'Solar Energy Installation'
            }
        },
        data: {
            title: 'Renewable Energy Solutions'
        }
    })
    console.log(`Updated ${updateResult.count} courses.`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
