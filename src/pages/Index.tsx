
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import FeatureArticle from '@/components/Articles/FeatureArticle';
import CategorySection from '@/components/Articles/CategorySection';
import { getHeadlineArticle, getCategoryArticles } from '@/data/mockArticles';

const Index = () => {
  const headlineArticle = getHeadlineArticle();
  const categoryMapping = [
    { title: 'Headliners', slug: 'headliners', color: 'purple' },
    { title: 'Debates', slug: 'debates', color: 'red' },
    { title: 'Spice It Up', slug: 'spice-it-up', color: 'orange' },
    { title: 'Storyboard', slug: 'storyboard', color: 'blue' },
    { title: 'In the Neighborhood', slug: 'neighborhood', color: 'green' },
    { title: 'Learning', slug: 'learning', color: 'yellow' },
    { title: 'School News', slug: 'school', color: 'pink' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          {headlineArticle && (
            <FeatureArticle {...headlineArticle} />
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-8 mb-16">
          {categoryMapping.slice(0, 2).map((category) => (
            <CategorySection
              key={category.slug}
              title={category.title}
              slug={category.slug}
              articles={getCategoryArticles(category.title)}
              color={category.color}
            />
          ))}
        </div>
        
        <div className="space-y-12">
          {categoryMapping.slice(2).map((category) => (
            <CategorySection
              key={category.slug}
              title={category.title}
              slug={category.slug}
              articles={getCategoryArticles(category.title)}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
