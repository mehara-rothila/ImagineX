import React from "react";
import { Button } from "./ui/button";

const notifications = [
  {
    title: "New event created: Tech Summit 2025",
    time: "2 min ago",
    type: "new-event",
  },
  {
    title: "Event ended: Marketing Expo",
    time: "1 hour ago",
    type: "event-end",
  },
  {
    title: "Reminder: SunFest event starts tomorrow",
    time: "Today, 4:00 PM",
    type: "reminder",
  },
  {
    title: "New event created: Annual Gala",
    time: "Yesterday, 10:30 AM",
    type: "new-event",
  },
  {
    title: "Event ended: Developer Meetup",
    time: "Yesterday, 6:00 PM",
    type: "event-end",
  },
];

export function NotificationPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!open) return null;
  return (
    <div className="absolute right-6 top-16 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
      <div className="flex-1 overflow-y-auto mb-3">
        {notifications.map((n, idx) => (
          <div key={idx} className="mb-3 last:mb-0 p-3 rounded-lg bg-gray-50 border border-gray-100 flex flex-col">
            <span className="font-medium text-gray-900 mb-1">{n.title}</span>
            <span className="text-xs text-gray-500">{n.time}</span>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-2">See All Notifications</Button>
    </div>
  );
}
