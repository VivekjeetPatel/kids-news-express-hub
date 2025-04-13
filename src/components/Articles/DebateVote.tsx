
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, Info, Sparkles, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
  const [userChoice, setUserChoice] = useState<'yes' | 'no' | null>(null);
  const totalVotes = votes.yes + votes.no;
  const yesPercentage = totalVotes > 0 ? Math.round((votes.yes / totalVotes) * 100) : 0;
  const noPercentage = totalVotes > 0 ? Math.round((votes.no / totalVotes) * 100) : 0;

  // Check if user has already voted on this debate (from localStorage)
  useEffect(() => {
    const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
    if (votedDebates[debateId]) {
      setHasVoted(true);
      // If they've voted before, we also know their choice
      const choice = votedDebates[debateId] as 'yes' | 'no';
      setUserChoice(choice);
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
      setUserChoice(choice);
      
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
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-flyingbus-purple/10 to-flyingbus-blue/10 pb-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-flyingbus-purple" />
            <h3 className="text-xl font-semibold text-gray-900">
              What do you think?
            </h3>
          </div>
          
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm text-flyingbus-purple px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-flyingbus-purple/20">
            {topicTitle}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-5">
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleVote('yes')}
              disabled={hasVoted || isVoting}
              variant="outline"
              className={`h-auto flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
                isVoting ? 'opacity-70 cursor-not-allowed' : ''
              } ${
                userChoice === 'yes'
                  ? 'border-green-500 bg-green-50 shadow-inner shadow-green-100'
                  : 'hover:border-green-500 hover:bg-green-50 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                userChoice === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-100'
              }`}>
                <ThumbsUp size={24} />
              </div>
              <span className={`font-medium ${userChoice === 'yes' ? 'text-green-700' : 'text-gray-700'}`}>YES</span>
              {hasVoted && <span className={`text-sm mt-1 ${userChoice === 'yes' ? 'text-green-600' : 'text-gray-500'}`}>{yesPercentage}%</span>}
            </Button>
            
            <Button
              onClick={() => handleVote('no')}
              disabled={hasVoted || isVoting}
              variant="outline"
              className={`h-auto flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
                isVoting ? 'opacity-70 cursor-not-allowed' : ''
              } ${
                userChoice === 'no'
                  ? 'border-red-500 bg-red-50 shadow-inner shadow-red-100'
                  : 'hover:border-red-500 hover:bg-red-50 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                userChoice === 'no' ? 'bg-red-500 text-white' : 'bg-gray-100'
              }`}>
                <ThumbsDown size={24} />
              </div>
              <span className={`font-medium ${userChoice === 'no' ? 'text-red-700' : 'text-gray-700'}`}>NO</span>
              {hasVoted && <span className={`text-sm mt-1 ${userChoice === 'no' ? 'text-red-600' : 'text-gray-500'}`}>{noPercentage}%</span>}
            </Button>
          </div>
          
          {hasVoted && (
            <div className="space-y-4 pt-2 pb-1">
              <div className="space-y-2 bg-gradient-to-r from-green-50 to-green-100/50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-green-700">Yes ({votes.yes} votes)</span>
                  <span className="text-green-700 font-medium">{yesPercentage}%</span>
                </div>
                <Progress value={yesPercentage} className="h-2.5 bg-white" indicatorClassName="bg-green-500" />
              </div>
              
              <div className="space-y-2 bg-gradient-to-r from-red-50 to-red-100/50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-red-700">No ({votes.no} votes)</span>
                  <span className="text-red-700 font-medium">{noPercentage}%</span>
                </div>
                <Progress value={noPercentage} className="h-2.5 bg-white" indicatorClassName="bg-red-500" />
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 px-4 rounded-full mx-auto w-fit">
                <Users size={14} />
                <p>Total votes: {totalVotes}</p>
              </div>
            </div>
          )}
          
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DebateVote;
