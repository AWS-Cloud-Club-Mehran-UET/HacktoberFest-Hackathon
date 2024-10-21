import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  location,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{new Date(date).toLocaleString()}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <p className="mt-2">Location: {location}</p>
    </CardContent>
    <CardFooter>
      <Link href={`/events/${id}`}>
        <Button>View Details</Button>
      </Link>
    </CardFooter>
  </Card>
);

export default async function EventsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: events } = await supabase.from("events").select("*");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
