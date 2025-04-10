
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
    <div className="bg-white border rounded-xl p-6 shadow-md">
      <h3 className="text-xl md:text-2xl font-display font-bold text-center mb-6">
        What do you think?
      </h3>
      
      <div className="text-center mb-8">
        <div className="inline-block bg-flyingbus-purple/10 text-flyingbus-purple px-4 py-2 rounded-full font-medium">
          {topicTitle}
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-8 mb-8">
        <Button
          onClick={() => handleVote('yes')}
          disabled={hasVoted}
          variant="outline"
          className={`h-auto flex flex-col items-center p-4 rounded-xl border-2 ${
            hasVoted && votes.yes > votes.no 
              ? 'border-flyingbus-green bg-flyingbus-green/10' 
              : 'hover:border-flyingbus-green hover:bg-flyingbus-green/5'
          }`}
        >
          <ThumbsUp size={36} className={`mb-2 ${hasVoted && votes.yes > votes.no ? 'text-flyingbus-green' : ''}`} />
          <span className="text-lg font-display font-bold">YES</span>
          {hasVoted && <span className="text-sm mt-1">{yesPercentage}%</span>}
        </Button>
        
        <Button
          onClick={() => handleVote('no')}
          disabled={hasVoted}
          variant="outline"
          className={`h-auto flex flex-col items-center p-4 rounded-xl border-2 ${
            hasVoted && votes.no > votes.yes 
              ? 'border-flyingbus-red bg-flyingbus-red/10' 
              : 'hover:border-flyingbus-red hover:bg-flyingbus-red/5'
          }`}
        >
          <ThumbsDown size={36} className={`mb-2 ${hasVoted && votes.no > votes.yes ? 'text-flyingbus-red' : ''}`} />
          <span className="text-lg font-display font-bold">NO</span>
          {hasVoted && <span className="text-sm mt-1">{noPercentage}%</span>}
        </Button>
      </div>
      
      {hasVoted && (
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Yes ({votes.yes} votes)</span>
              <span>{yesPercentage}%</span>
            </div>
            <Progress value={yesPercentage} className="h-3 bg-gray-200" indicatorClassName="bg-flyingbus-green" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>No ({votes.no} votes)</span>
              <span>{noPercentage}%</span>
            </div>
            <Progress value={noPercentage} className="h-3 bg-gray-200" indicatorClassName="bg-flyingbus-red" />
          </div>
          
          <p className="text-center text-sm text-flyingbus-muted-text mt-4">
            Total votes: {totalVotes}
          </p>
        </div>
      )}
      
      {!hasVoted && (
        <p className="text-center text-sm text-flyingbus-muted-text">
          Click on yes or no to cast your vote!
        </p>
      )}
    </div>
  );
};

export default DebateVote;
