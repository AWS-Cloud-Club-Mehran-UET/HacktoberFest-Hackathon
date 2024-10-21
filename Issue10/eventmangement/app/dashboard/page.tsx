"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  is_private: boolean;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const fetchUserEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("created_by", user?.id);

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleSave = async () => {
    if (!editingEvent) return;

    const { error } = await supabase
      .from("events")
      .update({
        title: editingEvent.title,
        description: editingEvent.description,
        date: editingEvent.date,
        location: editingEvent.location,
        capacity: editingEvent.capacity,
        is_private: editingEvent.is_private,
      })
      .eq("id", editingEvent.id);

    if (error) {
      console.error("Error updating event:", error);
    } else {
      setEditingEvent(null);
      fetchUserEvents();
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Events</h1>
      {events.map((event) => (
        <Card key={event.id} className="mb-4">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {editingEvent && editingEvent.id === event.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-4"
              >
                <Input
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  placeholder="Event Title"
                />
                <Textarea
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  placeholder="Event Description"
                />
                <Input
                  type="datetime-local"
                  value={editingEvent.date}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, date: e.target.value })
                  }
                />
                <Input
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                  placeholder="Event Location"
                />
                <Input
                  type="number"
                  value={editingEvent.capacity}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      capacity: parseInt(e.target.value),
                    })
                  }
                  placeholder="Event Capacity"
                />
                <Select
                  value={editingEvent.is_private ? "private" : "public"}
                  onValueChange={(value) =>
                    setEditingEvent({
                      ...editingEvent,
                      is_private: value === "private",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            ) : (
              <>
                <p>{event.description}</p>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
                <p>Location: {event.location}</p>
                <p>Capacity: {event.capacity}</p>
                <p>Type: {event.is_private ? "Private" : "Public"}</p>
                <Button onClick={() => handleEdit(event)} className="mt-2">
                  Edit Event
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
