
import { CommentProps } from '@/components/Comments/CommentItem';

// Mock comments data
const mockComments: Record<string, CommentProps[]> = {
  'headliner-1': [
    {
      id: 'comment-1',
      author: {
        name: 'Curious Reader',
        avatar: '/avatar-placeholder.png',
        badges: ['Early Adopter', 'Science Enthusiast'],
      },
      content: 'This article is so informative! I never knew polar bears could swim that far.',
      createdAt: new Date('2023-09-15T08:23:00'),
      likes: 5,
      replies: [
        {
          id: 'reply-1',
          author: {
            name: 'Book Worm',
            avatar: '/avatar-placeholder.png',
            badges: ['Debate Contributor'],
          },
          content: 'I learned that in science class last year! Did you know they can swim up to 60 miles at a time?',
          createdAt: new Date('2023-09-15T09:30:00'),
          likes: 2
        }
      ]
    },
    {
      id: 'comment-2',
      author: {
        name: 'Book Worm',
        avatar: '/avatar-placeholder.png',
        badges: ['Debate Contributor', 'Regular Reader'],
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
        badges: ['Debate Contributor', 'Regular Reader'],
      },
      content: 'I disagree with the stance on homework. I think it\'s important for reinforcing what we learn in school.',
      createdAt: new Date('2023-09-16T14:12:00'),
      likes: 7,
      replies: [
        {
          id: 'reply-2',
          author: {
            name: 'Young Thinker',
            avatar: '/avatar-placeholder.png',
          },
          content: 'I see your point, but I think quality matters more than quantity. Too much homework can be overwhelming.',
          createdAt: new Date('2023-09-16T15:20:00'),
          likes: 4
        }
      ]
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
  
  // Get all replies and flatten them
  const allReplies = allComments
    .filter(comment => comment.replies && comment.replies.length > 0)
    .flatMap(comment => comment.replies || []);
  
  // Combine comments and replies
  const allItems = [...allComments, ...allReplies];
  
  // Convert to lowercase for case-insensitive matching
  const nameLower = authorName.toLowerCase();
  
  // Filter comments by author name (case-insensitive)
  return allItems.filter(comment => 
    comment.author.name.toLowerCase() === nameLower ||
    // Also check for username match (assuming username in the form "curious_reader")
    comment.author.name.toLowerCase().replace(' ', '_') === nameLower
  );
};

// Function to add a new comment (mock implementation)
export const addComment = (articleId: string, comment: Omit<CommentProps, 'id'>): CommentProps => {
  const newComment = {
    ...comment,
    id: `comment-${Date.now()}`,
  };
  
  if (!mockComments[articleId]) {
    mockComments[articleId] = [];
  }
  
  mockComments[articleId].unshift(newComment);
  return newComment;
};

// Function to add a reply to a comment (mock implementation)
export const addReply = (articleId: string, commentId: string, reply: Omit<CommentProps, 'id'>): CommentProps | null => {
  // Find the article
  const article = mockComments[articleId];
  if (!article) return null;
  
  // Find the comment
  const commentIndex = article.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return null;
  
  // Create the new reply
  const newReply = {
    ...reply,
    id: `reply-${Date.now()}`,
  };
  
  // Add reply to the comment
  if (!article[commentIndex].replies) {
    article[commentIndex].replies = [];
  }
  
  article[commentIndex].replies!.push(newReply);
  return newReply;
};

// Function to like a comment or reply (mock implementation)
export const likeComment = (articleId: string, commentId: string, replyId?: string): boolean => {
  // For now just return success - in a real implementation this would
  // update the comment or reply like count in the database
  return true;
};
