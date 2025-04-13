
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { MessageSquare, Share2, Facebook, Twitter } from 'lucide-react';
import { ArticleProps } from '@/components/Articles/ArticleCard';

interface ArticleFooterProps {
  article: ArticleProps;
}

const ArticleFooter: React.FC<ArticleFooterProps> = ({ article }) => {
  return (
    <>
      <Separator className="my-8" />
      
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <span className="text-flyingbus-muted-text">Share:</span>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Facebook size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Twitter size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Share2 size={16} />
          </Button>
        </div>
        
        <div className="flex items-center">
          <span className="text-flyingbus-muted-text mr-2">
            <MessageSquare size={16} className="inline mr-1" />
            {article.commentCount} comments
          </span>
          <RainbowButton className="ml-2 text-sm">
            Join Discussion
          </RainbowButton>
        </div>
      </div>
    </>
  );
};

export default ArticleFooter;
