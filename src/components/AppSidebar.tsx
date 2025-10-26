import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, Clock, History, LogOut, QrCode } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../components/ui/sidebar";
import logo from "../assets/logo.jpg";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Upcoming Events", url: "/upcoming", icon: Calendar },
  { title: "Ongoing Events", url: "/ongoing", icon: Clock },
  { title: "Past Events", url: "/past", icon: History },
  { title: "QR Generator", url: "/qr-generator", icon: QrCode },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="p-6 pb-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ImagineX Logo" className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">ImagineX</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Event Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-3">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all duration-200 h-11">
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-500/30 font-semibold rounded-lg hover:from-purple-700 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] relative before:absolute before:inset-0 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                          : "text-gray-300 hover:text-purple-300 hover:bg-purple-50 rounded-lg font-medium hover:scale-[1.02] hover:shadow-sm"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-[1.02]">
              <NavLink to="/login">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
