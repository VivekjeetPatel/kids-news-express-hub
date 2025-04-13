
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { StoryboardArticleProps, StoryboardEpisode } from '@/data/articles/storyboard';
import { getArticleById } from '@/data/articles';
import VideoPlayer from '@/components/Articles/VideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  Clock, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookMarked
} from 'lucide-react';

const StoryboardEpisodePage = () => {
  const { seriesId, episodeId } = useParams<{ seriesId: string, episodeId: string }>();
  const navigate = useNavigate();
  
  // Get the series (storyboard article)
  const series = getArticleById(seriesId || '') as StoryboardArticleProps | undefined;
  
  if (!series || !series.episodes) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Series Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the series you're looking for.</p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Find the current episode
  const currentEpisode = series.episodes.find(ep => ep.id === episodeId);
  
  if (!currentEpisode) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Episode Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the episode you're looking for.</p>
          <Button asChild>
            <Link to={`/storyboard/${seriesId}`}>Back to Series</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Find the current episode index
  const currentIndex = series.episodes.findIndex(ep => ep.id === episodeId);
  const prevEpisode = currentIndex > 0 ? series.episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < series.episodes.length - 1 ? series.episodes[currentIndex + 1] : null;

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-flyingbus-background to-white pt-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost" 
              className="flex items-center"
              onClick={() => navigate(`/storyboard/${seriesId}`)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Series
            </Button>
            
            <Badge className="bg-flyingbus-blue">
              <BookMarked size={14} className="mr-1" />
              {series.title}
            </Badge>
          </div>
          
          {/* Video player section with immersive design */}
          <div className="rounded-xl overflow-hidden bg-black shadow-xl mb-6">
            <VideoPlayer videoUrl={currentEpisode.videoUrl} title={currentEpisode.title} />
            
            <div className="bg-gray-900 text-white p-4">
              <div className="mb-4">
                <h1 className="text-xl md:text-2xl font-semibold mb-1">
                  {currentEpisode.title}
                </h1>
                <div className="text-sm text-gray-400 flex items-center">
                  <span className="flex items-center mr-4">
                    <CalendarDays size={14} className="mr-1" />
                    {currentEpisode.releaseDate}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {currentEpisode.duration}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">
                {currentEpisode.description}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <div>
                  <span className="text-sm text-gray-400">
                    Episode {currentIndex + 1} of {series.episodes.length}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {prevEpisode && (
                    <Button 
                      variant="outline"
                      className="text-white border-gray-700 hover:bg-gray-800"
                      onClick={() => navigate(`/storyboard/${seriesId}/episode/${prevEpisode.id}`)}
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Previous
                    </Button>
                  )}
                  
                  {nextEpisode && (
                    <Button 
                      className="bg-flyingbus-blue hover:bg-flyingbus-blue/90"
                      onClick={() => navigate(`/storyboard/${seriesId}/episode/${nextEpisode.id}`)}
                    >
                      Next
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Series info and more episodes */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">More Episodes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.episodes.map((episode, index) => (
            episode.id !== currentEpisode.id && (
              <div 
                key={episode.id}
                className="rounded-lg overflow-hidden shadow cursor-pointer transition-transform hover:scale-105"
                onClick={() => navigate(`/storyboard/${seriesId}/episode/${episode.id}`)}
              >
                <div className="relative">
                  <img 
                    src={episode.thumbnailUrl}
                    alt={episode.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs font-medium rounded">
                    Episode {index + 1}
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-medium text-sm mb-1 line-clamp-1">
                    {episode.title}
                  </h4>
                  <p className="text-xs text-gray-500">{episode.duration}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default StoryboardEpisodePage;
