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
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  location,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{date}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <p className="mt-2">Location: {location}</p>
    </CardContent>
    <CardFooter>
      <Button>Register</Button>
    </CardFooter>
  </Card>
);

export default function EventsPage() {
  const events: EventCardProps[] = [
    {
      title: "Tech Conference 2024",
      description: "Annual tech conference",
      date: "2024-06-15",
      location: "San Francisco",
    },
    {
      title: "Community Meetup",
      description: "Monthly community gathering",
      date: "2024-03-01",
      location: "Online",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <Link href="/events/create">
          <Button>Create Event</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
}
