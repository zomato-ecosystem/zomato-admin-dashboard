import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService, OrderFilters } from '@/services/ordersService';
import { mockOrders } from '@/lib/mock-data';

// For demo: return mock data if API fails
const useMockFallback = true;

export function useOrders(filters: OrderFilters = {}) {
    return useQuery({
        queryKey: ['orders', filters],
        queryFn: async () => {
            if (useMockFallback) return { data: mockOrders };
            const response = await ordersService.getOrders(filters);
            return response.data;
        },
        refetchInterval: 10000, // Auto-refetch every 10 seconds
    });
}

export function useOrderById(id: string) {
    return useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            if (useMockFallback) return { data: mockOrders.find(o => o.id === id) };
            const response = await ordersService.getOrderById(id);
            return response.data;
        },
        enabled: !!id,
    });
}

export function useAssignOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, partnerId }: { orderId: string; partnerId: string }) =>
            ordersService.assignOrder(orderId, partnerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
            ordersService.cancelOrder(orderId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useRefundOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, amount, reason }: { orderId: string; amount: number; reason: string }) =>
            ordersService.refundOrder(orderId, amount, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
