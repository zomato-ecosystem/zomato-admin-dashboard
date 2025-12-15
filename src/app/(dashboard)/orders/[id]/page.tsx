import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderTimeline } from "@/components/dashboard/orders/OrderTimeline";
import { OrderMap } from "@/components/dashboard/orders/OrderMap";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { mockOrders } from "@/lib/mock-data";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, strict fetching would involve awaiting params
    const { id } = await params;
    const order = mockOrders.find(o => o.id === id) || mockOrders[0];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/orders">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tight">Order {order.id}</h2>
                        <Badge variant="warning">{order.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="destructive">Cancel Order</Button>
                    <Button>Assign Driver</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-0 border-border">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs font-medium">
                                                {item.quantity}x
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">Special instructions if any</p>
                                            </div>
                                        </div>
                                        <div className="font-semibold text-sm">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                                <div className="pt-4 flex flex-col gap-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{order.amount - 50}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span>₹50</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                                        <span>Total</span>
                                        <span className="text-primary">₹{order.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Live Tracking</CardTitle>
                            <CardDescription>Real-time delivery partner location</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrderMap />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {order.customer.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{order.customer.name}</p>
                                    <p className="text-xs text-muted-foreground">Frequent customer</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{order.customer.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{order.customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>Home Address</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OrderTimeline />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Partner</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.deliveryPartner ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold">
                                            {order.deliveryPartner.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{order.deliveryPartner.name}</p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                <p className="text-xs text-muted-foreground">{order.deliveryPartner.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Phone className="h-3 w-3 mr-2" />
                                            Call
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-muted-foreground mb-4">No partner assigned</p>
                                    <Button className="w-full">Assign Now</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

