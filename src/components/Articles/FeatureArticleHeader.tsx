
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
      {readingLevel && (
        <Badge className="bg-white text-gray-800">
          Level: {readingLevel}
        </Badge>
      )}
      
      <h2 className="feature-article-title">
        {title}
      </h2>
    </>
  );
};

export default FeatureArticleHeader;
