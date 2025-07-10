
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnboardingQ3Future from "./pages/OnboardingQ3Future";
import DashboardQ3 from "./pages/DashboardQ3";
import CavernaDaSabedoria from "./pages/CavernaDaSabedoria";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding-q3" element={<OnboardingQ3Future />} />
            <Route path="/dashboard-q3" element={<DashboardQ3 />} />
            <Route path="/caverna-da-sabedoria" element={<CavernaDaSabedoria />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
