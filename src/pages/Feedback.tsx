import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  ArrowLeft,
  MessageSquare,
  Star,
  Calendar,
  Users,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Award,
  Heart,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
} from "lucide-react";
import { pastEvents, feedbackData } from "../lib/data";
import jsPDF from 'jspdf';

export default function Feedback() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const event = pastEvents.find((e) => e.id === eventId);
  const eventFeedback = feedbackData
    .filter((f) => f.eventId === eventId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

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

  // Calculate feedback statistics
  const totalFeedback = eventFeedback.length;
  const averageRating = totalFeedback > 0
    ? eventFeedback.reduce((sum, f) => sum + f.rating, 0) / totalFeedback
    : 0;

  const recommendationStats = eventFeedback.reduce((acc, f) => {
    acc[f.recommendation] = (acc[f.recommendation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryStats = eventFeedback.reduce((acc, f) => {
    Object.entries(f.feedbackCategories).forEach(([category, rating]) => {
      if (!acc[category]) acc[category] = { excellent: 0, good: 0, average: 0, poor: 0 };
      acc[category][rating as keyof typeof acc[typeof category]]++;
    });
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSubmittedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 2.5) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingLabel = (rating: string) => {
    const labels: Record<string, string> = {
      excellent: "Excellent",
      good: "Good",
      average: "Average",
      poor: "Poor",
    };
    return labels[rating] || rating;
  };

  const generatePDFFeedback = async () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Title
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${event?.title} - Feedback Report`, 20, yPosition);
    yPosition += 15;

    // Event details
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Date: ${formatDate(event?.date || '')}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Location: ${event?.location}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Category: ${event?.category}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Total Attendees: ${event?.attendeesCount}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Total Feedback: ${totalFeedback}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Average Rating: ${averageRating.toFixed(1)}/5`, 20, yPosition);
    yPosition += 15;

    // Feedback entries
    eventFeedback.forEach((feedback, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      // Participant header
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${index + 1}. ${feedback.participantName}`, 20, yPosition);
      yPosition += 8;

      // Rating and date
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Rating: ${feedback.rating}/5 | Submitted: ${formatSubmittedDate(feedback.submittedAt)}`, 20, yPosition);
      yPosition += 8;

      // Categories
      const categories = Object.entries(feedback.feedbackCategories)
        .map(([cat, rating]) => `${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${getRatingLabel(rating)}`)
        .join(', ');
      pdf.text(`Categories: ${categories}`, 20, yPosition);
      yPosition += 8;

      // Recommendation
      pdf.text(`Recommendation: ${feedback.recommendation.charAt(0).toUpperCase() + feedback.recommendation.slice(1)}`, 20, yPosition);
      yPosition += 10;

      // Comments (if any)
      if (feedback.comments) {
        pdf.setFont("helvetica", "italic");
        const commentLines = pdf.splitTextToSize(`Comments: ${feedback.comments}`, pageWidth - 40);
        pdf.text(commentLines, 20, yPosition);
        yPosition += commentLines.length * 5 + 5;
      }

      // Improvements (if any)
      if (feedback.improvements) {
        pdf.setFont("helvetica", "italic");
        const improvementLines = pdf.splitTextToSize(`Improvements: ${feedback.improvements}`, pageWidth - 40);
        pdf.text(improvementLines, 20, yPosition);
        yPosition += improvementLines.length * 5 + 10;
      }

      yPosition += 5; // Space between entries
    });

    // Save the PDF
    pdf.save(`${event?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_feedback_report.pdf`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-5 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <Button
            variant="ghost"
            onClick={() => navigate(`/past/${eventId}`)}
            className=""
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event Details
          </Button>

          <Button
            onClick={generatePDFFeedback}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={totalFeedback === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF Report
          </Button>
        </div>

        <div className="space-y-6">
          {/* Event Summary Card */}
          <Card className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-600">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative h-full p-6 text-white flex items-center justify-between">
                <div>
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-white/20 text-white border-white/30 text-sm"
                  >
                    {event.category}
                  </Badge>
                  <h2 className="text-xl font-bold mb-2">
                    {event.title} - Feedback
                  </h2>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendeesCount} attendees
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {totalFeedback} feedback submissions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold mb-1">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm opacity-90 flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    Average Rating
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Feedback Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Feedback
                    </p>
                    <p className="text-3xl font-bold">{totalFeedback}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">
                    {((totalFeedback / event.attendeesCount) * 100).toFixed(1)}% response rate
                  </span>
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
                    <p className={`text-3xl font-bold ${getRatingColor(averageRating)}`}>
                      {averageRating.toFixed(1)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-yellow-600">Out of 5.0 stars</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Would Recommend
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {recommendationStats.yes || 0}
                    </p>
                  </div>
                  <ThumbsUp className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Heart className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">
                    {totalFeedback > 0 ? ((recommendationStats.yes || 0) / totalFeedback * 100).toFixed(0) : 0}% positive
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Areas for Improvement
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {eventFeedback.filter(f => f.improvements.trim()).length}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-500" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-orange-600">Suggestions provided</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Ratings Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Feedback Categories Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(categoryStats).map(([category, ratings]) => (
                  <div key={category} className="text-center">
                    <h4 className="font-medium mb-3 capitalize">{category}</h4>
                    <div className="space-y-2">
                      {Object.entries(ratings).map(([rating, count]) => (
                        <div key={rating} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{getRatingLabel(rating)}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${totalFeedback > 0 ? (count / totalFeedback) * 100 : 0}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium w-6">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Individual Feedback Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Participant Feedback ({totalFeedback})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventFeedback.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Feedback Yet</h3>
                  <p className="text-muted-foreground">
                    No feedback has been submitted for this event yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {eventFeedback.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={event.participants.find(p => p.id === feedback.participantId)?.avatar}
                              alt={feedback.participantName}
                            />
                            <AvatarFallback>
                              {feedback.participantName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{feedback.participantName}</h4>
                            <p className="text-sm text-muted-foreground">{feedback.participantEmail}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">{feedback.rating}/5</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatSubmittedDate(feedback.submittedAt)}
                          </p>
                        </div>
                      </div>

                      {/* Feedback Categories */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {Object.entries(feedback.feedbackCategories).map(([category, rating]) => (
                          <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-muted-foreground capitalize mb-1">{category}</p>
                            <Badge
                              variant={
                                rating === 'excellent' ? 'default' :
                                rating === 'good' ? 'secondary' :
                                rating === 'average' ? 'outline' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {getRatingLabel(rating)}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      {/* Recommendation */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm font-medium">Would recommend:</span>
                        {feedback.recommendation === 'yes' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Yes
                          </Badge>
                        ) : feedback.recommendation === 'maybe' ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Clock className="h-3 w-3 mr-1" />
                            Maybe
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            No
                          </Badge>
                        )}
                      </div>

                      {/* Comments */}
                      {feedback.comments && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium mb-2">Comments</h5>
                          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                            {feedback.comments}
                          </p>
                        </div>
                      )}

                      {/* Improvements */}
                      {feedback.improvements && (
                        <div>
                          <h5 className="text-sm font-medium mb-2">Areas for Improvement</h5>
                          <p className="text-sm text-muted-foreground bg-orange-50 p-3 rounded-lg border-l-4 border-orange-200">
                            {feedback.improvements}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export {};
