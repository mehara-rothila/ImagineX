import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "../components/ui/badge";
import { Heart, MapPin, Calendar, User } from "lucide-react";
import { Event } from "../lib/data";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/past/${event.id}`);
  };

  const handleProvideFeedback = () => {
    navigate(`/past/${event.id}/feedback`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const weekday = date.toLocaleString("default", { weekday: "long" });

    return {
      day,
      month,
      fullDate: `${weekday}, ${month} ${day}, ${year} • ${time}`,
    };
  };

  const { day, month, fullDate } = formatDate(event.date);

  const formatAttendees = (count: number) => {
    if (count >= 1000) {
      return `+${Math.floor(count / 1000)}K Attended`;
    }
    return `${count} Attended`;
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-[480px] flex flex-col">
      {/* Event Image Banner */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Heart Icon - Top Right */}
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <Heart className="h-5 w-5 text-white" />
        </button>

        {/* Date Badge - Top Left */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{day}</div>
            <div className="text-sm font-medium text-red-500">{month}</div>
          </div>
        </div>

        {/* Attendees - Bottom Left */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="flex -space-x-2">
            {event.participants
              .slice(0, 3)
              .map((participant: any, index: number) => (
                <div
                  key={participant.id}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  style={{ zIndex: 3 - index }}
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
          <span className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-full">
            {formatAttendees(event.attendeesCount)}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="flex-1 p-6 bg-white flex flex-col">
        {/* Category Tag */}
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100 flex-shrink-0"
        >
          {event.category}
        </Badge>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-shrink-0">
          {event.title}
        </h3>

        {/* Location and Date Info */}
        <div className="space-y-2 mb-4 flex-shrink-0">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{fullDate}</span>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="flex items-center text-gray-600 text-sm mb-6 flex-shrink-0">
          <User className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="line-clamp-1">By {event.organizer}</span>
        </div>

        {/* Action Buttons - Pushed to bottom */}
        <div className="flex gap-3 mt-auto">
          <Button
            onClick={handleProvideFeedback}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Provide Feedback
          </Button>
          <Button
            onClick={handleViewDetails}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
