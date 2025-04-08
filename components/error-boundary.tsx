"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })

    // Here you could send the error to your error reporting service
    // Example: reportError(error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/20">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-sm text-muted-foreground">There was an error rendering this component</p>
            {this.state.error && (
              <div className="mt-2 max-h-40 overflow-auto rounded bg-muted p-2 text-left text-xs">
                <p className="font-mono">{this.state.error.toString()}</p>
              </div>
            )}
          </div>
          <Button onClick={this.handleReset} className="mt-4 inline-flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
