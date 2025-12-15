import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockSystemLogs } from "@/lib/mock-data";

export function SystemLogsSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Audit trail of system activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockSystemLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{log.user}</TableCell>
                                <TableCell className="font-medium">{log.action}</TableCell>
                                <TableCell>{log.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
