
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MessageSquare } from 'lucide-react';

export interface ArticleProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  imageUrl: string;
  readingLevel?: string;
  commentCount?: number;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  category,
  author,
  publishDate,
  imageUrl,
  readingLevel,
  commentCount,
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
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <Link to={`/article/${id}`} className="block h-full">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className={`absolute top-2 left-2 ${getCategoryColor(category)}`}>
            {category}
          </Badge>
          {readingLevel && (
            <Badge className="absolute top-2 right-2 bg-white text-gray-700 text-xs">
              Level: {readingLevel}
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-flyingbus-purple transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {excerpt}
          </p>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>By {author}</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <CalendarDays size={12} className="mr-1" />
                {publishDate}
              </span>
              {commentCount !== undefined && (
                <span className="flex items-center">
                  <MessageSquare size={12} className="mr-1" />
                  {commentCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
