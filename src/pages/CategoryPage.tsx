
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ArticleCard from '@/components/Articles/ArticleCard';
import { mockArticles } from '@/data/articles';
import { getCategoryColor } from '@/utils/categoryColors';
import { 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  Home as HomeIcon, 
  GraduationCap, 
  School, 
  Newspaper,
  ArrowDownAZ,
  CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import { useIsMobile } from '@/hooks/use-mobile';

interface CategoryPageProps {
  category?: string;
}

const ARTICLES_PER_PAGE = 6;

const CategoryPage: React.FC<CategoryPageProps> = ({ category: propCategory }) => {
  // State for sorting and pagination
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'a-z'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  
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
  let articles = mockArticles.filter(article => article.category === displayCategory);
  
  // Sort articles based on selected option
  if (sortBy === 'newest') {
    articles = [...articles].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } else if (sortBy === 'oldest') {
    articles = [...articles].sort((a, b) => 
      new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    );
  } else if (sortBy === 'a-z') {
    articles = [...articles].sort((a, b) => a.title.localeCompare(b.title));
  }

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  
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
        return <HomeIcon size={32} className={`text-flyingbus-${colorName}`} />;
      case 'Learning Resources':
        return <GraduationCap size={32} className={`text-flyingbus-${colorName}`} />;
      case 'School News':
        return <School size={32} className={`text-flyingbus-${colorName}`} />;
      default:
        return <BookOpen size={32} className={`text-flyingbus-${colorName}`} />;
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: displayCategory, active: true }
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            {getCategoryIcon()}
            <h1 className={`text-3xl font-bold border-b-2 border-flyingbus-${colorName} pb-1`}>
              {displayCategory}
            </h1>
          </div>
          
          {/* Sort Controls */}
          <Card className="p-1 flex gap-1 bg-white/80 backdrop-blur-sm">
            <Button 
              variant={sortBy === 'newest' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setSortBy('newest')}
              className="text-xs flex gap-1 items-center"
            >
              <CalendarDays size={14} /> Newest
            </Button>
            <Button 
              variant={sortBy === 'oldest' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setSortBy('oldest')}
              className="text-xs flex gap-1 items-center"
            >
              <CalendarDays size={14} /> Oldest
            </Button>
            <Button 
              variant={sortBy === 'a-z' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setSortBy('a-z')}
              className="text-xs flex gap-1 items-center"
            >
              <ArrowDownAZ size={14} /> A-Z
            </Button>
          </Card>
        </div>
        
        {/* Enhanced Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb 
            items={breadcrumbItems} 
            className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-sm"
          />
        </div>
        
        {/* Articles Grid */}
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">No articles found in this category.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
