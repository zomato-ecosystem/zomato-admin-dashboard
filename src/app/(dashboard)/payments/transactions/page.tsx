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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockTransactions } from '@/lib/mock-data';

export default function TransactionsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                <p className="text-muted-foreground">Ledger of all incoming and outgoing transactions.</p>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-8" />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTransactions.map((txn) => (
                            <TableRow key={txn.id}>
                                <TableCell className="font-medium">{txn.id}</TableCell>
                                <TableCell>{txn.orderId}</TableCell>
                                <TableCell>{txn.customerName}</TableCell>
                                <TableCell>₹{txn.amount}</TableCell>
                                <TableCell>{txn.paymentMethod}</TableCell>
                                <TableCell>
                                    <Badge variant={txn.status === 'Success' ? 'success' : txn.status === 'Refunded' ? 'secondary' : 'warning' as any}>{txn.status}</Badge>
                                </TableCell>
                                <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
