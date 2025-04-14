
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, Award } from 'lucide-react';
import ProfileLink from './ProfileLink';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface CommentProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    badges?: string[];
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
            <div className="flex items-center gap-2">
              <ProfileLink 
                name={author.name}
                avatar={author.avatar}
                className="font-medium text-sm"
              />
              
              {author.badges && author.badges.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center">
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Reader Badges:</p>
                      <div className="flex flex-wrap gap-1">
                        {author.badges.map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
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
