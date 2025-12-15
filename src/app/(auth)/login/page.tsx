'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

const loginSchema = z.object({
    email: z.string().min(1, 'Email/Phone is required'), // Relaxed validation to allow phone
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError('');

        try {
            await apiClient.post('/auth/login', data);
            router.push('/dashboard');
            router.refresh(); // Refresh to update middleware state
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg border border-border">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold italic text-primary">zomato</h1>
                    <h2 className="mt-6 text-2xl font-bold text-foreground">Admin Login</h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email or Phone
                            </label>
                            <input
                                id="email"
                                type="text"
                                autoComplete="email"
                                className="relative block w-full rounded-md border border-input bg-background py-3 px-3 text-foreground placeholder:text-muted-foreground focus:z-10 focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm"
                                placeholder="Email or Phone Number"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="relative block w-full rounded-md border border-input bg-background py-3 px-3 text-foreground placeholder:text-muted-foreground focus:z-10 focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm"
                                placeholder="Password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-red-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
