
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { ArticleProps } from './ArticleCard';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: ArticleProps[];
  color: string;
}

const CategorySection = ({ title, slug, articles, color }: CategorySectionProps) => {
  // Map colors for different categories
  const colorVariants: {[key: string]: string} = {
    'purple': 'border-flyingbus-purple text-flyingbus-purple',
    'red': 'border-flyingbus-red text-flyingbus-red',
    'orange': 'border-flyingbus-orange text-flyingbus-orange',
    'blue': 'border-flyingbus-blue text-flyingbus-blue',
    'green': 'border-flyingbus-green text-flyingbus-green',
    'yellow': 'border-flyingbus-yellow text-flyingbus-yellow',
    'pink': 'border-flyingbus-pink text-flyingbus-pink',
  };

  const borderColor = colorVariants[color] || colorVariants.purple;

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`category-title ${borderColor}`}>{title}</h2>
        <Link 
          to={`/${slug}`} 
          className="flex items-center text-sm font-medium hover:underline"
        >
          See All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
