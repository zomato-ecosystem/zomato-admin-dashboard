'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Trash2, Map, LayoutList } from "lucide-react";
import { OrdersTable } from '@/components/orders/OrdersTable';
import { OrdersFilterSidebar } from '@/components/orders/OrdersFilterSidebar';
import { OrdersDetailModal } from '@/components/orders/OrderDetailModal';
import { OrdersService, Order } from '@/services/ordersService';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const LiveOrdersMap = dynamic(() => import('@/components/dashboard/LiveOrdersMap').then(mod => mod.LiveOrdersMap), {
    loading: () => <Skeleton className="h-[calc(100vh-200px)] w-full rounded-xl" />,
    ssr: false // Maps usually shouldn't run on server
});

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await OrdersService.getAllOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const handleToggleSelect = (orderId: string) => {
        if (selectedOrderIds.includes(orderId)) {
            setSelectedOrderIds(prev => prev.filter(id => id !== orderId));
        } else {
            setSelectedOrderIds(prev => [...prev, orderId]);
        }
    };

    const handleToggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedOrderIds(filteredOrders.map(o => o.id));
        } else {
            setSelectedOrderIds([]);
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Orders Management</h2>
                    <p className="text-gray-500 mt-1">
                        Viewing {filteredOrders.length} orders
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowMap(!showMap)}
                        className={showMap ? 'bg-red-50 text-red-600 border-red-200' : ''}
                    >
                        {showMap ? <LayoutList className="mr-2 h-4 w-4" /> : <Map className="mr-2 h-4 w-4" />}
                        {showMap ? 'List View' : 'Map View'}
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button
                        onClick={() => setFilterOpen(true)}
                        className={filterOpen ? 'bg-gray-100' : ''}
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Content */}
            {showMap ? (
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm h-[calc(100vh-200px)]">
                    <LiveOrdersMap />
                </div>
            ) : (
                <>
                    {/* Controls & Bulk Actions */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by ID, customer, or restaurant..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                            />
                        </div>

                        {selectedOrderIds.length > 0 && (
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                <span className="text-sm font-medium text-gray-700">
                                    {selectedOrderIds.length} selected
                                </span>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2 h-3 w-3" />
                                    Cancel Selected
                                </Button>
                                <Button variant="secondary" size="sm">
                                    Assign Driver
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Table */}
                    <OrdersTable
                        orders={filteredOrders}
                        onSelectOrder={handleSelectOrder}
                        selectedOrderIds={selectedOrderIds}
                        onToggleSelect={handleToggleSelect}
                        onToggleSelectAll={handleToggleSelectAll}
                    />
                </>
            )}

            {/* Overlays */}
            <OrdersFilterSidebar
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
            />

            <OrderDetailModal
                order={selectedOrder}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
}
