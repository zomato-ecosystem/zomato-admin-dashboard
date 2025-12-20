import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPromos } from "@/lib/mock-data";
import { Search, Plus, Ticket, Percent } from "lucide-react";
import Link from "next/link";

const PromoTable = ({ promos }: { promos: typeof mockPromos }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min Order</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {promos.map((promo) => (
                <TableRow key={promo.id}>
                    <TableCell className="font-mono font-medium">{promo.code}</TableCell>
                    <TableCell>{promo.description}</TableCell>
                    <TableCell>{promo.type}</TableCell>
                    <TableCell>
                        {promo.type === "Percentage" ? `${promo.discountValue}%` : promo.type === "Flat" ? `₹${promo.discountValue}` : "N/A"}
                    </TableCell>
                    <TableCell>₹{promo.minOrderValue}</TableCell>
                    <TableCell>{promo.usedCount}/{promo.usageLimit}</TableCell>
                    <TableCell>{new Date(promo.validUntil).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Badge variant={promo.status === "Active" ? "default" : promo.status === "Scheduled" ? "secondary" : "outline"}>
                            {promo.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/promos/${promo.id}`}>View</Link>
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default function PromosPage() {
    const activePromos = mockPromos.filter(p => p.status === "Active");
    const scheduledPromos = mockPromos.filter(p => p.status === "Scheduled");
    const expiredPromos = mockPromos.filter(p => p.status === "Expired");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Promos & Coupons</h2>
                    <p className="text-muted-foreground">Manage promotional codes and discounts.</p>
                </div>
                <Button asChild>
                    <Link href="/promos/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Promo
                    </Link>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Promos</CardTitle>
                        <Ticket className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activePromos.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Scheduled Promos</CardTitle>
                        <Ticket className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{scheduledPromos.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
                        <Percent className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockPromos.reduce((acc, p) => acc + p.usedCount, 0)}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="active" className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="active">Active ({activePromos.length})</TabsTrigger>
                        <TabsTrigger value="scheduled">Scheduled ({scheduledPromos.length})</TabsTrigger>
                        <TabsTrigger value="expired">Expired ({expiredPromos.length})</TabsTrigger>
                    </TabsList>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search promos..." className="pl-8 w-[250px]" />
                    </div>
                </div>

                <TabsContent value="active">
                    <Card><CardContent className="p-0"><PromoTable promos={activePromos} /></CardContent></Card>
                </TabsContent>
                <TabsContent value="scheduled">
                    <Card><CardContent className="p-0"><PromoTable promos={scheduledPromos} /></CardContent></Card>
                </TabsContent>
                <TabsContent value="expired">
                    <Card><CardContent className="p-0"><PromoTable promos={expiredPromos} /></CardContent></Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
