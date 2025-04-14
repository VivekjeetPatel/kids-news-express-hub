
import { ReaderProfile } from '@/types/ReaderProfile';

// Mock data for reader profiles
export const mockReaderProfiles: ReaderProfile[] = [
  {
    id: 'reader-1',
    username: 'curious_reader',
    displayName: 'Curious Reader',
    avatar: '/avatar-placeholder.png',
    bio: 'I love reading articles about science and technology!',
    joinedDate: new Date('2023-05-15'),
    commentCount: 8,
    badges: ['Early Adopter', 'Science Enthusiast'],
    achievements: ['5 Comments Posted'],
    readingStreak: 7
  },
  {
    id: 'reader-2',
    username: 'bookworm42',
    displayName: 'Book Worm',
    avatar: '/avatar-placeholder.png',
    bio: 'Always looking for interesting stories and debates.',
    joinedDate: new Date('2023-06-22'),
    commentCount: 15,
    badges: ['Debate Contributor', 'Regular Reader'],
    achievements: ['10 Comments Posted', '5 Debates Participated'],
    readingStreak: 12
  }
];

// Function to get a reader profile by ID
export const getReaderById = (id: string): ReaderProfile | undefined => {
  return mockReaderProfiles.find(reader => reader.id === id);
};

// Function to get a reader profile by username
export const getReaderByUsername = (username: string): ReaderProfile | undefined => {
  return mockReaderProfiles.find(reader => reader.username === username);
};
