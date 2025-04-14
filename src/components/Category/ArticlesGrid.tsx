
import React from 'react';
import ArticleCard, { ArticleProps } from '@/components/Articles/ArticleCard';

interface ArticlesGridProps {
  articles: ArticleProps[];
  hasActiveFilters: boolean;
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({
  articles,
  hasActiveFilters
}) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">No articles found in this category.</h2>
        {hasActiveFilters && (
          <p className="mt-2 text-gray-500">Try removing some filters to see more results.</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
};

export default ArticlesGrid;
