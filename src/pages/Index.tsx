
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import FeatureArticle from '@/components/Articles/FeatureArticle';
import { Blog } from '@/components/ui/blog';
import DebateVote from '@/components/Articles/DebateVote';
import { getHeadlineArticle } from '@/data/mockArticles';

const Index = () => {
  const headlineArticle = getHeadlineArticle();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          {headlineArticle && (
            <FeatureArticle {...headlineArticle} />
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <Blog />
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
      </div>
    </MainLayout>
  );
};

export default Index;
