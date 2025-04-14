
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
        <AvatarFallback className="bg-flyingbus-purple text-white text-xs">
          KR
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-3">
        <Textarea
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px] resize-none border-gray-200 focus:border-flyingbus-purple focus:ring-1 focus:ring-flyingbus-purple bg-white"
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!comment.trim() || isSubmitting}
            size="sm"
            className="bg-flyingbus-purple hover:bg-flyingbus-purple/90"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
