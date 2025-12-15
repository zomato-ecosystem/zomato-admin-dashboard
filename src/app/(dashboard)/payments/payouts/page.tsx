'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPayouts } from '@/lib/mock-data';

export default function PayoutsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
                <p className="text-muted-foreground">Settlements for Restaurant Partners and Delivery Partners.</p>
            </div>

            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All Payouts</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="processed">Processed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <div className="rounded-md border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Payout ID</TableHead>
                                    <TableHead>Partner</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockPayouts.map((payout) => (
                                    <TableRow key={payout.id}>
                                        <TableCell className="font-medium">{payout.id}</TableCell>
                                        <TableCell>{payout.partnerName}</TableCell>
                                        <TableCell>{payout.type}</TableCell>
                                        <TableCell>{payout.period}</TableCell>
                                        <TableCell>₹{payout.amount.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={payout.status === 'Processed' ? 'success' : 'warning' as any}>{payout.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {payout.status === 'Pending' ? (
                                                <Button size="sm">Approve</Button>
                                            ) : (
                                                <Button size="sm" variant="outline">View Invoice</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                <TabsContent value="pending">
                    <div className="p-4 text-center text-muted-foreground">Filtered view logic here</div>
                </TabsContent>
                <TabsContent value="processed">
                    <div className="p-4 text-center text-muted-foreground">Filtered view logic here</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
