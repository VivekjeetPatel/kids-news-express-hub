
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StoryboardEpisode } from '@/data/articles/storyboard';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface EpisodeCardProps {
  episode: StoryboardEpisode;
  onSelect: (episode: StoryboardEpisode) => void;
  isActive: boolean;
  episodeNumber?: number;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ 
  episode, 
  onSelect, 
  isActive,
  episodeNumber 
}) => {
  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        isActive 
          ? 'ring-2 ring-flyingbus-blue bg-flyingbus-blue/5' 
          : 'hover:ring-1 hover:ring-flyingbus-blue/50'
      }`}
      onClick={() => onSelect(episode)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={9/16} className="max-w-[180px] mx-auto">
            <img 
              src={episode.thumbnailUrl} 
              alt={episode.title} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        <div className="p-3">
          <h4 className={`font-medium text-sm mb-1 line-clamp-1 ${isActive ? 'text-flyingbus-blue' : ''}`}>
            {episodeNumber ? `Episode ${episodeNumber}: ${episode.title}` : episode.title}
          </h4>
          <p className="text-xs text-gray-500 mb-1">
            {episode.duration}
          </p>
          <p className="text-xs text-gray-500 line-clamp-2 h-8">
            {episode.description.substring(0, 75)}
            {episode.description.length > 75 ? '...' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
