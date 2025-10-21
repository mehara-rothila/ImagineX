import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { EventCard } from "../components/EventCard";
import { pastEvents } from "../lib/data";
import { BarChart3 } from "lucide-react";

export default function PastEvents() {
  const navigate = useNavigate();

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
            <h1 className="text-4xl font-bold text-white mb-2">Past Events</h1>
            <p className="text-white/90 text-lg">
              Review completed events and their performance.
            </p>
          </div>
          <Button
            onClick={() => navigate("/past/report")}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports & Analytics
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
