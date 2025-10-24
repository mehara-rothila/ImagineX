import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { MapPin, Calendar, User, Edit, Trash2 } from "lucide-react";

export interface UpcomingEvent {
  id: number;
  name: string;
  company: string;
  category: string;
  date: string;
  place: string;
  participants: number;
  requirements: string;
  notes: string;
  image?: string;
}

interface UpcomingEventCardProps {
  event: UpcomingEvent;
  onDelete: (id: number) => void;
}

export function UpcomingEventCard({ event, onDelete }: UpcomingEventCardProps) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/upcoming/${event.id}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(event.id);
    setDeleteDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    const weekday = date.toLocaleString("default", { weekday: "long" });

    return {
      day,
      month,
      fullDate: `${weekday}, ${month} ${day}, ${year}`,
    };
  };

  const { day, month, fullDate } = formatDate(event.date);

  // Calculate days until event
  const getDaysUntil = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil();

  // Default image if none provided
  const eventImage = event.image || "/events/img1.jpg";

  return (
    <>
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group h-[480px] flex flex-col">
        {/* Event Image Banner */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={eventImage}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Date Badge - Top Left */}
          <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">{day}</div>
              <div className="text-sm font-medium text-purple-600">{month}</div>
            </div>
          </div>

          {/* Days Until Badge - Top Right */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-500 text-white">
              {daysUntil === 0
                ? "Today"
                : daysUntil === 1
                ? "Tomorrow"
                : `In ${daysUntil} days`}
            </Badge>
          </div>

          {/* Participants Count - Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">
              {event.participants} Participants
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 p-6 bg-white flex flex-col">
          {/* Category Tag */}
          <Badge
            variant="secondary"
            className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100 flex-shrink-0 w-fit"
          >
            {event.category}
          </Badge>

          {/* Event Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-shrink-0">
            {event.name}
          </h3>

          {/* Location and Date Info */}
          <div className="space-y-2 mb-4 flex-shrink-0">
            <div className="flex items-center text-gray-600 text-sm">
              <User className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="line-clamp-1">Organized by {event.company}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="line-clamp-1">{fullDate}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="line-clamp-1">{event.place}</span>
            </div>
          </div>

          {/* Action Buttons - Pushed to bottom */}
          <div className="flex gap-3 mt-auto">
            <Button
              onClick={handleEdit}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the event "{event.name}". This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
