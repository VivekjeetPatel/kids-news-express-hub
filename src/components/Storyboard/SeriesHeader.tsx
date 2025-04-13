
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookMarked, CalendarDays } from 'lucide-react';
import { getCategoryColor } from '@/utils/categoryColors';
import { ArticleProps } from '@/components/Articles/ArticleCard';

interface SeriesHeaderProps {
  article: ArticleProps;
}

const SeriesHeader: React.FC<SeriesHeaderProps> = ({ article }) => {
  const navigate = useNavigate();
  
  // Sample background images for Storyboard series - using direct URLs without query params
  const sampleBackgrounds = [
    'https://images.unsplash.com/photo-1516849677043-ef67c9557e16', 
    'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9', 
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa' 
  ];

  // Choose a background image, default to the article's image or a fallback
  const backgroundImage = article.imageUrl || 
    sampleBackgrounds[Math.floor(Math.random() * sampleBackgrounds.length)];
  
  console.log("Background image URL:", backgroundImage); // Debug the selected image URL
  
  return (
    <div className="relative w-full" style={{ margin: '0', padding: '0' }}>
      {/* Full-width background image with overlay gradient */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 w-screen bg-cover bg-center" 
        style={{ 
          backgroundImage: `url("${backgroundImage}")`,
          backgroundPosition: 'center 20%',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          position: 'absolute',
          height: '100%',
          zIndex: 0
        }}>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-flyingbus-background" 
             style={{ width: '100%', height: '100%' }}></div>
      </div>
      
      <div className="relative pt-6 pb-16 w-full z-10">
        <div className="container mx-auto px-4">
          <Button
            variant="outline" 
            className="mb-4 flex items-center bg-black/30 text-white border-white/30 hover:bg-black/50 hover:text-white"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
          
          {/* Series Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={`${getCategoryColor('Storyboard')} bg-opacity-80`}>
                <BookMarked size={14} className="mr-1" />
                Storyboard Series
              </Badge>
              {article.readingLevel && (
                <Badge variant="outline" className="bg-black/30 border-white/30 text-white">
                  {article.readingLevel}
                </Badge>
              )}
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-3 leading-tight text-white drop-shadow-md">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-white/80 mb-5">
              <span className="mr-4 font-medium">Created by {article.author}</span>
              <span className="flex items-center mr-4">
                <CalendarDays size={16} className="mr-1" />
                Series started on {article.publishDate}
              </span>
            </div>
            
            <p className="text-lg text-white/90 max-w-3xl mb-6 drop-shadow">
              {article.excerpt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesHeader;
