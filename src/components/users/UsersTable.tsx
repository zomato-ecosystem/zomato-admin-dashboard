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
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface UsersTableProps {
    data: any[];
    type: 'customer' | 'delivery-partner' | 'restaurant-partner';
    onUserSelect: (user: any) => void;
}

export function UsersTable({ data, type, onUserSelect }: UsersTableProps) {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'success'; // Ensure these variants exist in your Badge component or map to 'default'/'secondary' etc
            case 'Verified': return 'success';
            case 'Pending': return 'warning';
            case 'Blocked': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="rounded-md border bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registered</TableHead>
                        {type === 'customer' && <TableHead>Orders</TableHead>}
                        {type === 'delivery-partner' && <TableHead>Verification</TableHead>}
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                No users found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50/50">
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-900 hover:underline cursor-pointer" onClick={() => onUserSelect(user)}>
                                            {user.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-600">{user.email}</span>
                                        <span className="text-xs text-gray-500">{user.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600 text-sm">
                                    {type === 'customer' ? 'Customer' :
                                        type === 'delivery-partner' ? 'Delivery Partner' : 'Owner'}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(user.status) as any} className="text-[10px] uppercase font-bold tracking-wider">
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">{user.registeredOn}</TableCell>
                                {type === 'customer' && <TableCell className="text-sm font-medium">{user.totalOrders}</TableCell>}
                                {type === 'delivery-partner' && (
                                    <TableCell>
                                        <Badge variant="outline" className={user.verificationStatus === 'Verified' ? 'border-green-200 text-green-700 bg-green-50' : 'bg-gray-50'}>
                                            {user.verificationStatus}
                                        </Badge>
                                    </TableCell>
                                )}
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onUserSelect(user)}>
                                                <Eye className="w-4 h-4 mr-2" /> View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive font-medium">
                                                Block {user.name}
                                            </DropdownMenuItem>
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
