'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function RefundModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Process Manual Refund</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Process Refund</DialogTitle>
                    <DialogDescription>
                        Initiate a full or partial refund for a specific order manually.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="orderId">Order ID</Label>
                        <Input id="orderId" placeholder="e.g., ZOM12345" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Refund Amount (₹)</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea id="reason" placeholder="Customer complaint, Missing items, etc." />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700" onClick={() => setIsOpen(false)}>Process Refund</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
