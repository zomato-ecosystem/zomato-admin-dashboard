import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function RestaurantOverview({ restaurant }: { restaurant: any }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Partner Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Partner Name</p>
                            <p>{restaurant.partnerName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
                            <p>{restaurant.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                            <p>{restaurant.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
                            <p>{restaurant.activeSince}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">FSSAI License</p>
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-sm">{restaurant.fssai}</p>
                            {restaurant.fssai !== 'Pending' && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Verified</Badge>}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">GSTIN</p>
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-sm">{restaurant.gst}</p>
                            {restaurant.gst !== 'Pending' && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Verified</Badge>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
