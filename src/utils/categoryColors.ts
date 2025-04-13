
// Utility function to map categories to their respective color classes
export const getCategoryColor = (category: string) => {
  const categories: {[key: string]: string} = {
    'Headliners': 'bg-flyingbus-purple text-white',
    'Debates': 'bg-flyingbus-red text-white',
    'Spice It Up': 'bg-flyingbus-orange text-white',
    'Storyboard': 'bg-flyingbus-blue text-white',
    'In the Neighborhood': 'bg-flyingbus-green text-white',
    'Learning': 'bg-flyingbus-yellow text-black',
    'School News': 'bg-flyingbus-pink text-white'
  };
  
  return categories[category] || 'bg-gray-500 text-white';
};
