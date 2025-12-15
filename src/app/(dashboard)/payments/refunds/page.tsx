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
import { mockRefunds } from '@/lib/mock-data';

export default function RefundsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Refunds</h2>
                <p className="text-muted-foreground">Manage refund requests and processed refunds.</p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Refund ID</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRefunds.map((refund) => (
                            <TableRow key={refund.id}>
                                <TableCell className="font-medium">{refund.id}</TableCell>
                                <TableCell>{refund.orderId}</TableCell>
                                <TableCell>{refund.customerName}</TableCell>
                                <TableCell>₹{refund.amount}</TableCell>
                                <TableCell>{refund.reason}</TableCell>
                                <TableCell>
                                    <Badge variant={refund.status === 'Processed' ? 'success' : 'warning' as any}>{refund.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {refund.status === 'Pending' ? (
                                        <Button size="sm">Process</Button>
                                    ) : (
                                        <Button size="sm" variant="outline" disabled>Processed</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
