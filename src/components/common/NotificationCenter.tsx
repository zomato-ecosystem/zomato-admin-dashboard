"use client"

import * as React from "react"
import { Bell, Check, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSocketNotifications, Notification } from "@/hooks/useSocketNotifications"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

export function NotificationCenter() {
    const { notifications, unreadCount, markAllAsRead, markAsRead, triggerTestNotification } = useSocketNotifications()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 border-2 border-background flex items-center justify-center text-[10px] text-white font-bold">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px]">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary" onClick={markAllAsRead}>
                        Mark all read
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Tabs defaultValue="all">
                    <div className="px-2">
                        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none space-x-4">
                            <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">All</TabsTrigger>
                            <TabsTrigger value="unread" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">Unread</TabsTrigger>
                            <TabsTrigger value="alerts" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">Alerts</TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="h-[300px]">
                        <TabsContent value="all" className="m-0">
                            <NotificationList notifications={notifications} onRead={markAsRead} />
                        </TabsContent>
                        <TabsContent value="unread" className="m-0">
                            <NotificationList notifications={notifications.filter(n => !n.read)} onRead={markAsRead} />
                        </TabsContent>
                        <TabsContent value="alerts" className="m-0">
                            <NotificationList notifications={notifications.filter(n => n.type === 'alert')} onRead={markAsRead} />
                        </TabsContent>
                    </ScrollArea>
                </Tabs>

                <DropdownMenuSeparator />
                <div className="p-2">
                    <Button variant="outline" className="w-full text-xs h-8" onClick={triggerTestNotification}>
                        Test Notification
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function NotificationList({ notifications, onRead }: { notifications: Notification[], onRead: (id: string) => void }) {
    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                <Bell className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">No notifications</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={cn(
                        "flex flex-col gap-1 p-4 border-b hover:bg-muted/50 transition-colors relative group",
                        !notification.read && "bg-blue-50/50 hover:bg-blue-50"
                    )}
                >
                    <div className="flex justify-between items-start">
                        <h4 className={cn("text-sm font-medium", !notification.read && "text-blue-700")}>{notification.title}</h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 pr-4">{notification.message}</p>

                    {!notification.read && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full shadow-sm border">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                title="Mark as read"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onRead(notification.id)
                                }}
                            >
                                <Check className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
