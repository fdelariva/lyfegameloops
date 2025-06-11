
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import OnboardingOracle from "./pages/OnboardingOracle";
import OnboardingStreak from "./pages/OnboardingStreak";
import OnboardingCompetitive from "./pages/OnboardingCompetitive";
import OnboardingHero from "./pages/OnboardingHero";
import OnboardingFinch from "./pages/OnboardingFinch";
import OnboardingQ3Future from "./pages/OnboardingQ3Future";
import Dashboard from "./pages/Dashboard";
import DashboardQ3 from "./pages/DashboardQ3";
import Shop from "./pages/Shop";
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
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/onboarding-oracle" element={<OnboardingOracle />} />
            <Route path="/onboarding-streak" element={<OnboardingStreak />} />
            <Route path="/onboarding-competitive" element={<OnboardingCompetitive />} />
            <Route path="/onboarding-hero" element={<OnboardingHero />} />
            <Route path="/onboarding-finch" element={<OnboardingFinch />} />
            <Route path="/onboarding-q3" element={<OnboardingQ3Future />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-q3" element={<DashboardQ3 />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
