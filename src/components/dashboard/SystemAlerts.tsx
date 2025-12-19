import { AlertTriangle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SystemAlerts() {
    return (
        <div className="space-y-4">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>High Server Load</AlertTitle>
                <AlertDescription>
                    Traffic has increased by 45% in the last hour.
                </AlertDescription>
            </Alert>
            <Alert>
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <AlertTitle>Payment Gateway</AlertTitle>
                <AlertDescription>
                    3 failed transactions detected in the last 10 mins.
                </AlertDescription>
            </Alert>
        </div>
    );
}
