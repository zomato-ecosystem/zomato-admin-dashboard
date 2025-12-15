"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

export default function CreateZonePage() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/zones"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Zone</h2>
                    <p className="text-muted-foreground">Define a new delivery zone.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Zone Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Zone Name</Label>
                        <Input id="name" placeholder="e.g., South Delhi" />
                    </div>

                    {/* Map Placeholder for Drawing Zone */}
                    <div>
                        <Label>Zone Boundary</Label>
                        <div className="mt-2 h-[300px] bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-dashed">
                            <div className="text-center text-muted-foreground">
                                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>Draw zone on map</p>
                                <p className="text-xs">(Requires Mapbox token)</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="fee">Delivery Fee (₹)</Label>
                            <Input id="fee" type="number" placeholder="e.g., 30" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="minOrder">Min Order Value (₹)</Label>
                            <Input id="minOrder" type="number" placeholder="e.g., 150" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="maxDistance">Max Distance (km)</Label>
                            <Input id="maxDistance" type="number" placeholder="e.g., 10" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>Enable Surge Pricing</Label>
                            <p className="text-sm text-muted-foreground">Apply dynamic pricing during peak hours.</p>
                        </div>
                        <Switch />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="peakHours">Peak Hours (comma-separated)</Label>
                        <Input id="peakHours" placeholder="e.g., 12:00-14:00, 19:00-22:00" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild><Link href="/zones">Cancel</Link></Button>
                        <Button>Create Zone</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
