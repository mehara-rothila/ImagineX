import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  MessageSquare,
  Tag,
  Building,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { pastEvents } from "../lib/data";

export default function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const event = pastEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Event Not Found</h1>
          <p className="text-muted-foreground">
            The requested event could not be found.
          </p>
          <Button onClick={() => navigate("/past")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Past Events
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/past")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Past Events
        </Button>

        {/* Hero Section */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Date Badge */}
          <div className="absolute top-6 left-6 bg-white rounded-lg p-3 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-black">{day}</div>
              <div className="text-lg font-medium text-red-500">{month}</div>
            </div>
          </div>

          {/* Event Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <Badge
                  variant="secondary"
                  className="mb-2 bg-blue-100 text-blue-700"
                >
                  {event.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {formatAttendees(event.attendeesCount)}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate(`/past/${event.id}/feedback`)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                View Feedback
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Event Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">{fullDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-3 h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Tag className="mr-3 h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Category</p>
                      <p className="text-muted-foreground">{event.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Building className="mr-3 h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Organizer</p>
                      <p className="text-muted-foreground">{event.organizer}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">About This Event</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Event Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Event Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {event.attendeesCount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Attendees
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {event.participants.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Registered Participants
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      4.8
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Rating
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Participants ({event.participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {event.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {participant.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {participant.email}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {participant.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate(`/past/${event.id}/feedback`)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Feedback
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/past")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export {};
