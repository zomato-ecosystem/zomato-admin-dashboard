import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage or auth store
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{ message?: string }>) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        switch (status) {
            case 401:
                // Unauthorized - redirect to login
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('admin-token');
                    window.location.href = '/login';
                }
                break;
            case 403:
                toast({ title: 'Access Denied', description: 'You do not have permission to perform this action.', variant: 'destructive' });
                break;
            case 404:
                toast({ title: 'Not Found', description: 'The requested resource was not found.', variant: 'destructive' });
                break;
            case 500:
                toast({ title: 'Server Error', description: 'An unexpected error occurred. Please try again later.', variant: 'destructive' });
                break;
            default:
                if (!error.response) {
                    toast({ title: 'Network Error', description: 'Please check your internet connection.', variant: 'destructive' });
                } else {
                    toast({ title: 'Error', description: message, variant: 'destructive' });
                }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
