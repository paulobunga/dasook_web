"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock countries data
const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "UK", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
]

// Mock US states data
const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

interface AddressFormProps {
  address?: any
  initialType?: "shipping" | "billing"
  onSubmit: (address: any) => void
  onCancel: () => void
}

export function AddressForm({ address, initialType = "shipping", onSubmit, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState({
    id: address?.id || "",
    type: address?.type || initialType,
    isDefault: address?.isDefault || false,
    name: address?.name || "",
    line1: address?.line1 || "",
    line2: address?.line2 || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    country: address?.country || "US",
    phone: address?.phone || "",
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

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
        type: formData.type,
        is_default: formData.isDefault,
        name: formData.name,
        line1: formData.line1,
        line2: formData.line2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
        user_id: userId,
      }

      if (address?.id) {
        // Update existing address
        const { error } = await supabase.from("addresses").update(addressData).eq("id", address.id)

        if (error) {
          throw new Error("Failed to update address: " + error.message)
        }
        toast({
          title: "Address updated",
          description: "Your address has been updated successfully.",
        })
        onSubmit({ ...formData, id: address.id })
      } else {
        // Add new address
        const { data, error } = await supabase.from("addresses").insert([addressData]).select().single()

        if (error) {
          throw new Error("Failed to add address: " + error.message)
        }
        toast({
          title: "Address added",
          description: "Your address has been added successfully.",
        })
        onSubmit({ ...formData, id: data.id })
      }
      onCancel()
    } catch (err: any) {
      console.error("Error submitting address:", err)
      toast({
        title: "Error",
        description: err.message || "Failed to submit address",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Contact Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="line1">Address Line 1</Label>
        <Input
          id="line1"
          name="line1"
          value={formData.line1}
          onChange={handleChange}
          placeholder="Street address"
          required
        />
      </div>

      <div>
        <Label htmlFor="line2">Address Line 2 (Optional)</Label>
        <Input
          id="line2"
          name="line2"
          value={formData.line2}
          onChange={handleChange}
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        </div>
        <div>
          <Label htmlFor="state">State/Province</Label>
          <Select
            id="state"
            name="state"
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {usStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="postalCode">ZIP/Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Select
          id="country"
          name="country"
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="radio"
          id="shipping"
          name="type"
          value="shipping"
          checked={formData.type === "shipping"}
          onChange={handleChange}
        />
        <Label htmlFor="shipping">Shipping Address</Label>

        <Input
          type="radio"
          id="billing"
          name="type"
          value="billing"
          checked={formData.type === "billing"}
          onChange={handleChange}
        />
        <Label htmlFor="billing">Billing Address</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
        <Label htmlFor="isDefault">Set as Default Address</Label>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Save Address"}
        </Button>
      </div>
    </form>
  )
}
