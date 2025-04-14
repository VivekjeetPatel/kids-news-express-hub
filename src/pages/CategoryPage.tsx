
import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ArticleCard from '@/components/Articles/ArticleCard';
import { mockArticles } from '@/data/articles';
import { getCategoryColor } from '@/utils/categoryColors';
import { BookOpen, MessageCircle, Sparkles, Home, GraduationCap, School, Newspaper } from 'lucide-react';

interface CategoryPageProps {
  category?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category: propCategory }) => {
  // Get path from location to determine category if not provided via props
  const location = useLocation();
  const pathCategory = location.pathname.split('/')[1];
  
  // Use prop category if provided, otherwise use path
  const categorySlug = propCategory || pathCategory;
  
  // Map URL parameter to proper category name
  const categoryMapping: Record<string, string> = {
    'headliners': 'Headliners',
    'debates': 'Debates',
    'spice-it-up': 'Spice It Up',
    'neighborhood': 'In the Neighborhood',
    'learning': 'Learning Resources',
    'school-news': 'School News'
  };
  
  const displayCategory = categoryMapping[categorySlug] || 'Articles';
  
  // Filter articles by category
  const articles = mockArticles.filter(article => article.category === displayCategory);
  
  // Get category color and icon
  const colorClass = getCategoryColor(displayCategory).split(' ')[0] || '';
  const colorName = colorClass.replace('bg-flyingbus-', '');
  
  const getCategoryIcon = () => {
    switch (displayCategory) {
      case 'Headliners':
        return <Newspaper size={32} className={`text-flyingbus-${colorName}`} />;
      case 'Debates':
        return <MessageCircle size={32} className={`text-flyingbus-${colorName}`} />;
      case 'Spice It Up':
        return <Sparkles size={32} className={`text-flyingbus-${colorName}`} />;
      case 'In the Neighborhood':
        return <Home size={32} className={`text-flyingbus-${colorName}`} />;
      case 'Learning Resources':
        return <GraduationCap size={32} className={`text-flyingbus-${colorName}`} />;
      case 'School News':
        return <School size={32} className={`text-flyingbus-${colorName}`} />;
      default:
        return <BookOpen size={32} className={`text-flyingbus-${colorName}`} />;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          {getCategoryIcon()}
          <h1 className={`text-3xl font-bold border-b-2 border-flyingbus-${colorName} pb-1`}>
            {displayCategory}
          </h1>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">No articles found in this category.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
