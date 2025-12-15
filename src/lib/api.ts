import axios from 'axios';

// Client-side API instance (calls Next.js API routes for auth, or Backend directly for data)
// For Auth: call /api/auth/* (Next.js) to handle cookies
// For Data: call /api/* (Next.js proxy) or direct if CORS allows. 
// Let's assume we proxy everything or call direct. 
// Given the requirement for httpOnly cookies, we'll mostly use Server Actions or Route Handlers for data fetching 
// or pass the cookie from Next.js Server to Backend. 
// For simplicity in this dashboard, the client accesses /api/auth routes.

export const apiClient = axios.create({
    baseURL: '/api', // Relative to Next.js server
    headers: {
        'Content-Type': 'application/json',
    },
});

export const backendClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
