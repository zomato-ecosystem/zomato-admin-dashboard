'use client';

import { Star, DollarSign, ShoppingBag, Clock } from 'lucide-react';

export function RestaurantStats() {
    const stats = [
        { name: 'Total Revenue', value: '₹4,50,000', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Total Orders', value: '1,250', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Average Rating', value: '4.5', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { name: 'Avg Prep Time', value: '25 mins', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.name} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <Icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <span className="text-sm font-medium text-gray-500">{stat.name}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                );
            })}
        </div>
    );
}
