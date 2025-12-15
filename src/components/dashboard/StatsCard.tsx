import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
    className?: string;
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change !== undefined && (
                    <p className={cn(
                        "text-xs flex items-center gap-1",
                        isPositive && "text-green-600",
                        isNegative && "text-red-600",
                        !isPositive && !isNegative && "text-muted-foreground"
                    )}>
                        {isPositive && <TrendingUp className="h-3 w-3" />}
                        {isNegative && <TrendingDown className="h-3 w-3" />}
                        {isPositive && "+"}
                        {change}% from last period
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
