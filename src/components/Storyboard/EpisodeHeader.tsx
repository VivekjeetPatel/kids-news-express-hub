
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookMarked } from 'lucide-react';

interface EpisodeHeaderProps {
  seriesId: string;
  seriesTitle: string;
}

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ seriesId, seriesTitle }) => {
  const navigate = useNavigate();
  
  return (
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
        {seriesTitle}
      </Badge>
    </div>
  );
};

export default EpisodeHeader;
