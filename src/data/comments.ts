
import { CommentProps } from '@/components/Comments/CommentItem';

// Mock comments data
const mockComments: Record<string, CommentProps[]> = {
  'headliner-1': [
    {
      id: 'comment-1',
      author: {
        name: 'Curious Reader',
        avatar: '/avatar-placeholder.png',
      },
      content: 'This article is so informative! I never knew polar bears could swim that far.',
      createdAt: new Date('2023-09-15T08:23:00'),
      likes: 5
    },
    {
      id: 'comment-2',
      author: {
        name: 'Book Worm',
        avatar: '/avatar-placeholder.png',
      },
      content: 'I learned so much from this article. Can\'t wait to share it with my friends!',
      createdAt: new Date('2023-09-15T10:45:00'),
      likes: 3
    }
  ],
  'debate-1': [
    {
      id: 'comment-3',
      author: {
        name: 'Book Worm',
        avatar: '/avatar-placeholder.png',
      },
      content: 'I disagree with the stance on homework. I think it\'s important for reinforcing what we learn in school.',
      createdAt: new Date('2023-09-16T14:12:00'),
      likes: 7
    },
    {
      id: 'comment-4',
      author: {
        name: 'Young Thinker',
        avatar: '/avatar-placeholder.png',
      },
      content: 'Great points made on both sides. This really made me think!',
      createdAt: new Date('2023-09-16T16:08:00'),
      likes: 2
    }
  ]
};

// Function to get comments by article ID
export const getCommentsByArticleId = (articleId: string): CommentProps[] => {
  return mockComments[articleId] || [];
};

// Function to get comments by author name
export const getCommentsByAuthor = (authorName: string): CommentProps[] => {
  // Flatten all comments from all articles
  const allComments = Object.values(mockComments).flat();
  
  // Convert to lowercase for case-insensitive matching
  const nameLower = authorName.toLowerCase();
  
  // Filter comments by author name (case-insensitive)
  return allComments.filter(comment => 
    comment.author.name.toLowerCase() === nameLower ||
    // Also check for username match (assuming username in the form "curious_reader")
    comment.author.name.toLowerCase().replace(' ', '_') === nameLower
  );
};
