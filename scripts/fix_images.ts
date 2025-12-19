
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updates = [
    {
        old: '/ict-training.jpg',
        new: '/african-students-learning-coding-computer-lab.jpg'
    },
    {
        old: '/agri-processing.jpg',
        new: '/african-agriculture-food-processing-facility.jpg'
    },
    {
        old: '/smart-farming.jpg',
        new: '/african-agriculture-food-processing.jpg'
    },
    {
        old: '/sustainable-construction.jpg',
        new: '/construction-technical-trades.jpg'
    }
]

async function main() {
    console.log('Starting image path updates...')

    for (const update of updates) {
        const result = await prisma.course.updateMany({
            where: {
                image: update.old
            },
            data: {
                image: update.new
            }
        })
        console.log(`Updated ${result.count} courses from ${update.old} to ${update.new}`)
    }

    console.log('Image path updates complete.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
