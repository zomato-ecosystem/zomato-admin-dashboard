import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryProvider>
            <WebSocketProvider>
                <div className="flex min-h-screen bg-background text-foreground font-sans">
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
                        <Header />
                        <main className="flex-1 p-6 overflow-y-auto bg-muted/20">
                            {children}
                        </main>
                    </div>
                </div>
                <Toaster />
            </WebSocketProvider>
        </QueryProvider>
    );
}
