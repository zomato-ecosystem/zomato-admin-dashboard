'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function FinancialCharts() {
    const revenueData = [
        { name: 'Mon', revenue: 150000 },
        { name: 'Tue', revenue: 180000 },
        { name: 'Wed', revenue: 160000 },
        { name: 'Thu', revenue: 210000 },
        { name: 'Fri', revenue: 250000 },
        { name: 'Sat', revenue: 320000 },
        { name: 'Sun', revenue: 290000 },
    ];

    const refundData = [
        { name: 'Quality', value: 45, color: '#ef4444' },
        { name: 'Missing', value: 25, color: '#f97316' },
        { name: 'Delivery', value: 20, color: '#eab308' },
        { name: 'Other', value: 10, color: '#6b7280' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Daily Revenue Trend</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={12} stroke="#888" />
                            <YAxis fontSize={12} stroke="#888" tickFormatter={(value) => `₹${value / 1000}k`} />
                            <Tooltip
                                formatter={(value: any) => [`₹${value}`, 'Revenue']}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Refund Reasons</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={refundData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {refundData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {refundData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-xs text-gray-600">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
