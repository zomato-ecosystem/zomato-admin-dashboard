"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Wand2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreatePromoPage() {
    const [promoCode, setPromoCode] = useState("");

    const generateCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPromoCode(result);
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/promos"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Promo</h2>
                    <p className="text-muted-foreground">Set up a new promotional code.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Promo Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Promo Code</Label>
                            <div className="flex gap-2">
                                <Input id="code" placeholder="e.g., SUMMER20" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} className="font-mono" />
                                <Button variant="outline" size="icon" onClick={generateCode}><Wand2 className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="e.g., 20% off on all orders" />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label>Discount Type</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="flat">Flat Amount</SelectItem>
                                    <SelectItem value="free-delivery">Free Delivery</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="discount">Discount Value</Label>
                            <Input id="discount" type="number" placeholder="e.g., 20" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="maxDiscount">Max Discount (₹)</Label>
                            <Input id="maxDiscount" type="number" placeholder="e.g., 150" />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="minOrder">Min Order Value (₹)</Label>
                            <Input id="minOrder" type="number" placeholder="e.g., 200" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="usageLimit">Total Usage Limit</Label>
                            <Input id="usageLimit" type="number" placeholder="e.g., 1000" />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="validFrom">Valid From</Label>
                            <Input id="validFrom" type="datetime-local" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="validUntil">Valid Until</Label>
                            <Input id="validUntil" type="datetime-local" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label>First Order Only</Label>
                            <p className="text-sm text-muted-foreground">Restrict this promo to new customers.</p>
                        </div>
                        <Switch />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" asChild><Link href="/promos">Cancel</Link></Button>
                        <Button>Create Promo</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
