import { getLandingStats } from '@/lib/actions/stats'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

export async function UniqueModelStats() {
    const statsData = await getLandingStats()

    // Format revenue: e.g. 2500000 -> $2.5M
    const formatRevenue = (amount: number) => {
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`
        }
        if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(1)}K`
        }
        return `$${amount}`
    }

    const { hasEnoughData } = statsData

    return (
        <TooltipProvider>
            <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-primary text-primary-foreground border-0 hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-5xl font-bold">
                                {hasEnoughData?.employment ? `${statsData.employmentRate}%` : <span className="text-3xl">N/A</span>}
                            </h3>
                            {!hasEnoughData?.employment && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="size-5 opacity-70 hover:opacity-100" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Data collection in progress (Sample size &lt; 10)</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-base opacity-90">Graduate employment rate within 12 months</p>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="size-4 opacity-50 hover:opacity-100" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Percentage of graduates employed or self-employed within one year of completion</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground border-0 hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-5xl font-bold">{statsData.graduateStartups}+</h3>
                            {!hasEnoughData?.startups && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="size-5 opacity-70 hover:opacity-100" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Preliminary data</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <p className="text-base">Startups launched by our graduates</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground border-0 hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-8">
                        <h3 className="mb-3 text-5xl font-bold">NA</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-base opacity-90">Total revenue by graduate businesses</p>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="size-4 opacity-50 hover:opacity-100" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Aggregate revenue reported by alumni businesses on our marketplace</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-primary hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-8">
                        <h3 className="mb-3 text-5xl font-bold text-primary">{statsData.womenParticipants}%</h3>
                        <p className="text-base text-muted-foreground">Women participants in programs</p>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    )
}
