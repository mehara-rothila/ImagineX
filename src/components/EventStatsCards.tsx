import { Calendar, Users, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

interface EventStatsCardsProps {
  totalEvents: number;
  totalParticipants: number;
  thisWeekEvents: number;
  categoriesCount: number;
}

export function EventStatsCards({
  totalEvents,
  totalParticipants,
  thisWeekEvents,
  categoriesCount,
}: EventStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
            <p className="text-3xl font-bold text-gray-900">{totalEvents}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>All scheduled</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Participants</p>
            <p className="text-3xl font-bold text-gray-900">{totalParticipants.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <span>Expected attendees</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">This Week</p>
            <p className="text-3xl font-bold text-gray-900">{thisWeekEvents}</p>
          </div>
          <div className="p-3 bg-amber-100 rounded-lg">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-amber-600">
          <span>Next 7 days</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Categories</p>
            <p className="text-3xl font-bold text-gray-900">{categoriesCount}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <span>Event types</span>
        </div>
      </div>
    </div>
  );
}
