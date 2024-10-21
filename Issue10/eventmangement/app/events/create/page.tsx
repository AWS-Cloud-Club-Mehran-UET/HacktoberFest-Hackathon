"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [eventUrl, setEventUrl] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from("events")
      .insert({
        title,
        description,
        date,
        location,
        capacity: parseInt(capacity),
        is_private: isPrivate,
        created_by: user.id,
      })
      .select();

    if (error) {
      console.error("Error creating event:", error);
    } else {
      const eventId = data[0].id;
      const url = `${window.location.origin}/events/${eventId}`;
      setEventUrl(url);
      if (!isPrivate) {
        router.push(`/events/${eventId}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-8">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
        required
      />
      <Input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Event Location"
        required
      />
      <Input
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        placeholder="Event Capacity"
        required
      />
      <Select onValueChange={(value) => setIsPrivate(value === "private")}>
        <SelectTrigger>
          <SelectValue placeholder="Select event type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Create Event</Button>
      {eventUrl && isPrivate && (
        <div className="mt-4">
          <p>Private Event URL:</p>
          <Input type="text" value={eventUrl} readOnly />
          <p className="text-sm text-gray-500 mt-2">
            Share this URL with the people you want to invite to your private
            event.
          </p>
        </div>
      )}
    </form>
  );
}
