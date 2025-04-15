
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VoteButtonsProps {
  onVote: (choice: 'yes' | 'no') => void;
  hasVoted: boolean;
  isVoting: boolean;
  userChoice: 'yes' | 'no' | null;
  yesPercentage: number;
  noPercentage: number;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  onVote,
  hasVoted,
  isVoting,
  userChoice,
  yesPercentage,
  noPercentage
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={() => onVote('yes')}
        disabled={hasVoted || isVoting}
        variant="outline"
        className={`h-auto flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
          isVoting ? 'opacity-70 cursor-not-allowed' : ''
        } ${
          userChoice === 'yes'
            ? 'border-green-600 bg-green-50 shadow-inner shadow-green-100'
            : 'hover:border-green-600 hover:bg-green-50/30 hover:scale-105 active:scale-95 hover:shadow-md'
        }`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
          userChoice === 'yes' 
            ? 'bg-green-600 text-white' 
            : 'bg-green-50 text-green-600 border border-green-200'
        }`}>
          <ThumbsUp size={24} />
        </div>
        <span className={`font-medium ${
          userChoice === 'yes' ? 'text-green-800' : 'text-green-700'
        }`}>YES</span>
        {hasVoted && (
          <span className={`text-sm mt-1 ${
            userChoice === 'yes' ? 'text-green-700' : 'text-green-600'
          }`}>
            {yesPercentage}%
          </span>
        )}
      </Button>
      
      <Button
        onClick={() => onVote('no')}
        disabled={hasVoted || isVoting}
        variant="outline"
        className={`h-auto flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
          isVoting ? 'opacity-70 cursor-not-allowed' : ''
        } ${
          userChoice === 'no'
            ? 'border-red-600 bg-red-50 shadow-inner shadow-red-100'
            : 'hover:border-red-600 hover:bg-red-50/30 hover:scale-105 active:scale-95 hover:shadow-md'
        }`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
          userChoice === 'no' 
            ? 'bg-red-600 text-white' 
            : 'bg-red-50 text-red-600 border border-red-200'
        }`}>
          <ThumbsDown size={24} />
        </div>
        <span className={`font-medium ${
          userChoice === 'no' ? 'text-red-800' : 'text-red-700'
        }`}>NO</span>
        {hasVoted && (
          <span className={`text-sm mt-1 ${
            userChoice === 'no' ? 'text-red-700' : 'text-red-600'
          }`}>
            {noPercentage}%
          </span>
        )}
      </Button>
    </div>
  );
};

export default VoteButtons;
