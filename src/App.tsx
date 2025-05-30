
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import OnboardingDestinyCards from "./pages/OnboardingDestinyCards";
import OnboardingOracle from "./pages/OnboardingOracle";
import OnboardingStreak from "./pages/OnboardingStreak";
import OnboardingChallenges from "./pages/OnboardingChallenges";
import OnboardingCompetitive from "./pages/OnboardingCompetitive";
import OnboardingHero from "./pages/OnboardingHero";
import OnboardingFinch from "./pages/OnboardingFinch";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding-destiny" element={<OnboardingDestinyCards />} />
          <Route path="/onboarding-oracle" element={<OnboardingOracle />} />
          <Route path="/onboarding-streak" element={<OnboardingStreak />} />
          <Route path="/onboarding-challenges" element={<OnboardingChallenges />} />
          <Route path="/onboarding-competitive" element={<OnboardingCompetitive />} />
          <Route path="/onboarding-hero" element={<OnboardingHero />} />
          <Route path="/onboarding-finch" element={<OnboardingFinch />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
