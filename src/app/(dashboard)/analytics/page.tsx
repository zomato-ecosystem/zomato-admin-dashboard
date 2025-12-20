"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

const AnalyticsOverview = dynamic(() => import("@/components/analytics/AnalyticsOverview").then(mod => mod.AnalyticsOverview), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
})
const RevenueAnalytics = dynamic(() => import("@/components/analytics/RevenueAnalytics").then(mod => mod.RevenueAnalytics), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
})
const UserInsights = dynamic(() => import("@/components/analytics/UserInsights").then(mod => mod.UserInsights), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
})
const PerformanceMetrics = dynamic(() => import("@/components/analytics/PerformanceMetrics").then(mod => mod.PerformanceMetrics), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
})
const ReportsBuilder = dynamic(() => import("@/components/analytics/ReportsBuilder").then(mod => mod.ReportsBuilder), {
    loading: () => <Skeleton className="h-[200px] w-full" />,
})
const ScheduledReports = dynamic(() => import("@/components/analytics/ScheduledReports").then(mod => mod.ScheduledReports), {
    loading: () => <Skeleton className="h-[200px] w-full" />,
})

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
    })

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="users">User Insights</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <AnalyticsOverview
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                    />
                </TabsContent>
                <TabsContent value="revenue" className="space-y-4">
                    <RevenueAnalytics />
                </TabsContent>
                <TabsContent value="users" className="space-y-4">
                    <UserInsights />
                </TabsContent>
                <TabsContent value="performance" className="space-y-4">
                    <PerformanceMetrics />
                </TabsContent>
                <TabsContent value="reports" className="space-y-4">
                    <div className="grid gap-4">
                        <ReportsBuilder />
                        <ScheduledReports />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
