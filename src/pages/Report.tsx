import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Award,
  Download,
  Filter,
  PieChart,
  Activity,
  Target,
} from "lucide-react";
import { pastEvents } from "../lib/data";

export default function Report() {
  const navigate = useNavigate();

  // Calculate analytics data
  const totalEvents = pastEvents.length;
  const totalAttendees = pastEvents.reduce(
    (sum, event) => sum + event.attendeesCount,
    0
  );
  const averageRating = 4.2; // Mock data
  const totalFeedback = 156; // Mock data

  // Category distribution
  const categoryData = pastEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Monthly event data (mock data for the last 6 months)
  const monthlyData = [
    { month: "Apr", events: 3, attendees: 450 },
    { month: "May", events: 5, attendees: 720 },
    { month: "Jun", events: 4, attendees: 680 },
    { month: "Jul", events: 6, attendees: 890 },
    { month: "Aug", events: 7, attendees: 1050 },
    { month: "Sep", events: 8, attendees: 1200 },
  ];

  // Rating distribution (mock data)
  const ratingData = [
    { rating: "5★", count: 45, percentage: 29 },
    { rating: "4★", count: 67, percentage: 43 },
    { rating: "3★", count: 32, percentage: 20 },
    { rating: "2★", count: 8, percentage: 5 },
    { rating: "1★", count: 4, percentage: 3 },
  ];

  // Simple bar chart component
  const BarChart = ({ data, title }: { data: any[]; title: string }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 text-xs text-muted-foreground">
              {item.month || item.rating}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage || (item.events / 8) * 100}%`,
                }}
              ></div>
            </div>
            <div className="w-12 text-xs text-right text-muted-foreground">
              {item.count || item.events}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Simple pie chart component (using CSS)
  const PieChartComponent = ({ data }: { data: any[] }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const angle = (item.count / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`,
            ].join(" ");

            const colors = [
              "#8B5CF6",
              "#06B6D4",
              "#10B981",
              "#F59E0B",
              "#EF4444",
            ];

            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="p-6 pb-0">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/past")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Past Events
          </Button>
        </div>
      </div>

      {/* Hero Header with Pattern Background - Full Width */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 p-8 mb-6">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Event Reports & Analytics
            </h1>
            <p className="text-white/90 text-lg">
              Comprehensive insights into past event performance.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Events
                  </p>
                  <p className="text-3xl font-bold">{totalEvents}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Attendees
                  </p>
                  <p className="text-3xl font-bold">
                    {totalAttendees.toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Rating
                  </p>
                  <p className="text-3xl font-bold">{averageRating}</p>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Activity className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-600">
                  Based on {totalFeedback} reviews
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Feedback Count
                  </p>
                  <p className="text-3xl font-bold">{totalFeedback}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Target className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-purple-600">85% response rate</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Events Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Events Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={monthlyData} title="Events per month" />
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Rating Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-6">
                <PieChartComponent data={ratingData} />
                <div className="space-y-2">
                  {ratingData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: [
                            "#8B5CF6",
                            "#06B6D4",
                            "#10B981",
                            "#F59E0B",
                            "#EF4444",
                          ][index],
                        }}
                      ></div>
                      <span>{item.rating}</span>
                      <span className="text-muted-foreground">
                        ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Events by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryData).map(
                  ([category, count], index) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {count} events
                        </span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(count / totalEvents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Top Performing Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastEvents.slice(0, 5).map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-700">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.attendeesCount} attendees
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Event Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Event</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Attendees
                    </th>
                    <th className="text-right py-3 px-4 font-medium">Rating</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pastEvents.map((event) => (
                    <tr key={event.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {event.attendeesCount}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <span className="font-medium">
                            4.{Math.floor(Math.random() * 9) + 1}
                          </span>
                          <Award className="h-3 w-3 text-yellow-500" />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium">
                          {Math.floor(Math.random() * 20) + 5}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
