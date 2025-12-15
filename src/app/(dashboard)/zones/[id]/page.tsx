import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, MapPin, Clock, TrendingUp, Utensils, Bike, Zap } from "lucide-react";
import Link from "next/link";

export default function ZoneDetailPage({ params }: { params: { id: string } }) {
    // In real app, fetch zone by ID
    const zone = {
        id: params.id,
        name: "South Delhi",
        status: "Active",
        activeRestaurants: 45,
        activePartners: 120,
        avgDeliveryTime: 28,
        deliveryFee: 30,
        minOrderValue: 150,
        maxDeliveryDistance: 8,
        surgePricing: true,
        peakHours: ["12:00-14:00", "19:00-22:00"],
        ordersToday: 850,
        revenueToday: 425000,
        peakMultiplier: 1.5
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/zones"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{zone.name}</h2>
                    <p className="text-muted-foreground">{zone.id}</p>
                </div>
                <Badge className="ml-2" variant={zone.status === "Active" ? "default" : "secondary"}>{zone.status}</Badge>
                <div className="ml-auto">
                    <Button><Edit className="mr-2 h-4 w-4" />Edit Zone</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{zone.ordersToday}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">₹{zone.revenueToday.toLocaleString()}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Delivery</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{zone.avgDeliveryTime} min</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Partner Utilization</CardTitle>
                        <Bike className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">78%</div></CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Delivery Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery Fee</span><span>₹{zone.deliveryFee}</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Min Order Value</span><span>₹{zone.minOrderValue}</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Max Delivery Distance</span><span>{zone.maxDeliveryDistance} km</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Surge Pricing</span><Badge variant={zone.surgePricing ? "default" : "secondary"}>{zone.surgePricing ? "Enabled" : "Disabled"}</Badge></div>
                    </CardContent>
                </Card>

                {/* Peak Hours */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" />Peak Hours</CardTitle>
                        <CardDescription>Surge multiplier: {zone.peakMultiplier}x</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {zone.peakHours.map((hour) => (
                                <Badge key={hour} variant="outline">{hour}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Coverage */}
            <Card>
                <CardHeader>
                    <CardTitle>Zone Coverage</CardTitle>
                    <CardDescription>Map placeholder - requires Mapbox token for interactive boundary editing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-dashed">
                        <div className="text-center text-muted-foreground">
                            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Zone Boundary Map</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
