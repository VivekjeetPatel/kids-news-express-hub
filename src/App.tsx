
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import CategoryPage from '@/pages/CategoryPage';
import ArticlePage from '@/pages/ArticlePage';
import About from '@/pages/About';
import ReaderAuth from '@/pages/ReaderAuth';
import StoryboardPage from '@/pages/StoryboardPage';
import StoryboardEpisodePage from '@/pages/StoryboardEpisodePage';
import StoryboardCategoryPage from '@/pages/StoryboardCategoryPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/:mode" element={<ReaderAuth />} />
      <Route path="/storyboard" element={<StoryboardCategoryPage />} />
      <Route path="/storyboard/:id" element={<StoryboardPage />} />
      <Route path="/storyboard/:seriesId/episode/:episodeId" element={<StoryboardEpisodePage />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
