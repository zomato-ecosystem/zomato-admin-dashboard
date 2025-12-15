import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Copy, TrendingUp, Users, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function PromoDetailPage({ params }: { params: { id: string } }) {
    // In real app, fetch promo by ID
    const promo = {
        id: params.id,
        code: "WELCOME50",
        description: "50% off on first order",
        type: "Percentage",
        discountValue: 50,
        maxDiscount: 150,
        minOrderValue: 200,
        usageLimit: 1000,
        usedCount: 450,
        validFrom: "2023-10-01",
        validUntil: "2023-12-31",
        status: "Active",
        applicableTo: "New Customers",
        totalDiscountGiven: 67500,
        revenueGenerated: 225000
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/promos"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight font-mono">{promo.code}</h2>
                    <p className="text-muted-foreground">{promo.description}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" />Copy Code</Button>
                    <Button size="sm"><Edit className="mr-2 h-4 w-4" />Edit Promo</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{promo.usedCount}</div>
                        <p className="text-xs text-muted-foreground">of {promo.usageLimit} limit</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Discount Given</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{promo.totalDiscountGiven.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{promo.revenueGenerated.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Promo Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><Badge>{promo.status}</Badge></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Type</span><span>{promo.type}</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Discount</span><span>{promo.discountValue}% (Max ₹{promo.maxDiscount})</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Min Order</span><span>₹{promo.minOrderValue}</span></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Valid From</span><span>{promo.validFrom}</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Valid Until</span><span>{promo.validUntil}</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Applicable To</span><span>{promo.applicableTo}</span></div>
                        <Separator />
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Usage Limit</span><span>{promo.usageLimit}</span></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
