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
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Tag,
  Building,
  FileText,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "../hooks/use-toast";

// Mock participant data
interface Participant {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

// Generate mock participants
const generateParticipants = (count: number): Participant[] => {
  const departments = ["HR", "IT", "Sales", "Marketing", "Finance", "Operations"];
  const statuses: ("Confirmed" | "Pending" | "Cancelled")[] = ["Confirmed", "Pending", "Cancelled"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Participant ${i + 1}`,
    email: `participant${i + 1}@example.com`,
    phone: `+1 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export default function UpcomingEventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  // Mock event data - in real app, fetch from API or context
  const [eventData, setEventData] = useState({
    id: Number(eventId),
    name: "Saga 2025",
    company: "Tech Corp",
    category: "major-event",
    date: "2025-10-22",
    place: "Convention Center",
    participants: 500,
    requirements: "Stage, Audio System, Lighting",
    notes: "VIP seating required",
  });

  // Participant pagination
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;
  const allParticipants = generateParticipants(eventData.participants);
  const totalPages = Math.ceil(allParticipants.length / participantsPerPage);
  
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = allParticipants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant
  );

  const handleSave = () => {
    // In real app, save to API or context
    toast({
      title: "Event Updated",
      description: "Your changes have been saved successfully.",
    });
    navigate("/upcoming");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/upcoming")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upcoming Events
        </Button>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
            <p className="text-gray-500 mt-1">
              Modify event details and manage participants
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Event Details Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-purple-500" />
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Event Name</Label>
                    <Input
                      id="name"
                      value={eventData.name}
                      onChange={(e) =>
                        setEventData({ ...eventData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Organized By</Label>
                    <Input
                      id="company"
                      value={eventData.company}
                      onChange={(e) =>
                        setEventData({ ...eventData, company: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={eventData.category}
                      onChange={(e) =>
                        setEventData({ ...eventData, category: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventData.date}
                      onChange={(e) =>
                        setEventData({ ...eventData, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="place">Venue</Label>
                  <Input
                    id="place"
                    value={eventData.place}
                    onChange={(e) =>
                      setEventData({ ...eventData, place: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={eventData.requirements}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        requirements: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={eventData.notes}
                    onChange={(e) =>
                      setEventData({ ...eventData, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Participants Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Participants ({allParticipants.length})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-700">
                      Page {currentPage} of {totalPages}
                    </Badge>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => {
                        toast({
                          title: "Add Participant",
                          description: "Add participant feature coming soon!",
                        });
                      }}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Add Participant
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Table */}
                <div className="overflow-x-auto -mx-6 px-6">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Department
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentParticipants.map((participant) => (
                            <tr
                              key={participant.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {participant.id}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                {participant.name}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                {participant.email}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                {participant.phone}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                {participant.department}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <Badge
                                  variant="outline"
                                  className={`${getStatusColor(
                                    participant.status
                                  )} text-xs`}
                                >
                                  {participant.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-500 text-center sm:text-left">
                    Showing {indexOfFirstParticipant + 1} to{" "}
                    {Math.min(indexOfLastParticipant, allParticipants.length)} of{" "}
                    {allParticipants.length} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNumber: number;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageNumber
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : ""
                          }`}
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Event Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="mr-3 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(eventData.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Venue</p>
                      <p className="text-sm text-gray-600">{eventData.place}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Tag className="mr-3 h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-gray-600">
                        {eventData.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building className="mr-3 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Organizer</p>
                      <p className="text-sm text-gray-600">
                        {eventData.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="mr-3 h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Participants</p>
                      <p className="text-sm text-gray-600">
                        {eventData.participants} registered
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participant Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-900">
                      Confirmed
                    </span>
                    <Badge className="bg-green-600 text-white">
                      {
                        allParticipants.filter((p) => p.status === "Confirmed")
                          .length
                      }
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-900">
                      Pending
                    </span>
                    <Badge className="bg-yellow-600 text-white">
                      {
                        allParticipants.filter((p) => p.status === "Pending")
                          .length
                      }
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-900">
                      Cancelled
                    </span>
                    <Badge className="bg-red-600 text-white">
                      {
                        allParticipants.filter((p) => p.status === "Cancelled")
                          .length
                      }
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
