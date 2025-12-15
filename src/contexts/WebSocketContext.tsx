'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface WebSocketEvent {
    type: string;
    data: any;
    timestamp: Date;
}

interface WebSocketContextType {
    isConnected: boolean;
    connectionState: 'connected' | 'disconnected' | 'connecting' | 'error';
    lastEvent: WebSocketEvent | null;
    pendingOrdersCount: number;
    openTicketsCount: number;
}

const WebSocketContext = createContext<WebSocketContextType>({
    isConnected: false,
    connectionState: 'disconnected',
    lastEvent: null,
    pendingOrdersCount: 0,
    openTicketsCount: 0,
});

export function useWebSocket() {
    return useContext(WebSocketContext);
}

export function WebSocketProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(false);
    const [connectionState, setConnectionState] = useState<'connected' | 'disconnected' | 'connecting' | 'error'>('disconnected');
    const [lastEvent, setLastEvent] = useState<WebSocketEvent | null>(null);
    const [pendingOrdersCount, setPendingOrdersCount] = useState(5);
    const [openTicketsCount, setOpenTicketsCount] = useState(3);

    // Simulate WebSocket connection
    useEffect(() => {
        setConnectionState('connecting');

        const connectTimeout = setTimeout(() => {
            setIsConnected(true);
            setConnectionState('connected');
        }, 1000);

        // Simulate periodic events
        const eventInterval = setInterval(() => {
            const events = [
                { type: 'order.new', data: { orderId: `ORD-${Date.now()}`, amount: Math.floor(Math.random() * 500) + 200 } },
                { type: 'order.status_changed', data: { orderId: 'ORD-001', status: 'Preparing' } },
                { type: 'delivery_partner.online', data: { partnerId: 'DP-001', name: 'Amit Kumar' } },
            ];

            const randomEvent = events[Math.floor(Math.random() * events.length)];
            setLastEvent({ ...randomEvent, timestamp: new Date() });

            // Update counts occasionally
            if (randomEvent.type === 'order.new') {
                setPendingOrdersCount(prev => prev + 1);
            }
        }, 30000); // Every 30 seconds

        return () => {
            clearTimeout(connectTimeout);
            clearInterval(eventInterval);
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ isConnected, connectionState, lastEvent, pendingOrdersCount, openTicketsCount }}>
            {children}
        </WebSocketContext.Provider>
    );
}
