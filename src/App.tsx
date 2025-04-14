console.log('App.tsx is rendering');

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import StoryboardPage from "./pages/StoryboardPage";
import StoryboardEpisodePage from "./pages/StoryboardEpisodePage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ReaderProfilePage from "./components/Readers/ReaderProfilePage";
import ReaderAuth from "./pages/ReaderAuth";
import { AuthProvider } from "./contexts/AuthContext";
import ReaderProfileEdit from "./components/Readers/ReaderProfileEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/storyboard/:id" element={<StoryboardPage />} />
            <Route path="/storyboard/:seriesId/episode/:episodeId" element={<StoryboardEpisodePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:username" element={<ReaderProfilePage />} />
            <Route path="/profile/:username/edit" element={<ReaderProfileEdit profile={/* pass current user profile */} />} />
            <Route path="/reader-auth" element={<ReaderAuth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
