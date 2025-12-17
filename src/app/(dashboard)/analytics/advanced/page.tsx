"use client"

import { RealTimeChart } from "@/components/analytics/RealTimeChart"
import { FunnelChart } from "@/components/analytics/FunnelChart"
import { HeatmapChart } from "@/components/analytics/HeatmapChart"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdvancedAnalyticsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center gap-4">
                <Link href="/analytics">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Advanced Analytics</h2>
                    <p className="text-muted-foreground">Deep dive into real-time metrics and user behavior.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <RealTimeChart />
                </div>
                <div className="col-span-3">
                    <FunnelChart />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <HeatmapChart />
            </div>
        </div>
    )
}
