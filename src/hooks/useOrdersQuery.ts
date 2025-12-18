import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrdersService, OrderFilters } from '@/services/ordersService';
import { mockOrders } from '@/lib/mock-data';

// For demo: return mock data if API fails
const useMockFallback = true;

export function useOrders(filters: OrderFilters = {}) {
    return useQuery({
        queryKey: ['orders', filters],
        queryFn: async () => {
            if (useMockFallback) return { data: mockOrders };
            const response = await OrdersService.getOrders(filters);
            return response;
        },
        refetchInterval: 10000, // Auto-refetch every 10 seconds
    });
}

export function useOrderById(id: string) {
    return useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            if (useMockFallback) return { data: mockOrders.find(o => o.id === id) };
            const response = await OrdersService.getOrderById(id);
            return response;
        },
        enabled: !!id,
    });
}

export function useAssignOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, partnerId }: { orderId: string; partnerId: string }) =>
            OrdersService.assignOrder(orderId, partnerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
            OrdersService.cancelOrder(orderId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useRefundOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, amount, reason }: { orderId: string; amount: number; reason: string }) =>
            OrdersService.refundOrder(orderId, amount, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
