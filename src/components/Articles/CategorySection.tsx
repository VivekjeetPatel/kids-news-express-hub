
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { ArticleProps } from './ArticleCard';
import { ArrowRight, BookOpen, MessageCircle, Sparkles, BookMarked, Home, GraduationCap, School } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNavigation 
} from '@/components/ui/custom-carousel';
import { getCategoryColor } from '@/utils/categoryColors';

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: ArticleProps[];
  color: string;
}

const CategorySection = ({ title, slug, articles, color }: CategorySectionProps) => {
  // Map category to correct Tailwind color based on our updated utility
  const getColorClass = () => {
    const categoryColorClass = getCategoryColor(title);
    const colorName = categoryColorClass.split('-')[1].split(' ')[0]; // Extract color name from bg-flyingbus-{color}
    
    return {
      border: `border-flyingbus-${colorName}`,
      text: `text-flyingbus-${colorName}`
    };
  };

  const colorClasses = getColorClass();

  // Map category to icon
  const getCategoryIcon = () => {
    switch (title) {
      case 'Headliners':
        return <BookOpen className={colorClasses.text} size={24} />;
      case 'Debates':
        return <MessageCircle className={colorClasses.text} size={24} />;
      case 'Spice It Up':
        return <Sparkles className={colorClasses.text} size={24} />;
      case 'Storyboard':
        return <BookMarked className={colorClasses.text} size={24} />;
      case 'In the Neighborhood':
        return <Home className={colorClasses.text} size={24} />;
      case 'Learning':
        return <GraduationCap className={colorClasses.text} size={24} />;
      case 'School News':
        return <School className={colorClasses.text} size={24} />;
      default:
        return <BookOpen className={colorClasses.text} size={24} />;
    }
  };

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <h2 className={`category-title border-b-2 ${colorClasses.border}`}>{title}</h2>
        </div>
        <Link 
          to={`/${slug}`} 
          className="flex items-center text-sm font-medium hover:underline"
        >
          See All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {/* For desktop and larger screens, show carousel */}
      <div className="hidden md:block relative">
        <Carousel>
          <CarouselContent className="-ml-6">
            {articles.map((article) => (
              <CarouselItem key={article.id} className="pl-6 basis-1/3">
                <ArticleCard {...article} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation 
            classNameButton={`bg-white border border-gray-200 shadow-sm hover:bg-gray-50 *:stroke-${title === 'Spice It Up' ? 'black' : colorClasses.text.replace('text-', '')}`}
          />
        </Carousel>
      </div>
      
      {/* For mobile, show grid layout */}
      <div className="grid grid-cols-1 md:hidden gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
