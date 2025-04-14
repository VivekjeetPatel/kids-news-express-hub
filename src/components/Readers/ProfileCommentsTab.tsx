
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Comment } from '@/data/comments';

interface ProfileCommentsTabProps {
  comments: Comment[];
}

const ProfileCommentsTab: React.FC<ProfileCommentsTabProps> = ({ comments }) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <p className="text-gray-700">{comment.content}</p>
                <div className="mt-3 flex justify-between">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </span>
                  <Link 
                    to="#" 
                    className="text-xs text-purple-600 hover:text-purple-800"
                  >
                    On Article Title
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No comments yet</p>
            <p className="text-sm text-gray-400 mt-1">Comments you make on articles will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCommentsTab;
