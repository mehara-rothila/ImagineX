import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

interface EventStatCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  gradient: string;
  trend?: string;
}

export function EventStatCard({ title, count, icon: Icon, gradient, trend }: EventStatCardProps) {
  return (
    <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{count}</h3>
            {trend && (
              <p className="text-xs text-gray-600 dark:text-gray-400">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${gradient}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
