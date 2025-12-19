"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center border rounded-lg bg-red-50/50">
                    <div className="p-3 bg-red-100 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-red-900 mb-2">Something went wrong!</h2>
                    <p className="text-red-700 mb-6 max-w-md">
                        We encountered an unexpected error while rendering this component.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => this.setState({ hasError: false })}
                            className="border-red-200 text-red-800 hover:bg-red-100"
                        >
                            Try again
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Reload Page
                        </Button>
                    </div>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre className="mt-8 p-4 bg-black/80 text-white rounded text-left text-xs overflow-auto max-w-2xl max-h-40">
                            {this.state.error.toString()}
                        </pre>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}
