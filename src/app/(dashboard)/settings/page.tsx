import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "@/components/dashboard/settings/GeneralSettings";
import { AdminUsersSettings } from "@/components/dashboard/settings/AdminUsersSettings";
import { SystemLogsSettings } from "@/components/dashboard/settings/SystemLogsSettings";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your platform preferences.</p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="bg-white">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="platform">Platform</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="admins">Admin Users</TabsTrigger>
                    <TabsTrigger value="logs">System Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <GeneralSettings />
                </TabsContent>

                <TabsContent value="admins">
                    <AdminUsersSettings />
                </TabsContent>

                <TabsContent value="logs">
                    <SystemLogsSettings />
                </TabsContent>

                {/* Placeholders for other sections */}
                <TabsContent value="platform">
                    <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-white">Platform Settings Module</div>
                </TabsContent>
                <TabsContent value="payment">
                    <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-white">Payment Settings Module</div>
                </TabsContent>
                <TabsContent value="notifications">
                    <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-white">Notification Settings Module</div>
                </TabsContent>
                <TabsContent value="security">
                    <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-white">Security Settings Module</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
