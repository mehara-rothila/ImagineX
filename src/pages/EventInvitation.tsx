import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, User, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { pastEvents, ongoingEvents } from "../lib/data";
import logo from "../assets/logo.jpg";

export default function EventInvitation() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  // Find event from all events
  const allEvents = [...pastEvents, ...ongoingEvents];
  const event = allEvents.find((e) => e.id === eventId);

  // For demo purposes, we'll use a sample event if eventId doesn't exist
  const sampleEvent = ongoingEvents[0] || allEvents[0];
  const displayEvent = event || sampleEvent;

  const handleRegister = () => {
    // Navigate to registration page
    navigate(`/register/${eventId || "5"}`);
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!displayEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/10">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Event not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/30 to-primary/10 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Invitation Card */}
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <img src={logo} alt="ImagineX Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">ImagineX Events</h1>
        </div>

        {/* Main Invitation Card */}
        <Card className="overflow-hidden shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
          {/* Event Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={displayEvent.image}
              alt={displayEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 bg-primary/90 text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                {displayEvent.category}
              </span>
            </div>
          </div>

          <CardContent className="p-8 md:p-12">
            {/* Invitation Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  You're Invited!
                </h2>
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground text-lg">
                Join us for an unforgettable experience
              </p>
            </div>

            {/* Event Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {displayEvent.title}
              </h3>
            </div>

            {/* Event Details */}
            <div className="space-y-6 mb-8">
              {/* Description */}
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-foreground leading-relaxed">
                  {displayEvent.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="text-foreground font-semibold">
                      {formatDate(displayEvent.date)}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="text-foreground font-semibold">
                      {formatTime(displayEvent.date)} onwards
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground font-semibold">
                      {displayEvent.location}
                    </p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <User className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Organized By</p>
                    <p className="text-foreground font-semibold">
                      {displayEvent.organizer}
                    </p>
                  </div>
                </div>
              </div>

          
              
            </div>

            {/* Registration Button */}
            <div className="text-center">
              <Button
                onClick={handleRegister}
                className="w-full md:w-auto px-12 h-14 text-lg bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Register for this Event</span>
                </div>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Limited spots available. Register now to secure your place!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2025 ImagineX Events. All rights reserved.</p>
          <p className="mt-2">
            For any questions, please contact us at{" "}
            <a
              href="mailto:events@imaginex.com"
              className="text-primary hover:text-primary-glow transition-colors"
            >
              events@imaginex.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
