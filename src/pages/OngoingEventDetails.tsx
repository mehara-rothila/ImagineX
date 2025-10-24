import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Tag,
  Building,
  Activity,
  Clock,
  QrCode,
} from "lucide-react";
import { ongoingEvents, Participant } from "../lib/data";

export default function OngoingEventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const event = ongoingEvents.find((e) => e.id === eventId);

  const handleParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDialogOpen(true);
  };

  if (!event) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Event Not Found</h1>
          <p className="text-muted-foreground">
            The requested event could not be found.
          </p>
          <Button onClick={() => navigate("/ongoing")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ongoing Events
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
      return `+${Math.floor(count / 1000)}K Attending`;
    }
    return `${count} Attending`;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/ongoing")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Ongoing Events
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

          {/* Live Badge */}
          <div className="absolute top-6 right-6">
            <Badge className="bg-red-500 text-white text-sm px-3 py-1 animate-pulse">
              🔴 LIVE NOW
            </Badge>
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
                  <Activity className="mr-2 h-5 w-5 text-green-500 animate-pulse" />
                  Event in Progress
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

            {/* Live Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Live Event Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {event.attendeesCount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current Attendees
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
                      LIVE
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Event Status
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
                  Active Participants ({event.participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {event.participants.map((participant) => (
                    <div
                      key={participant.id}
                      onClick={() => handleParticipantClick(participant)}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:shadow-md"
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
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/ongoing")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Participant Details Modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Participant Details</DialogTitle>
            </DialogHeader>
            {selectedParticipant && (
              <div className="space-y-6">
                {/* Participant Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200">
                    <img
                      src={selectedParticipant.avatar}
                      alt={selectedParticipant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedParticipant.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedParticipant.email}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {selectedParticipant.role}
                    </Badge>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <QrCode className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">
                      Participant QR Code
                    </h4>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-200 flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                        JSON.stringify({
                          id: selectedParticipant.id,
                          name: selectedParticipant.name,
                          email: selectedParticipant.email,
                          role: selectedParticipant.role,
                          eventId: eventId,
                        })
                      )}`}
                      alt="QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Scan this QR code for participant verification
                  </p>
                </div>

                {/* Participant ID */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Participant ID
                  </p>
                  <p className="text-lg font-mono font-bold text-purple-700">
                    {selectedParticipant.id}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    Send Message
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export {};
