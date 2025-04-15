
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
      <div className="flex gap-2 mb-3">
        <Badge className={`${getCategoryColor(category)}`}>
          {category}
        </Badge>
        
        {readingLevel && (
          <Badge className="bg-white text-gray-800">
            Level: {readingLevel}
          </Badge>
        )}
      </div>
      
      <h2 className="text-white text-xl md:text-3xl font-bold mb-2 md:mb-3 font-young-serif">
        {title}
      </h2>
    </>
  );
};

export default FeatureArticleHeader;
