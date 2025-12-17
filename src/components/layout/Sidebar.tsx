'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Store,
    Users,
    DollarSign,
    BarChart3,
    MessageSquare,
    Settings,
    ChevronDown,
    LogOut,
    LucideIcon
} from 'lucide-react';

interface NavigationItem {
    name: string;
    href: string;
    icon: LucideIcon;
    badge?: number | null;
    children?: { name: string; href: string }[];
}

const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Orders', href: '/orders', icon: ShoppingBag, badge: 12 },
    { name: 'Restaurants', href: '/restaurants', icon: Store, badge: 3 },
    { name: 'Users', href: '/users', icon: Users, badge: null },
    {
        name: 'Payments',
        href: '/payments',
        icon: DollarSign,
        badge: null,
        children: [
            { name: 'Transactions', href: '/payments/transactions' },
            { name: 'Refunds', href: '/payments/refunds' },
            { name: 'Payouts', href: '/payments/payouts' },
        ]
    },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
    { name: 'Support', href: '/support', icon: MessageSquare, badge: 8 },
    { name: 'Settings', href: '/settings', icon: Settings, badge: null },
];

interface SidebarProps {
    isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Z</span>
                    </div>
                    <span className="font-bold text-lg text-gray-900">Zomato Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                ))}
            </nav>

            {/* User Profile */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                    {/* Placeholder Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        A
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500">admin@zomato.com</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ item }: { item: NavigationItem }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.href || (hasChildren && item.children?.some(child => pathname === child.href));

    return (
        <div>
            <Link
                href={item.href}
                onClick={(e) => {
                    if (hasChildren) {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${isActive ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`} />
                <span className="flex-1 text-sm font-medium">{item.name}</span>
                {item.badge && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        {item.badge}
                    </span>
                )}
                {hasChildren && (
                    <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                )}
            </Link>

            {/* Sub-menu */}
            {hasChildren && isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                    {item.children?.map((child) => (
                        <Link
                            key={child.name}
                            href={child.href}
                            className={`block px-3 py-2 text-sm rounded-lg ${pathname === child.href
                                    ? 'text-red-600 bg-red-50 font-medium'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {child.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
