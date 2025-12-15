import { CheckCircle2, Circle, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
    { status: 'Order Placed', time: '10:30 AM', icon: Circle, active: true },
    { status: 'Confirmed', time: '10:35 AM', icon: CheckCircle2, active: true },
    { status: 'Preparing', time: '10:45 AM', icon: Clock, active: true },
    { status: 'Out for Delivery', time: '11:10 AM', icon: Truck, active: true, current: true },
    { status: 'Delivered', time: 'Est. 11:30 AM', icon: CheckCircle2, active: false },
];

export function OrderTimeline() {
    return (
        <div className="relative border-l border-muted ml-4 space-y-8 pb-4">
            {timelineEvents.map((event, index) => (
                <div key={index} className="relative pl-8">
                    <span className={cn(
                        "absolute -left-[9px] top-1 h-4 w-4 rounded-full border bg-background",
                        event.active ? "border-primary bg-primary" : "border-muted-foreground",
                        event.current && "ring-4 ring-primary/20"
                    )} />
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-sm font-medium leading-none",
                            event.active ? "text-foreground" : "text-muted-foreground"
                        )}>
                            {event.status}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            {event.time}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
