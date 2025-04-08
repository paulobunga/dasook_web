"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = getSupabaseClient();

  useEffect(() => {
    async function loadTickets() {
      setLoading(true);
      setError(null);

      if (!supabase) {
        setError("Unable to connect to the database. Please try again later.");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error("Failed to get session: " + sessionError.message);
        }

        if (!session?.user) {
          router.push("/login");
          return;
        }

        // Fetch support tickets for the current user
        const { data, error } = await supabase
          .from("support_tickets")
          .select("*")
          .eq("customer_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw new Error("Failed to load support tickets: " + error.message);
        }

        setTickets(data || []);
      } catch (err: any) {
        console.error("Error loading support tickets:", err);
        setError(err.message || "Failed to load support tickets");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your support tickets...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Support Tickets</CardTitle>
          <Button asChild>
            <Link href="/account/support/new">Create New Ticket</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          

\
I will output the full code for the new support ticket page.
