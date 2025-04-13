
import { CommentProps } from '@/components/Comments/CommentItem';

// Helper function to create a date in the past
const getPastDate = (daysAgo: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

export const getCommentsByArticleId = (articleId: string): CommentProps[] => {
  // In a real app, we would fetch comments from an API based on the articleId
  // For now, we'll return mock data
  
  const mockComments: Record<string, CommentProps[]> = {
    '1': [
      {
        id: '1',
        author: {
          name: 'Emma Johnson',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        content: 'This article was so interesting! I never knew kids from so many countries were working together on climate change.',
        createdAt: getPastDate(1),
        likes: 12
      },
      {
        id: '2',
        author: {
          name: 'Jacob Lee',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        content: 'I tried starting a recycling program at my school after reading this. It\'s going great so far!',
        createdAt: getPastDate(2),
        likes: 8
      },
      {
        id: '3',
        author: {
          name: 'Sophia Williams',
          avatar: 'https://i.pravatar.cc/150?img=3'
        },
        content: 'My science teacher showed us this article in class today. We\'re thinking about joining the tree planting day!',
        createdAt: getPastDate(3),
        likes: 5
      }
    ],
    '2': [
      {
        id: '4',
        author: {
          name: 'Noah Martinez',
          avatar: 'https://i.pravatar.cc/150?img=4'
        },
        content: 'I learned so much from this article. Thanks for sharing!',
        createdAt: getPastDate(1),
        likes: 7
      },
      {
        id: '5',
        author: {
          name: 'Olivia Garcia',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        content: 'This is exactly what we\'ve been discussing in our science class. Great reporting!',
        createdAt: getPastDate(2),
        likes: 4
      }
    ]
  };
  
  // Return comments for the specific article or an empty array if none exist
  return mockComments[articleId] || [];
};
