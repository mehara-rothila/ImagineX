import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";


// Dummy events for Sep, Oct, Nov 2025
const events = [
  // September
  { date: "2025-09-10", name: "Welcome Meetup", type: "ended" },
  { date: "2025-09-15", name: "Design Sprint", type: "ended" },
  { date: "2025-09-25", name: "HR Connect", type: "ended" },
  // October
  { date: "2025-10-02", name: "Tech Summit 2025", type: "ended" },
  { date: "2025-10-05", name: "Marketing Expo", type: "ended" },
  { date: "2025-10-08", name: "Annual Gala", type: "ended" },
  { date: "2025-10-10", name: "Developer Meetup", type: "ended" },
  { date: "2025-10-12", name: "SunFest", type: "ended" },
  { date: "2025-10-15", name: "Startup Pitch", type: "ended" },
  { date: "2025-10-18", name: "Design Conference", type: "ended" },
  { date: "2025-10-20", name: "AI Workshop", type: "ended" },
  { date: "2025-10-22", name: "Saga 2025", type: "upcoming" },
  { date: "2025-10-25", name: "Product Launch", type: "upcoming" },
  { date: "2025-10-27", name: "HR Connect", type: "upcoming" },
  { date: "2025-10-29", name: "Finance Forum", type: "upcoming" },
  { date: "2025-10-31", name: "Halloween Bash", type: "upcoming" },
  // November
  { date: "2025-11-01", name: "November Kickoff", type: "upcoming" },
  { date: "2025-11-05", name: "AI Expo", type: "upcoming" },
  { date: "2025-11-10", name: "Cloud Day", type: "upcoming" },
  { date: "2025-11-15", name: "Startup Demo", type: "upcoming" },
  { date: "2025-11-20", name: "Design Awards", type: "upcoming" },
  { date: "2025-11-25", name: "Winter Fest", type: "upcoming" },
  { date: "2025-11-30", name: "Year End Meetup", type: "upcoming" },
];


function getEventsForDay(year: number, month: number, day: number) {
  const date = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  return events.filter((e) => e.date === date);
}


const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const today = new Date();

export function EventCalendar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(9); // 0-based, 9 = October

  // Get first day of week and days in month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: Array<Array<number | null>> = [];
  let day = 1;
  for (let w = 0; w < 6; w++) {
    const week: Array<number | null> = [];
    for (let d = 0; d < 7; d++) {
      if ((w === 0 && d < firstDay) || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
        day++;
      }
    }
    weeks.push(week);
  }

  function handlePrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }
  function handleNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between gap-2">
              <Button variant="ghost" size="sm" onClick={handlePrevMonth}>&lt;</Button>
              <span className="text-base sm:text-lg">{monthNames[month]} {year}</span>
              <Button variant="ghost" size="sm" onClick={handleNextMonth}>&gt;</Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold text-purple-700 text-xs sm:text-sm">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {weeks.flat().map((d, idx) => {
              const isToday =
                d &&
                year === today.getFullYear() &&
                month === today.getMonth() &&
                d === today.getDate();
              const dayEvents = d ? getEventsForDay(year, month, d) : [];
              return (
                <div
                  key={idx}
                  className={`min-h-[60px] sm:min-h-[80px] rounded-lg border p-1 sm:p-2 flex flex-col items-center justify-start bg-white ${d ? "hover:bg-purple-50 transition-all" : "bg-gray-50"} ${isToday ? "ring-2 ring-purple-500" : ""}`}
                >
                  {d && (
                    <>
                      <span className={`font-bold mb-1 text-sm sm:text-base ${isToday ? "text-purple-700" : "text-gray-800"}`}>{d}</span>
                      {dayEvents.map((event, i) => (
                        <span
                          key={i}
                          className={`text-[10px] sm:text-xs rounded px-1 sm:px-2 py-0.5 sm:py-1 mt-1 w-full text-center truncate
                            ${event.type === "upcoming" ? "bg-green-100 text-green-700" : ""}
                            ${event.type === "ended" ? "bg-gray-200 text-gray-500 line-through" : ""}
                            ${isToday ? "border border-purple-400" : ""}
                          `}
                          title={event.name}
                        >
                          {event.name}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
              <span className="text-gray-700">Upcoming Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300"></div>
              <span className="text-gray-700">Ended Event</span>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
