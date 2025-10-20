import { Calendar, Clock, History, TrendingUp } from "lucide-react";
import { EventStatCard } from "../components/EventStatCard";
import heroBanner from "../assets/hero-banner.jpg";

export default function Dashboard() {
  const stats = [
    {
      title: "Upcoming Events",
      count: 12,
      icon: Calendar,
      gradient: "bg-gradient-to-br from-primary to-primary-glow",
      trend: "+3 from last month",
    },
    {
      title: "Ongoing Events",
      count: 5,
      icon: Clock,
      gradient: "bg-gradient-to-br from-secondary to-cyan-400",
      trend: "Currently active",
    },
    {
      title: "Past Events",
      count: 47,
      icon: History,
      gradient: "bg-gradient-to-br from-accent to-pink-500",
      trend: "Successfully completed",
    },
    {
      title: "Total Attendees",
      count: 2840,
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
      trend: "+18% growth rate",
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Hero Banner */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={heroBanner} 
            alt="Event Management Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-purple-600/70 to-transparent">
            <div className="flex flex-col justify-center h-full px-8 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Welcome to ImagineX
              </h1>
              <p className="text-lg text-white/90 mb-4">
                Your premier event management dashboard. Create unforgettable experiences.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-white/90 transition-all shadow-lg">
                  Create Event
                </button>
                <button className="px-6 py-2.5 bg-white/20 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30">
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <EventStatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Quick Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 ">
              <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { event: "Tech Summit 2024", action: "Started 2 hours ago", status: "ongoing" },
                { event: "Marketing Expo", action: "Scheduled for tomorrow", status: "upcoming" },
                { event: "Annual Gala", action: "Completed yesterday", status: "completed" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.event}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    activity.status === 'ongoing' 
                      ? 'bg-cyan-100 text-cyan-700 ' 
                      : activity.status === 'upcoming'
                      ? 'bg-purple-100  text-purple-700 '
                      : 'bg-pink-100  text-pink-700 '
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 ">Event Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 ">Average Attendance</span>
                  <span className="font-semibold text-gray-900 ">87%</span>
                </div>
                <div className="h-2 bg-gray-200  rounded-full overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 ">Client Satisfaction</span>
                  <span className="font-semibold text-gray-900 ">94%</span>
                </div>
                <div className="h-2 bg-gray-200  rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 ">On-Time Completion</span>
                  <span className="font-semibold text-gray-900 ">91%</span>
                </div>
                <div className="h-2 bg-gray-200  rounded-full overflow-hidden">
                  <div className="h-full w-[91%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
