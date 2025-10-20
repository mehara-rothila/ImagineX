import { Bell, User } from "lucide-react";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2" />
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hover:bg-purple-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        
        <Avatar className="h-9 w-9 cursor-pointer border-2 border-purple-600/20 hover:border-purple-600/40 transition-all">
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white font-semibold">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
