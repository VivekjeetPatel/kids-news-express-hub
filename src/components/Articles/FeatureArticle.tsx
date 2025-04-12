
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { ArticleProps } from './ArticleCard';

const FeatureArticle = ({
  id,
  title,
  excerpt,
  category,
  author,
  publishDate,
  imageUrl,
  readingLevel,
}: ArticleProps) => {
  // Map categories to colors
  const getCategoryColor = (category: string) => {
    const categories: {[key: string]: string} = {
      'Headliners': 'bg-flyingbus-purple text-white',
      'Debates': 'bg-flyingbus-red text-white',
      'Spice It Up': 'bg-flyingbus-orange text-white',
      'Storyboard': 'bg-flyingbus-blue text-white',
      'In the Neighborhood': 'bg-flyingbus-green text-white',
      'Learning': 'bg-flyingbus-yellow text-black',
      'School News': 'bg-flyingbus-pink text-white'
    };
    
    return categories[category] || 'bg-gray-500 text-white';
  };

  return (
    <article className="relative rounded-lg overflow-hidden shadow-md group">
      <div className="relative aspect-[16/9]">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Badge className={`${getCategoryColor(category)}`}>
            {category}
          </Badge>
          {readingLevel && (
            <Badge className="bg-white text-gray-800">
              Level: {readingLevel}
            </Badge>
          )}
        </div>
        
        <h2 className="text-xl md:text-3xl font-medium mb-2 md:mb-3">
          {title}
        </h2>
        
        <p className="text-white/90 mb-3 max-w-3xl text-sm md:text-base line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="block text-sm text-white/90">By {author}</span>
            <span className="flex items-center text-xs text-white/70 mt-1">
              <CalendarDays size={12} className="mr-1" />
              {publishDate}
            </span>
          </div>
          
          <Link to={`/article/${id}`} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium rounded-md px-3 py-1.5 flex items-center transition-colors">
            Read More <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeatureArticle;
