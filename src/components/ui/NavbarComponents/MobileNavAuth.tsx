
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MobileNavAuth: React.FC = () => {
  const { isLoggedIn, currentUser, logout } = useAuth();

  if (isLoggedIn && currentUser) {
    return (
      <div className="space-y-3">
        <SheetClose asChild>
          <Link 
            to={`/profile/${currentUser.username}`}
            className="flex items-center text-base py-2"
          >
            <User size={16} className="mr-2" />
            <span>My Profile</span>
          </Link>
        </SheetClose>
        <button 
          onClick={logout}
          className="flex items-center text-base py-2 w-full text-left"
        >
          <LogOut size={16} className="mr-2" />
          <span>Log out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SheetClose asChild>
        <Link to="/reader-auth?tab=sign-in" className="block w-full mb-3">
          <Button variant="outline" className="w-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link to="/reader-auth?tab=sign-up" className="block w-full">
          <RainbowButton className="w-full flex items-center justify-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Join Us
          </RainbowButton>
        </Link>
      </SheetClose>
    </div>
  );
};

export default MobileNavAuth;
