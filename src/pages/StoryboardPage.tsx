
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { StoryboardArticleProps } from '@/data/articles/storyboard';
import { getArticleById } from '@/data/articles';
import SeriesHeader from '@/components/Storyboard/SeriesHeader';
import EpisodesList from '@/components/Storyboard/EpisodesList';
import StoryboardNotFound from '@/components/Storyboard/StoryboardNotFound';
import NotFoundMessage from '@/components/Storyboard/NotFoundMessage';

const StoryboardPage = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || '') as StoryboardArticleProps | undefined;
  
  // If no article is found, or if it's not a storyboard article (no episodes)
  if (!article || !article.episodes || article.episodes.length === 0) {
    return (
      <MainLayout>
        <NotFoundMessage type="series" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SeriesHeader article={article} />
      <EpisodesList episodes={article.episodes} seriesId={article.id} />
    </MainLayout>
  );
};

export default StoryboardPage;
