import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, SearchX } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="p-4 bg-muted rounded-full mb-6">
                <SearchX className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md text-center">
                Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.
            </p>
            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="default">
                        Go to Dashboard
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </Link>
            </div>
        </div>
    )
}
