import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-lg font-medium">Loading...</h2>
        <p className="text-sm text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}
