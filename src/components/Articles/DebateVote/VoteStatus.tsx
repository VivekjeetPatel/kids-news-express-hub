
import React from 'react';
import { Info, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteStatusProps {
  hasVoted: boolean;
  isVoting: boolean;
}

const VoteStatus: React.FC<VoteStatusProps> = ({ hasVoted, isVoting }) => {
  return (
    <>
      {!hasVoted && (
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
