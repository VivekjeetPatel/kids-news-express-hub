
/**
 * Utility functions for debate voting functionality
 */

import { toast } from 'sonner';

const VOTED_DEBATES_KEY = 'votedDebates';

/**
 * Checks if a user has already voted on a specific debate
 * @param debateId The ID of the debate to check
 * @returns Boolean indicating if the user has voted and their choice if they have
 */
export const checkIfUserHasVoted = (debateId: string): { hasVoted: boolean; userChoice: 'yes' | 'no' | null } => {
  try {
    const votedDebates = JSON.parse(localStorage.getItem(VOTED_DEBATES_KEY) || '{}');
    if (votedDebates[debateId]) {
      return {
        hasVoted: true,
        userChoice: votedDebates[debateId] as 'yes' | 'no'
      };
    }
  } catch (error) {
    console.error('Error checking vote status:', error);
    toast.error('There was a problem checking your vote status');
  }
  
  return {
    hasVoted: false,
    userChoice: null
  };
};

/**
 * Simulates checking if the user's IP has already voted
 * In a real app, this would call an API endpoint
 */
export const simulateIpCheck = (debateId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const votedDebates = JSON.parse(localStorage.getItem(VOTED_DEBATES_KEY) || '{}');
        resolve(!!votedDebates[debateId]);
      } catch (error) {
        console.error('Error checking IP vote status:', error);
        resolve(false);
      }
    }, 600);
  });
};

/**
 * Records a user's vote in localStorage
 * @param debateId The debate ID
 * @param choice The user's choice ('yes' or 'no')
 */
export const recordVote = (debateId: string, choice: 'yes' | 'no'): void => {
  try {
    const votedDebates = JSON.parse(localStorage.getItem(VOTED_DEBATES_KEY) || '{}');
    votedDebates[debateId] = choice;
    localStorage.setItem(VOTED_DEBATES_KEY, JSON.stringify(votedDebates));
  } catch (error) {
    console.error('Error recording vote:', error);
    toast.error('There was a problem saving your vote');
  }
};

/**
 * Clears all votes (for testing purposes)
 */
export const clearAllVotes = (): void => {
  localStorage.removeItem(VOTED_DEBATES_KEY);
  toast.success('All vote data has been cleared');
};
