import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";

export default function CreateEventPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Event Title
          </label>
          <Input id="title" placeholder="Enter event title" />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <Textarea id="description" placeholder="Enter event description" />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <DatePicker />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <Input id="location" placeholder="Enter event location" />
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium mb-1">
            Capacity
          </label>
          <Input
            id="capacity"
            type="number"
            placeholder="Enter event capacity"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="public" />
          <label htmlFor="public" className="text-sm font-medium">
            Public Event
          </label>
        </div>
        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </div>
  );
}
