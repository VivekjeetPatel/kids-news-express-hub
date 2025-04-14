
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save, AlertCircle } from 'lucide-react';
import { ReaderProfile } from '@/types/ReaderProfile';
import PrivacySettingsSection from './PrivacySettingsSection';

interface ProfileEditFormProps {
  profile: ReaderProfile;
  editedProfile: ReaderProfile;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPrivacyChange: (field: string, value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  profile,
  editedProfile,
  isSubmitting,
  onInputChange,
  onPrivacyChange,
  onSubmit
}) => {
  const navigate = useNavigate();
  
  return (
    <form onSubmit={onSubmit} className="mt-24 px-4">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Edit Your Profile</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input 
                id="displayName"
                name="displayName"
                value={editedProfile.displayName}
                onChange={onInputChange}
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
                  onChange={onInputChange}
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
                onChange={onInputChange}
                className="border-gray-200 resize-none"
              />
              <p className="text-xs text-gray-500 text-right">
                {editedProfile.bio?.length || 0}/250
              </p>
            </div>
          </div>
          
          <Separator className="bg-gray-100" />
          
          <PrivacySettingsSection
            showCommentHistory={false}
            showReadingActivity={false}
            onPrivacyChange={onPrivacyChange}
          />
        </CardContent>
        
        <CardFooter className="flex justify-end pb-6 gap-3">
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
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileEditForm;
