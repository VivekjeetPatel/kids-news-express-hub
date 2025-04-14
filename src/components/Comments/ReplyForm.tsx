
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReplyFormProps {
  parentId: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ parentId, onSubmit, onCancel }) => {
  const [replyContent, setReplyContent] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onSubmit(replyContent);
      setReplyContent('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        placeholder="Write a reply..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        className="min-h-[60px] text-sm resize-none border-neutral-200 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
      />
      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          size="sm"
          disabled={!replyContent.trim()}
          className="bg-neutral-600 hover:bg-neutral-700"
        >
          Reply
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
