
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface DebateVoteProps {
  debateId: string;
  topicTitle: string;
  initialVotes?: {
    yes: number;
    no: number;
  };
}

const DebateVote = ({ debateId, topicTitle, initialVotes = { yes: 50, no: 50 } }: DebateVoteProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const totalVotes = votes.yes + votes.no;
  const yesPercentage = totalVotes > 0 ? Math.round((votes.yes / totalVotes) * 100) : 0;
  const noPercentage = totalVotes > 0 ? Math.round((votes.no / totalVotes) * 100) : 0;

  const handleVote = (choice: 'yes' | 'no') => {
    if (hasVoted) {
      toast.warning("You've already voted on this debate!");
      return;
    }

    // In a real app, this would send the vote to the server
    const newVotes = { ...votes };
    newVotes[choice] += 1;
    
    setVotes(newVotes);
    setHasVoted(true);
    
    toast.success("Your vote has been counted! Thanks for participating!");
    
    // In a real implementation, this would store the vote in local storage or a cookie
    // to prevent multiple votes from the same user
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-medium text-gray-900 text-center mb-4">
        What do you think?
      </h3>
      
      <div className="text-center mb-6">
        <div className="inline-block bg-flyingbus-purple/10 text-flyingbus-purple px-4 py-2 rounded-md text-sm font-medium">
          {topicTitle}
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          onClick={() => handleVote('yes')}
          disabled={hasVoted}
          variant="outline"
          className={`h-auto flex flex-col items-center p-3 rounded-lg border ${
            hasVoted && votes.yes > votes.no 
              ? 'border-green-500 bg-green-50' 
              : 'hover:border-green-500 hover:bg-green-50'
          }`}
        >
          <ThumbsUp size={28} className={`mb-2 ${hasVoted && votes.yes > votes.no ? 'text-green-500' : ''}`} />
          <span className="text-sm font-medium">YES</span>
          {hasVoted && <span className="text-xs mt-1">{yesPercentage}%</span>}
        </Button>
        
        <Button
          onClick={() => handleVote('no')}
          disabled={hasVoted}
          variant="outline"
          className={`h-auto flex flex-col items-center p-3 rounded-lg border ${
            hasVoted && votes.no > votes.yes 
              ? 'border-red-500 bg-red-50' 
              : 'hover:border-red-500 hover:bg-red-50'
          }`}
        >
          <ThumbsDown size={28} className={`mb-2 ${hasVoted && votes.no > votes.yes ? 'text-red-500' : ''}`} />
          <span className="text-sm font-medium">NO</span>
          {hasVoted && <span className="text-xs mt-1">{noPercentage}%</span>}
        </Button>
      </div>
      
      {hasVoted && (
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Yes ({votes.yes} votes)</span>
              <span>{yesPercentage}%</span>
            </div>
            <Progress value={yesPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>No ({votes.no} votes)</span>
              <span>{noPercentage}%</span>
            </div>
            <Progress value={noPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            Total votes: {totalVotes}
          </p>
        </div>
      )}
      
      {!hasVoted && (
        <p className="text-center text-xs text-gray-500">
          Click on yes or no to cast your vote!
        </p>
      )}
    </div>
  );
};

export default DebateVote;
