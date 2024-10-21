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

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchRegisteredEvents() {
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("event_registrations")
        .select(
          `
          event_id,
          events:events(*)
        `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching registered events:", error);
      } else {
        setEvents(data.map((item) => item.events));
      }
      setIsLoading(false);
    }

    fetchRegisteredEvents();
  }, [user, supabase, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Registered Events</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <div className="mt-4">
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline">View Event Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
