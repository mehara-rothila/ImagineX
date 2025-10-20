import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Send,
  Star,
  Calendar,
  Users,
  CheckCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Award,
  Heart,
} from "lucide-react";
import { pastEvents } from "../lib/data";

export default function Feedback() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackCategories, setFeedbackCategories] = useState({
    venue: "",
    content: "",
    organization: "",
    overall: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [improvements, setImprovements] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || rating === 0) {
      alert("Please fill in all required fields and provide a rating.");
      return;
    }

    // Here you would typically send the feedback to a backend
    const feedbackData = {
      eventId,
      name: name.trim(),
      email: email.trim(),
      rating,
      feedbackCategories,
      recommendation,
      improvements,
      comments: comments.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log("Feedback submitted:", feedbackData);
    alert("Thank you for your valuable feedback! Your input helps us improve future events.");
    navigate(`/past/${eventId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent"
  };

  return (
        <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-5 max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(`/past/${eventId}`)}
          className="mb-5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Event Details
        </Button>

        <div className="space-y-5">
          {/* Event Summary Card - Fixed Height */}
          <Card className="overflow-hidden">
            <div className="relative h-28 bg-gradient-to-r from-purple-600 to-blue-600">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative h-full p-6 text-white flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30 text-sm">
                      {event.category}
                    </Badge>
                    <h2 className="text-xl font-bold mb-3 leading-tight">{event.title}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendeesCount} attendees
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-6 flex-shrink-0">
                    <div className="text-xl font-bold mb-1">Feedback</div>
                    <div className="text-sm opacity-90">Help us improve</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Indicator - Bigger */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Feedback Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {rating > 0 ? "75%" : "25%"} Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: rating > 0 ? "75%" : "25%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Main Feedback Form - Better Sized Layout */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information & Overall Rating - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Personal Information */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1 h-10"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="mt-1 h-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overall Rating */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    Overall Rating *
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    How would you rate your overall experience?
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= (hoverRating || rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                    {(rating > 0 || hoverRating > 0) && (
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600">
                          {ratingLabels[(hoverRating || rating) as keyof typeof ratingLabels]}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {hoverRating || rating} out of 5 stars
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Feedback Categories - Better Sized Grid */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Award className="mr-2 h-5 w-5 text-blue-500" />
                  Detailed Feedback
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Help us understand what worked well and what could be improved
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Venue & Location
                    </Label>
                    <select
                      value={feedbackCategories.venue}
                      onChange={(e) => setFeedbackCategories(prev => ({ ...prev, venue: e.target.value }))}
                      className="w-full p-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent h-10"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Content & Speakers
                    </Label>
                    <select
                      value={feedbackCategories.content}
                      onChange={(e) => setFeedbackCategories(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent h-10"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Organization
                    </Label>
                    <select
                      value={feedbackCategories.organization}
                      onChange={(e) => setFeedbackCategories(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full p-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent h-10"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Overall Experience
                    </Label>
                    <select
                      value={feedbackCategories.overall}
                      onChange={(e) => setFeedbackCategories(prev => ({ ...prev, overall: e.target.value }))}
                      className="w-full p-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent h-10"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation & Comments - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Recommendation */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    Would you recommend this event?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setRecommendation("yes")}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        recommendation === "yes"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 hover:border-green-300"
                      }`}
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span>Yes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommendation("maybe")}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        recommendation === "maybe"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300 hover:border-yellow-300"
                      }`}
                    >
                      <Clock className="h-5 w-5" />
                      <span>Maybe</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommendation("no")}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        recommendation === "no"
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-300 hover:border-red-300"
                      }`}
                    >
                      <ThumbsDown className="h-5 w-5" />
                      <span>No</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Comments */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-purple-500" />
                    Additional Comments
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Any specific suggestions or feedback?
                  </p>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div>
                    <Label htmlFor="comments" className="text-sm font-medium">
                      General Comments
                    </Label>
                    <Textarea
                      id="comments"
                      placeholder="Share your thoughts..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="improvements" className="text-sm font-medium">
                      Areas for Improvement
                    </Label>
                    <Textarea
                      id="improvements"
                      placeholder="What could we do better..."
                      value={improvements}
                      onChange={(e) => setImprovements(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Button */}
            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <CheckCircle className="inline h-4 w-4 mr-1" />
                    Your feedback helps us create better events
                  </div>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                    disabled={!name.trim() || !email.trim() || rating === 0}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

export {};
