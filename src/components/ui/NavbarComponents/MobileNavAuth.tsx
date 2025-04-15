
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, BookOpen } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { useAuth } from '@/contexts/AuthContext';
import { DrawerAuth } from '@/components/ui/drawer-auth';

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
      <DrawerAuth 
        triggerComponent={
          <Button variant="outline" className="w-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        }
        defaultTab="sign-in"
      />
      
      <DrawerAuth 
        triggerComponent={
          <RainbowButton className="w-full flex items-center justify-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Join Us
          </RainbowButton>
        }
        defaultTab="sign-up"
      />
    </div>
  );
};

export default MobileNavAuth;
