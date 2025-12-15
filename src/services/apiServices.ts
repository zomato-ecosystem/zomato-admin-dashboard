import apiClient from '@/lib/apiClient';

export const restaurantsService = {
    getRestaurants: (filters = {}) =>
        apiClient.get('/admin/restaurants', { params: filters }),

    getRestaurantById: (id: string) =>
        apiClient.get(`/admin/restaurants/${id}`),

    approveRestaurant: (id: string) =>
        apiClient.put(`/admin/restaurants/${id}/approve`),

    suspendRestaurant: (id: string, reason: string) =>
        apiClient.put(`/admin/restaurants/${id}/suspend`, { reason }),

    updateRestaurant: (id: string, data: any) =>
        apiClient.put(`/admin/restaurants/${id}`, data),
};

export const usersService = {
    getCustomers: (filters = {}) =>
        apiClient.get('/admin/users/customers', { params: filters }),

    getDeliveryPartners: (filters = {}) =>
        apiClient.get('/admin/users/delivery-partners', { params: filters }),

    getUserById: (id: string) =>
        apiClient.get(`/admin/users/${id}`),

    blockUser: (id: string, reason: string) =>
        apiClient.put(`/admin/users/${id}/block`, { reason }),

    unblockUser: (id: string) =>
        apiClient.put(`/admin/users/${id}/unblock`),
};

export const analyticsService = {
    getDashboardStats: () =>
        apiClient.get('/admin/analytics/dashboard'),

    getOrdersAnalytics: (period: string) =>
        apiClient.get('/admin/analytics/orders', { params: { period } }),

    getRevenueAnalytics: (period: string) =>
        apiClient.get('/admin/analytics/revenue', { params: { period } }),

    getZoneAnalytics: (zoneId: string) =>
        apiClient.get(`/admin/analytics/zones/${zoneId}`),
};
