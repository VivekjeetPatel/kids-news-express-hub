
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp } from 'lucide-react';
import ProfileLink from './ProfileLink';

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
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <ProfileLink 
              name={author.name}
              avatar={author.avatar}
              className="font-medium text-sm"
            />
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
