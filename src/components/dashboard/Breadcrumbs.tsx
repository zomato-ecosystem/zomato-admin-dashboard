'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';

const routeLabels: Record<string, string> = {
    'dashboard': 'Dashboard',
    'orders': 'Orders',
    'restaurants': 'Restaurants',
    'users': 'Users',
    'payments': 'Payments',
    'transactions': 'Transactions',
    'refunds': 'Refunds',
    'payouts': 'Payouts',
    'analytics': 'Analytics',
    'support': 'Support',
    'tickets': 'Tickets',
    'disputes': 'Disputes',
    'operations': 'Operations',
    'map': 'Live Map',
    'zones': 'Zones',
    'create': 'Create',
    'promos': 'Promos',
    'settings': 'Settings',
};

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="flex items-center hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
            </Link>
            {segments.map((segment, index) => {
                const href = '/' + segments.slice(0, index + 1).join('/');
                const isLast = index === segments.length - 1;
                const label = routeLabels[segment.toLowerCase()] || segment;

                return (
                    <Fragment key={href}>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        {isLast ? (
                            <span className="font-medium text-foreground">{label}</span>
                        ) : (
                            <Link href={href} className="hover:text-foreground transition-colors">
                                {label}
                            </Link>
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
}
