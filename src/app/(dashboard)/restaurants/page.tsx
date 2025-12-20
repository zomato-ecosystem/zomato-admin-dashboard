'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, Filter } from "lucide-react";
import { mockRestaurants } from '@/lib/mock-data';
import Link from 'next/link';
import { RestaurantsTable } from '@/components/restaurants/RestaurantsTable';

export default function RestaurantsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRestaurants = mockRestaurants.filter(res =>
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeRestaurants = filteredRestaurants.filter(r => r.status === 'Active');
    const pendingRestaurants = filteredRestaurants.filter(r => r.status === 'Pending');

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

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Restaurants</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="pending">Pending Approvals <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">{pendingRestaurants.length}</span></TabsTrigger>
                </TabsList>

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

                <TabsContent value="all" className="space-y-4">
                    <RestaurantsTable restaurants={filteredRestaurants} />
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                    <RestaurantsTable restaurants={activeRestaurants} />
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    <RestaurantsTable restaurants={pendingRestaurants} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
