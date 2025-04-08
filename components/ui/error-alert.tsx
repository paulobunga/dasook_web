import { XCircle, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type ErrorSeverity = "error" | "warning" | "info"

interface ErrorAlertProps {
  title?: string
  message: string
  severity?: ErrorSeverity
  className?: string
}

export function ErrorAlert({ title, message, severity = "error", className }: ErrorAlertProps) {
  const icons = {
    error: <XCircle className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  }

  const variants = {
    error: "destructive",
    warning: "warning",
    info: "info",
  }

  const defaultTitles = {
    error: "Error",
    warning: "Warning",
    info: "Information",
  }

  return (
    <Alert variant={variants[severity] as "destructive" | "default"} className={cn(className)}>
      <div className="flex items-start gap-2">
        {icons[severity]}
        <div>
          <AlertTitle>{title || defaultTitles[severity]}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
