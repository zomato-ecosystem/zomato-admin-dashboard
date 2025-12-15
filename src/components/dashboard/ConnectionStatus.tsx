'use client';

import { useWebSocket } from '@/contexts/WebSocketContext';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConnectionStatus() {
    const { connectionState } = useWebSocket();

    return (
        <div className={cn(
            "flex items-center gap-1.5 text-xs px-2 py-1 rounded-full",
            connectionState === 'connected' && "bg-green-100 text-green-700",
            connectionState === 'connecting' && "bg-yellow-100 text-yellow-700",
            connectionState === 'disconnected' && "bg-gray-100 text-gray-600",
            connectionState === 'error' && "bg-red-100 text-red-700",
        )}>
            {connectionState === 'connected' && <Wifi className="h-3 w-3" />}
            {connectionState === 'connecting' && <Loader2 className="h-3 w-3 animate-spin" />}
            {connectionState === 'disconnected' && <WifiOff className="h-3 w-3" />}
            {connectionState === 'error' && <WifiOff className="h-3 w-3" />}
            <span className="capitalize">{connectionState}</span>
        </div>
    );
}
