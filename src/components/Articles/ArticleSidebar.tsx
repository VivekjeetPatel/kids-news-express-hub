
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArticleProps } from '@/components/Articles/ArticleCard';

interface ArticleSidebarProps {
  article: ArticleProps;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ article }) => {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-24">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-flyingbus-muted-text mb-4">
              {article.author} is a young journalist passionate about sharing important stories.
            </p>
            <Button variant="outline" className="w-full">View Profile</Button>
          </CardContent>
        </Card>
        
        <div className="bg-gray-100 rounded-xl p-6 text-center mb-6 min-h-[300px] flex items-center justify-center">
          <div>
            <p className="text-flyingbus-muted-text mb-2">Future Ad Space</p>
            <p className="text-xs text-gray-500">This space reserved for ads or in-house CTAs</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-flyingbus-purple hover:underline">Young Scientists Create Eco-Friendly Plastic Alternative</a>
              </li>
              <li>
                <a href="#" className="text-flyingbus-purple hover:underline">How to Start a Climate Club at Your School</a>
              </li>
              <li>
                <a href="#" className="text-flyingbus-purple hover:underline">Kids Lead The Way in Community Clean-up Effort</a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleSidebar;
