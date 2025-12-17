"use client"

import React from "react"
import { TicketsTable } from "@/components/support/TicketsTable"
import { TicketDetail } from "@/components/support/TicketDetail"
import { KnowledgeBase } from "@/components/support/KnowledgeBase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SupportPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Support & Help Desk</h2>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Ticket
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Tickets</TabsTrigger>
                    <TabsTrigger value="my_tickets">My Tickets</TabsTrigger>
                    <TabsTrigger value="detail_demo">Detail Demo</TabsTrigger>
                    <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="knowledge_base">Knowledge Base</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                    <TicketsTable />
                </TabsContent>
                <TabsContent value="my_tickets" className="space-y-4">
                    <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">My Tickets list view...</p>
                    </div>
                </TabsContent>
                <TabsContent value="detail_demo" className="space-y-4">
                    <TicketDetail />
                </TabsContent>
                <TabsContent value="unassigned" className="space-y-4">
                    <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Unassigned Tickets...</p>
                    </div>
                </TabsContent>
                <TabsContent value="resolved" className="space-y-4">
                    <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Resolved Tickets History...</p>
                    </div>
                </TabsContent>
                <TabsContent value="knowledge_base" className="space-y-4">
                    <KnowledgeBase />
                </TabsContent>
            </Tabs>
        </div>
    )
}
