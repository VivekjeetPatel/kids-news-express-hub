import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save } from 'lucide-react';
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
    }, 800);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={editedProfile.avatar} alt={editedProfile.displayName} />
                    <AvatarFallback className="text-xl">
                      {editedProfile.displayName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-white"
                    onClick={handleAvatarChange}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName"
                    name="displayName"
                    value={editedProfile.displayName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    name="username"
                    value={editedProfile.username}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    name="bio"
                    value={editedProfile.bio || ''}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Control how your profile information is displayed to others.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showCommentHistory"
                      className="rounded border-gray-300 text-purple-600 focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200"
                    />
                    <Label htmlFor="showCommentHistory" className="text-sm font-normal">
                      Show my comment history on my profile
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showReadingActivity"
                      className="rounded border-gray-300 text-purple-600 focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200"
                    />
                    <Label htmlFor="showReadingActivity" className="text-sm font-normal">
                      Show my reading activity on my profile
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="flex gap-2 items-center bg-purple-600 hover:bg-purple-700 ml-auto"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default ReaderProfileEdit;
