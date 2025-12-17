"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, Clock, Bike, Star, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const topRestaurants = [
    { name: "Burger King", orders: 1250, rating: 4.5, revenue: "$15,230" },
    { name: "KFC", orders: 1100, rating: 4.2, revenue: "$12,450" },
    { name: "Pizza Hut", orders: 980, rating: 4.1, revenue: "$10,120" },
    { name: "Domino's", orders: 850, rating: 4.3, revenue: "$9,540" },
    { name: "Subway", orders: 720, rating: 4.0, revenue: "$7,230" },
]

const deliveryPerformance = [
    { range: "0-30 min", percentage: 65, color: "bg-green-500" },
    { range: "30-45 min", percentage: 25, color: "bg-yellow-500" },
    { range: "45-60 min", percentage: 8, color: "bg-orange-500" },
    { range: "60+ min", percentage: 2, color: "bg-red-500" },
]

export function PerformanceMetrics() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Top Performing Restaurants</CardTitle>
                    <CardDescription>Based on order volume and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Restaurant</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topRestaurants.map((restaurant) => (
                                <TableRow key={restaurant.name}>
                                    <TableCell className="font-medium">{restaurant.name}</TableCell>
                                    <TableCell>{restaurant.orders}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            {restaurant.rating}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{restaurant.revenue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="col-span-3 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Times</CardTitle>
                        <CardDescription>Order completion time distribution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {deliveryPerformance.map((item) => (
                            <div key={item.range} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span>{item.range}</span>
                                    <span className="font-medium">{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className={item.color} indicatorClassName={item.color} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Operational Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-blue-100 p-2">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Avg. Prep Time</p>
                                    <p className="text-xs text-muted-foreground">Kitchen processing</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold">12m</p>
                                <p className="text-xs text-green-600 flex items-center justify-end">
                                    -2m <ArrowDown className="h-3 w-3" />
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-purple-100 p-2">
                                    <Bike className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Avg. Delivery Time</p>
                                    <p className="text-xs text-muted-foreground">Pickup to Drop</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold">24m</p>
                                <p className="text-xs text-red-600 flex items-center justify-end">
                                    +1m <ArrowUp className="h-3 w-3" />
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-orange-100 p-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Order Fail Rate</p>
                                    <p className="text-xs text-muted-foreground">Cancelled/Returned</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold">1.2%</p>
                                <p className="text-xs text-green-600 flex items-center justify-end">
                                    -0.1% <ArrowDown className="h-3 w-3" />
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
