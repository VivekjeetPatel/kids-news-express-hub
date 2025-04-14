
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-2">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src="/avatar-placeholder.png" />
        <AvatarFallback className="bg-neutral-600 text-white text-xs">
          KR
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-3">
        <Textarea
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px] resize-none border-neutral-200 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 bg-white"
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!comment.trim() || isSubmitting}
            size="sm"
            className="bg-neutral-600 hover:bg-neutral-700"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

