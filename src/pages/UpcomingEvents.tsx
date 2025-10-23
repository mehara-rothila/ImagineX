import { useState, useMemo } from "react";
import { EditEventForm } from "../components/EditEventForm";
import { PageHeader } from "../components/PageHeader";
import { EventStatsCards } from "../components/EventStatsCards";
import { EventFilterBar } from "../components/EventFilterBar";
import { EventsTable, Event } from "../components/EventsTable";
import { EventsEmptyState } from "../components/EventsEmptyState";

// Dummy upcoming events data
const initialEvents: Event[] = [
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
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  const hasActiveFilters = searchQuery !== "" || categoryFilter !== "all";

  return (
    <div className="flex-1 overflow-auto">
      <EditEventForm open={editOpen} onOpenChange={setEditOpen} event={selectedEvent} />

      {/* Page Header */}
      <PageHeader
        title="Upcoming Events"
        description="Manage and organize all your scheduled events in one place."
      />

      <div className="p-6">
        {/* Stats Cards */}
        <EventStatsCards
          totalEvents={stats.totalEvents}
          totalParticipants={stats.totalParticipants}
          thisWeekEvents={stats.thisWeekEvents}
          categoriesCount={Object.keys(stats.categoryCounts).length}
        />

        {/* Filter Bar */}
        <EventFilterBar
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          totalEvents={events.length}
          filteredCount={filteredEvents.length}
          onSearchChange={setSearchQuery}
          onCategoryChange={setCategoryFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Events Table or Empty State */}
        {filteredEvents.length > 0 ? (
          <EventsTable
            events={filteredEvents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EventsEmptyState
            hasFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>
    </div>
  );
}