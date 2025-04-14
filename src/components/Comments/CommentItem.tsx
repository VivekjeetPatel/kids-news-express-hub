
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp } from 'lucide-react';

export interface CommentProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  likes: number;
}

const CommentItem: React.FC<CommentProps> = ({ author, content, createdAt, likes }) => {
  return (
    <div className="py-4 border-b border-neutral-100 last:border-0">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-neutral-600 text-white text-xs">
            {author.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-sm">{author.name}</h4>
            <span className="text-xs text-neutral-500">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-sm text-neutral-700 mb-3">{content}</p>
          
          <div className="flex gap-4 mt-2">
            <button className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              {likes} {likes === 1 ? 'Like' : 'Likes'}
            </button>
            <button className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

