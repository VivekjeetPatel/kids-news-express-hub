
import React from 'react';
import { Info } from 'lucide-react';

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
        <div className="flex justify-center mt-1">
          <div className="animate-pulse text-sm text-flyingbus-purple flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-flyingbus-purple border-t-transparent rounded-full"></div>
            Verifying vote...
          </div>
        </div>
      )}
    </>
  );
};

export default VoteStatus;
