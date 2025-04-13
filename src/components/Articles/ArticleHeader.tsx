
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock } from 'lucide-react';
import { ArticleProps } from '@/components/Articles/ArticleCard';
import { getCategoryColor } from '@/utils/categoryColors';

interface ArticleHeaderProps {
  article: ArticleProps;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <div className="bg-gradient-to-b from-flyingbus-background to-white py-12 mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-6">
            <Badge className={`${getCategoryColor(article.category)}`}>
              {article.category}
            </Badge>
            {article.readingLevel && (
              <Badge variant="outline" className="bg-white border text-flyingbus-purple">
                Reading Level: {article.readingLevel}
              </Badge>
            )}
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-left">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-flyingbus-muted-text mb-8">
            <span className="mr-4 font-medium">By {article.author}</span>
            <span className="flex items-center mr-4">
              <CalendarDays size={16} className="mr-1" />
              {article.publishDate}
            </span>
            <span className="flex items-center mr-4">
              <Clock size={16} className="mr-1" />
              5 min read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
