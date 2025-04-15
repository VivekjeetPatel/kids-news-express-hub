
import React from 'react';

interface CategoryHeaderProps {
  displayCategory: string;
  colorName: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  displayCategory,
  colorName
}) => {
  return (
    <div className="flex items-center gap-10">
      {/* Image frame with placeholder - rotated 30 degrees clockwise */}
      <div className="relative transform rotate-[30deg]">
        <div 
          className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-md shadow-category-icon overflow-hidden"
        >
          <div className={`w-full h-full bg-flyingbus-${colorName} flex items-center justify-center`}>
            <img 
              src="/placeholder.svg" 
              alt={`${displayCategory} icon`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Category title */}
      <h1 className="category-title">
        {displayCategory}
      </h1>
    </div>
  );
};

export default CategoryHeader;
