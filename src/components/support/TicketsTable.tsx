"use client"

import * as React from "react"
import { MoreHorizontal, Clock, ArrowUpCircle, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed"
export type TicketPriority = "High" | "Medium" | "Low" | "Critical"

interface Ticket {
    id: string
    subject: string
    requester: string
    priority: TicketPriority
    status: TicketStatus
    createdAt: Date
    slaDue: Date
    assignee?: string
}

const mockTickets: Ticket[] = [
    {
        id: "T-1023",
        subject: "Order not delivered but marked as delivered",
        requester: "John Doe",
        priority: "Critical",
        status: "Open",
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 30), // 30 mins ago
        slaDue: new Date(new Date().getTime() + 1000 * 60 * 30), // due in 30 mins
    },
    {
        id: "T-1024",
        subject: "Refund request for damaged item",
        requester: "Jane Smith",
        priority: "High",
        status: "In Progress",
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 120), // 2 hours ago
        slaDue: new Date(new Date().getTime() + 1000 * 60 * 60), // due in 1 hour
        assignee: "Support Agent 1",
    },
    {
        id: "T-1025",
        subject: "Restaurant partner app login issue",
        requester: "Burger King Steps",
        priority: "Medium",
        status: "Open",
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
        slaDue: new Date(new Date().getTime() + 1000 * 60 * 60 * 19), // due tomorrow
    },
    {
        id: "T-1020",
        subject: "Update menu prices inquiry",
        requester: "Pizza Hut",
        priority: "Low",
        status: "Resolved",
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // 1 day ago
        slaDue: new Date(new Date().getTime() - 1000 * 60 * 60), // overdue (but resolved)
        assignee: "Support Agent 2",
    },
]

export function TicketsTable() {
    const getPriorityBadge = (priority: TicketPriority) => {
        switch (priority) {
            case "Critical": return <Badge variant="destructive" className="bg-red-600">Critical</Badge>
            case "High": return <Badge variant="destructive" className="bg-orange-500">High</Badge>
            case "Medium": return <Badge variant="secondary" className="bg-yellow-500 text-white">Medium</Badge>
            case "Low": return <Badge variant="outline">Low</Badge>
        }
    }

    const getStatusBadge = (status: TicketStatus) => {
        switch (status) {
            case "Open": return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Open</Badge>
            case "In Progress": return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">In Progress</Badge>
            case "Resolved": return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Resolved</Badge>
            case "Closed": return <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">Closed</Badge>
        }
    }

    const getSlaStatus = (ticket: Ticket) => {
        if (ticket.status === "Resolved" || ticket.status === "Closed") {
            return <span className="text-muted-foreground text-xs">Completed</span>
        }
        const now = new Date()
        const isOverdue = now > ticket.slaDue

        if (isOverdue) {
            return (
                <div className="flex items-center text-red-600 text-xs font-medium">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Overdue {formatDistanceToNow(ticket.slaDue)}
                </div>
            )
        }

        return (
            <div className="flex items-center text-green-600 text-xs font-medium">
                <Clock className="mr-1 h-3 w-3" />
                Due in {formatDistanceToNow(ticket.slaDue)}
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>SLA</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell>{ticket.subject}</TableCell>
                            <TableCell>{ticket.requester}</TableCell>
                            <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                            <TableCell>{getSlaStatus(ticket)}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Assign to me</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Escalate</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
