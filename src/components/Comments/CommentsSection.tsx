
import React, { useState } from 'react';
import CommentItem, { CommentProps } from './CommentItem';
import CommentForm from './CommentForm';
import { Separator } from '@/components/ui/separator';
import { MessageCircle } from 'lucide-react';

interface CommentsSectionProps {
  articleId: string;
  comments: CommentProps[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId, comments }) => {
  const [localComments, setLocalComments] = useState<CommentProps[]>(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = (content: string) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newComment: CommentProps = {
        id: `local-${Date.now()}`,
        author: {
          name: 'Kid Reporter',
          avatar: '/avatar-placeholder.png'
        },
        content,
        createdAt: new Date(),
        likes: 0
      };
      
      setLocalComments([newComment, ...localComments]);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-8 pt-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-flyingbus-purple" />
        Comments ({localComments.length})
      </h3>
      
      <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
      
      <Separator className="my-4" />
      
      {localComments.length > 0 ? (
        <div className="space-y-1">
          {localComments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
