
import React, { useState } from 'react';
import CommentItem, { CommentProps } from './CommentItem';
import CommentForm from './CommentForm';
import { Card } from '@/components/ui/card';
import { MessageCircle, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { addComment } from '@/data/comments';

interface CommentsSectionProps {
  articleId: string;
  comments: CommentProps[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId, comments }) => {
  const [localComments, setLocalComments] = useState<CommentProps[]>(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  const handleSubmitComment = (content: string) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newComment: Omit<CommentProps, 'id'> = {
        author: {
          name: 'Kid Reporter',
          avatar: '/avatar-placeholder.png',
          badges: ['New Reader']
        },
        content,
        createdAt: new Date(),
        likes: 0
      };
      
      // Add comment to mock data
      const savedComment = addComment(articleId, newComment);
      setLocalComments([savedComment, ...localComments]);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Card className="mt-8 pt-4 px-6 pb-6 bg-gray-50/50">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-neutral-600" />
        Discussion ({localComments.length})
      </h3>
      
      <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
      
      {localComments.length > 0 ? (
        <div className="space-y-1 mt-6">
          {localComments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">No comments yet. Be the first to comment!</p>
          {!isLoggedIn && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/reader-auth?tab=sign-up" className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                Create an account to join the discussion
              </Link>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default CommentsSection;
