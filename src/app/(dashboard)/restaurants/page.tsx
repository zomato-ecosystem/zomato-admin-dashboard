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
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, PlusCircle, Filter } from "lucide-react";
import { mockRestaurants } from '@/lib/mock-data';
import Link from 'next/link';

export default function RestaurantsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRestaurants = mockRestaurants.filter(res =>
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Pending': return 'warning';
            case 'Suspended': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Restaurants</h2>
                    <p className="text-muted-foreground">Manage partners, approvals, and performance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Link href="/restaurants/new">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Restaurant
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search restaurants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
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
                        {filteredRestaurants.map((res) => (
                            <TableRow key={res.id}>
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
                                            <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
