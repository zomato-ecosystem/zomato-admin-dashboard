import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, Bike, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { mockDeliveryPartners } from "@/lib/mock-data";

export default async function DeliveryPartnerDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const partner = mockDeliveryPartners.find(dp => dp.id === id) || mockDeliveryPartners[0];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/users">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tight">{partner.name}</h2>
                        <Badge variant="outline" className="border-primary text-primary">{partner.currentZone}</Badge>
                        <Badge variant={partner.status === 'Active' ? 'success' : 'warning' as any}>{partner.status}</Badge>
                    </div>
                </div>
                {partner.verificationStatus === 'Pending Documents' && (
                    <Button className="bg-green-600 hover:bg-green-700">Verify Documents</Button>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{partner.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{partner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Verification: {partner.verificationStatus}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Bike className="h-4 w-4 text-muted-foreground" />
                            <span>{partner.vehicleType} - {partner.vehicleNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>DL: {partner.dlNumber}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Rating</span>
                            <span className="font-bold">{partner.rating} / 5.0</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Total Deliveries</span>
                            <span className="font-bold">{partner.totalDeliveries}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Total Earnings</span>
                            <span className="font-bold text-green-600">₹{partner.earnings.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
