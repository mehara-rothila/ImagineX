import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, Users, CheckCircle2, XCircle, QrCode, Download } from "lucide-react";
import { ongoingEvents, Participant } from "../lib/data";

export default function ParticipantsList() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "checked-in" | "not-checked-in">("all");

  const event = ongoingEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Event Not Found</h1>
        <Button onClick={() => navigate("/ongoing")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Ongoing Events
        </Button>
      </div>
    );
  }

  const handleParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDialogOpen(true);
  };

  const downloadQRCode = (participant: Participant) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
      JSON.stringify({
        id: participant.id,
        name: participant.name,
        email: participant.email,
        role: participant.role,
        eventId: eventId,
      })
    )}`;
    
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qr-${participant.name.replace(/\s+/g, '-')}.png`;
    link.click();
  };

  // Filter participants
  const filteredParticipants = event.participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "checked-in" && participant.checkedIn) ||
      (filterStatus === "not-checked-in" && !participant.checkedIn);

    return matchesSearch && matchesFilter;
  });

  const checkedInCount = event.participants.filter((p) => p.checkedIn).length;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/ongoing/${eventId}`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event Details
          </Button>

          <h1 className="text-3xl font-bold mb-2">Registered Participants</h1>
          <p className="text-muted-foreground text-lg">{event.title}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Registered</p>
                  <p className="text-2xl font-bold">{event.attendeesCount}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Checked In</p>
                  <p className="text-2xl font-bold text-green-600">{checkedInCount}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Not Checked In</p>
                  <p className="text-2xl font-bold text-orange-600">{event.attendeesCount - checkedInCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "checked-in" ? "default" : "outline"}
              onClick={() => setFilterStatus("checked-in")}
            >
              Checked In
            </Button>
            <Button
              variant={filterStatus === "not-checked-in" ? "default" : "outline"}
              onClick={() => setFilterStatus("not-checked-in")}
            >
              Not Checked In
            </Button>
          </div>
        </div>

        {/* Participants Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Participant</th>
                    <th className="text-left p-4 font-semibold">Role</th>
                    <th className="text-left p-4 font-semibold">Position</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant) => (
                    <tr
                      key={participant.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-muted-foreground">{participant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{participant.role}</Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">{participant.position || "N/A"}</span>
                      </td>
                      <td className="p-4">
                        {participant.checkedIn ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Checked In
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Checked In
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleParticipantClick(participant)}
                          >
                            <QrCode className="h-4 w-4 mr-1" />
                            View QR
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredParticipants.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No participants found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participant Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Participant QR Code</DialogTitle>
          </DialogHeader>
          {selectedParticipant && (
            <div className="space-y-6">
              {/* Participant Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-200">
                  <img
                    src={selectedParticipant.avatar}
                    alt={selectedParticipant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{selectedParticipant.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedParticipant.email}</p>
                  <div className="mt-2">
                    {selectedParticipant.checkedIn ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Checked In
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-700">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Checked In
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      JSON.stringify({
                        id: selectedParticipant.id,
                        name: selectedParticipant.name,
                        email: selectedParticipant.email,
                        role: selectedParticipant.role,
                        position: selectedParticipant.position,
                        eventId: eventId,
                      })
                    )}`}
                    alt="QR Code"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Participant Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{selectedParticipant.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="font-medium">{selectedParticipant.position || "N/A"}</p>
                </div>
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
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={() => downloadQRCode(selectedParticipant)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download QR
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
