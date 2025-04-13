
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryboardEpisode } from '@/data/articles/storyboard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EpisodeNavigationProps {
  prevEpisode: StoryboardEpisode | null;
  nextEpisode: StoryboardEpisode | null;
  seriesId: string;
}

const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({ 
  prevEpisode, 
  nextEpisode, 
  seriesId 
}) => {
  const navigate = useNavigate();
  
  if (!prevEpisode && !nextEpisode) return null;
  
  return (
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
  );
};

export default EpisodeNavigation;
