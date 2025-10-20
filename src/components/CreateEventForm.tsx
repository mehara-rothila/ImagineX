import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function CreateEventForm({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Fill in the details to create a new event.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Name</label>
              <Input placeholder="Enter event name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <Input placeholder="Enter company name" />
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Category</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">Select category</option>
                <option value="major-event">Major Event</option>
                <option value="music">Music</option>
                <option value="rigging-service">Rigging Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <Input type="date" />
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Place</label>
              <Input placeholder="Enter event place" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Participant Count</label>
              <Input type="number" min="1" placeholder="Enter participant count" />
            </div>
          </div>
          
          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Add CSV File</label>
              <Input type="file" accept=".csv" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Photo</label>
              <Input type="file" accept="image/*" />
            </div>
          </div>
          
          {/* Row 5 - Full width fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Requirements</label>
            <Input placeholder="Enter requirements" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Special Notes</label>
            <Input placeholder="Enter special notes" />
          </div>
          
          <DialogFooter>
            <Button type="submit">Create Event</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
