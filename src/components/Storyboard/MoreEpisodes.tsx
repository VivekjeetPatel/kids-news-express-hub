
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryboardEpisode } from '@/data/articles/storyboard';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MoreEpisodesProps {
  episodes: StoryboardEpisode[];
  seriesId: string;
  allEpisodesCount: number;
}

const MoreEpisodes: React.FC<MoreEpisodesProps> = ({ 
  episodes, 
  seriesId,
  allEpisodesCount
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">More Episodes</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {episodes.slice(0, 4).map((episode, index) => (
          <div 
            key={episode.id}
            className="rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer transition-transform hover:shadow-md"
            onClick={() => navigate(`/storyboard/${seriesId}/episode/${episode.id}`)}
          >
            <div className="relative">
              <AspectRatio ratio={9/16} className="max-w-[120px] mx-auto">
                <img 
                  src={episode.thumbnailUrl}
                  alt={episode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs font-medium rounded">
                  Episode {index + 1}
                </div>
              </AspectRatio>
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
      {allEpisodesCount > 4 && (
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
  );
};

export default MoreEpisodes;
