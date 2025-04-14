
import React from 'react';
import { 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  Home as HomeIcon, 
  GraduationCap, 
  School, 
  Newspaper
} from 'lucide-react';

interface CategoryHeaderProps {
  displayCategory: string;
  colorName: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  displayCategory,
  colorName
}) => {
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

  return (
    <div className="flex items-center gap-3">
      {getCategoryIcon()}
      <h1 className={`text-3xl font-bold border-b-2 border-flyingbus-${colorName} pb-1`}>
        {displayCategory}
      </h1>
    </div>
  );
};

export default CategoryHeader;
