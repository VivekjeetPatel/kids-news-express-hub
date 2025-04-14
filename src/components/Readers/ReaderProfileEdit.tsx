
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ReaderProfile } from '@/types/ReaderProfile';
import MainLayout from '@/components/Layout/MainLayout';

interface ReaderProfileEditProps {
  profile: ReaderProfile;
  onSave?: (updatedProfile: ReaderProfile) => void;
}

const ReaderProfileEdit: React.FC<ReaderProfileEditProps> = ({ 
  profile,
  onSave 
}) => {
  const [editedProfile, setEditedProfile] = useState<ReaderProfile>({...profile});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = () => {
    toast({
      title: "Avatar upload",
      description: "This would open a file upload dialog in the full implementation.",
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (onSave) {
        onSave(editedProfile);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsSubmitting(false);
      navigate(`/profile/${profile.username}`);
    }, 800);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-8 pb-12 px-4">
        <div className="mb-4">
          <Link 
            to={`/profile/${profile.username}`}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </div>
        
        {/* Background Header */}
        <div className="relative mb-12">
          <div className="h-40 rounded-xl bg-gradient-to-r from-[#D3E4FD] to-[#E5DEFF]"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="-mt-24 border-none shadow-md">
            <CardHeader className="relative pt-8">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 border-4 border-white bg-white">
                    <AvatarImage src={editedProfile.avatar} alt={editedProfile.displayName} />
                    <AvatarFallback className="text-xl bg-purple-50 text-purple-700">
                      {editedProfile.displayName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-white shadow-sm"
                    onClick={handleAvatarChange}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="pt-6">
                <CardTitle className="text-center">Edit Your Profile</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 px-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName"
                    name="displayName"
                    value={editedProfile.displayName}
                    onChange={handleInputChange}
                    className="border-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Input 
                      id="username"
                      name="username"
                      value={editedProfile.username}
                      onChange={handleInputChange}
                      className="border-gray-200"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Username can only be changed once every 30 days.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    name="bio"
                    value={editedProfile.bio || ''}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    onChange={handleInputChange}
                    className="border-gray-200 resize-none"
                  />
                  <p className="text-xs text-gray-500 text-right">
                    {editedProfile.bio?.length || 0}/250
                  </p>
                </div>
              </div>
              
              <Separator className="bg-gray-100" />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Control how your profile information is displayed to others.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="showCommentHistory"
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <Label htmlFor="showCommentHistory" className="text-sm font-normal cursor-pointer">
                      Show my comment history on my profile
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="showReadingActivity"
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <Label htmlFor="showReadingActivity" className="text-sm font-normal cursor-pointer">
                      Show my reading activity on my profile
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 flex justify-end">
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(`/profile/${profile.username}`)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex gap-2 items-center bg-purple-600 hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default ReaderProfileEdit;
