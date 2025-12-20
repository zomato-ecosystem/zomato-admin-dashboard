import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function DisputeDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/support/disputes">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dispute {params.id}</h2>
                    <p className="text-muted-foreground">Wrong Item Delivered</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        <CheckCircle className="mr-2 h-4 w-4" /> Approve Refund
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        <XCircle className="mr-2 h-4 w-4" /> Reject Dispute
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Dispute Information</CardTitle>
                        <CardDescription>Details regarding the claim.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="font-medium text-muted-foreground">Status</div>
                            <div><Badge variant="destructive">Open</Badge></div>
                            <div className="font-medium text-muted-foreground">Order ID</div>
                            <div className="font-mono">ORD-012</div>
                            <div className="font-medium text-muted-foreground">Type</div>
                            <div>Wrong Item Delivered</div>
                            <div className="font-medium text-muted-foreground">Amount Claimed</div>
                            <div>₹350</div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-medium mb-2">Parties Involved</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li>Simran Kaur (Customer)</li>
                                <li>Pizza Hut (Restaurant)</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Evidence Submitted</CardTitle>
                        <CardDescription>Photos and documents provided by the claimant.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 border border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-muted/50 h-[200px]">
                            <FileText className="h-8 w-8 mb-2" />
                            <p className="text-sm">Evidence Preview (Placeholder)</p>
                            <p className="text-xs">Photo_of_pizza.jpg</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
