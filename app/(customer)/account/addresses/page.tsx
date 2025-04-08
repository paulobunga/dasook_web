"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle, Home, Truck, AlertTriangle, Edit, Trash } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AddressForm } from "@/components/customer/address-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<any>(null)
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const loadAddresses = async () => {
      setLoading(true)
      setError(null)

      if (!supabase) {
        setError("Unable to connect to the database. Please try again later.")
        setLoading(false)
        return
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user) {
          throw new Error("User not authenticated")
        }

        const userId = session.user.id

        const { data, error } = await supabase
          .from("addresses")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })

        if (error) {
          throw new Error("Failed to load addresses: " + error.message)
        }

        setAddresses(data || [])
      } catch (err: any) {
        console.error("Error loading addresses:", err)
        setError(err.message || "Failed to load addresses")
      } finally {
        setLoading(false)
      }
    }

    loadAddresses()
  }, [supabase])

  const handleAddAddress = async (newAddress: any) => {
    try {
      if (!supabase) {
        throw new Error("Unable to connect to the database. Please try again later.")
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        throw new Error("User not authenticated")
      }

      const userId = session.user.id

      const addressData = {
        type: newAddress.type,
        is_default: newAddress.isDefault,
        name: newAddress.name,
        line1: newAddress.line1,
        line2: newAddress.line2,
        city: newAddress.city,
        state: newAddress.state,
        postal_code: newAddress.postalCode,
        country: newAddress.country,
        phone: newAddress.phone,
        user_id: userId,
      }

      const { data, error } = await supabase.from("addresses").insert([addressData]).select().single()

      if (error) {
        throw new Error("Failed to add address: " + error.message)
      }

      setAddresses([...addresses, data])
      setIsAddDialogOpen(false)
      toast({
        title: "Address added",
        description: "Your address has been added successfully.",
      })
    } catch (err: any) {
      console.error("Error adding address:", err)
      setError(err.message || "Failed to add address")
      toast({
        title: "Error",
        description: err.message || "Failed to add address",
        variant: "destructive",
      })
    }
  }

  const handleEditAddress = async (updatedAddress: any) => {
    try {
      if (!supabase) {
        throw new Error("Unable to connect to the database. Please try again later.")
      }

      const { error } = await supabase
        .from("addresses")
        .update({
          type: updatedAddress.type,
          is_default: updatedAddress.isDefault,
          name: updatedAddress.name,
          line1: updatedAddress.line1,
          line2: updatedAddress.line2,
          city: updatedAddress.city,
          state: updatedAddress.state,
          postal_code: updatedAddress.postalCode,
          country: updatedAddress.country,
          phone: updatedAddress.phone,
        })
        .eq("id", updatedAddress.id)

      if (error) {
        throw new Error("Failed to update address: " + error.message)
      }

      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === updatedAddress.id && addr.type === updatedAddress.type,
        })),
      )
      setIsEditDialogOpen(false)
      setCurrentAddress(null)
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } catch (err: any) {
      console.error("Error updating address:", err)
      setError(err.message || "Failed to update address")
      toast({
        title: "Error",
        description: err.message || "Failed to update address",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAddress = async () => {
    if (!supabase || !addressToDelete) return

    try {
      const { error } = await supabase.from("addresses").delete().eq("id", addressToDelete)

      if (error) {
        throw new Error("Failed to delete address: " + error.message)
      }

      setAddresses(addresses.filter((addr) => addr.id !== addressToDelete))
      setAddressToDelete(null)
      toast({
        title: "Address deleted",
        description: "Your address has been deleted successfully.",
      })
    } catch (err: any) {
      console.error("Error deleting address:", err)
      setError(err.message || "Failed to delete address")
      toast({
        title: "Error",
        description: err.message || "Failed to delete address",
        variant: "destructive",
      })
    }
  }

  const handleSetDefault = async (addressId: string, type: "shipping" | "billing") => {
    if (!supabase) {
      setError("Unable to connect to the database. Please try again later.")
      return
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        throw new Error("User not authenticated")
      }

      const userId = session.user.id

      // First, reset all addresses of the same type to is_default = false
      const { error: resetError } = await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", userId)
        .eq("type", type)

      if (resetError) {
        throw new Error("Failed to reset default addresses: " + resetError.message)
      }

      // Then, set the selected address to is_default = true
      const { error: updateError } = await supabase
        .from("addresses")
        .update({ is_default: true })
        .eq("id", addressId)
        .eq("user_id", userId)

      if (updateError) {
        throw new Error("Failed to set default address: " + updateError.message)
      }

      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId && addr.type === type,
        })),
      )
      toast({
        title: "Default address updated",
        description: "Your default address has been updated successfully.",
      })
    } catch (err: any) {
      console.error("Error setting default address:", err)
      setError(err.message || "Failed to set default address")
      toast({
        title: "Error",
        description: err.message || "Failed to set default address",
        variant: "destructive",
      })
    }
  }

  const shippingAddresses = addresses.filter((addr) => addr.type === "shipping")
  const billingAddresses = addresses.filter((addr) => addr.type === "billing")

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your addresses...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Addresses</h1>
          <p className="text-muted-foreground">Manage your shipping and billing addresses</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Enter the details for your new address</DialogDescription>
            </DialogHeader>
            <AddressForm onSubmit={handleAddAddress} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Shipping Addresses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {shippingAddresses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {shippingAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`rounded-lg border p-4 ${address.is_default ? "border-primary" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.is_default && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p>{address.country}</p>
                      <p className="pt-1">{address.phone}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      {!address.is_default && (
                        <Button
                          variant="link"
                          className="h-8 px-0"
                          onClick={() => handleSetDefault(address.id, "shipping")}
                        >
                          Set as default
                        </Button>
                      )}
                      <div className="flex gap-2 ml-auto">
                        <Dialog
                          open={isEditDialogOpen && currentAddress?.id === address.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (!open) setCurrentAddress(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setCurrentAddress(address)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Edit Address</DialogTitle>
                              <DialogDescription>Update your address details</DialogDescription>
                            </DialogHeader>
                            {currentAddress && (
                              <AddressForm
                                address={currentAddress}
                                onSubmit={handleEditAddress}
                                onCancel={() => {
                                  setIsEditDialogOpen(false)
                                  setCurrentAddress(null)
                                }}
                              />
                            )}
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => setAddressToDelete(address.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Address</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this address? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setAddressToDelete(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteAddress}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No shipping addresses</h3>
                <p className="text-muted-foreground mt-1">Add a shipping address to make checkout faster</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Shipping Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Add Shipping Address</DialogTitle>
                      <DialogDescription>Enter the details for your shipping address</DialogDescription>
                    </DialogHeader>
                    <AddressForm
                      initialType="shipping"
                      onSubmit={handleAddAddress}
                      onCancel={() => setIsAddDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Billing Addresses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {billingAddresses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {billingAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`rounded-lg border p-4 ${address.is_default ? "border-primary" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.is_default && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p>{address.country}</p>
                      <p className="pt-1">{address.phone}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      {!address.is_default && (
                        <Button
                          variant="link"
                          className="h-8 px-0"
                          onClick={() => handleSetDefault(address.id, "billing")}
                        >
                          Set as default
                        </Button>
                      )}
                      <div className="flex gap-2 ml-auto">
                        <Dialog
                          open={isEditDialogOpen && currentAddress?.id === address.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (!open) setCurrentAddress(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setCurrentAddress(address)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Edit Address</DialogTitle>
                              <DialogDescription>Update your address details</DialogDescription>
                            </DialogHeader>
                            {currentAddress && (
                              <AddressForm
                                address={currentAddress}
                                onSubmit={handleEditAddress}
                                onCancel={() => {
                                  setIsEditDialogOpen(false)
                                  setCurrentAddress(null)
                                }}
                              />
                            )}
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => setAddressToDelete(address.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Address</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this address? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setAddressToDelete(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteAddress}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Home className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No billing addresses</h3>
                <p className="text-muted-foreground mt-1">Add a billing address for your payment methods</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Billing Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Add Billing Address</DialogTitle>
                      <DialogDescription>Enter the details for your billing address</DialogDescription>
                    </DialogHeader>
                    <AddressForm
                      initialType="billing"
                      onSubmit={handleAddAddress}
                      onCancel={() => setIsAddDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
