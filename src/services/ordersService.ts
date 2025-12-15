import apiClient from '@/lib/apiClient';

export interface OrderFilters {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
}

export const ordersService = {
    getOrders: (filters: OrderFilters = {}) =>
        apiClient.get('/admin/orders', { params: filters }),

    getOrderById: (id: string) =>
        apiClient.get(`/admin/orders/${id}`),

    assignOrder: (id: string, partnerId: string) =>
        apiClient.put(`/admin/orders/${id}/assign`, { partnerId }),

    cancelOrder: (id: string, reason: string) =>
        apiClient.put(`/admin/orders/${id}/cancel`, { reason }),

    refundOrder: (id: string, amount: number, reason: string) =>
        apiClient.post(`/admin/orders/${id}/refund`, { amount, reason }),

    updateOrderStatus: (id: string, status: string) =>
        apiClient.put(`/admin/orders/${id}/status`, { status }),
};
