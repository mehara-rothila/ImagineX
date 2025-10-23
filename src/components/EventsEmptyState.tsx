import { Calendar } from "lucide-react";
import { Button } from "./ui/button";

interface EventsEmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function EventsEmptyState({ hasFilters, onClearFilters }: EventsEmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-500 mb-4">
          {hasFilters
            ? "Try adjusting your search or filter criteria."
            : "No upcoming events found."}
        </p>
        {hasFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
