
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryboardEpisode } from '@/data/articles/storyboard';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface EpisodeDetailsProps {
  currentEpisode: StoryboardEpisode;
  prevEpisode: StoryboardEpisode | null;
  nextEpisode: StoryboardEpisode | null;
  seriesId: string;
  currentIndex: number;
  totalEpisodes: number;
}

const EpisodeDetails: React.FC<EpisodeDetailsProps> = ({ 
  currentEpisode, 
  prevEpisode, 
  nextEpisode, 
  seriesId, 
  currentIndex,
  totalEpisodes
}) => {
  const navigate = useNavigate();
  
  return (
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
            Episode {currentIndex + 1} of {totalEpisodes}
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
  );
};

export default EpisodeDetails;
