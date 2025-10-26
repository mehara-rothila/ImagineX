import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, User, Mail, Building2, Briefcase, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { pastEvents, ongoingEvents } from "../lib/data";
import logo from "../assets/logo.jpg";

export default function EventRegistration() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
  });

  // Find event from all events
  const allEvents = [...pastEvents, ...ongoingEvents];
  const event = allEvents.find((e) => e.id === eventId);
  const sampleEvent = ongoingEvents[0] || allEvents[0];
  const displayEvent = event || sampleEvent;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      company: "",
      position: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
      isValid = false;
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsRegistering(true);

    // Simulate registration process
    setTimeout(() => {
      console.log("Registration data:", {
        ...formData,
        eventId: displayEvent.id,
        eventTitle: displayEvent.title,
        registeredAt: new Date().toISOString(),
      });
      setIsRegistering(false);
      setIsRegistered(true);
    }, 1500);
  };

  const handleBackToInvitation = () => {
    navigate(`/invite/${eventId || "5"}`);
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

      {/* Registration Card */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <img src={logo} alt="ImagineX Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">ImagineX Events</h1>
        </div>

        {!isRegistered ? (
          <Card className="overflow-hidden shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToInvitation}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Invitation
                </Button>
              </div>
              <CardTitle className="text-2xl md:text-3xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Event Registration
              </CardTitle>
              <CardDescription className="text-base">
                Complete the form below to register for this event
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              {/* Event Info Summary */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex gap-3 items-start">
                  <img
                    src={displayEvent.image}
                    alt={displayEvent.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg mb-1 truncate">
                      {displayEvent.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(displayEvent.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{displayEvent.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`h-11 bg-background/50 ${
                      errors.name ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-11 bg-background/50 ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Company *
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                    className={`h-11 bg-background/50 ${
                      errors.company ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.company && (
                    <p className="text-sm text-red-500 mt-1">{errors.company}</p>
                  )}
                </div>

                {/* Position Field */}
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Position *
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    type="text"
                    placeholder="Enter your job position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`h-11 bg-background/50 ${
                      errors.position ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.position && (
                    <p className="text-sm text-red-500 mt-1">{errors.position}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                  >
                    {isRegistering ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Completing Registration...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Complete Registration</span>
                      </div>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    * All fields are required
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          // Success Message
          <Card className="overflow-hidden shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border-4 border-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                </div>

                {/* Success Message */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Registration Successful! 🎉
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    You're all set for the event
                  </p>
                </div>

                {/* Registered User Info */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 space-y-3 text-left">
                  <h3 className="font-semibold text-foreground text-center mb-4">
                    Registration Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-semibold text-foreground">{formData.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-semibold text-foreground">{formData.position}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50 mt-4">
                    <p className="text-sm text-muted-foreground">Event</p>
                    <p className="font-semibold text-foreground">{displayEvent.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(displayEvent.date)}
                    </p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-muted/50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold text-foreground mb-3 text-center">
                    What's Next?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Confirmation email sent to {formData.email}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Event details and access information included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>You'll receive a reminder 24 hours before the event</span>
                    </li>
                  </ul>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleBackToInvitation}
                  variant="outline"
                  className="w-full md:w-auto px-8"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Invitation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2025 ImagineX Events. All rights reserved.</p>
          <p className="mt-2">
            Questions?{" "}
            <a
              href="mailto:events@imaginex.com"
              className="text-primary hover:text-primary-glow transition-colors"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
