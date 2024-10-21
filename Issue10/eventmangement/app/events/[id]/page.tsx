"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(targetDate: Date) {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  if (!timeLeft) {
    return <div>Event has started!</div>;
  }

  return (
    <div className="text-2xl font-bold">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const params = useParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data);
      }
    }

    fetchEvent();
  }, [params.id, supabase]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
          <CardDescription>
            {new Date(event.date).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{event.description}</p>
          <p className="mb-4">Location: {event.location}</p>
          <p className="mb-4">Capacity: {event.capacity}</p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Time until event starts:
            </h3>
            <CountdownTimer targetDate={new Date(event.date)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Register for Event</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
