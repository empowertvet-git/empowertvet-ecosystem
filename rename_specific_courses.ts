
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Renaming courses...")

    // 1. Rename Smart Urban Farming
    const farmingUpdate = await prisma.course.updateMany({
        where: {
            title: {
                contains: 'Smart Urban Farming'
            }
        },
        data: {
            title: 'Smart Farming & Hydroponics'
        }
    })
    console.log(`Updated ${farmingUpdate.count} farming courses.`)

    // 2. Rename Cashew Processing
    const processingUpdate = await prisma.course.updateMany({
        where: {
            title: {
                contains: 'Cashew & Fruit Processing'
            }
        },
        data: {
            title: 'Agri & Fruit Processing'
        }
    })
    console.log(`Updated ${processingUpdate.count} processing courses.`)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
