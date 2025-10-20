import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { EventCard } from "../components/EventCard";
import { pastEvents } from "../lib/data";
import { BarChart3 } from "lucide-react";

export default function PastEvents() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Past Events</h1>
            <p className="text-muted-foreground">
              Review completed events and their performance.
            </p>
          </div>
          <Button
            onClick={() => navigate("/past/report")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports & Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
