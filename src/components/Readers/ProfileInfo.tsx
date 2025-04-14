
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ReaderProfile } from '@/types/ReaderProfile';

interface ProfileInfoProps {
  reader: ReaderProfile;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ reader }) => {
  return (
    <div className="mt-36 px-4 text-center">
      <h1 className="text-2xl font-bold">{reader.displayName}</h1>
      <p className="text-gray-500">@{reader.username}</p>
      <p className="text-sm text-gray-600 mt-1">
        Joined {formatDistanceToNow(reader.joinedDate, { addSuffix: true })}
      </p>
      
      {reader.bio && (
        <p className="text-center text-gray-700 max-w-lg mx-auto mt-4">{reader.bio}</p>
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
  );
};

export default ProfileInfo;
