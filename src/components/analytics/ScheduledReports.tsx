"use client"

import * as React from "react"
import { Calendar, Clock, MoreHorizontal, Plus, Trash, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

const scheduledReports = [
    { id: 1, name: "Daily Sales Summary", frequency: "Daily", time: "09:00 AM", active: true, recipients: ["admin@zomato.com", "finance@zomato.com"] },
    { id: 2, name: "Weekly Performance Review", frequency: "Weekly", time: "Mon, 10:00 AM", active: true, recipients: ["admin@zomato.com"] },
    { id: 3, name: "Monthly Churn Analysis", frequency: "Monthly", time: "1st, 12:00 PM", active: false, recipients: ["growth@zomato.com"] },
]

export function ScheduledReports() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>Manage automated report delivery.</CardDescription>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule New
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {scheduledReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-2 mt-1">
                                    <Calendar className="h-4 w-4 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-medium leading-none">{report.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {report.frequency} at {report.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                                        <Mail className="h-3 w-3" /> {report.recipients.length} recipients
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{report.active ? "Active" : "Paused"}</span>
                                    <Switch checked={report.active} />
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                                        <DropdownMenuItem>Send Now</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            <Trash className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
