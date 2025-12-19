'use client';

import {
    X,
    Filter
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface OrdersFilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function OrdersFilterSidebar({ isOpen, onClose }: OrdersFilterSidebarProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out px-6 py-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    Filters
                </h3>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <div className="space-y-6">
                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Order Status</label>
                    <div className="space-y-2">
                        {['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((status) => (
                            <label key={status} className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                <span className="ml-2 text-sm text-gray-600">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Date Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full text-sm border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full text-sm border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Restaurant */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Restaurant</label>
                    <select className="w-full text-sm border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">
                        <option value="">All Restaurants</option>
                        <option value="1">Pizza Hut</option>
                        <option value="2">KFC</option>
                        <option value="3">Burger King</option>
                    </select>
                </div>

                {/* Payment Method */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                            <span className="ml-2 text-sm text-gray-600">Online Payment</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                            <span className="ml-2 text-sm text-gray-600">Cash on Delivery</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => { }} // TODO: Reset logic
                >
                    Reset
                </Button>
                <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={onClose}
                >
                    Apply Filters
                </Button>
            </div>
        </div>
    );
}
