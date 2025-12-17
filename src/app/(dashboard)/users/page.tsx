'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bike, Store, Download, MoreHorizontal } from "lucide-react";
import { mockCustomers, mockDeliveryPartners, mockRestaurantPartners } from '@/lib/mock-data';
// import { UsersTable } from '@/components/users/UsersTable'; // Deprecated
import { UsersFilter } from '@/components/users/UsersFilter';
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { DetailSheet } from "@/components/common/DetailSheet";
import { NewUserWizard } from "@/components/users/NewUserWizard";
import { useToast } from "@/components/ui/use-toast";


export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false)
    const { toast } = useToast()

    const handleBlockUser = () => {
        setIsBlockConfirmOpen(false)
        toast({
            title: "User Blocked",
            description: `${selectedUser?.name} has been blocked successfully.`,
            variant: "destructive"
        })
        setSelectedUser(null)
    }

    // Define columns here to access state handlers
    const customerColumns: ColumnDef<any>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => <div className="font-medium cursor-pointer hover:underline" onClick={() => {
                setSelectedUser(row.original)
                setIsDetailOpen(true)
            }}>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="text-muted-foreground">{row.getValue("status") || "Active"}</div>
            )
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.id)}
                            >
                                Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                setSelectedUser(user)
                                setIsDetailOpen(true)
                            }}>View details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => {
                                setSelectedUser(user)
                                setIsBlockConfirmOpen(true)
                            }}>Block user</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage customers, delivery partners, and restaurant partners.</p>
                </div>
                <div className="flex items-center gap-2">
                    <NewUserWizard />
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export List
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="customers" className="space-y-4">
                <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                    <TabsList className="bg-transparent p-0">
                        <TabsTrigger value="customers" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700 flex items-center gap-2 px-4">
                            <User className="h-4 w-4" /> Customers
                        </TabsTrigger>
                        <TabsTrigger value="delivery" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 flex items-center gap-2 px-4">
                            <Bike className="h-4 w-4" /> Delivery Partners
                        </TabsTrigger>
                        <TabsTrigger value="restaurants" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 flex items-center gap-2 px-4">
                            <Store className="h-4 w-4" /> Restaurant Partners
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="customers">
                    {/* Replaced manual filter/table with DataTable */}
                    <DataTable columns={customerColumns} data={mockCustomers} />
                </TabsContent>
                <TabsContent value="delivery">
                    <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                        Legacy table view (Implement DataTable here next)
                    </div>
                </TabsContent>
                <TabsContent value="restaurants">
                    <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                        Legacy table view (Implement DataTable here next)
                    </div>
                </TabsContent>
            </Tabs>

            {/* Confirmation Dialog for Block Action */}
            <ConfirmationDialog
                open={isBlockConfirmOpen}
                onOpenChange={setIsBlockConfirmOpen}
                title="Block User?"
                description={`Are you sure you want to block ${selectedUser?.name}? This action will prevent them from logging in.`}
                confirmText="Block User"
                variant="destructive"
                onConfirm={handleBlockUser}
            />

            {/* Detail Sheet for Viewing User */}
            <DetailSheet
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
                title="User Details"
                description={`Viewing details for ${selectedUser?.name}`}
            >
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500">
                                {selectedUser.name.charAt(0)}
                            </div>
                        </div>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Name:</span>
                                <span className="col-span-3">{selectedUser.name}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Email:</span>
                                <span className="col-span-3">{selectedUser.email}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Phone:</span>
                                <span className="col-span-3">{selectedUser.phone}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Status:</span>
                                <span className="col-span-3">
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800">
                                        {selectedUser.status || "Active"}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium leading-none border-b pb-2">Recent Activity</h4>
                            <div className="text-sm text-muted-foreground">
                                No recent activity found for this user.
                            </div>
                        </div>
                    </div>
                )}
            </DetailSheet>
        </div>
    );
}
