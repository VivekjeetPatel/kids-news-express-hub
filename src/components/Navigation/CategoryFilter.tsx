
import React from 'react';
import { 
  CalendarDays, 
  SortAsc,
  Tag,
  Filter
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const MobileSortOption = ({ value, label, icon }: { value: 'newest' | 'oldest' | 'a-z', label: string, icon: React.ReactNode }) => (
    <DrawerClose asChild>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onSortChange(value)}
        className={`w-full justify-start text-left ${
          sortBy === value 
            ? 'bg-gray-100 font-medium' 
            : ''
        }`}
      >
        {icon}
        {label}
        {sortBy === value && <span className="ml-auto text-flyingbus-purple">•</span>}
      </Button>
    </DrawerClose>
  );

  const MobileLevelOption = ({ level }: { level: string | null }) => (
    <DrawerClose asChild>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onReadingLevelChange?.(level)}
        className={`w-full justify-start text-left ${
          selectedReadingLevel === level 
            ? 'bg-gray-100 font-medium' 
            : ''
        }`}
      >
        {level || 'All Levels'}
        {selectedReadingLevel === level && <span className="ml-auto text-flyingbus-purple">•</span>}
      </Button>
    </DrawerClose>
  );

  // Mobile filter drawer
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex gap-1 items-center border-gray-300 text-gray-700"
          >
            <Filter size={14} className="text-gray-500" />
            <span className="whitespace-nowrap">Filter & Sort</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter Articles</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {readingLevels.length > 0 && onReadingLevelChange && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Reading Level</h3>
                <div className="space-y-1">
                  <MobileLevelOption level={null} />
                  {readingLevels.map((level) => (
                    <MobileLevelOption key={level} level={level} />
                  ))}
                </div>
              </div>
            )}
            
            <h3 className="text-sm font-medium mb-2">Sort Articles</h3>
            <div className="space-y-1">
              <MobileSortOption 
                value="newest" 
                label="Newest First" 
                icon={<CalendarDays size={16} className="mr-2" />} 
              />
              <MobileSortOption 
                value="oldest" 
                label="Oldest First" 
                icon={<CalendarDays size={16} className="mr-2" />} 
              />
              <MobileSortOption 
                value="a-z" 
                label="A-Z" 
                icon={<SortAsc size={16} className="mr-2" />} 
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop layout
  return (
    <div className="flex items-center gap-3">
      {/* Reading Level Filter */}
      {readingLevels.length > 0 && onReadingLevelChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex gap-1 items-center border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Tag size={14} className="text-gray-500" />
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
      <Card className="p-1 flex gap-1 bg-white border border-gray-200 rounded-xl">
        <Button 
          variant={sortBy === 'newest' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => onSortChange('newest')}
          className={`text-xs flex gap-1 items-center ${
            sortBy === 'newest' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CalendarDays size={14} /> Newest
        </Button>
        <Button 
          variant={sortBy === 'oldest' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => onSortChange('oldest')}
          className={`text-xs flex gap-1 items-center ${
            sortBy === 'oldest' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CalendarDays size={14} /> Oldest
        </Button>
        <Button 
          variant={sortBy === 'a-z' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => onSortChange('a-z')}
          className={`text-xs flex gap-1 items-center ${
            sortBy === 'a-z' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SortAsc size={14} /> A-Z
        </Button>
      </Card>
    </div>
  );
};

export default CategoryFilter;
