"use server"

import { db } from "@/lib/db"

const THRESHOLD = 10
export async function getLandingStats() {
  try {
    // 1. Students Trained: Count students + alumni
    const studentsCount = await db.user.count({
      where: {
        role: {
          in: ["student", "alumni"],
        },
      },
    })

    // 2. Active Programs: Count published courses
    const activeProgramsCount = await db.course.count({
      where: {
        published: true,
      },
    })

    // 3. Employment Rate: (Accepted Applications / Total Applications) * 100
    const totalApplications = await db.application.count()
    const acceptedApplications = await db.application.count({
      where: {
        status: "accepted",
      },
    })

    const employmentRate =
      totalApplications >= THRESHOLD
        ? Math.round((acceptedApplications / totalApplications) * 100)
        : 0

    // 4. Graduate Startups
    const uniqueSellers = await db.product.findMany({
      distinct: ["sellerId"],
      select: {
        sellerId: true,
      },
    })
    const graduateStartupsCount = uniqueSellers.length

    // 5. Total Revenue
    const products = await db.product.findMany({
      select: {
        price: true,
      },
    })
    const totalRevenue = products.reduce((acc, curr) => acc + curr.price, 0)

    // 6. Women Participants
    const womenParticipants = 0

    // 7. Donors
    const donorsCount = await db.user.count({
      where: {
        role: "donor",
      },
    })

    // 8. Scholarships
    const scholarshipsCount = await db.enrollment.count()

    // 9. Communities
    const jobLocations = await db.job.findMany({
      distinct: ['location'],
      select: { location: true }
    })
    const communitiesCount = jobLocations.length

    // 10. Program Funding
    const donations = await db.donation.findMany()

    let scholarshipFunded = 0
    let womenFunded = 0
    let outreachFunded = 0

    donations.forEach(d => {
      const cause = (d.cause || '').toLowerCase()
      if (cause.includes('scholarship') || cause.includes('tuition')) {
        scholarshipFunded += d.amount
      } else if (cause.includes('women') || cause.includes('girl')) {
        womenFunded += d.amount
      } else if (cause.includes('rural') || cause.includes('outreach')) {
        outreachFunded += d.amount
      }
    })

    return {
      studentsTrained: studentsCount,
      activePrograms: activeProgramsCount,
      employmentRate: employmentRate,
      graduateStartups: graduateStartupsCount,
      totalRevenue: totalRevenue,
      womenParticipants: womenParticipants,
      donorsCount: donorsCount,
      scholarshipsCount: scholarshipsCount,
      communitiesCount: communitiesCount,
      programFunding: {
        scholarships: scholarshipFunded,
        women: womenFunded,
        outreach: outreachFunded
      },
      hasEnoughData: {
        employment: totalApplications >= THRESHOLD,
        startups: graduateStartupsCount >= THRESHOLD,
        donors: donorsCount >= THRESHOLD,
        students: studentsCount >= THRESHOLD
      }
    }
  } catch (error) {
    console.error("Error fetching landing stats:", error)
    return {
      studentsTrained: 0,
      activePrograms: 0,
      employmentRate: 0,
      graduateStartups: 0,
      totalRevenue: 0,
      womenParticipants: 0,
      donorsCount: 0,
      scholarshipsCount: 0,
      communitiesCount: 0,
      programFunding: {
        scholarships: 0,
        women: 0,
        outreach: 0
      },
      hasEnoughData: {
        employment: false,
        startups: false,
        donors: false,
        students: false
      }
    }
  }
}
