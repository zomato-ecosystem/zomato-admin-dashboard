"use client"

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { toast } from '@/components/ui/use-toast'
import { SoundManager } from '@/lib/SoundManager'

// Mock socket URL - in production this would come from env
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export type NotificationType = 'order' | 'system' | 'alert'

export interface Notification {
    id: string
    title: string
    message: string
    type: NotificationType
    timestamp: Date
    read: boolean
    link?: string
}

// Global store for notifications (simplified for MVP)
// In a real app, this might be Redux or Zustand
let globalNotifications: Notification[] = []
let listeners: ((notifications: Notification[]) => void)[] = []

const notifyListeners = () => {
    listeners.forEach((l) => l([...globalNotifications]))
}

export const useSocketNotifications = () => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [notifications, setNotifications] = useState<Notification[]>(globalNotifications)
    const [unreadCount, setUnreadCount] = useState(0)

    // Subscribe to global store updates
    useEffect(() => {
        listeners.push(setNotifications)
        return () => {
            listeners = listeners.filter((l) => l !== setNotifications)
        }
    }, [])

    // Update unread count when notifications change
    useEffect(() => {
        setUnreadCount(notifications.filter((n) => !n.read).length)
    }, [notifications])

    useEffect(() => {
        // Only connect on client side
        if (typeof window === 'undefined') return

        // In a real implementation we would connect to the actual backend
        // For this MVP demo, we'll simulate events since we might not have a running backend socket server
        const mockSocket = {
            on: (event: string, callback: any) => { },
            off: (event: string) => { },
            disconnect: () => { },
        } as unknown as Socket

        // Simulate incoming notifications for demonstration
        const simulateEvent = () => {
            const types: NotificationType[] = ['order', 'system', 'alert']
            const type = types[Math.floor(Math.random() * types.length)]

            let title = "New Notification"
            let message = "You have a new update."

            if (type === 'order') {
                title = "New Order Recieved"
                message = `Order #${Math.floor(Math.random() * 10000)} has been placed.`
            } else if (type === 'alert') {
                title = "High Priority Alert"
                message = "Server load is high. Performance might be degraded."
            } else {
                title = "System Update"
                message = "Backup completed successfully."
            }

            const newNotification: Notification = {
                id: Date.now().toString(),
                title,
                message,
                type,
                timestamp: new Date(),
                read: false
            }

            // Add to store
            globalNotifications = [newNotification, ...globalNotifications]
            notifyListeners()

            // Trigger side effects
            if (type === 'alert') {
                SoundManager.playError()
                toast({
                    title: title,
                    description: message,
                    variant: 'destructive',
                })
            } else {
                SoundManager.playNotification() // "Ding"
                toast({
                    title: title,
                    description: message,
                })
            }
        }

        // Trigger a simulated notification every 60 seconds for demo purposes
        // Or exposing a manual trigger function to the dev
        const interval = setInterval(simulateEvent, 60000)

        // Also trigger one immediately on mount for feedback
        // setTimeout(simulateEvent, 2000)

        setSocket(mockSocket)

        return () => {
            clearInterval(interval)
            if (mockSocket) mockSocket.disconnect()
        }
    }, [])

    const markAllAsRead = () => {
        globalNotifications = globalNotifications.map(n => ({ ...n, read: true }))
        notifyListeners()
    }

    const markAsRead = (id: string) => {
        globalNotifications = globalNotifications.map(n => n.id === id ? { ...n, read: true } : n)
        notifyListeners()
    }

    // Dev tool to force trigger a notification
    const triggerTestNotification = () => {
        const newNotification: Notification = {
            id: Date.now().toString(),
            title: "Test Notification",
            message: "This is a test alert triggered manually.",
            type: 'system',
            timestamp: new Date(),
            read: false
        }
        globalNotifications = [newNotification, ...globalNotifications]
        notifyListeners()
        SoundManager.playNotification()
        toast({ title: newNotification.title, description: newNotification.message })
    }

    return { socket, notifications, unreadCount, markAllAsRead, markAsRead, triggerTestNotification }
}
