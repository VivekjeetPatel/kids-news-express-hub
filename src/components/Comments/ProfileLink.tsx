
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileLinkProps {
  name: string;
  avatar?: string;
  className?: string;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ name, avatar, className }) => {
  // Convert display name to a URL-friendly username
  const username = name.toLowerCase().replace(/\s+/g, '_');
  
  return (
    <Link 
      to={`/profile/${username}`} 
      className={`flex items-center gap-2 hover:underline ${className || ''}`}
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-neutral-600 text-white text-xs">
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </Link>
  );
};

export default ProfileLink;
