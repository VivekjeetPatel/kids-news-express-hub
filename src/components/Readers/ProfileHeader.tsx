
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Edit, ArrowLeft, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ReaderProfile } from '@/types/ReaderProfile';

interface ProfileHeaderProps {
  reader: ReaderProfile;
  isOwnProfile: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ reader, isOwnProfile }) => {
  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="h-52 rounded-b-3xl bg-gradient-to-r from-[#FDE1D3] to-[#FFDEE2] overflow-hidden">
        {/* Navigation */}
        <div className="absolute top-4 left-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-white/90 transition-colors"
          >
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
      
      {/* Profile Picture - positioned to overlap with the background */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ top: "52px" }}>
        <Avatar className="h-32 w-32 border-4 border-white bg-white shadow-md">
          <AvatarImage src={reader.avatar} alt={reader.displayName} />
          <AvatarFallback className="text-3xl bg-purple-50 text-purple-700">
            {reader.displayName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProfileHeader;
