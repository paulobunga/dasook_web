"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/providers/auth-provider"

export function WelcomeMessage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)
  const { userData } = useAuthContext()

  useEffect(() => {
    // Check if the user has seen the welcome message before
    const hasSeenWelcomeMessage = localStorage.getItem("hasSeenWelcomeMessage")

    if (userData && !hasSeenWelcomeMessage) {
      setIsVisible(true)
      setHasSeenWelcome(false)
    } else {
      setHasSeenWelcome(true)
    }
  }, [userData])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenWelcomeMessage", "true")
  }

  if (!isVisible || hasSeenWelcome || !userData) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Welcome to Dasook, {userData.first_name}!</h3>
              <p className="text-muted-foreground">
                Thank you for joining our platform. We're excited to have you here!
              </p>
              <div className="pt-2">
                <Button size="sm" variant="default" onClick={handleDismiss}>
                  Get Started
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleDismiss} className="-mt-2 -mr-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
