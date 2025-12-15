'use client';

import { Bell, Search } from 'lucide-react';
import { ConnectionStatus } from './ConnectionStatus';
import { Badge } from '@/components/ui/badge';
import { useWebSocket } from '@/contexts/WebSocketContext';

export function Header() {
    const { pendingOrdersCount, openTicketsCount } = useWebSocket();

    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-card px-6">
            <div className="relative w-96">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Search orders, users, restaurants..."
                />
            </div>

            <div className="flex items-center gap-4">
                <ConnectionStatus />

                <button className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    {(pendingOrdersCount + openTicketsCount) > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {pendingOrdersCount + openTicketsCount}
                        </Badge>
                    )}
                </button>
            </div>
        </header>
    );
}
