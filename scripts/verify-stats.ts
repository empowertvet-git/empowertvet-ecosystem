
import { getLandingStats } from '../lib/actions/stats'

async function verify() {
    console.log('Verifying Stats Logic...')
    const stats = await getLandingStats()
    console.log('Stats fetched:', stats)

    if (typeof stats.studentsTrained !== 'number') throw new Error('Invalid studentsTrained')
    if (typeof stats.activePrograms !== 'number') throw new Error('Invalid activePrograms')
    if (typeof stats.employmentRate !== 'number') throw new Error('Invalid employmentRate')
    if (typeof stats.graduateStartups !== 'number') throw new Error('Invalid graduateStartups')

    console.log('Verification Success!')
}

verify().catch(console.error)
