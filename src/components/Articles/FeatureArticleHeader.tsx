
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getCategoryColor } from '@/utils/categoryColors';

interface FeatureArticleHeaderProps {
  title: string;
  category: string;
  readingLevel?: string;
}

const FeatureArticleHeader = ({ title, category, readingLevel }: FeatureArticleHeaderProps) => {
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
