import { getLandingStats } from '@/lib/actions/stats'
import { BookOpen, Users, Award, TrendingUp, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export async function StatsSection() {
    const statsData = await getLandingStats()

    const stats = [
        { icon: Users, label: 'Students Trained', value: `${statsData.studentsTrained.toLocaleString()}+` },
        { icon: Award, label: 'Active Programs', value: `${statsData.activePrograms}+` },
        { icon: TrendingUp, label: 'Employment Rate', value: `${statsData.employmentRate}%` },
        { icon: BookOpen, label: 'Graduate Startups', value: `${statsData.graduateStartups}+` }
    ]

    return (
        <section className="border-b bg-muted/30 py-16">
            <div className="container mx-auto px-4">
                <TooltipProvider>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <div key={index} className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
                                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="size-8 text-primary" />
                                    </div>
                                    <div className="text-4xl font-bold text-primary flex items-start gap-1">
                                        {stat.value}
                                        {stat.label === 'Employment Rate' && !statsData.hasEnoughData?.employment && (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="size-3 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Less than 10 graduates in current cohort</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                                        {stat.label}
                                        {stat.label === 'Students Trained' && (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="size-3 text-muted-foreground/50 hover:text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Includes enrolled students and alumni</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </TooltipProvider>
            </div>
        </section>
    )
}
