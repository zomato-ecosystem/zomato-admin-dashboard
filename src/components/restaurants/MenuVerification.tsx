'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle } from 'lucide-react';

export function MenuVerification() {
    const [pendingItems, setPendingItems] = useState([
        { id: 1, name: 'Spicy Chicken Wings', price: '₹250', category: 'Starters', description: 'Deep fried wings with spicy sauce', status: 'Pending Review' },
        { id: 2, name: 'Paneer Tikka', price: '₹220', category: 'Starters', description: 'Cottage cheese cubes marinated in spices', status: 'Pending Review' },
    ]);

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        // Mock API call
        setPendingItems(prev => prev.filter(item => item.id !== id));
        // Show toaster
    };

    if (pendingItems.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">All menu items have been verified.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Menu Approval</h3>
            <div className="space-y-3">
                {pendingItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 bg-white border border-yellow-200 rounded-lg shadow-sm bg-yellow-50/30">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <Badge variant="outline" className="text-yellow-700 border-yellow-300 bg-yellow-100">
                                    New Item
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">{item.price} • {item.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleAction(item.id, 'reject')}
                            >
                                <X className="w-4 h-4 mr-1" /> Reject
                            </Button>
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleAction(item.id, 'approve')}
                            >
                                <Check className="w-4 h-4 mr-1" /> Approve
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
