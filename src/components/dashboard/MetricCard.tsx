import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    trendDirection: 'up' | 'down';
    icon: LucideIcon;
    description?: string;
}

export function MetricCard({ title, value, trend, trendDirection, icon: Icon, description }: MetricCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <span className={cn(
                        "flex items-center font-medium mr-1",
                        trendDirection === 'up' ? "text-green-600" : "text-red-600"
                    )}>
                        {trendDirection === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {trend}
                    </span>
                    {description || "from last month"}
                </p>
            </CardContent>
        </Card>
    );
}
