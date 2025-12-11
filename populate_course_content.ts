
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CONTENT_TEMPLATES: Record<string, { modules: string[], lessons: string[] }> = {
    "solar": {
        modules: [
            "Introduction to Photovoltaics",
            "System Components & Sizing",
            "Installation Safety & Practices",
            "Off-Grid vs Grid-Tied Systems",
            "Maintenance & Troubleshooting"
        ],
        lessons: [
            "Understanding Solar Radiation",
            "PV Cell Technology",
            "Calculations and Sizing",
            "Wiring and Connections",
            "Battery Storage Solutions"
        ]
    },
    "farming": {
        modules: [
            "Modern Agricultural Practices",
            "Soil Health & Management",
            "Crop Selection & Rotation",
            "Irrigation Systems",
            "Harvest & Post-Harvest Handling"
        ],
        lessons: [
            "Soil Testing Methods",
            "Organic Fertilizers",
            "Pest Management",
            "Water Conservation",
            "Market Access Strategies"
        ]
    },
    "construction": {
        modules: [
            "Construction Safety Fundamentals",
            "Blueprint Reading & Site Layout",
            "Materials & Methods",
            "Sustainable Building Practices",
            "Project Management Basics"
        ],
        lessons: [
            "Site Safety Protocols",
            "Tool Handling",
            "Bricklaying Basics",
            "Concrete Mixing",
            "Green Building Standards"
        ]
    },
    "ict": {
        modules: [
            "Digital Literacy Fundamentals",
            "Office Productivity Tools",
            "Internet Safety & Security",
            "Introduction to Coding",
            "Digital Marketing Basics"
        ],
        lessons: [
            "Computer Hardware Basics",
            "Word Processing Mastery",
            "Spreadsheet Essentials",
            "Online Collaboration",
            "Cybersecurity Best Practices"
        ]
    },
    "processing": {
        modules: [
            "Food Safety & Hygiene",
            "Processing Equipment Operation",
            "Preservation Techniques",
            "Packaging & Labeling",
            "Quality Control Standards"
        ],
        lessons: [
            "HACCP Principles",
            "Drying and Dehydration",
            "Fermentation Basics",
            "Product Branding",
            "Export Standards"
        ]
    },
    "default": {
        modules: [
            "Course Introduction",
            "Core Concepts",
            "Advanced Techniques",
            "Practical Applications",
            "Final Assessment"
        ],
        lessons: [
            "Getting Started",
            "Key Principles",
            "Case Studies",
            "Hands-on Project",
            "Review Quiz"
        ]
    }
}

function getTemplate(title: string) {
    const t = title.toLowerCase()
    if (t.includes('solar') || t.includes('renewable') || t.includes('energy')) return CONTENT_TEMPLATES.solar
    if (t.includes('farming') || t.includes('agriculture')) return CONTENT_TEMPLATES.farming
    if (t.includes('construction') || t.includes('trades')) return CONTENT_TEMPLATES.construction
    if (t.includes('ict') || t.includes('digital') || t.includes('web')) return CONTENT_TEMPLATES.ict
    if (t.includes('processing') || t.includes('fruit') || t.includes('cashew')) return CONTENT_TEMPLATES.processing
    return CONTENT_TEMPLATES.default
}

async function main() {
    console.log("Checking for courses needing content...")

    // Fetch courses including modules to check if they are empty
    const courses = await prisma.course.findMany({
        include: { modules: true }
    })

    console.log(`Found ${courses.length} courses.`)

    for (const course of courses) {
        if (course.modules.length > 0) {
            console.log(`- [SKIP] ${course.title} already has ${course.modules.length} modules.`)
            continue
        }

        console.log(`+ [POPULATING] ${course.title}...`)
        const template = getTemplate(course.title)

        // Create Modules
        for (const moduleTitle of template.modules) {
            const createdModule = await prisma.module.create({
                data: {
                    title: moduleTitle,
                    courseId: course.id
                }
            })

            // Create Lessons for each module (random selection or sequential)
            const numLessons = 3 + Math.floor(Math.random() * 2) // 3-4 lessons
            for (let i = 0; i < numLessons; i++) {
                const lessonTitle = template.lessons[i % template.lessons.length] + (i >= template.lessons.length ? ` ${i + 1}` : '')
                await prisma.lesson.create({
                    data: {
                        title: lessonTitle,
                        moduleId: createdModule.id,
                        content: "This is a placeholder content for the lesson. In a real application, this would contain video transcripts, reading materials, or assignment details."
                    }
                })
            }
        }
    }
    console.log("Dones population.")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
