'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function PayoutsManager() {
    const pendingPayouts = [
        { id: 1, restaurant: 'Pizza Hut', amount: 45000, due: 'Today', status: 'Pending' },
        { id: 2, restaurant: 'KFC', amount: 32000, due: 'Today', status: 'Pending' },
        { id: 3, restaurant: 'Burger King', amount: 28000, due: 'Tomorrow', status: 'Scheduled' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h4 className="text-sm font-medium text-orange-800">Pending Payouts</h4>
                    <p className="text-2xl font-bold text-orange-900 mt-1">₹77,000</p>
                    <p className="text-xs text-orange-700 mt-1">Due Today</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="text-sm font-medium text-green-800">Processed Today</h4>
                    <p className="text-2xl font-bold text-green-900 mt-1">₹1,20,000</p>
                    <p className="text-xs text-green-700 mt-1">15 Transactions</p>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Next Payout Queue</h3>
                    <Button size="sm">Process All Pending</Button>
                </div>
                <div className="divide-y divide-gray-100">
                    {pendingPayouts.map((payout) => (
                        <div key={payout.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <p className="font-medium text-gray-900">{payout.restaurant}</p>
                                <p className="text-sm text-gray-500">Due: {payout.due} • ID: PO-{payout.id}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-bold text-gray-900">₹{payout.amount.toLocaleString()}</p>
                                {payout.status === 'Pending' ? (
                                    <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                        Pay Now
                                    </Button>
                                ) : (
                                    <Badge variant="secondary">{payout.status}</Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
