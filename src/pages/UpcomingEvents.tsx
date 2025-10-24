import { useState } from "react";
import {
  UpcomingEventCard,
  UpcomingEvent,
} from "../components/UpcomingEventCard";
import { Calendar } from "lucide-react";
import { toast } from "../hooks/use-toast";

// Dummy upcoming events data
const initialEvents: UpcomingEvent[] = [
  {
    id: 1,
    name: "Saga 2025",
    company: "Tech Corp",
    category: "major-event",
    date: "2025-10-22",
    place: "Convention Center",
    participants: 500,
    requirements: "Stage, Audio System, Lighting",
    notes: "VIP seating required",
    image: "/events/img1.jpg",
  },
  {
    id: 2,
    name: "Product Launch",
    company: "Innovation Labs",
    category: "major-event",
    date: "2025-10-25",
    place: "Grand Hotel",
    participants: 200,
    requirements: "Projector, Sound System",
    notes: "Media coverage arranged",
    image: "/events/img2.jpg",
  },
  {
    id: 3,
    name: "HR Connect",
    company: "People First Inc",
    category: "music",
    date: "2025-10-27",
    place: "City Hall",
    participants: 150,
    requirements: "Tables, Chairs, Catering",
    notes: "Networking event",
    image: "/events/img3.jpeg",
  },
  {
    id: 4,
    name: "Finance Forum",
    company: "Money Matters",
    category: "major-event",
    date: "2025-10-29",
    place: "Business Center",
    participants: 300,
    requirements: "Presentation equipment",
    notes: "Keynote speaker confirmed",
    image: "/events/img4.png",
  },
  {
    id: 5,
    name: "Halloween Bash",
    company: "Party Planners",
    category: "music",
    date: "2025-10-31",
    place: "Downtown Arena",
    participants: 1000,
    requirements: "Stage, DJ Equipment, Decorations",
    notes: "Costume contest included",
    image: "/events/ongoing1.png",
  },
];

export default function UpcomingEvents() {
  const [events, setEvents] = useState<UpcomingEvent[]>(initialEvents);

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed.",
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Hero Header with Pattern Background */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 p-8 mb-6">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Calendar className="h-8 w-8 text-white mr-3" />
              <h1 className="text-4xl font-bold text-white">Upcoming Events</h1>
            </div>
            <p className="text-white/90 text-lg">
              Manage and organize all your scheduled events in one place.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-white text-center">
              <div className="text-3xl font-bold">{events.length}</div>
              <div className="text-sm">Total Events</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event) => (
              <UpcomingEventCard
                key={event.id}
                event={event}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-500">
              There are no scheduled events at the moment. Create a new event to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}