import { useState, useMemo } from "react";
import { Edit, Trash2, Calendar, Users, Clock, TrendingUp, CheckCircle2, Search, Filter, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { EditEventForm } from "../components/EditEventForm";
import { Input } from "../components/ui/input";

// Dummy upcoming events data
const initialEvents = [
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
  },
];

export default function UpcomingEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof initialEvents[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Calculate days until event
  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date("2025-10-23"); // Current date from context
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.place.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, categoryFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalEvents = events.length;
    const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);
    const thisWeekEvents = events.filter(event => getDaysUntil(event.date) <= 7 && getDaysUntil(event.date) >= 0).length;
    const categoryCounts = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalEvents, totalParticipants, thisWeekEvents, categoryCounts };
  }, [events]);

  const handleEdit = (event: typeof initialEvents[0]) => {
    setSelectedEvent(event);
    setEditOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="flex-1 overflow-auto">
      <EditEventForm open={editOpen} onOpenChange={setEditOpen} event={selectedEvent} />
      
      {/* Hero Header with Pattern Background */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 p-8 mb-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Upcoming Events</h1>
          <p className="text-white/90 text-lg">Manage and organize all your scheduled events in one place.</p>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.totalParticipants.toLocaleString()}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.thisWeekEvents}</p>
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
                <p className="text-3xl font-bold text-gray-900">{Object.keys(stats.categoryCounts).length}</p>
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

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by event name, company, or place..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filter:</span>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex-1 md:flex-none h-10 px-3 pr-8 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="major-event">Major Event</option>
                <option value="music">Music</option>
                <option value="rigging-service">Rigging Service</option>
              </select>

              {/* Clear Filters Button */}
              {(searchQuery || categoryFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                  className="whitespace-nowrap"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{events.length}</span> events
            </p>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Place</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Participants</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event.company}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {event.category === "major-event" ? "Major Event" : event.category === "music" ? "Music" : "Rigging Service"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event.place}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event.participants}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleEdit(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || categoryFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No upcoming events found."}
              </p>
              {(searchQuery || categoryFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}