
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
import { useAuth } from "./contexts/AuthContext";
import CategoryPage from "./pages/CategoryPage";

const queryClient = new QueryClient();

// Create a wrapper component to pass the current user to ReaderProfileEdit
const ProfileEditWrapper = () => {
  const { currentUser } = useAuth();
  return currentUser ? <ReaderProfileEdit profile={currentUser} /> : <NotFound />;
};

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
            <Route path="/profile/:username/edit" element={<ProfileEditWrapper />} />
            <Route path="/reader-auth" element={<ReaderAuth />} />
            {/* Category routes */}
            <Route path="/headliners" element={<CategoryPage />} />
            <Route path="/debates" element={<CategoryPage />} />
            <Route path="/spice-it-up" element={<CategoryPage />} />
            <Route path="/neighborhood" element={<CategoryPage />} />
            <Route path="/learning" element={<CategoryPage />} />
            <Route path="/school-news" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
