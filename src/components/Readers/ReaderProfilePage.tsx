import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Award, Flame, Share2, Edit } from 'lucide-react';
import { getReaderByUsername } from '@/data/readers';
import { getCommentsByAuthor } from '@/data/comments';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ReaderProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const reader = username ? getReaderByUsername(username) : undefined;
  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  
  // Get comments by reader (mock)
  const readerComments = username ? getCommentsByAuthor(username) : [];
  
  if (!reader) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Reader profile not found
          </h1>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="relative mb-24 md:mb-16 overflow-hidden rounded-lg">
          <div className="h-48 bg-gradient-to-r from-[#FDE1D3] to-[#FFDEE2]"></div>
          
          <div className="absolute left-0 right-0 -bottom-16 px-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <Avatar className="h-32 w-32 border-4 border-white bg-white self-center md:self-start">
                <AvatarImage src={reader.avatar} alt={reader.displayName} />
                <AvatarFallback className="text-2xl">
                  {reader.displayName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left mt-2 md:mt-0 md:pb-2">
                <h1 className="text-2xl font-bold">{reader.displayName}</h1>
                <p className="text-gray-500">@{reader.username}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Joined {formatDistanceToNow(reader.joinedDate, { addSuffix: true })}
                </p>
              </div>
              
              <div className="md:ml-auto flex justify-center md:justify-end gap-2 mt-2 md:mt-0 md:pb-2">
                {isOwnProfile && (
                  <Link to={`/profile/${reader.username}/edit`}>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2 bg-white border-gray-200"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 bg-white border-gray-200"
                >
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 md:mt-12 mb-8">
          {reader.bio && (
            <div className="mb-4">
              <p className="text-gray-700">{reader.bio}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            {reader.badges?.map((badge, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="activity">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reading Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Reading Streak</p>
                      <p className="font-medium">{reader.readingStreak || 0} days</p>
                    </div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-10" />
                  
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Comments</p>
                      <p className="font-medium">{reader.commentCount} total</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm">More activity tracking features coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Comments</CardTitle>
              </CardHeader>
              <CardContent>
                {readerComments.length > 0 ? (
                  <div className="space-y-4">
                    {readerComments.map((comment) => (
                      <div key={comment.id} className="pb-4 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-700">{comment.content}</p>
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                          </span>
                          <span className="text-xs text-blue-600">On Article Title</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No comments yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {reader.achievements && reader.achievements.length > 0 ? (
                  <div className="space-y-4">
                    {reader.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Award className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{achievement}</p>
                          <p className="text-xs text-gray-500">Unlocked achievement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No achievements yet</p>
                    <p className="text-sm text-gray-400">Keep interacting with articles to earn achievements</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ReaderProfilePage;
