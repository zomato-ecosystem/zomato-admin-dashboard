import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { mockRestaurants } from "@/lib/mock-data";
import { RestaurantOverview } from "@/components/dashboard/restaurants/RestaurantOverview";
import { RestaurantMenu } from "@/components/dashboard/restaurants/RestaurantMenu";
import { RestaurantStats } from "@/components/restaurants/RestaurantStats";
import { RestaurantAnalytics } from "@/components/restaurants/RestaurantAnalytics";
import { MenuVerification } from "@/components/restaurants/MenuVerification";
import { DocumentApproval } from "@/components/restaurants/DocumentApproval";

export default async function RestaurantDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const restaurant = mockRestaurants.find(r => r.id === id) || mockRestaurants[0];

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Pending': return 'warning';
            case 'Suspended': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/restaurants">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tight">{restaurant.name}</h2>
                        <Badge variant={getStatusVariant(restaurant.status) as any}>{restaurant.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{restaurant.location}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {restaurant.status === 'Pending' && (
                        <>
                            <Button variant="destructive">Reject</Button>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                        </>
                    )}
                    {restaurant.status === 'Active' && (
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Suspend</Button>
                    )}
                    <Button variant="secondary">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                    </Button>
                </div>
            </div>

            <RestaurantStats />

            <Tabs defaultValue="menu" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="menu">Menu & Products</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <RestaurantOverview restaurant={restaurant} />
                </TabsContent>

                <TabsContent value="menu" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <RestaurantMenu />
                        </div>
                        <div>
                            <MenuVerification />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                    <DocumentApproval />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <RestaurantAnalytics />
                </TabsContent>

                <TabsContent value="settings">
                    <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                        Settings Form (Coming Soon)
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
