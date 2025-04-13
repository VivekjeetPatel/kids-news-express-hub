
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock } from 'lucide-react';
import { StoryboardEpisode } from '@/data/articles/storyboard';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface EpisodeCardProps {
  episode: StoryboardEpisode;
  onSelect: (episode: StoryboardEpisode) => void;
  isActive: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onSelect, isActive }) => {
  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${isActive ? 'ring-2 ring-flyingbus-blue' : 'hover:ring-1 hover:ring-flyingbus-blue/50'}`}
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
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
              <div className="bg-flyingbus-blue bg-opacity-80 rounded-full p-3">
                <Play size={24} className="text-white" />
              </div>
            </div>
          </AspectRatio>
        </div>
        <div className="p-3">
          <h4 className="font-medium text-sm mb-1">{episode.title}</h4>
          <div className="text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            {episode.duration}
            <span className="mx-2">•</span>
            {episode.releaseDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
