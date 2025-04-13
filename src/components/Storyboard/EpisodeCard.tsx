
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock } from 'lucide-react';
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
          <AspectRatio ratio={16/9}>
            <img 
              src={episode.thumbnailUrl} 
              alt={episode.title} 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 flex items-center justify-center ${
              isActive 
                ? 'bg-black/40' 
                : 'bg-black/60 hover:bg-black/40'
              } transition-all duration-200`}>
              <div className={`${
                isActive 
                  ? 'bg-white' 
                  : 'bg-flyingbus-blue/90'
                } rounded-full p-3 transform transition-transform duration-200 hover:scale-110`}>
                <Play 
                  size={24} 
                  className={isActive ? 'text-flyingbus-blue' : 'text-white'} 
                  fill={isActive ? 'currentColor' : 'none'}
                  fillOpacity={isActive ? 0.2 : 0}
                />
              </div>
            </div>
            {episodeNumber && (
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs font-medium rounded">
                Episode {episodeNumber}
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs font-medium rounded flex items-center">
              <Clock size={12} className="mr-1" />
              {episode.duration}
            </div>
          </AspectRatio>
        </div>
        <div className="p-3">
          <h4 className={`font-medium text-sm mb-1 line-clamp-1 ${isActive ? 'text-flyingbus-blue' : ''}`}>
            {episode.title}
          </h4>
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
