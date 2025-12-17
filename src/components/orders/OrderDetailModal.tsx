'use client';

import { Order } from '@/services/ordersService';
import {
    X,
    MapPin,
    Phone,
    User,
    Store,
    Clock,
    CreditCard,
    ChefHat,
    Bike
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderDetailModalProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

export function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-20">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</h2>
                            <Badge className="uppercase tracking-wide">{order.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order Items */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name || 'Unknown Item'}</p>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-lg font-bold">
                                    <span>Total Amount</span>
                                    <span>₹{order.totalAmount}</span>
                                </div>
                            </div>
                        </section>

                        {/* Timeline / Status Tracking */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
                            <div className="relative pl-8 border-l-2 border-gray-200 space-y-8">
                                {[
                                    { title: 'Order Placed', time: '10:30 AM', active: true },
                                    { title: 'Confirmed by Restaurant', time: '10:32 AM', active: true },
                                    { title: 'Preparing', time: '10:35 AM', active: true },
                                    { title: 'Out for Delivery', time: '10:55 AM', active: false },
                                    { title: 'Delivered', time: 'Pending', active: false },
                                ].map((step, idx) => (
                                    <div key={idx} className="relative">
                                        <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-4 ${step.active ? 'bg-red-600 border-red-100' : 'bg-gray-300 border-gray-100'
                                            }`}></div>
                                        <div>
                                            <p className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</p>
                                            <p className="text-xs text-gray-500">{step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Info Cards */}
                    <div className="space-y-6">
                        {/* Customer */}
                        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                                <User className="w-4 h-4 text-red-500" /> Customer
                            </h4>
                            <div className="space-y-2 text-sm">
                                <p className="font-medium">{order.customer.name}</p>
                                <p className="text-gray-500">{order.customer.email}</p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-3 h-3" /> +91 98765 43210
                                </p>
                                <p className="flex items-start gap-2 text-gray-600 mt-2">
                                    <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                                    123, Green Park, New Delhi
                                </p>
                            </div>
                        </div>

                        {/* Restaurant */}
                        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                                <Store className="w-4 h-4 text-orange-500" /> Restaurant
                            </h4>
                            <div className="space-y-2 text-sm">
                                <p className="font-medium">{order.restaurant.name}</p>
                                <p className="text-gray-500">Connaught Place, New Delhi</p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-3 h-3" /> +91 11 2345 6789
                                </p>
                            </div>
                        </div>

                        {/* Delivery Partner (Manual Assignment Interface) */}
                        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                            <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                                <Bike className="w-4 h-4 text-blue-500" /> Delivery Partner
                            </h4>
                            <div className="text-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p className="text-sm text-gray-500 mb-3">No partner assigned yet</p>
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Assign Manually
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button variant="destructive">Cancel Order</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Update Status</Button>
                </div>
            </div>
        </div>
    );
}
