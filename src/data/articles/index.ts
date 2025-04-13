
// Export all article data and utility functions
import { ArticleProps } from '@/components/Articles/ArticleCard';
import { headlinersArticles } from './headliners';
import { debatesArticles } from './debates';
import { spiceItUpArticles } from './spice-it-up';
import { storyboardArticles } from './storyboard';
import { neighborhoodArticles } from './neighborhood';
import { learningArticles } from './learning';
import { schoolNewsArticles } from './school-news';

// Combine all articles into a single array
export const mockArticles: ArticleProps[] = [
  ...headlinersArticles,
  ...debatesArticles,
  ...spiceItUpArticles,
  ...storyboardArticles,
  ...neighborhoodArticles,
  ...learningArticles,
  ...schoolNewsArticles
];

export const getCategoryArticles = (category: string, limit: number = 3) => {
  return mockArticles
    .filter(article => article.category === category)
    .slice(0, limit);
};

export const getHeadlineArticle = () => {
  return headlinersArticles[0];
};

export const getArticleById = (id: string) => {
  return mockArticles.find(article => article.id === id);
};
