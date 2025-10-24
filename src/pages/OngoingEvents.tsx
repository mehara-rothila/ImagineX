import { OngoingEventCard } from "../components/OngoingEventCard";
import { ongoingEvents } from "../lib/data";
import { Activity } from "lucide-react";

export default function OngoingEvents() {
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
              <Activity className="h-8 w-8 text-white mr-3 animate-pulse" />
              <h1 className="text-4xl font-bold text-white">Ongoing Events</h1>
            </div>
            <p className="text-white/90 text-lg">
              Experience live events happening right now! Join the action and be part of the excitement.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-white text-center">
              <div className="text-3xl font-bold">{ongoingEvents.length}</div>
              <div className="text-sm">Live Events</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {ongoingEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {ongoingEvents.map((event) => (
              <OngoingEventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Ongoing Events
            </h3>
            <p className="text-gray-500">
              There are no events currently in progress. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}