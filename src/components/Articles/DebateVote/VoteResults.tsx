
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Users } from 'lucide-react';

interface VoteResultsProps {
  votes: {
    yes: number;
    no: number;
  };
  yesPercentage: number;
  noPercentage: number;
  totalVotes: number;
}

const VoteResults: React.FC<VoteResultsProps> = ({ 
  votes, 
  yesPercentage, 
  noPercentage, 
  totalVotes 
}) => {
  return (
    <div className="space-y-4 pt-2 pb-1">
      <div className="space-y-2 bg-green-50 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-green-700">Yes ({votes.yes} votes)</span>
          <span className="text-green-700 font-medium">{yesPercentage}%</span>
        </div>
        <Progress value={yesPercentage} className="h-2.5 bg-green-100" indicatorClassName="bg-green-600" />
      </div>
      
      <div className="space-y-2 bg-red-50 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-red-700">No ({votes.no} votes)</span>
          <span className="text-red-700 font-medium">{noPercentage}%</span>
        </div>
        <Progress value={noPercentage} className="h-2.5 bg-red-100" indicatorClassName="bg-red-600" />
      </div>
      
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm bg-gray-50 py-2 px-4 rounded-full mx-auto w-fit">
        <Users size={14} />
        <p>Total votes: {totalVotes}</p>
      </div>
    </div>
  );
};

export default VoteResults;
