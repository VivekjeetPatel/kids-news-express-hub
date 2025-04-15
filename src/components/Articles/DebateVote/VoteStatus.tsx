
import React from 'react';
import { Info, LoaderCircle, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DrawerAuth } from '@/components/ui/drawer-auth';
import { useAuth } from '@/contexts/AuthContext';

interface VoteStatusProps {
  hasVoted: boolean;
  isVoting: boolean;
  isLoggedIn: boolean;
}

const VoteStatus: React.FC<VoteStatusProps> = ({ hasVoted, isVoting, isLoggedIn }) => {
  if (!isLoggedIn && !hasVoted) {
    return (
      <div className="text-center mt-4">
        <DrawerAuth 
          triggerComponent={
            <Button variant="outline" size="sm" className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform">
              <LogIn size={14} />
              <span>Sign in to vote</span>
            </Button>
          }
          defaultTab="sign-in"
        />
      </div>
    );
  }

  return (
    <>
      {!hasVoted && isLoggedIn && (
        <div className="text-center text-xs text-gray-500 mt-1 flex items-center justify-center gap-1 bg-gray-50 py-2 px-4 rounded-full">
          <Info size={12} />
          <span>Your vote is anonymous and can only be cast once per debate</span>
        </div>
      )}

      {isVoting && (
        <div className="flex justify-center mt-3 transition-all duration-300 ease-in-out">
          <div className="text-sm text-flyingbus-purple flex items-center gap-2 bg-purple-50 py-2 px-5 rounded-full shadow-sm">
            <LoaderCircle 
              className={cn(
                "animate-spin", 
                "text-flyingbus-purple",
                "transition-all duration-300"
              )} 
              size={18} 
            />
            <span className="animate-pulse font-medium">Verifying vote...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default VoteStatus;
