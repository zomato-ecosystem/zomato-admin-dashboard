import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
    title: string
    description: string
    icon: LucideIcon
    action?: React.ReactNode
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg animate-in fade-in-50">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 mb-4">
                <Icon className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto mb-6">
                {description}
            </p>
            {action}
        </div>
    )
}
