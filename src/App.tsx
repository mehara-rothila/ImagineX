import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { TopBar } from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import UpcomingEvents from "./pages/UpcomingEvents";
import OngoingEvents from "./pages/OngoingEvents";
import OngoingEventDetails from "./pages/OngoingEventDetails";
import PastEvents from "./pages/PastEvents";
import EventDetails from "./pages/EventDetails";
import Feedback from "./pages/Feedback";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <TopBar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upcoming" element={<UpcomingEvents />} />
                <Route path="/ongoing" element={<OngoingEvents />} />
                <Route path="/ongoing/:eventId" element={<OngoingEventDetails />} />
                <Route path="/past" element={<PastEvents />} />
                <Route path="/past/:eventId" element={<EventDetails />} />
                <Route path="/past/:eventId/feedback" element={<Feedback />} />
                <Route path="/past/report" element={<Report />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
