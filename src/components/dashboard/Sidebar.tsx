'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard,
    ShoppingBag,
    Utensils,
    Users,
    Wallet,
    BarChart3,
    LifeBuoy,
    Settings,
    Map,
    Ticket,
    LogOut,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NavItem {
    name: string;
    href?: string;
    icon: any;
    badge?: number;
    children?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/orders', icon: ShoppingBag, badge: 5 },
    {
        name: 'Restaurants', icon: Utensils, children: [
            { name: 'All Restaurants', href: '/restaurants' },
            { name: 'Pending Approvals', href: '/restaurants?status=pending' },
        ]
    },
    {
        name: 'Users', icon: Users, children: [
            { name: 'Customers', href: '/users?tab=customers' },
            { name: 'Delivery Partners', href: '/users?tab=delivery' },
            { name: 'Restaurant Partners', href: '/users?tab=restaurant' },
        ]
    },
    {
        name: 'Payments', icon: Wallet, children: [
            { name: 'Transactions', href: '/payments/transactions' },
            { name: 'Refunds', href: '/payments/refunds' },
            { name: 'Payouts', href: '/payments/payouts' },
        ]
    },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    {
        name: 'Support', icon: LifeBuoy, children: [
            { name: 'Tickets', href: '/support/tickets' },
            { name: 'Disputes', href: '/support/disputes' },
        ]
    },
    {
        name: 'Operations', icon: Map, children: [
            { name: 'Live Map', href: '/operations/map' },
            { name: 'Zones', href: '/zones' },
        ]
    },
    { name: 'Promos', href: '/promos', icon: Ticket },
    { name: 'Settings', href: '/settings', icon: Settings },
];

function NavLink({ item }: { item: NavItem }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.href ? pathname.startsWith(item.href) : item.children?.some(c => pathname.startsWith(c.href.split('?')[0]));

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        'w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                >
                    <div className="flex items-center">
                        <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                        {item.name}
                    </div>
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                        {item.children?.map((child) => (
                            <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                    'block px-3 py-1.5 text-sm rounded-md transition-colors',
                                    pathname.startsWith(child.href.split('?')[0]) ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={item.href!}
            className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
        >
            <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground')} />
            {item.name}
            {item.badge && (
                <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5">{item.badge}</Badge>
            )}
        </Link>
    );
}

export function Sidebar() {
    return (
        <div className="flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
            <div className="p-6 flex items-center justify-center border-b border-border">
                <h1 className="text-2xl font-bold italic text-primary">zomato</h1>
                <span className="ml-1 text-xs px-2 py-0.5 bg-secondary rounded-full">Admin</span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navigation.map((item) => (
                    <NavLink key={item.name} item={item} />
                ))}
            </nav>

            <div className="p-3 border-t border-border">
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>

            <div className="p-4 border-t border-border">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-foreground">Admin User</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
