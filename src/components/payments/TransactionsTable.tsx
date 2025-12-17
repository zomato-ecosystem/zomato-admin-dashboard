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
import { Search, Filter, Download } from 'lucide-react';
import { useState } from "react";

const MOCK_TRANSACTIONS = [
    { id: 'TRX-98765', date: '2024-12-16', type: 'Order Payment', amount: 450, status: 'Completed', method: 'UPI' },
    { id: 'TRX-98764', date: '2024-12-16', type: 'Refund', amount: 320, status: 'Completed', method: 'Wallet' },
    { id: 'TRX-98763', date: '2024-12-15', type: 'Payout', amount: 12500, status: 'Processing', method: 'Bank Transfer' },
    { id: 'TRX-98762', date: '2024-12-15', type: 'Order Payment', amount: 890, status: 'Failed', method: 'Credit Card' },
    { id: 'TRX-98761', date: '2024-12-14', type: 'Commission', amount: 45, status: 'Completed', method: 'System' },
];

export function TransactionsTable() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = MOCK_TRANSACTIONS.filter(t =>
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Processing': return 'warning';
            case 'Failed': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search transactions..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((trx) => (
                            <TableRow key={trx.id}>
                                <TableCell className="font-medium">{trx.id}</TableCell>
                                <TableCell>{trx.date}</TableCell>
                                <TableCell>{trx.type}</TableCell>
                                <TableCell>{trx.method}</TableCell>
                                <TableCell className={trx.type === 'Refund' || trx.type === 'Payout' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                                    {trx.type === 'Refund' || trx.type === 'Payout' ? '-' : '+'}₹{trx.amount}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(trx.status) as any}>{trx.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
