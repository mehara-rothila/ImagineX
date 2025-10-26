import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Link2, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { pastEvents, ongoingEvents } from "../lib/data";

export default function QRCodeGenerator() {
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const allEvents = [...pastEvents, ...ongoingEvents];
  const selectedEvent = allEvents.find((e) => e.id === selectedEventId);

  // Generate the invitation URL
  const baseUrl = window.location.origin;
  const invitationUrl = selectedEventId
    ? `${baseUrl}/invite/${selectedEventId}`
    : `${baseUrl}/invite/5`; // Default to first ongoing event

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `event-invitation-qr-${selectedEventId || "default"}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          }
        });
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Event Invitation QR Code Generator
          </h1>
          <p className="text-muted-foreground">
            Generate QR codes for event invitations that guests can scan to register
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Event</CardTitle>
              <CardDescription>
                Choose an event to generate its invitation QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {allEvents.slice(0, 10).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedEventId === event.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-accent/5"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle>Generated QR Code</CardTitle>
              <CardDescription>
                Scan this code to access the event invitation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={invitationUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              </div>

              {/* Selected Event Info */}
              {selectedEvent && (
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Selected Event</p>
                  <p className="font-semibold text-foreground">{selectedEvent.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedEvent.location}
                  </p>
                </div>
              )}

              {/* Invitation URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Invitation Link
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2 bg-muted rounded-lg border border-border text-sm text-foreground truncate">
                    {invitationUrl}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="shrink-0"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleDownloadQR}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(invitationUrl, "_blank")}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Preview Invitation Page
                </Button>
              </div>

              {/* Instructions */}
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">How to use:</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Select an event from the list</li>
                  <li>Download or share the QR code</li>
                  <li>Guests scan the code to view invitation</li>
                  <li>Guests can register directly from the page</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
