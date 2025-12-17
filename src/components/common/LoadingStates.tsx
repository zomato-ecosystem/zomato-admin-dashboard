import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function TableSkeleton() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-4 w-[150px]" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-[150px]" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-[150px]" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-[150px]" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="h-4 w-[200px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[200px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[200px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[200px]" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export function CardSkeleton() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="p-6 pt-0">
                <Skeleton className="h-8 w-[60px] mb-1" />
                <Skeleton className="h-3 w-[120px]" />
            </div>
        </div>
    )
}

export function FormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-10 w-[120px]" />
        </div>
    )
}
