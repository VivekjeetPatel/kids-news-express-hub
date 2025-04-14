
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileLinkProps {
  name: string;
  username?: string;
  avatar?: string;
  className?: string;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ name, username, avatar, className }) => {
  // Use provided username or convert display name to URL-friendly format
  const profileUsername = username || name.toLowerCase().replace(/\s+/g, '_');
  
  return (
    <Link 
      to={`/profile/${profileUsername}`} 
      className={`flex items-center gap-2 hover:underline ${className || ''}`}
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-purple-50 text-purple-700 text-xs">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </Link>
  );
};

export default ProfileLink;
