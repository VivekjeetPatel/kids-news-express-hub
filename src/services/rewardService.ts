export async function sendReward(userWalletAddress: string, eventType: string) {
  const response = await fetch("https://kids-news-express-hub-backend.onrender.com/api/reward-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userWalletAddress, eventType })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send reward');
  }
  return response.json();
} 