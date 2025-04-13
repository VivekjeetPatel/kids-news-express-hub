
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

  // Filter episodes for "More Episodes" section (excluding current)
  const otherEpisodes = series.episodes.filter(ep => ep.id !== currentEpisode.id);

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-flyingbus-background to-white py-6">
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
          
          {/* Main content: Video next to Details */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Video section - optimized for 9:16 aspect ratio */}
            <div className="lg:col-span-4 md:mx-auto w-full">
              <VideoPlayer 
                videoUrl={currentEpisode.videoUrl} 
                title={currentEpisode.title}
                showTitlePanel={false}
                duration={currentEpisode.duration}
                aspectRatio={9/16}
              />
              
              {/* Navigation buttons for mobile only */}
              <div className="mt-4 flex gap-2 justify-between items-center lg:hidden">
                {prevEpisode && (
                  <Button 
                    variant="outline"
                    className="text-gray-800 border-gray-300 hover:bg-gray-100"
                    onClick={() => navigate(`/storyboard/${seriesId}/episode/${prevEpisode.id}`)}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </Button>
                )}
                
                {nextEpisode && (
                  <Button 
                    className="bg-gray-800 text-white hover:bg-gray-700"
                    onClick={() => navigate(`/storyboard/${seriesId}/episode/${nextEpisode.id}`)}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Content section - details + more episodes */}
            <div className="lg:col-span-8">
              {/* Episode details */}
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="mb-4">
                  <h1 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                    {currentEpisode.title}
                  </h1>
                  <div className="text-sm text-gray-600 flex items-center flex-wrap gap-y-2">
                    <span className="flex items-center mr-4">
                      <CalendarDays size={14} className="mr-1 text-flyingbus-muted-text" />
                      {currentEpisode.releaseDate}
                    </span>
                    <span className="flex items-center mr-4">
                      <Clock size={14} className="mr-1 text-flyingbus-muted-text" />
                      {currentEpisode.duration}
                    </span>
                    <span className="text-gray-500">
                      Episode {currentIndex + 1} of {series.episodes.length}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  {currentEpisode.description}
                </p>
                
                {/* Navigation buttons for desktop only */}
                <div className="mt-6 flex gap-2 justify-end items-center hidden lg:flex">
                  {prevEpisode && (
                    <Button 
                      variant="outline"
                      className="text-gray-800 border-gray-300 hover:bg-gray-100"
                      onClick={() => navigate(`/storyboard/${seriesId}/episode/${prevEpisode.id}`)}
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Previous
                    </Button>
                  )}
                  
                  {nextEpisode && (
                    <Button 
                      className="bg-gray-800 text-white hover:bg-gray-700"
                      onClick={() => navigate(`/storyboard/${seriesId}/episode/${nextEpisode.id}`)}
                    >
                      Next
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  )}
                </div>
              </div>
              
              {/* More episodes section */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">More Episodes</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherEpisodes.slice(0, 4).map((episode, index) => (
                    <div 
                      key={episode.id}
                      className="rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer transition-transform hover:shadow-md"
                      onClick={() => navigate(`/storyboard/${seriesId}/episode/${episode.id}`)}
                    >
                      <div className="relative">
                        <img 
                          src={episode.thumbnailUrl}
                          alt={episode.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs font-medium rounded">
                          Episode {series.episodes.indexOf(episode) + 1}
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <h4 className="font-medium text-sm mb-1 line-clamp-1">
                          {episode.title}
                        </h4>
                        <p className="text-xs text-gray-500">{episode.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View all episodes button */}
                {otherEpisodes.length > 4 && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/storyboard/${seriesId}`)}
                    >
                      View All Episodes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoryboardEpisodePage;
