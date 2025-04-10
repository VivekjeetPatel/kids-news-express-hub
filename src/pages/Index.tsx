
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import FeatureArticle from '@/components/Articles/FeatureArticle';
import CategorySection from '@/components/Articles/CategorySection';
import DebateVote from '@/components/Articles/DebateVote';
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="w-full text-center mb-8">
            <h1 className="newspaper-title">The Flying Bus</h1>
            <p className="text-xl mt-2">News for Kids, By Kids</p>
          </div>
          
          {headlineArticle && (
            <FeatureArticle {...headlineArticle} />
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 lg:col-span-2">
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
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <DebateVote 
                debateId="weekend-homework" 
                topicTitle="Should Schools Ban Homework on Weekends?"
                initialVotes={{ yes: 68, no: 32 }} 
              />
            </div>
          </div>
        </div>
        
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
    </MainLayout>
  );
};

export default Index;
