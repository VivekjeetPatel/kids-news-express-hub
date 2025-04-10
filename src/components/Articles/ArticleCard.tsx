
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
    <article className="article-card group">
      <Link to={`/article/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className={`absolute top-2 left-2 ${getCategoryColor(category)}`}>
            {category}
          </Badge>
          {readingLevel && (
            <Badge className="absolute top-2 right-2 bg-white text-flyingbus-purple">
              Reading Level: {readingLevel}
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-xl font-bold mb-2 line-clamp-2 group-hover:text-flyingbus-purple transition-colors">
            {title}
          </h3>
          <p className="text-flyingbus-muted-text text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex justify-between items-center text-xs text-flyingbus-muted-text">
            <span>By {author}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <CalendarDays size={14} className="mr-1" />
                {publishDate}
              </span>
              {commentCount !== undefined && (
                <span className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
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
