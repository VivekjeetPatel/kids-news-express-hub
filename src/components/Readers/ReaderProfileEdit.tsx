
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ReaderProfile } from '@/types/ReaderProfile';
import MainLayout from '@/components/Layout/MainLayout';
import ProfileEditHeader from './ProfileEditHeader';
import ProfileEditForm from './ProfileEditForm';

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

  const handlePrivacyChange = (field: string, value: boolean) => {
    // This would update privacy settings in a real implementation
    console.log(`Privacy setting ${field} changed to ${value}`);
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
      <div className="container max-w-3xl mx-auto pb-12">
        <ProfileEditHeader 
          profile={editedProfile}
          onAvatarChange={handleAvatarChange}
        />
        
        <ProfileEditForm
          profile={profile}
          editedProfile={editedProfile}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onPrivacyChange={handlePrivacyChange}
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  );
};

export default ReaderProfileEdit;
