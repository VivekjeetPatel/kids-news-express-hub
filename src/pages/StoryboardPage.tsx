
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { StoryboardArticleProps, StoryboardEpisode } from '@/data/articles/storyboard';
import { getArticleById } from '@/data/articles';
import EpisodeCard from '@/components/Storyboard/EpisodeCard';
import VideoPlayer from '@/components/Articles/VideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CalendarDays, 
  BookMarked, 
  ArrowLeft, 
  Play,
  Info,
  ListVideo
} from 'lucide-react';
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
  const [showInfo, setShowInfo] = useState(true);

  // Find the current episode index
  const currentIndex = article.episodes.findIndex(ep => ep.id === currentEpisode.id);
  
  // Handle next/previous episode navigation
  const goToNextEpisode = () => {
    if (currentIndex < article.episodes.length - 1) {
      setCurrentEpisode(article.episodes[currentIndex + 1]);
    }
  };
  
  const goToPreviousEpisode = () => {
    if (currentIndex > 0) {
      setCurrentEpisode(article.episodes[currentIndex - 1]);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-flyingbus-background to-white pt-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost" 
            className="mb-4 flex items-center"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
          
          {/* Video player section with immersive design */}
          <div className="rounded-xl overflow-hidden bg-black shadow-xl mb-6">
            <VideoPlayer videoUrl={currentEpisode.videoUrl} title={currentEpisode.title} />
            
            <div className="bg-gray-900 text-white p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-1">{currentEpisode.title}</h2>
                  <div className="text-sm text-gray-400 mb-2 flex items-center">
                    {currentEpisode.releaseDate} • {currentEpisode.duration}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-gray-700 hover:bg-gray-800"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info size={16} className="mr-1" />
                    {showInfo ? 'Hide Info' : 'Show Info'}
                  </Button>
                </div>
              </div>
              
              {showInfo && (
                <div className="mt-3 text-gray-300 text-sm">
                  <p>{currentEpisode.description}</p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button 
                  className="bg-flyingbus-blue hover:bg-flyingbus-blue/90"
                  onClick={goToPreviousEpisode}
                  disabled={currentIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  className="bg-flyingbus-blue hover:bg-flyingbus-blue/90"
                  onClick={goToNextEpisode}
                  disabled={currentIndex === article.episodes.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Series info and episodes list */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
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
          
          <div className="flex flex-wrap items-center text-flyingbus-muted-text mb-4">
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
        
        {/* Episodes list with improved grid layout */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <ListVideo size={20} className="mr-2 text-flyingbus-blue" />
            All Episodes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {article.episodes.map((episode, index) => (
              <EpisodeCard 
                key={episode.id}
                episode={episode}
                onSelect={setCurrentEpisode}
                isActive={currentEpisode.id === episode.id}
                episodeNumber={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoryboardPage;
