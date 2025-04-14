
import React from 'react';
import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActiveFiltersProps {
  selectedReadingLevel: string | null;
  sortBy: 'newest' | 'oldest' | 'a-z';
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedReadingLevel,
  sortBy,
  clearFilters,
  hasActiveFilters
}) => {
  if (!hasActiveFilters) return null;

  return (
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
  );
};

export default ActiveFilters;
