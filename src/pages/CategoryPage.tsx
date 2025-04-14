
import React, { useState, useEffect } from 'react';
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
  FilterX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import CategoryFilter from '@/components/Navigation/CategoryFilter';
import { useIsMobile } from '@/hooks/use-mobile';
import DebateVote from '@/components/Articles/DebateVote';

interface CategoryPageProps {
  category?: string;
}

const ARTICLES_PER_PAGE = 6;

const CategoryPage: React.FC<CategoryPageProps> = ({ category: propCategory }) => {
  // State for sorting, filtering and pagination
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'a-z'>('newest');
  const [selectedReadingLevel, setSelectedReadingLevel] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableReadingLevels, setAvailableReadingLevels] = useState<string[]>([]);
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
  
  // Extract and set unique reading levels on component mount
  useEffect(() => {
    const levels = [...new Set(articles.map(article => article.readingLevel))];
    setAvailableReadingLevels(levels);
  }, [displayCategory]);

  // Filter by reading level if selected
  if (selectedReadingLevel) {
    articles = articles.filter(article => article.readingLevel === selectedReadingLevel);
  }
  
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedReadingLevel]);

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

  // Handle reading level filter change
  const handleReadingLevelChange = (level: string | null) => {
    setSelectedReadingLevel(level);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedReadingLevel(null);
    setSortBy('newest');
  };

  const hasActiveFilters = selectedReadingLevel !== null || sortBy !== 'newest';

  // Get first debate article for voting component
  const featuredDebate = displayCategory === 'Debates' && articles.length > 0 
    ? articles[0] 
    : null;

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
          
          {/* Filter Controls */}
          <CategoryFilter 
            sortBy={sortBy}
            onSortChange={setSortBy}
            readingLevels={availableReadingLevels}
            onReadingLevelChange={handleReadingLevelChange}
            selectedReadingLevel={selectedReadingLevel}
          />
        </div>
        
        {/* Enhanced Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb 
            items={breadcrumbItems} 
            className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-sm"
          />
        </div>

        {/* Add Debate Voting Component for Debates Category */}
        {displayCategory === 'Debates' && featuredDebate && (
          <div className="mb-8">
            <DebateVote 
              debateId={featuredDebate.id}
              topicTitle={featuredDebate.title}
              initialVotes={{ yes: 62, no: 38 }}
            />
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Active filters:</span>
              {selectedReadingLevel && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-flyingbus-purple text-white">
                  Level: {selectedReadingLevel}
                </span>
              )}
              {sortBy !== 'newest' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-flyingbus-blue text-white">
                  Sorted: {sortBy === 'oldest' ? 'Oldest first' : 'A-Z'}
                </span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs"
            >
              <FilterX size={14} className="mr-1" /> Clear filters
            </Button>
          </div>
        )}
        
        {/* Articles Grid */}
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">No articles found in this category.</h2>
            {hasActiveFilters && (
              <p className="mt-2 text-gray-500">Try removing some filters to see more results.</p>
            )}
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
