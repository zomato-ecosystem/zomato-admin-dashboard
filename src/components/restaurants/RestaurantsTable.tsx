'use client';

import { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

interface Restaurant {
    id: string;
    name: string;
    location: string;
    status: string;
    rating: number;
    revenue: number;
    activeSince: string;
    cuisine: string[];
}

interface RestaurantsTableProps {
    restaurants: Restaurant[];
    onAction?: (action: string, id: string) => void;
}

export function RestaurantsTable({ restaurants, onAction }: RestaurantsTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(restaurants.map(r => r.id));
        } else {
            setSelectedIds([]);
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Pending': return 'warning';
            case 'Suspended': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={restaurants.length > 0 && selectedIds.length === restaurants.length}
                                onCheckedChange={(c) => toggleSelectAll(c as boolean)}
                            />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Active Since</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {restaurants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                No restaurants found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        restaurants.map((res) => (
                            <TableRow key={res.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(res.id)}
                                        onCheckedChange={() => toggleSelect(res.id)}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <Link href={`/restaurants/${res.id}`} className="hover:underline text-primary">
                                            {res.name}
                                        </Link>
                                        <span className="text-xs text-muted-foreground">{res.cuisine.join(', ')}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{res.location}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(res.status) as any}>{res.status}</Badge>
                                </TableCell>
                                <TableCell>{res.rating > 0 ? res.rating : 'N/A'}</TableCell>
                                <TableCell>₹{res.revenue.toLocaleString()}</TableCell>
                                <TableCell>{res.activeSince}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Link href={`/restaurants/${res.id}`} className="w-full">View Details</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>View Menu</DropdownMenuItem>
                                            {res.status === 'Pending' ? (
                                                <DropdownMenuItem className="text-green-600 font-medium">Approve</DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
