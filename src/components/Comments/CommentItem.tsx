
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

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
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-flyingbus-purple text-white text-xs">
            {author.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-sm">{author.name}</h4>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-sm text-gray-700">{content}</p>
          
          <div className="flex gap-4 mt-2">
            <button className="text-xs text-gray-500 hover:text-flyingbus-purple transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              {likes} Like
            </button>
            <button className="text-xs text-gray-500 hover:text-flyingbus-purple transition-colors">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
