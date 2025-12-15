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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, User, Bike, Store, Download } from "lucide-react";
import Link from 'next/link';
import { mockCustomers, mockDeliveryPartners, mockRestaurantPartners } from '@/lib/mock-data';

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filterData = (data: any[]) => {
        return data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.includes(searchTerm)
        );
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Verified': return 'success';
            case 'Pending': return 'warning';
            case 'Blocked': return 'destructive';
            default: return 'secondary';
        }
    };

    const UserTable = ({ data, type }: { data: any[], type: 'customer' | 'delivery-partner' | 'restaurant-partner' }) => (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registered On</TableHead>
                        {type === 'customer' && <TableHead>Total Orders</TableHead>}
                        {type === 'delivery-partner' && <TableHead>Verification</TableHead>}
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <Link href={`/users/${type}/${user.id}`} className="hover:underline text-primary">
                                    {user.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                    <span className="text-xs text-muted-foreground">{user.phone}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                {type === 'customer' ? 'Customer' :
                                    type === 'delivery-partner' ? 'Delivery Partner' : 'Restaurant Partner'}
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(user.status) as any}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>{user.registeredOn}</TableCell>
                            {type === 'customer' && <TableCell>{user.totalOrders}</TableCell>}
                            {type === 'delivery-partner' && <TableCell><Badge variant="outline">{user.verificationStatus}</Badge></TableCell>}
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
                                            <Link href={`/users/${type}/${user.id}`} className="w-full">View Details</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage customers, delivery partners, and restaurant partners.</p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export List
                </Button>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            <Tabs defaultValue="customers" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="customers" className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Customers
                    </TabsTrigger>
                    <TabsTrigger value="delivery" className="flex items-center gap-2">
                        <Bike className="h-4 w-4" /> Delivery Partners
                    </TabsTrigger>
                    <TabsTrigger value="restaurants" className="flex items-center gap-2">
                        <Store className="h-4 w-4" /> Restaurant Partners
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="customers">
                    <UserTable data={filterData(mockCustomers)} type="customer" />
                </TabsContent>
                <TabsContent value="delivery">
                    <UserTable data={filterData(mockDeliveryPartners)} type="delivery-partner" />
                </TabsContent>
                <TabsContent value="restaurants">
                    <UserTable data={filterData(mockRestaurantPartners)} type="restaurant-partner" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
