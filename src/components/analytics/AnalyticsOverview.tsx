"use client"

import * as React from "react"
import { ArrowDownRight, ArrowUpRight, DollarSign, ShoppingBag, Users, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRangePicker } from "@/components/common/DateRangePicker"

interface AnalyticsOverviewProps {
    dateRange: { from?: Date; to?: Date }
    onDateRangeChange: (range: { from?: Date; to?: Date }) => void
}

export function AnalyticsOverview({ dateRange, onDateRangeChange }: AnalyticsOverviewProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Analytics</h2>
                <div className="flex items-center space-x-2">
                    <DateRangePicker date={dateRange} onDateChange={onDateRangeChange} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground flex items-center pt-1">
                            <span className="text-green-500 flex items-center mr-1">
                                +20.1% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground flex items-center pt-1">
                            <span className="text-green-500 flex items-center mr-1">
                                +180.1% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground flex items-center pt-1">
                            <span className="text-red-500 flex items-center mr-1">
                                -4.5% <ArrowDownRight className="h-3 w-3 ml-0.5" />
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground pt-1">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for future charts components */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                            Revenue Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                            Recent Sales List Placeholder
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
