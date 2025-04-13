
/**
 * Utility functions for debate voting functionality
 */

/**
 * Checks if a user has already voted on a specific debate
 * @param debateId The ID of the debate to check
 * @returns Boolean indicating if the user has voted and their choice if they have
 */
export const checkIfUserHasVoted = (debateId: string): { hasVoted: boolean; userChoice: 'yes' | 'no' | null } => {
  const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
  if (votedDebates[debateId]) {
    return {
      hasVoted: true,
      userChoice: votedDebates[debateId] as 'yes' | 'no'
    };
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
      const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
      resolve(!!votedDebates[debateId]);
    }, 600);
  });
};

/**
 * Records a user's vote in localStorage
 * @param debateId The debate ID
 * @param choice The user's choice ('yes' or 'no')
 */
export const recordVote = (debateId: string, choice: 'yes' | 'no'): void => {
  const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '{}');
  votedDebates[debateId] = choice;
  localStorage.setItem('votedDebates', JSON.stringify(votedDebates));
};
