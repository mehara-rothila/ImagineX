import * as React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { toast } from "../hooks/use-toast";

type StatusKey = "invitation" | "welcome" | "feedback" | "images";

const STATUS_ITEMS: { key: StatusKey; label: string; description?: string }[] = [
  { key: "invitation", label: "Invitation", description: "Send event invitations via QR." },
  { key: "welcome", label: "Welcome Message", description: "Show a welcome message on scan." },
  { key: "feedback", label: "Feedback Form", description: "Collect feedback after the event." },
  { key: "images", label: "Event Images", description: "Allow participants to view event images." },
];

export default function QrStatus({
  initial = [] as StatusKey[],
}: {
  initial?: StatusKey[];
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<StatusKey[]>(initial);

  const toggle = (key: StatusKey) => {
    if (selected.includes(key)) {
      setSelected((s) => s.filter((x) => x !== key));
      return;
    }
    if (selected.length >= 2) {
      toast({ title: "Limit reached", description: "You can enable up to 2 statuses." });
      return;
    }
    setSelected((s) => [...s, key]);
  };

  const handleSave = () => {
    // Mock save -- in a real app, call API to persist the QR status
    toast({ title: "QR Status Saved", description: `Enabled: ${selected.map(s => STATUS_ITEMS.find(i => i.key === s)?.label).join(", ") || "None"}` });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#690a69] text-white w-full">
          QR Status
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Status</DialogTitle>
          <DialogDescription>Select up to two statuses to enable for this event.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {STATUS_ITEMS.map((item) => {
            const checked = selected.includes(item.key);
            return (
              <label key={item.key} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.key)}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <div className="font-medium">{item.label}</div>
                  {item.description && <div className="text-sm text-gray-500">{item.description}</div>}
                </div>
              </label>
            );
          })}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
