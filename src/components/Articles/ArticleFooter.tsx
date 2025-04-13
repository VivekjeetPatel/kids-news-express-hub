
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { MessageSquare, Share2, Facebook, Twitter } from 'lucide-react';
import { ArticleProps } from '@/components/Articles/ArticleCard';
import CommentsSection from '@/components/Comments/CommentsSection';
import { getCommentsByArticleId } from '@/data/comments';

interface ArticleFooterProps {
  article: ArticleProps;
}

const ArticleFooter: React.FC<ArticleFooterProps> = ({ article }) => {
  const [showComments, setShowComments] = useState(false);
  const comments = getCommentsByArticleId(article.id);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

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
            {comments.length} comments
          </span>
          <RainbowButton className="ml-2" onClick={toggleComments}>
            {showComments ? 'Hide Discussion' : 'Join Discussion'}
          </RainbowButton>
        </div>
      </div>

      {showComments && (
        <CommentsSection 
          articleId={article.id}
          comments={comments}
        />
      )}
    </>
  );
};

export default ArticleFooter;
