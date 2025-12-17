"use client"

import * as React from "react"
import { Send, Paperclip, Phone, Mail, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ConversationThread } from "@/components/support/ConversationThread"
import { CannedResponses } from "@/components/support/CannedResponses"

export function TicketDetail() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
            {/* Left: Conversation Area */}
            <div className="md:col-span-2 flex flex-col h-full space-y-4">
                <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="py-4 border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg">Order not delivered but marked as delivered</CardTitle>
                                <CardDescription>Ticket #T-1023 • Created 2 hours ago</CardDescription>
                            </div>
                            <Badge variant="destructive">Critical</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        <ConversationThread />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 space-y-4">
                        <Textarea placeholder="Type your reply..." className="min-h-[100px]" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                                <CannedResponses />
                            </div>
                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                Send Reply
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Sidebar Context */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Requester Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">Premium Customer</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>john.doe@example.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>+1 234 567 890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>New York, USA</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm">
                            <p className="font-medium">Order #ORD-2234</p>
                            <p className="text-xs text-muted-foreground">Delivered yesterday</p>
                        </div>
                        <Separator />
                        <div className="text-sm">
                            <p className="font-medium">Ticket #T-0092</p>
                            <p className="text-xs text-muted-foreground">Resolved 1 week ago</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
