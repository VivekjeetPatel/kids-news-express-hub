
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FeatureArticleHeaderProps {
  title: string;
  category: string;
  readingLevel?: string;
}

const FeatureArticleHeader = ({ title, category, readingLevel }: FeatureArticleHeaderProps) => {
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
    <>
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
      
      <h2 className="feature-article-title">
        {title}
      </h2>
    </>
  );
};

export default FeatureArticleHeader;
