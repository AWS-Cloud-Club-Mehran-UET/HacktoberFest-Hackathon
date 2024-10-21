"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      if (!user || !isAdmin) {
        router.push("/");
        return;
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, [user, isAdmin, supabase, router]);

  const handleCancelEvent = async (eventId: string) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      console.error("Error cancelling event:", error);
    } else {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <p>Capacity: {event.capacity}</p>
              <div className="mt-4 space-x-2">
                <Link href={`/dashboard/events/${event.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Link href={`/dashboard/events/${event.id}/registrations`}>
                  <Button variant="outline">View Registrations</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleCancelEvent(event.id)}
                >
                  Cancel Event
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
