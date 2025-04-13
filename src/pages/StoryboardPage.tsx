
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { StoryboardArticleProps, StoryboardEpisode } from '@/data/articles/storyboard';
import { getArticleById } from '@/data/articles';
import EpisodeCard from '@/components/Storyboard/EpisodeCard';
import VideoPlayer from '@/components/Articles/VideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, BookMarked, ArrowLeft } from 'lucide-react';
import { getCategoryColor } from '@/utils/categoryColors';

const StoryboardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = getArticleById(id || '') as StoryboardArticleProps | undefined;
  
  // If no article is found, or if it's not a storyboard article (no episodes)
  if (!article || !article.episodes || article.episodes.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Storyboard Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the storyboard series you're looking for.</p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // State for the currently selected episode
  const [currentEpisode, setCurrentEpisode] = useState<StoryboardEpisode>(article.episodes[0]);

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-flyingbus-background to-white py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost" 
            className="mb-4 flex items-center"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-2 mb-4">
            <Badge className={`${getCategoryColor('Storyboard')}`}>
              <BookMarked size={14} className="mr-1" />
              Storyboard Series
            </Badge>
            {article.readingLevel && (
              <Badge variant="outline" className="bg-white border text-flyingbus-purple">
                {article.readingLevel}
              </Badge>
            )}
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-flyingbus-muted-text mb-6">
            <span className="mr-4 font-medium">Created by {article.author}</span>
            <span className="flex items-center mr-4">
              <CalendarDays size={16} className="mr-1" />
              Series started on {article.publishDate}
            </span>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mb-6">
            {article.excerpt}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content - Video player */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <VideoPlayer videoUrl={currentEpisode.videoUrl} title={currentEpisode.title} />
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">{currentEpisode.title}</h2>
              <div className="text-sm text-gray-500 mb-4">
                {currentEpisode.releaseDate} • {currentEpisode.duration}
              </div>
              <p className="text-gray-700">{currentEpisode.description}</p>
            </div>
          </div>
          
          {/* Sidebar - Episodes list */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-0.5 bg-flyingbus-blue mr-2"></span>
                Episodes
              </h3>
              
              <div className="space-y-4">
                {article.episodes.map((episode) => (
                  <EpisodeCard 
                    key={episode.id}
                    episode={episode}
                    onSelect={setCurrentEpisode}
                    isActive={currentEpisode.id === episode.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoryboardPage;
