import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Account from "./pages/Account";
import Reservation from "./pages/Reservation";
import Catering from "./pages/Catering";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";

import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import MenuPage from "@/pages/MenuPage";
import FullMenu from "@/pages/FullMenu";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/full" element={<FullMenu />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Feature Routes */}
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/reservation-confirmation" element={<Confirmation />} />
          <Route path="/catering-confirmation" element={<Confirmation />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
