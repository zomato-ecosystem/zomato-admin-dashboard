import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function TicketDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/support/tickets">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ticket {params.id}</h2>
                    <p className="text-muted-foreground">Order Issue • High Priority</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline">Assign</Button>
                    <Button variant="destructive">Close Ticket</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-2">
                                <div className="bg-muted p-3 rounded-lg max-w-[80%] self-start">
                                    <p className="text-sm font-medium">Rahul Gupta (Customer)</p>
                                    <p className="text-sm">My order ORD-001 has not been delivered yet. It's been 2 hours.</p>
                                    <span className="text-xs text-muted-foreground">10:00 AM</span>
                                </div>
                                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%] self-end">
                                    <p className="text-sm font-medium">Support Agent</p>
                                    <p className="text-sm">I apologize for the delay, Rahul. Let me check with the delivery partner.</p>
                                    <span className="text-xs text-primary-foreground/70">10:05 AM</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                                <Textarea placeholder="Type your reply..." className="min-h-[100px]" />
                            </div>
                            <div className="flex justify-end">
                                <Button>
                                    <Send className="mr-2 h-4 w-4" /> Send Reply
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ticket Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="font-medium text-muted-foreground">Status</div>
                                <div><Badge variant="outline">Open</Badge></div>
                                <div className="font-medium text-muted-foreground">Created On</div>
                                <div>Oct 26, 2023</div>
                                <div className="font-medium text-muted-foreground">Customer</div>
                                <div>Rahul Gupta</div>
                                <div className="font-medium text-muted-foreground">Related Order</div>
                                <div className="text-blue-600 underline cursor-pointer">ORD-001</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
