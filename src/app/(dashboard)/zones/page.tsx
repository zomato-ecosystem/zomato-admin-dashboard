import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockZones } from "@/lib/mock-data";
import { Plus, MapPin, Utensils, Bike, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ZonesPage() {
    const activeZones = mockZones.filter(z => z.status === "Active");
    const totalOrders = mockZones.reduce((acc, z) => acc + z.ordersToday, 0);
    const totalRevenue = mockZones.reduce((acc, z) => acc + z.revenueToday, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Zones & Logistics</h2>
                    <p className="text-muted-foreground">Manage delivery zones and logistics settings.</p>
                </div>
                <Button asChild>
                    <Link href="/zones/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Zone
                    </Link>
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
                        <MapPin className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{activeZones.length}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
                        <Utensils className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{mockZones.reduce((acc, z) => acc + z.activeRestaurants, 0)}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
                        <Bike className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{mockZones.reduce((acc, z) => acc + z.activePartners, 0)}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div></CardContent>
                </Card>
            </div>

            {/* Zone Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockZones.map((zone) => (
                    <Card key={zone.id} className={zone.status === "Inactive" ? "opacity-60" : ""}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{zone.name}</CardTitle>
                                <Badge variant={zone.status === "Active" ? "default" : "secondary"}>{zone.status}</Badge>
                            </div>
                            <CardDescription>{zone.id}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Utensils className="h-4 w-4 text-muted-foreground" />
                                    <span>{zone.activeRestaurants} Restaurants</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bike className="h-4 w-4 text-muted-foreground" />
                                    <span>{zone.activePartners} Partners</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{zone.avgDeliveryTime} min avg</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span>₹{zone.deliveryFee} fee</span>
                                </div>
                            </div>
                            {zone.surgePricing && (
                                <Badge variant="outline" className="text-orange-600 border-orange-300">Surge Pricing Active</Badge>
                            )}
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`/zones/${zone.id}`}>Manage Zone</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
