import { EventCard } from "../components/EventCard";
import { pastEvents } from "../lib/data";

export default function PastEvents() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Past Events</h1>
        <p className="text-muted-foreground mb-8">
          Review completed events and their performance.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
