import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function CreateEventForm({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Fill in the details to create a new event.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <Input placeholder="Enter event name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <Input placeholder="Enter company name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <Input type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Event Place</label>
            <Input placeholder="Enter event place" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Participant Count</label>
            <Input type="number" min="1" placeholder="Enter participant count" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Add CSV File</label>
            <Input type="file" accept=".csv" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Requirements</label>
            <Input placeholder="Enter requirements" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Event Photo</label>
            <Input type="file" accept="image/*" />
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
