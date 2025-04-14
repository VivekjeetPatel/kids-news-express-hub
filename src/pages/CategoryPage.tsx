
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { mockArticles } from '@/data/articles';
import { getCategoryColor } from '@/utils/categoryColors';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import CategoryFilter from '@/components/Navigation/CategoryFilter';
import CategoryHeader from '@/components/Category/CategoryHeader';
import ActiveFilters from '@/components/Category/ActiveFilters';
import ArticlesGrid from '@/components/Category/ArticlesGrid';
import PaginationControls from '@/components/Category/PaginationControls';
import { filterAndSortArticles, paginateArticles, getCategoryFromSlug } from '@/components/Category/CategoryHelpers';

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
  
  // Get path from location to determine category if not provided via props
  const location = useLocation();
  const pathCategory = location.pathname.split('/')[1];
  
  // Use prop category if provided, otherwise use path
  const categorySlug = propCategory || pathCategory;
  
  // Get the display category name from the slug
  const displayCategory = getCategoryFromSlug(categorySlug);
  
  // Filter articles by category
  let articles = mockArticles.filter(article => article.category === displayCategory);
  
  // Extract and set unique reading levels on component mount
  useEffect(() => {
    const levels = [...new Set(articles.map(article => article.readingLevel))];
    setAvailableReadingLevels(levels);
  }, [displayCategory]);

  // Apply filters and sorting
  const filteredAndSortedArticles = filterAndSortArticles(
    articles,
    selectedReadingLevel,
    sortBy
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedReadingLevel]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = paginateArticles(
    filteredAndSortedArticles,
    currentPage,
    ARTICLES_PER_PAGE
  );
  
  // Get category color
  const colorClass = getCategoryColor(displayCategory).split(' ')[0] || '';
  const colorName = colorClass.replace('bg-flyingbus-', '');
  
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

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <CategoryHeader 
            displayCategory={displayCategory} 
            colorName={colorName}
          />
          
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

        {/* Active Filters */}
        <ActiveFilters 
          selectedReadingLevel={selectedReadingLevel}
          sortBy={sortBy}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
        
        {/* Articles Grid */}
        <ArticlesGrid 
          articles={paginatedArticles}
          hasActiveFilters={hasActiveFilters}
        />
        
        {/* Pagination */}
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
