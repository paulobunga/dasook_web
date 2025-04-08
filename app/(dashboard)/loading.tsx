import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h2 className="text-lg font-medium">Loading...</h2>
        <p className="text-sm text-muted-foreground">Preparing your dashboard</p>
      </div>
    </div>
  )
}
