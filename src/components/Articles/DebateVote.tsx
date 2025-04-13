
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';
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
  const [isVoting, setIsVoting] = useState(false);
  const totalVotes = votes.yes + votes.no;
  const yesPercentage = totalVotes > 0 ? Math.round((votes.yes / totalVotes) * 100) : 0;
  const noPercentage = totalVotes > 0 ? Math.round((votes.no / totalVotes) * 100) : 0;

  // Check if user has already voted on this debate (from localStorage)
  useEffect(() => {
    const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
    if (votedDebates[debateId]) {
      setHasVoted(true);
      // If they've voted before, we also know their choice
      const userChoice = votedDebates[debateId];
      
      // This is just for UI highlighting which option they chose
      const newVotes = { ...votes };
      // We're not changing the actual vote count here, just using this to track which they picked
      setVotes(prev => ({...prev, [userChoice]: prev[userChoice]}));
    }
  }, [debateId]);

  // Simulate an API call to check if this IP has voted
  const simulateIpCheck = (debateId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate network delay for realism
      setTimeout(() => {
        // Since we don't have a real backend, we'll just use localStorage as our "IP database" 
        // In a real implementation, this would be an API call to check the IP
        const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
        resolve(!!votedDebates[debateId]);
      }, 600);
    });
  };

  const handleVote = async (choice: 'yes' | 'no') => {
    if (hasVoted) {
      toast.warning("You've already voted on this debate!");
      return;
    }

    setIsVoting(true);

    try {
      // First layer: Check local storage
      const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
      
      if (votedDebates[debateId]) {
        toast.warning("You've already voted on this debate!");
        setHasVoted(true);
        setIsVoting(false);
        return;
      }

      // Second layer: Simulate IP address check
      const hasIpVoted = await simulateIpCheck(debateId);
      
      if (hasIpVoted) {
        toast.warning("A vote from your location has already been recorded!");
        setHasVoted(true);
        setIsVoting(false);
        return;
      }

      // If both checks pass, record the vote
      const newVotes = { ...votes };
      newVotes[choice] += 1;
      setVotes(newVotes);
      
      // Save to localStorage to prevent voting again
      votedDebates[debateId] = choice;
      localStorage.setItem('votedDebates', JSON.stringify(votedDebates));
      
      setHasVoted(true);
      toast.success("Your vote has been counted! Thanks for participating!");
    } catch (error) {
      toast.error("There was a problem recording your vote. Please try again.");
      console.error("Voting error:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-medium text-gray-900 text-center mb-4">
        What do you think?
      </h3>
      
      <div className="text-center mb-6">
        <div className="inline-block bg-flyingbus-purple/10 text-flyingbus-purple px-4 py-2 rounded-xl text-sm font-medium">
          {topicTitle}
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          onClick={() => handleVote('yes')}
          disabled={hasVoted || isVoting}
          variant="outline"
          className={`h-auto flex flex-col items-center p-3 rounded-xl border ${
            isVoting ? 'opacity-70 cursor-not-allowed' : ''
          } ${
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
          disabled={hasVoted || isVoting}
          variant="outline"
          className={`h-auto flex flex-col items-center p-3 rounded-xl border ${
            isVoting ? 'opacity-70 cursor-not-allowed' : ''
          } ${
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
        <div className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
          <Info size={12} />
          <span>Your vote is anonymous and can only be cast once per debate</span>
        </div>
      )}

      {isVoting && (
        <div className="flex justify-center mt-4">
          <div className="animate-pulse text-sm text-flyingbus-purple">Verifying vote...</div>
        </div>
      )}
    </div>
  );
};

export default DebateVote;
