
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListVideo } from 'lucide-react';
import EpisodeCard from '@/components/Storyboard/EpisodeCard';
import { StoryboardEpisode } from '@/data/articles/storyboard';

interface EpisodesListProps {
  episodes: StoryboardEpisode[];
  seriesId: string;
}

const EpisodesList: React.FC<EpisodesListProps> = ({ episodes, seriesId }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <ListVideo size={20} className="mr-2 text-flyingbus-blue" />
        All Episodes
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {episodes.map((episode, index) => (
          <EpisodeCard 
            key={episode.id}
            episode={episode}
            onSelect={(selectedEpisode) => navigate(`/storyboard/${seriesId}/episode/${selectedEpisode.id}`)}
            isActive={false}
            episodeNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodesList;
