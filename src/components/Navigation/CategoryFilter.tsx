
import React from 'react';
import { 
  CalendarDays, 
  Clock, 
  BarChart2, 
  SortAsc,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';

interface CategoryFilterProps {
  sortBy: 'newest' | 'oldest' | 'a-z';
  onSortChange: (value: 'newest' | 'oldest' | 'a-z') => void;
  readingLevels?: string[];
  onReadingLevelChange?: (level: string | null) => void;
  selectedReadingLevel?: string | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  sortBy,
  onSortChange,
  readingLevels = [],
  onReadingLevelChange,
  selectedReadingLevel
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-end">
      {/* Reading Level Filter - Only show if we have reading levels and handler */}
      {readingLevels.length > 0 && onReadingLevelChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 text-xs flex gap-1 items-center">
              <Tag size={14} />
              {selectedReadingLevel ? `Level: ${selectedReadingLevel}` : 'Reading Level'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Reading Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => onReadingLevelChange(null)}>
                <span className={!selectedReadingLevel ? 'font-bold' : ''}>All Levels</span>
              </DropdownMenuItem>
              {readingLevels.map((level) => (
                <DropdownMenuItem 
                  key={level} 
                  onSelect={() => onReadingLevelChange(level)}
                >
                  <span className={selectedReadingLevel === level ? 'font-bold' : ''}>{level}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {/* Sort Controls */}
      <Card className="p-1 flex gap-1 bg-white/80 backdrop-blur-sm">
        <Button 
          variant={sortBy === 'newest' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => onSortChange('newest')}
          className="text-xs flex gap-1 items-center"
        >
          <CalendarDays size={14} /> Newest
        </Button>
        <Button 
          variant={sortBy === 'oldest' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => onSortChange('oldest')}
          className="text-xs flex gap-1 items-center"
        >
          <CalendarDays size={14} /> Oldest
        </Button>
        <Button 
          variant={sortBy === 'a-z' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => onSortChange('a-z')}
          className="text-xs flex gap-1 items-center"
        >
          <SortAsc size={14} /> A-Z
        </Button>
      </Card>
    </div>
  );
};

export default CategoryFilter;
