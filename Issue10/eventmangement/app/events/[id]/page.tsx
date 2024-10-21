"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReviewSection from "@/components/ReviewSection";

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
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user } = useAuth();

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

      if (user) {
        const { data: registrationData, error: registrationError } =
          await supabase
            .from("event_registrations")
            .select("*")
            .eq("event_id", params.id)
            .eq("user_id", user.id)
            .single();

        if (registrationError && registrationError.code !== "PGRST116") {
          console.error("Error checking registration:", registrationError);
        } else {
          setIsRegistered(!!registrationData);
        }
      }

      setIsLoading(false);
    }

    fetchEvent();
  }, [params.id, supabase, user]);

  const handleRegister = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("event_registrations").insert({
      event_id: event?.id,
      user_id: user.id,
    });

    if (error) {
      console.error("Error registering for event:", error);
    } else {
      setIsRegistered(true);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{event.description}</p>
          <p className="mb-4">Date: {new Date(event.date).toLocaleString()}</p>
          <p className="mb-4">Location: {event.location}</p>
          <p className="mb-4">Capacity: {event.capacity}</p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Time until event starts:
            </h3>
            <CountdownTimer targetDate={new Date(event.date)} />
          </div>
          {user && !isRegistered && (
            <Button onClick={handleRegister}>Register for Event</Button>
          )}
          {isRegistered && (
            <p className="text-green-600 font-semibold">
              You are registered for this event
            </p>
          )}
          {!user && (
            <p>
              Please{" "}
              <Button onClick={() => router.push("/login")}>log in</Button> to
              register for this event
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
