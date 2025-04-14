
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Calendar, 
  MessageSquare, 
  Award, 
  Share2, 
  Edit, 
  ArrowLeft, 
  Flame,
  Book
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getReaderByUsername } from '@/data/readers';
import { getCommentsByAuthor } from '@/data/comments';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const ReaderProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const reader = username ? getReaderByUsername(username) : undefined;
  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const readerComments = username ? getCommentsByAuthor(username) : [];
  
  if (!reader) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reader profile not found
          </h1>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to home
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto pb-12">
        {/* Profile Header with Gradient Background */}
        <div className="relative mb-16">
          <div className="h-64 rounded-b-3xl bg-gradient-to-r from-[#FDE1D3] to-[#FFDEE2] overflow-hidden">
            {/* Navigation */}
            <div className="absolute top-4 left-4">
              <Link to="/" className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-white/90 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
            
            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              {isOwnProfile && (
                <Link to={`/profile/${reader.username}/edit`}>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-white/70 backdrop-blur-sm border-transparent hover:bg-white/90"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline"
                size="sm" 
                className="flex items-center gap-1 bg-white/70 backdrop-blur-sm border-transparent hover:bg-white/90"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Profile Picture & Basic Info */}
          <div className="absolute -bottom-16 w-full flex flex-col items-center">
            <Avatar className="h-32 w-32 border-4 border-white bg-white shadow-md">
              <AvatarImage src={reader.avatar} alt={reader.displayName} />
              <AvatarFallback className="text-3xl bg-purple-50 text-purple-700">
                {reader.displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold">{reader.displayName}</h1>
              <p className="text-gray-500">@{reader.username}</p>
              <p className="text-sm text-gray-600 mt-1">
                Joined {formatDistanceToNow(reader.joinedDate, { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
        
        {/* Bio & Badges */}
        <div className="px-4 mt-16 mb-8">
          {reader.bio && (
            <p className="text-center text-gray-700 max-w-lg mx-auto">{reader.bio}</p>
          )}
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {reader.badges?.map((badge, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Profile Content Tabs */}
        <div className="px-4 mt-10">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8 bg-gray-100 p-1 rounded-full">
              <TabsTrigger 
                value="activity" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-purple-700"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="comments" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-purple-700"
              >
                Comments
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-purple-700" 
              >
                Achievements
              </TabsTrigger>
            </TabsList>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reading Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                      <div className="h-12 w-12 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full">
                        <Flame className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Reading Streak</p>
                        <p className="text-xl font-medium">{reader.readingStreak || 0} days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Comments</p>
                        <p className="text-xl font-medium">{reader.commentCount} total</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-base mb-4">Recent Activity</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="h-9 w-9 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
                          <Book className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Read an article</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="h-9 w-9 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Posted a comment</p>
                          <p className="text-xs text-gray-500">5 days ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-6">More activity tracking features coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Comments Tab */}
            <TabsContent value="comments" className="space-y-4">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  {readerComments.length > 0 ? (
                    <div className="space-y-4">
                      {readerComments.map((comment) => (
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
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  {reader.achievements && reader.achievements.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {reader.achievements.map((achievement, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-purple-50 transition-colors"
                        >
                          <div className="h-12 w-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{achievement}</p>
                            <p className="text-xs text-gray-500">Unlocked achievement</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No achievements yet</p>
                      <p className="text-sm text-gray-400 mt-1">Keep interacting with articles to earn achievements</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReaderProfilePage;
