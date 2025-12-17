'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

    return (
        <div className="min-h-screen bg-gray-50 shadow-sm">
            {/* Sidebar */}
            {/* Desktop Sidebar */}
            <Sidebar isOpen={isSidebarOpen} />

            {/* Main Content */}
            <div className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
                }`}>
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 p-4 lg:p-8 bg-gray-50 overflow-x-hidden">
                    {children}
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
