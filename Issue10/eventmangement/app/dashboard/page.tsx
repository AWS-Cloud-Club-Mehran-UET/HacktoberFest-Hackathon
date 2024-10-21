"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

interface EventRegistration {
  event_id: string;
  event_title: string;
  count: number;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!user || !isAdmin) {
        router.push("/");
        return;
      }

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (eventsError) {
        console.error("Error fetching events:", eventsError);
      } else {
        setEvents(eventsData || []);
        setTotalEvents(eventsData?.length || 0);
      }

      const { data: registrationsData, error: registrationsError } =
        await supabase
          .from("event_registrations")
          .select(
            `
          event_id,
          events (title)
        `
          )
          .order("event_id");

      if (registrationsError) {
        console.error("Error fetching registrations:", registrationsError);
      } else {
        const registrationCounts = registrationsData.reduce((acc, curr) => {
          const existingEvent = acc.find(
            (item) => item.event_id === curr.event_id
          );
          if (existingEvent) {
            existingEvent.count += 1;
          } else {
            acc.push({
              event_id: curr.event_id,
              event_title: curr.events.title,
              count: 1,
            });
          }
          return acc;
        }, [] as EventRegistration[]);

        setRegistrations(registrationCounts);
        setTotalRegistrations(
          registrationCounts.reduce((sum, item) => sum + item.count, 0)
        );
      }

      setIsLoading(false);
    }

    fetchData();
  }, [user, isAdmin, supabase, router]);

  const handleCancelEvent = async (eventId: string) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      console.error("Error cancelling event:", error);
    } else {
      setEvents(events.filter((event) => event.id !== eventId));
      setTotalEvents(totalEvents - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/events/create">
          <Button>Create Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalRegistrations}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Event Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrations}>
                <XAxis dataKey="event_title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
              <p>
                Registrations:{" "}
                {registrations.find((r) => r.event_id === event.id)?.count || 0}
              </p>
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
